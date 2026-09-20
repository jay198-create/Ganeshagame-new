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
      let text,ans,kind;
      for(let attempt=0;attempt<30;attempt++) {
        const a=2+int(random,(mode==="easy"?9:mode==="medium"?24:55)+band*4);
        const b=2+int(random,8+band*2), c=2+int(random,12+band*3);
        const type=int(random,mode==="easy"?(band<2?2:4):mode==="medium"?5:6);
        if(mode==="hard" && type===5){const rate=[10,20,25,50,75][int(random,5)],base=(4+int(random,30+band*5))*20;text=`${rate}% of ${base} + ${c}`;ans=base*rate/100+c;kind="Percentage + addition";}
        else if(type===0){text=`${a} × ${b}`;ans=a*b;kind="Multiplication";}
        else if(type===1){text=`${a*b} ÷ ${b}`;ans=a;kind="Exact division";}
        else if(type===2){text=`(${a} + ${b}) × ${c}`;ans=(a+b)*c;kind="Brackets first";}
        else if(type===3){text=`${a} × ${b} + ${c}`;ans=a*b+c;kind="Order of operations";}
        else {text=`(${a*b} ÷ ${b}) × ${c} − ${b}`;ans=a*c-b;kind="Multi-step reasoning";}
        if(!recent.includes(text))break;
      }
      recent.push(text);st.mathRecent=recent.slice(-20);
      const opts=new Set([ans]),spread=Math.max(6,Math.round(Math.abs(ans)*.15));
      while(opts.size<4){const offset=1+int(random,spread),value=ans+(random()<.5?-offset:offset);if(value>=0)opts.add(value);}
      return {type:"math",text,ans,kind,opts:shuffled([...opts],random)};
    }
    if(st.game==="hunt"){
      const count=Math.min(64,16+Math.floor(level/3)+(st.difficulty==="hard"?12:st.difficulty==="medium"?6:0)),target=int(r,count);
      return {type:"hunt",count,target};
    }
    if(st.game==="sequence"){
      const pads=st.difficulty==="hard"?6:st.difficulty==="medium"?5:4,len=Math.min(16,3+Math.ceil(level/8)+(st.difficulty==="hard"?3:0));
      return {type:"sequence",pads,seq:Array.from({length:len},()=>int(r,pads)),entry:[],phase:"show"};
    }
    const base=2+int(r,4),step=1+int(r,5),len=Math.min(9,4+Math.floor(level/18)),series=Array.from({length:len},(_,i)=>base+i*step);
    const ans=base+len*step,opts=new Set([ans]);while(opts.size<4)opts.add(ans+int(r,9)-4);
    return {type:"pattern",series,ans,opts:shuffled([...opts],r)};
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
  function stopMemoryClock(){clearTimeout(memoryTimer);memoryTimer=null;}
  function startMemoryClock(){
    stopMemoryClock(); const p=st.puzzle;
    if(!p||p.type!=="memory"||p.phase!=="preview"||p.paused)return;
    memoryDeadline=Date.now()+p.remaining;
    memoryTimer=setTimeout(()=>{
      if(st.puzzle!==p||st.screen!=="play"||p.paused)return;
      p.phase="input";p.remaining=0;save();renderPlay();
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
    stopMemoryClock();
    st.level=level;st.puzzle=build(level);st.screen="play";st.startedAt=Date.now();save();renderPlay();
    if(st.puzzle.type==="memory")startMemoryClock();
    if(st.puzzle.type==="sequence") setTimeout(showSequence,250);
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
    if(p.type==="math")board=`<div class="math-context"><span class="eyebrow">MODAK MATH · ${e(p.kind)}</span><p>Solve the expression. Multiplication and division come before addition.</p></div><div class="question">${e(p.text)}</div><div class="answer-grid">${p.opts.map(x=>`<button data-arena="answer" data-value="${x}">${x}</button>`).join("")}</div>`;
    if(p.type==="hunt")board=`<div class="hunt-grid">${Array.from({length:p.count},(_,i)=>`<button data-arena="hunt" data-i="${i}">${i===p.target?"🐭":["🌼","🪔","🥟","🌿","🔔"][i%5]}</button>`).join("")}</div>`;
    if(p.type==="sequence")board=`<div class="seq-status">${p.phase==="show"?"Watch the pattern…":"Repeat the pattern"}</div><div class="seq-grid">${Array.from({length:p.pads},(_,i)=>`<button data-arena="seq" data-i="${i}" class="pad p${i}" ${p.phase==="show"?"disabled":""}>${i+1}</button>`).join("")}</div><div class="seq-entry">${p.entry.length}/${p.seq.length}</div>`;
    if(p.type==="pattern")board=`<div class="question">${p.series.join(" · ")} · ?</div><div class="answer-grid">${p.opts.map(x=>`<button data-arena="answer" data-value="${x}">${x}</button>`).join("")}</div>`;
    app.innerHTML=shell(`<div class="arena-playtop"><button data-arena="menu">← Levels</button><span>${g.name} · ${diffs[st.difficulty].label}</span><b>Level ${st.level>100?"∞ "+st.level:st.level}</b></div><div class="arena-board">${msg?`<p class="arena-msg">${e(msg)}</p>`:""}${board}</div>`);
  }
  function showSequence(){
    const p=st.puzzle;if(!p||p.type!=="sequence")return;
    let i=0;
    const t=setInterval(()=>{
      document.querySelectorAll(".seq-grid .pad").forEach(x=>x.classList.remove("flash"));
      if(i>=p.seq.length){clearInterval(t);p.phase="input";save();renderPlay();return;}
      document.querySelector(`.seq-grid .p${p.seq[i]}`)?.classList.add("flash");i++;
    },st.difficulty==="hard"?430:st.difficulty==="medium"?560:700);
  }
  function win(){
    const elapsed=Math.max(1,Math.round((Date.now()-st.startedAt)/1000)),base=4+Math.ceil(st.level/10),amount=Math.round(base*diffs[st.difficulty].mult);
    if(st.screen==="won")return;
    st.screen="won";stopMemoryClock();
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
    if(["open","exit","menu","classic","game","difficulty"].includes(a))stopMemoryClock();
    if(a==="memory-pause"){pauseMemory();return;}
    if(a==="memory-resume"){st.puzzle.paused=false;save();renderPlay();startMemoryClock();return;}
    if(a==="memory-retry"){play(st.level);return;}
    if(a==="open"){try{document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape"}));}catch{}st.screen="menu";save();menu();return}
    if(a==="exit"){save();window.GFJClassic?.home?.();void window.GFJAnonymousSave?.syncNow?.();return}
    if(a==="menu"){st.screen="menu";save();menu();return}
    if(a==="classic"){save();window.GFJClassic?.trail?.();return}
    if(a==="game"){st.game=b.dataset.id;st.screen="menu";save();menu();return}
    if(a==="difficulty"){st.difficulty=b.dataset.id;st.screen="menu";save();menu();return}
    if(a==="level"){play(Number(b.dataset.level));return}
    if(a==="next"){play(st.level+1);return}
    const p=st.puzzle;if(!p)return;
    if(a==="answer"){Number(b.dataset.value)===p.ans?win():wrong();return}
    if(a==="hunt"){Number(b.dataset.i)===p.target?win():wrong();return}
    if(a==="seq"){if(p.phase!=="input")return;const v=Number(b.dataset.i);if(v!==p.seq[p.entry.length]){p.entry=[];save();wrong();return}p.entry.push(v);save();if(p.entry.length===p.seq.length)win();else renderPlay();return}
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
      stopMemoryClock();
      st.screen="menu";
      save();
      menu();
    }
  };
})();