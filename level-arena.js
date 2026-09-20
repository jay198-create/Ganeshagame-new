(() => {
  "use strict";
  const app=document.querySelector("#app"), PROFILE_KEY="ganesha-festival-v3", KEY="ganesha-festival-v5-levels";
  if(!app) return;
  const games=[
    {id:"memory",name:"Ganesha Memory",icon:"◈"},
    {id:"math",name:"Modak Math",icon:"×"},
    {id:"hunt",name:"Mushak Hunt",icon:"⌕"},
    {id:"sequence",name:"Ganesha Sequence",icon:"♫"},
    {id:"pattern",name:"Festival Pattern",icon:"✥"}
  ];
  const diffs={easy:{label:"Easy",mult:1},medium:{label:"Medium",mult:1.4},hard:{label:"Hard",mult:2}};
  let st={game:"memory",difficulty:"easy",progress:{},screen:"menu",level:1,puzzle:null,startedAt:0};
  try{st={...st,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{}
  const save=()=>localStorage.setItem(KEY,JSON.stringify(st));
  const prof=()=>{try{return JSON.parse(localStorage.getItem(PROFILE_KEY)||"{}")}catch{return {coins:0}}};
  const reward=n=>{const p=prof();p.coins=(Number(p.coins)||0)+n;localStorage.setItem(PROFILE_KEY,JSON.stringify(p));};
  const e=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const key=()=>st.game+":"+st.difficulty;
  const unlocked=()=>Math.max(1,Number(st.progress[key()]?.unlocked)||1);
  const best=()=>st.progress[key()]?.best||{};
  function rng(seed){let n=seed>>>0;return()=>{n+=0x6d2b79f5;let t=n;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
  function int(r,n){return Math.floor(r()*n)}
  function shuffled(a,r){a=a.slice();for(let i=a.length-1;i>0;i--){const j=int(r,i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
  function build(level){
    const d=diffs[st.difficulty],r=rng(level*9173+st.game.length*313+(st.difficulty==="hard"?9999:st.difficulty==="medium"?4444:0));
    if(st.game==="memory"){
      const tier=Math.min(9,Math.floor((level-1)/10));
      const mode=st.difficulty;
      const count=Math.min(40,10+Math.floor(tier/2)*5+(mode==="hard"?5:0));
      const targets=Math.min(count-2,3+Math.floor(tier/2)+(mode==="hard"?2:mode==="medium"?1:0));
      const preview=Math.max(900,(mode==="easy"?2500:mode==="medium"?2200:1800)-tier*100);
      return {type:"memory",count,targets:shuffled(Array.from({length:count},(_,i)=>i),r).slice(0,targets),selected:[],found:[],hearts:3,phase:"preview",remaining:preview,preview,paused:false};
    }
    if(st.game==="math"){
      const random=Math.random, band=Math.min(9,Math.floor((level-1)/10)), mode=st.difficulty;
      const recent=st.mathRecent ||= [];
      let text="",ans=0,kind="";
      for(let attempt=0;attempt<200;attempt++){
        const easyPool=band<2?4:band<5?6:8;
        const mediumPool=band<3?8:10;
        const hardPool=12;
        const type=int(random,mode==="easy"?easyPool:mode==="medium"?mediumPool:hardPool);
        const a=3+int(random,(mode==="easy"?18:mode==="medium"?45:85)+band*6);
        const b=2+int(random,(mode==="easy"?12:mode==="medium"?28:48)+band*3);
        const d=2+int(random,9+band);
        const extra=2+int(random,18+band*4);

        if(type===0){text=`${a} + ${b}`;ans=a+b;kind="Addition";}
        else if(type===1){const hi=Math.max(a,b),lo=Math.min(a,b);text=`${hi} − ${lo}`;ans=hi-lo;kind="Subtraction";}
        else if(type===2){text=`${a} × ${d}`;ans=a*d;kind="Multiplication";}
        else if(type===3){text=`${a*d} ÷ ${d}`;ans=a;kind="Exact division";}
        else if(type===4){text=`(${a} + ${b}) × ${d}`;ans=(a+b)*d;kind="Brackets first";}
        else if(type===5){text=`${a} × ${d} + ${extra}`;ans=a*d+extra;kind="Order of operations";}
        else if(type===6){text=`${a+d} × ${d} − ${extra}`;ans=(a+d)*d-extra;kind="Two-step arithmetic";}
        else if(type===7){const n=5+int(random,18+band*2);text=`${n}² + ${extra}`;ans=n*n+extra;kind="Squares + addition";}
        else if(type===8){const rate=[10,20,25,50,75][int(random,5)],unit=4+int(random,18+band*3),base=unit*20;text=`${rate}% of ${base} + ${extra}`;ans=base*rate/100+extra;kind="Percentage reasoning";}
        else if(type===9){const x=3+int(random,18+band*2),coef=2+int(random,8),offset=2+int(random,24);text=`${coef}x + ${offset} = ${coef*x+offset}.  x = ?`;ans=x;kind="Solve for x";}
        else if(type===10){const x=4+int(random,20+band*2),m=2+int(random,8),sub=2+int(random,20);text=`(${x} × ${m}) − ${sub}`;ans=x*m-sub;kind="Rapid multi-step";}
        else {const x=4+int(random,18+band*2),m=2+int(random,7),add=2+int(random,16);text=`(${x*m} ÷ ${m}) × ${d} + ${add}`;ans=x*d+add;kind="Expert chain";}

        if(Number.isInteger(ans) && ans>=0 && !recent.includes(text)) break;
      }
      recent.push(text);st.mathRecent=recent.slice(-60);
      const opts=new Set([ans]),spread=Math.max(8,Math.round(Math.max(12,Math.abs(ans))*(mode==="hard"?.12:.18)));
      while(opts.size<4){
        let offset=1+int(random,spread);
        if(random()<.35) offset=Math.max(1,Math.round(Math.abs(ans)*[.05,.1,.2][int(random,3)]));
        const value=ans+(random()<.5?-offset:offset);
        if(value>=0 && Number.isInteger(value))opts.add(value);
      }
      return {type:"math",text,ans,kind,opts:shuffled([...opts],random),phase:"input"};
    }
    if(st.game==="hunt"){
      const count=Math.min(72,18+Math.floor(level/2)+(st.difficulty==="hard"?16:st.difficulty==="medium"?8:0)),target=int(r,count);
      return {type:"hunt",count,target,phase:"input"};
    }
    if(st.game==="sequence"){
      const pads=st.difficulty==="hard"?6:st.difficulty==="medium"?5:4;
      const len=Math.min(18,3+Math.ceil(level/8)+(st.difficulty==="hard"?4:st.difficulty==="medium"?2:0));
      return {type:"sequence",pads,seq:Array.from({length:len},()=>int(r,pads)),entry:[],phase:"show"};
    }
    const base=2+int(r,6+Math.floor(level/20)),step=1+int(r,7+Math.floor(level/25)),len=Math.min(10,4+Math.floor(level/16));
    let series,ans,kind;
    if(level>35 && (level+st.difficulty.length)%3===0){
      series=Array.from({length:len},(_,i)=>base+i*i+step*i);
      ans=base+len*len+step*len;kind="Quadratic pattern";
    } else if(level>60 && (level%4===0)){
      series=Array.from({length:len},(_,i)=>base*Math.pow(2,i));
      ans=base*Math.pow(2,len);kind="Geometric pattern";
    } else {
      series=Array.from({length:len},(_,i)=>base+i*step);
      ans=base+len*step;kind="Arithmetic pattern";
    }
    const opts=new Set([ans]);while(opts.size<4){const delta=1+int(r,Math.max(7,Math.round(ans*.12)));opts.add(Math.max(0,ans+(r()<.5?-delta:delta)));}
    return {type:"pattern",series,ans,kind,opts:shuffled([...opts],r),phase:"input"};
  }

  function timeLimit(type,level,mode,p){
    const progress=Math.min(1,Math.max(0,(Math.min(level,100)-1)/99));
    if(type==="hunt"){
      const start={easy:3200,medium:2850,hard:2500}[mode], end={easy:2500,medium:2200,hard:1900}[mode];
      return Math.round(start-(start-end)*progress);
    }
    if(type==="math"){
      const start={easy:9500,medium:7800,hard:6200}[mode], end={easy:6200,medium:4800,hard:3400}[mode];
      const complexity=/Expert|Percentage|Solve|chain|multi-step/i.test(p?.kind||"")?900:0;
      return Math.round(start-(start-end)*progress+complexity);
    }
    if(type==="pattern"){
      const start={easy:9000,medium:7200,hard:5600}[mode], end={easy:5800,medium:4300,hard:3200}[mode];
      return Math.round(start-(start-end)*progress);
    }
    if(type==="sequence"){
      const len=p?.seq?.length||4;
      const per={easy:850,medium:650,hard:520}[mode];
      return Math.round(2600+len*per);
    }
    if(type==="memory"){
      const targets=p?.targets?.length||3;
      const base={easy:7600,medium:6200,hard:5000}[mode];
      return Math.round(base+targets*650-progress*1400);
    }
    return 0;
  }

  function huntSymbol(kind,target=false){
    const cls=target?"hunt-symbol target":"hunt-symbol";
    if(kind==="mouse")return `<svg class="${cls}" viewBox="0 0 64 64" aria-label="Mushak"><path d="M17 38c0-12 9-22 22-22 11 0 19 7 19 17 0 12-10 19-24 19-11 0-17-5-17-14Z"/><circle cx="43" cy="16" r="8"/><circle cx="29" cy="16" r="7"/><circle cx="49" cy="31" r="2.5" class="eye"/><path d="M18 43C8 42 5 35 8 28" class="tail"/></svg>`;
    if(kind==="lotus")return `<svg class="${cls}" viewBox="0 0 64 64"><path d="M32 50C19 50 10 43 8 33c9 1 15 4 20 10-3-11-1-21 4-29 5 8 7 18 4 29 5-6 11-9 20-10-2 10-11 17-24 17Z"/></svg>`;
    if(kind==="diya")return `<svg class="${cls}" viewBox="0 0 64 64"><path d="M11 37h42c-3 12-10 18-21 18S14 49 11 37Z"/><path d="M32 35c-7-8-4-16 2-24 6 8 9 16-2 24Z" class="accent"/></svg>`;
    if(kind==="bell")return `<svg class="${cls}" viewBox="0 0 64 64"><path d="M18 44h28c-2-5-4-9-4-17 0-8-4-14-10-14s-10 6-10 14c0 8-2 12-4 17Z"/><path d="M27 48c1 6 9 6 10 0Z" class="accent"/></svg>`;
    if(kind==="leaf")return `<svg class="${cls}" viewBox="0 0 64 64"><path d="M51 12C27 13 14 25 14 43c0 6 4 10 10 10 18 0 29-17 27-41Z"/><path d="M19 48c8-12 17-20 29-28" class="line"/></svg>`;
    return `<svg class="${cls}" viewBox="0 0 64 64"><path d="M18 43c0-9 8-15 10-23 1-5 3-8 4-10 2 2 4 5 5 10 2 8 10 14 10 23 0 9-6 13-15 13s-14-4-14-13Z"/><path d="M25 40h14M27 46h10" class="line"/></svg>`;
  }

  function shell(body){
    const p=prof();
    return `<section class="arena-shell"><div class="arena-head"><div><span class="eyebrow">JOURNEY · 5 GAMES · 100 LEVELS EACH</span><h1>Your Festival Journey</h1></div><div class="v5-wallet"><b>${Number(p.coins)||0}</b><span>MODAKS</span></div></div>${body}<div class="arena-foot"><button data-arena="exit" class="secondary">← Back to game</button><small>Every completed level saves automatically.</small></div></section>`;
  }
  function menu(){
    app.innerHTML=shell(`<div class="arena-pickers"><div><h3>Game</h3>${games.map(g=>`<button data-arena="game" data-id="${g.id}" class="${st.game===g.id?"active":""}">${g.icon} ${g.name}</button>`).join("")}</div><div><h3>Difficulty</h3>${Object.entries(diffs).map(([id,d])=>`<button data-arena="difficulty" data-id="${id}" class="${st.difficulty===id?"active":""}">${d.label}</button>`).join("")}</div></div>
      <div class="arena-summary"><h2>${e(games.find(x=>x.id===st.game).name)} · ${diffs[st.difficulty].label}</h2><p>Unlocked through level <b>${unlocked()}</b>. Finish Level 100 to unlock Endless.</p></div>
      <div class="level-grid">${Array.from({length:100},(_,i)=>i+1).map(n=>`<button data-arena="level" data-level="${n}" class="${n<=unlocked()?"open":"locked"} ${best()[n]?"cleared":""}" ${n>unlocked()?"disabled":""}>${n}<small>${best()[n]?"✓":""}</small></button>`).join("")}</div>
      <button data-arena="level" data-level="${Math.max(101,unlocked())}" class="primary endless" ${unlocked()<101?"disabled":""}>∞ ENDLESS MODE</button>
      <div class="arena-summary"><span class="eyebrow">CLASSIC CIRCUIT</span><h2>Original 25-round challenge</h2><p>The original combined five-game run is still part of Journey.</p><button data-arena="classic" class="secondary">PLAY CLASSIC CHALLENGE →</button></div>`);
  }
  let memoryTimer=null, memoryDeadline=0;
  let challengeTimer=null, challengeDeadline=0;
  function stopChallengeClock(){if(challengeTimer){clearInterval(challengeTimer);challengeTimer=null;}}
  function timedPhase(p){
    if(!p||p.phase==="failed"||p.paused)return false;
    if(p.type==="math"||p.type==="hunt"||p.type==="pattern")return true;
    if(p.type==="sequence")return p.phase==="input";
    if(p.type==="memory")return p.phase==="input";
    return false;
  }
  function startChallengeClock(reset=false){
    stopChallengeClock();
    const p=st.puzzle;
    if(st.screen!=="play"||!timedPhase(p))return;
    if(reset||!Number.isFinite(p.timeRemaining)||p.timeRemaining<=0){
      p.timeLimit=timeLimit(p.type,st.level,st.difficulty,p);
      p.timeRemaining=p.timeLimit;
    }
    challengeDeadline=Date.now()+p.timeRemaining;
    challengeTimer=setInterval(()=>{
      if(st.screen!=="play"||st.puzzle!==p||!timedPhase(p)){stopChallengeClock();return;}
      p.timeRemaining=Math.max(0,challengeDeadline-Date.now());
      const label=document.querySelector("[data-time-left]");
      const fill=document.querySelector("[data-time-fill]");
      if(label)label.textContent=(p.timeRemaining/1000).toFixed(1)+"s";
      if(fill)fill.style.width=Math.max(0,Math.min(100,p.timeRemaining/Math.max(1,p.timeLimit)*100))+"%";
      if(p.timeRemaining<=0){
        stopChallengeClock();
        p.phase="failed";
        save();
        renderPlay("TIME UP — try the level again.");
      }
    },80);
  }
  function timerMarkup(p){
    if(!p?.timeLimit||(!timedPhase(p)&&p.phase!=="failed"))return "";
    const left=Math.max(0,Number(p.timeRemaining)||0),pct=Math.max(0,Math.min(100,left/Math.max(1,p.timeLimit)*100));
    return `<div class="challenge-timer ${left<1500?"danger":left<3000?"warning":""}"><div><span>TIME</span><b data-time-left>${(left/1000).toFixed(1)}s</b></div><div class="timer-track"><i data-time-fill style="width:${pct}%"></i></div></div>`;
  }
  function stopMemoryClock(){clearTimeout(memoryTimer);memoryTimer=null;}
  function startMemoryClock(){
    stopMemoryClock(); const p=st.puzzle;
    if(!p||p.type!=="memory"||p.phase!=="preview"||p.paused)return;
    memoryDeadline=Date.now()+p.remaining;
    memoryTimer=setTimeout(()=>{
      if(st.puzzle!==p||st.screen!=="play"||p.paused)return;
      p.phase="input";p.remaining=0;
      p.timeLimit=timeLimit("memory",st.level,st.difficulty,p);p.timeRemaining=p.timeLimit;
      save();renderPlay();startChallengeClock(false);
    },p.remaining);
  }
  function pauseMemory(){
    const p=st.puzzle;
    if(st.screen!=="play"||p?.type!=="memory"||p.paused||p.phase==="failed")return;
    if(p.phase==="preview")p.remaining=Math.max(0,memoryDeadline-Date.now());
    p.paused=true;stopMemoryClock();save();renderPlay();
  }
  document.addEventListener("visibilitychange",()=>{if(document.hidden)pauseMemory();});
  document.addEventListener("keydown",ev=>{if(ev.key==="Escape")pauseMemory();});
  function play(level){
    stopMemoryClock();stopChallengeClock();
    st.level=level;st.puzzle=build(level);st.screen="play";st.startedAt=Date.now();
    if(["math","hunt","pattern"].includes(st.puzzle.type)){
      st.puzzle.timeLimit=timeLimit(st.puzzle.type,level,st.difficulty,st.puzzle);
      st.puzzle.timeRemaining=st.puzzle.timeLimit;
    }
    save();renderPlay();
    if(st.puzzle.type==="memory")startMemoryClock();
    else if(st.puzzle.type==="sequence") setTimeout(showSequence,250);
    else startChallengeClock(false);
  }
  function renderPlay(msg=""){
    const p=st.puzzle,g=games.find(x=>x.id===st.game);
    let board="";
    if(p.type==="memory") {
      const preview=p.phase==="preview";
      board=p.paused?`<div class="memory-pause"><h2>Paused</h2><p>Your board is hidden. Resume when you are ready.</p><button class="primary" data-arena="memory-resume">RESUME</button></div>`:
        `<div class="memory-instruction" role="status"><h2>${preview?"REMEMBER THE GANESHAS!":p.phase==="failed"?"LET’S TRY AGAIN":"FIND THE GANESHAS!"}</h2><p>${preview?`Watch for ${(p.preview/1000).toFixed(1)} seconds. The symbols will disappear.`:`${p.found.length} / ${p.targets.length} found · ${p.hearts} hearts remaining`}</p></div>
        <div class="mem-grid recall-grid" style="--cols:5">${Array.from({length:p.count},(_,i)=>{
          const correct=p.targets.includes(i),picked=p.selected.includes(i),visible=(preview&&correct)||p.found.includes(i);
          return `<button data-arena="mem" data-i="${i}" aria-label="Tile ${i+1}${picked?(correct?", correct":", empty"):""}" class="${p.found.includes(i)?"recall-correct":picked?"recall-wrong":""}" ${preview||picked||p.phase==="failed"?"disabled":""}>${visible?'<span class="ganesha-token" role="img" aria-label="Ganesha"></span>':picked?'×':'<span class="tile-mark">✧</span>'}</button>`;
        }).join("")}</div>
        <div class="actions">${p.phase==="failed"?'<button data-arena="memory-retry" class="primary">TRY THIS LEVEL AGAIN</button>':'<button data-arena="memory-pause" class="secondary">PAUSE</button>'}</div>`;
    }
    if(p.type==="math")board=`${timerMarkup(p)}<div class="math-context"><span class="eyebrow">MODAK MATH · ${e(p.kind)}</span><p>Answer before the timer expires. Questions become more complex as levels rise.</p></div><div class="question">${e(p.text)}</div><div class="answer-grid">${p.opts.map(x=>`<button data-arena="answer" data-value="${x}" ${p.phase==="failed"?"disabled":""}>${x}</button>`).join("")}</div>${p.phase==="failed"?'<button data-arena="retry" class="primary timed-retry">TRY AGAIN</button>':""}`;
    if(p.type==="hunt"){
      const kinds=["lotus","diya","modak","leaf","bell"];
      board=`${timerMarkup(p)}<div class="hunt-context"><span class="eyebrow">MUSHAK HUNT · SPEED ROUND</span><p>Find Mushak before time runs out.</p></div><div class="hunt-grid">${Array.from({length:p.count},(_,i)=>`<button data-arena="hunt" data-i="${i}" aria-label="${i===p.target?"Mushak":"Festival object"}" ${p.phase==="failed"?"disabled":""}>${i===p.target?huntSymbol("mouse",true):huntSymbol(kinds[(i*7+st.level)%kinds.length])}</button>`).join("")}</div>${p.phase==="failed"?'<button data-arena="retry" class="primary timed-retry">TRY AGAIN</button>':""}`;
    }
    if(p.type==="sequence")board=`${p.phase!=="show"?timerMarkup(p):""}<div class="seq-status">${p.phase==="show"?"Watch the pattern…":p.phase==="failed"?"Time is up":"Repeat the pattern"}</div><div class="seq-grid">${Array.from({length:p.pads},(_,i)=>`<button data-arena="seq" data-i="${i}" class="pad p${i}" ${p.phase==="show"||p.phase==="failed"?"disabled":""}>${i+1}</button>`).join("")}</div><div class="seq-entry">${p.entry.length}/${p.seq.length}</div>${p.phase==="failed"?'<button data-arena="retry" class="primary timed-retry">TRY AGAIN</button>':""}`;
    if(p.type==="pattern")board=`${timerMarkup(p)}<div class="math-context"><span class="eyebrow">FESTIVAL PATTERN · ${e(p.kind||"Pattern")}</span><p>Read the number pattern and answer before time runs out.</p></div><div class="question">${p.series.join(" · ")} · ?</div><div class="answer-grid">${p.opts.map(x=>`<button data-arena="answer" data-value="${x}" ${p.phase==="failed"?"disabled":""}>${x}</button>`).join("")}</div>${p.phase==="failed"?'<button data-arena="retry" class="primary timed-retry">TRY AGAIN</button>':""}`;
    app.innerHTML=shell(`<div class="arena-playtop"><button data-arena="menu">← Levels</button><span>${g.name} · ${diffs[st.difficulty].label}</span><b>Level ${st.level>100?"∞ "+st.level:st.level}</b></div><div class="arena-board">${msg?`<p class="arena-msg">${e(msg)}</p>`:""}${board}</div>`);
  }
  function showSequence(){
    const p=st.puzzle;if(!p||p.type!=="sequence")return;
    let i=0;
    const t=setInterval(()=>{
      document.querySelectorAll(".seq-grid .pad").forEach(x=>x.classList.remove("flash"));
      if(i>=p.seq.length){clearInterval(t);p.phase="input";p.timeLimit=timeLimit("sequence",st.level,st.difficulty,p);p.timeRemaining=p.timeLimit;save();renderPlay();startChallengeClock(false);return;}
      document.querySelector(`.seq-grid .p${p.seq[i]}`)?.classList.add("flash");i++;
    },st.difficulty==="hard"?430:st.difficulty==="medium"?560:700);
  }
  function win(){
    const elapsed=Math.max(1,Math.round((Date.now()-st.startedAt)/1000)),base=4+Math.ceil(st.level/10),amount=Math.round(base*diffs[st.difficulty].mult);
    if(st.screen==="won")return;
    st.screen="won";stopMemoryClock();stopChallengeClock();
    reward(amount);
    const k=key();st.progress[k] ||= {unlocked:1,best:{}};
    st.progress[k].best[st.level]=Math.min(st.progress[k].best[st.level]||99999,elapsed);
    st.progress[k].unlocked=Math.max(st.progress[k].unlocked,st.level+1);
    save();
    app.innerHTML=shell(`<div class="arena-win"><span class="eyebrow">LEVEL COMPLETE</span><h2>+ ${amount} modaks</h2><p>${elapsed}s · Level ${st.level}</p><div class="actions"><button data-arena="next" class="primary">NEXT LEVEL →</button><button data-arena="menu" class="secondary">LEVEL MAP</button></div></div>`);
  }
  function wrong(){renderPlay("Not quite. Try again.");}
  document.addEventListener("click",ev=>{
    const b=ev.target.closest("[data-arena]");
    if(!b){if(ev.target.closest("[data-action]")){stopMemoryClock();st.screen="menu";}return;}
    ev.preventDefault();ev.stopImmediatePropagation();
    const a=b.dataset.arena;
    if(["open","exit","menu","classic","game","difficulty"].includes(a)){stopMemoryClock();stopChallengeClock();}
    if(a==="memory-pause"){pauseMemory();return;}
    if(a==="memory-resume"){st.puzzle.paused=false;save();renderPlay();startMemoryClock();return;}
    if(a==="memory-retry"||a==="retry"){play(st.level);return;}
    if(a==="open"){try{document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape"}));}catch{}st.screen="menu";save();menu();return}
    if(a==="exit"){save();window.GFJClassic?.home?.();void window.GFJAnonymousSave?.syncNow?.();return}
    if(a==="menu"){st.screen="menu";save();menu();return}
    if(a==="classic"){save();window.GFJClassic?.trail?.();return}
    if(a==="game"){st.game=b.dataset.id;st.screen="menu";save();menu();return}
    if(a==="difficulty"){st.difficulty=b.dataset.id;st.screen="menu";save();menu();return}
    if(a==="level"){play(Number(b.dataset.level));return}
    if(a==="next"){play(st.level+1);return}
    const p=st.puzzle;if(!p)return;
    if(a==="answer"){if(p.phase==="failed")return;Number(b.dataset.value)===p.ans?win():wrong();return}
    if(a==="hunt"){if(p.phase==="failed")return;Number(b.dataset.i)===p.target?win():wrong();return}
    if(a==="seq"){if(p.phase!=="input"||p.phase==="failed")return;const v=Number(b.dataset.i);if(v!==p.seq[p.entry.length]){p.entry=[];save();wrong();return}p.entry.push(v);save();if(p.entry.length===p.seq.length)win();else renderPlay();return}
    if(a==="mem"){
      if(p.type!=="memory"||p.phase!=="input"||p.paused||st.screen!=="play")return;
      const i=Number(b.dataset.i);
      if(!Number.isInteger(i)||i<0||i>=p.count||p.selected.includes(i))return;
      p.selected.push(i);
      if(p.targets.includes(i))p.found.push(i);else p.hearts--;
      if(p.found.length===p.targets.length){save();win();return;}
      if(p.hearts<=0)p.phase="failed";
      save();renderPlay();
    }
  },true);
  window.GFJLevelArena = {
    open() {
      try { document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape"})); } catch {}
      stopMemoryClock();stopChallengeClock();
      st.screen="menu";
      save();
      menu();
    }
  };
})();