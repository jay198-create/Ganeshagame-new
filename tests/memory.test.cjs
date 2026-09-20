const assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
const dom=new JSDOM('<main id="app"></main>',{url:'https://game.test',runScripts:'outside-only'}),w=dom.window;
let timers=[];w.setTimeout=fn=>{timers.push(fn);return timers.length};w.clearTimeout=()=>{timers=[]};
w.localStorage.setItem('ganesha-festival-v3',JSON.stringify({coins:0}));
w.eval(fs.readFileSync('level-arena.js','utf8'));w.GFJLevelArena.open();
const click=sel=>{const el=w.document.querySelector(sel);assert(el,sel);el.click();};
for(const difficulty of ['easy','medium','hard']){
 click('[data-arena="difficulty"][data-id="'+difficulty+'"]');
 click('[data-arena="level"][data-level="1"]');
 let state=JSON.parse(w.localStorage.getItem('ganesha-festival-v5-levels'));
 assert.equal(state.puzzle.type,'memory');assert(!state.puzzle.vals,'pair matching removed');
 assert.equal(w.document.querySelectorAll('.mem-grid .ganesha-token').length,state.puzzle.targets.length);
 assert([...w.document.querySelectorAll('[data-arena="mem"]')].every(x=>x.disabled));
 click('[data-arena="memory-pause"]');assert.equal(w.document.querySelectorAll('.mem-grid').length,0);
 click('[data-arena="memory-resume"]');timers.pop()();
 assert.equal(w.document.querySelectorAll('.mem-grid .ganesha-token').length,0);
 for(const i of state.puzzle.targets)click('[data-arena="mem"][data-i="'+i+'"]');
 assert(w.document.querySelector('.arena-win'));
 state=JSON.parse(w.localStorage.getItem('ganesha-festival-v5-levels'));assert.equal(state.progress['memory:'+difficulty].unlocked,2);
 click('[data-arena="menu"]');assert.equal(w.document.querySelectorAll('.level-grid button').length,100);
}
w.close();console.log('PASS: original position-recall, 3 difficulties, 100-level maps, pause, hidden targets, rewards and progression');
