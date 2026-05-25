/* LC #151–155, #160, #162, #164–169, #171–185, #187–191, #192–197, #199 (skip 198, 200 — lc-patterns.js) */
window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    const V = window.VizCore;
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

    /* 151 Reverse Words in a String */
    reg(151, {
        initialize(s, log, cv) {
            s.s = "the sky is blue";
            if (cv && cv.str) s.s = V.parseStr(cv.str);
            s.words = s.s.trim().split(/\s+/);
            s.i = s.words.length - 1; s.out = [];
            log(`[Khởi tạo] Reverse Words — "${s.s}"`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i < 0) { s.done = true; s.outputText = String(`"${s.result}"`); s.result = s.out.join(" "); log(`[KẾT QUẢ] "${s.result}"`, "success"); return; }
            s.out.push(s.words[s.i]);
            log(`Pop "${s.words[s.i]}" → out=[${s.out.join(" ")}]`, "info");
            s.i--;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "out", value: s.out.join(" ") || "—", cls: "success" }]);
            const stage = V.stage();
            V.section(stage, 1, "Từ gốc").appendChild(V.charRow(s.s, {}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "s", value: cv.str || s.s }], cv);
        }
    });

    /* 152 Maximum Product Subarray */
    reg(152, {
        initialize(s, log, cv) {
            s.nums = [2, 3, -2, 4];
            V.applyNums(s, cv, "nums", s.nums);
            s.i = 0; s.maxP = s.nums[0]; s.curMax = s.nums[0]; s.curMin = s.nums[0];
            log(`[Khởi tạo] Max Product Subarray`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length - 1) { s.done = true; s.outputText = String(`${s.maxP}`); log(`[KẾT QUẢ] ${s.maxP}`, "success"); return; }
            s.i++;
            const x = s.nums[s.i];
            const a = x * s.curMax, b = x * s.curMin;
            s.curMax = Math.max(x, a, b);
            s.curMin = Math.min(x, a, b);
            s.maxP = Math.max(s.maxP, s.curMax);
            log(`i=${s.i} x=${x} → max=${s.curMax} min=${s.curMin} best=${s.maxP}`, "info");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "best", value: s.maxP, cls: "success" }]);
            const stage = V.stage();
            V.section(stage, 1, "Kadane ±").appendChild(V.arrayRow(s.nums, { active: s.i }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 153 Find Minimum in Rotated Sorted Array */
    reg(153, {
        initialize(s, log, cv) {
            s.nums = [3, 4, 5, 1, 2];
            V.applyNums(s, cv, "nums", s.nums);
            s.lo = 0; s.hi = s.nums.length - 1;
            log(`[Khởi tạo] Min Rotated — [${s.nums.join(",")}]`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.lo >= s.hi) {
                s.done = true;
                s.outputText = String(`min = ${s.nums[s.lo]}`); log(`[KẾT QUẢ] min = ${s.nums[s.lo]}`, "success");
                return;
            }
            const mid = (s.lo + s.hi) >> 1;
            log(`mid=${mid} val=${s.nums[mid]}`, "info");
            if (s.nums[mid] > s.nums[s.hi]) s.lo = mid + 1;
            else s.hi = mid;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "lo/hi", value: `${s.lo}/${s.hi}`, cls: "accent" }, { label: "min?", value: s.nums[s.lo], cls: "success" }]);
            const stage = V.stage();
            V.section(stage, 1, "Binary search pivot").appendChild(V.arrayRow(s.nums, { pointers: [{ idx: s.lo, label: "lo▼" }, { idx: s.hi, label: "hi▼" }] }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 154 Find Minimum in Rotated Sorted Array II */
    reg(154, {
        initialize(s, log, cv) {
            s.nums = [2, 2, 2, 0, 1];
            V.applyNums(s, cv, "nums", s.nums);
            s.lo = 0; s.hi = s.nums.length - 1;
            log(`[Khởi tạo] Min Rotated II (dupes)`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.lo >= s.hi) { s.done = true; s.outputText = String(`min = ${s.nums[s.lo]}`); log(`[KẾT QUẢ] min = ${s.nums[s.lo]}`, "success"); return; }
            const mid = (s.lo + s.hi) >> 1;
            if (s.nums[mid] === s.nums[s.hi]) { s.hi--; log(`Dup biên — hi--`, "warn"); return; }
            if (s.nums[mid] > s.nums[s.hi]) s.lo = mid + 1;
            else s.hi = mid;
            log(`mid=${mid} → lo=${s.lo} hi=${s.hi}`, "info");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "lo/hi", value: `${s.lo}/${s.hi}`, cls: "accent" }]);
            const stage = V.stage();
            V.section(stage, 1, "BS + shrink dup").appendChild(V.arrayRow(s.nums, { pointers: [{ idx: s.lo, label: "lo▼" }, { idx: s.hi, label: "hi▼" }] }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 155 Min Stack */
    reg(155, {
        initialize(s, log, cv) {
            s.ops = ["push", -2, "push", 0, "push", -3, "getMin", "pop", "top", "getMin"];
            if (cv && cv.str) s.ops = String(cv.str).split(",").map(x => { const n = Number(x.trim()); return isNaN(n) ? x.trim() : n; });
            s.stack = []; s.minStack = []; s.i = 0;
            log(`[Khởi tạo] Min Stack ops`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.ops.length) { s.done = true; s.outputText = String(`stack=[${s.stack.join(",")}] min=${s.minStack[s.minStack.length - 1] ?? "—"}`); log(`[KẾT QUẢ] stack=[${s.stack.join(",")}] min=${s.minStack[s.minStack.length - 1] ?? "—"}`, "success"); return; }
            const op = s.ops[s.i];
            if (op === "push") {
                const v = s.ops[++s.i];
                s.stack.push(v);
                const m = s.minStack.length ? Math.min(s.minStack[s.minStack.length - 1], v) : v;
                s.minStack.push(m);
                log(`push(${v}) min→${m}`, "info");
            } else if (op === "pop") { s.stack.pop(); s.minStack.pop(); log(`pop()`, "warn"); }
            else if (op === "top") log(`top() = ${s.stack[s.stack.length - 1]}`, "info");
            else if (op === "getMin") log(`getMin() = ${s.minStack[s.minStack.length - 1]}`, "success");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "stack", value: s.stack.join(",") || "∅", cls: "accent" }, { label: "min", value: s.minStack[s.minStack.length - 1] ?? "—", cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "ops", value: cv.str || "push,-2,push,0,push,-3,getMin,pop,top,getMin" }], cv);
        }
    });

    /* 160 Intersection of Two Linked Lists */
    reg(160, {
        initialize(s, log, cv) {
            s.a = [4, 1, 8, 4, 5]; s.b = [5, 6, 1, 8, 4, 5];
            if (cv && cv.str) { const p = String(cv.str).split("|"); s.a = V.parseNums(p[0] || ""); s.b = V.parseNums(p[1] || ""); }
            s.lenA = s.a.length; s.lenB = s.b.length;
            s.ptrA = Math.max(0, s.lenA - s.lenB); s.ptrB = Math.max(0, s.lenB - s.lenA);
            s.phase = 0;
            log(`[Khởi tạo] Intersection lists`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.phase === 0) {
                if (s.ptrA < s.lenA) { log(`Align A: skip ${s.a[s.ptrA]}`, "info"); s.ptrA++; return; }
                if (s.ptrB < s.lenB) { log(`Align B: skip ${s.b[s.ptrB]}`, "info"); s.ptrB++; return; }
                s.phase = 1;
            }
            if (s.ptrA >= s.lenA) { s.done = true; s.outputText = String(`null (no intersection)`); log(`[KẾT QUẢ] null (no intersection)`, "warn"); return; }
            if (s.a[s.ptrA] === s.b[s.ptrB]) { s.done = true; s.outputText = String(`node val=${s.a[s.ptrA]} at i=${s.ptrA}`); log(`[KẾT QUẢ] node val=${s.a[s.ptrA]} at i=${s.ptrA}`, "success"); return; }
            log(`A[${s.ptrA}]=${s.a[s.ptrA]} vs B[${s.ptrB}]=${s.b[s.ptrB]}`, "info");
            s.ptrA++; s.ptrB++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "ptrA", value: s.ptrA, cls: "accent" }, { label: "ptrB", value: s.ptrB, cls: "warn" }]);
            const stage = V.stage();
            V.section(stage, 1, "List A").appendChild(V.arrayRow(s.a, { active: s.ptrA < s.a.length ? s.ptrA : -1 }));
            V.section(stage, 2, "List B").appendChild(V.arrayRow(s.b, { active: s.ptrB < s.b.length ? s.ptrB : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "listA|listB", value: cv.str || "4,1,8,4,5|5,6,1,8,4,5" }], cv);
        }
    });

    /* 162 Find Peak Element */
    reg(162, {
        initialize(s, log, cv) {
            s.nums = [1, 2, 1, 3, 5, 6, 4];
            V.applyNums(s, cv, "nums", s.nums);
            s.lo = 0; s.hi = s.nums.length - 1;
            log(`[Khởi tạo] Find Peak`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.lo === s.hi) { s.done = true; s.outputText = String(`peak index ${s.lo} (val=${s.nums[s.lo]})`); log(`[KẾT QUẢ] peak index ${s.lo} (val=${s.nums[s.lo]})`, "success"); return; }
            const mid = (s.lo + s.hi) >> 1;
            if (s.nums[mid] < s.nums[mid + 1]) { s.lo = mid + 1; log(`↑ slope → lo=${s.lo}`, "info"); }
            else { s.hi = mid; log(`↓ slope → hi=${s.hi}`, "info"); }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "lo/hi", value: `${s.lo}/${s.hi}`, cls: "accent" }]);
            const stage = V.stage();
            V.section(stage, 1, "Peak BS").appendChild(V.arrayRow(s.nums, { pointers: [{ idx: s.lo, label: "lo▼" }, { idx: s.hi, label: "hi▼" }] }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 164 Maximum Gap */
    reg(164, {
        initialize(s, log, cv) {
            s.nums = [3, 6, 9, 1];
            V.applyNums(s, cv, "nums", s.nums);
            s.sorted = s.nums.slice().sort((a, b) => a - b);
            s.i = 1; s.maxGap = 0;
            log(`[Khởi tạo] Maximum Gap`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.sorted.length) { s.done = true; s.outputText = String(`maxGap = ${s.maxGap}`); log(`[KẾT QUẢ] maxGap = ${s.maxGap}`, "success"); return; }
            const gap = s.sorted[s.i] - s.sorted[s.i - 1];
            s.maxGap = Math.max(s.maxGap, gap);
            log(`gap(${s.sorted[s.i - 1]},${s.sorted[s.i]}) = ${gap}`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "maxGap", value: s.maxGap, cls: "success" }]);
            const stage = V.stage();
            V.section(stage, 1, "Sorted gaps").appendChild(V.arrayRow(s.sorted, { active: s.i < s.sorted.length ? s.i : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 165 Compare Version Numbers */
    reg(165, {
        initialize(s, log, cv) {
            s.v1 = "1.01"; s.v2 = "1.001";
            if (cv && cv.str) { const p = String(cv.str).split("|"); s.v1 = p[0] || s.v1; s.v2 = p[1] || s.v2; }
            s.p1 = s.v1.split(".").map(Number); s.p2 = s.v2.split(".").map(Number);
            s.i = 0;
            log(`[Khởi tạo] Compare "${s.v1}" vs "${s.v2}"`, "info");
        },
        step(s, log) {
            if (s.done) return;
            const n = Math.max(s.p1.length, s.p2.length);
            if (s.i >= n) { s.done = true; s.outputText = String(`0 (equal)`); log(`[KẾT QUẢ] 0 (equal)`, "success"); return; }
            const a = s.p1[s.i] || 0, b = s.p2[s.i] || 0;
            log(`part ${s.i}: ${a} vs ${b}`, "info");
            if (a > b) { s.done = true; s.outputText = String(`1`); log(`[KẾT QUẢ] 1`, "success"); return; }
            if (a < b) { s.done = true; s.outputText = String(`-1`); log(`[KẾT QUẢ] -1`, "warn"); return; }
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "v1/v2", value: `${s.v1} / ${s.v2}`, cls: "warn" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "v1|v2", value: cv.str || "1.01|1.001" }], cv);
        }
    });

    /* 166 Fraction to Recurring Decimal */
    reg(166, {
        initialize(s, log, cv) {
            s.num = 4; s.den = 333;
            if (cv && cv.str) { const p = String(cv.str).split(","); if (p[0]) s.num = +p[0]; if (p[1]) s.den = +p[1]; }
            s.rem = Math.abs(s.num) % Math.abs(s.den);
            s.quot = Math.trunc(s.num / s.den);
            s.digits = String(Math.abs(s.quot));
            s.seen = {}; s.phase = 0;
            log(`[Khởi tạo] ${s.num}/${s.den}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.rem === 0) { s.done = true; s.outputText = String(`"${s.digits}"`); log(`[KẾT QUẢ] "${s.digits}"`, "success"); return; }
            if (s.seen[s.rem] !== undefined) {
                s.digits = s.digits.slice(0, s.seen[s.rem]) + "(" + s.digits.slice(s.seen[s.rem]) + ")";
                s.done = true;
                s.outputText = String(`"${s.digits}"`); log(`[KẾT QUẢ] "${s.digits}"`, "success");
                return;
            }
            s.seen[s.rem] = s.digits.length;
            s.rem *= 10;
            const d = Math.trunc(s.rem / Math.abs(s.den));
            s.rem = s.rem % Math.abs(s.den);
            s.digits += d;
            log(`digit ${d}, rem=${s.rem}`, "info");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "digits", value: s.digits, cls: "success" }, { label: "rem", value: s.rem, cls: "accent" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "num,den", value: cv.str || "4,333" }], cv);
        }
    });

    /* 167 Two Sum II */
    reg(167, {
        initialize(s, log, cv) {
            s.nums = [2, 7, 11, 15]; s.target = 9;
            V.applyNums(s, cv, "nums", s.nums);
            V.applyTarget(s, cv, 9);
            s.l = 0; s.r = s.nums.length - 1;
            log(`[Khởi tạo] Two Sum II target=${s.target}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            const sum = s.nums[s.l] + s.nums[s.r];
            log(`l=${s.l}(${s.nums[s.l]}) + r=${s.r}(${s.nums[s.r]}) = ${sum}`, "info");
            if (sum === s.target) { s.done = true; s.outputText = String(`[${s.l + 1}, ${s.r + 1}]`); log(`[KẾT QUẢ] [${s.l + 1}, ${s.r + 1}]`, "success"); return; }
            if (sum < s.target) s.l++; else s.r--;
            if (s.l >= s.r) { s.done = true; s.outputText = String(`none`); log(`[KẾT QUẢ] none`, "warn"); }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "l/r", value: `${s.l}/${s.r}`, cls: "accent" }, { label: "target", value: s.target, cls: "warn" }]);
            const stage = V.stage();
            V.section(stage, 1, "Sorted two-pointer").appendChild(V.arrayRow(s.nums, { pointers: [{ idx: s.l, label: "l▼" }, { idx: s.r, label: "r▼" }] }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [
                { type: "array", id: "lc-input-nums", label: "numbers", values: V.arrayValues(cv, s, s.nums) },
                { type: "target", id: "lc-input-target", label: "target", value: cv.target ?? s.target }
            ], cv);
        }
    });

    /* 168 Excel Sheet Column Title */
    reg(168, {
        initialize(s, log, cv) {
            s.n = 28;
            V.applyTarget(s, cv, 28);
            s.work = s.n; s.chars = [];
            log(`[Khởi tạo] Column Title n=${s.n}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.work <= 0) { s.done = true; s.outputText = String(`"${s.result}"`); s.result = s.chars.reverse().join(""); log(`[KẾT QUẢ] "${s.result}"`, "success"); return; }
            s.work--;
            const c = String.fromCharCode(65 + (s.work % 26));
            s.chars.push(c);
            log(`digit '${c}' ← n=${s.work}`, "info");
            s.work = Math.floor(s.work / 26);
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "n", value: s.n, cls: "accent" }, { label: "title", value: s.chars.slice().reverse().join("") || "…", cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "target", id: "lc-input-target", label: "columnNumber", value: cv.target ?? s.n }], cv);
        }
    });

    /* 169 Majority Element */
    reg(169, {
        initialize(s, log, cv) {
            s.nums = [2, 2, 1, 1, 1, 2, 2];
            V.applyNums(s, cv, "nums", s.nums);
            s.cand = s.nums[0]; s.count = 1; s.i = 1;
            log(`[Khởi tạo] Boyer-Moore majority`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) { s.done = true; s.outputText = String(`${s.cand}`); log(`[KẾT QUẢ] ${s.cand}`, "success"); return; }
            if (s.count === 0) { s.cand = s.nums[s.i]; s.count = 1; log(`New cand ${s.cand}`, "info"); }
            else if (s.nums[s.i] === s.cand) { s.count++; log(`+1 same (${s.count})`, "info"); }
            else { s.count--; log(`-1 diff (${s.count})`, "warn"); }
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "cand", value: s.cand, cls: "success" }, { label: "count", value: s.count, cls: "accent" }]);
            const stage = V.stage();
            V.section(stage, 1, "Vote").appendChild(V.arrayRow(s.nums, { active: s.i < s.nums.length ? s.i : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 171 Excel Sheet Column Number */
    reg(171, {
        initialize(s, log, cv) {
            s.col = "AB";
            if (cv && cv.str) s.col = V.parseStr(cv.str).toUpperCase();
            s.i = 0; s.ans = 0;
            log(`[Khởi tạo] Column Number "${s.col}"`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.col.length) { s.done = true; s.outputText = String(`${s.ans}`); log(`[KẾT QUẢ] ${s.ans}`, "success"); return; }
            const v = s.col.charCodeAt(s.i) - 64;
            s.ans = s.ans * 26 + v;
            log(`'${s.col[s.i]}' → ans=${s.ans}`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "ans", value: s.ans, cls: "success" }]);
            V.section(V.stage(), 1, "Title").appendChild(V.charRow(s.col, { active: s.i < s.col.length ? s.i : -1 }));
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "columnTitle", value: cv.str || "AB" }], cv);
        }
    });

    /* 172 Factorial Trailing Zeroes */
    reg(172, {
        initialize(s, log, cv) {
            s.n = 25;
            V.applyTarget(s, cv, 25);
            s.i = 5; s.zeros = 0;
            log(`[Khởi tạo] Trailing zeroes n=${s.n}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i > s.n) { s.done = true; s.outputText = String(`${s.zeros}`); log(`[KẾT QUẢ] ${s.zeros}`, "success"); return; }
            const add = Math.floor(s.n / s.i);
            s.zeros += add;
            log(`÷${s.i} → +${add} (total ${s.zeros})`, "info");
            s.i *= 5;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "divisor", value: s.i, cls: "accent" }, { label: "zeros", value: s.zeros, cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "target", id: "lc-input-target", label: "n", value: cv.target ?? s.n }], cv);
        }
    });

    /* 173 BST Iterator */
    reg(173, {
        initialize(s, log, cv) {
            s.nums = [7, 3, 15, null, null, 9, 20].map(v => v === null ? -1 : v);
            V.applyNums(s, cv, "nums", s.nums);
            s.stack = []; s.curr = 0; s.nextVal = null; s.hasNext = true;
            log(`[Khởi tạo] BST Iterator (inorder stack)`, "info");
        },
        step(s, log) {
            if (s.done) return;
            while (s.curr < s.nums.length && s.nums[s.curr] !== -1) {
                s.stack.push(s.curr);
                s.curr = s.curr * 2 + 1;
            }
            if (!s.stack.length) { s.done = true; s.outputText = String(`iterator exhausted`); s.hasNext = false; log(`[KẾT QUẢ] iterator exhausted`, "success"); return; }
            s.curr = s.stack.pop();
            s.nextVal = s.nums[s.curr];
            log(`next() → ${s.nextVal}`, "success");
            s.curr = s.curr * 2 + 2;
            if (!s.stack.length && (s.curr >= s.nums.length || s.nums.every((v, i) => i >= s.curr || v === -1))) {
                s.done = true;
                s.outputText = String(`last value ${s.nextVal}`); log(`[KẾT QUẢ] last value ${s.nextVal}`, "success");
            }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "stack", value: s.stack.length, cls: "accent" }, { label: "next", value: s.nextVal ?? "—", cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree (-1=null)", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 174 Dungeon Game */
    reg(174, {
        initialize(s, log, cv) {
            s.grid = [[-2, -3, 3], [-5, -10, 1], [10, 30, -5]];
            if (cv && cv.str) {
                const rows = String(cv.str).trim().split(/\r?\n/).map(l => l.split(",").map(x => parseInt(x.trim(), 10)));
                if (rows.length) s.grid = rows;
            }
            s.m = s.grid.length; s.n = s.grid[0].length;
            s.dp = Array.from({ length: s.m + 1 }, () => Array(s.n + 1).fill(Infinity));
            s.dp[s.m][s.n - 1] = s.dp[s.m - 1][s.n] = 1;
            s.r = s.m - 1; s.c = s.n - 1;
            log(`[Khởi tạo] Dungeon Game DP từ góc phải-dưới`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.r < 0) { s.done = true; s.outputText = String(s.dp[0][0]); log(`[KẾT QUẢ] min HP = ${s.dp[0][0]}`, "success"); return; }
            s.dp[s.r][s.c] = Math.max(1, Math.min(s.dp[s.r + 1][s.c], s.dp[s.r][s.c + 1]) - s.grid[s.r][s.c]);
            log(`dp[${s.r}][${s.c}]=${s.dp[s.r][s.c]} (cell ${s.grid[s.r][s.c]})`, "info");
            s.c--;
            if (s.c < 0) { s.c = s.n - 1; s.r--; }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "cell", value: s.done ? "done" : `(${s.r},${s.c})`, cls: "accent" }, { label: "start HP", value: s.dp[0][0] === Infinity ? "…" : s.dp[0][0], cls: "success" }]);
            if (V.renderMatrixGrid) {
                const stage = V.stage();
                V.section(stage, 1, "Grid").appendChild(V.renderMatrixGrid(s.grid, { active: s.done ? null : [Math.max(0, s.r), Math.max(0, s.c)] }));
                c.appendChild(stage);
            } else c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "textarea", id: "lc-input-str", label: "grid", value: cv.str || s.grid.map(r => r.join(",")).join("\n"), rows: 3 }], cv);
        }
    });

    /* 175 Combine Two Tables — SQL join sim */
    reg(175, {
        initialize(s, log, cv) {
            s.person = [{ id: 1, name: "Allen" }, { id: 2, name: "Bob" }];
            s.address = [{ pid: 2, city: "New York" }];
            s.i = 0; s.out = [];
            log(`[Khởi tạo] SQL #175 LEFT JOIN Person ⋈ Address`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.person.length) { s.done = true; s.outputText = JSON.stringify(s.out); log(`[KẾT QUẢ] ${JSON.stringify(s.out)}`, "success"); return; }
            const p = s.person[s.i];
            const addr = s.address.find(a => a.pid === p.id);
            const row = { FirstName: p.name.split(" ")[0] || p.name, LastName: p.name.split(" ")[1] || "", City: addr ? addr.city : null, State: addr ? addr.city : null };
            s.out.push(row);
            log(`Person id=${p.id} → city=${row.City ?? "null"}`, addr ? "info" : "warn");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "rows", value: s.out.length, cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "demo", value: cv.str || "Person+Address" }], cv);
        }
    });

    /* 176 Second Highest Salary */
    reg(176, {
        initialize(s, log, cv) {
            s.salaries = [100, 200, 300];
            if (cv && cv.nums) s.salaries = V.parseNums(cv.nums);
            s.sorted = [...new Set(s.salaries)].sort((a, b) => b - a);
            s.i = 0; s.second = null;
            log(`[Khởi tạo] SQL #176 DISTINCT ORDER BY DESC`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.sorted.length) {
                s.done = true;
                s.outputText = String(s.second ?? "null");
                s.outputText = String(`${s.second ?? "null"}`); log(`[KẾT QUẢ] ${s.second ?? "null"}`, s.second != null ? "success" : "warn");
                return;
            }
            log(`Rank ${s.i + 1}: salary=${s.sorted[s.i]}`, "info");
            if (s.i === 1) s.second = s.sorted[s.i];
            s.i++;
            if (s.i >= s.sorted.length && s.second == null) { s.done = true; s.outputText = String(`null`); log(`[KẾT QUẢ] null`, "warn"); }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "rank", value: s.i, cls: "accent" }, { label: "2nd", value: s.second ?? "null", cls: "success" }]);
            const stage = V.stage();
            V.section(stage, 1, "Salaries DESC").appendChild(V.arrayRow(s.sorted, { active: s.i < s.sorted.length ? s.i : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "salaries", values: V.arrayValues(cv, s, s.salaries) }], cv);
        }
    });

    /* 177 Nth Highest Salary */
    reg(177, {
        initialize(s, log, cv) {
            s.salaries = [100, 200, 300, 200]; s.N = 2;
            if (cv && cv.nums) s.salaries = V.parseNums(cv.nums);
            V.applyTarget(s, cv, 2);
            s.sorted = [...new Set(s.salaries)].sort((a, b) => b - a);
            s.i = 0;
            log(`[Khởi tạo] SQL #177 Nth=${s.N}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.sorted.length) { s.done = true; s.outputText = String(`null`); log(`[KẾT QUẢ] null`, "warn"); return; }
            log(`OFFSET ${s.i}: ${s.sorted[s.i]}`, "info");
            if (s.i + 1 === s.N) { s.done = true; s.outputText = String(`${s.sorted[s.i]}`); log(`[KẾT QUẢ] ${s.sorted[s.i]}`, "success"); return; }
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "N", value: s.N, cls: "warn" }, { label: "i", value: s.i, cls: "accent" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [
                { type: "array", id: "lc-input-nums", label: "salaries", values: V.arrayValues(cv, s, s.salaries) },
                { type: "target", id: "lc-input-target", label: "N", value: cv.target ?? s.N }
            ], cv);
        }
    });

    /* 178 Rank Scores */
    reg(178, {
        initialize(s, log, cv) {
            s.scores = [3, 3, 2, 1];
            if (cv && cv.nums) s.scores = V.parseNums(cv.nums);
            s.sorted = [...s.scores].sort((a, b) => b - a);
            s.rankMap = {}; s.i = 0; s.rank = 0; s.out = [];
            log(`[Khởi tạo] SQL #178 DENSE_RANK`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.scores.length) { s.done = true; s.outputText = String(`ranks ${JSON.stringify(s.out)}`); log(`[KẾT QUẢ] ranks ${JSON.stringify(s.out)}`, "success"); return; }
            const sc = s.scores[s.i];
            if (s.rankMap[sc] === undefined) { s.rank++; s.rankMap[sc] = s.rank; }
            s.out.push(s.rankMap[sc]);
            log(`score=${sc} → rank=${s.rankMap[sc]}`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }]);
            const stage = V.stage();
            V.section(stage, 1, "Scores → Rank").appendChild(V.arrayRow(s.out.length ? s.out : s.scores.map(() => "?"), {}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "scores", values: V.arrayValues(cv, s, s.scores) }], cv);
        }
    });

    /* 179 Consecutive Numbers */
    reg(179, {
        initialize(s, log, cv) {
            s.logs = [1, 1, 1, 2, 2, 1];
            if (cv && cv.nums) s.logs = V.parseNums(cv.nums);
            s.i = 2; s.found = [];
            log(`[Khởi tạo] SQL #179 3 consecutive same`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.logs.length) { s.done = true; s.outputText = String(`nums ${JSON.stringify(s.found)}`); log(`[KẾT QUẢ] nums ${JSON.stringify(s.found)}`, "success"); return; }
            if (s.logs[s.i] === s.logs[s.i - 1] && s.logs[s.i] === s.logs[s.i - 2]) {
                if (!s.found.includes(s.logs[s.i])) s.found.push(s.logs[s.i]);
                log(`Triple ${s.logs[s.i]} at i=${s.i}`, "success");
            } else log(`Window [${s.i - 2}..${s.i}] no triple`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "found", value: s.found.join(",") || "—", cls: "success" }]);
            const stage = V.stage();
            V.section(stage, 1, "Logs").appendChild(V.arrayRow(s.logs, { active: s.i < s.logs.length ? s.i : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "num", values: V.arrayValues(cv, s, s.logs) }], cv);
        }
    });

    /* 180 Customers Who Never Order */
    reg(180, {
        initialize(s, log, cv) {
            s.customers = ["Joe", "Henry", "Max"];
            s.orders = ["Henry"];
            if (cv && cv.str) { const p = String(cv.str).split("|"); s.customers = p[0].split(","); s.orders = (p[1] || "").split(",").filter(Boolean); }
            s.i = 0; s.out = [];
            log(`[Khởi tạo] SQL #180 anti-join Customers`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.customers.length) { s.done = true; s.outputText = String(`${JSON.stringify(s.out)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.out)}`, "success"); return; }
            const name = s.customers[s.i];
            if (!s.orders.includes(name)) { s.out.push(name); log(`${name} — no order`, "success"); }
            else log(`${name} — has order, skip`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "scan", value: s.i, cls: "accent" }, { label: "out", value: s.out.join(",") || "—", cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "customers|orders", value: cv.str || "Joe,Henry,Max|Henry" }], cv);
        }
    });

    /* 181 Duplicate Emails */
    reg(181, {
        initialize(s, log, cv) {
            s.emails = ["a@b.com", "c@d.com", "a@b.com"];
            if (cv && cv.str) s.emails = String(cv.str).split(",");
            s.seen = {}; s.i = 0; s.dups = [];
            log(`[Khởi tạo] SQL #181 GROUP BY email HAVING count>1`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.emails.length) {
                s.done = true;
                s.outputText = String(`${JSON.stringify(s.dups)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.dups)}`, "success");
                return;
            }
            const e = s.emails[s.i];
            s.seen[e] = (s.seen[e] || 0) + 1;
            if (s.seen[e] === 2 && !s.dups.includes(e)) { s.dups.push(e); log(`Duplicate "${e}"`, "warn"); }
            else log(`Count ${e} = ${s.seen[e]}`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "dups", value: s.dups.length, cls: "warn" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "emails", value: cv.str || "a@b.com,c@d.com,a@b.com" }], cv);
        }
    });

    /* 182 Rising Temperature */
    reg(182, {
        initialize(s, log, cv) {
            s.rows = [{ id: 1, t: 20 }, { id: 2, t: 25 }, { id: 3, t: 22 }];
            s.i = 1; s.out = [];
            log(`[Khởi tạo] SQL #182 t > prev day`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.rows.length) { s.done = true; s.outputText = String(`ids ${JSON.stringify(s.out)}`); log(`[KẾT QUẢ] ids ${JSON.stringify(s.out)}`, "success"); return; }
            const prev = s.rows[s.i - 1], cur = s.rows[s.i];
            if (cur.t > prev.t) { s.out.push(cur.id); log(`id=${cur.id}: ${cur.t}>${prev.t}`, "success"); }
            else log(`id=${cur.id}: ${cur.t}≤${prev.t}`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "day", value: s.i, cls: "accent" }, { label: "rising", value: s.out.join(",") || "—", cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "demo", value: cv.str || "Weather" }], cv);
        }
    });

    /* 183 Customers Who Never Order (variant) */
    reg(183, {
        initialize(s, log, cv) {
            s.customers = [1, 2, 3, 4]; s.orderCust = [2, 4];
            if (cv && cv.str) { const p = String(cv.str).split("|"); s.customers = V.parseNums(p[0]); s.orderCust = V.parseNums(p[1] || ""); }
            s.i = 0; s.out = [];
            log(`[Khởi tạo] SQL #183 NOT IN orders`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.customers.length) { s.done = true; s.outputText = String(`${JSON.stringify(s.out)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.out)}`, "success"); return; }
            const id = s.customers[s.i];
            if (!s.orderCust.includes(id)) { s.out.push({ id, name: "Cust" + id }); log(`id=${id} no order`, "success"); }
            else log(`id=${id} ordered`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "out", value: s.out.map(x => x.id).join(",") || "—", cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "custIds|orderIds", value: cv.str || "1,2,3,4|2,4" }], cv);
        }
    });

    /* 184 Department Highest Salary */
    reg(184, {
        initialize(s, log, cv) {
            s.rows = [{ dept: "IT", name: "Max", sal: 90000 }, { dept: "IT", name: "Jim", sal: 85000 }, { dept: "Sales", name: "Joe", sal: 70000 }];
            s.byDept = {}; s.i = 0; s.out = [];
            log(`[Khởi tạo] SQL #184 max salary per dept`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.rows.length) {
                s.out = Object.entries(s.byDept).map(([d, r]) => ({ Department: d, Employee: r.name, Salary: r.sal }));
                s.done = true;
                s.outputText = String(`${JSON.stringify(s.out)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.out)}`, "success");
                return;
            }
            const r = s.rows[s.i];
            if (!s.byDept[r.dept] || r.sal > s.byDept[r.dept].sal) {
                s.byDept[r.dept] = r;
                log(`${r.dept}: leader ${r.name} $${r.sal}`, "info");
            }
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "row", value: s.i, cls: "accent" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "demo", value: cv.str || "Employee" }], cv);
        }
    });

    /* 185 Department Top Three Salaries */
    reg(185, {
        initialize(s, log, cv) {
            s.rows = [{ dept: "IT", name: "A", sal: 100 }, { dept: "IT", name: "B", sal: 90 }, { dept: "IT", name: "C", sal: 80 }, { dept: "IT", name: "D", sal: 70 }];
            s.i = 0; s.groups = {};
            log(`[Khởi tạo] SQL #185 TOP 3 per department`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.rows.length) {
                s.out = [];
                Object.keys(s.groups).forEach(d => {
                    s.groups[d].sort((a, b) => b.sal - a.sal).slice(0, 3).forEach(r => s.out.push(r));
                });
                s.done = true;
                s.outputText = String(`${s.out.length} rows`); log(`[KẾT QUẢ] ${s.out.length} rows`, "success");
                return;
            }
            const r = s.rows[s.i];
            if (!s.groups[r.dept]) s.groups[r.dept] = [];
            s.groups[r.dept].push(r);
            log(`Add ${r.name} $${r.sal} → ${r.dept}`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "rows in", value: s.i, cls: "accent" }, { label: "top3 out", value: s.out ? s.out.length : "…", cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "demo", value: cv.str || "Employee" }], cv);
        }
    });

    /* 187 Repeated DNA Sequences */
    reg(187, {
        initialize(s, log, cv) {
            s.s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT";
            if (cv && cv.str) s.s = V.parseStr(cv.str);
            s.seen = {}; s.out = []; s.i = 0;
            log(`[Khởi tạo] Repeated DNA k=10`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i + 10 > s.s.length) { s.done = true; s.outputText = String(`${JSON.stringify(s.out)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.out)}`, "success"); return; }
            const sub = s.s.slice(s.i, s.i + 10);
            if (s.seen[sub]) {
                if (!s.out.includes(sub)) { s.out.push(sub); log(`Repeat "${sub}"`, "success"); }
            } else { s.seen[sub] = 1; log(`Seen "${sub}"`, "info"); }
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "found", value: s.out.length, cls: "success" }]);
            const stage = V.stage();
            V.section(stage, 1, "Genome").appendChild(V.charRow(s.s, { active: s.i + 10 <= s.s.length ? s.i : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "s", value: cv.str || s.s }], cv);
        }
    });

    /* 188 Best Time to Buy and Sell Stock IV */
    reg(188, {
        initialize(s, log, cv) {
            s.k = 2; s.prices = [3, 2, 6, 5, 0, 3];
            V.applyNums(s, cv, "nums", s.prices);
            if (cv && cv.target !== undefined && cv.target !== "") s.k = parseInt(cv.target, 10);
            s.dp = Array(s.k + 1).fill(0);
            s.i = 0;
            log(`[Khởi tạo] Stock IV k=${s.k}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.prices.length) { s.done = true; s.outputText = String(`max profit = ${s.dp[0]}`); log(`[KẾT QUẢ] max profit = ${s.dp[0]}`, "success"); return; }
            const p = s.prices[s.i];
            for (let t = s.k; t >= 1; t--) {
                s.dp[t] = Math.max(s.dp[t], s.dp[t - 1] - p);
                s.dp[t - 1] = Math.max(s.dp[t - 1], s.dp[t] + p);
            }
            log(`day ${s.i} price=${p} → profit=${s.dp[0]}`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "day", value: s.i, cls: "accent" }, { label: "profit", value: s.dp[0], cls: "success" }]);
            const stage = V.stage();
            V.section(stage, 1, "Prices").appendChild(V.arrayRow(s.prices, { active: s.i < s.prices.length ? s.i : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [
                { type: "array", id: "lc-input-nums", label: "prices", values: V.arrayValues(cv, s, s.prices) },
                { type: "target", id: "lc-input-target", label: "k", value: cv.target ?? s.k }
            ], cv);
        }
    });

    /* 189 Rotate Array */
    reg(189, {
        initialize(s, log, cv) {
            s.nums = [1, 2, 3, 4, 5, 6, 7]; s.k = 3;
            V.applyNums(s, cv, "nums", s.nums);
            if (cv && cv.target !== undefined && cv.target !== "") s.k = parseInt(cv.target, 10) % s.nums.length;
            s.phase = 0; s.work = s.nums.slice();
            log(`[Khởi tạo] Rotate k=${s.k}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            const rev = (a, l, r) => { while (l < r) { [a[l], a[r]] = [a[r], a[l]]; l++; r--; } };
            if (s.phase === 0) { rev(s.work, 0, s.work.length - 1); log(`Reverse all`, "info"); s.phase = 1; return; }
            if (s.phase === 1) { rev(s.work, 0, s.k - 1); log(`Reverse [0..${s.k - 1}]`, "info"); s.phase = 2; return; }
            rev(s.work, s.k, s.work.length - 1);
            s.done = true;
            s.outputText = String(`[${s.work.join(",")}]`); log(`[KẾT QUẢ] [${s.work.join(",")}]`, "success");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "phase", value: s.phase, cls: "accent" }, { label: "k", value: s.k, cls: "warn" }]);
            const stage = V.stage();
            V.section(stage, 1, "Array").appendChild(V.arrayRow(s.work, {}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [
                { type: "array", id: "lc-input-nums", label: "nums", values: V.arrayValues(cv, s, s.nums) },
                { type: "target", id: "lc-input-target", label: "k", value: cv.target ?? s.k }
            ], cv);
        }
    });

    /* 190 Reverse Bits */
    reg(190, {
        initialize(s, log, cv) {
            s.n = 43261596; s.work = s.n >>> 0; s.res = 0; s.bit = 0;
            V.applyTarget(s, cv, s.n);
            if (cv && cv.target !== undefined && cv.target !== "") s.work = parseInt(cv.target, 10) >>> 0;
            log(`[Khởi tạo] Reverse bits n=${s.work}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.bit >= 32) { s.done = true; s.outputText = String(`${s.res >>> 0}`); log(`[KẾT QUẢ] ${s.res >>> 0}`, "success"); return; }
            s.res = (s.res << 1) | (s.work & 1);
            s.work >>>= 1;
            log(`bit ${s.bit}: res=${s.res >>> 0}`, "info");
            s.bit++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "bit", value: s.bit, cls: "accent" }, { label: "result", value: s.res >>> 0, cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "target", id: "lc-input-target", label: "n", value: cv.target ?? s.n }], cv);
        }
    });

    /* 191 Number of 1 Bits */
    reg(191, {
        initialize(s, log, cv) {
            s.n = 11; s.work = s.n; s.count = 0;
            V.applyTarget(s, cv, 11);
            if (cv && cv.target !== undefined && cv.target !== "") s.work = parseInt(cv.target, 10);
            log(`[Khởi tạo] Hamming weight n=${s.work}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.work === 0) { s.done = true; s.outputText = String(`${s.count}`); log(`[KẾT QUẢ] ${s.count}`, "success"); return; }
            s.count += s.work & 1;
            log(`n=${s.work} → +${s.work & 1} (total ${s.count})`, "info");
            s.work >>>= 1;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "n", value: s.work, cls: "accent" }, { label: "ones", value: s.count, cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "target", id: "lc-input-target", label: "n", value: cv.target ?? s.n }], cv);
        }
    });

    /* 192 Word Frequency — Shell */
    reg(192, {
        initialize(s, log, cv) {
            s.lines = ["the day is sunny", "the day is sunny", "is is is the the the the"];
            if (cv && cv.str) s.lines = String(cv.str).trim().split(/\r?\n/);
            s.freq = {}; s.i = 0; s.wordIdx = 0; s.words = [];
            log(`[Khởi tạo] Shell #192 word frequency`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.lines.length) {
                s.top = Object.entries(s.freq).sort((a, b) => b[1] - a[1])[0];
                s.done = true;
                s.outputText = String(`${s.top ? s.top[0] + " " + s.top[1] : "empty"}`); log(`[KẾT QUẢ] ${s.top ? s.top[0] + " " + s.top[1] : "empty"}`, "success");
                return;
            }
            const words = s.lines[s.i].split(/\s+/);
            words.forEach(w => { s.freq[w] = (s.freq[w] || 0) + 1; });
            log(`Line ${s.i}: +${words.length} tokens`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "lines", value: s.i, cls: "accent" }, { label: "unique", value: Object.keys(s.freq).length, cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "textarea", id: "lc-input-str", label: "file lines", value: cv.str || s.lines.join("\n"), rows: 3 }], cv);
        }
    });

    /* 193 Valid Phone Numbers — Shell */
    reg(193, {
        initialize(s, log, cv) {
            s.lines = ["987-123-4567", "123 456 7890", "invalid"];
            if (cv && cv.str) s.lines = String(cv.str).trim().split(/\r?\n/);
            s.re = /^(\d{3}-|\(\d{3}\) )\d{3}-\d{4}$|^\d{3} \d{3} \d{4}$/;
            s.i = 0; s.valid = [];
            log(`[Khởi tạo] Shell #193 grep phone`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.lines.length) { s.done = true; s.outputText = String(`${JSON.stringify(s.valid)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.valid)}`, "success"); return; }
            const line = s.lines[s.i];
            const ok = /^\d{3}-\d{3}-\d{4}$/.test(line) || /^\d{3} \d{3} \d{4}$/.test(line);
            if (ok) { s.valid.push(line); log(`✓ "${line}"`, "success"); }
            else log(`✗ "${line}"`, "warn");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "line", value: s.i, cls: "accent" }, { label: "valid", value: s.valid.length, cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "textarea", id: "lc-input-str", label: "lines", value: cv.str || s.lines.join("\n"), rows: 3 }], cv);
        }
    });

    /* 194 Transpose File — Shell */
    reg(194, {
        initialize(s, log, cv) {
            s.lines = ["name age", "alice 21", "bob 22"];
            if (cv && cv.str) s.lines = String(cv.str).trim().split(/\r?\n/);
            s.cols = s.lines.map(l => l.split(/\s+/));
            s.r = 0; s.out = [];
            log(`[Khởi tạo] Shell #194 transpose columns`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.r >= s.cols[0].length) { s.done = true; s.outputText = String(`${JSON.stringify(s.out)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.out)}`, "success"); return; }
            const row = s.cols.map(c => c[s.r]).join(" ");
            s.out.push(row);
            log(`Row ${s.r}: "${row}"`, "info");
            s.r++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "col→row", value: s.r, cls: "accent" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "textarea", id: "lc-input-str", label: "file", value: cv.str || s.lines.join("\n"), rows: 3 }], cv);
        }
    });

    /* 195 Tenth Line — Shell */
    reg(195, {
        initialize(s, log, cv) {
            s.lines = Array.from({ length: 12 }, (_, i) => "Line " + (i + 1));
            if (cv && cv.str) s.lines = String(cv.str).trim().split(/\r?\n/);
            s.i = 0; s.target = 10;
            log(`[Khởi tạo] Shell #195 sed -n '10p'`, "info");
        },
        step(s, log) {
            if (s.done) return;
            s.i++;
            if (s.i < s.target) { log(`Skip line ${s.i}`, "info"); return; }
            s.done = true;
            const line = s.lines[s.target - 1] || "";
            s.outputText = String(`"${line}"`); log(`[KẾT QUẢ] "${line}"`, "success");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "line#", value: s.i, cls: "accent" }, { label: "target", value: s.target, cls: "warn" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "textarea", id: "lc-input-str", label: "file", value: cv.str || s.lines.join("\n"), rows: 4 }], cv);
        }
    });

    /* 196 Delete Duplicate Emails — SQL */
    reg(196, {
        initialize(s, log, cv) {
            s.emails = ["a@b.com", "a@b.com", "c@d.com"];
            if (cv && cv.str) s.emails = String(cv.str).split(",");
            s.keep = new Set(); s.i = 0; s.deleteCount = 0;
            log(`[Khởi tạo] SQL #196 DELETE dup keep min row`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.emails.length) { s.done = true; s.outputText = String(`deleted ${s.deleteCount} rows`); log(`[KẾT QUẢ] deleted ${s.deleteCount} rows`, "success"); return; }
            const e = s.emails[s.i];
            if (s.keep.has(e)) { s.deleteCount++; log(`DELETE "${e}"`, "warn"); }
            else { s.keep.add(e); log(`KEEP first "${e}"`, "info"); }
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "scan", value: s.i, cls: "accent" }, { label: "deleted", value: s.deleteCount, cls: "warn" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "emails", value: cv.str || "a@b.com,a@b.com,c@d.com" }], cv);
        }
    });

    /* 197 Rising Temperature — SQL (same pattern, distinct log) */
    reg(197, {
        initialize(s, log, cv) {
            s.temps = [30, 32, 31, 35];
            if (cv && cv.nums) s.temps = V.parseNums(cv.nums);
            s.i = 1; s.out = [];
            log(`[Khởi tạo] SQL #197 DATEDIFF rising`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.temps.length) { s.done = true; s.outputText = String(`day indices ${JSON.stringify(s.out.map(x => x + 1))}`); log(`[KẾT QUẢ] day indices ${JSON.stringify(s.out.map(x => x + 1))}`, "success"); return; }
            if (s.temps[s.i] > s.temps[s.i - 1]) { s.out.push(s.i); log(`Day ${s.i + 1}: ${s.temps[s.i]}>${s.temps[s.i - 1]}`, "success"); }
            else log(`Day ${s.i + 1}: not rising`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "day", value: s.i, cls: "accent" }]);
            const stage = V.stage();
            V.section(stage, 1, "Temperature").appendChild(V.arrayRow(s.temps, { active: s.i < s.temps.length ? s.i : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "temperature", values: V.arrayValues(cv, s, s.temps) }], cv);
        }
    });

    /* 199 Binary Tree Right Side View */
    reg(199, {
        initialize(s, log, cv) {
            s.nums = [1, 2, 3, null, 5, null, 4].map(v => v === null ? -1 : v);
            V.applyNums(s, cv, "nums", s.nums);
            s.levels = [[0]]; s.q = [0]; s.out = []; s.phase = 0;
            log(`[Khởi tạo] Right side view BFS`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (!s.q.length) {
                s.done = true;
                s.outputText = String(`[${s.out.join(",")}]`); log(`[KẾT QUẢ] [${s.out.join(",")}]`, "success");
                return;
            }
            const size = s.q.length;
            let last = -1;
            for (let k = 0; k < size; k++) {
                const idx = s.q.shift();
                if (s.nums[idx] !== -1) last = s.nums[idx];
                const l = idx * 2 + 1, r = idx * 2 + 2;
                if (l < s.nums.length && s.nums[l] !== -1) s.q.push(l);
                if (r < s.nums.length && s.nums[r] !== -1) s.q.push(r);
            }
            if (last !== -1) { s.out.push(last); log(`Level rightmost = ${last}`, "success"); }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "queue", value: s.q.length, cls: "accent" }, { label: "view", value: s.out.join("→") || "—", cls: "success" }]);
            const stage = V.stage();
            V.section(stage, 1, "Tree level-order").appendChild(V.arrayRow(s.nums.map(v => v === -1 ? "∅" : v), {}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree (-1=null)", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });
})();
