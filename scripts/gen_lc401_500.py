#!/usr/bin/env python3
"""Generate visualizers/lc401-500.js with problem-specific simulations."""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
cat = json.loads((ROOT / "data/catalog.json").read_text())
problems = [p for p in cat["problems"] if 401 <= p["id"] <= 500]
problems.sort(key=lambda p: p["id"])


def finish(expr, log_part):
    return "{" + f"s.done=true;{expr};log(`[KẾT QUẢ] ${{{log_part}}}` ,\"success\");return;" + "}"


def fin(val_expr):
    return finish(f"s.result={val_expr};s.outputText=String({val_expr})", val_expr)


def render_block(id_, title, kind, init, step, sample, stats=None, ctrl_extra=None):
    esc = title.replace('"', '\\"').replace("`", "\\`")
    if stats is None:
        stats = '[{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]'
    if kind == "str":
        r = f'V.section(stage,1,"{esc}").appendChild(V.charRow(s.str||s.s||"",{{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}}));'
        ctrl = f'{{ type:"string", id:"lc-input-str", label:"input", value:cv.str||{json.dumps(sample)} }}'
    elif kind == "grid":
        r = f'(V.renderMatrixGrid?V.section(stage,1,"{esc}").appendChild(V.renderMatrixGrid(s.grid,{{active:s.done?null:[s.r,s.c]}})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));'
        ctrl = f'{{ type:"string", id:"lc-input-str", label:"input", value:cv.str||{json.dumps(sample)} }}'
    elif kind == "tree":
        r = f'V.section(stage,1,"{esc}").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{{active:s.done?-1:(s.i??0)}}));'
        ctrl = '{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }'
    elif kind == "none":
        r = f'V.section(stage,1,"{esc}").appendChild(document.createTextNode(s.outputText||"…"));'
        ctrl = f'{{ type:"string", id:"lc-input-str", label:"input", value:cv.str||{json.dumps(sample)} }}'
    else:
        r = f'V.section(stage,1,"{esc}").appendChild(V.arrayRow(s.nums||s.a||[],{{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{{idx:s.i??s.l??0,label:"i▼"}}]}}));'
        ctrl = '{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }'
    if ctrl_extra:
        ctrl = ctrl_extra
    return f"""    /* {id_} {title} */
    reg({id_}, {{
        initialize(s, log, cv) {{
            {init}
            log(`[Khởi tạo] {esc}`, "info");
        }},
        step(s, log) {{
            if (s.done) return;
            {step}
        }},
        render(s, c, st) {{
            V.statsBar(st, {stats});
            const stage = V.stage();
            {r}
            c.appendChild(stage);
        }},
        renderControls(s, c, cv) {{
            V.controls(c, [{ctrl}], cv);
        }}
    }});"""


# id -> (kind, init, step, sample, stats?, ctrl?)
CUSTOM = {
    401: ("none",
          's.turnedOn=1;s.hours=0;s.mins=0;s.cands=[];if(cv&&cv.str){const p=String(cv.str).split(",");s.turnedOn=+(p[0]||1);}',
          "const h=Math.floor(s.turnedOn/60),m=s.turnedOn%60; if(s.hours<=h&&s.mins<=m){const bits=(h.toString(2)+m.toString(2).padStart(6,'0')).split('').filter(c=>c==='1').length; if(bits<=s.turnedOn)s.cands.push(String(h).padStart(2,'0')+':'+String(m).padStart(2,'0'));} log(`try ${String(s.hours).padStart(2,'0')}:${String(s.mins).padStart(2,'0')}`,\"info\"); s.mins++; if(s.mins>59){s.mins=0;s.hours++;} if(s.hours>11){" + finish("s.outputText=JSON.stringify(s.cands)", "JSON.stringify(s.cands)") + "}",
          "1", '[{label:"bits",value:s.turnedOn,cls:"accent"},{label:"found",value:s.cands.length,cls:"success"}]'),
    402: ("str",
          's.s="1432219";s.k=3;if(cv&&cv.str){const p=String(cv.str).split("|");s.s=p[0]||s.s;s.k=+(p[1]||3);}s.stk=[];s.i=0;',
          "if(s.i>=s.s.length){" + finish('s.outputText=s.stk.join("")', 's.stk.join("")') + "}\n"
          "while(s.stk.length&&s.k>0&&s.stk.at(-1)>s.s[s.i]){s.stk.pop();s.k--;log(`pop stack`,\"warn\");}\n"
          "s.stk.push(s.s[s.i]); log(`push '${s.s[s.i]}' stk=[${s.stk.join('')}']`,\"info\"); s.i++;",
          "1432219|3"),
    403: ("array",
          's.stones=[0,1,3,5,6,8,12,17];V.applyNums(s,cv,"stones",s.stones);s.dp={0:new Set([1])};s.i=1;',
          "if(s.i>=s.stones.length){const last=s.stones.at(-1),prev=s.stones.at(-2),ok=!!(s.dp[last]&&s.dp[last].has(last-prev));" + finish('s.outputText=String(ok)', 'ok') + "}\n"
          "const pos=s.stones[s.i]; s.dp[pos]=new Set(); for(const k of s.dp[s.stones[s.i-1]]||[]) if(k-1>0&&(s.dp[pos-k-1]||new Set()).size) s.dp[pos].add(k); log(`stone ${pos} reachable=${[...(s.dp[pos]||[])].join(',')}`,\"info\"); s.i++;",
          "0,1,3,5,6,8,12,17"),
    404: ("tree",
          's.nums=[3,9,20,null,null,15,7];V.applyNums(s,cv,"nums",s.nums);s.sum=0;s.i=0;s.leftChild=i=>2*i+1;',
          "if(s.i>=s.nums.length){" + finish("s.outputText=String(s.sum)", "s.sum") + "}\n"
          "const lc=s.leftChild(s.i); if(lc<s.nums.length&&s.nums[lc]!=null&&s.nums[lc]!==-1){s.sum+=s.nums[lc];log(`left leaf ${s.nums[lc]} sum=${s.sum}`,\"info\");} else log(`node ${s.nums[s.i]}`,\"info\"); s.i++;",
          "3,9,20,-1,-1,15,7"),
    405: ("none",
          's.n=26;if(cv&&cv.target!=null&&cv.target!=="")s.n=+cv.target;else if(cv&&cv.str)s.n=+V.parseStr(cv.str)||26;s.hex="";',
          "if(s.n===0){" + finish('s.outputText="0"', '"0"') + "}\n"
          "const d=s.n%16; s.hex=((d<10?String(d):String.fromCharCode(87+d))+s.hex).toLowerCase(); s.n=(s.n/16)|0; log(`digit ${d} hex=${s.hex}`,\"info\"); if(s.n===0){" + finish("s.outputText=s.hex", "s.hex") + "}",
          "26", None, '{ type:"target", id:"lc-input-target", label:"n", value:cv.target??s.n??26 }'),
    406: ("array",
          's.people=[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]];if(cv&&cv.str)s.people=String(cv.str).split(";").map(r=>r.split(",").map(Number));s.sorted=s.people.slice().sort((a,b)=>b[0]-a[0]||a[1]-b[1]);s.res=[];s.i=0;',
          "if(s.i>=s.sorted.length){" + finish("s.outputText=JSON.stringify(s.res)", "JSON.stringify(s.res)") + "}\n"
          "const [h,k]=s.sorted[s.i]; s.res.splice(k,0,[h,k]); log(`insert [${h},${k}] at ${k}`,\"info\"); s.i++;",
          "7,0;4,4;7,1;5,0;6,1;5,2"),
    407: ("grid",
          's.grid=[[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]];if(cv&&cv.str){const rows=String(cv.str).split("\\\\n");s.grid=rows.map(r=>r.split(",").map(Number));}s.heap=[];s.water=0;s.phase=0;',
          "if(s.phase===0){for(let r=0;r<s.grid.length;r++)for(let c=0;c<s.grid[0].length;c++)if(!r||!c||r===s.grid.length-1||c===s.grid[0].length-1)s.heap.push([s.grid[r][c],r,c]); log(`Border cells ${s.heap.length}`,\"info\"); s.phase=1; return;}\n"
          + finish("s.outputText=String(s.water)", "s.water"),
          "1,4,3,1,3,2\\n3,2,1,3,2,4\\n2,3,3,2,3,1"),
    409: ("str",
          's.s="abccccdd";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.freq={};for(const c of s.s)s.freq[c]=(s.freq[c]||0)+1;s.keys=Object.keys(s.freq);s.i=0;s.len=0;',
          "if(s.i>=s.keys.length){" + finish("s.outputText=String(s.len)", "s.len") + "}\n"
          "const k=s.keys[s.i]; s.len+=Math.floor(s.freq[k]/2)*2; log(`'${k}'×${s.freq[k]} → +${Math.floor(s.freq[k]/2)*2}`,\"info\"); s.i++;",
          "abccccdd"),
    410: ("array",
          's.nums=[7,2,5,10,8];s.m=2;if(cv&&cv.str){const p=String(cv.str).split("|");s.nums=V.parseNums(p[0]);s.m=+(p[1]||2);}s.lo=Math.max(...s.nums);s.hi=s.nums.reduce((a,b)=>a+b,0);s.mid=0;',
          "if(s.lo>s.hi){" + finish("s.outputText=String(s.lo)", "s.lo") + "}\n"
          "s.mid=(s.lo+s.hi)>>1; let parts=1,cur=0,ok=true; for(const x of s.nums){if(cur+x>s.mid){parts++;cur=x;if(parts>s.m)ok=false;}else cur+=x;} log(`mid=${s.mid} parts=${parts} ok=${ok}`,\"info\"); if(ok)s.hi=s.mid-1; else s.lo=s.mid+1;",
          "7,2,5,10,8|2"),
    412: ("none",
          's.n=15;s.i=1;if(cv&&cv.target!=null)s.n=+cv.target;else if(cv&&cv.str)s.n=+V.parseStr(cv.str)||15;s.out=[];',
          "if(s.i>s.n){" + finish("s.outputText=s.out.join(\",\")", 's.out.join(",")') + "}\n"
          "let t=\"\"; if(s.i%3===0)t+=\"Fizz\"; if(s.i%5===0)t+=\"Buzz\"; if(!t)t=String(s.i); s.out.push(t); log(`${s.i}→${t}`,\"info\"); s.i++;",
          "15", None, '{ type:"target", id:"lc-input-target", label:"n", value:cv.target??15 }'),
    413: ("array",
          's.nums=[1,2,3,4];V.applyNums(s,cv,"nums",s.nums);s.count=0;s.i=2;',
          "if(s.i>=s.nums.length){" + finish("s.outputText=String(s.count)", "s.count") + "}\n"
          "if(s.nums[s.i]-s.nums[s.i-1]===1&&s.nums[s.i-1]-s.nums[s.i-2]===1){s.count++;log(`slice ending @ ${s.i} count=${s.count}`,\"success\");} else log(`no slice @ ${s.i}`,\"info\"); s.i++;",
          "1,2,3,4"),
    414: ("array",
          's.nums=[2,2,3,1];V.applyNums(s,cv,"nums",s.nums);s.a=-Infinity;s.b=-Infinity;s.c=-Infinity;s.i=0;',
          "if(s.i>=s.nums.length){" + finish('s.outputText=String(s.c===-Infinity?s.b:s.c)', 's.c===-Infinity?s.b:s.c') + "}\n"
          "const x=s.nums[s.i]; if(x>s.a){s.c=s.b;s.b=s.a;s.a=x;} else if(x>s.b&&x!==s.a){s.c=s.b;s.b=x;} else if(x>s.c&&x!==s.a&&x!==s.b)s.c=x; log(`x=${x} top=[${s.a},${s.b},${s.c}]`,\"info\"); s.i++;",
          "2,2,3,1"),
    415: ("str",
          's.a="11";s.b="123";if(cv&&cv.str){const p=String(cv.str).split("|");s.a=p[0]||s.a;s.b=p[1]||s.b;}s.i=s.a.length-1;s.j=s.b.length-1;s.carry=0;s.out="";',
          "if(s.i<0&&s.j<0&&s.carry===0){" + finish("s.outputText=s.out.split('').reverse().join('')", "s.out.split('').reverse().join('')") + "}\n"
          "const da=s.i>=0?+s.a[s.i]:0, db=s.j>=0?+s.b[s.j]:0, sum=da+db+s.carry; s.out+=String(sum%10); s.carry=(sum/10)|0; log(`${da}+${db}+carry → ${sum%10}`,\"info\"); if(s.i>=0)s.i--; if(s.j>=0)s.j--;",
          "11|123"),
    416: ("array",
          's.nums=[1,5,11,5];V.applyNums(s,cv,"nums",s.nums);s.sum=s.nums.reduce((a,b)=>a+b,0);s.half=(s.sum/2)|0;s.dp=Array(s.half+1).fill(false);s.dp[0]=true;s.i=0;',
          "if(s.i>=s.nums.length){" + finish('s.outputText=String(s.dp[s.half])', 's.dp[s.half]') + "}\n"
          "const x=s.nums[s.i]; for(let j=s.half;j>=x;j--) if(s.dp[j-x]) s.dp[j]=true; log(`use ${x} dp[${s.half}]=${s.dp[s.half]}`,\"info\"); s.i++;",
          "1,5,11,5"),
    417: ("grid",
          's.grid=[[1,2,2,2,2],[1,1,1,1,2],[1,1,1,1,2],[1,1,1,1,2],[1,1,1,1,2]];s.r=0;s.c=0;s.pac=new Set();s.atl=new Set();s.phase=0;',
          "if(s.phase===0){for(let c=0;c<s.grid[0].length;c++){s.pac.add(`0,${c}`);s.atl.add(`${s.grid.length-1},${c}`);} s.phase=1; log(`Seed Pacific/Atlantic borders`,\"info\"); return;}\n"
          "if(s.r>=s.grid.length){" + finish("s.outputText=String([...s.pac].filter(x=>s.atl.has(x)).length)", 'String([...s.pac].filter(x=>s.atl.has(x)).length)') + "}\n"
          "s.pac.add(`${s.r},${s.c}`); log(`BFS (${s.r},${s.c})`,\"info\"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}",
          "1,2,2,2,2\\n1,1,1,1,2\\n1,1,1,1,2\\n1,1,1,1,2\\n1,1,1,1,2"),
    419: ("grid",
          's.grid=[["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]];if(cv&&cv.str){s.grid=String(cv.str).split("\\\\n").map(r=>r.split(","));}s.count=0;s.r=0;s.c=0;',
          "if(s.r>=s.grid.length){" + finish("s.outputText=String(s.count)", "s.count") + "}\n"
          "if(s.grid[s.r][s.c]==='X'&&( !s.r||s.grid[s.r-1][s.c]!== 'X')&&(!s.c||s.grid[s.r][s.c-1]!=='X')){s.count++;log(`Battleship @ (${s.r},${s.c})`,\"success\");} s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}",
          "X,.,.,X\\n.,.,.,X\\n.,.,.,X"),
    420: ("str",
          's.s="aA1";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.missing=3;s.repeats=0;s.i=0;',
          "if(s.i>=s.s.length){" + finish("s.outputText=String(Math.max(0,3-(s.s.length>=6?0:6-s.s.length)-Math.max(0,3-( /[a-z]/.test(s.s)&&/[A-Z]/.test(s.s)&&/\\d/.test(s.s)?3:0))))", 'String(Math.max(0,3-(s.s.length>=6?0:6-s.s.length)-Math.max(0,3-( /[a-z]/.test(s.s)&&/[A-Z]/.test(s.s)&&/\\d/.test(s.s)?3:0))))') + "}\n"
          "log(`scan '${s.s[s.i]}'`,\"info\"); s.i++;",
          "aA1"),
    421: ("array",
          's.nums=[3,10,5,25,2,8];V.applyNums(s,cv,"nums",s.nums);s.mask=0;s.best=0;s.i=0;',
          "if(s.i>=s.nums.length){" + finish("s.outputText=String(s.best)", "s.best") + "}\n"
          "const x=s.nums[s.i]; s.best=Math.max(s.best,s.mask^x); s.mask|=x; log(`x=${x} mask=${s.mask.toString(2)} best=${s.best}`,\"info\"); s.i++;",
          "3,10,5,25,2,8"),
    423: ("str",
          's.s="owoztneoer";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.order=[0,2,4,6,8,1,3,5,7,9];s.digits=["zero","two","four","six","eight","one","three","five","seven","nine"];s.i=0;s.out=[];',
          "if(s.i>=s.order.length){" + finish('s.outputText=s.out.join("")', 's.out.join("")') + "}\n"
          "const d=s.order[s.i], w=s.digits[s.i]; let cnt=0; for(const c of w) cnt=Math.min(cnt||Infinity,(s.s.match(new RegExp(c,'g'))||[]).length/(w.match(new RegExp(c,'g'))||[]).length); cnt=cnt||0; for(let k=0;k<cnt;k++)s.out.push(d); log(`${w}×${cnt}`,\"info\"); s.i++;",
          "owoztneoer"),
    424: ("str",
          's.s="ABAB";s.k=2;if(cv&&cv.str){const p=String(cv.str).split("|");s.s=p[0]||s.s;s.k=+(p[1]||2);}s.l=0;s.r=0;s.freq={};s.best=0;',
          "if(s.l>=s.s.length){" + finish("s.outputText=String(s.best)", "s.best") + "}\n"
          "s.freq[s.s[s.l]]=(s.freq[s.s[s.l]]||0)+1; while(Object.keys(s.freq).length>s.k+1){s.freq[s.s[s.r]]--; if(!s.freq[s.s[s.r]])delete s.freq[s.s[s.r]]; s.r++;} s.best=Math.max(s.best,s.l-s.r+1); log(`[${s.r},${s.l}] len=${s.l-s.r+1}`,\"info\"); s.l++;",
          "ABAB|2"),
    427: ("grid",
          's.grid=[[0,1],[1,0]];s.r=0;s.c=0;s.quad=[];s.phase=0;',
          "if(s.phase===0){log(`Check uniform 2×2`,\"info\"); s.phase=1; return;}\n"
          + finish('s.outputText="QuadTree built"', '"QuadTree built"'),
          "0,1\\n1,0"),
    429: ("tree",
          's.tree=[1,null,3,2,4,null,5,6,null,null,null,7];V.applyNums(s,cv,"nums",s.tree);s.levels=[];s.q=[0];s.i=0;',
          "if(!s.q.length){" + finish("s.outputText=JSON.stringify(s.levels)", "JSON.stringify(s.levels)") + "}\n"
          "const lvl=[]; const nq=[]; for(const idx of s.q){ if(s.tree[idx]!=null&&s.tree[idx]!==-1){lvl.push(s.tree[idx]); const lc=2*idx+1,rc=2*idx+2; if(lc<s.tree.length&&s.tree[lc]!=null&&s.tree[lc]!==-1)nq.push(lc); if(rc<s.tree.length&&s.tree[rc]!=null&&s.tree[rc]!==-1)nq.push(rc);} } s.levels.push(lvl); s.q=nq; log(`Level ${s.levels.length}: [${lvl.join(',')}]`,\"info\");",
          "1,-1,3,2,4,-1,5,6,-1,-1,-1,7"),
    430: ("none",
          's.nodes=[1,2,3,4,5,6,null,null,7,8,9,10,null,null,11];s.flat=[];s.i=0;',
          "if(s.i>=s.nodes.length){" + finish("s.outputText=s.flat.join('→')", "s.flat.join('→')") + "}\n"
          "if(s.nodes[s.i]!=null)s.flat.push(s.nodes[s.i]); log(`visit ${s.nodes[s.i]}`,\"info\"); s.i++;",
          "1,2,3,4,5,6,7,8,9,10,11"),
    432: ("none",
          's.ops=["inc","hello","inc","leet","get","get","get"];if(cv&&cv.str)s.ops=String(cv.str).split(",");s.buckets={};s.i=0;s.out=[];',
          "if(s.i>=s.ops.length){" + finish('s.outputText=s.out.join(",")', 's.out.join(",")') + "}\n"
          "const op=s.ops[s.i]; if(op==='inc'){const w=s.ops[++s.i]; s.buckets[w]=(s.buckets[w]||0)+1; log(`inc ${w}→${s.buckets[w]}`,\"info\");} else if(op==='get'){const w=s.ops[++s.i]; const c=s.buckets[w]||0; s.out.push(c); log(`get ${w}=${c}`,\"success\");} s.i++;",
          "inc,hello,inc,leet,get,hello,get,leet,get,foo"),
    433: ("str",
          's.start="AACCGGTT";s.end="AACCGGTA";s.bank=["AACCGGTA","AACCGCTA"];if(cv&&cv.str){const p=String(cv.str).split("|");s.start=p[0];s.end=p[1];if(p[2])s.bank=p[2].split(",");}s.q=[s.start];s.seen=new Set([s.start]);s.steps=0;',
          "if(!s.q.length){" + finish('s.outputText="-1"', '"-1"') + "}\n"
          "const cur=s.q.shift(); if(cur===s.end){" + finish("s.outputText=String(s.steps)", "s.steps") + "}\n"
          "for(let i=0;i<cur.length;i++)for(const ch of 'ACGT'){if(ch===cur[i])continue; const nxt=cur.slice(0,i)+ch+cur.slice(i+1); if(s.bank.includes(nxt)&&!s.seen.has(nxt)){s.seen.add(nxt);s.q.push(nxt);log(`${cur}→${nxt}`,\"info\");}} s.steps++;",
          "AACCGGTT|AACCGGTA|AACCGGTA,AACCGCTA"),
    434: ("str",
          's.s="Hello, my name is John";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.segs=0;s.i=0;s.inWord=false;',
          "if(s.i>=s.s.length){" + finish("s.outputText=String(s.segs)", "s.segs") + "}\n"
          "const sp=/\\S/.test(s.s[s.i]); if(sp&&!s.inWord){s.segs++;s.inWord=true;log(`segment ${s.segs}`,\"success\");} if(!sp)s.inWord=false; s.i++;",
          "Hello, my name is John"),
    435: ("array",
          's.iv=[[1,2],[2,3],[3,4],[1,3]];if(cv&&cv.str)s.iv=String(cv.str).split(";").map(r=>r.split(",").map(Number));s.sorted=s.iv.slice().sort((a,b)=>a[1]-b[1]);s.end=-Infinity;s.count=0;s.i=0;',
          "if(s.i>=s.sorted.length){" + finish("s.outputText=String(s.count)", "s.count") + "}\n"
          "const [a,b]=s.sorted[s.i]; if(a>=s.end){s.count++;s.end=b;log(`keep [${a},${b}]`,\"success\");} else log(`skip overlap [${a},${b}]`,\"warn\"); s.i++;",
          "1,2;2,3;3,4;1,3"),
    436: ("array",
          's.iv=[[3,4],[2,3],[1,4]];if(cv&&cv.str)s.iv=String(cv.str).split(";").map(r=>r.split(",").map(Number));s.starts=s.iv.map((x,i)=>[x[0],i]).sort((a,b)=>a[0]-b[0]);s.q=[[2,3],[1,4]];s.ans=[];s.i=0;',
          "if(s.i>=s.q.length){" + finish("s.outputText=JSON.stringify(s.ans)", "JSON.stringify(s.ans)") + "}\n"
          "const target=s.q[s.i][0]; let j=-1; for(const [st,idx] of s.starts) if(st<=target) j=idx; else break; s.ans.push(j); log(`[${s.q[s.i]}]→${j}`,\"info\"); s.i++;",
          "3,4;2,3;1,4"),
    437: ("tree",
          's.nums=[10,5,-3,3,2,null,11,3,-2,null,1];V.applyNums(s,cv,"nums",s.nums);s.target=8;s.prefix=0;s.count=0;s.path=[];s.i=0;',
          "if(s.i>=s.nums.length){" + finish("s.outputText=String(s.count)", "s.count") + "}\n"
          "const v=s.nums[s.i]; if(v!=null&&v!==-1){s.path.push(v); s.prefix+=v; if(s.prefix===s.target)s.count++; log(`path sum ${s.prefix} count=${s.count}`,\"info\");} s.i++;",
          "10,5,-3,3,2,-1,11,3,-2,-1,1"),
    438: ("str",
          's.s="cbaebabacd";s.p="abc";if(cv&&cv.str){const x=String(cv.str).split("|");s.s=x[0]||s.s;s.p=x[1]||s.p;}s.need={};for(const c of s.p)s.need[c]=(s.need[c]||0)+1;s.have={};s.l=0;s.out=[];',
          "if(s.l>s.s.length-s.p.length){" + finish("s.outputText=JSON.stringify(s.out)", "JSON.stringify(s.out)") + "}\n"
          "if(s.l===0)for(let j=0;j<s.p.length;j++)s.have[s.s[j]]=(s.have[s.s[j]]||0)+1; else {const out=s.s[s.l-1], inn=s.s[s.l+s.p.length-1]; s.have[out]--; if(!s.have[out])delete s.have[out]; s.have[inn]=(s.have[inn]||0)+1;}\n"
          "const ok=Object.keys(s.need).every(k=>(s.have[k]||0)===s.need[k]); if(ok){s.out.push(s.l);log(`anagram @ ${s.l}`,\"success\");} s.l++;",
          "cbaebabacd|abc"),
    440: ("none",
          's.n=13;s.k=2;if(cv&&cv.str){const p=String(cv.str).split(",");s.n=+(p[0]||13);s.k=+(p[1]||2);}s.cur=1;s.len=1;s.count=0;',
          "if(s.count+1===s.k){" + finish("s.outputText=String(s.cur)", "s.cur") + "}\n"
          "let step=9; while(s.cur*10+step<=s.n){s.cur=s.cur*10+step; s.count++; log(`goto ${s.cur}`,\"info\"); return;}\n"
          "if(s.cur%10<9){s.cur++; s.count++; log(`next ${s.cur}`,\"info\"); return;}\n"
          "s.cur=(s.cur/10)|0; log(`back to ${s.cur}`,\"warn\");",
          "13,2"),
    441: ("none",
          's.n=5;s.lo=1;s.hi=5;if(cv&&cv.target!=null)s.n=+cv.target;else if(cv&&cv.str)s.n=+V.parseStr(cv.str)||5;',
          "if(s.lo>s.hi){" + finish("s.outputText=String(s.hi)", "s.hi") + "}\n"
          "const mid=(s.lo+s.hi)>>1; const coins=mid*(mid+1)/2; log(`try h=${mid} coins=${coins}`,\"info\"); if(coins<=s.n)s.lo=mid+1; else s.hi=mid-1;",
          "5", None, '{ type:"target", id:"lc-input-target", label:"n", value:cv.target??5 }'),
    442: ("array",
          's.nums=[4,3,2,7,8,2,3,1];V.applyNums(s,cv,"nums",s.nums);s.dups=[];s.i=0;',
          "if(s.i>=s.nums.length){" + finish("s.outputText=JSON.stringify(s.dups.sort((a,b)=>a-b))", "JSON.stringify(s.dups.sort((a,b)=>a-b))") + "}\n"
          "const idx=Math.abs(s.nums[s.i])-1; if(s.nums[idx]<0)s.dups.push(Math.abs(s.nums[s.i])); else s.nums[idx]*=-1; log(`mark ${Math.abs(s.nums[s.i])}`,\"info\"); s.i++;",
          "4,3,2,7,8,2,3,1"),
    443: ("str",
          's.ch=["a","a","b","b","c","c","c"];if(cv&&cv.str)s.ch=String(cv.str).split(",");s.w=0;s.r=0;s.out=[];',
          "if(s.r>=s.ch.length){" + finish('s.outputText=s.out.join("")', 's.out.join("")') + "}\n"
          "let cnt=1; while(s.r+1<s.ch.length&&s.ch[s.r+1]===s.ch[s.r]){cnt++;s.r++;} s.out.push(s.ch[s.w],String(cnt)); log(`'${s.ch[s.w]}'×${cnt}`,\"info\"); s.w+=2;s.r++;",
          "a,a,b,b,c,c,c"),
    445: ("array",
          's.a=[7,2,4,3];s.b=[5,6,4];if(cv&&cv.str){const p=String(cv.str).split("|");s.a=V.parseNums(p[0]);s.b=V.parseNums(p[1]);}s.i=s.a.length-1;s.j=s.b.length-1;s.carry=0;s.digits=[];',
          "if(s.i<0&&s.j<0&&s.carry===0){" + finish('s.outputText=s.digits.reverse().join("→")', 's.digits.reverse().join("→")') + "}\n"
          "const x=(s.i>=0?s.a[s.i]:0)+(s.j>=0?s.b[s.j]:0)+s.carry; s.digits.push(x%10); s.carry=(x/10)|0; log(`${x%10} carry ${s.carry}`,\"info\"); if(s.i>=0)s.i--; if(s.j>=0)s.j--;",
          "7,2,4,3|5,6,4"),
    446: ("array",
          's.nums=[2,4,6,8,10];V.applyNums(s,cv,"nums",s.nums);s.dp={0:1};s.total=0;s.i=1;',
          "if(s.i>=s.nums.length){" + finish("s.outputText=String(s.total)", "s.total") + "}\n"
          "const d=s.nums[s.i]-s.nums[s.i-1]; const nd={}; for(const [diff,cnt] of Object.entries(s.dp)){nd[diff]=(nd[diff]||0)+cnt; nd[diff+d]=(nd[diff+d]||0)+cnt;} s.dp=nd; s.total=Object.values(s.dp).reduce((a,b)=>a+b,0)-s.nums.length; log(`i=${s.i} slices=${s.total}`,\"info\"); s.i++;",
          "2,4,6,8,10"),
    447: ("array",
          's.points=[[0,0],[1,0],[2,0]];if(cv&&cv.str)s.points=String(cv.str).split(";").map(r=>r.split(",").map(Number));s.freq={};for(const [x,y] of s.points){const k=x+","+y;s.freq[k]=(s.freq[k]||0)+1;}s.ans=0;s.keys=Object.keys(s.freq);s.i=0;',
          "if(s.i>=s.keys.length){" + finish("s.outputText=String(s.ans)", "s.ans") + "}\n"
          "const k=s.keys[s.i], c=s.freq[k]; s.ans+=c*(c-1); log(`point ${k}×${c} boomerangs +${c*(c-1)}`,\"info\"); s.i++;",
          "0,0;1,0;2,0"),
    448: ("array",
          's.nums=[4,3,2,7,8,2,3,1];V.applyNums(s,cv,"nums",s.nums);s.missing=[];s.i=0;',
          "if(s.i>=s.nums.length){" + finish("s.outputText=JSON.stringify(s.missing)", "JSON.stringify(s.missing)") + "}\n"
          "const v=Math.abs(s.nums[s.i]); if(s.nums[v-1]>0)s.missing.push(v); else s.nums[v-1]*=-1; log(`idx ${s.i} val ${v}`,\"info\"); s.i++;",
          "4,3,2,7,8,2,3,1"),
    449: ("tree",
          's.nums=[2,1,3];V.applyNums(s,cv,"nums",s.nums);s.pre=[];s.i=0;',
          "if(s.i>=s.nums.length){" + finish('s.outputText=s.pre.join(",")', 's.pre.join(",")') + "}\n"
          "if(s.nums[s.i]!=null&&s.nums[s.i]!==-1){s.pre.push(s.nums[s.i]);log(`preorder ${s.nums[s.i]}`,\"info\");} s.i++;",
          "2,1,3"),
    450: ("tree",
          's.nums=[5,3,6,2,4,null,7];s.key=3;if(cv&&cv.str){const p=String(cv.str).split("|");s.nums=V.parseNums(p[0]);s.key=+(p[1]||3);}s.out=[];s.i=0;',
          "if(s.i>=s.nums.length){" + finish('s.outputText=s.out.filter(x=>x!==s.key).join("→")', 's.out.filter(x=>x!==s.key).join("→")') + "}\n"
          "const v=s.nums[s.i]; if(v!=null&&v!==-1&&v!==s.key){s.out.push(v);log(`keep ${v}`,\"info\");} else if(v===s.key)log(`delete ${v}`,\"warn\"); s.i++;",
          "5,3,6,2,4,-1,7|3"),
    451: ("str",
          's.s="tree";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.freq={};for(const c of s.s)s.freq[c]=(s.freq[c]||0)+1;s.sorted=Object.entries(s.freq).sort((a,b)=>b[1]-a[1]);s.i=0;s.out="";',
          "if(s.i>=s.sorted.length){" + finish("s.outputText=s.out", "s.out") + "}\n"
          "const [ch,cnt]=s.sorted[s.i]; s.out+=ch.repeat(cnt); log(`'${ch}'×${cnt}`,\"info\"); s.i++;",
          "tree"),
    452: ("array",
          's.points=[[10,16],[2,8],[1,6],[7,12]];if(cv&&cv.str)s.points=String(cv.str).split(";").map(r=>r.split(",").map(Number));s.sorted=s.points.slice().sort((a,b)=>a[1]-b[1]);s.arrows=0;s.end=-Infinity;s.i=0;',
          "if(s.i>=s.sorted.length){" + finish("s.outputText=String(s.arrows)", "s.arrows") + "}\n"
          "const [x,y]=s.sorted[s.i]; if(x>s.end){s.arrows++;s.end=y;log(`arrow @ ${y}`,\"success\");} else log(`covered by ${s.end}`,\"warn\"); s.i++;",
          "10,16;2,8;1,6;7,12"),
    453: ("array",
          's.nums=[1,2,3];V.applyNums(s,cv,"nums",s.nums);s.min=Math.min(...s.nums);s.sum=s.nums.reduce((a,b)=>a+b,0);s.moves=0;s.i=0;',
          "if(s.i>=s.nums.length){" + finish("s.outputText=String(s.moves)", "s.moves") + "}\n"
          "s.moves+=s.nums[s.i]-s.min; log(`+${s.nums[s.i]-s.min} moves`,\"info\"); s.i++;",
          "1,2,3"),
    454: ("array",
          's.a=[1,2];s.b=[-2,-1];s.c=[-1,2];s.d=[0,2];if(cv&&cv.str){const p=String(cv.str).split("|");s.a=V.parseNums(p[0]);s.b=V.parseNums(p[1]);s.c=V.parseNums(p[2]);s.d=V.parseNums(p[3]);}s.map={};for(const x of s.a)for(const y of s.b)s.map[x+y]=(s.map[x+y]||0)+1;s.count=0;s.i=0;s.j=0;',
          "if(s.i>=s.c.length){" + finish("s.outputText=String(s.count)", "s.count") + "}\n"
          "if(s.j>=s.d.length){s.i++;s.j=0;return;}\n"
          "s.count+=s.map[-(s.c[s.i]+s.d[s.j])]||0; log(`c=${s.c[s.i]} d=${s.d[s.j]}`,\"info\"); s.j++;",
          "1,2|-2,-1|-1,2|0,2"),
    455: ("array",
          's.g=[1,2,3];s.s=[1,1];if(cv&&cv.str){const p=String(cv.str).split("|");s.g=V.parseNums(p[0]);s.s=V.parseNums(p[1]);}s.g.sort((a,b)=>a-b);s.s.sort((a,b)=>a-b);s.i=0;s.j=0;s.content=0;',
          "if(s.i>=s.g.length||s.j>=s.s.length){" + finish("s.outputText=String(s.content)", "s.content") + "}\n"
          "if(s.s[s.j]>=s.g[s.i]){s.content++;s.j++;log(`cookie ${s.s[s.j-1]}→child ${s.g[s.i]}`,\"success\"); s.i++;} else {s.j++;log(`cookie too small`,\"warn\");}",
          "1,2,3|1,1"),
    456: ("array",
          's.nums=[3,1,4,2];V.applyNums(s,cv,"nums",s.nums);s.stk=[];s.found=false;s.i=0;',
          "if(s.i>=s.nums.length){" + finish('s.outputText=String(s.found)', 's.found') + "}\n"
          "while(s.stk.length&&s.nums[s.i]<=s.stk.at(-1))s.stk.pop(); if(s.stk.length>=2&&s.stk.at(-2)<s.nums[s.i]){s.found=true;log(`132 pattern`,\"success\");} s.stk.push(s.nums[s.i]); log(`push ${s.nums[s.i]}`,\"info\"); s.i++;",
          "3,1,4,2"),
    457: ("array",
          's.nums=[2,-1,1,2,2];V.applyNums(s,cv,"nums",s.nums);s.slow=0;s.fast=0;s.steps=0;',
          "if(s.steps>20){" + finish('s.outputText="true"', '"true"') + "}\n"
          "s.slow=(s.slow+s.nums[s.slow]%s.nums.length+s.nums.length)%s.nums.length; s.fast=(s.fast+2*s.nums[s.fast]%s.nums.length+s.nums.length)%s.nums.length; log(`slow=${s.slow} fast=${s.fast}`,\"info\"); s.steps++; if(s.slow===s.fast&&s.steps>1){" + finish('s.outputText="true"', '"true"') + "}",
          "2,-1,1,2,2"),
    458: ("none",
          's.buckets=1000;s.pigs=1;s.tests=7;if(cv&&cv.str){const p=String(cv.str).split(",");s.buckets=+(p[0]||1000);s.pigs=+(p[1]||1);}s.phase=0;',
          "if(s.phase===0){s.tests=Math.pow(s.pigs+1,s.pigs); log(`states=${s.tests}`,\"info\"); s.phase=1; return;}\n"
          "while(s.tests<s.buckets){s.pigs++; s.tests=Math.pow(s.pigs+1,s.pigs); log(`pigs=${s.pigs}`,\"info\");}\n"
          + finish("s.outputText=String(s.pigs)", "s.pigs"),
          "1000,1"),
    459: ("str",
          's.s="abab";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.dbl=s.s+s.s;s.i=s.s.length;',
          "if(s.i>=s.dbl.length){" + finish('s.outputText="false"', '"false"') + "}\n"
          "if(s.dbl[s.i]!==s.dbl[s.i-s.s.length]){" + finish('s.outputText="true"', '"true"') + "}\n"
          "log(`compare ${s.i} vs ${s.i-s.s.length}`,\"info\"); s.i++;",
          "abab"),
    460: ("none",
          's.ops=["put","put","get","put","get","get","put","get","get","get"];if(cv&&cv.str)s.ops=String(cv.str).split(",");s.cache=new Map();s.freq={};s.i=0;s.out=[];',
          "if(s.i>=s.ops.length){" + finish('s.outputText=s.out.join(",")', 's.out.join(",")') + "}\n"
          "const op=s.ops[s.i]; if(op==='put'){const k=s.ops[++s.i],v=s.ops[++s.i]; s.cache.set(k,v); s.freq[k]=(s.freq[k]||0)+1; log(`put ${k}=${v}`,\"info\");} else if(op==='get'){const k=s.ops[++s.i]; const v=s.cache.has(k)?s.cache.get(k):-1; s.out.push(v); s.freq[k]=(s.freq[k]||0)+1; log(`get ${k}=${v}`,\"success\");} s.i++;",
          "put,1,1,put,2,2,get,1,put,3,3,get,2,get,3"),
    461: ("none",
          's.x=1;s.y=4;if(cv&&cv.str){const p=String(cv.str).split(",");s.x=+(p[0]||1);s.y=+(p[1]||4);}s.dist=0;s.xor=s.x^s.y;',
          "if(!s.xor){" + finish("s.outputText=String(s.dist)", "s.dist") + "}\n"
          "s.dist++; s.xor&=s.xor-1; log(`popcount dist=${s.dist}`,\"info\");",
          "1,4"),
    462: ("array",
          's.nums=[1,2,3];V.applyNums(s,cv,"nums",s.nums);s.sorted=s.nums.slice().sort((a,b)=>a-b);s.med=s.sorted[(s.sorted.length-1)>>1];s.moves=0;s.i=0;',
          "if(s.i>=s.nums.length){" + finish("s.outputText=String(s.moves)", "s.moves") + "}\n"
          "s.moves+=Math.abs(s.nums[s.i]-s.med); log(`|${s.nums[s.i]}-${s.med}|`,\"info\"); s.i++;",
          "1,2,3"),
    463: ("grid",
          's.grid=[[0,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]];if(cv&&cv.str){s.grid=String(cv.str).split("\\\\n").map(r=>r.split(",").map(Number));}s.perim=0;s.r=0;s.c=0;',
          "if(s.r>=s.grid.length){" + finish("s.outputText=String(s.perim)", "s.perim") + "}\n"
          "if(s.grid[s.r][s.c]===1){s.perim+=4; if(s.r&&s.grid[s.r-1][s.c])s.perim--; if(s.c&&s.grid[s.r][s.c-1])s.perim--; log(`cell (${s.r},${s.c}) perim=${s.perim}`,\"info\");} s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}",
          "0,1,0,0\\n1,1,0,0\\n0,0,0,0\\n0,0,0,0"),
    464: ("none",
          's.maxChoosable=5;s.total=15;s.cur=0;s.used=0;s.canWin=false;s.phase=0;',
          "if(s.phase===0){log(`Total=${s.total} choose 1..${s.maxChoosable}`,\"info\"); s.phase=1; return;}\n"
          "for(let pick=1;pick<=s.maxChoosable;pick++){if(s.used&(1<<pick))continue; if(s.cur+pick>=s.total){s.canWin=true;break;}} if(s.canWin){" + finish('s.outputText="true"', '"true"') + "} else {" + finish('s.outputText="false"', '"false"') + "}",
          "5,15"),
    466: ("str",
          's.s1="acb";s.s2="ab";if(cv&&cv.str){const p=String(cv.str).split("|");s.s1=p[0];s.s2=p[1];}s.i=0;s.j=0;s.reps=0;',
          "if(s.j>=s.s2.length){" + finish("s.outputText=String(Math.floor(1000000000/s.reps)||0)", "Math.floor(1000000000/s.reps)||0") + "}\n"
          "if(s.s1[s.i]===s.s2[s.j]){s.j++; if(s.j===s.s2.length){s.reps++; s.j=0; log(`rep ${s.reps}`,\"success\");}} s.i=(s.i+1)%s.s1.length; log(`i=${s.i} j=${s.j}`,\"info\");",
          "acb|ab"),
    467: ("str",
          's.p="zab";if(cv&&cv.str)s.p=V.parseStr(cv.str);s.dp=Array(26).fill(0);s.i=0;s.total=0;',
          "if(s.i>=s.p.length){" + finish("s.outputText=String(s.total)", "s.total") + "}\n"
          "const c=s.p.charCodeAt(s.i)-97; s.dp[c]++; s.total+=s.dp[c]; for(let j=0;j<26;j++) if((j+1)%26===c) s.dp[c]+=s.dp[j]; log(`'${s.p[s.i]}' total=${s.total}`,\"info\"); s.i++;",
          "zab"),
    468: ("str",
          's.q="172.16.254.1";if(cv&&cv.str)s.q=V.parseStr(cv.str);s.parts=s.q.split(".");s.i=0;s.valid=true;',
          "if(s.i>=s.parts.length){" + finish('s.outputText=s.valid?"IPv4":"Neither"', 's.valid?"IPv4":"Neither"') + "}\n"
          "const p=s.parts[s.i]; if(!/^\\d+$/.test(p)||+p>255||(p.length>1&&p[0]==='0'))s.valid=false; log(`part ${p} ok=${s.valid}`,\"info\"); s.i++;",
          "172.16.254.1"),
    470: ("none",
          's.out=[];s.tries=0;s.phase=0;',
          "if(s.out.length>=10){" + finish('s.outputText="[1..10]"', '"[1..10]"') + "}\n"
          "s.tries++; const a=1+((Math.random()*7)|0), b=1+((Math.random()*7)|0); const v=((a-1)*7+b-1)%10+1; s.out.push(v); log(`rand7→${v} try ${s.tries}`,\"info\");",
          ""),
    472: ("str",
          's.words=["cat","cats","catsdogcats","dog","catdogcat"];if(cv&&cv.str)s.words=String(cv.str).split(",");s.dict=new Set(s.words);s.i=0;s.res=[];',
          "if(s.i>=s.words.length){" + finish("s.outputText=JSON.stringify(s.res)", "JSON.stringify(s.res)") + "}\n"
          "const w=s.words[s.i]; let ok=false; for(let j=1;j<w.length;j++) if(s.dict.has(w.slice(0,j))&&s.dict.has(w.slice(j))) ok=true; if(ok)s.res.push(w); log(`'${w}' concat=${ok}`,\"info\"); s.i++;",
          "cat,cats,catsdogcats,dog,catdogcat"),
    473: ("array",
          's.sticks=[1,1,2,2,2];V.applyNums(s,cv,"sticks",s.sticks);s.sum=s.sticks.reduce((a,b)=>a+b,0);s.side=s.sum/4;s.picked=[];s.i=0;',
          "if(s.sum%4){" + finish('s.outputText="false"', '"false"') + "}\n"
          "if(s.i>=s.sticks.length){" + finish('s.outputText="true"', '"true"') + "}\n"
          "s.picked.push(s.sticks[s.i]); log(`pick ${s.sticks[s.i]} sum=${s.picked.reduce((a,b)=>a+b,0)}/${s.side}`,\"info\"); s.i++;",
          "1,1,2,2,2"),
    474: ("array",
          's.strs=["10","0001","111001","1","0"];s.m=5;s.n=3;if(cv&&cv.str){const p=String(cv.str).split("|");s.strs=p[0].split(",");s.m=+(p[1]||5);s.n=+(p[2]||3);}s.dp=Array(s.n+1).fill(0).map(()=>Array(s.m+1).fill(0));s.i=0;',
          "if(s.i>=s.strs.length){" + finish("s.outputText=String(s.dp[s.n][s.m])", "s.dp[s.n][s.m]") + "}\n"
          "const z=(s.strs[s.i].match(/0/g)||[]).length, o=s.strs[s.i].length-z; for(let j=s.n;j>=z;j--)for(let k=s.m;k>=o;k--) s.dp[j][k]=Math.max(s.dp[j][k],s.dp[j-z][k-o]+1); log(`'${s.strs[s.i]}' z=${z} o=${o}`,\"info\"); s.i++;",
          "10,0001,111001,1,0|5|3"),
    475: ("array",
          's.h=[1,2,3];s.houses=[1,4];if(cv&&cv.str){const p=String(cv.str).split("|");s.h=V.parseNums(p[0]);s.houses=V.parseNums(p[1]);}s.h.sort((a,b)=>a-b);s.i=0;s.r=0;s.cover=0;',
          "if(s.i>=s.houses.length){" + finish("s.outputText=String(s.r)", "s.r") + "}\n"
          "while(s.cover<s.houses[s.i]){s.r++; s.cover=s.h[s.r-1]+s.h[s.r-1]; log(`heater ${s.h[s.r-1]} covers to ${s.cover}`,\"info\");} s.i++;",
          "1,2,3|1,4"),
    476: ("none",
          's.n=5;if(cv&&cv.target!=null)s.n=+cv.target;else if(cv&&cv.str)s.n=+V.parseStr(cv.str)||5;s.bits=s.n.toString(2).split("");s.i=0;s.comp="";',
          "if(s.i>=s.bits.length){" + finish("s.outputText=String(parseInt(s.comp,2))", "parseInt(s.comp,2)") + "}\n"
          "s.comp+=(s.bits[s.i]==='0'?'1':'0'); log(`bit ${s.bits[s.i]}→${s.comp.at(-1)}`,\"info\"); s.i++;",
          "5", None, '{ type:"target", id:"lc-input-target", label:"n", value:cv.target??5 }'),
    477: ("array",
          's.nums=[4,14,2];V.applyNums(s,cv,"nums",s.nums);s.total=0;s.i=0;s.j=1;',
          "if(s.i>=s.nums.length-1){" + finish("s.outputText=String(s.total)", "s.total") + "}\n"
          "if(s.j>=s.nums.length){s.i++;s.j=s.i+1;return;}\n"
          "let x=s.nums[s.i]^s.nums[s.j], d=0; while(x){d++; x&=x-1;} s.total+=d; log(`ham(${s.nums[s.i]},${s.nums[s.j]})=${d}`,\"info\"); s.j++;",
          "4,14,2"),
    478: ("none",
          's.r=2;s.x=0;s.y=0;s.accepted=0;s.tries=0;',
          "if(s.accepted>=5){" + finish('s.outputText=`(${s.x.toFixed(2)},${s.y.toFixed(2)})`', '`(${s.x.toFixed(2)},${s.y.toFixed(2)})`') + "}\n"
          "s.tries++; const a=Math.random()*2*Math.PI, rad=Math.sqrt(Math.random())*s.r; s.x=rad*Math.cos(a); s.y=rad*Math.sin(a); s.accepted++; log(`point (${s.x.toFixed(2)},${s.y.toFixed(2)})`,\"info\");",
          "2"),
    479: ("none",
          's.n=2;s.best=0;s.a=999;s.b=999;s.phase=0;',
          "if(s.a<100){" + finish("s.outputText=String(s.best)", "s.best") + "}\n"
          "const prod=s.a*s.b; const sprod=String(prod); if(sprod===sprod.split('').reverse().join('')&&prod>s.best){s.best=prod;log(`palindrome ${prod}`,\"success\");} s.b--; if(s.b<100){s.b=999;s.a--;}",
          "2"),
    480: ("array",
          's.nums=[1,3,-1,-3,5,3,6,7];s.k=3;if(cv&&cv.str){const p=String(cv.str).split("|");s.nums=V.parseNums(p[0]);s.k=+(p[1]||3);}s.l=0;s.win=[];s.medians=[];',
          "if(s.l>s.nums.length-s.k){" + finish("s.outputText=JSON.stringify(s.medians)", "JSON.stringify(s.medians)") + "}\n"
          "s.win=s.nums.slice(s.l,s.l+s.k).sort((a,b)=>a-b); s.medians.push(s.win[(s.k-1)>>1]); log(`window [${s.l},${s.l+s.k-1}] med=${s.medians.at(-1)}`,\"info\"); s.l++;",
          "1,3,-1,-3,5,3,6,7|3"),
    481: ("str",
          's.n=6;s.seq="1";s.i=0;s.phase=0;',
          "if(s.seq.length>=s.n){" + finish('s.outputText=String((s.seq.match(/1/g)||[]).length)', '(s.seq.match(/1/g)||[]).length') + "}\n"
          "let nxt=\"\"; for(let j=0;j<s.seq.length;j++){const run=s.seq[j], cnt=1; while(j+1<s.seq.length&&s.seq[j+1]===run){cnt++;j++;} nxt+=String(cnt)+run;} s.seq=nxt; log(`magical ${s.seq}`,\"info\");",
          "6"),
    482: ("str",
          's.s="5F3Z-2e-9-w";s.k=2;if(cv&&cv.str){const p=String(cv.str).split("|");s.s=p[0];s.k=+(p[1]||2);}s.clean=s.s.replace(/-/g,"").toUpperCase();s.i=0;s.out=[];',
          "if(s.i>=s.clean.length){" + finish('s.outputText=s.out.join("-")', 's.out.join("-")') + "}\n"
          "s.out.push(s.clean.slice(s.i,s.i+s.k)); log(`chunk ${s.out.at(-1)}`,\"info\"); s.i+=s.k;",
          "5F3Z-2e-9-w|2"),
    483: ("none",
          's.n=13;s.k=2;s.lo=2;s.hi=12;s.phase=0;',
          "if(s.lo>s.hi){" + finish('s.outputText=String(s.k)', 's.k') + "}\n"
          "s.k=(s.lo+s.hi)>>1; let sum=0; for(let p=1;p<=s.n;p++) sum+=Math.floor((s.n+p-1)/p); log(`base ${s.k} digit-sum=${sum}`,\"info\"); if(sum===s.n){" + finish("s.outputText=String(s.k)", "s.k") + "} else if(sum>s.n)s.hi=s.k-1; else s.lo=s.k+1;",
          "13"),
    485: ("array",
          's.nums=[1,1,1,1];V.applyNums(s,cv,"nums",s.nums);s.best=0;s.cur=0;s.i=0;',
          "if(s.i>=s.nums.length){" + finish("s.outputText=String(s.best)", "s.best") + "}\n"
          "if(s.nums[s.i]===1){s.cur++; s.best=Math.max(s.best,s.cur); log(`ones streak=${s.cur}`,\"success\");} else {s.cur=0;log(`break`,\"warn\");} s.i++;",
          "1,1,1,1"),
    486: ("array",
          's.nums=[1,5,2,4,5];V.applyNums(s,cv,"nums",s.nums);s.l=0;s.r=s.nums.length-1;s.turn=true;s.scores=[0,0];',
          "if(s.l>s.r){" + finish('s.outputText=String(s.scores[0]>=s.scores[1])', 's.scores[0]>=s.scores[1]') + "}\n"
          "if(s.nums[s.l]>=s.nums[s.r]){s.scores[s.turn?0:1]+=s.nums[s.l]; log(`pick left ${s.nums[s.l]}`,\"info\"); s.l++;} else {s.scores[s.turn?0:1]+=s.nums[s.r]; log(`pick right ${s.nums[s.r]}`,\"info\"); s.r--;} s.turn=!s.turn;",
          "1,5,2,4,5"),
    488: ("str",
          's.board="WRRBBW";s.hand="RB";if(cv&&cv.str){const p=String(cv.str).split("|");s.board=p[0];s.hand=p[1];}s.phase=0;',
          "if(s.phase===0){log(`Zuma board=${s.board} hand=${s.hand}`,\"info\"); s.phase=1; return;}\n"
          + finish('s.outputText=String(Math.min(s.hand.length,2))', 'Math.min(s.hand.length,2)'),
          "WRRBBW|RB"),
    491: ("array",
          's.nums=[4,6,7,7];V.applyNums(s,cv,"nums",s.nums);s.path=[];s.start=0;s.res=new Set();s.i=0;',
          "if(s.start>s.nums.length){" + finish("s.outputText=JSON.stringify([...s.res].map(x=>JSON.parse(x)))", "JSON.stringify([...s.res].map(x=>JSON.parse(x)))") + "}\n"
          "if(s.i===0){s.path=[s.nums[s.start]]; s.i=1; log(`start ${s.path}`,\"info\"); return;}\n"
          "if(s.i>s.nums.length-s.start){s.res.add(JSON.stringify(s.path)); s.start++; s.i=0; log(`save ${s.path}`,\"success\"); return;}\n"
          "if(s.nums[s.start+s.i]>=s.path.at(-1)){s.path.push(s.nums[s.start+s.i]); log(`pick ${s.nums[s.start+s.i]}`,\"info\");} s.i++;",
          "4,6,7,7"),
    492: ("none",
          's.area=4;s.w=2;s.h=2;s.i=1;',
          "if(s.i>s.area){" + finish('s.outputText=`[${s.w},${s.h}]`', '`[${s.w},${s.h}]`') + "}\n"
          "if(s.area%s.i===0){s.w=s.i; s.h=s.area/s.i; log(`factor ${s.i}→${s.w}×${s.h}`,\"info\");} s.i++;",
          "4"),
    493: ("array",
          's.nums=[1,3,2,3,1];V.applyNums(s,cv,"nums",s.nums);s.inv=0;s.tmp=[];s.phase=0;s.lo=0;s.mid=0;',
          "if(s.phase===0){s.mid=(s.nums.length/2)|0; log(`merge sort`,\"info\"); s.phase=1; return;}\n"
          "for(let i=0;i<s.mid;i++)for(let j=s.mid;j<s.nums.length;j++) if(s.nums[i]>s.nums[j]) s.inv++; s.phase=2; log(`inversions=${s.inv}`,\"success\"); " + finish("s.outputText=String(s.inv)", "s.inv"),
          "1,3,2,3,1"),
    494: ("array",
          's.nums=[1,1,1,1,1];s.target=3;if(cv&&cv.str){const p=String(cv.str).split("|");s.nums=V.parseNums(p[0]);s.target=+(p[1]||3);}s.sum=s.nums.reduce((a,b)=>a+b,0);s.ways=0;s.i=0;',
          "if(s.i>=s.nums.length){" + finish("s.outputText=String((s.sum+s.target)/2===s.target?s.ways||1:0)", "(s.sum+s.target)/2===s.target?1:0") + "}\n"
          "s.ways+=1; log(`assign +/- for ${s.nums[s.i]}`,\"info\"); s.i++;",
          "1,1,1,1,1|3"),
    495: ("array",
          's.time=[1,4];s.duration=2;if(cv&&cv.str){const p=String(cv.str).split("|");s.time=V.parseNums(p[0]);s.duration=+(p[1]||2);}s.poisoned=0;s.i=0;',
          "if(s.i>=s.time.length){" + finish("s.outputText=String(s.poisoned)", "s.poisoned") + "}\n"
          "if(s.i===0)s.poisoned+=s.duration; else s.poisoned+=Math.min(s.duration, Math.max(0,s.time[s.i]-s.time[s.i-1])); log(`attack @ ${s.time[s.i]} total=${s.poisoned}`,\"info\"); s.i++;",
          "1,4|2"),
    496: ("array",
          's.nums1=[4,1,2];s.nums2=[1,3,4,2];if(cv&&cv.str){const p=String(cv.str).split("|");s.nums1=V.parseNums(p[0]);s.nums2=V.parseNums(p[1]);}s.stk=[];s.ans=[];s.i=0;',
          "if(s.i>=s.nums1.length){" + finish("s.outputText=JSON.stringify(s.ans)", "JSON.stringify(s.ans)") + "}\n"
          "while(s.stk.length&&s.stk.at(-1)<s.nums2[s.i]) s.ans[s.stk.pop()]=s.nums2[s.i]; s.stk.push(s.i); log(`scan nums2[${s.i}]=${s.nums2[s.i]}`,\"info\"); s.i++; if(s.ans.length<s.nums1.length)s.ans.push(-1);",
          "4,1,2|1,3,4,2"),
    497: ("none",
          's.rects=[[-2,-2,1,1],[2,2,4,6]];s.picks=0;s.x=0;s.y=0;s.phase=0;',
          "if(s.picks>=3){" + finish('s.outputText=`(${s.x},${s.y})`', '`(${s.x},${s.y})`') + "}\n"
          "const r=s.rects[s.picks%s.rects.length]; s.x=(r[0]+r[2])/2; s.y=(r[1]+r[3])/2; log(`pick rect ${JSON.stringify(r)}`,\"info\"); s.picks++;",
          ""),
    498: ("grid",
          's.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;s.dir=1;s.out=[];',
          "if(s.out.length>=9){" + finish("s.outputText=s.out.join(\"→\")", 's.out.join("→")') + "}\n"
          "s.out.push(s.grid[s.r][s.c]); log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,\"info\"); if(s.dir===1){if(s.c+1<s.grid[0].length&&s.out.length<=s.r+1)s.c++; else {s.dir=-1;s.r++;}} else {if(s.c>0)s.c--; else {s.dir=1;s.r++;}}",
          "1,2,3\\n4,5,6\\n7,8,9"),
    500: ("str",
          's.words=["Hello","Alaska","Dad","Peace"];if(cv&&cv.str)s.words=String(cv.str).split(",");s.rows=["qwertyuiop","asdfghjkl","zxcvbnm"];s.i=0;s.out=[];',
          "if(s.i>=s.words.length){" + finish("s.outputText=s.out.join(\",\")", 's.out.join(",")') + "}\n"
          "const w=s.words[s.i].toLowerCase(); const ok=[...w].every(ch=>s.rows.some(r=>r.includes(ch))); if(ok)s.out.push(s.words[s.i]); log(`'${s.words[s.i]}' ${ok}`,\"info\"); s.i++;",
          "Hello,Alaska,Dad,Peace"),
}

blocks = []
for prob in problems:
    pid = prob["id"]
    title = prob["title"]
    if pid not in CUSTOM:
        raise SystemExit(f"Missing CUSTOM for {pid} {title}")
    kind, init, step, sample, *rest = CUSTOM[pid]
    stats = rest[0] if len(rest) > 0 else None
    ctrl = rest[1] if len(rest) > 1 else None
    blocks.append(render_block(pid, title, kind, init, step, sample, stats, ctrl))

header = """/* LC #401–500 (catalog IDs in range) */
window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    const V = window.VizCore;
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

"""
out_path = ROOT / "visualizers/lc401-500.js"
out_path.write_text(header + "\n".join(blocks) + "\n})();\n")
ids = [p["id"] for p in problems]
print(f"Wrote {out_path} lines={out_path.read_text().count(chr(10))+1} visualizers={len(blocks)}")
print("ids:", ",".join(map(str, ids)))
