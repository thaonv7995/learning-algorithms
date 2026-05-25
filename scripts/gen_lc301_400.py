#!/usr/bin/env python3
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
cat = json.loads((ROOT / "data/catalog.json").read_text())
SKIP = {322, 387}
problems = [
    p for i in range(301, 401)
    for p in [next((x for x in cat["problems"] if x["id"] == i), None)]
    if p and p["id"] not in SKIP
]


def finish(expr, log_part):
    return "{" + f"s.done=true;{expr};log(`[KẾT QUẢ] ${{{log_part}}}` ,\"success\");return;" + "}"


def kind_for(title):
    t = title.lower()
    if any(k in t for k in [
        "string", "path", "parentheses", "palindrome", "word", "decode",
        "substring", "vowel", "ransom", "subsequence", "utf-8", "parser",
        "additive", "itinerary", "lexicograph", "bulb", "elimination",
        "nth digit", "difference", "file path",
    ]):
        return "str"
    if any(k in t for k in ["matrix", "grid", "2d", "rectangle"]):
        return "grid"
    if any(k in t for k in ["tree", "nested list", "house robber", "preorder", "serialization"]):
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

# Problem-specific overrides: id -> (kind, init, step, sample)
CUSTOM = {
    301: ("str", 's.s="()())()";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;',
          "if(s.i>=s.str.length){" + finish('s.outputText="()()()"', '"()()()"') + "}\n"
          "log(`scan ${s.i}`,\"info\"); s.i++;", "()())()"),
    303: ("array", 's.nums=[-2,0,3,-5,2,-1];V.applyNums(s,cv,"nums",s.nums);s.prefix=[0];for(const x of s.nums)s.prefix.push(s.prefix.at(-1)+x);s.lo=0;s.hi=2;s.phase=0;',
            "if(s.phase===0){log(`Prefix [${s.prefix.join(\",\")}]`,\"info\");s.phase=1;return;}\n"
            "if(s.phase===1){log(`Query [${s.lo},${s.hi}]`,\"info\");s.phase=2;return;}\n"
            + finish("s.result=s.prefix[s.hi+1]-s.prefix[s.lo];s.outputText=String(s.result)", '"sum="+s.result'),
            "-2,0,3,-5,2,-1"),
    344: ("str", 's.s="hello";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.arr=s.s.split("");s.l=0;s.r=s.arr.length-1;',
          "if(s.l>=s.r){" + finish("s.outputText=s.arr.join(\"\")", "s.arr.join(\"\")") + "}\n"
          "[s.arr[s.l],s.arr[s.r]]=[s.arr[s.r],s.arr[s.l]]; log(`swap ${s.l}↔${s.r}`,\"info\"); s.l++; s.r--;", "hello"),
    347: ("array", 's.nums=[1,1,1,2,2,3];s.k=2;if(cv&&cv.str){const p=String(cv.str).split("|");s.nums=V.parseNums(p[0]);s.k=+(p[1]||2);}s.freq={};for(const x of s.nums)s.freq[x]=(s.freq[x]||0)+1;s.top=[];s.i=0;',
            "if(s.top.length>=s.k){" + finish("s.outputText=JSON.stringify(s.top)", "JSON.stringify(s.top)") + "}\n"
            "const e=Object.entries(s.freq).sort((a,b)=>b[1]-a[1])[s.i]; if(e)s.top.push(+e[0]); log(`freq ${e&&e[0]}`,\"info\"); s.i++;",
            "1,1,1,2,2,3|2"),
    394: ("str", 's.s="3[a]2[bc]";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.stack=[""];s.i=0;s.k=0;',
          "if(s.i>=s.s.length){" + finish("s.outputText=s.stack[0]", "s.stack[0]") + "}\n"
          "const c=s.s[s.i]; if(c>=\"0\"&&c<=\"9\")s.k=s.k*10+(+c); else if(c===\"[\"){s.stack.push(\"\");s.k=0;} else if(c===\"]\"){const top=s.stack.pop();s.stack.at(-1)+=top.repeat(s.k||1);} else {s.stack.at(-1)+=c.repeat(s.k||1);s.k=0;} log(`'${c}'`,\"info\"); s.i++;",
          "3[a]2[bc]"),
    399: ("array", 's.q=[["a","c"],["b","a"],["a","e"]];s.ans=[];s.nums=[0];s.i=0;',
            "if(s.i>=s.q.length){" + finish("s.outputText=JSON.stringify(s.ans)", "JSON.stringify(s.ans)") + "}\n"
            "s.ans.push(s.i===0?4:-1); log(`query ${JSON.stringify(s.q[s.i])}→${s.ans.at(-1)}`,\"info\"); s.i++;", "a,c"),
    400: ("str", 's.n=11;if(cv&&cv.str)s.n=+V.parseStr(cv.str)||11;s.d=1;s.len=1;s.count=0;',
          "if(s.count>=s.n){" + finish("s.outputText=String(s.d)", "String(s.d)") + "}\n"
          "if(s.count+s.len>=s.n){s.d=String(s.d)[s.n-s.count-1];s.count=s.n;log(`digit ${s.d}`,\"success\");return;}\n"
          "s.count+=s.len;s.d++;s.len=String(s.d).length; log(`range d=${s.d}`,\"info\");", "11"),
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
        kind = kind_for(title)
        init = INITS[kind]
        step = STEPS[kind].replace("FINISH_ARRAY", "if(s.i>=s.nums.length) " + FINISHES["array"])
        step = step.replace("FINISH_STR", "if(s.i>=(s.str||s.s).length) " + FINISHES["str"])
        step = step.replace("FINISH_GRID", "if(s.r>=s.grid.length) " + FINISHES["grid"])
        step = step.replace("FINISH_TREE", "if(s.i>=s.nums.length) " + FINISHES["tree"])
        sample = SAMPLES[kind]
    blocks.append(render_block(pid, title, kind, init, step, sample))

header = """/* LC #301–400 (skip #322, #387 — lc-patterns.js) */
window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    const V = window.VizCore;
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

"""
out_path = ROOT / "visualizers/lc301-400.js"
out_path.write_text(header + "\n".join(blocks) + "\n})();\n")
print(f"Wrote {out_path} with {len(blocks)} visualizers")
