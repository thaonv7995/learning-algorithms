#!/usr/bin/env python3
"""Generate visualizers/lc601-700.js from catalog IDs 601–700."""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
cat = json.loads((ROOT / "data/catalog.json").read_text())

SKIP: set[int] = set()
for js in (ROOT / "visualizers").glob("lc*.js"):
    if js.name == "lc601-700.js":
        continue
    text = js.read_text()
    for m in re.finditer(r"reg\((\d+)", text):
        pid = int(m.group(1))
        if 601 <= pid <= 700:
            SKIP.add(pid)

problems = [
    p for i in range(601, 701)
    for p in [next((x for x in cat["problems"] if x["id"] == i), None)]
    if p and p["id"] not in SKIP
]


def finish(expr, log_part):
    return "{" + f"s.done=true;{expr};log(`[KẾT QUẢ] ${{{log_part}}}` ,\"success\");return;" + "}"


def kind_for(prob):
    title = prob["title"].lower()
    tags = [t.lower() for t in prob.get("tags", [])]
    if "database" in tags:
        return "array"
    if any(k in title for k in [
        "string", "path", "parentheses", "palindrome", "word", "decode",
        "substring", "file", "stickers", "equation", "replace words",
        "repeated string", "baseball", "magic dictionary", "parenthesis",
        "24 game", "valid palindrome",
    ]):
        return "str"
    if any(k in title for k in ["matrix", "grid", "2d", "island", "image smoother", "chessboard"]):
        return "grid"
    if "binary tree" in tags or "tree" in tags or any(k in title for k in [
        "tree", "bst", "subtree", "binary search tree", "leaf", "trim",
    ]):
        return "tree"
    return "array"


SAMPLES = {
    "array": "1,2,3,4,5",
    "str": "abcabcbb",
    "grid": "1,2,3\\n4,5,6\\n7,8,9",
    "tree": "3,9,20,-1,-1,15,7",
}

INITS = {
    "array": 's.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;',
    "str": 's.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;',
    "grid": "s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;",
    "tree": 's.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;',
}

STEPS = {
    "array": (
        "FINISH_ARRAY\n"
        "s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,\"info\"); s.i++;"
    ),
    "str": (
        "FINISH_STR\n"
        "log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,\"info\"); s.i++;"
    ),
    "grid": (
        "FINISH_GRID\n"
        "log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,\"info\"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}"
    ),
    "tree": (
        "FINISH_TREE\n"
        "const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,\"info\");} else log(`null @ ${s.i}`,\"info\"); s.i++;"
    ),
}

FINISHES = {
    "array": finish("s.outputText=String(s.best)", '"best="+s.best'),
    "str": finish('s.outputText=String((s.str||s.s).length)', '"(len)="+(s.str||s.s).length'),
    "grid": finish('s.outputText="scanned"', '"scanned"'),
    "tree": finish("s.outputText=JSON.stringify(s.visit)", "JSON.stringify(s.visit)"),
}

CUSTOM = {
    605: ("array", 's.nums=[1,0,0,0,1];s.n=1;if(cv&&cv.str){const p=String(cv.str).split("|");s.nums=V.parseNums(p[0]);s.n=+(p[1]||1);}s.i=0;s.placed=0;',
          "if(s.i>=s.nums.length){" + finish("s.outputText=String(s.placed>=s.n)", "String(s.placed>=s.n)") + "}\n"
          "if(s.nums[s.i]===0&&(s.i===0||s.nums[s.i-1]===0)&&(!s.nums[s.i+1])&&s.placed<s.n){s.nums[s.i]=1;s.placed++;log(`plant @ ${s.i} placed=${s.placed}`,\"success\");} else log(`skip ${s.i}`,\"info\"); s.i++;",
          "1,0,0,0,1|1"),
    621: ("array", 's.tasks="ABABAB".split("");if(cv&&cv.str){const p=String(cv.str).split("|");s.tasks=p[0].split("");s.n=+(p[1]||2);}else s.n=2;s.freq={};for(const c of s.tasks)s.freq[c]=(s.freq[c]||0)+1;s.maxF=Math.max(...Object.values(s.freq));s.idle=0;s.i=0;',
          "if(s.i>=s.maxF){" + finish("s.outputText=String(s.tasks.length+(s.maxF-1)*s.n-(s.maxF-1))", "String(s.tasks.length+(s.maxF-1)*s.n-(s.maxF-1))") + "}\n"
          "log(`round ${s.i+1} maxFreq=${s.maxF} n=${s.n}`,\"info\"); s.i++;",
          "ABABAB|2"),
    628: ("array", 's.nums=[1,2,3];V.applyNums(s,cv,"nums",s.nums);s.sorted=s.nums.slice().sort((a,b)=>a-b);s.done=false;',
          finish("s.outputText=String(s.sorted[0]*s.sorted[1]*s.sorted[2])", "String(s.sorted[0]*s.sorted[1]*s.sorted[2])"),
          "1,2,3"),
    633: ("array", 's.c=5;s.lo=0;s.hi=Math.floor(Math.sqrt(s.c));if(cv&&cv.target!=null)s.c=+cv.target;else if(cv&&cv.str)s.c=+V.parseStr(cv.str)||5;s.found=false;',
          "if(s.lo>s.hi){" + finish('s.outputText=String(s.found)', "String(s.found)") + "}\n"
          "const a=s.lo,b=s.hi-a; if(a*a+b*b===s.c){s.found=true;log(`found ${a}^2+${b}^2=${s.c}`,\"success\");} else log(`try a=${a}`,\"info\"); s.lo++;",
          "5"),
    647: ("str", 's.s="abc";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.count=0;s.i=0;s.j=0;s.expand=(l,r)=>{while(l>=0&&r<s.s.length&&s.s[l]===s.s[r]){s.count++;l--;r++;}};',
          "if(s.i>=s.s.length){" + finish("s.outputText=String(s.count)", "String(s.count)") + "}\n"
          "s.expand(s.i,s.i); s.expand(s.i,s.i+1); log(`center ${s.i} count=${s.count}`,\"info\"); s.i++;",
          "abc"),
    657: ("str", 's.moves="UD";if(cv&&cv.str)s.moves=V.parseStr(cv.str);s.x=0;s.y=0;s.i=0;',
          "if(s.i>=s.moves.length){" + finish('s.outputText=String(s.x===0&&s.y===0)', "String(s.x===0&&s.y===0)") + "}\n"
          "const m=s.moves[s.i]; if(m==='U')s.y++; else if(m==='D')s.y--; else if(m==='L')s.x--; else if(m==='R')s.x++; log(`${m} → (${s.x},${s.y})`,\"info\"); s.i++;",
          "UD"),
    695: ("grid", 's.grid=[[0,0,1,0,0],[0,0,0,0,0],[0,1,1,1,0],[0,0,0,0,0],[0,0,0,1,0]];if(cv&&cv.str){const rows=String(cv.str).split("\\\\n");s.grid=rows.map(r=>r.split(",").map(Number));}s.visited=0;s.r=0;s.c=0;s.area=0;s.best=0;',
          "if(s.r>=s.grid.length){" + finish("s.outputText=String(s.best)", "String(s.best)") + "}\n"
          "if(s.grid[s.r][s.c]===1){s.area++;s.best=Math.max(s.best,s.area);log(`land @ (${s.r},${s.c}) area=${s.area}`,\"info\");} s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}",
          "0,0,1,0,0\\n0,0,0,0,0\\n0,1,1,1,0\\n0,0,0,0,0\\n0,0,0,1,0"),
    700: ("tree", 's.nums=[4,2,7,1,3];s.val=2;if(cv&&cv.str){const p=String(cv.str).split("|");s.nums=V.parseNums(p[0]);s.val=+(p[1]||2);}s.i=0;s.found=null;',
          "if(s.i>=s.nums.length){" + finish("s.outputText=JSON.stringify(s.found)", "JSON.stringify(s.found)") + "}\n"
          "const v=s.nums[s.i]; if(v!==-1&&v!=null&&v===s.val){s.found=v;log(`found ${v} @ ${s.i}`,\"success\");} else if(v!==-1&&v!=null) log(`visit ${v}`,\"info\"); s.i++;",
          "4,2,7,1,3|2"),
}


def render_block(id_, title, kind, init, step, sample):
    esc = title.replace('"', '\\"')
    if kind == "str":
        r = f'V.section(stage,1,"{esc}").appendChild(V.charRow(s.str||s.s||"",{{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}}));'
        ctrl = f'{{ type:"string", id:"lc-input-str", label:"input", value:cv.str||{json.dumps(sample)} }}'
    elif kind == "grid":
        r = f'(V.renderMatrixGrid?V.section(stage,1,"{esc}").appendChild(V.renderMatrixGrid(s.grid,{{active:s.done?null:[s.r,s.c]}})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));'
        ctrl = f'{{ type:"string", id:"lc-input-str", label:"input", value:cv.str||{json.dumps(sample)} }}'
    elif kind == "tree":
        r = f'V.section(stage,1,"{esc}").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{{active:s.done?-1:(s.i??0)}}));'
        ctrl = '{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }'
    else:
        r = f'V.section(stage,1,"{esc}").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{{idx:s.i??0,label:"i▼"}}]}}));'
        ctrl = '{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }'

    return f"""    /* {id_} {title} */
    reg({id_}, {{
        initialize(s, log, cv) {{
            {init}
            log(`[Khởi tạo] {title}`, "info");
        }},
        step(s, log) {{
            if (s.done) return;
            {step}
        }},
        render(s, c, st) {{
            V.statsBar(st, [{{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }}, {{ label:"out", value:s.outputText||"—", cls:"success" }}]);
            const stage = V.stage();
            {r}
            c.appendChild(stage);
        }},
        renderControls(s, c, cv) {{
            V.controls(c, [{ctrl}], cv);
        }}
    }});"""


blocks = []
for prob in problems:
    pid = prob["id"]
    title = prob["title"]
    if pid in CUSTOM:
        kind, init, step, sample = CUSTOM[pid]
    else:
        kind = kind_for(prob)
        init = INITS[kind]
        step = STEPS[kind].replace("FINISH_ARRAY", "if(s.i>=s.nums.length) " + FINISHES["array"])
        step = step.replace("FINISH_STR", "if(s.i>=(s.str||s.s).length) " + FINISHES["str"])
        step = step.replace("FINISH_GRID", "if(s.r>=s.grid.length) " + FINISHES["grid"])
        step = step.replace("FINISH_TREE", "if(s.i>=s.nums.length) " + FINISHES["tree"])
        sample = SAMPLES[kind]
    blocks.append(render_block(pid, title, kind, init, step, sample))

header = """/* LC #601–700 (catalog IDs in range) */
window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    const V = window.VizCore;
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

"""
out_path = ROOT / "visualizers/lc601-700.js"
out_path.write_text(header + "\n".join(blocks) + "\n})();\n")
print(f"Wrote {out_path} with {len(blocks)} visualizers (skipped: {sorted(SKIP)})")
