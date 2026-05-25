/* LC #601–700 (catalog IDs in range) */
window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    const V = window.VizCore;
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

    /* 601 Human Traffic of Stadium */
    reg(601, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Human Traffic of Stadium`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Human Traffic of Stadium").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 602 Friend Requests II: Who Has the Most Friends */
    reg(602, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Friend Requests II: Who Has the Most Friends`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Friend Requests II: Who Has the Most Friends").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 605 Can Place Flowers */
    reg(605, {
        initialize(s, log, cv) {
            s.nums=[1,0,0,0,1];s.n=1;if(cv&&cv.str){const p=String(cv.str).split("|");s.nums=V.parseNums(p[0]);s.n=+(p[1]||1);}s.i=0;s.placed=0;
            log(`[Khởi tạo] Can Place Flowers`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=String(s.placed>=s.n);log(`[KẾT QUẢ] ${String(s.placed>=s.n)}` ,"success");return;}}
if(s.nums[s.i]===0&&(s.i===0||s.nums[s.i-1]===0)&&(!s.nums[s.i+1])&&s.placed<s.n){s.nums[s.i]=1;s.placed++;log(`plant @ ${s.i} placed=${s.placed}`,"success");} else log(`skip ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Can Place Flowers").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 606 Construct String from Binary Tree */
    reg(606, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Construct String from Binary Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Construct String from Binary Tree").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 607 Sales Person */
    reg(607, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Sales Person`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Sales Person").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 608 Tree Node */
    reg(608, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Tree Node`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Tree Node").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 609 Find Duplicate File in System */
    reg(609, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Find Duplicate File in System`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find Duplicate File in System").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 610 Triangle Judgement */
    reg(610, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Triangle Judgement`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Triangle Judgement").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 611 Valid Triangle Number */
    reg(611, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Valid Triangle Number`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Valid Triangle Number").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 617 Merge Two Binary Trees */
    reg(617, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Merge Two Binary Trees`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Merge Two Binary Trees").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 619 Biggest Single Number */
    reg(619, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Biggest Single Number`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Biggest Single Number").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 620 Not Boring Movies */
    reg(620, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Not Boring Movies`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Not Boring Movies").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 621 Task Scheduler */
    reg(621, {
        initialize(s, log, cv) {
            s.tasks="ABABAB".split("");if(cv&&cv.str){const p=String(cv.str).split("|");s.tasks=p[0].split("");s.n=+(p[1]||2);}else s.n=2;s.freq={};for(const c of s.tasks)s.freq[c]=(s.freq[c]||0)+1;s.maxF=Math.max(...Object.values(s.freq));s.idle=0;s.i=0;
            log(`[Khởi tạo] Task Scheduler`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.maxF){{s.done=true;s.outputText=String(s.tasks.length+(s.maxF-1)*s.n-(s.maxF-1));log(`[KẾT QUẢ] ${String(s.tasks.length+(s.maxF-1)*s.n-(s.maxF-1))}` ,"success");return;}}
log(`round ${s.i+1} maxFreq=${s.maxF} n=${s.n}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Task Scheduler").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 622 Design Circular Queue */
    reg(622, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Design Circular Queue`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Design Circular Queue").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 623 Add One Row to Tree */
    reg(623, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Add One Row to Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Add One Row to Tree").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 624 Maximum Distance in Arrays */
    reg(624, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Maximum Distance in Arrays`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Maximum Distance in Arrays").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 626 Exchange Seats */
    reg(626, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Exchange Seats`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Exchange Seats").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 627 Swap Sex of Employees */
    reg(627, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Swap Sex of Employees`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Swap Sex of Employees").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 628 Maximum Product of Three Numbers */
    reg(628, {
        initialize(s, log, cv) {
            s.nums=[1,2,3];V.applyNums(s,cv,"nums",s.nums);s.sorted=s.nums.slice().sort((a,b)=>a-b);s.done=false;
            log(`[Khởi tạo] Maximum Product of Three Numbers`, "info");
        },
        step(s, log) {
            if (s.done) return;
            {s.done=true;s.outputText=String(s.sorted[0]*s.sorted[1]*s.sorted[2]);log(`[KẾT QUẢ] ${String(s.sorted[0]*s.sorted[1]*s.sorted[2])}` ,"success");return;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Maximum Product of Three Numbers").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 629 K Inverse Pairs Array */
    reg(629, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] K Inverse Pairs Array`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"K Inverse Pairs Array").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 630 Course Schedule III */
    reg(630, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Course Schedule III`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Course Schedule III").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 632 Smallest Range Covering Elements from K Lists */
    reg(632, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Smallest Range Covering Elements from K Lists`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Smallest Range Covering Elements from K Lists").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 633 Sum of Square Numbers */
    reg(633, {
        initialize(s, log, cv) {
            s.c=5;s.lo=0;s.hi=Math.floor(Math.sqrt(s.c));if(cv&&cv.target!=null)s.c=+cv.target;else if(cv&&cv.str)s.c=+V.parseStr(cv.str)||5;s.found=false;
            log(`[Khởi tạo] Sum of Square Numbers`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.lo>s.hi){{s.done=true;s.outputText=String(s.found);log(`[KẾT QUẢ] ${String(s.found)}` ,"success");return;}}
const a=s.lo,b=s.hi-a; if(a*a+b*b===s.c){s.found=true;log(`found ${a}^2+${b}^2=${s.c}`,"success");} else log(`try a=${a}`,"info"); s.lo++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Sum of Square Numbers").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 636 Exclusive Time of Functions */
    reg(636, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Exclusive Time of Functions`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Exclusive Time of Functions").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 637 Average of Levels in Binary Tree */
    reg(637, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Average of Levels in Binary Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Average of Levels in Binary Tree").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 638 Shopping Offers */
    reg(638, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Shopping Offers`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Shopping Offers").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 639 Decode Ways II */
    reg(639, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Decode Ways II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Decode Ways II").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 640 Solve the Equation */
    reg(640, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Solve the Equation`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Solve the Equation").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 641 Design Circular Deque */
    reg(641, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Design Circular Deque`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Design Circular Deque").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 643 Maximum Average Subarray I */
    reg(643, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Maximum Average Subarray I`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Maximum Average Subarray I").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 645 Set Mismatch */
    reg(645, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Set Mismatch`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Set Mismatch").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 646 Maximum Length of Pair Chain */
    reg(646, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Maximum Length of Pair Chain`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Maximum Length of Pair Chain").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 647 Palindromic Substrings */
    reg(647, {
        initialize(s, log, cv) {
            s.s="abc";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.count=0;s.i=0;s.j=0;s.expand=(l,r)=>{while(l>=0&&r<s.s.length&&s.s[l]===s.s[r]){s.count++;l--;r++;}};
            log(`[Khởi tạo] Palindromic Substrings`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.s.length){{s.done=true;s.outputText=String(s.count);log(`[KẾT QUẢ] ${String(s.count)}` ,"success");return;}}
s.expand(s.i,s.i); s.expand(s.i,s.i+1); log(`center ${s.i} count=${s.count}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Palindromic Substrings").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abc" }], cv);
        }
    });
    /* 648 Replace Words */
    reg(648, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Replace Words`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Replace Words").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 649 Dota2 Senate */
    reg(649, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Dota2 Senate`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Dota2 Senate").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 650 2 Keys Keyboard */
    reg(650, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] 2 Keys Keyboard`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"2 Keys Keyboard").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 652 Find Duplicate Subtrees */
    reg(652, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Find Duplicate Subtrees`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find Duplicate Subtrees").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 653 Two Sum IV - Input is a BST */
    reg(653, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Two Sum IV - Input is a BST`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Two Sum IV - Input is a BST").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 654 Maximum Binary Tree */
    reg(654, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Maximum Binary Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Maximum Binary Tree").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 655 Print Binary Tree */
    reg(655, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Print Binary Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Print Binary Tree").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 657 Robot Return to Origin */
    reg(657, {
        initialize(s, log, cv) {
            s.moves="UD";if(cv&&cv.str)s.moves=V.parseStr(cv.str);s.x=0;s.y=0;s.i=0;
            log(`[Khởi tạo] Robot Return to Origin`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.moves.length){{s.done=true;s.outputText=String(s.x===0&&s.y===0);log(`[KẾT QUẢ] ${String(s.x===0&&s.y===0)}` ,"success");return;}}
const m=s.moves[s.i]; if(m==='U')s.y++; else if(m==='D')s.y--; else if(m==='L')s.x--; else if(m==='R')s.x++; log(`${m} → (${s.x},${s.y})`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Robot Return to Origin").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"UD" }], cv);
        }
    });
    /* 658 Find K Closest Elements */
    reg(658, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Find K Closest Elements`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find K Closest Elements").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 659 Split Array into Consecutive Subsequences */
    reg(659, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Split Array into Consecutive Subsequences`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Split Array into Consecutive Subsequences").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 661 Image Smoother */
    reg(661, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Image Smoother`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Image Smoother").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 662 Maximum Width of Binary Tree */
    reg(662, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Maximum Width of Binary Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Maximum Width of Binary Tree").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 664 Strange Printer */
    reg(664, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Strange Printer`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Strange Printer").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 665 Non-decreasing Array */
    reg(665, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Non-decreasing Array`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Non-decreasing Array").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 667 Beautiful Arrangement II */
    reg(667, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Beautiful Arrangement II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Beautiful Arrangement II").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 668 Kth Smallest Number in Multiplication Table */
    reg(668, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Kth Smallest Number in Multiplication Table`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Kth Smallest Number in Multiplication Table").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 669 Trim a Binary Search Tree */
    reg(669, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Trim a Binary Search Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Trim a Binary Search Tree").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 670 Maximum Swap */
    reg(670, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Maximum Swap`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Maximum Swap").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 671 Second Minimum Node In a Binary Tree */
    reg(671, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Second Minimum Node In a Binary Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Second Minimum Node In a Binary Tree").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 672 Bulb Switcher II */
    reg(672, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Bulb Switcher II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Bulb Switcher II").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 673 Number of Longest Increasing Subsequence */
    reg(673, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Number of Longest Increasing Subsequence`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Number of Longest Increasing Subsequence").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 674 Longest Continuous Increasing Subsequence */
    reg(674, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Longest Continuous Increasing Subsequence`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Longest Continuous Increasing Subsequence").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 675 Cut Off Trees for Golf Event */
    reg(675, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Cut Off Trees for Golf Event`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Cut Off Trees for Golf Event").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 676 Implement Magic Dictionary */
    reg(676, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Implement Magic Dictionary`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Implement Magic Dictionary").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 677 Map Sum Pairs */
    reg(677, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Map Sum Pairs`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Map Sum Pairs").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 678 Valid Parenthesis String */
    reg(678, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Valid Parenthesis String`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Valid Parenthesis String").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 679 24 Game */
    reg(679, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] 24 Game`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"24 Game").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 680 Valid Palindrome II */
    reg(680, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Valid Palindrome II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Valid Palindrome II").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 682 Baseball Game */
    reg(682, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Baseball Game`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Baseball Game").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 684 Redundant Connection */
    reg(684, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Redundant Connection`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Redundant Connection").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 685 Redundant Connection II */
    reg(685, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Redundant Connection II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Redundant Connection II").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 686 Repeated String Match */
    reg(686, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Repeated String Match`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Repeated String Match").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 687 Longest Univalue Path */
    reg(687, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Longest Univalue Path`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Longest Univalue Path").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 688 Knight Probability in Chessboard */
    reg(688, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Knight Probability in Chessboard`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Knight Probability in Chessboard").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 689 Maximum Sum of 3 Non-Overlapping Subarrays */
    reg(689, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Maximum Sum of 3 Non-Overlapping Subarrays`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Maximum Sum of 3 Non-Overlapping Subarrays").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 690 Employee Importance */
    reg(690, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Employee Importance`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Employee Importance").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 691 Stickers to Spell Word */
    reg(691, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Stickers to Spell Word`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Stickers to Spell Word").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 692 Top K Frequent Words */
    reg(692, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Top K Frequent Words`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Top K Frequent Words").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 693 Binary Number with Alternating Bits */
    reg(693, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Binary Number with Alternating Bits`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Binary Number with Alternating Bits").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 695 Max Area of Island */
    reg(695, {
        initialize(s, log, cv) {
            s.grid=[[0,0,1,0,0],[0,0,0,0,0],[0,1,1,1,0],[0,0,0,0,0],[0,0,0,1,0]];if(cv&&cv.str){const rows=String(cv.str).split("\\n");s.grid=rows.map(r=>r.split(",").map(Number));}s.visited=0;s.r=0;s.c=0;s.area=0;s.best=0;
            log(`[Khởi tạo] Max Area of Island`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length){{s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${String(s.best)}` ,"success");return;}}
if(s.grid[s.r][s.c]===1){s.area++;s.best=Math.max(s.best,s.area);log(`land @ (${s.r},${s.c}) area=${s.area}`,"info");} s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Max Area of Island").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"0,0,1,0,0\\n0,0,0,0,0\\n0,1,1,1,0\\n0,0,0,0,0\\n0,0,0,1,0" }], cv);
        }
    });
    /* 696 Count Binary Substrings */
    reg(696, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Count Binary Substrings`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Count Binary Substrings").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 697 Degree of an Array */
    reg(697, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Degree of an Array`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Degree of an Array").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 698 Partition to K Equal Sum Subsets */
    reg(698, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Partition to K Equal Sum Subsets`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Partition to K Equal Sum Subsets").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 699 Falling Squares */
    reg(699, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Falling Squares`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Falling Squares").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 700 Search in a Binary Search Tree */
    reg(700, {
        initialize(s, log, cv) {
            s.nums=[4,2,7,1,3];s.val=2;if(cv&&cv.str){const p=String(cv.str).split("|");s.nums=V.parseNums(p[0]);s.val=+(p[1]||2);}s.i=0;s.found=null;
            log(`[Khởi tạo] Search in a Binary Search Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=JSON.stringify(s.found);log(`[KẾT QUẢ] ${JSON.stringify(s.found)}` ,"success");return;}}
const v=s.nums[s.i]; if(v!==-1&&v!=null&&v===s.val){s.found=v;log(`found ${v} @ ${s.i}`,"success");} else if(v!==-1&&v!=null) log(`visit ${v}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Search in a Binary Search Tree").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
})();
