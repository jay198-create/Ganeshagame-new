const assert=require('node:assert/strict'),fs=require('node:fs');
const {JSDOM}=require('jsdom');
(async()=>{
 const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'https://game.test',runScripts:'outside-only'}),w=dom.window;
 w.MutationObserver=class{observe(){} disconnect(){}};
 w.console.warn=()=>{};
 w.fetch=()=>new Promise(()=>{});
 const realSet=w.setTimeout.bind(w); w.setTimeout=(fn,ms)=>realSet(fn,ms===4000?5:ms);
 const loaded=[];
 const append=w.document.body.appendChild.bind(w.document.body);
 w.document.body.appendChild=function(el){if(el.tagName==='SCRIPT'){loaded.push(el.src);queueMicrotask(()=>el.onload());return el;}return append(el);};
 w.eval(fs.readFileSync('anonymous-cloud.js','utf8'));
 await new Promise(r=>setTimeout(r,40));
 assert.equal(loaded.length,7,'all scripts load even when cloud save never answers');
 assert(loaded[0].includes('core.js'));
 w.close();console.log('PASS: hung cloud save cannot block game startup');
})();
