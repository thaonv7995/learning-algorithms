/* LC #701–800 */
window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    const V = window.VizCore;
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

    /* 701 Insert into a Binary Search Tree */
    reg(701, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Insert into a Binary Search Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Insert into a Binary Search Tree").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 703 Kth Largest Element in a Stream */
    reg(703, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Kth Largest Element in a Stream`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Kth Largest Element in a Stream").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 704 Binary Search */
    reg(704, {
        initialize(s, log, cv) {
            s.nums=[-1,0,3,5,9,12];s.target=9;V.applyNums(s,cv,"nums",s.nums);s.lo=0;s.hi=s.nums.length-1;
            log(`[Khởi tạo] Binary Search`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.lo>s.hi){{s.done=true;s.outputText=String(s.found??-1);log(`[KẾT QUẢ] ${String(s.found??-1)}` ,"success");return;}}
const mid=(s.lo+s.hi>>1); if(s.nums[mid]===s.target){s.found=mid; s.lo=s.hi+1;} else if(s.nums[mid]<s.target)s.lo=mid+1; else s.hi=mid-1; log(`lo=${s.lo} hi=${s.hi} mid=${mid}`,"info");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Binary Search").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 705 Design HashSet */
    reg(705, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Design HashSet`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Design HashSet").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 706 Design HashMap */
    reg(706, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Design HashMap`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Design HashMap").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 707 Design Linked List */
    reg(707, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Design Linked List`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Design Linked List").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 709 To Lower Case */
    reg(709, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] To Lower Case`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"To Lower Case").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 710 Random Pick with Blacklist */
    reg(710, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Random Pick with Blacklist`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Random Pick with Blacklist").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 712 Minimum ASCII Delete Sum for Two Strings */
    reg(712, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Minimum ASCII Delete Sum for Two Strings`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Minimum ASCII Delete Sum for Two Strings").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 713 Subarray Product Less Than K */
    reg(713, {
        initialize(s, log, cv) {
            s.nums=[10,5,2,6];s.k=100;V.applyNums(s,cv,"nums",s.nums);s.l=0;s.prod=1;s.count=0;
            log(`[Khởi tạo] Subarray Product Less Than K`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.l>=s.nums.length){{s.done=true;s.outputText=String(s.count);log(`[KẾT QUẢ] ${String(s.count)}` ,"success");return;}}
s.prod*=s.nums[s.l]; while(s.prod>=s.k&&s.l<s.nums.length){s.prod/=s.nums[s.l]; s.l++;} s.count+=s.nums.length-s.l; log(`l=${s.l} prod=${s.prod} count=${s.count}`,"info"); s.l++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Subarray Product Less Than K").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 714 Best Time to Buy and Sell Stock with Transaction Fee */
    reg(714, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Best Time to Buy and Sell Stock with Transaction Fee`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Best Time to Buy and Sell Stock with Transaction Fee").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 715 Range Module */
    reg(715, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Range Module`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Range Module").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 717 1-bit and 2-bit Characters */
    reg(717, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] 1-bit and 2-bit Characters`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"1-bit and 2-bit Characters").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 718 Maximum Length of Repeated Subarray */
    reg(718, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Maximum Length of Repeated Subarray`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Maximum Length of Repeated Subarray").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 719 Find K-th Smallest Pair Distance */
    reg(719, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Find K-th Smallest Pair Distance`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find K-th Smallest Pair Distance").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 720 Longest Word in Dictionary */
    reg(720, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Longest Word in Dictionary`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Longest Word in Dictionary").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 721 Accounts Merge */
    reg(721, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Accounts Merge`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Accounts Merge").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 722 Remove Comments */
    reg(722, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Remove Comments`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Remove Comments").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 724 Find Pivot Index */
    reg(724, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Find Pivot Index`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find Pivot Index").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 725 Split Linked List in Parts */
    reg(725, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Split Linked List in Parts`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Split Linked List in Parts").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 726 Number of Atoms */
    reg(726, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Number of Atoms`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Number of Atoms").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 728 Self Dividing Numbers */
    reg(728, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Self Dividing Numbers`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Self Dividing Numbers").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 729 My Calendar I */
    reg(729, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] My Calendar I`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"My Calendar I").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 730 Count Different Palindromic Subsequences */
    reg(730, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Count Different Palindromic Subsequences`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Count Different Palindromic Subsequences").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 731 My Calendar II */
    reg(731, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] My Calendar II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"My Calendar II").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 732 My Calendar III */
    reg(732, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] My Calendar III`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"My Calendar III").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 733 Flood Fill */
    reg(733, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Flood Fill`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Flood Fill").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 735 Asteroid Collision */
    reg(735, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Asteroid Collision`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Asteroid Collision").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 736 Parse Lisp Expression */
    reg(736, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Parse Lisp Expression`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Parse Lisp Expression").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 738 Monotone Increasing Digits */
    reg(738, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Monotone Increasing Digits`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Monotone Increasing Digits").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 740 Delete and Earn */
    reg(740, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Delete and Earn`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Delete and Earn").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 741 Cherry Pickup */
    reg(741, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Cherry Pickup`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Cherry Pickup").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 743 Network Delay Time */
    reg(743, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Network Delay Time`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Network Delay Time").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 744 Find Smallest Letter Greater Than Target */
    reg(744, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Find Smallest Letter Greater Than Target`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find Smallest Letter Greater Than Target").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 745 Prefix and Suffix Search */
    reg(745, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Prefix and Suffix Search`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Prefix and Suffix Search").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 746 Min Cost Climbing Stairs */
    reg(746, {
        initialize(s, log, cv) {
            s.nums=[10,15,20];V.applyNums(s,cv,"nums",s.nums);s.dp0=0;s.dp1=0;s.i=0;
            log(`[Khởi tạo] Min Cost Climbing Stairs`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=String(Math.min(s.dp0,s.dp1));log(`[KẾT QUẢ] ${String(Math.min(s.dp0,s.dp1))}` ,"success");return;}}
const n=s.dp1;s.dp1=Math.min(s.dp0,s.dp1)+s.nums[s.i]; s.dp0=n; log(`i=${s.i} dp0=${s.dp0} dp1=${s.dp1}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Min Cost Climbing Stairs").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 747 Largest Number At Least Twice of Others */
    reg(747, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Largest Number At Least Twice of Others`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Largest Number At Least Twice of Others").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 748 Shortest Completing Word */
    reg(748, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Shortest Completing Word`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Shortest Completing Word").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 749 Contain Virus */
    reg(749, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Contain Virus`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Contain Virus").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 752 Open the Lock */
    reg(752, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Open the Lock`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Open the Lock").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 753 Cracking the Safe */
    reg(753, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Cracking the Safe`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Cracking the Safe").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 754 Reach a Number */
    reg(754, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Reach a Number`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Reach a Number").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 756 Pyramid Transition Matrix */
    reg(756, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Pyramid Transition Matrix`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Pyramid Transition Matrix").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 757 Set Intersection Size At Least Two */
    reg(757, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Set Intersection Size At Least Two`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Set Intersection Size At Least Two").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 761 Special Binary String */
    reg(761, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Special Binary String`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Special Binary String").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 762 Prime Number of Set Bits in Binary Representation */
    reg(762, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Prime Number of Set Bits in Binary Representation`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Prime Number of Set Bits in Binary Representation").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 763 Partition Labels */
    reg(763, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Partition Labels`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Partition Labels").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 764 Largest Plus Sign */
    reg(764, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Largest Plus Sign`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Largest Plus Sign").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 765 Couples Holding Hands */
    reg(765, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Couples Holding Hands`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Couples Holding Hands").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 766 Toeplitz Matrix */
    reg(766, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Toeplitz Matrix`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Toeplitz Matrix").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 767 Reorganize String */
    reg(767, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Reorganize String`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Reorganize String").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 768 Max Chunks To Make Sorted II */
    reg(768, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Max Chunks To Make Sorted II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Max Chunks To Make Sorted II").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 769 Max Chunks To Make Sorted */
    reg(769, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Max Chunks To Make Sorted`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Max Chunks To Make Sorted").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 770 Basic Calculator IV */
    reg(770, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Basic Calculator IV`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Basic Calculator IV").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 771 Jewels and Stones */
    reg(771, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Jewels and Stones`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Jewels and Stones").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 773 Sliding Puzzle */
    reg(773, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Sliding Puzzle`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Sliding Puzzle").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 775 Global and Local Inversions */
    reg(775, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Global and Local Inversions`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Global and Local Inversions").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 777 Swap Adjacent in LR String */
    reg(777, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Swap Adjacent in LR String`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Swap Adjacent in LR String").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 778 Swim in Rising Water */
    reg(778, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Swim in Rising Water`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Swim in Rising Water").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 779 K-th Symbol in Grammar */
    reg(779, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] K-th Symbol in Grammar`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"K-th Symbol in Grammar").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 780 Reaching Points */
    reg(780, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Reaching Points`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Reaching Points").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 781 Rabbits in Forest */
    reg(781, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Rabbits in Forest`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Rabbits in Forest").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 782 Transform to Chessboard */
    reg(782, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Transform to Chessboard`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Transform to Chessboard").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 783 Minimum Distance Between BST Nodes */
    reg(783, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,-1,-1,15,7];V.applyNums(s,cv,"nums",s.nums);s.visit=[];s.i=0;
            log(`[Khởi tạo] Minimum Distance Between BST Nodes`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=JSON.stringify(s.visit);log(`[KẾT QUẢ] ${JSON.stringify(s.visit)}` ,"success");return;}
const v=s.nums[s.i]; if(v!==-1&&v!=null){s.visit.push(v);log(`Thăm ${v}`,"info");} else log(`null @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Minimum Distance Between BST Nodes").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 784 Letter Case Permutation */
    reg(784, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Letter Case Permutation`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Letter Case Permutation").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 785 Is Graph Bipartite? */
    reg(785, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Is Graph Bipartite?`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Is Graph Bipartite?").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 786 K-th Smallest Prime Fraction */
    reg(786, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] K-th Smallest Prime Fraction`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"K-th Smallest Prime Fraction").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 787 Cheapest Flights Within K Stops */
    reg(787, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Cheapest Flights Within K Stops`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Cheapest Flights Within K Stops").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 788 Rotated Digits */
    reg(788, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Rotated Digits`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Rotated Digits").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 789 Escape The Ghosts */
    reg(789, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Escape The Ghosts`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Escape The Ghosts").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 790 Domino and Tromino Tiling */
    reg(790, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Domino and Tromino Tiling`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Domino and Tromino Tiling").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 791 Custom Sort String */
    reg(791, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Custom Sort String`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Custom Sort String").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 792 Number of Matching Subsequences */
    reg(792, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Number of Matching Subsequences`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Number of Matching Subsequences").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 793 Preimage Size of Factorial Zeroes Function */
    reg(793, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Preimage Size of Factorial Zeroes Function`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Preimage Size of Factorial Zeroes Function").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 794 Valid Tic-Tac-Toe State */
    reg(794, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;
            log(`[Khởi tạo] Valid Tic-Tac-Toe State`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length) {s.done=true;s.outputText="scanned";log(`[KẾT QUẢ] ${"scanned"}` ,"success");return;}
log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Valid Tic-Tac-Toe State").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 795 Number of Subarrays with Bounded Maximum */
    reg(795, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Number of Subarrays with Bounded Maximum`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Number of Subarrays with Bounded Maximum").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 796 Rotate String */
    reg(796, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] Rotate String`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Rotate String").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 797 All Paths From Source to Target */
    reg(797, {
        initialize(s, log, cv) {
            s.s="abcabcbb";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.str=s.s;s.i=0;
            log(`[Khởi tạo] All Paths From Source to Target`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=(s.str||s.s).length) {s.done=true;s.outputText=String((s.str||s.s).length);log(`[KẾT QUẢ] ${"(len)="+(s.str||s.s).length}` ,"success");return;}
log(`s[${s.i}]='${(s.str||s.s)[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"All Paths From Source to Target").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abcabcbb" }], cv);
        }
    });
    /* 798 Smallest Rotation with Highest Score */
    reg(798, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Smallest Rotation with Highest Score`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Smallest Rotation with Highest Score").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
    /* 799 Champagne Tower */
    reg(799, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4,5];V.applyNums(s,cv,"nums",s.nums);s.i=0;s.best=0;
            log(`[Khởi tạo] Champagne Tower`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length) {s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${"best="+s.best}` ,"success");return;}
s.best=Math.max(s.best,s.nums[s.i]); log(`i=${s.i} val=${s.nums[s.i]} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Champagne Tower").appendChild(V.arrayRow(s.nums||s.prices||s.a||[],{active:s.done?-1:(s.i??0),pointers:s.done?[]:[{idx:s.i??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.prices||s.a||[]) }], cv);
        }
    });
})();
