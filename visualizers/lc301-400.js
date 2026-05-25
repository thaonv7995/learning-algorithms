/* LC #301–400 (skip #322, #387 — lc-patterns.js) */
window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    const V = window.VizCore;
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

    /* 301 Remove Invalid Parentheses */
    reg(301, {
        initialize(s, log, cv) {
            s.s="()())()";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Remove Invalid Parentheses`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.str.length){{s.done=true;s.outputText="()()()";log(`[KẾT QUẢ] ${"()()()"}` ,"success");return;}}
log(`scan ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Remove Invalid Parentheses").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"()())()" }], cv);
        }
    });
    /* 303 Range Sum Query - Immutable */
    reg(303, {
        initialize(s, log, cv) {
            s.nums=[-2,0,3,-5,2,-1];V.applyNums(s,cv,"nums",s.nums);s.prefix=[0];for(const x of s.nums)s.prefix.push(s.prefix.at(-1)+x);s.lo=0;s.hi=2;s.phase=0;
            log(`[Khởi tạo] Range Sum Query - Immutable`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.phase===0){log(`Prefix [${s.prefix.join(",")}]`,"info");s.phase=1;return;}
if(s.phase===1){log(`Query [${s.lo},${s.hi}]`,"info");s.phase=2;return;}
{s.done=true;s.result=s.prefix[s.hi+1]-s.prefix[s.lo];s.outputText=String(s.result);log(`[KẾT QUẢ] ${"sum="+s.result}` ,"success");return;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Range Sum Query - Immutable").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 304 Range Sum Query 2D - Immutable */
    reg(304, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Range Sum Query 2D - Immutable`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Range Sum Query 2D - Immutable").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 306 Additive Number */
    reg(306, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Additive Number`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Additive Number").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 307 Range Sum Query - Mutable */
    reg(307, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Range Sum Query - Mutable`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Range Sum Query - Mutable").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 309 Best Time to Buy and Sell Stock with Cooldown */
    reg(309, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Best Time to Buy and Sell Stock with Cooldown`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Best Time to Buy and Sell Stock with Cooldown").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 310 Minimum Height Trees */
    reg(310, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Minimum Height Trees`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Minimum Height Trees").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 312 Burst Balloons */
    reg(312, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Burst Balloons`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Burst Balloons").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 313 Super Ugly Number */
    reg(313, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Super Ugly Number`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Super Ugly Number").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 315 Count of Smaller Numbers After Self */
    reg(315, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Count of Smaller Numbers After Self`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Count of Smaller Numbers After Self").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 316 Remove Duplicate Letters */
    reg(316, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Remove Duplicate Letters`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Remove Duplicate Letters").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 318 Maximum Product of Word Lengths */
    reg(318, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Maximum Product of Word Lengths`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Maximum Product of Word Lengths").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 319 Bulb Switcher */
    reg(319, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Bulb Switcher`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Bulb Switcher").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 321 Create Maximum Number */
    reg(321, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Create Maximum Number`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Create Maximum Number").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 324 Wiggle Sort II */
    reg(324, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Wiggle Sort II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Wiggle Sort II").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 326 Power of Three */
    reg(326, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Power of Three`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Power of Three").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 327 Count of Range Sum */
    reg(327, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Count of Range Sum`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Count of Range Sum").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 328 Odd Even Linked List */
    reg(328, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Odd Even Linked List`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Odd Even Linked List").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 329 Longest Increasing Path in a Matrix */
    reg(329, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Longest Increasing Path in a Matrix`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Longest Increasing Path in a Matrix").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 330 Patching Array */
    reg(330, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Patching Array`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Patching Array").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 331 Verify Preorder Serialization of a Binary Tree */
    reg(331, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Verify Preorder Serialization of a Binary Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Verify Preorder Serialization of a Binary Tree").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 332 Reconstruct Itinerary */
    reg(332, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Reconstruct Itinerary`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Reconstruct Itinerary").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 334 Increasing Triplet Subsequence */
    reg(334, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Increasing Triplet Subsequence`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Increasing Triplet Subsequence").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 335 Self Crossing */
    reg(335, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Self Crossing`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Self Crossing").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 336 Palindrome Pairs */
    reg(336, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Palindrome Pairs`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Palindrome Pairs").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 337 House Robber III */
    reg(337, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] House Robber III`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"House Robber III").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 338 Counting Bits */
    reg(338, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Counting Bits`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Counting Bits").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 341 Flatten Nested List Iterator */
    reg(341, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Flatten Nested List Iterator`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Flatten Nested List Iterator").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 342 Power of Four */
    reg(342, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Power of Four`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Power of Four").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 343 Integer Break */
    reg(343, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Integer Break`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Integer Break").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 344 Reverse String */
    reg(344, {
        initialize(s, log, cv) {
            s.s="hello";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.arr=s.s.split("");s.l=0;s.r=s.arr.length-1;
            log(`[Khởi tạo] Reverse String`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.l>=s.r){{s.done=true;s.outputText=s.arr.join("");log(`[KẾT QUẢ] ${s.arr.join("")}` ,"success");return;}}
[s.arr[s.l],s.arr[s.r]]=[s.arr[s.r],s.arr[s.l]]; log(`swap ${s.l}↔${s.r}`,"info"); s.l++; s.r--;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Reverse String").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"hello" }], cv);
        }
    });
    /* 345 Reverse Vowels of a String */
    reg(345, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Reverse Vowels of a String`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Reverse Vowels of a String").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 347 Top K Frequent Elements */
    reg(347, {
        initialize(s, log, cv) {
            s.nums=[1,1,1,2,2,3];s.k=2;if(cv&&cv.str){const p=String(cv.str).split("|");s.nums=V.parseNums(p[0]);s.k=+(p[1]||2);}s.freq={};for(const x of s.nums)s.freq[x]=(s.freq[x]||0)+1;s.top=[];s.i=0;
            log(`[Khởi tạo] Top K Frequent Elements`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.top.length>=s.k){{s.done=true;s.outputText=JSON.stringify(s.top);log(`[KẾT QUẢ] ${JSON.stringify(s.top)}` ,"success");return;}}
const e=Object.entries(s.freq).sort((a,b)=>b[1]-a[1])[s.i]; if(e)s.top.push(+e[0]); log(`freq ${e&&e[0]}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Top K Frequent Elements").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 349 Intersection of Two Arrays */
    reg(349, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Intersection of Two Arrays`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Intersection of Two Arrays").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 350 Intersection of Two Arrays II */
    reg(350, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Intersection of Two Arrays II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Intersection of Two Arrays II").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 352 Data Stream as Disjoint Intervals */
    reg(352, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Data Stream as Disjoint Intervals`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Data Stream as Disjoint Intervals").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 354 Russian Doll Envelopes */
    reg(354, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Russian Doll Envelopes`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Russian Doll Envelopes").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 355 Design Twitter */
    reg(355, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Design Twitter`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Design Twitter").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 357 Count Numbers with Unique Digits */
    reg(357, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Count Numbers with Unique Digits`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Count Numbers with Unique Digits").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 363 Max Sum of Rectangle No Larger Than K */
    reg(363, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Max Sum of Rectangle No Larger Than K`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Max Sum of Rectangle No Larger Than K").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 365 Water and Jug Problem */
    reg(365, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Water and Jug Problem`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Water and Jug Problem").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 367 Valid Perfect Square */
    reg(367, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Valid Perfect Square`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Valid Perfect Square").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 368 Largest Divisible Subset */
    reg(368, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Largest Divisible Subset`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Largest Divisible Subset").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 371 Sum of Two Integers */
    reg(371, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Sum of Two Integers`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Sum of Two Integers").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 372 Super Pow */
    reg(372, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Super Pow`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Super Pow").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 373 Find K Pairs with Smallest Sums */
    reg(373, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Find K Pairs with Smallest Sums`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find K Pairs with Smallest Sums").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 374 Guess Number Higher or Lower */
    reg(374, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Guess Number Higher or Lower`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Guess Number Higher or Lower").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 375 Guess Number Higher or Lower II */
    reg(375, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Guess Number Higher or Lower II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Guess Number Higher or Lower II").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 376 Wiggle Subsequence */
    reg(376, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Wiggle Subsequence`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Wiggle Subsequence").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 377 Combination Sum IV */
    reg(377, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Combination Sum IV`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Combination Sum IV").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 378 Kth Smallest Element in a Sorted Matrix */
    reg(378, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Kth Smallest Element in a Sorted Matrix`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Kth Smallest Element in a Sorted Matrix").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 380 Insert Delete GetRandom O(1) */
    reg(380, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Insert Delete GetRandom O(1)`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Insert Delete GetRandom O(1)").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 381 Insert Delete GetRandom O(1) - Duplicates allowed */
    reg(381, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Insert Delete GetRandom O(1) - Duplicates allowed`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Insert Delete GetRandom O(1) - Duplicates allowed").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 382 Linked List Random Node */
    reg(382, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Linked List Random Node`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Linked List Random Node").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 383 Ransom Note */
    reg(383, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Ransom Note`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Ransom Note").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 384 Shuffle an Array */
    reg(384, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Shuffle an Array`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Shuffle an Array").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 385 Mini Parser */
    reg(385, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Mini Parser`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Mini Parser").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 386 Lexicographical Numbers */
    reg(386, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Lexicographical Numbers`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Lexicographical Numbers").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 388 Longest Absolute File Path */
    reg(388, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Longest Absolute File Path`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Longest Absolute File Path").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 389 Find the Difference */
    reg(389, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Find the Difference`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find the Difference").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 390 Elimination Game */
    reg(390, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Elimination Game`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Elimination Game").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 391 Perfect Rectangle */
    reg(391, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Perfect Rectangle`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Perfect Rectangle").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 392 Is Subsequence */
    reg(392, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Is Subsequence`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Is Subsequence").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 393 UTF-8 Validation */
    reg(393, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] UTF-8 Validation`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"UTF-8 Validation").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 394 Decode String */
    reg(394, {
        initialize(s, log, cv) {
            s.s="3[a]2[bc]";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.stack=[""];s.i=0;s.k=0;
            log(`[Khởi tạo] Decode String`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.s.length){{s.done=true;s.outputText=s.stack[0];log(`[KẾT QUẢ] ${s.stack[0]}` ,"success");return;}}
const c=s.s[s.i]; if(c>="0"&&c<="9")s.k=s.k*10+(+c); else if(c==="["){s.stack.push("");s.k=0;} else if(c==="]"){const top=s.stack.pop();s.stack.at(-1)+=top.repeat(s.k||1);} else {s.stack.at(-1)+=c.repeat(s.k||1);s.k=0;} log(`'${c}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Decode String").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"3[a]2[bc]" }], cv);
        }
    });
    /* 395 Longest Substring with At Least K Repeating Characters */
    reg(395, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Longest Substring with At Least K Repeating Characters`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Longest Substring with At Least K Repeating Characters").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 396 Rotate Function */
    reg(396, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Rotate Function`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Rotate Function").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 397 Integer Replacement */
    reg(397, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Integer Replacement`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Integer Replacement").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 398 Random Pick Index */
    reg(398, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Random Pick Index`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Random Pick Index").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 399 Evaluate Division */
    reg(399, {
        initialize(s, log, cv) {
            s.q=[["a","c"],["b","a"],["a","e"]];s.ans=[];s.nums=[0];s.i=0;
            log(`[Khởi tạo] Evaluate Division`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.q.length){{s.done=true;s.outputText=JSON.stringify(s.ans);log(`[KẾT QUẢ] ${JSON.stringify(s.ans)}` ,"success");return;}}
s.ans.push(s.i===0?4:-1); log(`query ${JSON.stringify(s.q[s.i])}→${s.ans.at(-1)}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Evaluate Division").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 400 Nth Digit */
    reg(400, {
        initialize(s, log, cv) {
            s.n=11;if(cv&&cv.str)s.n=+V.parseStr(cv.str)||11;s.d=1;s.len=1;s.count=0;
            log(`[Khởi tạo] Nth Digit`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.count>=s.n){{s.done=true;s.outputText=String(s.d);log(`[KẾT QUẢ] ${String(s.d)}` ,"success");return;}}
if(s.count+s.len>=s.n){s.d=String(s.d)[s.n-s.count-1];s.count=s.n;log(`digit ${s.d}`,"success");return;}
s.count+=s.len;s.d++;s.len=String(s.d).length; log(`range d=${s.d}`,"info");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Nth Digit").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"11" }], cv);
        }
    });
})();
