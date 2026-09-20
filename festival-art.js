(() => {
  "use strict";

  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  })[c]);

  const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
  const num = id => Math.max(1, Number(String(id||"").match(/\d+/)?.[0] || 1));
  const uid = (prefix,id) => prefix + "-" + String(id||"x").replace(/[^a-z0-9_-]/gi,"-");

  function rosette(cx,cy,r,petals,fill,stroke="#ffffff55"){
    let p="";
    for(let i=0;i<petals;i++){
      const a=(Math.PI*2*i)/petals, x=cx+Math.cos(a)*r*.62, y=cy+Math.sin(a)*r*.62;
      p += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(r*.38).toFixed(1)}" ry="${(r*.2).toFixed(1)}" transform="rotate(${(i*360/petals).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${fill}" stroke="${stroke}" stroke-width=".7"/>`;
    }
    return p+`<circle cx="${cx}" cy="${cy}" r="${(r*.25).toFixed(1)}" fill="#ffd35f"/>`;
  }

  function mandapSvg(m, opts={}){
    if(!m) return "";
    const id=uid("m",m.id), n=num(m.id), p=m.primary||"#d99a2b", s=m.secondary||"#6e1717";
    const accent=["#ffd76b","#f5efe0","#f4a6b8","#7fe0c7","#b9d5ff"][n%5];
    const arch=m.architecture||"Festival Mandap", roof=m.roof||"arch", pillars=clamp(Number(m.pillars)||4,2,6), pattern=Number(m.pattern)||0;
    const W=360,H=250;
    let roofShape="";
    if(roof==="dome") roofShape=`<path d="M62 92 Q180 10 298 92 L284 108 Q180 45 76 108Z" fill="url(#r-${id})" stroke="${accent}" stroke-width="3"/><circle cx="180" cy="31" r="8" fill="${accent}"/>`;
    else if(roof==="canopy") roofShape=`<path d="M48 72 Q180 34 312 72 L286 110 Q180 77 74 110Z" fill="url(#r-${id})" stroke="${accent}" stroke-width="3"/>`;
    else if(roof==="gopuram") roofShape=`<path d="M112 110 L132 91 L143 91 L154 72 L166 72 L180 45 L194 72 L206 72 L217 91 L228 91 L248 110Z" fill="url(#r-${id})" stroke="${accent}" stroke-width="3"/>`;
    else roofShape=`<path d="M55 109 Q72 44 180 38 Q288 44 305 109 L286 111 Q262 69 180 66 Q98 69 74 111Z" fill="url(#r-${id})" stroke="${accent}" stroke-width="3"/>`;

    let pillarSvg="";
    for(let i=0;i<pillars;i++){
      const x=68 + i*(224/(pillars-1));
      pillarSvg += `<g><rect x="${(x-6).toFixed(1)}" y="101" width="12" height="118" rx="5" fill="url(#p-${id})" stroke="${accent}" stroke-width="1.2"/><rect x="${(x-10).toFixed(1)}" y="99" width="20" height="8" rx="3" fill="${accent}" opacity=".9"/><rect x="${(x-10).toFixed(1)}" y="214" width="20" height="8" rx="3" fill="${accent}" opacity=".8"/></g>`;
    }

    let motif="";
    if(pattern===0) motif=`<path d="M90 121 Q180 86 270 121" fill="none" stroke="${accent}" stroke-width="5" stroke-dasharray="5 8"/>`;
    if(pattern===1) motif=`<g opacity=".9">${[110,145,180,215,250].map((x,i)=>rosette(x,118,9,6,i%2?p:accent)).join("")}</g>`;
    if(pattern===2) motif=`<path d="M94 119 L118 105 L142 119 L166 105 L190 119 L214 105 L238 119 L262 105" fill="none" stroke="${accent}" stroke-width="4"/>`;
    if(pattern===3) motif=`<g fill="${accent}">${[105,135,165,195,225,255].map((x,i)=>`<circle cx="${x}" cy="${115+(i%2)*8}" r="${4+(i%3)}"/>`).join("")}</g>`;
    if(pattern===4) motif=`<path d="M100 107 C125 135 150 90 180 120 C210 150 235 95 260 112" fill="none" stroke="${accent}" stroke-width="4"/>`;
    if(pattern===5) motif=`<g opacity=".95">${[120,150,180,210,240].map((x,i)=>`<path d="M${x} 104 l8 12 -8 12 -8 -12Z" fill="${i%2?accent:p}"/>`).join("")}</g>`;

    const lamps=[88,272].map(x=>`<g><path d="M${x} 202 q8 13 16 0 q-2 18-8 18t-8-18" fill="#c9822b"/><path d="M${x+8} 198 q-5-11 0-18 q6 8 0 18" fill="#ffd95c"/></g>`).join("");
    const sideFlowers=`${rosette(49,127,12,7,p)}${rosette(311,127,12,7,p)}`;
    const floorPattern=Array.from({length:7},(_,i)=>`<circle cx="${120+i*20}" cy="222" r="${3+(i%2)}" fill="${i%2?accent:p}" opacity=".9"/>`).join("");

    return `<svg class="mandap-art ${opts.large?"large":""}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(m.name||arch)}">
      <defs>
        <linearGradient id="bg-${id}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${s}"/><stop offset="1" stop-color="#07151a"/></linearGradient>
        <linearGradient id="r-${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${p}"/><stop offset=".5" stop-color="${accent}"/><stop offset="1" stop-color="${p}"/></linearGradient>
        <linearGradient id="p-${id}" x1="0" y1="0" x2="1" y2="0"><stop stop-color="${p}"/><stop offset=".5" stop-color="${accent}"/><stop offset="1" stop-color="${p}"/></linearGradient>
        <radialGradient id="glow-${id}"><stop stop-color="${accent}" stop-opacity=".38"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="${W}" height="${H}" rx="18" fill="url(#bg-${id})"/>
      <circle cx="180" cy="132" r="120" fill="url(#glow-${id})"/>
      <path d="M38 220 Q180 188 322 220 L322 242 L38 242Z" fill="#9c6b40" opacity=".48"/>
      ${roofShape}${pillarSvg}${motif}${sideFlowers}${lamps}
      <path d="M74 110 Q180 143 286 110" fill="none" stroke="${accent}" stroke-width="2.5" opacity=".8"/>
      ${floorPattern}
      <rect x="128" y="196" width="104" height="25" rx="7" fill="${p}" stroke="${accent}" stroke-width="2"/>
      <rect x="145" y="190" width="70" height="10" rx="4" fill="${accent}" opacity=".85"/>
      <g opacity=".75" fill="${accent}">
        ${Array.from({length:9},(_,i)=>`<circle cx="${74+i*26.5}" cy="${85 + ((i+n)%3)*6}" r="2.4"/>`).join("")}
      </g>
    </svg>`;
  }

  function decorSvg(d, opts={}){
    if(!d) return "";
    const id=uid("d",d.id), n=num(d.id), p=d.primary||"#d99a2b", s=d.secondary||"#6e1717", cat=d.category||"Festival Decor", tier=clamp(Number(d.tier)||1,1,5);
    const accent=["#ffd55f","#f7f0dd","#82d7c0","#e7a0b7","#94bfff"][n%5];
    let art="";
    const dots=(count,y=50)=>Array.from({length:count},(_,i)=>`<circle cx="${20+i*(80/Math.max(1,count-1))}" cy="${y+((i+n)%2)*7}" r="${3+tier*.45}" fill="${i%2?p:accent}"/>`).join("");

    switch(cat){
      case "Flower Garland":
      case "Marigold Toran":
        art=`<path d="M10 30 Q60 78 110 30" fill="none" stroke="${s}" stroke-width="4"/>${dots(7,40)}`; break;
      case "Mango Leaf Toran":
        art=`<path d="M10 28 Q60 52 110 28" fill="none" stroke="${p}" stroke-width="4"/>${Array.from({length:8},(_,i)=>`<ellipse cx="${18+i*13}" cy="${39+((i+n)%2)*5}" rx="5" ry="10" transform="rotate(${i%2?-18:18} ${18+i*13} ${39+((i+n)%2)*5})" fill="${i%2?p:accent}"/>`).join("")}`; break;
      case "Fairy Lights":
        art=`<path d="M8 25 Q60 62 112 25" fill="none" stroke="#cabf9d" stroke-width="2"/>${Array.from({length:9},(_,i)=>`<circle cx="${14+i*12}" cy="${31+Math.sin(i)*13}" r="${3+tier*.4}" fill="${i%2?accent:"#fff2a6"}"/><circle cx="${14+i*12}" cy="${31+Math.sin(i)*13}" r="${7+tier}" fill="${accent}" opacity=".12"/>`).join("")}`; break;
      case "Deepam Row":
      case "Floor Lamps":
        art=Array.from({length:5},(_,i)=>`<g transform="translate(${12+i*22},36)"><path d="M0 20 q9 8 18 0 q-3 13-9 13t-9-13" fill="${i%2?p:s}"/><path d="M9 18 q-5-10 0-16 q7 7 0 16" fill="#ffd65c"/></g>`).join(""); break;
      case "Brass Bells":
        art=Array.from({length:5},(_,i)=>`<g transform="translate(${13+i*22},18)"><path d="M8 8 v14 q-8 9-8 20 h16 q0-11-8-20" fill="${p}" stroke="${accent}" stroke-width="1.5"/><circle cx="8" cy="44" r="3" fill="${accent}"/></g>`).join(""); break;
      case "Rangoli":
        art=`<g transform="translate(60 55)">${rosette(0,0,32,8,p,accent)}<circle r="11" fill="${s}"/><circle r="5" fill="${accent}"/></g>`; break;
      case "Lotus Arrangement":
        art=`<g transform="translate(60 60)">${rosette(0,0,35,10,p,accent)}<ellipse cx="0" cy="21" rx="35" ry="8" fill="${s}" opacity=".6"/></g>`; break;
      case "Banana Stem":
        art=`<rect x="48" y="18" width="24" height="76" rx="10" fill="#78a23f"/><path d="M54 23 Q16 18 15 45 Q45 42 60 60" fill="#5ca65d"/><path d="M66 23 Q104 18 105 45 Q75 42 60 60" fill="#4b9250"/>`; break;
      case "Kalash":
        art=`<path d="M42 35 Q60 27 78 35 L74 45 Q84 60 77 85 Q60 99 43 85 Q36 60 46 45Z" fill="${p}" stroke="${accent}" stroke-width="2"/><path d="M60 34 Q45 18 39 16 Q52 13 60 25 Q68 13 81 16 Q75 18 60 34" fill="#5a9b55"/><ellipse cx="60" cy="44" rx="17" ry="5" fill="${accent}"/>`; break;
      case "Fabric Drapes":
      case "Backdrop":
        art=`<path d="M15 20 Q33 42 46 18 Q60 45 74 18 Q88 42 105 20 L105 98 L15 98Z" fill="${p}" opacity=".9"/><path d="M20 25 Q35 51 48 25 Q60 54 72 25 Q86 51 100 25" fill="none" stroke="${accent}" stroke-width="4"/>`; break;
      case "Flower Pillar":
        art=`<rect x="51" y="12" width="18" height="96" rx="7" fill="${s}"/>${Array.from({length:6},(_,i)=>rosette(60,20+i*16,9,6,i%2?p:accent)).join("")}`; break;
      case "Ceiling Hangings":
        art=`<path d="M10 18 H110" stroke="${accent}" stroke-width="3"/>${Array.from({length:6},(_,i)=>`<g transform="translate(${18+i*17},18)"><path d="M0 0 v${24+(i%3)*8}" stroke="${p}" stroke-width="2"/><path d="M-6 ${25+(i%3)*8} l6 10 6-10Z" fill="${accent}"/></g>`).join("")}`; break;
      case "Coconut Decor":
        art=`<ellipse cx="60" cy="62" rx="26" ry="32" fill="#8b5734"/><path d="M49 35 Q46 15 38 7 M59 31 Q60 12 60 5 M69 35 Q77 16 84 10" stroke="#4b8f4a" stroke-width="7" stroke-linecap="round"/><circle cx="52" cy="58" r="3" fill="#432719"/><circle cx="61" cy="55" r="3" fill="#432719"/><circle cx="68" cy="60" r="3" fill="#432719"/>`; break;
      case "Sugarcane Arch":
        art=`<path d="M24 102 Q20 30 46 18 M96 102 Q100 30 74 18 M46 18 Q60 5 74 18" fill="none" stroke="#72a84e" stroke-width="8"/>${Array.from({length:5},(_,i)=>`<path d="M${30+i*15} ${28+i%2*15} q-18-12-24 1 q18 8 28 13" fill="#5e9b48"/>`).join("")}`; break;
      case "Rice Sheaf":
        art=`<path d="M60 105 Q55 60 22 20 M60 105 Q62 57 95 18 M60 105 Q60 55 60 10" stroke="#c79a46" stroke-width="4"/>${Array.from({length:12},(_,i)=>`<ellipse cx="${24+(i%3)*35}" cy="${25+Math.floor(i/3)*15}" rx="4" ry="8" fill="${i%2?p:accent}"/>`).join("")}`; break;
      case "Peacock Accent":
        art=`<ellipse cx="61" cy="64" rx="13" ry="30" fill="#2778a2"/><circle cx="61" cy="29" r="11" fill="#3b9b7a"/><path d="M52 68 Q10 38 21 100 Q45 83 60 78 M70 68 Q110 38 99 100 Q77 83 62 78" fill="${p}" stroke="${accent}" stroke-width="2"/>${rosette(60,78,18,7,accent,p)}`; break;
      case "Umbrella Canopy":
        art=`<path d="M18 48 Q60 4 102 48 Q91 38 81 48 Q70 38 60 48 Q49 38 39 48 Q28 38 18 48Z" fill="${p}" stroke="${accent}" stroke-width="2"/><path d="M60 48 v54" stroke="${accent}" stroke-width="4"/><circle cx="60" cy="12" r="5" fill="${accent}"/>`; break;
      default:
        art=`${rosette(60,55,34,8,p,accent)}`;
    }

    return `<svg class="decor-art ${opts.large?"large":""}" viewBox="0 0 120 120" role="img" aria-label="${esc(d.name||cat)}">
      <defs><radialGradient id="dg-${id}"><stop stop-color="${accent}" stop-opacity=".18"/><stop offset="1" stop-color="${s}" stop-opacity=".04"/></radialGradient></defs>
      <rect x="2" y="2" width="116" height="116" rx="20" fill="url(#dg-${id})" stroke="${accent}" stroke-opacity=".22"/>
      ${art}
      <circle cx="105" cy="105" r="${5+tier}" fill="${p}" stroke="${accent}" stroke-width="1"/>
    </svg>`;
  }

  function pujaSvg(item){
    if(!item) return "";
    const id=uid("p",item.id), key=item.artKey||"offering";
    const brass=`url(#brass-${id})`, copper=`url(#copper-${id})`, silver=`url(#silver-${id})`;
    const frame=`
      <defs>
        <linearGradient id="brass-${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#6b4017"/><stop offset=".23" stop-color="#f2c66c"/><stop offset=".52" stop-color="#9a611f"/><stop offset=".77" stop-color="#ffe0a0"/><stop offset="1" stop-color="#6b4017"/></linearGradient>
        <linearGradient id="copper-${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#542819"/><stop offset=".3" stop-color="#c87945"/><stop offset=".63" stop-color="#f0ad75"/><stop offset="1" stop-color="#6f321d"/></linearGradient>
        <linearGradient id="silver-${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#68757b"/><stop offset=".3" stop-color="#eff5f3"/><stop offset=".55" stop-color="#aab8bb"/><stop offset=".82" stop-color="#ffffff"/><stop offset="1" stop-color="#59676c"/></linearGradient>
        <radialGradient id="halo-${id}"><stop stop-color="#e9bb7040"/><stop offset="1" stop-color="#08191f00"/></radialGradient>
        <filter id="shadow-${id}" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#000" flood-opacity=".5"/></filter>
      </defs>
      <rect x="2" y="2" width="156" height="126" rx="17" fill="#091a20" stroke="#e7ba7050"/>
      <circle cx="80" cy="61" r="56" fill="url(#halo-${id})"/>
      <ellipse cx="80" cy="109" rx="49" ry="10" fill="#000" opacity=".3"/>
    `;
    let art="";
    const bowl=(fill="#d49b3e",inside="#c84735")=>`<g filter="url(#shadow-${id})"><ellipse cx="80" cy="82" rx="32" ry="11" fill="${fill}"/><path d="M48 81 Q52 111 80 114 Q108 111 112 81" fill="${fill}"/><ellipse cx="80" cy="81" rx="27" ry="8" fill="${inside}"/><ellipse cx="80" cy="79" rx="20" ry="4" fill="#ffffff25"/></g>`;
    const tray=()=>`<g filter="url(#shadow-${id})"><ellipse cx="80" cy="92" rx="45" ry="15" fill="${brass}" stroke="#ffe1a3" stroke-width="1.4"/><ellipse cx="80" cy="89" rx="38" ry="10" fill="#6f431c" opacity=".45"/></g>`;

    switch(key){
      case "durva":
        art=`<g filter="url(#shadow-${id})">${Array.from({length:11},(_,i)=>`<path d="M${55+i*5} 99 Q${48+i*4} ${63-(i%3)*8} ${54+i*5} ${30+(i%4)*6}" fill="none" stroke="${i%2?"#5aa151":"#7fbe63"}" stroke-width="3" stroke-linecap="round"/>`).join("")}<path d="M52 99 Q80 109 108 99" stroke="#8a622e" stroke-width="5" stroke-linecap="round"/></g>`; break;
      case "hibiscus":
        art=`<g transform="translate(80 66)" filter="url(#shadow-${id})">${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-24" rx="17" ry="30" transform="rotate(${a})" fill="#bf2536" stroke="#ee6c7c" stroke-width="1.2"/>`).join("")}<circle r="13" fill="#8e1726"/><path d="M0 2 Q18 16 21 37" stroke="#dba13d" stroke-width="3" fill="none"/>${Array.from({length:6},(_,i)=>`<circle cx="${20+i%2*4}" cy="${28+i*3}" r="1.7" fill="#ffd36a"/>`).join("")}</g>`; break;
      case "lotus":
        art=`<g transform="translate(80 72)" filter="url(#shadow-${id})">${[0,45,90,135,180,225,270,315].map(a=>`<ellipse cx="0" cy="-23" rx="11" ry="27" transform="rotate(${a})" fill="#db7298" stroke="#f2a3bc"/>`).join("")}${[22,67,112,157,202,247,292,337].map(a=>`<ellipse cx="0" cy="-15" rx="8" ry="19" transform="rotate(${a})" fill="#efabc0"/>`).join("")}<circle r="8" fill="#f2c45f"/></g>`; break;
      case "marigold":
        art=`<g filter="url(#shadow-${id})">${[[58,64],[83,54],[102,70],[72,87],[96,91]].map(([x,y],j)=>`<g transform="translate(${x} ${y})">${rosette(0,0,19,10,j%2?"#f4a712":"#e47f0d","#ffd15e")}</g>`).join("")}</g>`; break;
      case "coconut":
        art=`<g filter="url(#shadow-${id})"><ellipse cx="80" cy="76" rx="27" ry="36" fill="#6c3f28"/><path d="M61 49 Q80 37 99 49" stroke="#b48458" stroke-width="5"/><path d="M66 45 Q58 26 49 17 M79 42 Q80 22 80 13 M92 46 Q102 29 111 20" stroke="#4e8e48" stroke-width="7" stroke-linecap="round"/><circle cx="70" cy="70" r="3.4" fill="#302017"/><circle cx="81" cy="67" r="3.4" fill="#302017"/><circle cx="91" cy="73" r="3.4" fill="#302017"/></g>`; break;
      case "banana":
        art=`<g filter="url(#shadow-${id})">${[0,1,2,3].map(i=>`<path d="M50 ${55+i*7} Q79 ${89+i*3} 111 ${57+i*2} Q92 ${100+i*2} 55 ${75+i*5}Z" fill="${i%2?"#e7c743":"#f0d85a"}" stroke="#9b7e1e" stroke-width="1.2"/>`).join("")}<path d="M50 55 Q43 48 45 40" stroke="#6f7a2c" stroke-width="5"/></g>`; break;
      case "fruit":
        art=tray()+`<g filter="url(#shadow-${id})"><circle cx="61" cy="75" r="13" fill="#bb3a3e"/><circle cx="86" cy="71" r="14" fill="#d98b2c"/><ellipse cx="101" cy="83" rx="15" ry="11" fill="#6ea34f"/><path d="M56 64 q6-9 12-4" stroke="#4b813e" stroke-width="3"/></g>`; break;
      case "modak":
        art=tray()+`<g filter="url(#shadow-${id})">${[58,80,102].map((x,i)=>`<path d="M${x-12} 88 Q${x} ${48-i*3} ${x+12} 88 Q${x} 103 ${x-12} 88Z" fill="${i===1?"#f1c76d":"#ddb05b"}" stroke="#9c6a27" stroke-width="1.4"/><path d="M${x} 54 v28 M${x-6} 62 l6-8 6 8" stroke="#fff0b2" stroke-width="1.2" opacity=".65"/>`).join("")}</g>`; break;
      case "panchamrit":
        art=bowl(silver,"#f1e8cf")+`<g opacity=".9"><circle cx="69" cy="77" r="3" fill="#d9b35b"/><circle cx="82" cy="78" r="2.5" fill="#f1cc72"/><circle cx="94" cy="76" r="3" fill="#c78d4b"/></g>`; break;
      case "milk":
        art=`<g filter="url(#shadow-${id})"><path d="M55 43 Q80 35 105 43 L100 101 Q80 113 60 101Z" fill="${silver}" stroke="#e9f3f4"/><ellipse cx="80" cy="44" rx="24" ry="8" fill="#fffdf1"/><path d="M104 53 q27 5 18 31 q-5 13-20 7" fill="none" stroke="#cbd8d8" stroke-width="7"/></g>`; break;
      case "ghee":
        art=`<g filter="url(#shadow-${id})"><path d="M51 47 Q80 37 109 47 L103 102 Q80 113 57 102Z" fill="${brass}" stroke="#ffe1a2"/><ellipse cx="80" cy="48" rx="25" ry="8" fill="#f5d86a"/><ellipse cx="80" cy="48" rx="17" ry="4" fill="#fff4a8" opacity=".7"/></g>`; break;
      case "honey":
        art=`<g filter="url(#shadow-${id})"><rect x="52" y="42" width="56" height="65" rx="13" fill="#b96b1e" stroke="#efbd62" stroke-width="2"/><rect x="60" y="32" width="40" height="15" rx="4" fill="${brass}"/><path d="M56 65 Q80 55 104 65 V95 Q80 105 56 95Z" fill="#e9a32b" opacity=".8"/><path d="M71 73 h18 l-9 16Z" fill="#704119" opacity=".65"/></g>`; break;
      case "jaggery":
        art=tray()+`<g filter="url(#shadow-${id})">${[[62,78],[81,72],[98,81],[75,91],[93,94]].map(([x,y],i)=>`<path d="M${x-9} ${y-7} l13-5 8 9-5 12-14 1-6-9Z" fill="${i%2?"#a9652e":"#c47b35"}" stroke="#e1a46b"/>`).join("")}</g>`; break;
      case "rice":
        art=bowl(brass,"#f4eed9")+`<g fill="#fffaf0">${Array.from({length:28},(_,i)=>`<ellipse cx="${58+(i*17)%44}" cy="${73+((i*11)%15)}" rx="2.5" ry="1.1" transform="rotate(${(i*31)%180} ${58+(i*17)%44} ${73+((i*11)%15)})"/>`).join("")}</g>`; break;
      case "turmeric":
        art=bowl(brass,"#e7a91e")+`<circle cx="80" cy="78" r="18" fill="#efb726"/><path d="M66 81 Q80 69 94 81" stroke="#ffd45c" stroke-width="3" opacity=".65"/>`; break;
      case "kumkum":
        art=bowl(brass,"#a71323")+`<circle cx="80" cy="78" r="18" fill="#c51d32"/><path d="M67 81 Q80 69 93 81" stroke="#f26773" stroke-width="3" opacity=".6"/>`; break;
      case "sandal":
        art=bowl(brass,"#c99462")+`<circle cx="80" cy="78" r="18" fill="#d7ae80"/><path d="M64 79 Q80 68 96 79" stroke="#f0d5b3" stroke-width="3" opacity=".7"/>`; break;
      case "betel-leaf":
        art=`<g filter="url(#shadow-${id})">${[[65,68,-22],[85,63,8],[95,84,29],[68,90,-8]].map(([x,y,a],i)=>`<path d="M${x} ${y+20} Q${x-22} ${y} ${x} ${y-28} Q${x+22} ${y} ${x} ${y+20}Z" fill="${i%2?"#32783e":"#3e8d4a"}" stroke="#7fc37c" transform="rotate(${a} ${x} ${y})"/><path d="M${x} ${y+15} L${x} ${y-20}" stroke="#b2d29b" stroke-width="1.3" transform="rotate(${a} ${x} ${y})"/>`).join("")}</g>`; break;
      case "betel-nut":
        art=tray()+`<g filter="url(#shadow-${id})">${[[63,79],[82,73],[100,82],[77,91],[94,94]].map(([x,y],i)=>`<ellipse cx="${x}" cy="${y}" rx="9" ry="12" fill="${i%2?"#8b4d2e":"#a55c34"}" stroke="#cf8c5e"/>`).join("")}</g>`; break;
      case "kalash":
        art=`<g filter="url(#shadow-${id})"><path d="M53 54 Q80 42 107 54 L101 68 Q116 90 99 111 Q80 123 61 111 Q44 90 59 68Z" fill="${brass}" stroke="#ffe2a2" stroke-width="1.6"/><ellipse cx="80" cy="57" rx="25" ry="8" fill="#7d4b20"/><path d="M80 53 Q58 30 47 24 Q65 22 80 40 Q95 22 113 24 Q102 30 80 53" fill="#4c8d49"/><ellipse cx="80" cy="52" rx="15" ry="18" fill="#6d4228"/><path d="M69 39 Q79 23 88 40" stroke="#7da950" stroke-width="5"/></g>`; break;
      case "mango-leaves":
        art=`<g filter="url(#shadow-${id})"><path d="M80 105 Q78 70 80 33" stroke="#7c5b29" stroke-width="4"/>${[-38,-20,0,20,38].map((dx,i)=>`<path d="M80 ${84-i*9} Q${80+dx} ${56-i*4} ${80+dx*1.35} ${43-i*3} Q${84+dx*.5} ${77-i*6} 80 ${84-i*9}Z" fill="${i%2?"#4f934b":"#65a857"}" stroke="#8ac87a"/>`).join("")}</g>`; break;
      case "incense":
        art=`<g filter="url(#shadow-${id})"><ellipse cx="80" cy="103" rx="36" ry="9" fill="${brass}"/>${[65,80,95].map((x,i)=>`<path d="M${x} 98 L${x+8-i*8} 37" stroke="#9a5b35" stroke-width="3"/><path d="M${x+8-i*8} 37 Q${x-5} 25 ${x+10} 13 Q${x+22} 2 ${x+13} -5" fill="none" stroke="#d6d9d3" stroke-width="2" opacity=".55"/>`).join("")}</g>`; break;
      case "dhoop":
        art=`<g filter="url(#shadow-${id})"><path d="M52 69 Q80 55 108 69 L101 105 Q80 116 59 105Z" fill="${copper}" stroke="#f0b37b"/><ellipse cx="80" cy="69" rx="28" ry="9" fill="#2d2724"/><circle cx="80" cy="66" r="10" fill="#5d3c2c"/><path d="M79 57 Q56 35 75 18 Q88 7 80 -7 M84 58 Q107 36 90 19" fill="none" stroke="#d9ded9" stroke-width="3" opacity=".6"/></g>`; break;
      case "camphor":
        art=tray()+`<g filter="url(#shadow-${id})">${[[67,83],[83,77],[96,87]].map(([x,y],i)=>`<rect x="${x-8}" y="${y-8}" width="16" height="16" rx="3" fill="#f7f3e9" stroke="#cbd5d2"/>`).join("")}<path d="M83 65 Q73 49 84 37 Q95 49 83 65" fill="#ffce58"/><path d="M83 60 Q78 50 84 44" stroke="#fff3b4" stroke-width="3"/></g>`; break;
      case "diya":
        art=`<g filter="url(#shadow-${id})"><path d="M40 77 Q80 111 120 77 Q113 111 80 116 Q47 111 40 77Z" fill="${brass}" stroke="#ffe1a1" stroke-width="1.7"/><ellipse cx="80" cy="77" rx="40" ry="12" fill="#75471e"/><path d="M80 73 Q59 42 80 22 Q102 43 80 73" fill="#f4a72c"/><path d="M80 65 Q70 45 81 34" stroke="#ffeaa2" stroke-width="5" stroke-linecap="round"/></g>`; break;
      case "wicks":
        art=tray()+`<g filter="url(#shadow-${id})">${Array.from({length:8},(_,i)=>`<path d="M${53+i*8} ${86+(i%2)*5} Q${56+i*8} 69 ${61+i*7} 58" fill="none" stroke="#f4eee0" stroke-width="4" stroke-linecap="round"/>`).join("")}</g>`; break;
      case "bell":
        art=`<g filter="url(#shadow-${id})"><path d="M75 24 Q80 14 85 24 L85 36 Q104 51 105 83 H55 Q56 51 75 36Z" fill="${brass}" stroke="#ffe1a1" stroke-width="1.6"/><rect x="65" y="83" width="30" height="8" rx="4" fill="${brass}"/><circle cx="80" cy="94" r="7" fill="#bb7d2c"/><path d="M73 33 Q80 26 87 33" fill="none" stroke="#fff0b9" stroke-width="2"/></g>`; break;
      case "aarti":
        art=tray()+`<g filter="url(#shadow-${id})">${[[60,82],[80,75],[100,82]].map(([x,y])=>`<path d="M${x-9} ${y} Q${x} ${y+8} ${x+9} ${y} Q${x+5} ${y+12} ${x} ${y+13} Q${x-5} ${y+12} ${x-9} ${y}Z" fill="#b97125"/><path d="M${x} ${y-2} Q${x-6} ${y-14} ${x} ${y-22} Q${x+8} ${y-13} ${x} ${y-2}" fill="#ffd25e"/>`).join("")}<circle cx="80" cy="93" r="7" fill="#c81e32"/></g>`; break;
      case "prasadam":
        art=tray()+`<g filter="url(#shadow-${id})"><path d="M62 88 Q70 61 78 88 Q70 100 62 88Z" fill="#e2b358"/><path d="M82 88 Q91 57 101 88 Q91 102 82 88Z" fill="#efc76b"/><circle cx="55" cy="88" r="7" fill="#c8523b"/><circle cx="108" cy="89" r="7" fill="#6b9d45"/></g>`; break;
      case "flower-basket":
        art=`<g filter="url(#shadow-${id})"><path d="M46 70 Q80 58 114 70 L106 108 Q80 121 54 108Z" fill="#8c5d31" stroke="#d3a46c"/><path d="M55 69 Q80 26 105 69" fill="none" stroke="#a87945" stroke-width="5"/>${[[58,70,"#d84e61"],[75,64,"#efad24"],[93,69,"#e17aa1"],[105,77,"#f3c044"],[70,82,"#d54e72"],[90,84,"#f1a328"]].map(([x,y,col])=>`<g transform="translate(${x} ${y})">${rosette(0,0,10,7,col,"#ffd77d")}</g>`).join("")}</g>`; break;
      case "thread":
        art=`<g filter="url(#shadow-${id})"><circle cx="80" cy="70" r="31" fill="${silver}" stroke="#eaf0ee" stroke-width="2"/><circle cx="80" cy="70" r="14" fill="#091a20"/>${Array.from({length:8},(_,i)=>`<path d="M80 39 Q${45+i*10} 67 80 101" fill="none" stroke="#f4efe4" stroke-width="2" opacity=".9"/>`).join("")}<path d="M104 92 Q130 100 126 116" fill="none" stroke="#f4efe4" stroke-width="3"/></g>`; break;
      case "vastra":
        art=`<g filter="url(#shadow-${id})"><path d="M45 40 L112 51 L99 110 L34 97Z" fill="#a72d3b" stroke="#e8b260" stroke-width="2"/><path d="M52 49 L104 58 M48 62 L101 71 M44 75 L98 84" stroke="#e8b260" stroke-width="2" opacity=".65"/><path d="M43 93 L98 106" stroke="#f7d08b" stroke-width="4"/></g>`; break;
      default:
        art=tray()+`<circle cx="80" cy="76" r="24" fill="${brass}"/>`;
    }

    return `<svg class="puja-art" viewBox="0 0 160 130" role="img" aria-label="${esc(item.name)}">${frame}${art}<path d="M18 116 H142" stroke="#e7ba7040" stroke-width="1"/></svg>`;
  }

  function scene(mandap,idol,decorations=[]){
    const m = mandap || {id:"mandap-preview",name:"Festival Mandap",primary:"#c58a35",secondary:"#173e39",architecture:"Temple Arch",roof:"arch",pillars:4,pattern:1};
    const dec = decorations.slice(0,10);
    return `<div class="festival-scene-art">
      <div class="scene-mandap">${mandapSvg(m,{large:true})}</div>
      <div class="scene-idol">${idol? `<img src="${esc(idol.image)}" alt="${esc(idol.name)}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><span class="scene-idol-fallback">ॐ</span>` : '<span class="scene-idol-fallback">ॐ</span>'}</div>
      <div class="scene-decorations">${dec.map((d,i)=>`<span class="scene-decor scene-decor-${i}">${decorSvg(d)}</span>`).join("")}</div>
      <div class="scene-floor-glow"></div>
    </div>`;
  }


  function pujaScene(day=1, mantraTitle="Ganesh Puja"){
    const n=Math.max(1,Number(day)||1), accent=["#ffd25f","#f09f7d","#86d6bd","#e9a6c0"][n%4];
    return `<svg class="ritual-art" viewBox="0 0 520 260" role="img" aria-label="Daily Ganesh puja scene">
      <defs>
        <radialGradient id="pujaGlow${n}"><stop stop-color="${accent}" stop-opacity=".4"/><stop offset="1" stop-color="#07181d" stop-opacity="0"/></radialGradient>
        <linearGradient id="altar${n}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#9b5a2c"/><stop offset="1" stop-color="#52281d"/></linearGradient>
      </defs>
      <rect width="520" height="260" rx="18" fill="#08191f"/>
      <circle cx="260" cy="115" r="135" fill="url(#pujaGlow${n})"/>
      <path d="M70 210 Q260 185 450 210 L450 245 L70 245Z" fill="#6e452f" opacity=".7"/>
      <rect x="165" y="160" width="190" height="55" rx="10" fill="url(#altar${n})" stroke="#d8a75b" stroke-width="2"/>
      <rect x="205" y="145" width="110" height="22" rx="7" fill="#d29a45" stroke="#ffe0a2" stroke-width="2"/>
      <g transform="translate(260 119)">
        <circle cx="0" cy="-24" r="23" fill="#e1a873"/>
        <ellipse cx="-24" cy="-24" rx="15" ry="25" fill="#e7b584"/>
        <ellipse cx="24" cy="-24" rx="15" ry="25" fill="#e7b584"/>
        <path d="M4 -12 Q28 7 7 30 Q-4 33 -5 18 Q11 12 4-12" fill="#dda46e"/>
        <ellipse cx="0" cy="24" rx="30" ry="33" fill="#c74736"/>
        <path d="M-15 -45 Q0 -72 15 -45Z" fill="#d4a538" stroke="#ffe49a" stroke-width="2"/>
        <circle cx="-8" cy="-27" r="2.8" fill="#1c2225"/><circle cx="8" cy="-27" r="2.8" fill="#1c2225"/>
      </g>
      ${[125,395].map(x=>`<g transform="translate(${x} 165)"><path d="M0 25 q15 10 30 0 q-5 20-15 20t-15-20" fill="#b96c2a"/><path d="M15 20 q-8-16 0-26 q10 11 0 26" fill="#ffd95b"/></g>`).join("")}
      <g transform="translate(113 188)">${rosette(0,0,26,9,"#df5c67","#ffd67c")}</g>
      <g transform="translate(406 188)">${rosette(0,0,26,9,"#f1a81d","#ffe094")}</g>
      <path d="M198 224 Q260 197 322 224" fill="none" stroke="#f4cb73" stroke-width="3" stroke-dasharray="3 6"/>
      <text x="260" y="34" text-anchor="middle" fill="#efd59a" font-family="Georgia,serif" font-size="14">${esc(mantraTitle)}</text>
      <text x="260" y="54" text-anchor="middle" fill="#8fb3ad" font-family="Arial,sans-serif" font-size="10">DAY ${n} · PUJA & LEARNING</text>
    </svg>`;
  }

  function processionSvg(step=0, complete=false){
    const s=clamp(Number(step)||0,0,6);
    const water = s>=4;
    const farewell = complete || s>=6;
    return `<svg class="procession-art" viewBox="0 0 620 280" role="img" aria-label="Ganesh festival procession and visarjan scene">
      <defs>
        <linearGradient id="skyProc" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${water?"#122e4c":"#182c39"}"/><stop offset="1" stop-color="#09171d"/></linearGradient>
        <radialGradient id="moonProc"><stop stop-color="#fff1bd"/><stop offset="1" stop-color="#fff1bd" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="620" height="280" rx="18" fill="url(#skyProc)"/>
      <circle cx="505" cy="55" r="52" fill="url(#moonProc)"/><circle cx="505" cy="55" r="18" fill="#fff0bd"/>
      <path d="M0 170 L70 120 116 156 177 94 241 156 312 115 375 162 443 108 515 155 570 119 620 150 V215 H0Z" fill="#102a2e"/>
      ${water?'<path d="M0 208 Q90 188 180 208 T360 208 T540 208 T720 208 V280 H0Z" fill="#154b65"/><path d="M0 226 Q85 208 170 226 T340 226 T510 226 T680 226" fill="none" stroke="#7fc6d4" stroke-opacity=".45" stroke-width="3"/>':'<path d="M0 218 L620 190 V280 H0Z" fill="#4a3529"/><path d="M0 237 L620 210" stroke="#d6a55d" stroke-opacity=".3" stroke-width="3"/>'}
      <g transform="translate(${135+s*48} ${water?151:165})">
        <rect x="-48" y="40" width="96" height="18" rx="5" fill="#c88d34"/>
        <circle cx="-35" cy="61" r="8" fill="#1d2426"/><circle cx="35" cy="61" r="8" fill="#1d2426"/>
        <g transform="translate(0 8)" opacity="${farewell ? .72 : 1}">
          <circle cy="-18" r="17" fill="#e1a873"/><ellipse cx="-19" cy="-18" rx="12" ry="19" fill="#e8b682"/><ellipse cx="19" cy="-18" rx="12" ry="19" fill="#e8b682"/>
          <path d="M3 -8 Q20 5 5 23 Q-3 24-4 13 Q8 9 3-8" fill="#dca16b"/><ellipse cy="18" rx="23" ry="27" fill="#d14d38"/>
          <path d="M-11 -34 Q0 -55 11 -34Z" fill="#d4a538" stroke="#ffe49a" stroke-width="1.5"/>
        </g>
      </g>
      ${Array.from({length:14},(_,i)=>{
        const x=30+i*40+(i%3)*5, y=212-(i%4)*8;
        return `<g transform="translate(${x} ${y})"><circle cy="-23" r="7" fill="#9a6b4d"/><path d="M-8 -15 L8 -15 L12 17 L-12 17Z" fill="${["#b63a38","#d69326","#377f72","#7356a3"][i%4]}"/><path d="M-5 17 v17 M5 17 v17" stroke="#5c493c" stroke-width="4"/></g>`;
      }).join("")}
      <g transform="translate(72 201)"><circle cx="0" cy="0" r="17" fill="#c8893a"/><circle cx="0" cy="0" r="11" fill="#5e321e"/><path d="M-23 -9 L23 9 M-23 9 L23 -9" stroke="#f0c26e" stroke-width="3"/></g>
      ${Array.from({length:9},(_,i)=>`<circle cx="${35+i*66}" cy="${68+(i%3)*13}" r="${2+(i%2)}" fill="${i%2?"#ffd65d":"#ef7e8f"}" opacity=".8"/>`).join("")}
      <text x="24" y="34" fill="#f0d59d" font-family="Georgia,serif" font-size="17">${farewell?"Visarjan · Until next year":"Ganpati Bappa Morya"}</text>
      <text x="24" y="54" fill="#8fb3ad" font-family="Arial,sans-serif" font-size="10">PROCESSION STEP ${s+1} OF 7</text>
    </svg>`;
  }

  function festivalDaySvg(day=1,duration=3){
    const d=Math.max(1,Number(day)||1), total=Math.max(d,Number(duration)||3), night=d%2===0;
    return `<svg class="festival-day-art" viewBox="0 0 520 210" role="img" aria-label="Festival day ${d} of ${total}">
      <defs><linearGradient id="fd${d}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${night?"#183b5c":"#a85c35"}"/><stop offset="1" stop-color="#08171d"/></linearGradient></defs>
      <rect width="520" height="210" rx="18" fill="url(#fd${d})"/>
      <circle cx="430" cy="45" r="22" fill="${night?"#f3e7bc":"#f5c95c"}" opacity=".95"/>
      <path d="M0 156 Q80 130 160 156 T320 156 T480 156 T640 156 V210 H0Z" fill="#15342f"/>
      <path d="M140 160 L168 95 L196 160 M324 160 L352 95 L380 160" fill="none" stroke="#d89b3e" stroke-width="8"/>
      <path d="M150 110 Q260 48 370 110" fill="none" stroke="#edba71" stroke-width="5"/>
      ${Array.from({length:8},(_,i)=>`<circle cx="${158+i*29}" cy="${106-Math.sin(i/7*Math.PI)*35}" r="4" fill="${i%2?"#f5a4b8":"#ffd45f"}"/>`).join("")}
      <rect x="214" y="123" width="92" height="38" rx="8" fill="#8a4d2d" stroke="#e3b66e" stroke-width="2"/>
      <text x="260" y="72" text-anchor="middle" fill="#fff0c7" font-family="Georgia,serif" font-size="26">Day ${d}</text>
      <text x="260" y="92" text-anchor="middle" fill="#d7c9aa" font-family="Arial,sans-serif" font-size="11">OF ${total} FESTIVAL DAYS</text>
    </svg>`;
  }

  window.GFJArt={mandapSvg,decorSvg,pujaSvg,scene,pujaScene,processionSvg,festivalDaySvg};
})();