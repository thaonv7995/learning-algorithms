/* LC #501–600 */
window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    const V = window.VizCore;
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

    /* 501 Find Mode in Binary Search Tree */
    reg(501, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Find Mode in Binary Search Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find Mode in Binary Search Tree").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 502 IPO */
    reg(502, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] IPO`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"IPO").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 503 Next Greater Element II */
    reg(503, {
        initialize(s, log, cv) {
            s.nums=[1,2,1];V.applyNums(s,cv,"nums",s.nums);s.st=[];s.i=0;s.ans=[];
            log(`[Khởi tạo] Next Greater Element II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=JSON.stringify(s.ans);log(`[KẾT QUẢ] ${JSON.stringify(s.ans)}` ,"success");return;}}
while(s.st.length&&s.st.at(-1)<s.nums[s.i])s.st.pop(); s.ans.push(s.st.length?s.st.at(-1):-1); s.st.push(s.nums[s.i]); log(`NGE ${s.nums[s.i]}→${s.ans.at(-1)}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Next Greater Element II").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 504 Base 7 */
    reg(504, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Base 7`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Base 7").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 506 Relative Ranks */
    reg(506, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Relative Ranks`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Relative Ranks").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 507 Perfect Number */
    reg(507, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Perfect Number`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Perfect Number").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 508 Most Frequent Subtree Sum */
    reg(508, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Most Frequent Subtree Sum`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Most Frequent Subtree Sum").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 509 Fibonacci Number */
    reg(509, {
        initialize(s, log, cv) {
            s.n=4;V.applyTarget(s,cv,4);s.a=0;s.b=1;s.i=0;s.fib=[0,1];
            log(`[Khởi tạo] Fibonacci Number`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.n){{s.done=true;s.outputText=String(s.fib[s.n]);log(`[KẾT QUẢ] ${String(s.fib[s.n])}` ,"success");return;}}
s.fib.push(s.fib.at(-1)+s.fib.at(-2)); log(`fib[${s.i+2}]=${s.fib.at(-1)}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Fibonacci Number").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 511 Game Play Analysis I */
    reg(511, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Game Play Analysis I`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Game Play Analysis I").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 513 Find Bottom Left Tree Value */
    reg(513, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Find Bottom Left Tree Value`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find Bottom Left Tree Value").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 514 Freedom Trail */
    reg(514, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Freedom Trail`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Freedom Trail").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 515 Find Largest Value in Each Tree Row */
    reg(515, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Find Largest Value in Each Tree Row`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find Largest Value in Each Tree Row").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 516 Longest Palindromic Subsequence */
    reg(516, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Longest Palindromic Subsequence`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Longest Palindromic Subsequence").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 517 Super Washing Machines */
    reg(517, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Super Washing Machines`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Super Washing Machines").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 518 Coin Change II */
    reg(518, {
        initialize(s, log, cv) {
            s.nums=[1,2,5];s.amount=5;V.applyNums(s,cv,"nums",s.nums);s.dp=Array(s.amount+1).fill(0);s.dp[0]=1;s.i=0;
            log(`[Khởi tạo] Coin Change II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=String(s.dp[s.amount]);log(`[KẾT QUẢ] ${String(s.dp[s.amount])}` ,"success");return;}}
for(let j=s.nums[s.i];j<=s.amount;j++)s.dp[j]+=s.dp[j-s.nums[s.i]]; log(`coin ${s.nums[s.i]}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Coin Change II").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 519 Random Flip Matrix */
    reg(519, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Random Flip Matrix`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Random Flip Matrix").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 520 Detect Capital */
    reg(520, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Detect Capital`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Detect Capital").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 521 Longest Uncommon Subsequence I */
    reg(521, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Longest Uncommon Subsequence I`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Longest Uncommon Subsequence I").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 522 Longest Uncommon Subsequence II */
    reg(522, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Longest Uncommon Subsequence II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Longest Uncommon Subsequence II").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 523 Continuous Subarray Sum */
    reg(523, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Continuous Subarray Sum`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Continuous Subarray Sum").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 524 Longest Word in Dictionary through Deleting */
    reg(524, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Longest Word in Dictionary through Deleting`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Longest Word in Dictionary through Deleting").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 525 Contiguous Array */
    reg(525, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Contiguous Array`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Contiguous Array").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 526 Beautiful Arrangement */
    reg(526, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Beautiful Arrangement`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Beautiful Arrangement").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 528 Random Pick with Weight */
    reg(528, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Random Pick with Weight`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Random Pick with Weight").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 529 Minesweeper */
    reg(529, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Minesweeper`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Minesweeper").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 530 Minimum Absolute Difference in BST */
    reg(530, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Minimum Absolute Difference in BST`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Minimum Absolute Difference in BST").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 532 K-diff Pairs in an Array */
    reg(532, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] K-diff Pairs in an Array`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"K-diff Pairs in an Array").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 535 Encode and Decode TinyURL */
    reg(535, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Encode and Decode TinyURL`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Encode and Decode TinyURL").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 537 Complex Number Multiplication */
    reg(537, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Complex Number Multiplication`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Complex Number Multiplication").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 538 Convert BST to Greater Tree */
    reg(538, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Convert BST to Greater Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Convert BST to Greater Tree").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 539 Minimum Time Difference */
    reg(539, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Minimum Time Difference`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Minimum Time Difference").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 540 Single Element in a Sorted Array */
    reg(540, {
        initialize(s, log, cv) {
            s.nums=[1,1,2,3,3,4,4,8,8];V.applyNums(s,cv,"nums",s.nums);s.lo=0;s.hi=s.nums.length-1;
            log(`[Khởi tạo] Single Element in a Sorted Array`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.lo>=s.hi){{s.done=true;s.outputText=String(s.nums[s.lo]);log(`[KẾT QUẢ] ${String(s.nums[s.lo])}` ,"success");return;}}
const mid=(s.lo+s.hi>>1); if(s.nums[mid]===s.nums[mid^1])s.lo=mid+1; else s.hi=mid; log(`lo=${s.lo} hi=${s.hi}`,"info");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Single Element in a Sorted Array").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 541 Reverse String II */
    reg(541, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Reverse String II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Reverse String II").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 542 01 Matrix */
    reg(542, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] 01 Matrix`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"01 Matrix").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 543 Diameter of Binary Tree */
    reg(543, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Diameter of Binary Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Diameter of Binary Tree").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 546 Remove Boxes */
    reg(546, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Remove Boxes`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Remove Boxes").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 547 Number of Provinces */
    reg(547, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Number of Provinces`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Number of Provinces").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 550 Game Play Analysis IV */
    reg(550, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Game Play Analysis IV`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Game Play Analysis IV").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 551 Student Attendance Record I */
    reg(551, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Student Attendance Record I`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Student Attendance Record I").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 552 Student Attendance Record II */
    reg(552, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Student Attendance Record II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Student Attendance Record II").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 553 Optimal Division */
    reg(553, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Optimal Division`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Optimal Division").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 554 Brick Wall */
    reg(554, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Brick Wall`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Brick Wall").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 556 Next Greater Element III */
    reg(556, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Next Greater Element III`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Next Greater Element III").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 557 Reverse Words in a String III */
    reg(557, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Reverse Words in a String III`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Reverse Words in a String III").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 558 Logical OR of Two Binary Grids Represented as Quad-Trees */
    reg(558, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Logical OR of Two Binary Grids Represented as Quad-Trees`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Logical OR of Two Binary Grids Represented as Quad-Trees").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 559 Maximum Depth of N-ary Tree */
    reg(559, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Maximum Depth of N-ary Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Maximum Depth of N-ary Tree").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 560 Subarray Sum Equals K */
    reg(560, {
        initialize(s, log, cv) {
            s.nums=[1,1,1];s.k=2;V.applyNums(s,cv,"nums",s.nums);s.prefix=0;s.freq={0:1};s.count=0;s.i=0;
            log(`[Khởi tạo] Subarray Sum Equals K`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=String(s.count);log(`[KẾT QUẢ] ${String(s.count)}` ,"success");return;}}
s.prefix+=s.nums[s.i]; s.count+=s.freq[s.prefix-s.k]||0; s.freq[s.prefix]=(s.freq[s.prefix]||0)+1; log(`prefix=${s.prefix} count=${s.count}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Subarray Sum Equals K").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 561 Array Partition */
    reg(561, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Array Partition`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Array Partition").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 563 Binary Tree Tilt */
    reg(563, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Binary Tree Tilt`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Binary Tree Tilt").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 564 Find the Closest Palindrome */
    reg(564, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Find the Closest Palindrome`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find the Closest Palindrome").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 565 Array Nesting */
    reg(565, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Array Nesting`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Array Nesting").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 566 Reshape the Matrix */
    reg(566, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Reshape the Matrix`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Reshape the Matrix").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 567 Permutation in String */
    reg(567, {
        initialize(s, log, cv) {
            s.s1="ab";s.s2="eidbaooo";if(cv&&cv.str){const p=String(cv.str).split("|");s.s1=p[0]||s.s1;s.s2=p[1]||s.s2;}s.freq={};for(const c of s.s1)s.freq[c]=(s.freq[c]||0)+1;s.l=0;s.r=0;s.need=s.s1.length;s.have=0;
            log(`[Khởi tạo] Permutation in String`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.s2.length){{s.done=true;s.outputText=s.have>=s.need?"true":"false";log(`[KẾT QUẢ] ${s.have>=s.need?"true":"false"}` ,"success");return;}}
const c=s.s2[s.r]; if(s.freq[c]){s.freq[c]--; if(s.freq[c]===0)s.have++;} log(`window [${s.l},${s.r}]`,"info"); s.r++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Permutation in String").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"ab|eidbaooo" }], cv);
        }
    });
    /* 570 Managers with at Least 5 Direct Reports */
    reg(570, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Managers with at Least 5 Direct Reports`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Managers with at Least 5 Direct Reports").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 572 Subtree of Another Tree */
    reg(572, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Subtree of Another Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Subtree of Another Tree").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 575 Distribute Candies */
    reg(575, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Distribute Candies`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Distribute Candies").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 576 Out of Boundary Paths */
    reg(576, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Out of Boundary Paths`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Out of Boundary Paths").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 577 Employee Bonus */
    reg(577, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Employee Bonus`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Employee Bonus").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 581 Shortest Unsorted Continuous Subarray */
    reg(581, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Shortest Unsorted Continuous Subarray`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Shortest Unsorted Continuous Subarray").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 583 Delete Operation for Two Strings */
    reg(583, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Delete Operation for Two Strings`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Delete Operation for Two Strings").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 584 Find Customer Referee */
    reg(584, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Find Customer Referee`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find Customer Referee").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 585 Investments in 2016 */
    reg(585, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Investments in 2016`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Investments in 2016").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 586 Customer Placing the Largest Number of Orders */
    reg(586, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Customer Placing the Largest Number of Orders`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Customer Placing the Largest Number of Orders").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 587 Erect the Fence */
    reg(587, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Erect the Fence`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Erect the Fence").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 589 N-ary Tree Preorder Traversal */
    reg(589, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] N-ary Tree Preorder Traversal`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"N-ary Tree Preorder Traversal").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 590 N-ary Tree Postorder Traversal */
    reg(590, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] N-ary Tree Postorder Traversal`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"N-ary Tree Postorder Traversal").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 591 Tag Validator */
    reg(591, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Tag Validator`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Tag Validator").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 592 Fraction Addition and Subtraction */
    reg(592, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Fraction Addition and Subtraction`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Fraction Addition and Subtraction").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 593 Valid Square */
    reg(593, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Valid Square`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Valid Square").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 594 Longest Harmonious Subsequence */
    reg(594, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Longest Harmonious Subsequence`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Longest Harmonious Subsequence").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 595 Big Countries */
    reg(595, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Big Countries`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Big Countries").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 596 Classes With at Least 5 Students */
    reg(596, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Classes With at Least 5 Students`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Classes With at Least 5 Students").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 598 Range Addition II */
    reg(598, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Range Addition II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Range Addition II").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 599 Minimum Index Sum of Two Lists */
    reg(599, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Minimum Index Sum of Two Lists`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Minimum Index Sum of Two Lists").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 600 Non-negative Integers without Consecutive Ones */
    reg(600, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Non-negative Integers without Consecutive Ones`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Non-negative Integers without Consecutive Ones").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
})();
