const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

for (const file of [
  "core.js","game.js","festival-data.js","festival-art.js",
  "level-arena.js","festival-studio.js","anonymous-cloud.js"
]) {
  const source = fs.readFileSync(file,"utf8");
  new vm.Script(source,{filename:file});
}

const context={window:{}};
context.window.window=context.window;
vm.createContext(context);
vm.runInContext(fs.readFileSync("festival-data.js","utf8"),context);
vm.runInContext(fs.readFileSync("festival-art.js","utf8"),context);
const D=context.window.GFJData,A=context.window.GFJArt;

assert.equal(D.idols.length,105,"final idol catalog must contain 105 idols");
assert.equal(D.mandaps.length,120,"mandap catalog must contain 120 designs");
assert.equal(D.decorations.length,500,"decoration catalog must contain 500 designs");
assert.equal(D.mantras.length,43,"mantra library must contain 43 learning passages");
assert.equal(D.pujaItems.length,32,"puja collection must contain 32 ritual items");
assert(D.pujaItems.every(x=>x.artKey && !x.icon),"puja items must use vector art keys instead of emoji icons");
assert.equal(new Set(D.mandaps.map(x=>A.mandapSvg(x))).size,120,"mandap artwork must be distinct");
assert.equal(new Set(D.decorations.map(x=>A.decorSvg(x))).size,500,"decoration artwork must be distinct");
assert(D.mantras.some(x=>x.collection==="Sri Ganapati Talam"),"Ganapati Talam must be included");
assert(D.mantras.some(x=>x.title==="Agajanana Padmarkam"),"Agajanana Padmarkam must be included");
assert(D.mantras.some(x=>x.id==="gananam-tva"),"Rigveda Gananam Tva mantra must be included");
assert(D.pujaItems.every(x=>A.pujaSvg(x).includes("puja-art")),"every puja item must render premium SVG artwork");

const game=fs.readFileSync("game.js","utf8");
const arena=fs.readFileSync("level-arena.js","utf8");
const studio=fs.readFileSync("festival-studio.js","utf8");
const style=fs.readFileSync("style.css","utf8");
const studioStyle=fs.readFileSync("festival-studio.css","utf8");

assert(game.includes("GFJLevelArena?.open"),"Journey must route into the 100-level game system");
assert(game.includes("GFJFestivalStudio?.open"),"My Festival must route into the upgraded festival system");
assert(!arena.includes('textContent="100 Levels"'),"no separate 100 Levels nav tab");
assert(!studio.includes('textContent="Festival Studio"'),"no separate Festival Studio nav tab");
assert(arena.includes("Original 25-round challenge"),"classic circuit remains inside Journey");
assert(style.includes("background-size: 185% auto"),"original Ganesha tile crop fix present");
assert(studioStyle.includes("object-fit:contain;object-position:center;padding:10px"),"idol shop uses contain fitting");

console.log("PASS: unified Journey/My Festival, 105 idols, 120 mandaps, 500 decorations, and crop protections.");
