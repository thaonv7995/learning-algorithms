#!/usr/bin/env python3
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
cat = json.loads((ROOT / "data/catalog.json").read_text())
SKIP = set()
problems = [
    p for i in range(501, 601)
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
        "nth digit", "difference", "file path", "capital", "tag validator",
        "fraction", "freedom trail", "tinyurl", "minesweeper", "attendance",
    ]):
        return "str"
    if any(k in t for k in ["matrix", "grid", "2d", "rectangle", "reshape", "flip", "brick wall", "01 matrix"]):
        return "grid"
    if any(k in t for k in [
        "tree", "nested list", "house robber", "preorder", "serialization",
        "binary search tree", "bst", "subtree", "n-ary", "tilt", "diameter",
        "bottom left", "quad-tree",
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
    503: ("array", 's.nums=[1,2,1];V.applyNums(s,cv,"nums",s.nums);s.st=[];s.i=0;s.ans=[];',
          "if(s.i>=s.nums.length){" + finish("s.outputText=JSON.stringify(s.ans)", "JSON.stringify(s.ans)") + "}\n"
          "while(s.st.length&&s.st.at(-1)<s.nums[s.i])s.st.pop(); s.ans.push(s.st.length?s.st.at(-1):-1); s.st.push(s.nums[s.i]); log(`NGE ${s.nums[s.i]}→${s.ans.at(-1)}`,\"info\"); s.i++;",
          "1,2,1"),
    509: ("array", 's.n=4;V.applyTarget(s,cv,4);s.a=0;s.b=1;s.i=0;s.fib=[0,1];',
          "if(s.i>=s.n){" + finish("s.outputText=String(s.fib[s.n])", "String(s.fib[s.n])") + "}\n"
          "s.fib.push(s.fib.at(-1)+s.fib.at(-2)); log(`fib[${s.i+2}]=${s.fib.at(-1)}`,\"info\"); s.i++;",
          "4"),
    518: ("array", 's.nums=[1,2,5];s.amount=5;V.applyNums(s,cv,"nums",s.nums);s.dp=Array(s.amount+1).fill(0);s.dp[0]=1;s.i=0;',
          "if(s.i>=s.nums.length){" + finish("s.outputText=String(s.dp[s.amount])", "String(s.dp[s.amount])") + "}\n"
          "for(let j=s.nums[s.i];j<=s.amount;j++)s.dp[j]+=s.dp[j-s.nums[s.i]]; log(`coin ${s.nums[s.i]}`,\"info\"); s.i++;",
          "1,2,5"),
    540: ("array", 's.nums=[1,1,2,3,3,4,4,8,8];V.applyNums(s,cv,"nums",s.nums);s.lo=0;s.hi=s.nums.length-1;',
          "if(s.lo>=s.hi){" + finish("s.outputText=String(s.nums[s.lo])", "String(s.nums[s.lo])") + "}\n"
          "const mid=(s.lo+s.hi>>1); if(s.nums[mid]===s.nums[mid^1])s.lo=mid+1; else s.hi=mid; log(`lo=${s.lo} hi=${s.hi}`,\"info\");",
          "1,1,2,3,3,4,4,8,8"),
    560: ("array", 's.nums=[1,1,1];s.k=2;V.applyNums(s,cv,"nums",s.nums);s.prefix=0;s.freq={0:1};s.count=0;s.i=0;',
          "if(s.i>=s.nums.length){" + finish("s.outputText=String(s.count)", "String(s.count)") + "}\n"
          "s.prefix+=s.nums[s.i]; s.count+=s.freq[s.prefix-s.k]||0; s.freq[s.prefix]=(s.freq[s.prefix]||0)+1; log(`prefix=${s.prefix} count=${s.count}`,\"info\"); s.i++;",
          "1,1,1"),
    567: ("str", 's.s1="ab";s.s2="eidbaooo";if(cv&&cv.str){const p=String(cv.str).split("|");s.s1=p[0]||s.s1;s.s2=p[1]||s.s2;}s.freq={};for(const c of s.s1)s.freq[c]=(s.freq[c]||0)+1;s.l=0;s.r=0;s.need=s.s1.length;s.have=0;',
          "if(s.r>=s.s2.length){" + finish('s.outputText=s.have>=s.need?"true":"false"', 's.have>=s.need?"true":"false"') + "}\n"
          "const c=s.s2[s.r]; if(s.freq[c]){s.freq[c]--; if(s.freq[c]===0)s.have++;} log(`window [${s.l},${s.r}]`,\"info\"); s.r++;",
          "ab|eidbaooo"),
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

header = """/* LC #501–600 */
window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    const V = window.VizCore;
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

"""
out_path = ROOT / "visualizers/lc501-600.js"
out_path.write_text(header + "\n".join(blocks) + "\n})();\n")
print(f"Wrote {out_path} with {len(blocks)} visualizers")
