#!/usr/bin/env python3
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
cat = json.loads((ROOT / "data/catalog.json").read_text())
SKIP = {739}  # dedicated visualizers/lc739.js
problems = [
    p for i in range(701, 801)
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
        "comments", "atoms", "lisp", "calculator", "rotate string",
        "grammar", "permutation", "reorganize", "custom sort", "matching subsequence",
        "jewels", "special binary", "monotone increasing", "delete sum",
        "partition label", "prefix and suffix", "completing word",
        "cracking the safe", "open the lock", "swap adjacent",
    ]):
        return "str"
    if any(k in t for k in [
        "matrix", "grid", "2d", "rectangle", "reshape", "flip", "brick wall",
        "01 matrix", "flood fill", "cherry pickup", "toeplitz", "chessboard",
        "pyramid", "tic-tac", "sliding puzzle", "domino", "contain virus",
        "plus sign", "asteroid", "swim in rising water",
    ]):
        return "grid"
    if any(k in t for k in [
        "tree", "nested list", "house robber", "preorder", "serialization",
        "binary search tree", "bst", "subtree", "n-ary", "tilt", "diameter",
        "bottom left", "quad-tree", "insert into a binary",
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
    704: ("array", 's.nums=[-1,0,3,5,9,12];s.target=9;V.applyNums(s,cv,"nums",s.nums);s.lo=0;s.hi=s.nums.length-1;',
          "if(s.lo>s.hi){" + finish('s.outputText=String(s.found??-1)', "String(s.found??-1)") + "}\n"
          "const mid=(s.lo+s.hi>>1); if(s.nums[mid]===s.target){s.found=mid; s.lo=s.hi+1;} else if(s.nums[mid]<s.target)s.lo=mid+1; else s.hi=mid-1; log(`lo=${s.lo} hi=${s.hi} mid=${mid}`,\"info\");",
          "-1,0,3,5,9,12"),
    713: ("array", 's.nums=[10,5,2,6];s.k=100;V.applyNums(s,cv,"nums",s.nums);s.l=0;s.prod=1;s.count=0;',
          "if(s.l>=s.nums.length){" + finish("s.outputText=String(s.count)", "String(s.count)") + "}\n"
          "s.prod*=s.nums[s.l]; while(s.prod>=s.k&&s.l<s.nums.length){s.prod/=s.nums[s.l]; s.l++;} s.count+=s.nums.length-s.l; log(`l=${s.l} prod=${s.prod} count=${s.count}`,\"info\"); s.l++;",
          "10,5,2,6"),
    746: ("array", 's.nums=[10,15,20];V.applyNums(s,cv,"nums",s.nums);s.dp0=0;s.dp1=0;s.i=0;',
          "if(s.i>=s.nums.length){" + finish("s.outputText=String(Math.min(s.dp0,s.dp1))", "String(Math.min(s.dp0,s.dp1))") + "}\n"
          "const n=s.dp1;s.dp1=Math.min(s.dp0,s.dp1)+s.nums[s.i]; s.dp0=n; log(`i=${s.i} dp0=${s.dp0} dp1=${s.dp1}`,\"info\"); s.i++;",
          "10,15,20"),
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

header = """/* LC #701–800 */
window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    const V = window.VizCore;
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

"""
out_path = ROOT / "visualizers/lc701-800.js"
out_path.write_text(header + "\n".join(blocks) + "\n})();\n")
print(f"Wrote {out_path} with {len(blocks)} visualizers")
