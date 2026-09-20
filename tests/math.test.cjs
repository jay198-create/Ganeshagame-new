const fs=require('node:fs'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const dom=new JSDOM('<main id="app"></main>',{url:'https://game.test',runScripts:'outside-only'}),w=dom.window;
const progress=Object.fromEntries(['easy','medium','hard'].map(d=>['math:'+d,{unlocked:100,best:{}}]));
w.localStorage.setItem('ganesha-festival-v5-levels',JSON.stringify({game:'math',progress}));
w.eval(fs.readFileSync('level-arena.js','utf8'));w.GFJLevelArena.open();
const click=sel=>w.document.querySelector(sel).click();
for(const difficulty of ['easy','medium','hard']){
 click('[data-arena="difficulty"][data-id="'+difficulty+'"]');
 for(let level=1;level<=100;level++){
  click('[data-arena="level"][data-level="'+level+'"]');
  const p=JSON.parse(w.localStorage.getItem('ganesha-festival-v5-levels')).puzzle;
  const expression=p.text.replace(/(\d+)% of (\d+)/,'($1 * $2 / 100)').replaceAll('×','*').replaceAll('÷','/').replaceAll('−','-');
  assert.equal(Function('return '+expression)(),p.ans);
  assert.equal(new Set(p.opts).size,4);assert(p.opts.includes(p.ans));
  click('[data-arena="menu"]');
 }
}
const seen=new Set();
for(let i=0;i<20;i++){click('[data-arena="level"][data-level="1"]');const p=JSON.parse(w.localStorage.getItem('ganesha-festival-v5-levels')).puzzle;assert(!seen.has(p.text));seen.add(p.text);click('[data-arena="menu"]');}
w.close();console.log('PASS: 300 math configurations, correct answers and options, 20 fresh attempts');
