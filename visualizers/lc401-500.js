/* LC #401–500 (catalog IDs in range) */
window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    const V = window.VizCore;
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

    /* 401 Binary Watch */
    reg(401, {
        initialize(s, log, cv) {
            s.turnedOn=1;s.hours=0;s.mins=0;s.cands=[];if(cv&&cv.str){const p=String(cv.str).split(",");s.turnedOn=+(p[0]||1);}
            log(`[Khởi tạo] Binary Watch`, "info");
        },
        step(s, log) {
            if (s.done) return;
            const h=Math.floor(s.turnedOn/60),m=s.turnedOn%60; if(s.hours<=h&&s.mins<=m){const bits=(h.toString(2)+m.toString(2).padStart(6,'0')).split('').filter(c=>c==='1').length; if(bits<=s.turnedOn)s.cands.push(String(h).padStart(2,'0')+':'+String(m).padStart(2,'0'));} log(`try ${String(s.hours).padStart(2,'0')}:${String(s.mins).padStart(2,'0')}`,"info"); s.mins++; if(s.mins>59){s.mins=0;s.hours++;} if(s.hours>11){{s.done=true;s.outputText=JSON.stringify(s.cands);log(`[KẾT QUẢ] ${JSON.stringify(s.cands)}` ,"success");return;}}
        },
        render(s, c, st) {
            V.statsBar(st, [{label:"bits",value:s.turnedOn,cls:"accent"},{label:"found",value:s.cands.length,cls:"success"}]);
            const stage = V.stage();
            V.section(stage,1,"Binary Watch").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1" }], cv);
        }
    });
    /* 402 Remove K Digits */
    reg(402, {
        initialize(s, log, cv) {
            s.s="1432219";s.k=3;if(cv&&cv.str){const p=String(cv.str).split("|");s.s=p[0]||s.s;s.k=+(p[1]||3);}s.stk=[];s.i=0;
            log(`[Khởi tạo] Remove K Digits`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.s.length){{s.done=true;s.outputText=s.stk.join("");log(`[KẾT QUẢ] ${s.stk.join("")}` ,"success");return;}}
while(s.stk.length&&s.k>0&&s.stk.at(-1)>s.s[s.i]){s.stk.pop();s.k--;log(`pop stack`,"warn");}
s.stk.push(s.s[s.i]); log(`push '${s.s[s.i]}' stk=[${s.stk.join('')}']`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Remove K Digits").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1432219|3" }], cv);
        }
    });
    /* 403 Frog Jump */
    reg(403, {
        initialize(s, log, cv) {
            s.stones=[0,1,3,5,6,8,12,17];V.applyNums(s,cv,"stones",s.stones);s.dp={0:new Set([1])};s.i=1;
            log(`[Khởi tạo] Frog Jump`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.stones.length){const last=s.stones.at(-1),prev=s.stones.at(-2),ok=!!(s.dp[last]&&s.dp[last].has(last-prev));{s.done=true;s.outputText=String(ok);log(`[KẾT QUẢ] ${ok}` ,"success");return;}}
const pos=s.stones[s.i]; s.dp[pos]=new Set(); for(const k of s.dp[s.stones[s.i-1]]||[]) if(k-1>0&&(s.dp[pos-k-1]||new Set()).size) s.dp[pos].add(k); log(`stone ${pos} reachable=${[...(s.dp[pos]||[])].join(',')}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Frog Jump").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 404 Sum of Left Leaves */
    reg(404, {
        initialize(s, log, cv) {
            s.nums=[3,9,20,null,null,15,7];V.applyNums(s,cv,"nums",s.nums);s.sum=0;s.i=0;s.leftChild=i=>2*i+1;
            log(`[Khởi tạo] Sum of Left Leaves`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=String(s.sum);log(`[KẾT QUẢ] ${s.sum}` ,"success");return;}}
const lc=s.leftChild(s.i); if(lc<s.nums.length&&s.nums[lc]!=null&&s.nums[lc]!==-1){s.sum+=s.nums[lc];log(`left leaf ${s.nums[lc]} sum=${s.sum}`,"info");} else log(`node ${s.nums[s.i]}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Sum of Left Leaves").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 405 Convert a Number to Hexadecimal */
    reg(405, {
        initialize(s, log, cv) {
            s.n=26;if(cv&&cv.target!=null&&cv.target!=="")s.n=+cv.target;else if(cv&&cv.str)s.n=+V.parseStr(cv.str)||26;s.hex="";
            log(`[Khởi tạo] Convert a Number to Hexadecimal`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.n===0){{s.done=true;s.outputText="0";log(`[KẾT QUẢ] ${"0"}` ,"success");return;}}
const d=s.n%16; s.hex=((d<10?String(d):String.fromCharCode(87+d))+s.hex).toLowerCase(); s.n=(s.n/16)|0; log(`digit ${d} hex=${s.hex}`,"info"); if(s.n===0){{s.done=true;s.outputText=s.hex;log(`[KẾT QUẢ] ${s.hex}` ,"success");return;}}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Convert a Number to Hexadecimal").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"target", id:"lc-input-target", label:"n", value:cv.target??s.n??26 }], cv);
        }
    });
    /* 406 Queue Reconstruction by Height */
    reg(406, {
        initialize(s, log, cv) {
            s.people=[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]];if(cv&&cv.str)s.people=String(cv.str).split(";").map(r=>r.split(",").map(Number));s.sorted=s.people.slice().sort((a,b)=>b[0]-a[0]||a[1]-b[1]);s.res=[];s.i=0;
            log(`[Khởi tạo] Queue Reconstruction by Height`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.sorted.length){{s.done=true;s.outputText=JSON.stringify(s.res);log(`[KẾT QUẢ] ${JSON.stringify(s.res)}` ,"success");return;}}
const [h,k]=s.sorted[s.i]; s.res.splice(k,0,[h,k]); log(`insert [${h},${k}] at ${k}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Queue Reconstruction by Height").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 407 Trapping Rain Water II */
    reg(407, {
        initialize(s, log, cv) {
            s.grid=[[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]];if(cv&&cv.str){const rows=String(cv.str).split("\\n");s.grid=rows.map(r=>r.split(",").map(Number));}s.heap=[];s.water=0;s.phase=0;
            log(`[Khởi tạo] Trapping Rain Water II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.phase===0){for(let r=0;r<s.grid.length;r++)for(let c=0;c<s.grid[0].length;c++)if(!r||!c||r===s.grid.length-1||c===s.grid[0].length-1)s.heap.push([s.grid[r][c],r,c]); log(`Border cells ${s.heap.length}`,"info"); s.phase=1; return;}
{s.done=true;s.outputText=String(s.water);log(`[KẾT QUẢ] ${s.water}` ,"success");return;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Trapping Rain Water II").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,4,3,1,3,2\\n3,2,1,3,2,4\\n2,3,3,2,3,1" }], cv);
        }
    });
    /* 409 Longest Palindrome */
    reg(409, {
        initialize(s, log, cv) {
            s.s="abccccdd";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.freq={};for(const c of s.s)s.freq[c]=(s.freq[c]||0)+1;s.keys=Object.keys(s.freq);s.i=0;s.len=0;
            log(`[Khởi tạo] Longest Palindrome`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.keys.length){{s.done=true;s.outputText=String(s.len);log(`[KẾT QUẢ] ${s.len}` ,"success");return;}}
const k=s.keys[s.i]; s.len+=Math.floor(s.freq[k]/2)*2; log(`'${k}'×${s.freq[k]} → +${Math.floor(s.freq[k]/2)*2}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Longest Palindrome").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abccccdd" }], cv);
        }
    });
    /* 410 Split Array Largest Sum */
    reg(410, {
        initialize(s, log, cv) {
            s.nums=[7,2,5,10,8];s.m=2;if(cv&&cv.str){const p=String(cv.str).split("|");s.nums=V.parseNums(p[0]);s.m=+(p[1]||2);}s.lo=Math.max(...s.nums);s.hi=s.nums.reduce((a,b)=>a+b,0);s.mid=0;
            log(`[Khởi tạo] Split Array Largest Sum`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.lo>s.hi){{s.done=true;s.outputText=String(s.lo);log(`[KẾT QUẢ] ${s.lo}` ,"success");return;}}
s.mid=(s.lo+s.hi)>>1; let parts=1,cur=0,ok=true; for(const x of s.nums){if(cur+x>s.mid){parts++;cur=x;if(parts>s.m)ok=false;}else cur+=x;} log(`mid=${s.mid} parts=${parts} ok=${ok}`,"info"); if(ok)s.hi=s.mid-1; else s.lo=s.mid+1;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Split Array Largest Sum").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 412 Fizz Buzz */
    reg(412, {
        initialize(s, log, cv) {
            s.n=15;s.i=1;if(cv&&cv.target!=null)s.n=+cv.target;else if(cv&&cv.str)s.n=+V.parseStr(cv.str)||15;s.out=[];
            log(`[Khởi tạo] Fizz Buzz`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>s.n){{s.done=true;s.outputText=s.out.join(",");log(`[KẾT QUẢ] ${s.out.join(",")}` ,"success");return;}}
let t=""; if(s.i%3===0)t+="Fizz"; if(s.i%5===0)t+="Buzz"; if(!t)t=String(s.i); s.out.push(t); log(`${s.i}→${t}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Fizz Buzz").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"target", id:"lc-input-target", label:"n", value:cv.target??15 }], cv);
        }
    });
    /* 413 Arithmetic Slices */
    reg(413, {
        initialize(s, log, cv) {
            s.nums=[1,2,3,4];V.applyNums(s,cv,"nums",s.nums);s.count=0;s.i=2;
            log(`[Khởi tạo] Arithmetic Slices`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=String(s.count);log(`[KẾT QUẢ] ${s.count}` ,"success");return;}}
if(s.nums[s.i]-s.nums[s.i-1]===1&&s.nums[s.i-1]-s.nums[s.i-2]===1){s.count++;log(`slice ending @ ${s.i} count=${s.count}`,"success");} else log(`no slice @ ${s.i}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Arithmetic Slices").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 414 Third Maximum Number */
    reg(414, {
        initialize(s, log, cv) {
            s.nums=[2,2,3,1];V.applyNums(s,cv,"nums",s.nums);s.a=-Infinity;s.b=-Infinity;s.c=-Infinity;s.i=0;
            log(`[Khởi tạo] Third Maximum Number`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=String(s.c===-Infinity?s.b:s.c);log(`[KẾT QUẢ] ${s.c===-Infinity?s.b:s.c}` ,"success");return;}}
const x=s.nums[s.i]; if(x>s.a){s.c=s.b;s.b=s.a;s.a=x;} else if(x>s.b&&x!==s.a){s.c=s.b;s.b=x;} else if(x>s.c&&x!==s.a&&x!==s.b)s.c=x; log(`x=${x} top=[${s.a},${s.b},${s.c}]`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Third Maximum Number").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 415 Add Strings */
    reg(415, {
        initialize(s, log, cv) {
            s.a="11";s.b="123";if(cv&&cv.str){const p=String(cv.str).split("|");s.a=p[0]||s.a;s.b=p[1]||s.b;}s.i=s.a.length-1;s.j=s.b.length-1;s.carry=0;s.out="";
            log(`[Khởi tạo] Add Strings`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i<0&&s.j<0&&s.carry===0){{s.done=true;s.outputText=s.out.split('').reverse().join('');log(`[KẾT QUẢ] ${s.out.split('').reverse().join('')}` ,"success");return;}}
const da=s.i>=0?+s.a[s.i]:0, db=s.j>=0?+s.b[s.j]:0, sum=da+db+s.carry; s.out+=String(sum%10); s.carry=(sum/10)|0; log(`${da}+${db}+carry → ${sum%10}`,"info"); if(s.i>=0)s.i--; if(s.j>=0)s.j--;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Add Strings").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"11|123" }], cv);
        }
    });
    /* 416 Partition Equal Subset Sum */
    reg(416, {
        initialize(s, log, cv) {
            s.nums=[1,5,11,5];V.applyNums(s,cv,"nums",s.nums);s.sum=s.nums.reduce((a,b)=>a+b,0);s.half=(s.sum/2)|0;s.dp=Array(s.half+1).fill(false);s.dp[0]=true;s.i=0;
            log(`[Khởi tạo] Partition Equal Subset Sum`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=String(s.dp[s.half]);log(`[KẾT QUẢ] ${s.dp[s.half]}` ,"success");return;}}
const x=s.nums[s.i]; for(let j=s.half;j>=x;j--) if(s.dp[j-x]) s.dp[j]=true; log(`use ${x} dp[${s.half}]=${s.dp[s.half]}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Partition Equal Subset Sum").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 417 Pacific Atlantic Water Flow */
    reg(417, {
        initialize(s, log, cv) {
            s.grid=[[1,2,2,2,2],[1,1,1,1,2],[1,1,1,1,2],[1,1,1,1,2],[1,1,1,1,2]];s.r=0;s.c=0;s.pac=new Set();s.atl=new Set();s.phase=0;
            log(`[Khởi tạo] Pacific Atlantic Water Flow`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.phase===0){for(let c=0;c<s.grid[0].length;c++){s.pac.add(`0,${c}`);s.atl.add(`${s.grid.length-1},${c}`);} s.phase=1; log(`Seed Pacific/Atlantic borders`,"info"); return;}
if(s.r>=s.grid.length){{s.done=true;s.outputText=String([...s.pac].filter(x=>s.atl.has(x)).length);log(`[KẾT QUẢ] ${String([...s.pac].filter(x=>s.atl.has(x)).length)}` ,"success");return;}}
s.pac.add(`${s.r},${s.c}`); log(`BFS (${s.r},${s.c})`,"info"); s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Pacific Atlantic Water Flow").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,2,2,2\\n1,1,1,1,2\\n1,1,1,1,2\\n1,1,1,1,2\\n1,1,1,1,2" }], cv);
        }
    });
    /* 419 Battleships in a Board */
    reg(419, {
        initialize(s, log, cv) {
            s.grid=[["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]];if(cv&&cv.str){s.grid=String(cv.str).split("\\n").map(r=>r.split(","));}s.count=0;s.r=0;s.c=0;
            log(`[Khởi tạo] Battleships in a Board`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length){{s.done=true;s.outputText=String(s.count);log(`[KẾT QUẢ] ${s.count}` ,"success");return;}}
if(s.grid[s.r][s.c]==='X'&&( !s.r||s.grid[s.r-1][s.c]!== 'X')&&(!s.c||s.grid[s.r][s.c-1]!=='X')){s.count++;log(`Battleship @ (${s.r},${s.c})`,"success");} s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Battleships in a Board").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"X,.,.,X\\n.,.,.,X\\n.,.,.,X" }], cv);
        }
    });
    /* 420 Strong Password Checker */
    reg(420, {
        initialize(s, log, cv) {
            s.s="aA1";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.missing=3;s.repeats=0;s.i=0;
            log(`[Khởi tạo] Strong Password Checker`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.s.length){{s.done=true;s.outputText=String(Math.max(0,3-(s.s.length>=6?0:6-s.s.length)-Math.max(0,3-( /[a-z]/.test(s.s)&&/[A-Z]/.test(s.s)&&/\d/.test(s.s)?3:0))));log(`[KẾT QUẢ] ${String(Math.max(0,3-(s.s.length>=6?0:6-s.s.length)-Math.max(0,3-( /[a-z]/.test(s.s)&&/[A-Z]/.test(s.s)&&/\d/.test(s.s)?3:0))))}` ,"success");return;}}
log(`scan '${s.s[s.i]}'`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Strong Password Checker").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"aA1" }], cv);
        }
    });
    /* 421 Maximum XOR of Two Numbers in an Array */
    reg(421, {
        initialize(s, log, cv) {
            s.nums=[3,10,5,25,2,8];V.applyNums(s,cv,"nums",s.nums);s.mask=0;s.best=0;s.i=0;
            log(`[Khởi tạo] Maximum XOR of Two Numbers in an Array`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${s.best}` ,"success");return;}}
const x=s.nums[s.i]; s.best=Math.max(s.best,s.mask^x); s.mask|=x; log(`x=${x} mask=${s.mask.toString(2)} best=${s.best}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Maximum XOR of Two Numbers in an Array").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 423 Reconstruct Original Digits from English */
    reg(423, {
        initialize(s, log, cv) {
            s.s="owoztneoer";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.order=[0,2,4,6,8,1,3,5,7,9];s.digits=["zero","two","four","six","eight","one","three","five","seven","nine"];s.i=0;s.out=[];
            log(`[Khởi tạo] Reconstruct Original Digits from English`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.order.length){{s.done=true;s.outputText=s.out.join("");log(`[KẾT QUẢ] ${s.out.join("")}` ,"success");return;}}
const d=s.order[s.i], w=s.digits[s.i]; let cnt=0; for(const c of w) cnt=Math.min(cnt||Infinity,(s.s.match(new RegExp(c,'g'))||[]).length/(w.match(new RegExp(c,'g'))||[]).length); cnt=cnt||0; for(let k=0;k<cnt;k++)s.out.push(d); log(`${w}×${cnt}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Reconstruct Original Digits from English").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"owoztneoer" }], cv);
        }
    });
    /* 424 Longest Repeating Character Replacement */
    reg(424, {
        initialize(s, log, cv) {
            s.s="ABAB";s.k=2;if(cv&&cv.str){const p=String(cv.str).split("|");s.s=p[0]||s.s;s.k=+(p[1]||2);}s.l=0;s.r=0;s.freq={};s.best=0;
            log(`[Khởi tạo] Longest Repeating Character Replacement`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.l>=s.s.length){{s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${s.best}` ,"success");return;}}
s.freq[s.s[s.l]]=(s.freq[s.s[s.l]]||0)+1; while(Object.keys(s.freq).length>s.k+1){s.freq[s.s[s.r]]--; if(!s.freq[s.s[s.r]])delete s.freq[s.s[s.r]]; s.r++;} s.best=Math.max(s.best,s.l-s.r+1); log(`[${s.r},${s.l}] len=${s.l-s.r+1}`,"info"); s.l++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Longest Repeating Character Replacement").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"ABAB|2" }], cv);
        }
    });
    /* 427 Construct Quad Tree */
    reg(427, {
        initialize(s, log, cv) {
            s.grid=[[0,1],[1,0]];s.r=0;s.c=0;s.quad=[];s.phase=0;
            log(`[Khởi tạo] Construct Quad Tree`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.phase===0){log(`Check uniform 2×2`,"info"); s.phase=1; return;}
{s.done=true;s.outputText="QuadTree built";log(`[KẾT QUẢ] ${"QuadTree built"}` ,"success");return;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Construct Quad Tree").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"0,1\\n1,0" }], cv);
        }
    });
    /* 429 N-ary Tree Level Order Traversal */
    reg(429, {
        initialize(s, log, cv) {
            s.tree=[1,null,3,2,4,null,5,6,null,null,null,7];V.applyNums(s,cv,"nums",s.tree);s.levels=[];s.q=[0];s.i=0;
            log(`[Khởi tạo] N-ary Tree Level Order Traversal`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(!s.q.length){{s.done=true;s.outputText=JSON.stringify(s.levels);log(`[KẾT QUẢ] ${JSON.stringify(s.levels)}` ,"success");return;}}
const lvl=[]; const nq=[]; for(const idx of s.q){ if(s.tree[idx]!=null&&s.tree[idx]!==-1){lvl.push(s.tree[idx]); const lc=2*idx+1,rc=2*idx+2; if(lc<s.tree.length&&s.tree[lc]!=null&&s.tree[lc]!==-1)nq.push(lc); if(rc<s.tree.length&&s.tree[rc]!=null&&s.tree[rc]!==-1)nq.push(rc);} } s.levels.push(lvl); s.q=nq; log(`Level ${s.levels.length}: [${lvl.join(',')}]`,"info");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"N-ary Tree Level Order Traversal").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 430 Flatten a Multilevel Doubly Linked List */
    reg(430, {
        initialize(s, log, cv) {
            s.nodes=[1,2,3,4,5,6,null,null,7,8,9,10,null,null,11];s.flat=[];s.i=0;
            log(`[Khởi tạo] Flatten a Multilevel Doubly Linked List`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nodes.length){{s.done=true;s.outputText=s.flat.join('→');log(`[KẾT QUẢ] ${s.flat.join('→')}` ,"success");return;}}
if(s.nodes[s.i]!=null)s.flat.push(s.nodes[s.i]); log(`visit ${s.nodes[s.i]}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Flatten a Multilevel Doubly Linked List").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3,4,5,6,7,8,9,10,11" }], cv);
        }
    });
    /* 432 All O`one Data Structure */
    reg(432, {
        initialize(s, log, cv) {
            s.ops=["inc","hello","inc","leet","get","get","get"];if(cv&&cv.str)s.ops=String(cv.str).split(",");s.buckets={};s.i=0;s.out=[];
            log(`[Khởi tạo] All O\`one Data Structure`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.ops.length){{s.done=true;s.outputText=s.out.join(",");log(`[KẾT QUẢ] ${s.out.join(",")}` ,"success");return;}}
const op=s.ops[s.i]; if(op==='inc'){const w=s.ops[++s.i]; s.buckets[w]=(s.buckets[w]||0)+1; log(`inc ${w}→${s.buckets[w]}`,"info");} else if(op==='get'){const w=s.ops[++s.i]; const c=s.buckets[w]||0; s.out.push(c); log(`get ${w}=${c}`,"success");} s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"All O\`one Data Structure").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"inc,hello,inc,leet,get,hello,get,leet,get,foo" }], cv);
        }
    });
    /* 433 Minimum Genetic Mutation */
    reg(433, {
        initialize(s, log, cv) {
            s.start="AACCGGTT";s.end="AACCGGTA";s.bank=["AACCGGTA","AACCGCTA"];if(cv&&cv.str){const p=String(cv.str).split("|");s.start=p[0];s.end=p[1];if(p[2])s.bank=p[2].split(",");}s.q=[s.start];s.seen=new Set([s.start]);s.steps=0;
            log(`[Khởi tạo] Minimum Genetic Mutation`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(!s.q.length){{s.done=true;s.outputText="-1";log(`[KẾT QUẢ] ${"-1"}` ,"success");return;}}
const cur=s.q.shift(); if(cur===s.end){{s.done=true;s.outputText=String(s.steps);log(`[KẾT QUẢ] ${s.steps}` ,"success");return;}}
for(let i=0;i<cur.length;i++)for(const ch of 'ACGT'){if(ch===cur[i])continue; const nxt=cur.slice(0,i)+ch+cur.slice(i+1); if(s.bank.includes(nxt)&&!s.seen.has(nxt)){s.seen.add(nxt);s.q.push(nxt);log(`${cur}→${nxt}`,"info");}} s.steps++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Minimum Genetic Mutation").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"AACCGGTT|AACCGGTA|AACCGGTA,AACCGCTA" }], cv);
        }
    });
    /* 434 Number of Segments in a String */
    reg(434, {
        initialize(s, log, cv) {
            s.s="Hello, my name is John";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.segs=0;s.i=0;s.inWord=false;
            log(`[Khởi tạo] Number of Segments in a String`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.s.length){{s.done=true;s.outputText=String(s.segs);log(`[KẾT QUẢ] ${s.segs}` ,"success");return;}}
const sp=/\S/.test(s.s[s.i]); if(sp&&!s.inWord){s.segs++;s.inWord=true;log(`segment ${s.segs}`,"success");} if(!sp)s.inWord=false; s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Number of Segments in a String").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"Hello, my name is John" }], cv);
        }
    });
    /* 435 Non-overlapping Intervals */
    reg(435, {
        initialize(s, log, cv) {
            s.iv=[[1,2],[2,3],[3,4],[1,3]];if(cv&&cv.str)s.iv=String(cv.str).split(";").map(r=>r.split(",").map(Number));s.sorted=s.iv.slice().sort((a,b)=>a[1]-b[1]);s.end=-Infinity;s.count=0;s.i=0;
            log(`[Khởi tạo] Non-overlapping Intervals`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.sorted.length){{s.done=true;s.outputText=String(s.count);log(`[KẾT QUẢ] ${s.count}` ,"success");return;}}
const [a,b]=s.sorted[s.i]; if(a>=s.end){s.count++;s.end=b;log(`keep [${a},${b}]`,"success");} else log(`skip overlap [${a},${b}]`,"warn"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Non-overlapping Intervals").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 436 Find Right Interval */
    reg(436, {
        initialize(s, log, cv) {
            s.iv=[[3,4],[2,3],[1,4]];if(cv&&cv.str)s.iv=String(cv.str).split(";").map(r=>r.split(",").map(Number));s.starts=s.iv.map((x,i)=>[x[0],i]).sort((a,b)=>a[0]-b[0]);s.q=[[2,3],[1,4]];s.ans=[];s.i=0;
            log(`[Khởi tạo] Find Right Interval`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.q.length){{s.done=true;s.outputText=JSON.stringify(s.ans);log(`[KẾT QUẢ] ${JSON.stringify(s.ans)}` ,"success");return;}}
const target=s.q[s.i][0]; let j=-1; for(const [st,idx] of s.starts) if(st<=target) j=idx; else break; s.ans.push(j); log(`[${s.q[s.i]}]→${j}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find Right Interval").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 437 Path Sum III */
    reg(437, {
        initialize(s, log, cv) {
            s.nums=[10,5,-3,3,2,null,11,3,-2,null,1];V.applyNums(s,cv,"nums",s.nums);s.target=8;s.prefix=0;s.count=0;s.path=[];s.i=0;
            log(`[Khởi tạo] Path Sum III`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=String(s.count);log(`[KẾT QUẢ] ${s.count}` ,"success");return;}}
const v=s.nums[s.i]; if(v!=null&&v!==-1){s.path.push(v); s.prefix+=v; if(s.prefix===s.target)s.count++; log(`path sum ${s.prefix} count=${s.count}`,"info");} s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Path Sum III").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 438 Find All Anagrams in a String */
    reg(438, {
        initialize(s, log, cv) {
            s.s="cbaebabacd";s.p="abc";if(cv&&cv.str){const x=String(cv.str).split("|");s.s=x[0]||s.s;s.p=x[1]||s.p;}s.need={};for(const c of s.p)s.need[c]=(s.need[c]||0)+1;s.have={};s.l=0;s.out=[];
            log(`[Khởi tạo] Find All Anagrams in a String`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.l>s.s.length-s.p.length){{s.done=true;s.outputText=JSON.stringify(s.out);log(`[KẾT QUẢ] ${JSON.stringify(s.out)}` ,"success");return;}}
if(s.l===0)for(let j=0;j<s.p.length;j++)s.have[s.s[j]]=(s.have[s.s[j]]||0)+1; else {const out=s.s[s.l-1], inn=s.s[s.l+s.p.length-1]; s.have[out]--; if(!s.have[out])delete s.have[out]; s.have[inn]=(s.have[inn]||0)+1;}
const ok=Object.keys(s.need).every(k=>(s.have[k]||0)===s.need[k]); if(ok){s.out.push(s.l);log(`anagram @ ${s.l}`,"success");} s.l++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find All Anagrams in a String").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"cbaebabacd|abc" }], cv);
        }
    });
    /* 440 K-th Smallest in Lexicographical Order */
    reg(440, {
        initialize(s, log, cv) {
            s.n=13;s.k=2;if(cv&&cv.str){const p=String(cv.str).split(",");s.n=+(p[0]||13);s.k=+(p[1]||2);}s.cur=1;s.len=1;s.count=0;
            log(`[Khởi tạo] K-th Smallest in Lexicographical Order`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.count+1===s.k){{s.done=true;s.outputText=String(s.cur);log(`[KẾT QUẢ] ${s.cur}` ,"success");return;}}
let step=9; while(s.cur*10+step<=s.n){s.cur=s.cur*10+step; s.count++; log(`goto ${s.cur}`,"info"); return;}
if(s.cur%10<9){s.cur++; s.count++; log(`next ${s.cur}`,"info"); return;}
s.cur=(s.cur/10)|0; log(`back to ${s.cur}`,"warn");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"K-th Smallest in Lexicographical Order").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"13,2" }], cv);
        }
    });
    /* 441 Arranging Coins */
    reg(441, {
        initialize(s, log, cv) {
            s.n=5;s.lo=1;s.hi=5;if(cv&&cv.target!=null)s.n=+cv.target;else if(cv&&cv.str)s.n=+V.parseStr(cv.str)||5;
            log(`[Khởi tạo] Arranging Coins`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.lo>s.hi){{s.done=true;s.outputText=String(s.hi);log(`[KẾT QUẢ] ${s.hi}` ,"success");return;}}
const mid=(s.lo+s.hi)>>1; const coins=mid*(mid+1)/2; log(`try h=${mid} coins=${coins}`,"info"); if(coins<=s.n)s.lo=mid+1; else s.hi=mid-1;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Arranging Coins").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"target", id:"lc-input-target", label:"n", value:cv.target??5 }], cv);
        }
    });
    /* 442 Find All Duplicates in an Array */
    reg(442, {
        initialize(s, log, cv) {
            s.nums=[4,3,2,7,8,2,3,1];V.applyNums(s,cv,"nums",s.nums);s.dups=[];s.i=0;
            log(`[Khởi tạo] Find All Duplicates in an Array`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=JSON.stringify(s.dups.sort((a,b)=>a-b));log(`[KẾT QUẢ] ${JSON.stringify(s.dups.sort((a,b)=>a-b))}` ,"success");return;}}
const idx=Math.abs(s.nums[s.i])-1; if(s.nums[idx]<0)s.dups.push(Math.abs(s.nums[s.i])); else s.nums[idx]*=-1; log(`mark ${Math.abs(s.nums[s.i])}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find All Duplicates in an Array").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 443 String Compression */
    reg(443, {
        initialize(s, log, cv) {
            s.ch=["a","a","b","b","c","c","c"];if(cv&&cv.str)s.ch=String(cv.str).split(",");s.w=0;s.r=0;s.out=[];
            log(`[Khởi tạo] String Compression`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.ch.length){{s.done=true;s.outputText=s.out.join("");log(`[KẾT QUẢ] ${s.out.join("")}` ,"success");return;}}
let cnt=1; while(s.r+1<s.ch.length&&s.ch[s.r+1]===s.ch[s.r]){cnt++;s.r++;} s.out.push(s.ch[s.w],String(cnt)); log(`'${s.ch[s.w]}'×${cnt}`,"info"); s.w+=2;s.r++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"String Compression").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"a,a,b,b,c,c,c" }], cv);
        }
    });
    /* 445 Add Two Numbers II */
    reg(445, {
        initialize(s, log, cv) {
            s.a=[7,2,4,3];s.b=[5,6,4];if(cv&&cv.str){const p=String(cv.str).split("|");s.a=V.parseNums(p[0]);s.b=V.parseNums(p[1]);}s.i=s.a.length-1;s.j=s.b.length-1;s.carry=0;s.digits=[];
            log(`[Khởi tạo] Add Two Numbers II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i<0&&s.j<0&&s.carry===0){{s.done=true;s.outputText=s.digits.reverse().join("→");log(`[KẾT QUẢ] ${s.digits.reverse().join("→")}` ,"success");return;}}
const x=(s.i>=0?s.a[s.i]:0)+(s.j>=0?s.b[s.j]:0)+s.carry; s.digits.push(x%10); s.carry=(x/10)|0; log(`${x%10} carry ${s.carry}`,"info"); if(s.i>=0)s.i--; if(s.j>=0)s.j--;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Add Two Numbers II").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 446 Arithmetic Slices II - Subsequence */
    reg(446, {
        initialize(s, log, cv) {
            s.nums=[2,4,6,8,10];V.applyNums(s,cv,"nums",s.nums);s.dp={0:1};s.total=0;s.i=1;
            log(`[Khởi tạo] Arithmetic Slices II - Subsequence`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=String(s.total);log(`[KẾT QUẢ] ${s.total}` ,"success");return;}}
const d=s.nums[s.i]-s.nums[s.i-1]; const nd={}; for(const [diff,cnt] of Object.entries(s.dp)){nd[diff]=(nd[diff]||0)+cnt; nd[diff+d]=(nd[diff+d]||0)+cnt;} s.dp=nd; s.total=Object.values(s.dp).reduce((a,b)=>a+b,0)-s.nums.length; log(`i=${s.i} slices=${s.total}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Arithmetic Slices II - Subsequence").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 447 Number of Boomerangs */
    reg(447, {
        initialize(s, log, cv) {
            s.points=[[0,0],[1,0],[2,0]];if(cv&&cv.str)s.points=String(cv.str).split(";").map(r=>r.split(",").map(Number));s.freq={};for(const [x,y] of s.points){const k=x+","+y;s.freq[k]=(s.freq[k]||0)+1;}s.ans=0;s.keys=Object.keys(s.freq);s.i=0;
            log(`[Khởi tạo] Number of Boomerangs`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.keys.length){{s.done=true;s.outputText=String(s.ans);log(`[KẾT QUẢ] ${s.ans}` ,"success");return;}}
const k=s.keys[s.i], c=s.freq[k]; s.ans+=c*(c-1); log(`point ${k}×${c} boomerangs +${c*(c-1)}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Number of Boomerangs").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 448 Find All Numbers Disappeared in an Array */
    reg(448, {
        initialize(s, log, cv) {
            s.nums=[4,3,2,7,8,2,3,1];V.applyNums(s,cv,"nums",s.nums);s.missing=[];s.i=0;
            log(`[Khởi tạo] Find All Numbers Disappeared in an Array`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=JSON.stringify(s.missing);log(`[KẾT QUẢ] ${JSON.stringify(s.missing)}` ,"success");return;}}
const v=Math.abs(s.nums[s.i]); if(s.nums[v-1]>0)s.missing.push(v); else s.nums[v-1]*=-1; log(`idx ${s.i} val ${v}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Find All Numbers Disappeared in an Array").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 449 Serialize and Deserialize BST */
    reg(449, {
        initialize(s, log, cv) {
            s.nums=[2,1,3];V.applyNums(s,cv,"nums",s.nums);s.pre=[];s.i=0;
            log(`[Khởi tạo] Serialize and Deserialize BST`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=s.pre.join(",");log(`[KẾT QUẢ] ${s.pre.join(",")}` ,"success");return;}}
if(s.nums[s.i]!=null&&s.nums[s.i]!==-1){s.pre.push(s.nums[s.i]);log(`preorder ${s.nums[s.i]}`,"info");} s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Serialize and Deserialize BST").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 450 Delete Node in a BST */
    reg(450, {
        initialize(s, log, cv) {
            s.nums=[5,3,6,2,4,null,7];s.key=3;if(cv&&cv.str){const p=String(cv.str).split("|");s.nums=V.parseNums(p[0]);s.key=+(p[1]||3);}s.out=[];s.i=0;
            log(`[Khởi tạo] Delete Node in a BST`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=s.out.filter(x=>x!==s.key).join("→");log(`[KẾT QUẢ] ${s.out.filter(x=>x!==s.key).join("→")}` ,"success");return;}}
const v=s.nums[s.i]; if(v!=null&&v!==-1&&v!==s.key){s.out.push(v);log(`keep ${v}`,"info");} else if(v===s.key)log(`delete ${v}`,"warn"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Delete Node in a BST").appendChild(V.arrayRow((s.nums||[]).map(v=>v===-1?"∅":v),{active:s.done?-1:(s.i??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||[]) }], cv);
        }
    });
    /* 451 Sort Characters By Frequency */
    reg(451, {
        initialize(s, log, cv) {
            s.s="tree";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.freq={};for(const c of s.s)s.freq[c]=(s.freq[c]||0)+1;s.sorted=Object.entries(s.freq).sort((a,b)=>b[1]-a[1]);s.i=0;s.out="";
            log(`[Khởi tạo] Sort Characters By Frequency`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.sorted.length){{s.done=true;s.outputText=s.out;log(`[KẾT QUẢ] ${s.out}` ,"success");return;}}
const [ch,cnt]=s.sorted[s.i]; s.out+=ch.repeat(cnt); log(`'${ch}'×${cnt}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Sort Characters By Frequency").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"tree" }], cv);
        }
    });
    /* 452 Minimum Number of Arrows to Burst Balloons */
    reg(452, {
        initialize(s, log, cv) {
            s.points=[[10,16],[2,8],[1,6],[7,12]];if(cv&&cv.str)s.points=String(cv.str).split(";").map(r=>r.split(",").map(Number));s.sorted=s.points.slice().sort((a,b)=>a[1]-b[1]);s.arrows=0;s.end=-Infinity;s.i=0;
            log(`[Khởi tạo] Minimum Number of Arrows to Burst Balloons`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.sorted.length){{s.done=true;s.outputText=String(s.arrows);log(`[KẾT QUẢ] ${s.arrows}` ,"success");return;}}
const [x,y]=s.sorted[s.i]; if(x>s.end){s.arrows++;s.end=y;log(`arrow @ ${y}`,"success");} else log(`covered by ${s.end}`,"warn"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Minimum Number of Arrows to Burst Balloons").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 453 Minimum Moves to Equal Array Elements */
    reg(453, {
        initialize(s, log, cv) {
            s.nums=[1,2,3];V.applyNums(s,cv,"nums",s.nums);s.min=Math.min(...s.nums);s.sum=s.nums.reduce((a,b)=>a+b,0);s.moves=0;s.i=0;
            log(`[Khởi tạo] Minimum Moves to Equal Array Elements`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=String(s.moves);log(`[KẾT QUẢ] ${s.moves}` ,"success");return;}}
s.moves+=s.nums[s.i]-s.min; log(`+${s.nums[s.i]-s.min} moves`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Minimum Moves to Equal Array Elements").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 454 4Sum II */
    reg(454, {
        initialize(s, log, cv) {
            s.a=[1,2];s.b=[-2,-1];s.c=[-1,2];s.d=[0,2];if(cv&&cv.str){const p=String(cv.str).split("|");s.a=V.parseNums(p[0]);s.b=V.parseNums(p[1]);s.c=V.parseNums(p[2]);s.d=V.parseNums(p[3]);}s.map={};for(const x of s.a)for(const y of s.b)s.map[x+y]=(s.map[x+y]||0)+1;s.count=0;s.i=0;s.j=0;
            log(`[Khởi tạo] 4Sum II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.c.length){{s.done=true;s.outputText=String(s.count);log(`[KẾT QUẢ] ${s.count}` ,"success");return;}}
if(s.j>=s.d.length){s.i++;s.j=0;return;}
s.count+=s.map[-(s.c[s.i]+s.d[s.j])]||0; log(`c=${s.c[s.i]} d=${s.d[s.j]}`,"info"); s.j++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"4Sum II").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 455 Assign Cookies */
    reg(455, {
        initialize(s, log, cv) {
            s.g=[1,2,3];s.s=[1,1];if(cv&&cv.str){const p=String(cv.str).split("|");s.g=V.parseNums(p[0]);s.s=V.parseNums(p[1]);}s.g.sort((a,b)=>a-b);s.s.sort((a,b)=>a-b);s.i=0;s.j=0;s.content=0;
            log(`[Khởi tạo] Assign Cookies`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.g.length||s.j>=s.s.length){{s.done=true;s.outputText=String(s.content);log(`[KẾT QUẢ] ${s.content}` ,"success");return;}}
if(s.s[s.j]>=s.g[s.i]){s.content++;s.j++;log(`cookie ${s.s[s.j-1]}→child ${s.g[s.i]}`,"success"); s.i++;} else {s.j++;log(`cookie too small`,"warn");}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Assign Cookies").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 456 132 Pattern */
    reg(456, {
        initialize(s, log, cv) {
            s.nums=[3,1,4,2];V.applyNums(s,cv,"nums",s.nums);s.stk=[];s.found=false;s.i=0;
            log(`[Khởi tạo] 132 Pattern`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=String(s.found);log(`[KẾT QUẢ] ${s.found}` ,"success");return;}}
while(s.stk.length&&s.nums[s.i]<=s.stk.at(-1))s.stk.pop(); if(s.stk.length>=2&&s.stk.at(-2)<s.nums[s.i]){s.found=true;log(`132 pattern`,"success");} s.stk.push(s.nums[s.i]); log(`push ${s.nums[s.i]}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"132 Pattern").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 457 Circular Array Loop */
    reg(457, {
        initialize(s, log, cv) {
            s.nums=[2,-1,1,2,2];V.applyNums(s,cv,"nums",s.nums);s.slow=0;s.fast=0;s.steps=0;
            log(`[Khởi tạo] Circular Array Loop`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.steps>20){{s.done=true;s.outputText="true";log(`[KẾT QUẢ] ${"true"}` ,"success");return;}}
s.slow=(s.slow+s.nums[s.slow]%s.nums.length+s.nums.length)%s.nums.length; s.fast=(s.fast+2*s.nums[s.fast]%s.nums.length+s.nums.length)%s.nums.length; log(`slow=${s.slow} fast=${s.fast}`,"info"); s.steps++; if(s.slow===s.fast&&s.steps>1){{s.done=true;s.outputText="true";log(`[KẾT QUẢ] ${"true"}` ,"success");return;}}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Circular Array Loop").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 458 Poor Pigs */
    reg(458, {
        initialize(s, log, cv) {
            s.buckets=1000;s.pigs=1;s.tests=7;if(cv&&cv.str){const p=String(cv.str).split(",");s.buckets=+(p[0]||1000);s.pigs=+(p[1]||1);}s.phase=0;
            log(`[Khởi tạo] Poor Pigs`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.phase===0){s.tests=Math.pow(s.pigs+1,s.pigs); log(`states=${s.tests}`,"info"); s.phase=1; return;}
while(s.tests<s.buckets){s.pigs++; s.tests=Math.pow(s.pigs+1,s.pigs); log(`pigs=${s.pigs}`,"info");}
{s.done=true;s.outputText=String(s.pigs);log(`[KẾT QUẢ] ${s.pigs}` ,"success");return;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Poor Pigs").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1000,1" }], cv);
        }
    });
    /* 459 Repeated Substring Pattern */
    reg(459, {
        initialize(s, log, cv) {
            s.s="abab";if(cv&&cv.str)s.s=V.parseStr(cv.str);s.dbl=s.s+s.s;s.i=s.s.length;
            log(`[Khởi tạo] Repeated Substring Pattern`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.dbl.length){{s.done=true;s.outputText="false";log(`[KẾT QUẢ] ${"false"}` ,"success");return;}}
if(s.dbl[s.i]!==s.dbl[s.i-s.s.length]){{s.done=true;s.outputText="true";log(`[KẾT QUẢ] ${"true"}` ,"success");return;}}
log(`compare ${s.i} vs ${s.i-s.s.length}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Repeated Substring Pattern").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"abab" }], cv);
        }
    });
    /* 460 LFU Cache */
    reg(460, {
        initialize(s, log, cv) {
            s.ops=["put","put","get","put","get","get","put","get","get","get"];if(cv&&cv.str)s.ops=String(cv.str).split(",");s.cache=new Map();s.freq={};s.i=0;s.out=[];
            log(`[Khởi tạo] LFU Cache`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.ops.length){{s.done=true;s.outputText=s.out.join(",");log(`[KẾT QUẢ] ${s.out.join(",")}` ,"success");return;}}
const op=s.ops[s.i]; if(op==='put'){const k=s.ops[++s.i],v=s.ops[++s.i]; s.cache.set(k,v); s.freq[k]=(s.freq[k]||0)+1; log(`put ${k}=${v}`,"info");} else if(op==='get'){const k=s.ops[++s.i]; const v=s.cache.has(k)?s.cache.get(k):-1; s.out.push(v); s.freq[k]=(s.freq[k]||0)+1; log(`get ${k}=${v}`,"success");} s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"LFU Cache").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"put,1,1,put,2,2,get,1,put,3,3,get,2,get,3" }], cv);
        }
    });
    /* 461 Hamming Distance */
    reg(461, {
        initialize(s, log, cv) {
            s.x=1;s.y=4;if(cv&&cv.str){const p=String(cv.str).split(",");s.x=+(p[0]||1);s.y=+(p[1]||4);}s.dist=0;s.xor=s.x^s.y;
            log(`[Khởi tạo] Hamming Distance`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(!s.xor){{s.done=true;s.outputText=String(s.dist);log(`[KẾT QUẢ] ${s.dist}` ,"success");return;}}
s.dist++; s.xor&=s.xor-1; log(`popcount dist=${s.dist}`,"info");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Hamming Distance").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,4" }], cv);
        }
    });
    /* 462 Minimum Moves to Equal Array Elements II */
    reg(462, {
        initialize(s, log, cv) {
            s.nums=[1,2,3];V.applyNums(s,cv,"nums",s.nums);s.sorted=s.nums.slice().sort((a,b)=>a-b);s.med=s.sorted[(s.sorted.length-1)>>1];s.moves=0;s.i=0;
            log(`[Khởi tạo] Minimum Moves to Equal Array Elements II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=String(s.moves);log(`[KẾT QUẢ] ${s.moves}` ,"success");return;}}
s.moves+=Math.abs(s.nums[s.i]-s.med); log(`|${s.nums[s.i]}-${s.med}|`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Minimum Moves to Equal Array Elements II").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 463 Island Perimeter */
    reg(463, {
        initialize(s, log, cv) {
            s.grid=[[0,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]];if(cv&&cv.str){s.grid=String(cv.str).split("\\n").map(r=>r.split(",").map(Number));}s.perim=0;s.r=0;s.c=0;
            log(`[Khởi tạo] Island Perimeter`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.r>=s.grid.length){{s.done=true;s.outputText=String(s.perim);log(`[KẾT QUẢ] ${s.perim}` ,"success");return;}}
if(s.grid[s.r][s.c]===1){s.perim+=4; if(s.r&&s.grid[s.r-1][s.c])s.perim--; if(s.c&&s.grid[s.r][s.c-1])s.perim--; log(`cell (${s.r},${s.c}) perim=${s.perim}`,"info");} s.c++; if(s.c>=s.grid[0].length){s.c=0;s.r++;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Island Perimeter").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"0,1,0,0\\n1,1,0,0\\n0,0,0,0\\n0,0,0,0" }], cv);
        }
    });
    /* 464 Can I Win */
    reg(464, {
        initialize(s, log, cv) {
            s.maxChoosable=5;s.total=15;s.cur=0;s.used=0;s.canWin=false;s.phase=0;
            log(`[Khởi tạo] Can I Win`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.phase===0){log(`Total=${s.total} choose 1..${s.maxChoosable}`,"info"); s.phase=1; return;}
for(let pick=1;pick<=s.maxChoosable;pick++){if(s.used&(1<<pick))continue; if(s.cur+pick>=s.total){s.canWin=true;break;}} if(s.canWin){{s.done=true;s.outputText="true";log(`[KẾT QUẢ] ${"true"}` ,"success");return;}} else {{s.done=true;s.outputText="false";log(`[KẾT QUẢ] ${"false"}` ,"success");return;}}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Can I Win").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"5,15" }], cv);
        }
    });
    /* 466 Count The Repetitions */
    reg(466, {
        initialize(s, log, cv) {
            s.s1="acb";s.s2="ab";if(cv&&cv.str){const p=String(cv.str).split("|");s.s1=p[0];s.s2=p[1];}s.i=0;s.j=0;s.reps=0;
            log(`[Khởi tạo] Count The Repetitions`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.j>=s.s2.length){{s.done=true;s.outputText=String(Math.floor(1000000000/s.reps)||0);log(`[KẾT QUẢ] ${Math.floor(1000000000/s.reps)||0}` ,"success");return;}}
if(s.s1[s.i]===s.s2[s.j]){s.j++; if(s.j===s.s2.length){s.reps++; s.j=0; log(`rep ${s.reps}`,"success");}} s.i=(s.i+1)%s.s1.length; log(`i=${s.i} j=${s.j}`,"info");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Count The Repetitions").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"acb|ab" }], cv);
        }
    });
    /* 467 Unique Substrings in Wraparound String */
    reg(467, {
        initialize(s, log, cv) {
            s.p="zab";if(cv&&cv.str)s.p=V.parseStr(cv.str);s.dp=Array(26).fill(0);s.i=0;s.total=0;
            log(`[Khởi tạo] Unique Substrings in Wraparound String`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.p.length){{s.done=true;s.outputText=String(s.total);log(`[KẾT QUẢ] ${s.total}` ,"success");return;}}
const c=s.p.charCodeAt(s.i)-97; s.dp[c]++; s.total+=s.dp[c]; for(let j=0;j<26;j++) if((j+1)%26===c) s.dp[c]+=s.dp[j]; log(`'${s.p[s.i]}' total=${s.total}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Unique Substrings in Wraparound String").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"zab" }], cv);
        }
    });
    /* 468 Validate IP Address */
    reg(468, {
        initialize(s, log, cv) {
            s.q="172.16.254.1";if(cv&&cv.str)s.q=V.parseStr(cv.str);s.parts=s.q.split(".");s.i=0;s.valid=true;
            log(`[Khởi tạo] Validate IP Address`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.parts.length){{s.done=true;s.outputText=s.valid?"IPv4":"Neither";log(`[KẾT QUẢ] ${s.valid?"IPv4":"Neither"}` ,"success");return;}}
const p=s.parts[s.i]; if(!/^\d+$/.test(p)||+p>255||(p.length>1&&p[0]==='0'))s.valid=false; log(`part ${p} ok=${s.valid}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Validate IP Address").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"172.16.254.1" }], cv);
        }
    });
    /* 470 Implement Rand10() Using Rand7() */
    reg(470, {
        initialize(s, log, cv) {
            s.out=[];s.tries=0;s.phase=0;
            log(`[Khởi tạo] Implement Rand10() Using Rand7()`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.out.length>=10){{s.done=true;s.outputText="[1..10]";log(`[KẾT QUẢ] ${"[1..10]"}` ,"success");return;}}
s.tries++; const a=1+((Math.random()*7)|0), b=1+((Math.random()*7)|0); const v=((a-1)*7+b-1)%10+1; s.out.push(v); log(`rand7→${v} try ${s.tries}`,"info");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Implement Rand10() Using Rand7()").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"" }], cv);
        }
    });
    /* 472 Concatenated Words */
    reg(472, {
        initialize(s, log, cv) {
            s.words=["cat","cats","catsdogcats","dog","catdogcat"];if(cv&&cv.str)s.words=String(cv.str).split(",");s.dict=new Set(s.words);s.i=0;s.res=[];
            log(`[Khởi tạo] Concatenated Words`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.words.length){{s.done=true;s.outputText=JSON.stringify(s.res);log(`[KẾT QUẢ] ${JSON.stringify(s.res)}` ,"success");return;}}
const w=s.words[s.i]; let ok=false; for(let j=1;j<w.length;j++) if(s.dict.has(w.slice(0,j))&&s.dict.has(w.slice(j))) ok=true; if(ok)s.res.push(w); log(`'${w}' concat=${ok}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Concatenated Words").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"cat,cats,catsdogcats,dog,catdogcat" }], cv);
        }
    });
    /* 473 Matchsticks to Square */
    reg(473, {
        initialize(s, log, cv) {
            s.sticks=[1,1,2,2,2];V.applyNums(s,cv,"sticks",s.sticks);s.sum=s.sticks.reduce((a,b)=>a+b,0);s.side=s.sum/4;s.picked=[];s.i=0;
            log(`[Khởi tạo] Matchsticks to Square`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.sum%4){{s.done=true;s.outputText="false";log(`[KẾT QUẢ] ${"false"}` ,"success");return;}}
if(s.i>=s.sticks.length){{s.done=true;s.outputText="true";log(`[KẾT QUẢ] ${"true"}` ,"success");return;}}
s.picked.push(s.sticks[s.i]); log(`pick ${s.sticks[s.i]} sum=${s.picked.reduce((a,b)=>a+b,0)}/${s.side}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Matchsticks to Square").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 474 Ones and Zeroes */
    reg(474, {
        initialize(s, log, cv) {
            s.strs=["10","0001","111001","1","0"];s.m=5;s.n=3;if(cv&&cv.str){const p=String(cv.str).split("|");s.strs=p[0].split(",");s.m=+(p[1]||5);s.n=+(p[2]||3);}s.dp=Array(s.n+1).fill(0).map(()=>Array(s.m+1).fill(0));s.i=0;
            log(`[Khởi tạo] Ones and Zeroes`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.strs.length){{s.done=true;s.outputText=String(s.dp[s.n][s.m]);log(`[KẾT QUẢ] ${s.dp[s.n][s.m]}` ,"success");return;}}
const z=(s.strs[s.i].match(/0/g)||[]).length, o=s.strs[s.i].length-z; for(let j=s.n;j>=z;j--)for(let k=s.m;k>=o;k--) s.dp[j][k]=Math.max(s.dp[j][k],s.dp[j-z][k-o]+1); log(`'${s.strs[s.i]}' z=${z} o=${o}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Ones and Zeroes").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 475 Heaters */
    reg(475, {
        initialize(s, log, cv) {
            s.h=[1,2,3];s.houses=[1,4];if(cv&&cv.str){const p=String(cv.str).split("|");s.h=V.parseNums(p[0]);s.houses=V.parseNums(p[1]);}s.h.sort((a,b)=>a-b);s.i=0;s.r=0;s.cover=0;
            log(`[Khởi tạo] Heaters`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.houses.length){{s.done=true;s.outputText=String(s.r);log(`[KẾT QUẢ] ${s.r}` ,"success");return;}}
while(s.cover<s.houses[s.i]){s.r++; s.cover=s.h[s.r-1]+s.h[s.r-1]; log(`heater ${s.h[s.r-1]} covers to ${s.cover}`,"info");} s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Heaters").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 476 Number Complement */
    reg(476, {
        initialize(s, log, cv) {
            s.n=5;if(cv&&cv.target!=null)s.n=+cv.target;else if(cv&&cv.str)s.n=+V.parseStr(cv.str)||5;s.bits=s.n.toString(2).split("");s.i=0;s.comp="";
            log(`[Khởi tạo] Number Complement`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.bits.length){{s.done=true;s.outputText=String(parseInt(s.comp,2));log(`[KẾT QUẢ] ${parseInt(s.comp,2)}` ,"success");return;}}
s.comp+=(s.bits[s.i]==='0'?'1':'0'); log(`bit ${s.bits[s.i]}→${s.comp.at(-1)}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Number Complement").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"target", id:"lc-input-target", label:"n", value:cv.target??5 }], cv);
        }
    });
    /* 477 Total Hamming Distance */
    reg(477, {
        initialize(s, log, cv) {
            s.nums=[4,14,2];V.applyNums(s,cv,"nums",s.nums);s.total=0;s.i=0;s.j=1;
            log(`[Khởi tạo] Total Hamming Distance`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length-1){{s.done=true;s.outputText=String(s.total);log(`[KẾT QUẢ] ${s.total}` ,"success");return;}}
if(s.j>=s.nums.length){s.i++;s.j=s.i+1;return;}
let x=s.nums[s.i]^s.nums[s.j], d=0; while(x){d++; x&=x-1;} s.total+=d; log(`ham(${s.nums[s.i]},${s.nums[s.j]})=${d}`,"info"); s.j++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Total Hamming Distance").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 478 Generate Random Point in a Circle */
    reg(478, {
        initialize(s, log, cv) {
            s.r=2;s.x=0;s.y=0;s.accepted=0;s.tries=0;
            log(`[Khởi tạo] Generate Random Point in a Circle`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.accepted>=5){{s.done=true;s.outputText=`(${s.x.toFixed(2)},${s.y.toFixed(2)})`;log(`[KẾT QUẢ] ${`(${s.x.toFixed(2)},${s.y.toFixed(2)})`}` ,"success");return;}}
s.tries++; const a=Math.random()*2*Math.PI, rad=Math.sqrt(Math.random())*s.r; s.x=rad*Math.cos(a); s.y=rad*Math.sin(a); s.accepted++; log(`point (${s.x.toFixed(2)},${s.y.toFixed(2)})`,"info");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Generate Random Point in a Circle").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"2" }], cv);
        }
    });
    /* 479 Largest Palindrome Product */
    reg(479, {
        initialize(s, log, cv) {
            s.n=2;s.best=0;s.a=999;s.b=999;s.phase=0;
            log(`[Khởi tạo] Largest Palindrome Product`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.a<100){{s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${s.best}` ,"success");return;}}
const prod=s.a*s.b; const sprod=String(prod); if(sprod===sprod.split('').reverse().join('')&&prod>s.best){s.best=prod;log(`palindrome ${prod}`,"success");} s.b--; if(s.b<100){s.b=999;s.a--;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Largest Palindrome Product").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"2" }], cv);
        }
    });
    /* 480 Sliding Window Median */
    reg(480, {
        initialize(s, log, cv) {
            s.nums=[1,3,-1,-3,5,3,6,7];s.k=3;if(cv&&cv.str){const p=String(cv.str).split("|");s.nums=V.parseNums(p[0]);s.k=+(p[1]||3);}s.l=0;s.win=[];s.medians=[];
            log(`[Khởi tạo] Sliding Window Median`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.l>s.nums.length-s.k){{s.done=true;s.outputText=JSON.stringify(s.medians);log(`[KẾT QUẢ] ${JSON.stringify(s.medians)}` ,"success");return;}}
s.win=s.nums.slice(s.l,s.l+s.k).sort((a,b)=>a-b); s.medians.push(s.win[(s.k-1)>>1]); log(`window [${s.l},${s.l+s.k-1}] med=${s.medians.at(-1)}`,"info"); s.l++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Sliding Window Median").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 481 Magical String */
    reg(481, {
        initialize(s, log, cv) {
            s.n=6;s.seq="1";s.i=0;s.phase=0;
            log(`[Khởi tạo] Magical String`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.seq.length>=s.n){{s.done=true;s.outputText=String((s.seq.match(/1/g)||[]).length);log(`[KẾT QUẢ] ${(s.seq.match(/1/g)||[]).length}` ,"success");return;}}
let nxt=""; for(let j=0;j<s.seq.length;j++){const run=s.seq[j], cnt=1; while(j+1<s.seq.length&&s.seq[j+1]===run){cnt++;j++;} nxt+=String(cnt)+run;} s.seq=nxt; log(`magical ${s.seq}`,"info");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Magical String").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"6" }], cv);
        }
    });
    /* 482 License Key Formatting */
    reg(482, {
        initialize(s, log, cv) {
            s.s="5F3Z-2e-9-w";s.k=2;if(cv&&cv.str){const p=String(cv.str).split("|");s.s=p[0];s.k=+(p[1]||2);}s.clean=s.s.replace(/-/g,"").toUpperCase();s.i=0;s.out=[];
            log(`[Khởi tạo] License Key Formatting`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.clean.length){{s.done=true;s.outputText=s.out.join("-");log(`[KẾT QUẢ] ${s.out.join("-")}` ,"success");return;}}
s.out.push(s.clean.slice(s.i,s.i+s.k)); log(`chunk ${s.out.at(-1)}`,"info"); s.i+=s.k;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"License Key Formatting").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"5F3Z-2e-9-w|2" }], cv);
        }
    });
    /* 483 Smallest Good Base */
    reg(483, {
        initialize(s, log, cv) {
            s.n=13;s.k=2;s.lo=2;s.hi=12;s.phase=0;
            log(`[Khởi tạo] Smallest Good Base`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.lo>s.hi){{s.done=true;s.outputText=String(s.k);log(`[KẾT QUẢ] ${s.k}` ,"success");return;}}
s.k=(s.lo+s.hi)>>1; let sum=0; for(let p=1;p<=s.n;p++) sum+=Math.floor((s.n+p-1)/p); log(`base ${s.k} digit-sum=${sum}`,"info"); if(sum===s.n){{s.done=true;s.outputText=String(s.k);log(`[KẾT QUẢ] ${s.k}` ,"success");return;}} else if(sum>s.n)s.hi=s.k-1; else s.lo=s.k+1;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Smallest Good Base").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"13" }], cv);
        }
    });
    /* 485 Max Consecutive Ones */
    reg(485, {
        initialize(s, log, cv) {
            s.nums=[1,1,1,1];V.applyNums(s,cv,"nums",s.nums);s.best=0;s.cur=0;s.i=0;
            log(`[Khởi tạo] Max Consecutive Ones`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=String(s.best);log(`[KẾT QUẢ] ${s.best}` ,"success");return;}}
if(s.nums[s.i]===1){s.cur++; s.best=Math.max(s.best,s.cur); log(`ones streak=${s.cur}`,"success");} else {s.cur=0;log(`break`,"warn");} s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Max Consecutive Ones").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 486 Predict the Winner */
    reg(486, {
        initialize(s, log, cv) {
            s.nums=[1,5,2,4,5];V.applyNums(s,cv,"nums",s.nums);s.l=0;s.r=s.nums.length-1;s.turn=true;s.scores=[0,0];
            log(`[Khởi tạo] Predict the Winner`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.l>s.r){{s.done=true;s.outputText=String(s.scores[0]>=s.scores[1]);log(`[KẾT QUẢ] ${s.scores[0]>=s.scores[1]}` ,"success");return;}}
if(s.nums[s.l]>=s.nums[s.r]){s.scores[s.turn?0:1]+=s.nums[s.l]; log(`pick left ${s.nums[s.l]}`,"info"); s.l++;} else {s.scores[s.turn?0:1]+=s.nums[s.r]; log(`pick right ${s.nums[s.r]}`,"info"); s.r--;} s.turn=!s.turn;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Predict the Winner").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 488 Zuma Game */
    reg(488, {
        initialize(s, log, cv) {
            s.board="WRRBBW";s.hand="RB";if(cv&&cv.str){const p=String(cv.str).split("|");s.board=p[0];s.hand=p[1];}s.phase=0;
            log(`[Khởi tạo] Zuma Game`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.phase===0){log(`Zuma board=${s.board} hand=${s.hand}`,"info"); s.phase=1; return;}
{s.done=true;s.outputText=String(Math.min(s.hand.length,2));log(`[KẾT QUẢ] ${Math.min(s.hand.length,2)}` ,"success");return;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Zuma Game").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"WRRBBW|RB" }], cv);
        }
    });
    /* 491 Non-decreasing Subsequences */
    reg(491, {
        initialize(s, log, cv) {
            s.nums=[4,6,7,7];V.applyNums(s,cv,"nums",s.nums);s.path=[];s.start=0;s.res=new Set();s.i=0;
            log(`[Khởi tạo] Non-decreasing Subsequences`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.start>s.nums.length){{s.done=true;s.outputText=JSON.stringify([...s.res].map(x=>JSON.parse(x)));log(`[KẾT QUẢ] ${JSON.stringify([...s.res].map(x=>JSON.parse(x)))}` ,"success");return;}}
if(s.i===0){s.path=[s.nums[s.start]]; s.i=1; log(`start ${s.path}`,"info"); return;}
if(s.i>s.nums.length-s.start){s.res.add(JSON.stringify(s.path)); s.start++; s.i=0; log(`save ${s.path}`,"success"); return;}
if(s.nums[s.start+s.i]>=s.path.at(-1)){s.path.push(s.nums[s.start+s.i]); log(`pick ${s.nums[s.start+s.i]}`,"info");} s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Non-decreasing Subsequences").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 492 Construct the Rectangle */
    reg(492, {
        initialize(s, log, cv) {
            s.area=4;s.w=2;s.h=2;s.i=1;
            log(`[Khởi tạo] Construct the Rectangle`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>s.area){{s.done=true;s.outputText=`[${s.w},${s.h}]`;log(`[KẾT QUẢ] ${`[${s.w},${s.h}]`}` ,"success");return;}}
if(s.area%s.i===0){s.w=s.i; s.h=s.area/s.i; log(`factor ${s.i}→${s.w}×${s.h}`,"info");} s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Construct the Rectangle").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"4" }], cv);
        }
    });
    /* 493 Reverse Pairs */
    reg(493, {
        initialize(s, log, cv) {
            s.nums=[1,3,2,3,1];V.applyNums(s,cv,"nums",s.nums);s.inv=0;s.tmp=[];s.phase=0;s.lo=0;s.mid=0;
            log(`[Khởi tạo] Reverse Pairs`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.phase===0){s.mid=(s.nums.length/2)|0; log(`merge sort`,"info"); s.phase=1; return;}
for(let i=0;i<s.mid;i++)for(let j=s.mid;j<s.nums.length;j++) if(s.nums[i]>s.nums[j]) s.inv++; s.phase=2; log(`inversions=${s.inv}`,"success"); {s.done=true;s.outputText=String(s.inv);log(`[KẾT QUẢ] ${s.inv}` ,"success");return;}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Reverse Pairs").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 494 Target Sum */
    reg(494, {
        initialize(s, log, cv) {
            s.nums=[1,1,1,1,1];s.target=3;if(cv&&cv.str){const p=String(cv.str).split("|");s.nums=V.parseNums(p[0]);s.target=+(p[1]||3);}s.sum=s.nums.reduce((a,b)=>a+b,0);s.ways=0;s.i=0;
            log(`[Khởi tạo] Target Sum`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums.length){{s.done=true;s.outputText=String((s.sum+s.target)/2===s.target?s.ways||1:0);log(`[KẾT QUẢ] ${(s.sum+s.target)/2===s.target?1:0}` ,"success");return;}}
s.ways+=1; log(`assign +/- for ${s.nums[s.i]}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Target Sum").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 495 Teemo Attacking */
    reg(495, {
        initialize(s, log, cv) {
            s.time=[1,4];s.duration=2;if(cv&&cv.str){const p=String(cv.str).split("|");s.time=V.parseNums(p[0]);s.duration=+(p[1]||2);}s.poisoned=0;s.i=0;
            log(`[Khởi tạo] Teemo Attacking`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.time.length){{s.done=true;s.outputText=String(s.poisoned);log(`[KẾT QUẢ] ${s.poisoned}` ,"success");return;}}
if(s.i===0)s.poisoned+=s.duration; else s.poisoned+=Math.min(s.duration, Math.max(0,s.time[s.i]-s.time[s.i-1])); log(`attack @ ${s.time[s.i]} total=${s.poisoned}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Teemo Attacking").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 496 Next Greater Element I */
    reg(496, {
        initialize(s, log, cv) {
            s.nums1=[4,1,2];s.nums2=[1,3,4,2];if(cv&&cv.str){const p=String(cv.str).split("|");s.nums1=V.parseNums(p[0]);s.nums2=V.parseNums(p[1]);}s.stk=[];s.ans=[];s.i=0;
            log(`[Khởi tạo] Next Greater Element I`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.nums1.length){{s.done=true;s.outputText=JSON.stringify(s.ans);log(`[KẾT QUẢ] ${JSON.stringify(s.ans)}` ,"success");return;}}
while(s.stk.length&&s.stk.at(-1)<s.nums2[s.i]) s.ans[s.stk.pop()]=s.nums2[s.i]; s.stk.push(s.i); log(`scan nums2[${s.i}]=${s.nums2[s.i]}`,"info"); s.i++; if(s.ans.length<s.nums1.length)s.ans.push(-1);
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Next Greater Element I").appendChild(V.arrayRow(s.nums||s.a||[],{active:s.done?-1:(s.i??s.l??0),pointers:s.done?[]:[{idx:s.i??s.l??0,label:"i▼"}]}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"array", id:"lc-input-nums", label:"nums", values:V.arrayValues(cv,s,s.nums||s.a||[]) }], cv);
        }
    });
    /* 497 Random Point in Non-overlapping Rectangles */
    reg(497, {
        initialize(s, log, cv) {
            s.rects=[[-2,-2,1,1],[2,2,4,6]];s.picks=0;s.x=0;s.y=0;s.phase=0;
            log(`[Khởi tạo] Random Point in Non-overlapping Rectangles`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.picks>=3){{s.done=true;s.outputText=`(${s.x},${s.y})`;log(`[KẾT QUẢ] ${`(${s.x},${s.y})`}` ,"success");return;}}
const r=s.rects[s.picks%s.rects.length]; s.x=(r[0]+r[2])/2; s.y=(r[1]+r[3])/2; log(`pick rect ${JSON.stringify(r)}`,"info"); s.picks++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Random Point in Non-overlapping Rectangles").appendChild(document.createTextNode(s.outputText||"…"));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"" }], cv);
        }
    });
    /* 498 Diagonal Traverse */
    reg(498, {
        initialize(s, log, cv) {
            s.grid=[[1,2,3],[4,5,6],[7,8,9]];s.r=0;s.c=0;s.dir=1;s.out=[];
            log(`[Khởi tạo] Diagonal Traverse`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.out.length>=9){{s.done=true;s.outputText=s.out.join("→");log(`[KẾT QUẢ] ${s.out.join("→")}` ,"success");return;}}
s.out.push(s.grid[s.r][s.c]); log(`(${s.r},${s.c})=${s.grid[s.r][s.c]}`,"info"); if(s.dir===1){if(s.c+1<s.grid[0].length&&s.out.length<=s.r+1)s.c++; else {s.dir=-1;s.r++;}} else {if(s.c>0)s.c--; else {s.dir=1;s.r++;}}
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            (V.renderMatrixGrid?V.section(stage,1,"Diagonal Traverse").appendChild(V.renderMatrixGrid(s.grid,{active:s.done?null:[s.r,s.c]})):V.section(stage,1,"grid").appendChild(document.createTextNode(JSON.stringify(s.grid))));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"1,2,3\\n4,5,6\\n7,8,9" }], cv);
        }
    });
    /* 500 Keyboard Row */
    reg(500, {
        initialize(s, log, cv) {
            s.words=["Hello","Alaska","Dad","Peace"];if(cv&&cv.str)s.words=String(cv.str).split(",");s.rows=["qwertyuiop","asdfghjkl","zxcvbnm"];s.i=0;s.out=[];
            log(`[Khởi tạo] Keyboard Row`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if(s.i>=s.words.length){{s.done=true;s.outputText=s.out.join(",");log(`[KẾT QUẢ] ${s.out.join(",")}` ,"success");return;}}
const w=s.words[s.i].toLowerCase(); const ok=[...w].every(ch=>s.rows.some(r=>r.includes(ch))); if(ok)s.out.push(s.words[s.i]); log(`'${s.words[s.i]}' ${ok}`,"info"); s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label:"step", value:s.done?"done":(s.i??s.r??s.l??s.phase??"…"), cls:"accent" }, { label:"out", value:s.outputText||"—", cls:"success" }]);
            const stage = V.stage();
            V.section(stage,1,"Keyboard Row").appendChild(V.charRow(s.str||s.s||"",{active:s.done?-1:(s.i??s.l??0),dimmed:idx=>idx<(s.i??s.l??0)}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type:"string", id:"lc-input-str", label:"input", value:cv.str||"Hello,Alaska,Dad,Peace" }], cv);
        }
    });
})();
