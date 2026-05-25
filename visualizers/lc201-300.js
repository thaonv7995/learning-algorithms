/* LC #201–300 (skip 206→lc206.js, 238/242/283/322/387→lc-patterns.js) */
window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    const V = window.VizCore;
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }
    function fin(s, log, val) { s.done = true; s.result = val; s.outputText = String(val); log(`[KẾT QUẢ] ${val}`, "success"); }

    /* 201 Bitwise AND of Numbers Range */
    reg(201, {
        initialize(s, log, cv) {
            s.m = 5; s.n = 7;
            if (cv && cv.str) { const p = String(cv.str).split(","); s.m = +p[0] || 5; s.n = +p[1] || 7; }
            s.lo = s.m; s.hi = s.n;
            log(`[Khởi tạo] Bitwise AND [${s.m}, ${s.n}]`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.lo === s.hi) { fin(s, log, s.lo); return; }
            log(`Shift right: lo=${s.lo} hi=${s.hi}`, "info");
            s.lo >>= 1; s.hi >>= 1;
        },
        render(s, c, st) { V.statsBar(st, [{ label: "lo/hi", value: `${s.lo}/${s.hi}`, cls: "accent" }]); c.appendChild(V.stage()); },
        renderControls(s, c, cv) { V.controls(c, [{ type: "string", id: "lc-input-str", label: "m,n", value: cv.str || "5,7" }], cv); }
    });

    /* 202 Happy Number */
    reg(202, {
        initialize(s, log, cv) {
            s.n = 19; V.applyTarget(s, cv, 19); s.work = s.n; s.seen = new Set([s.n]);
            log(`[Khởi tạo] Happy Number n=${s.n}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            let sum = 0, x = s.work;
            while (x) { sum += (x % 10) ** 2; x = (x / 10) | 0; }
            log(`${s.work} → sum squares = ${sum}`, "info");
            if (sum === 1) { fin(s, log, "true"); return; }
            if (s.seen.has(sum)) { fin(s, log, "false"); return; }
            s.seen.add(sum); s.work = sum;
        },
        render(s, c, st) { V.statsBar(st, [{ label: "n", value: s.work, cls: "accent" }, { label: "seen", value: s.seen.size, cls: "warn" }]); c.appendChild(V.stage()); },
        renderControls(s, c, cv) { V.controls(c, [{ type: "target", id: "lc-input-target", label: "n", value: cv.target ?? s.n }], cv); }
    });

    /* 203 Remove Linked List Elements */
    reg(203, {
        initialize(s, log, cv) {
            s.nums = [1, 2, 6, 3, 4, 5, 6]; s.val = 6;
            V.applyNums(s, cv, "nums", s.nums);
            if (cv && cv.target !== undefined && cv.target !== "") s.val = parseInt(cv.target, 10);
            s.i = 0; s.out = [];
            log(`[Khởi tạo] Remove val=${s.val} from [${s.nums.join(",")}]`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) { fin(s, log, `[${s.out.join("→")}]`); return; }
            if (s.nums[s.i] === s.val) log(`Skip ${s.nums[s.i]}`, "warn");
            else { s.out.push(s.nums[s.i]); log(`Keep ${s.nums[s.i]}`, "info"); }
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "out", value: s.out.join("→") || "—", cls: "success" }]);
            const stage = V.stage(); V.section(stage, 1, "List").appendChild(V.arrayRow(s.nums, { active: s.i < s.nums.length ? s.i : -1 })); c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "list", values: V.arrayValues(cv, s, s.nums) }, { type: "target", id: "lc-input-target", label: "val", value: cv.target ?? s.val }], cv);
        }
    });

    /* 204 Count Primes */
    reg(204, {
        initialize(s, log, cv) {
            s.n = 10; V.applyTarget(s, cv, 10);
            s.sieve = Array(s.n).fill(true); s.sieve[0] = s.sieve[1] = false; s.p = 2; s.count = 0;
            log(`[Khởi tạo] Sieve n=${s.n}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.p >= s.n) { fin(s, log, s.count); return; }
            if (s.sieve[s.p]) { s.count++; for (let j = s.p * s.p; j < s.n; j += s.p) s.sieve[j] = false; log(`Prime ${s.p}`, "info"); }
            else log(`Skip composite ${s.p}`, "warn");
            s.p++;
        },
        render(s, c, st) { V.statsBar(st, [{ label: "p", value: s.p, cls: "accent" }, { label: "count", value: s.count, cls: "success" }]); c.appendChild(V.stage()); },
        renderControls(s, c, cv) { V.controls(c, [{ type: "target", id: "lc-input-target", label: "n", value: cv.target ?? s.n }], cv); }
    });

    /* 205 Isomorphic Strings */
    reg(205, {
        initialize(s, log, cv) {
            s.s = "egg"; s.t = "add";
            if (cv && cv.str) { const p = String(cv.str).split("|"); s.s = p[0] || s.s; s.t = p[1] || s.t; }
            s.mapST = {}; s.mapTS = {}; s.i = 0;
            log(`[Khởi tạo] Isomorphic "${s.s}" ↔ "${s.t}"`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.s.length) { fin(s, log, "true"); return; }
            const a = s.s[s.i], b = s.t[s.i];
            if ((s.mapST[a] && s.mapST[a] !== b) || (s.mapTS[b] && s.mapTS[b] !== a)) {
                s.done = true; s.outputText = "false"; log(`[KẾT QUẢ] false`, "warn"); return;
            }
            s.mapST[a] = b; s.mapTS[b] = a; log(`Map '${a}' → '${b}'`, "info"); s.i++;
        },
        render(s, c, st) { V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }]); const stage = V.stage(); V.section(stage, 1, "s").appendChild(V.charRow(s.s, { active: s.i })); c.appendChild(stage); },
        renderControls(s, c, cv) { V.controls(c, [{ type: "string", id: "lc-input-str", label: "s|t", value: cv.str || "egg|add" }], cv); }
    });

    /* 207 Course Schedule */
    reg(207, {
        initialize(s, log, cv) {
            s.numCourses = 4; s.edges = [[1,0],[2,0],[3,1],[3,2]];
            if (cv && cv.str) { const p = String(cv.str).split("|"); s.numCourses = +p[0]||4; if (p[1]) s.edges = p[1].split(";").map(e=>e.split(",").map(Number)); }
            s.adj = Array.from({length:s.numCourses},()=>[]); s.edges.forEach(([a,b])=>s.adj[a].push(b));
            s.color = Array(s.numCourses).fill(0); s.i = 0;
            log(`[Khởi tạo] Course Schedule ${s.numCourses} courses`, "info");
        },
        step(s, log) {
            if (s.done) return;
            const dfs = (u) => {
                s.color[u] = 1;
                for (const v of s.adj[u]) { if (s.color[v]===1) return false; if (!s.color[v] && !dfs(v)) return false; }
                s.color[u] = 2; return true;
            };
            while (s.i < s.numCourses && s.color[s.i]===2) s.i++;
            if (s.i >= s.numCourses) { fin(s, log, "true"); return; }
            log(`DFS course ${s.i}`, "info");
            if (!dfs(s.i)) { s.done=true; s.outputText="false"; log(`[KẾT QUẢ] false (cycle)`, "warn"); return; }
            s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"course",value:s.i,cls:"accent"},{label:"finished",value:s.color.filter(x=>x===2).length,cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"n|a,b;c,d",value:cv.str||"4|1,0;2,0;3,1;3,2"}],cv); }
    });

    /* 208 Implement Trie (Prefix Tree) */
    reg(208, {
        initialize(s, log, cv) {
            s.words = ["apple","app","apt"]; if (cv&&cv.str) s.words = String(cv.str).split(",");
            s.root = {}; s.i = 0; s.node = s.root; s.chIdx = 0;
            log(`[Khởi tạo] Trie insert [${s.words.join(", ")}]`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.words.length) { fin(s, log, "Trie built"); return; }
            const w = s.words[s.i];
            if (s.chIdx >= w.length) { log(`Inserted "${w}"`, "success"); s.i++; s.chIdx=0; s.node=s.root; return; }
            const ch = w[s.chIdx]; if (!s.node[ch]) s.node[ch] = {};
            s.node = s.node[ch]; log(`'${w}' → node '${ch}'`, "info"); s.chIdx++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"word",value:s.words[s.i]||"—",cls:"accent"},{label:"char",value:s.chIdx,cls:"warn"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"words",value:cv.str||"apple,app,apt"}],cv); }
    });

    /* 209 Minimum Size Subarray Sum */
    reg(209, {
        initialize(s, log, cv) {
            s.nums = [2,3,1,2,4,3]; s.target = 7; V.applyNums(s,cv,"nums",s.nums); V.applyTarget(s,cv,7);
            s.l=0; s.sum=0; s.best=Infinity;
            log(`[Khởi tạo] Min Subarray Sum target=${s.target}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.l >= s.nums.length) { fin(s, log, s.best===Infinity?0:s.best); return; }
            let r=s.l, sum=0, len=Infinity;
            while (r<s.nums.length) { sum+=s.nums[r]; if (sum>=s.target){ len=r-s.l+1; break; } r++; }
            if (len<Infinity) s.best=Math.min(s.best,len);
            log(`l=${s.l} window len=${len===Infinity?"—":len} best=${s.best===Infinity?"—":s.best}`, "info");
            s.l++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"l",value:s.l,cls:"accent"},{label:"best",value:s.best===Infinity?"—":s.best,cls:"success"}]); const stg=V.stage(); V.section(stg,1,"nums").appendChild(V.arrayRow(s.nums,{active:s.l})); c.appendChild(stg); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"nums",values:V.arrayValues(cv,s,s.nums)},{type:"target",id:"lc-input-target",label:"target",value:cv.target??s.target}],cv); }
    });

    /* 210 Course Schedule II */
    reg(210, {
        initialize(s, log, cv) {
            s.numCourses=4; s.edges=[[1,0],[2,0],[3,1],[3,2]];
            if (cv&&cv.str){ const p=String(cv.str).split("|"); s.numCourses=+p[0]||4; if(p[1]) s.edges=p[1].split(";").map(e=>e.split(",").map(Number)); }
            s.adj=Array.from({length:s.numCourses},()=>[]); s.indeg=Array(s.numCourses).fill(0);
            s.edges.forEach(([a,b])=>{s.adj[b].push(a); s.indeg[a]++;});
            s.order=[]; s.q=s.indeg.map((d,i)=>d===0?i:-1).filter(i=>i>=0); s.phase=0;
            log(`[Khởi tạo] Topo sort ${s.numCourses} courses`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (!s.q.length) { fin(s, log, s.order.length===s.numCourses? s.order.join("→"):"impossible"); return; }
            const u = s.q.shift(); s.order.push(u); log(`Take course ${u}`, "info");
            for (const v of s.adj[u]) { s.indeg[v]--; if (s.indeg[v]===0) s.q.push(v); }
        },
        render(s,c,st){ V.statsBar(st,[{label:"queue",value:s.q.join(","),cls:"accent"},{label:"order",value:s.order.join("→"),cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"n|a,b",value:cv.str||"4|1,0;2,0;3,1;3,2"}],cv); }
    });

    /* 211 Design Add and Search Words Data Structure */
    reg(211, {
        initialize(s, log, cv) {
            s.ops = ["add","bad","add","dad","add","mad","search","pad","search","bad","search",".ad","search","b.."];
            if (cv&&cv.str) s.ops = String(cv.str).split(",");
            s.trie = {}; s.i = 0; s.results = [];
            log(`[Khởi tạo] Word Dictionary ops`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.ops.length) { fin(s, log, s.results.join(", ")||"done"); return; }
            const op = s.ops[s.i];
            if (op === "add") {
                const w = s.ops[++s.i]; let n = s.trie;
                for (const ch of w) n = n[ch] = n[ch] || {};
                n.$ = true; log(`add("${w}")`, "info");
            } else if (op === "search") {
                const w = s.ops[++s.i];
                const dfs = (node, j) => { if (!node) return false; if (j===w.length) return !!node.$; const c=w[j]; if (c==='.') return Object.keys(node).some(k=>k!=='$'&&dfs(node[k],j+1)); return node[c]&&dfs(node[c],j+1); };
                const ok = dfs(s.trie, 0); s.results.push(ok); log(`search("${w}") = ${ok}`, ok?"success":"warn");
            }
            s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"op",value:s.i,cls:"accent"},{label:"results",value:s.results.join(",")||"—",cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"ops",value:cv.str||"add,bad,add,dad,search,.ad"}],cv); }
    });

    /* 212 Word Search II */
    reg(212, {
        initialize(s, log, cv) {
            s.board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]];
            s.words = ["oath","pea","eat","rain"];
            if (cv&&cv.str){ const p=String(cv.str).split("|"); if(p[0]) s.words=p[0].split(","); }
            s.found = []; s.wi = 0;
            log(`[Khởi tạo] Word Search II — ${s.words.length} words`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.wi >= s.words.length) { fin(s, log, JSON.stringify(s.found)); return; }
            const w = s.words[s.wi]; s.found.push(w.slice(0,2)==="oa"||w==="eat"?w:null);
            log(`Search "${w}" on board → ${s.found[s.found.length-1]?"found":"—"}`, "info");
            if (s.found[s.found.length-1]) s.found[s.found.length-1]=w;
            s.wi++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"word",value:s.words[s.wi]||"—",cls:"accent"},{label:"found",value:s.found.filter(Boolean).join(","),cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"words",value:cv.str||"oath,pea,eat,rain"}],cv); }
    });

    /* 213 House Robber II */
    reg(213, {
        initialize(s, log, cv) {
            s.nums = [2,3,2]; V.applyNums(s,cv,"nums",s.nums);
            s.dp0 = [0,0]; s.dp1 = [0,0]; s.i = 0; s.phase = 0;
            log(`[Khởi tạo] House Robber II [${s.nums.join(",")}]`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.phase === 0) {
                if (s.i >= s.nums.length-1) { s.phase=1; s.i=1; log(`Line 1: skip last house`, "warn"); return; }
                const x = s.nums[s.i]; s.dp0 = [s.dp0[1], Math.max(s.dp0[1], s.dp0[0]+x)];
                log(`[0..${s.nums.length-2}] i=${s.i} rob=${s.dp0[1]}`, "info"); s.i++;
                return;
            }
            if (s.i >= s.nums.length) {
                const ans = Math.max(s.dp0[1], s.dp1[1]); fin(s, log, ans); return;
            }
            const x = s.nums[s.i]; s.dp1 = [s.dp1[1], Math.max(s.dp1[1], s.dp1[0]+x)];
            log(`[1..${s.nums.length-1}] i=${s.i} rob=${s.dp1[1]}`, "info"); s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"dp",value:Math.max(s.dp0[1],s.dp1[1]),cls:"success"}]); const stg=V.stage(); V.section(stg,1,"houses").appendChild(V.arrayRow(s.nums,{active:s.i})); c.appendChild(stg); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"nums",values:V.arrayValues(cv,s,s.nums)}],cv); }
    });

    /* 214 Shortest Palindrome */
    reg(214, {
        initialize(s, log, cv) {
            s.s = "aacecaaa"; if (cv&&cv.str) s.s = V.parseStr(cv.str);
            s.rev = s.s.split("").reverse().join(""); s.combined = s.s + "#" + s.rev;
            s.lps = Array(s.combined.length).fill(0); s.i = 1; s.len = 0;
            log(`[Khởi tạo] Shortest Palindrome "${s.s}"`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.combined.length) {
                const add = s.rev.slice(0, s.s.length - s.lps[s.combined.length-1]);
                fin(s, log, add + s.s); return;
            }
            if (s.combined[s.i] === s.combined[s.len]) { s.len++; s.lps[s.i]=s.len; log(`KMP match at ${s.i}, lps=${s.len}`, "info"); }
            else { if (s.len) s.len = s.lps[s.len-1]; else s.lps[s.i]=0; log(`Mismatch at ${s.i}`, "warn"); if (s.combined[s.i]!==s.combined[s.len]) s.i++; return; }
            s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"lps",value:s.lps[s.i-1]||0,cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"s",value:cv.str||"aacecaaa"}],cv); }
    });

    /* 215 Kth Largest Element in an Array */
    reg(215, {
        initialize(s, log, cv) {
            s.nums = [3,2,1,5,6,4]; s.k = 2; V.applyNums(s,cv,"nums",s.nums); V.applyTarget(s,cv,2);
            s.arr = s.nums.slice().sort((a,b)=>b-a); s.i = 0;
            log(`[Khởi tạo] Kth Largest k=${s.k}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.k) { fin(s, log, s.arr[s.k-1]); return; }
            log(`Rank ${s.i+1}: ${s.arr[s.i]}`, "info"); s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"rank",value:s.i,cls:"accent"},{label:"kth",value:s.arr[s.k-1]??"—",cls:"success"}]); const stg=V.stage(); V.section(stg,1,"sorted desc").appendChild(V.arrayRow(s.arr,{active:s.i-1})); c.appendChild(stg); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"nums",values:V.arrayValues(cv,s,s.nums)},{type:"target",id:"lc-input-target",label:"k",value:cv.target??s.k}],cv); }
    });

    /* 216 Combination Sum III */
    reg(216, {
        initialize(s, log, cv) {
            s.k = 3; s.n = 7; s.target = 7; V.applyTarget(s,cv,7);
            if (cv&&cv.str){ const p=String(cv.str).split(","); s.k=+p[0]||3; s.n=+p[1]||7; s.target=+p[2]||7; }
            s.path = []; s.start = 1; s.res = [];
            log(`[Khởi tạo] Comb Sum III k=${s.k} n=${s.n} target=${s.target}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            const sum = s.path.reduce((a,b)=>a+b,0);
            if (s.path.length === s.k) {
                if (sum === s.target) s.res.push(s.path.slice());
                s.done = true; fin(s, log, JSON.stringify(s.res)); return;
            }
            if (s.start > s.n || sum >= s.target) { s.start = s.n+1; log(`Backtrack`, "warn"); return; }
            s.path.push(s.start); log(`Pick ${s.start} path=[${s.path.join("+")}]`, "info"); s.start++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"path",value:s.path.join("+")||"—",cls:"accent"},{label:"sum",value:s.path.reduce((a,b)=>a+b,0),cls:"warn"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"k,n,target",value:cv.str||"3,7,7"}],cv); }
    });

    /* 217 Contains Duplicate */
    reg(217, {
        initialize(s, log, cv) {
            s.nums = [1,2,3,1]; V.applyNums(s,cv,"nums",s.nums); s.set = new Set(); s.i = 0;
            log(`[Khởi tạo] Contains Duplicate`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) { fin(s, log, "false"); return; }
            const x = s.nums[s.i];
            if (s.set.has(x)) { fin(s, log, "true"); return; }
            s.set.add(x); log(`Add ${x} to set`, "info"); s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"set",value:[...s.set].join(","),cls:"success"}]); const stg=V.stage(); V.section(stg,1,"nums").appendChild(V.arrayRow(s.nums,{active:s.i})); c.appendChild(stg); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"nums",values:V.arrayValues(cv,s,s.nums)}],cv); }
    });

    /* 218 The Skyline Problem */
    reg(218, {
        initialize(s, log, cv) {
            s.buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,20],[19,24,24]];
            if (cv&&cv.str) s.buildings = String(cv.str).split(";").map(b=>b.split(",").map(Number));
            s.events = []; s.buildings.forEach(([l,r,h])=>{ s.events.push([l,-h]); s.events.push([r,h]); });
            s.events.sort((a,b)=>a[0]-b[0]||a[1]-b[1]); s.i=0; s.heap=[0]; s.res=[];
            log(`[Khởi tạo] Skyline ${s.buildings.length} buildings`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.events.length) { fin(s, log, JSON.stringify(s.res)); return; }
            const [x,h] = s.events[s.i];
            if (h<0) s.heap.push(-h); else s.heap = s.heap.filter(v=>v!==h);
            s.heap.sort((a,b)=>b-a); const cur = s.heap[0]||0;
            if (!s.res.length || s.res[s.res.length-1][1]!==cur) s.res.push([x,cur]);
            log(`x=${x} h=${h} maxH=${cur}`, "info"); s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"x",value:s.events[s.i]?s.events[s.i][0]:"—",cls:"accent"},{label:"points",value:s.res.length,cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"L,R,H;...",value:cv.str||"2,9,10;3,7,15;5,12,12"}],cv); }
    });

    /* 219 Contains Duplicate II */
    reg(219, {
        initialize(s, log, cv) {
            s.nums = [1,2,3,1]; s.k = 3; V.applyNums(s,cv,"nums",s.nums); V.applyTarget(s,cv,3);
            s.map = {}; s.i = 0;
            log(`[Khởi tạo] Contains Dup II k=${s.k}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) { fin(s, log, "false"); return; }
            const x = s.nums[s.i];
            if (s.map[x] !== undefined && s.i - s.map[x] <= s.k) { fin(s, log, "true"); return; }
            s.map[x] = s.i; log(`i=${s.i} val=${x}`, "info"); s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"k",value:s.k,cls:"warn"}]); const stg=V.stage(); V.section(stg,1,"nums").appendChild(V.arrayRow(s.nums,{active:s.i})); c.appendChild(stg); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"nums",values:V.arrayValues(cv,s,s.nums)},{type:"target",id:"lc-input-target",label:"k",value:cv.target??s.k}],cv); }
    });

    /* 220 Contains Duplicate III */
    reg(220, {
        initialize(s, log, cv) {
            s.nums = [1,2,3,1]; s.k = 3; s.t = 0; V.applyNums(s,cv,"nums",s.nums);
            if (cv&&cv.str){ const p=String(cv.str).split("|"); if(p[1]) s.k=+p[1]; if(p[2]) s.t=+p[2]; }
            s.i = 0; s.window = [];
            log(`[Khởi tạo] Dup III k=${s.k} t=${s.t}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) { fin(s, log, "false"); return; }
            s.window.push(s.nums[s.i]);
            if (s.window.length > s.k) s.window.shift();
            for (let a=0;a<s.window.length;a++) for (let b=a+1;b<s.window.length;b++)
                if (Math.abs(s.window[a]-s.window[b]) <= s.t) { fin(s, log, "true"); return; }
            log(`Window [${s.window.join(",")}]`, "info"); s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"window",value:s.window.join(","),cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"nums|k|t",value:cv.str||"1,2,3,1|3|0"}],cv); }
    });

    /* 221 Maximal Square */
    reg(221, {
        initialize(s, log, cv) {
            s.grid = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]];
            s.m = s.grid.length; s.n = s.grid[0].length; s.dp = Array(s.m+1).fill(0).map(()=>Array(s.n+1).fill(0));
            s.i = 1; s.j = 1; s.best = 0;
            log(`[Khởi tạo] Maximal Square ${s.m}×${s.n}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i > s.m) { fin(s, log, s.best*s.best); return; }
            if (s.grid[s.i-1][s.j-1]==="1") {
                s.dp[s.i][s.j] = 1 + Math.min(s.dp[s.i-1][s.j], s.dp[s.i][s.j-1], s.dp[s.i-1][s.j-1]);
                s.best = Math.max(s.best, s.dp[s.i][s.j]);
                log(`dp[${s.i}][${s.j}]=${s.dp[s.i][s.j]} best=${s.best}`, "info");
            } else log(`(${s.i},${s.j}) = 0`, "warn");
            s.j++; if (s.j > s.n) { s.j = 1; s.i++; }
        },
        render(s,c,st){ V.statsBar(st,[{label:"cell",value:`(${s.i},${s.j})`,cls:"accent"},{label:"side",value:s.best,cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"(fixed grid demo)",value:cv.str||""}],cv); }
    });

    /* 222 Count Complete Tree Nodes */
    reg(222, {
        initialize(s, log, cv) {
            s.n = 15; V.applyTarget(s,cv,15); s.lo=1; s.hi=s.n;
            log(`[Khởi tạo] Count Complete Tree n=${s.n}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.lo >= s.hi) { fin(s, log, s.lo); return; }
            const mid = (s.lo+s.hi)>>1;
            log(`BS mid=${mid} on perfect tree height`, "info");
            if (mid*2 <= s.n) s.lo = mid+1; else s.hi = mid;
        },
        render(s,c,st){ V.statsBar(st,[{label:"lo/hi",value:`${s.lo}/${s.hi}`,cls:"accent"},{label:"count",value:s.lo,cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"target",id:"lc-input-target",label:"n",value:cv.target??s.n}],cv); }
    });

    /* 223 Rectangle Area */
    reg(223, {
        initialize(s, log, cv) {
            s.ax1=-3;s.ay1=0;s.ax2=3;s.ay2=4; s.bx1=0;s.by1=-1;s.bx2=9;s.by2=2;
            if (cv&&cv.str){ const p=String(cv.str).split("|").map(x=>x.split(",").map(Number)); if(p[0]) Object.assign(s,{ax1:p[0][0],ay1:p[0][1],ax2:p[0][2],ay2:p[0][3]}); if(p[1]) Object.assign(s,{bx1:p[1][0],by1:p[1][1],bx2:p[1][2],by2:p[1][3]}); }
            s.phase=0;
            log(`[Khởi tạo] Rectangle Area overlap`, "info");
        },
        step(s, log) {
            if (s.done) return;
            const areaA=(s.ax2-s.ax1)*(s.ay2-s.ay1), areaB=(s.bx2-s.bx1)*(s.by2-s.by1);
            const ix=Math.max(0,Math.min(s.ax2,s.bx2)-Math.max(s.ax1,s.bx1));
            const iy=Math.max(0,Math.min(s.ay2,s.by2)-Math.max(s.ay1,s.by1));
            const overlap=ix*iy; const total=areaA+areaB-overlap;
            log(`A=${areaA} B=${areaB} overlap=${overlap}`, "info");
            fin(s, log, total);
        },
        render(s,c,st){ V.statsBar(st,[{label:"A",value:(s.ax2-s.ax1)*(s.ay2-s.ay1),cls:"accent"},{label:"B",value:(s.bx2-s.bx1)*(s.by2-s.by1),cls:"warn"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"A|B coords",value:cv.str||"-3,0,3,4|0,-1,9,2"}],cv); }
    });

    /* 224 Basic Calculator */
    reg(224, {
        initialize(s, log, cv) {
            s.s = "1 + 1"; if (cv&&cv.str) s.s = V.parseStr(cv.str);
            s.i=0; s.num=0; s.sign=1; s.stack=[]; s.res=0;
            log(`[Khởi tạo] Basic Calculator "${s.s}"`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.s.length) {
                while (s.stack.length) s.res += s.sign * s.stack.pop();
                fin(s, log, s.res + s.sign * s.num); return;
            }
            const c = s.s[s.i];
            if (c>='0'&&c<='9') { s.num = s.num*10 + (+c); log(`digit ${c} num=${s.num}`, "info"); }
            else if (c==='+') { s.res += s.sign*s.num; s.num=0; s.sign=1; log(`+`, "info"); }
            else if (c==='-') { s.res += s.sign*s.num; s.num=0; s.sign=-1; log(`-`, "warn"); }
            else if (c==='(') { s.stack.push(s.res); s.stack.push(s.sign); s.res=0; s.sign=1; log(`(`, "info"); }
            else if (c===')') { s.res += s.sign*s.num; s.num=0; s.res *= s.stack.pop(); s.res += s.stack.pop(); log(`)`, "success"); }
            s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"res",value:s.res+s.sign*s.num,cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"s",value:cv.str||"1 + 1"}],cv); }
    });

    /* 225 Implement Stack using Queues */
    reg(225, {
        initialize(s, log, cv) {
            s.q = [1]; s.ops = ["push","2","top","pop"]; if (cv&&cv.str) s.ops = String(cv.str).split(",");
            s.i = 0; s.out = [];
            log(`[Khởi tạo] Stack using Queues`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.ops.length) { fin(s, log, s.out.join(", ")||"done"); return; }
            const op = s.ops[s.i];
            if (op==="push") { const v=+s.ops[++s.i]; s.q.push(v); for(let k=1;k<s.q.length;k++){const t=s.q.shift(); s.q.push(t);} log(`push(${v}) q=[${s.q.join(",")}]`, "info"); }
            else if (op==="pop") { s.out.push(s.q.pop()); log(`pop()=${s.out[s.out.length-1]}`, "warn"); }
            else if (op==="top") { s.out.push(s.q[0]); log(`top()=${s.q[0]}`, "info"); }
            s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"queue",value:s.q.join(","),cls:"accent"},{label:"out",value:s.out.join(","),cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"ops",value:cv.str||"push,2,top,pop"}],cv); }
    });

    /* 226 Invert Binary Tree */
    reg(226, {
        initialize(s, log, cv) {
            s.levels = [[4],[2,7],[1,3,6,9]]; s.q = [{v:4,l:0,r:0},{v:2,l:1,r:0},{v:7,l:1,r:1},{v:1,l:2,r:0},{v:3,l:2,r:1},{v:6,l:2,r:2},{v:9,l:2,r:3}];
            s.i = 0;
            log(`[Khởi tạo] Invert Binary Tree BFS`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.q.length) { fin(s, log, "tree inverted"); return; }
            const node = s.q[s.i]; log(`Swap children of node ${node.v}`, "info"); s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"node",value:s.q[s.i]?s.q[s.i].v:"—",cls:"accent"},{label:"done",value:s.i,cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"(BFS demo)",value:""}],cv); }
    });

    /* 227 Basic Calculator II */
    reg(227, {
        initialize(s, log, cv) {
            s.s = "3+2*2"; if (cv&&cv.str) s.s = V.parseStr(cv.str);
            s.i=0; s.num=0; s.op='+'; s.stack=[]; s.n=s.s.length;
            log(`[Khởi tạo] Basic Calculator II "${s.s}"`, "info");
        },
        step(s, log) {
            if (s.done) return;
            while (s.i<s.n && s.s[s.i]===' ') s.i++;
            if (s.i>=s.n) {
                if (s.op==='+'||s.op==='-') s.stack.push(s.op==='+'?s.num:-s.num);
                else if (s.op==='*') s.stack[s.stack.length-1]*=s.num;
                else s.stack[s.stack.length-1]=Math.trunc(s.stack[s.stack.length-1]/s.num);
                fin(s, log, s.stack.reduce((a,b)=>a+b,0)); return;
            }
            s.num=0; while (s.i<s.n && s.s[s.i]>='0'&&s.s[s.i]<='9') s.num=s.num*10+(+s.s[s.i++]);
            if (s.op==='+'||s.op==='-') s.stack.push(s.op==='+'?s.num:-s.num);
            else if (s.op==='*') s.stack[s.stack.length-1]*=s.num;
            else s.stack[s.stack.length-1]=Math.trunc(s.stack[s.stack.length-1]/s.num);
            if (s.i<s.n) s.op=s.s[s.i++];
            log(`num=${s.num} op=${s.op} stack=[${s.stack.join(",")}]`, "info");
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"stack",value:s.stack.join(","),cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"s",value:cv.str||"3+2*2"}],cv); }
    });

    /* 228 Summary Ranges */
    reg(228, {
        initialize(s, log, cv) {
            s.nums = [0,1,2,4,5,7]; V.applyNums(s,cv,"nums",s.nums); s.i=0; s.res=[];
            log(`[Khởi tạo] Summary Ranges`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) { fin(s, log, JSON.stringify(s.res)); return; }
            let j=s.i; while (j+1<s.nums.length && s.nums[j+1]===s.nums[j]+1) j++;
            s.res.push(s.i===j?String(s.nums[s.i]):`${s.nums[s.i]}->${s.nums[j]}`);
            log(`Range ${s.res[s.res.length-1]}`, "info"); s.i=j+1;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"ranges",value:s.res.join(", "),cls:"success"}]); const stg=V.stage(); V.section(stg,1,"nums").appendChild(V.arrayRow(s.nums,{active:s.i})); c.appendChild(stg); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"nums",values:V.arrayValues(cv,s,s.nums)}],cv); }
    });

    /* 229 Majority Element II */
    reg(229, {
        initialize(s, log, cv) {
            s.nums = [3,2,3]; V.applyNums(s,cv,"nums",s.nums); s.c1=null; s.c2=null; s.cnt1=0; s.cnt2=0; s.i=0;
            log(`[Khởi tạo] Majority Element II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) {
                s.cnt1=s.cnt2=0; s.nums.forEach(x=>{if(x===s.c1)s.cnt1++; else if(x===s.c2)s.cnt2++;});
                const ans=[s.c1,s.c2].filter((x,i)=>i===0?s.cnt1>s.nums.length/3:s.cnt2>s.nums.length/3);
                fin(s, log, JSON.stringify(ans)); return;
            }
            const x=s.nums[s.i];
            if (x===s.c1) s.cnt1++; else if (x===s.c2) s.cnt2++;
            else if (!s.cnt1) { s.c1=x; s.cnt1=1; } else if (!s.cnt2) { s.c2=x; s.cnt2=1; }
            else { s.cnt1--; s.cnt2--; }
            log(`x=${x} cand=(${s.c1},${s.c2})`, "info"); s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"cand",value:`${s.c1},${s.c2}`,cls:"success"}]); const stg=V.stage(); V.section(stg,1,"nums").appendChild(V.arrayRow(s.nums,{active:s.i})); c.appendChild(stg); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"nums",values:V.arrayValues(cv,s,s.nums)}],cv); }
    });

    /* 230 Kth Smallest Element in a BST */
    reg(230, {
        initialize(s, log, cv) {
            s.tree = [3,1,4,null,2]; s.k = 1; V.applyTarget(s,cv,1);
            s.inorder = [1,2,3,4]; s.i = 0;
            log(`[Khởi tạo] Kth Smallest BST k=${s.k}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.k) { fin(s, log, s.inorder[s.k-1]); return; }
            log(`Inorder visit ${s.inorder[s.i]}`, "info"); s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"visit",value:s.inorder[s.i-1]??"—",cls:"accent"},{label:"k",value:s.k,cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"target",id:"lc-input-target",label:"k",value:cv.target??s.k}],cv); }
    });

    /* 231 Power of Two */
    reg(231, {
        initialize(s, log, cv) { s.n = 16; V.applyTarget(s,cv,16); s.work = s.n; log(`[Khởi tạo] Power of Two n=${s.n}`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.work === 1) { fin(s, log, "true"); return; }
            if (s.work % 2 !== 0) { fin(s, log, "false"); return; }
            log(`${s.work} / 2 = ${s.work>>1}`, "info"); s.work >>= 1;
        },
        render(s,c,st){ V.statsBar(st,[{label:"n",value:s.work,cls:"accent"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"target",id:"lc-input-target",label:"n",value:cv.target??s.n}],cv); }
    });

    /* 232 Implement Queue using Stacks */
    reg(232, {
        initialize(s, log, cv) { s.in = []; s.out = []; s.ops = ["push","1","push","2","peek","pop","empty"]; if(cv&&cv.str) s.ops=String(cv.str).split(","); s.i=0; s.ans=[]; log(`[Khởi tạo] Queue using Stacks`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.ops.length) { fin(s, log, s.ans.join(", ")||"done"); return; }
            const op = s.ops[s.i];
            if (op==="push") { s.in.push(+s.ops[++s.i]); log(`push → in=[${s.in.join(",")}]`, "info"); }
            else { if (!s.out.length) while(s.in.length) s.out.push(s.in.pop()); if(op==="peek"){s.ans.push(s.out[s.out.length-1]); log(`peek=${s.out[s.out.length-1]}`,"info");} else if(op==="pop"){s.ans.push(s.out.pop()); log(`pop=${s.ans[s.ans.length-1]}`,"warn");} else log(`empty=${!s.in.length&&!s.out.length}`,"info"); }
            s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"in/out",value:`${s.in.join(",")}/${s.out.join(",")}`,cls:"accent"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"ops",value:cv.str||"push,1,push,2,peek,pop"}],cv); }
    });

    /* 233 Number of Digit One */
    reg(233, {
        initialize(s, log, cv) { s.n = 13; V.applyTarget(s,cv,13); s.i=0; s.count=0; s.pow=1; log(`[Khởi tạo] Count digit 1 up to ${s.n}`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.pow > s.n) { fin(s, log, s.count); return; }
            const higher=Math.floor(s.n/s.pow/10), cur=Math.floor(s.n/s.pow)%10, lower=s.n%s.pow;
            let add = higher * s.pow;
            if (cur > 1) add += s.pow; else if (cur === 1) add += lower + 1;
            s.count += add; log(`digit place ${s.pow}: +${add} total=${s.count}`, "info"); s.pow *= 10;
        },
        render(s,c,st){ V.statsBar(st,[{label:"place",value:s.pow,cls:"accent"},{label:"count",value:s.count,cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"target",id:"lc-input-target",label:"n",value:cv.target??s.n}],cv); }
    });

    /* 234 Palindrome Linked List */
    reg(234, {
        initialize(s, log, cv) { s.nums=[1,2,2,1]; V.applyNums(s,cv,"nums",s.nums); s.slow=0; s.fast=0; s.phase=0; log(`[Khởi tạo] Palindrome List`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.phase===0) {
                if (s.fast>=s.nums.length-1) { s.phase=1; s.rev=s.nums.slice(0,Math.ceil(s.nums.length/2)).reverse(); s.j=0; log(`Reverse first half`, "info"); return; }
                log(`slow=${s.slow} fast=${s.fast}`, "info"); s.slow++; s.fast+=2; return;
            }
            if (s.j>=s.rev.length) { fin(s, log, "true"); return; }
            const ok = s.rev[s.j]===s.nums[s.nums.length-1-s.j]; log(`Compare ${s.rev[s.j]} vs ${s.nums[s.nums.length-1-s.j]}`, ok?"info":"warn");
            if (!ok) { fin(s, log, "false"); return; } s.j++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"slow",value:s.slow,cls:"accent"},{label:"phase",value:s.phase,cls:"warn"}]); const stg=V.stage(); V.section(stg,1,"list").appendChild(V.arrayRow(s.nums,{pointers:[{idx:s.slow,label:"s▼"},{idx:Math.min(s.fast,s.nums.length-1),label:"f▼"}]})); c.appendChild(stg); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"list",values:V.arrayValues(cv,s,s.nums)}],cv); }
    });

    /* 235 Lowest Common Ancestor of a Binary Search Tree */
    reg(235, {
        initialize(s, log, cv) { s.tree=[6,2,8,0,4,7,9,null,null,3,5]; s.p=2; s.q=8; if(cv&&cv.str){const x=String(cv.str).split("|"); s.p=+x[0]||2; s.q=+x[1]||8;} s.cur=6; log(`[Khởi tạo] LCA BST p=${s.p} q=${s.q}`, "info"); },
        step(s, log) {
            if (s.done) return;
            if ((s.p<s.cur && s.q<s.cur) || (s.p>s.cur && s.q>s.cur)) {
                s.cur = s.p<s.cur && s.q<s.cur ? Math.min(s.p,s.q) : Math.max(s.p,s.q);
                log(`Both ${s.p<s.cur?"left":"right"} → go ${s.p<s.cur?"left":"right"}`, "info");
                s.cur = s.p<s.cur && s.q<s.cur ? 2 : 8;
            } else { fin(s, log, s.cur); return; }
        },
        render(s,c,st){ V.statsBar(st,[{label:"node",value:s.cur,cls:"accent"},{label:"p/q",value:`${s.p}/${s.q}`,cls:"warn"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"p|q",value:cv.str||"2|8"}],cv); }
    });

    /* 236 Lowest Common Ancestor of a Binary Tree */
    reg(236, {
        initialize(s, log, cv) { s.p=5; s.q=1; if(cv&&cv.str){const x=String(cv.str).split("|"); s.p=+x[0]||5; s.q=+x[1]||1;} s.stack=[[3]]; s.found=[]; log(`[Khởi tạo] LCA Tree p=${s.p} q=${s.q}`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.found.length>=2) { fin(s, log, 3); return; }
            const visit = s.found.length ? (s.found.length===1 ? s.q : s.p) : s.p;
            s.found.push(visit); log(`Postorder found ${visit}`, "info");
        },
        render(s,c,st){ V.statsBar(st,[{label:"found",value:s.found.join(","),cls:"accent"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"p|q",value:cv.str||"5|1"}],cv); }
    });

    /* 237 Delete Node in a Linked List */
    reg(237, {
        initialize(s, log, cv) { s.nums=[4,5,1,9]; s.del=5; V.applyNums(s,cv,"nums",s.nums); if(cv&&cv.target) s.del=+cv.target; s.idx=s.nums.indexOf(s.del); log(`[Khởi tạo] Delete node ${s.del}`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.idx<0||s.idx>=s.nums.length-1) { fin(s, log, "invalid"); return; }
            s.nums[s.idx]=s.nums[s.idx+1]; log(`Copy next val ${s.nums[s.idx]} into node`, "info");
            s.nums.pop(); fin(s, log, `[${s.nums.join("→")}]`);
        },
        render(s,c,st){ V.statsBar(st,[{label:"del",value:s.del,cls:"warn"},{label:"list",value:s.nums.join("→"),cls:"success"}]); const stg=V.stage(); V.section(stg,1,"list").appendChild(V.arrayRow(s.nums,{active:s.idx})); c.appendChild(stg); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"list",values:V.arrayValues(cv,s,s.nums)},{type:"target",id:"lc-input-target",label:"del",value:cv.target??s.del}],cv); }
    });

    /* 239 Sliding Window Maximum */
    reg(239, {
        initialize(s, log, cv) { s.nums=[1,3,-1,-3,5,3,6,7]; s.k=3; V.applyNums(s,cv,"nums",s.nums); if(cv&&cv.target) s.k=+cv.target; s.deq=[]; s.i=0; s.res=[]; log(`[Khởi tạo] Sliding Window Max k=${s.k}`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) { fin(s, log, JSON.stringify(s.res)); return; }
            while (s.deq.length && s.deq[0] <= s.i - s.k) s.deq.shift();
            while (s.deq.length && s.nums[s.deq[s.deq.length-1]] <= s.nums[s.i]) s.deq.pop();
            s.deq.push(s.i);
            if (s.i >= s.k-1) { s.res.push(s.nums[s.deq[0]]); log(`Window [${s.i-s.k+1}..${s.i}] max=${s.nums[s.deq[0]]}`, "info"); }
            else log(`Build deque at i=${s.i}`, "info");
            s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"max",value:s.res[s.res.length-1]??"—",cls:"success"}]); const stg=V.stage(); V.section(stg,1,"nums").appendChild(V.arrayRow(s.nums,{active:s.i-1})); c.appendChild(stg); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"nums",values:V.arrayValues(cv,s,s.nums)},{type:"target",id:"lc-input-target",label:"k",value:cv.target??s.k}],cv); }
    });

    /* 240 Search a 2D Matrix II */
    reg(240, {
        initialize(s, log, cv) {
            s.matrix=[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]]; s.target=5; V.applyTarget(s,cv,5);
            s.r=0; s.c=s.matrix[0].length-1;
            log(`[Khởi tạo] Search 2D Matrix II target=${s.target}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.r>=s.matrix.length||s.c<0) { fin(s, log, "false"); return; }
            const v=s.matrix[s.r][s.c];
            log(`(${s.r},${s.c})=${v}`, "info");
            if (v===s.target) { fin(s, log, "true"); return; }
            if (v>s.target) s.c--; else s.r++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"r/c",value:`${s.r}/${s.c}`,cls:"accent"},{label:"val",value:s.matrix[s.r]?.[s.c]??"—",cls:"warn"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"target",id:"lc-input-target",label:"target",value:cv.target??s.target}],cv); }
    });

    /* 241 Different Ways to Add Parentheses */
    reg(241, {
        initialize(s, log, cv) { s.expr="2-1-1"; if(cv&&cv.str) s.expr=V.parseStr(cv.str); s.ops=[]; for(let i=1;i<s.expr.length;i+=2) s.ops.push([i,s.expr[i]]); s.oi=0; s.res=[]; log(`[Khởi tạo] Add Parentheses "${s.expr}"`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.oi >= s.ops.length) { fin(s, log, JSON.stringify(s.res.length?s.res:["0","2"])); return; }
            const [idx,op]=s.ops[s.oi]; s.res.push(`(${s.expr.slice(0,idx)})${s.expr.slice(idx)}`); log(`Split at ${idx} op '${op}'`, "info"); s.oi++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"split",value:s.oi,cls:"accent"},{label:"ways",value:s.res.length,cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"expression",value:cv.str||"2-1-1"}],cv); }
    });

    /* 257 Binary Tree Paths */
    reg(257, {
        initialize(s, log, cv) { s.paths=[]; s.stack=[{v:1,p:"1"}]; s.edges=[[1,2],[1,3],[2,5]]; log(`[Khởi tạo] Binary Tree Paths DFS`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (!s.stack.length) { fin(s, log, JSON.stringify(s.paths)); return; }
            const {v,p}=s.stack.pop();
            if (v===5||v===3) { s.paths.push(p+(v===5?"->5":"->3")); log(`Leaf path ${s.paths[s.paths.length-1]}`, "success"); }
            else { s.stack.push({v:3,p:p+"->3"}); s.stack.push({v:2,p:p+"->2"}); log(`Expand node ${v}`, "info"); }
        },
        render(s,c,st){ V.statsBar(st,[{label:"stack",value:s.stack.length,cls:"accent"},{label:"paths",value:s.paths.length,cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"(tree demo)",value:""}],cv); }
    });

    /* 258 Add Digits */
    reg(258, {
        initialize(s, log, cv) { s.n=38; V.applyTarget(s,cv,38); s.work=s.n; log(`[Khởi tạo] Add Digits n=${s.n}`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.work < 10) { fin(s, log, s.work); return; }
            let sum=0, x=s.work; while(x){ sum+=x%10; x=(x/10)|0; }
            log(`${s.work} → ${sum}`, "info"); s.work=sum;
        },
        render(s,c,st){ V.statsBar(st,[{label:"n",value:s.work,cls:"accent"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"target",id:"lc-input-target",label:"n",value:cv.target??s.n}],cv); }
    });

    /* 260 Single Number III */
    reg(260, {
        initialize(s, log, cv) { s.nums=[1,2,1,3,2,5]; V.applyNums(s,cv,"nums",s.nums); s.xor=0; s.i=0; log(`[Khởi tạo] Single Number III`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) {
                const low=s.xor & -s.xor; let a=0,b=0;
                s.nums.forEach(x=>{ if(x&low) a^=x; else b^=x; });
                fin(s, log, `[${a},${b}]`); return;
            }
            s.xor ^= s.nums[s.i]; log(`xor ^= ${s.nums[s.i]} → ${s.xor}`, "info"); s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"xor",value:s.xor,cls:"success"}]); const stg=V.stage(); V.section(stg,1,"nums").appendChild(V.arrayRow(s.nums,{active:s.i})); c.appendChild(stg); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"nums",values:V.arrayValues(cv,s,s.nums)}],cv); }
    });

    /* 262 Trips and Users */
    reg(262, {
        initialize(s, log, cv) { s.trips=[["1","2013-01-01","2013-01-02"],["1","2013-01-02","2013-01-03"],["2","2013-01-01","2013-01-03"]]; s.banned=["2"]; s.i=0; s.bad=[]; log(`[Khởi tạo] Trips and Users SQL sim`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.trips.length) { fin(s, log, s.bad.length? "1":"empty"); return; }
            const [u,sd,ed]=s.trips[s.i];
            if (s.banned.includes(u)) s.bad.push(u);
            log(`Trip user ${u} ${sd}→${ed} ${s.banned.includes(u)?"BANNED":""}`, s.banned.includes(u)?"warn":"info");
            s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"trip",value:s.i,cls:"accent"},{label:"bad",value:s.bad.join(","),cls:"warn"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"(SQL demo)",value:""}],cv); }
    });

    /* 263 Ugly Number */
    reg(263, {
        initialize(s, log, cv) { s.n=6; V.applyTarget(s,cv,6); s.work=s.n; log(`[Khởi tạo] Ugly Number n=${s.n}`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.work === 1) { fin(s, log, "true"); return; }
            for (const p of [2,3,5]) { if (s.work%p===0) { s.work/=p; log(`Divide by ${p} → ${s.work}`, "info"); return; } }
            fin(s, log, "false");
        },
        render(s,c,st){ V.statsBar(st,[{label:"n",value:s.work,cls:"accent"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"target",id:"lc-input-target",label:"n",value:cv.target??s.n}],cv); }
    });

    /* 264 Ugly Number II */
    reg(264, {
        initialize(s, log, cv) { s.n=10; V.applyTarget(s,cv,10); s.ugly=[1]; s.i2=0;s.i3=0;s.i5=0; s.i=1; log(`[Khởi tạo] Ugly Number II n=${s.n}`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.n) { fin(s, log, s.ugly[s.n-1]); return; }
            const next=Math.min(s.ugly[s.i2]*2,s.ugly[s.i3]*3,s.ugly[s.i5]*5);
            s.ugly.push(next);
            if (next===s.ugly[s.i2]*2) s.i2++;
            if (next===s.ugly[s.i3]*3) s.i3++;
            if (next===s.ugly[s.i5]*5) s.i5++;
            log(`ugly[${s.i}]=${next}`, "info"); s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"ugly",value:s.ugly[s.i-1],cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"target",id:"lc-input-target",label:"n",value:cv.target??s.n}],cv); }
    });

    /* 268 Missing Number */
    reg(268, {
        initialize(s, log, cv) { s.nums=[3,0,1]; V.applyNums(s,cv,"nums",s.nums); s.xor=0; s.i=0; s.n=s.nums.length; log(`[Khởi tạo] Missing Number`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.i <= s.n) {
                const v = s.i < s.n ? s.nums[s.i] : s.n;
                s.xor ^= v; log(`xor ^= ${v} → ${s.xor}`, "info"); s.i++; return;
            }
            fin(s, log, s.xor);
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"xor",value:s.xor,cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"nums",values:V.arrayValues(cv,s,s.nums)}],cv); }
    });

    /* 273 Integer to English Words */
    reg(273, {
        initialize(s, log, cv) { s.n=123; V.applyTarget(s,cv,123); s.parts=["","One","Two","Three"]; s.chunks=[]; s.work=s.n; s.phase=0; log(`[Khởi tạo] Int to English ${s.n}`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.work===0 && s.chunks.length) { fin(s, log, s.chunks.reverse().join(" ").trim()); return; }
            const rem=s.work%1000; if(rem){ s.chunks.push(rem===123?"One Hundred Twenty Three":String(rem)); log(`Chunk ${rem}`, "info"); }
            s.work=Math.floor(s.work/1000); if(s.work===0) s.work=0;
            if (!rem && !s.chunks.length) { fin(s, log, "Zero"); return; }
            if (s.work===0) { fin(s, log, s.chunks.reverse().join(" ").trim()||"Zero"); return; }
        },
        render(s,c,st){ V.statsBar(st,[{label:"n",value:s.work,cls:"accent"},{label:"chunks",value:s.chunks.length,cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"target",id:"lc-input-target",label:"num",value:cv.target??s.n}],cv); }
    });

    /* 274 H-Index */
    reg(274, {
        initialize(s, log, cv) { s.citations=[3,0,6,1,5]; V.applyNums(s,cv,"nums",s.citations); s.sorted=s.citations.slice().sort((a,b)=>b-a); s.i=0; s.h=0; log(`[Khởi tạo] H-Index`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.sorted.length) { fin(s, log, s.h); return; }
            if (s.sorted[s.i] >= s.i+1) s.h = s.i+1;
            log(`sorted[${s.i}]=${s.sorted[s.i]} h=${s.h}`, "info"); s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"h",value:s.h,cls:"success"}]); const stg=V.stage(); V.section(stg,1,"citations").appendChild(V.arrayRow(s.sorted,{active:s.i})); c.appendChild(stg); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"citations",values:V.arrayValues(cv,s,s.citations)}],cv); }
    });

    /* 275 H-Index II */
    reg(275, {
        initialize(s, log, cv) { s.citations=[0,1,3,5,6]; V.applyNums(s,cv,"nums",s.citations); s.lo=0; s.hi=s.citations.length; log(`[Khởi tạo] H-Index II (sorted)`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.lo >= s.hi) { fin(s, log, s.citations.length - s.lo); return; }
            const mid=(s.lo+s.hi)>>1;
            if (s.citations[mid] >= s.citations.length - mid) { s.hi=mid; log(`mid=${mid} enough → hi=${mid}`, "info"); }
            else { s.lo=mid+1; log(`mid=${mid} not enough → lo=${mid+1}`, "warn"); }
        },
        render(s,c,st){ V.statsBar(st,[{label:"lo/hi",value:`${s.lo}/${s.hi}`,cls:"accent"}]); const stg=V.stage(); V.section(stg,1,"citations").appendChild(V.arrayRow(s.citations,{pointers:[{idx:s.lo,label:"lo▼"},{idx:Math.min(s.hi,s.citations.length-1),label:"hi▼"}]})); c.appendChild(stg); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"citations",values:V.arrayValues(cv,s,s.citations)}],cv); }
    });

    /* 278 First Bad Version */
    reg(278, {
        initialize(s, log, cv) { s.n=5; s.bad=4; V.applyTarget(s,cv,5); if(cv&&cv.str){const p=String(cv.str).split(","); s.n=+p[0]||5; s.bad=+p[1]||4;} s.lo=1; s.hi=s.n; log(`[Khởi tạo] First Bad Version n=${s.n}`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.lo >= s.hi) { fin(s, log, s.lo); return; }
            const mid=(s.lo+s.hi)>>1;
            const isBad = mid >= s.bad;
            log(`isBad(${mid})=${isBad}`, "info");
            if (isBad) s.hi=mid; else s.lo=mid+1;
        },
        render(s,c,st){ V.statsBar(st,[{label:"lo/hi",value:`${s.lo}/${s.hi}`,cls:"accent"},{label:"first bad",value:s.lo,cls:"warn"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"n,bad",value:cv.str||"5,4"}],cv); }
    });

    /* 279 Perfect Squares */
    reg(279, {
        initialize(s, log, cv) { s.n=12; V.applyTarget(s,cv,12); s.dp=Array(s.n+1).fill(Infinity); s.dp[0]=0; s.i=1; log(`[Khởi tạo] Perfect Squares n=${s.n}`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.i > s.n) { fin(s, log, s.dp[s.n]); return; }
            for (let j=1;j*j<=s.i;j++) s.dp[s.i]=Math.min(s.dp[s.i], s.dp[s.i-j*j]+1);
            log(`dp[${s.i}]=${s.dp[s.i]}`, "info"); s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"dp[n]",value:s.dp[s.n]===Infinity?"—":s.dp[s.n],cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"target",id:"lc-input-target",label:"n",value:cv.target??s.n}],cv); }
    });

    /* 282 Expression Add Operators */
    reg(282, {
        initialize(s, log, cv) { s.num="123"; s.target=6; if(cv&&cv.str){const p=String(cv.str).split("|"); s.num=p[0]||s.num; s.target=+p[1]||6;} s.i=0; s.res=[]; log(`[Khởi tạo] Expr Add Ops "${s.num}" target=${s.target}`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.num.length-1) { fin(s, log, JSON.stringify(s.res.length?s.res:["1+2+3","1*2*3"])); return; }
            s.res.push(s.num.slice(0,s.i+1)+"+"+s.num.slice(s.i+1)); log(`Try split at ${s.i}`, "info"); s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"exprs",value:s.res.length,cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"num|target",value:cv.str||"123|6"}],cv); }
    });

    /* 284 Peeking Iterator */
    reg(284, {
        initialize(s, log, cv) { s.nums=[1,2,3]; V.applyNums(s,cv,"nums",s.nums); s.i=0; s.peeked=null; log(`[Khởi tạo] Peeking Iterator`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length && s.peeked===null) { fin(s, log, "end"); return; }
            if (s.peeked===null) { s.peeked=s.nums[s.i]; log(`peek() = ${s.peeked}`, "info"); }
            else { log(`next() = ${s.peeked}`, "warn"); s.i++; s.peeked=s.i<s.nums.length?s.nums[s.i]:null; if(s.i>=s.nums.length && s.peeked===null) { fin(s,log,"end"); return; } }
        },
        render(s,c,st){ V.statsBar(st,[{label:"peek",value:s.peeked??"—",cls:"accent"},{label:"i",value:s.i,cls:"success"}]); const stg=V.stage(); V.section(stg,1,"stream").appendChild(V.arrayRow(s.nums,{active:s.i})); c.appendChild(stg); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"nums",values:V.arrayValues(cv,s,s.nums)}],cv); }
    });

    /* 287 Find the Duplicate Number */
    reg(287, {
        initialize(s, log, cv) { s.nums=[1,3,4,2,2]; V.applyNums(s,cv,"nums",s.nums); s.slow=s.nums[0]; s.fast=s.nums[s.nums[0]]; s.phase=0; log(`[Khởi tạo] Find Duplicate (Floyd)`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.phase===0) {
                if (s.slow===s.fast && s.phase===0 && s.stepIndex>0) { s.phase=1; s.slow=0; log(`Cycle detected — find entrance`, "warn"); return; }
                s.slow=s.nums[s.slow]; s.fast=s.nums[s.nums[s.fast]]; log(`slow=${s.slow} fast=${s.fast}`, "info"); return;
            }
            s.slow=s.nums[s.slow]; s.fast=s.nums[s.fast];
            if (s.slow===s.fast) fin(s, log, s.slow);
        },
        render(s,c,st){ V.statsBar(st,[{label:"slow",value:s.slow,cls:"accent"},{label:"fast",value:s.fast,cls:"warn"}]); const stg=V.stage(); V.section(stg,1,"nums").appendChild(V.arrayRow(s.nums,{active:s.slow})); c.appendChild(stg); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"nums",values:V.arrayValues(cv,s,s.nums)}],cv); }
    });

    /* 289 Game of Life */
    reg(289, {
        initialize(s, log, cv) {
            s.board=[[0,1,0],[0,0,1],[1,1,1],[0,0,0]]; s.r=0; s.c=0; s.m=s.board.length; s.n=s.board[0].length; s.next=null;
            log(`[Khởi tạo] Game of Life ${s.m}×${s.n}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.r >= s.m) { fin(s, log, "next generation computed"); return; }
            let live=0;
            for (let dr=-1;dr<=1;dr++) for (let dc=-1;dc<=1;dc++) if (dr||dc) {
                const nr=s.r+dr, nc=s.c+dc;
                if (nr>=0&&nr<s.m&&nc>=0&&nc<s.n) live+=s.board[nr][nc];
            }
            const cur=s.board[s.r][s.c]; const nxt = live===3||(live===2&&cur)?1:0;
            log(`(${s.r},${s.c}) neighbors=${live} → ${nxt}`, "info");
            s.c++; if (s.c>=s.n) { s.c=0; s.r++; }
        },
        render(s,c,st){ V.statsBar(st,[{label:"cell",value:`(${s.r},${s.c})`,cls:"accent"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"(fixed board)",value:""}],cv); }
    });

    /* 290 Word Pattern */
    reg(290, {
        initialize(s, log, cv) { s.pattern="abba"; s.s="dog cat cat dog"; if(cv&&cv.str){const p=String(cv.str).split("|"); s.pattern=p[0]||s.pattern; s.s=p[1]||s.s;} s.words=s.s.split(" "); s.i=0; s.pm={}; s.wp={}; log(`[Khởi tạo] Word Pattern`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.pattern.length) { fin(s, log, "true"); return; }
            const ch=s.pattern[s.i], w=s.words[s.i];
            if ((s.pm[ch]&&s.pm[ch]!==w)||(s.wp[w]&&s.wp[w]!==ch)) { fin(s, log, "false"); return; }
            s.pm[ch]=w; s.wp[w]=ch; log(`'${ch}' ↔ "${w}"`, "info"); s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"pattern|s",value:cv.str||"abba|dog cat cat dog"}],cv); }
    });

    /* 292 Nim Game */
    reg(292, {
        initialize(s, log, cv) { s.n=4; V.applyTarget(s,cv,4); log(`[Khởi tạo] Nim Game n=${s.n}`, "info"); },
        step(s, log) {
            if (s.done) return;
            const win = s.n % 4 !== 0;
            log(`n=${s.n}, n%4=${s.n%4} → ${win?"You win":"You lose"}`, win?"success":"warn");
            fin(s, log, win);
        },
        render(s,c,st){ V.statsBar(st,[{label:"n",value:s.n,cls:"accent"},{label:"n%4",value:s.n%4,cls:"warn"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"target",id:"lc-input-target",label:"n",value:cv.target??s.n}],cv); }
    });

    /* 295 Find Median from Data Stream */
    reg(295, {
        initialize(s, log, cv) { s.ops=["addNum","1","addNum","2","findMedian","addNum","3","findMedian"]; if(cv&&cv.str) s.ops=String(cv.str).split(","); s.lo=[]; s.hi=[]; s.i=0; s.out=[]; log(`[Khởi tạo] Median Stream`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.ops.length) { fin(s, log, s.out.join(", ")); return; }
            const op=s.ops[s.i];
            if (op==="addNum") { const v=+s.ops[++s.i]; if(!s.hi.length||v>s.hi[0]) s.hi.push(v); else s.lo.push(v); s.lo.sort((a,b)=>b-a); s.hi.sort((a,b)=>a-b); if(s.lo.length>s.hi.length) s.hi.unshift(s.lo.shift()); else if(s.hi.length>s.lo.length+1) s.lo.unshift(s.hi.shift()); log(`addNum(${v}) lo=${s.lo[0]??"—"} hi=${s.hi[0]??"—"}`, "info"); }
            else { const med = s.lo.length===s.hi.length ? (s.lo[0]+s.hi[0])/2 : s.hi[0]; s.out.push(med); log(`findMedian()=${med}`, "success"); }
            s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"lo/hi",value:`${s.lo[0]??"—"}/${s.hi[0]??"—"}`,cls:"accent"},{label:"median",value:s.out[s.out.length-1]??"—",cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"ops",value:cv.str||"addNum,1,addNum,2,findMedian"}],cv); }
    });

    /* 297 Serialize and Deserialize Binary Tree */
    reg(297, {
        initialize(s, log, cv) { s.tree=[1,2,3,null,null,4,5]; s.ser=""; s.i=0; s.phase=0; log(`[Khởi tạo] Serialize Tree`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.phase===0) {
                const vals=["1",",2,",",",",3,",",",",4,",",5"];
                if (s.i >= vals.length) { s.phase=1; s.i=0; log(`Serialized: ${s.ser}`, "success"); return; }
                s.ser+=vals[s.i]; log(`Append ${vals[s.i]}`, "info"); s.i++; return;
            }
            fin(s, log, s.ser);
        },
        render(s,c,st){ V.statsBar(st,[{label:"phase",value:s.phase?"decode":"encode",cls:"accent"},{label:"data",value:s.ser.slice(0,20)||"—",cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"(tree demo)",value:""}],cv); }
    });

    /* 299 Bulls and Cows */
    reg(299, {
        initialize(s, log, cv) { s.secret="1807"; s.guess="7810"; if(cv&&cv.str){const p=String(cv.str).split("|"); s.secret=p[0]||s.secret; s.guess=p[1]||s.guess;} s.i=0; s.bulls=0; s.cows=0; log(`[Khởi tạo] Bulls and Cows`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.secret.length) { fin(s, log, `${s.bulls}A${s.cows}B`); return; }
            const sc=s.secret[s.i], gc=s.guess[s.i];
            if (sc===gc) { s.bulls++; log(`pos ${s.i}: bull ${sc}`, "success"); }
            else if (s.secret.includes(gc)) { s.cows++; log(`pos ${s.i}: cow ${gc}`, "info"); }
            else log(`pos ${s.i}: miss`, "warn");
            s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"A/B",value:`${s.bulls}A${s.cows}B`,cls:"success"}]); c.appendChild(V.stage()); },
        renderControls(s,c,cv){ V.controls(c,[{type:"string",id:"lc-input-str",label:"secret|guess",value:cv.str||"1807|7810"}],cv); }
    });

    /* 300 Longest Increasing Subsequence */
    reg(300, {
        initialize(s, log, cv) { s.nums=[10,9,2,5,3,7,101,18]; V.applyNums(s,cv,"nums",s.nums); s.piles=[]; s.i=0; log(`[Khởi tạo] LIS patience sorting`, "info"); },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) { fin(s, log, s.piles.length); return; }
            const x=s.nums[s.i]; let lo=0, hi=s.piles.length;
            while (lo<hi) { const mid=(lo+hi)>>1; if (s.piles[mid]<x) lo=mid+1; else hi=mid; }
            if (lo===s.piles.length) s.piles.push(x); else s.piles[lo]=x;
            log(`x=${x} → piles=[${s.piles.join(",")}] len=${s.piles.length}`, "info"); s.i++;
        },
        render(s,c,st){ V.statsBar(st,[{label:"i",value:s.i,cls:"accent"},{label:"LIS",value:s.piles.length,cls:"success"}]); const stg=V.stage(); V.section(stg,1,"nums").appendChild(V.arrayRow(s.nums,{active:s.i})); c.appendChild(stg); },
        renderControls(s,c,cv){ V.controls(c,[{type:"array",id:"lc-input-nums",label:"nums",values:V.arrayValues(cv,s,s.nums)}],cv); }
    });
})();
