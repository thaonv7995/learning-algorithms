#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cat = require('../data/catalog.json');
const SKIP = new Set([322, 387]);
const problems = [];
for (let i = 301; i <= 400; i++) {
  const p = cat.problems.find(x => x.id === i);
  if (p && !SKIP.has(i)) problems.push(p);
}
function finish(expr, logPart) {
  return `{s.done=true;${expr};log(\`[KẾT QUẢ] \${${logPart}}\`,"success");return;}`;
}
function viz(id, title, kind, init, step, sample) {
  const esc = title.replace(/"/g, '\\"');
  const render =
    kind === 'str' ? `V.section(stage,1,"${esc}").appendChild(V.charRow(s.str||s.s||s.arr?.join?.("")||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));` :
    kind === 'grid' ? `(V.renderMatrixGrid?V.section(stage,1,"${esc}").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));` :
    kind === 'tree' ? `V.section(stage,1,"${esc}").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));` :
    `V.section(stage,1,"${esc}").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));`;
  const ctrl = kind === 'array'
    ? `{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }`
    : `{ type:"string", id:"lc-input-str", label:"input", value:cv.str||${JSON.stringify(sample)} }`;
  return `    /* ${id} ${title} */
    reg(${id}, {
        initialize(s, log, cv) {
            ${init}
            log(\`[Khởi tạo] ${title.replace(/`/g, '\\`')}\`, "info");
        },
        step(s, log) {
            if (s.done) return;
            ${step}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            ${render}
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [${ctrl}], cv);
        }
    });`;
}
// defs loaded from companion - see write below
