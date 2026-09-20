const fs=require('node:fs'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const dom=new JSDOM('<main id="app"></main>',{url:'https://game.test',runScripts:'outside-only'}),w=dom.window;
w.scrollTo=()=>{};w.alert=()=>{};
w.localStorage.setItem('ganesha-festival-v3',JSON.stringify({coins:2000}));
for(const f of ['festival-data.js','festival-art.js','festival-studio.js'])w.eval(fs.readFileSync(f,'utf8'));
w.GFJFestivalStudio.open();
function click(sel){const b=w.document.querySelector(sel);assert(b,sel);b.click();}
click('[data-v5="tab"][data-id="festival"]');
for(let day=1;day<=3;day++){
 assert(w.document.querySelector('.eyebrow').textContent);
 for(let i=0;i<6;i++){const box=w.document.querySelector('[data-v5-check="'+i+'"]');box.checked=true;box.dispatchEvent(new w.Event('change',{bubbles:true}));}
 click('[data-v5="complete-day"]');
 const st=JSON.parse(w.localStorage.getItem('ganesha-festival-v5-builder'));
 assert.equal(st.completedDays.length,day);
 assert.equal(st.view,day===3?'procession':'festival');
}
assert(w.document.querySelector('[data-v5="procession-next"]'));w.close();
console.log('PASS: all three puja days required, including final day, before procession');
