/* Dedicated visualizers for LC #76, #81–87, #90–93, #95, #97, #99, #100 */
window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    const V = window.VizCore;
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

    /* 76 Minimum Window Substring */
    reg(76, {
        initialize(s, log, cv) {
            s.s = "ADOBECODEBANC"; s.t = "ABC";
            if (cv && cv.str) { const p = String(cv.str).split("|"); s.s = p[0] || s.s; if (p[1]) s.t = p[1]; }
            s.need = {}; for (const c of s.t) s.need[c] = (s.need[c] || 0) + 1;
            s.have = 0; s.req = Object.keys(s.need).length;
            s.l = 0; s.best = ""; s.done = false;
            log(`[Khởi tạo] Min Window — s="${s.s}", t="${s.t}"`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.l >= s.s.length) {
                s.done = true;
                s.outputText = String(`"${s.best || ""}"`); log(`[KẾT QUẢ] "${s.best || ""}"`, "success");
                return;
            }
            let r = s.l;
            const cnt = {};
            let formed = 0;
            while (r < s.s.length) {
                const c = s.s[r];
                cnt[c] = (cnt[c] || 0) + 1;
                if (s.need[c] && cnt[c] === s.need[c]) formed++;
                if (formed === s.req) {
                    const win = s.s.slice(s.l, r + 1);
                    if (!s.best || win.length < s.best.length) s.best = win;
                    break;
                }
                r++;
            }
            log(`Bước ${s.stepIndex}: l=${s.l} → thử cửa sổ "${s.s.slice(s.l, r + 1)}"`, "info");
            s.l++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "l", value: s.l, cls: "accent" }, { label: "best", value: s.best || "—", cls: "success" }]);
            const stage = V.stage();
            V.section(stage, 1, "Sliding window").appendChild(V.charRow(s.s, { active: s.l < s.s.length ? s.l : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "s|t", value: cv.str || "ADOBECODEBANC|ABC" }], cv);
        }
    });

    /* 81 Search in Rotated Sorted Array II */
    reg(81, {
        initialize(s, log, cv) {
            s.nums = [2, 5, 6, 0, 0, 1, 2]; s.target = 0;
            V.applyNums(s, cv, "nums", s.nums);
            if (cv && cv.target !== undefined && cv.target !== "") s.target = parseInt(cv.target, 10);
            s.lo = 0; s.hi = s.nums.length - 1; s.found = -1; s.done = false;
            log(`[Khởi tạo] Search Rotated II — target=${s.target}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.lo > s.hi) { s.done = true; s.outputText = String(`${s.found}`); log(`[KẾT QUẢ] ${s.found}`, "success"); return; }
            const mid = (s.lo + s.hi) >> 1;
            if (s.nums[mid] === s.target) { s.found = mid; s.done = true; s.outputText = String(`index ${mid}`); log(`[KẾT QUẢ] index ${mid}`, "success"); return; }
            if (s.nums[s.lo] === s.nums[mid] && s.nums[mid] === s.nums[s.hi]) { s.lo++; s.hi--; log(`Dup biên — thu hẹp lo=${s.lo} hi=${s.hi}`, "warn"); return; }
            if (s.nums[s.lo] <= s.nums[mid]) {
                if (s.nums[s.lo] <= s.target && s.target < s.nums[mid]) s.hi = mid - 1; else s.lo = mid + 1;
            } else {
                if (s.nums[mid] < s.target && s.target <= s.hi) s.lo = mid + 1; else s.hi = mid - 1;
            }
            log(`mid=${mid} val=${s.nums[mid]} → lo=${s.lo} hi=${s.hi}`, "info");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "lo/hi", value: `${s.lo}/${s.hi}`, cls: "accent" }, { label: "target", value: s.target, cls: "warn" }]);
            const stage = V.stage();
            V.section(stage, 1, "nums").appendChild(V.arrayRow(s.nums, { pointers: [{ idx: s.lo, label: "lo▼" }, { idx: s.hi, label: "hi▼" }] }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [
                { type: "array", id: "lc-input-nums", label: "nums", values: V.arrayValues(cv, s, s.nums) },
                { type: "target", id: "lc-input-target", label: "target", value: cv.target ?? s.target }
            ], cv);
        }
    });

    /* 82 Remove Duplicates from Sorted List II — simulate as array */
    reg(82, {
        initialize(s, log, cv) {
            s.nums = [1, 2, 3, 3, 4, 4, 5];
            V.applyNums(s, cv, "nums", s.nums);
            s.i = 0; s.out = []; s.done = false;
            log(`[Khởi tạo] Remove Dup List II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) { s.done = true; s.outputText = String(`[${s.out.join("→")}]`); log(`[KẾT QUẢ] [${s.out.join("→")}]`, "success"); return; }
            const v = s.nums[s.i];
            let j = s.i + 1;
            while (j < s.nums.length && s.nums[j] === v) j++;
            if (j - s.i === 1) { s.out.push(v); log(`Giữ ${v}`, "info"); }
            else log(`Bỏ ${j - s.i}×${v}`, "warn");
            s.i = j;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "out", value: s.out.join("→") || "—", cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "list", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 83 Remove Duplicates from Sorted List */
    reg(83, {
        initialize(s, log, cv) {
            s.nums = [1, 1, 2, 3, 3];
            V.applyNums(s, cv, "nums", s.nums);
            s.i = 1; s.out = [s.nums[0]]; s.done = false;
            log(`[Khởi tạo] Remove Dup List — giữ một bản`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) { s.done = true; s.outputText = String(`[${s.out.join("→")}]`); log(`[KẾT QUẢ] [${s.out.join("→")}]`, "success"); return; }
            if (s.nums[s.i] !== s.out[s.out.length - 1]) { s.out.push(s.nums[s.i]); log(`Thêm ${s.nums[s.i]}`, "info"); }
            else log(`Bỏ trùng ${s.nums[s.i]}`, "warn");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "out", value: s.out.join("→"), cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "list", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 85 Maximal Rectangle — histogram heights demo */
    reg(85, {
        initialize(s, log, cv) {
            s.heights = [2, 1, 5, 6, 2, 3];
            V.applyNums(s, cv, "nums", s.heights);
            s.i = 0; s.stack = []; s.best = 0; s.done = false;
            log(`[Khởi tạo] Max Rectangle — histogram`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i > s.heights.length) { s.done = true; s.outputText = String(`maxArea=${s.best}`); log(`[KẾT QUẢ] maxArea=${s.best}`, "success"); return; }
            const h = s.i < s.heights.length ? s.heights[s.i] : 0;
            while (s.stack.length && (s.i === s.heights.length || s.heights[s.stack[s.stack.length - 1]] > h)) {
                const ht = s.heights[s.stack.pop()];
                const w = s.stack.length ? s.i - s.stack[s.stack.length - 1] - 1 : s.i;
                s.best = Math.max(s.best, ht * w);
                log(`Pop h=${ht} w=${w} → area ${ht * w}`, "info");
            }
            if (s.i < s.heights.length) { s.stack.push(s.i); log(`Push i=${s.i} h=${h}`, "info"); }
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: Math.min(s.i, s.heights.length), cls: "accent" }, { label: "max", value: s.best, cls: "success" }]);
            const stage = V.stage();
            V.section(stage, 1, "Histogram").appendChild(V.arrayRow(s.heights, { active: s.i < s.heights.length ? s.i : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "heights", values: V.arrayValues(cv, s, s.heights) }], cv);
        }
    });

    /* 86 Partition List */
    reg(86, {
        initialize(s, log, cv) {
            s.nums = [1, 4, 3, 2, 5, 2]; s.x = 3;
            V.applyNums(s, cv, "nums", s.nums);
            if (cv && cv.target !== undefined && cv.target !== "") s.x = parseInt(cv.target, 10);
            s.less = []; s.ge = []; s.i = 0; s.done = false;
            log(`[Khởi tạo] Partition x=${s.x}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) {
                s.done = true;
                s.result = s.less.concat(s.ge);
                s.outputText = String(`[${s.result.join("→")}]`); log(`[KẾT QUẢ] [${s.result.join("→")}]`, "success");
                return;
            }
            const v = s.nums[s.i];
            if (v < s.x) { s.less.push(v); log(`${v} < ${s.x} → less`, "info"); }
            else { s.ge.push(v); log(`${v} ≥ ${s.x} → ge`, "warn"); }
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "<x", value: s.less.length, cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [
                { type: "array", id: "lc-input-nums", label: "list", values: V.arrayValues(cv, s, s.nums) },
                { type: "target", id: "lc-input-target", label: "x", value: cv.target ?? s.x }
            ], cv);
        }
    });

    /* 87 Scramble String — simplified recursion trace */
    reg(87, {
        initialize(s, log, cv) {
            s.s1 = "great"; s.s2 = "rgeat";
            if (cv && cv.str) { const p = String(cv.str).split("|"); s.s1 = p[0] || s.s1; if (p[1]) s.s2 = p[1]; }
            s.queue = [[s.s1, s.s2]]; s.result = null; s.done = false;
            log(`[Khởi tạo] Scramble "${s.s1}" vs "${s.s2}"`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (!s.queue.length) { s.done = true; s.outputText = String(`${s.result}`); log(`[KẾT QUẢ] ${s.result}`, "success"); return; }
            const [a, b] = s.queue.shift();
            if (a === b) { s.result = true; s.done = true; log(`Khớp "${a}"`, "success"); return; }
            if (a.length <= 1) { s.result = false; s.done = true; log(`Không scramble`, "warn"); return; }
            const n = a.length;
            for (let i = 1; i < n; i++) {
                s.queue.push([a.slice(0, i), b.slice(0, i)]);
                log(`Thử split i=${i}: "${a.slice(0, i)}" | "${a.slice(i)}"`, "info");
                break;
            }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "queue", value: s.queue.length, cls: "accent" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "s1|s2", value: cv.str || "great|rgeat" }], cv);
        }
    });

    /* 90 Subsets II */
    reg(90, {
        initialize(s, log, cv) {
            s.nums = [1, 2, 2];
            V.applyNums(s, cv, "nums", s.nums);
            s.nums.sort((a, b) => a - b);
            s.i = 0; s.path = []; s.res = [[]]; s.done = false;
            log(`[Khởi tạo] Subsets II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) { s.done = true; s.outputText = String(`${s.res.length} subsets`); log(`[KẾT QUẢ] ${s.res.length} subsets`, "success"); return; }
            const withVal = s.path.concat(s.nums[s.i]);
            s.res.push(withVal.slice());
            s.path.push(s.nums[s.i]);
            log(`Thêm ${s.nums[s.i]} → [${withVal.join(",")}]`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "found", value: s.res.length, cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 91 Decode Ways */
    reg(91, {
        initialize(s, log, cv) {
            s.s = "226";
            if (cv && cv.str) s.s = V.parseStr(cv.str);
            s.dp = [1, 0]; s.i = 1; s.done = false;
            log(`[Khởi tạo] Decode Ways — "${s.s}"`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.s.length) {
                s.done = true;
                s.outputText = String(`${s.dp[s.i]} cách`); log(`[KẾT QUẢ] ${s.dp[s.i]} cách`, "success");
                return;
            }
            const one = s.s[s.i] !== "0" ? s.dp[s.i] : 0;
            const two = (s.s[s.i - 1] === "1" || (s.s[s.i - 1] === "2" && s.s[s.i] <= "6")) ? s.dp[s.i - 1] : 0;
            s.dp.push(one + two);
            log(`i=${s.i}: dp=${s.dp[s.i]} (1-digit=${one}, 2-digit=${two})`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "dp", value: s.dp[s.i] || 0, cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "s", value: cv.str || s.s }], cv);
        }
    });

    /* 92 Reverse Linked List II */
    reg(92, {
        initialize(s, log, cv) {
            s.nums = [1, 2, 3, 4, 5]; s.left = 2; s.right = 4;
            V.applyNums(s, cv, "nums", s.nums);
            if (cv && cv.str) { const p = String(cv.str).split(","); if (p[0]) s.left = +p[0]; if (p[1]) s.right = +p[1]; }
            s.work = s.nums.slice(); s.phase = 0; s.done = false;
            log(`[Khởi tạo] Reverse [${s.left},${s.right}]`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.phase === 0) {
                const seg = s.work.slice(s.left - 1, s.right).reverse();
                s.work.splice(s.left - 1, s.right - s.left + 1, ...seg);
                s.done = true;
                s.outputText = String(`[${s.work.join("→")}]`); log(`[KẾT QUẢ] [${s.work.join("→")}]`, "success");
            }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "list", value: s.work.join("→"), cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [
                { type: "array", id: "lc-input-nums", label: "list", values: V.arrayValues(cv, s, s.nums) },
                { type: "string", id: "lc-input-str", label: "left,right", value: cv.str || "2,4" }
            ], cv);
        }
    });

    /* 93 Restore IP Addresses */
    reg(93, {
        initialize(s, log, cv) {
            s.s = "25525511135";
            if (cv && cv.str) s.s = V.parseStr(cv.str);
            s.res = []; s.start = 0; s.parts = []; s.done = false;
            log(`[Khởi tạo] Restore IP — "${s.s}"`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.parts.length === 4) {
                if (s.start === s.s.length) s.res.push(s.parts.join("."));
                s.done = true;
                s.outputText = String(`${JSON.stringify(s.res)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success");
                return;
            }
            for (let len = 1; len <= 3 && s.start + len <= s.s.length; len++) {
                const seg = s.s.slice(s.start, s.start + len);
                if ((seg.length > 1 && seg[0] === "0") || parseInt(seg, 10) > 255) continue;
                s.parts.push(seg);
                log(`Part ${s.parts.length}: "${seg}"`, "info");
                s.start += len;
                if (s.parts.length === 4) break;
            }
            if (s.parts.length < 4) { s.done = true; s.outputText = String(`${JSON.stringify(s.res)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success"); }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "parts", value: s.parts.join(".") || "—", cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "s", value: cv.str || s.s }], cv);
        }
    });

    /* 95 Unique BST II — count trees for n=3 */
    reg(95, {
        initialize(s, log, cv) {
            s.n = 3;
            if (cv && cv.target !== undefined && cv.target !== "") s.n = parseInt(cv.target, 10) || 3;
            s.i = 1; s.catalan = [1, 1]; s.done = false;
            log(`[Khởi tạo] Unique BST II — n=${s.n}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i > s.n) {
                s.done = true;
                s.outputText = String(`${s.catalan[s.n]} cây BST`); log(`[KẾT QUẢ] ${s.catalan[s.n]} cây BST`, "success");
                return;
            }
            let v = 0;
            for (let j = 0; j < s.i; j++) v += s.catalan[j] * s.catalan[s.i - 1 - j];
            s.catalan.push(v);
            log(`C(${s.i}) = ${v}`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "n", value: s.n, cls: "accent" }, { label: "trees", value: s.catalan[s.n] || "…", cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "target", id: "lc-input-target", label: "n", value: cv.target ?? s.n }], cv);
        }
    });

    /* 97 Interleaving String */
    reg(97, {
        initialize(s, log, cv) {
            s.s1 = "aabcc"; s.s2 = "dbbca"; s.s3 = "aadbbcbcac";
            if (cv && cv.str) { const p = String(cv.str).split("|"); s.s1 = p[0] || s.s1; s.s2 = p[1] || s.s2; if (p[2]) s.s3 = p[2]; }
            s.i = 0; s.j = 0; s.k = 0; s.ok = true; s.done = false;
            log(`[Khởi tạo] Interleave — s3="${s.s3}"`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.k >= s.s3.length) { s.done = true; s.outputText = String(`${s.ok}`); log(`[KẾT QUẢ] ${s.ok}`, "success"); return; }
            const c = s.s3[s.k];
            if (s.i < s.s1.length && s.s1[s.i] === c) { s.i++; log(`Khớp s1[${s.i - 1}]='${c}'`, "info"); }
            else if (s.j < s.s2.length && s.s2[s.j] === c) { s.j++; log(`Khớp s2[${s.j - 1}]='${c}'`, "info"); }
            else { s.ok = false; s.done = true; s.outputText = String(`false`); log(`[KẾT QUẢ] false`, "warn"); return; }
            s.k++;
            if (s.k >= s.s3.length) { s.done = true; s.outputText = String(`${s.ok}`); log(`[KẾT QUẢ] ${s.ok}`, "success"); }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "k", value: s.k, cls: "accent" }, { label: "ok", value: s.ok, cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "s1|s2|s3", value: cv.str || "aabcc|dbbca|aadbbcbcac" }], cv);
        }
    });

    /* 99 Recover BST — swap two wrong nodes in inorder */
    reg(99, {
        initialize(s, log, cv) {
            s.nums = [3, 1, 4, 2];
            V.applyNums(s, cv, "nums", s.nums);
            s.sorted = s.nums.slice().sort((a, b) => a - b);
            s.i = 0; s.done = false;
            log(`[Khởi tạo] Recover BST (inorder)`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) {
                s.done = true;
                s.outputText = String(`[${s.sorted.join(",")}]`); log(`[KẾT QUẢ] [${s.sorted.join(",")}]`, "success");
                return;
            }
            if (s.nums[s.i] !== s.sorted[s.i]) log(`Swap node ${s.nums[s.i]} ↔ ${s.sorted[s.i]}`, "warn");
            else log(`Inorder OK tại ${s.nums[s.i]}`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "BST inorder", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 100 Same Tree */
    reg(100, {
        initialize(s, log, cv) {
            s.p = [1, 2, 3]; s.q = [1, 2, 3];
            if (cv && cv.str) { const parts = String(cv.str).split("|"); s.p = V.parseNums(parts[0] || ""); s.q = V.parseNums(parts[1] || ""); }
            s.i = 0; s.same = true; s.done = false;
            log(`[Khởi tạo] Same Tree — p=[${s.p.join(",")}] q=[${s.q.join(",")}]`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= Math.max(s.p.length, s.q.length)) {
                s.done = true;
                s.outputText = String(`${s.same}`); log(`[KẾT QUẢ] ${s.same}`, "success");
                return;
            }
            const a = s.p[s.i], b = s.q[s.i];
            if (a !== b) { s.same = false; s.done = true; s.outputText = String(`false tại i=${s.i}`); log(`[KẾT QUẢ] false tại i=${s.i}`, "warn"); return; }
            log(`Khớp nút ${a}`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "same", value: s.same, cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "p|q (level)", value: cv.str || "1,2,3|1,2,3" }], cv);
        }
    });
})();
