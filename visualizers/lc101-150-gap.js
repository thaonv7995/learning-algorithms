/* LC #132, #140, #143, #147–149 */
window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    const V = window.VizCore;
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

    reg(132, {
        initialize(s, log, cv) {
            s.s = "aab"; V.parseStr && (s.s = cv && cv.str ? V.parseStr(cv.str) : s.s);
            s.n = s.s.length; s.dp = Array(s.n + 1).fill(Infinity); s.dp[0] = 0; s.i = 1;
            log(`[Khởi tạo] Palindrome Partition II — "${s.s}"`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i > s.n) { s.done = true; log(`[KẾT QUẢ] min cuts = ${s.dp[s.n] - 1}`, "success"); return; }
            for (let j = 0; j < s.i; j++) {
                const sub = s.s.slice(j, s.i);
                if (sub === sub.split("").reverse().join("") && s.dp[j] + 1 < s.dp[s.i]) {
                    s.dp[s.i] = s.dp[j] + 1;
                    log(`Palindrome "${sub}" → dp[${s.i}]=${s.dp[s.i]}`, "info");
                }
            }
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "dp[i]", value: s.dp[s.i - 1] ?? "—", cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "s", value: cv.str || "aab" }], cv);
        }
    });

    reg(140, {
        initialize(s, log, cv) {
            s.s = "catsanddog"; s.words = ["cat", "cats", "and", "sand", "dog"];
            if (cv && cv.str) { const p = String(cv.str).split("|"); s.s = p[0] || s.s; if (p[1]) s.words = p[1].split(","); }
            s.res = []; s.start = 0; s.done = false;
            log(`[Khởi tạo] Word Break II`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.start >= s.s.length) { s.done = true; log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success"); return; }
            for (const w of s.words) {
                if (s.s.startsWith(w, s.start)) {
                    s.res.push(s.s.slice(0, s.start) + w + (s.start + w.length < s.s.length ? " " + s.s.slice(s.start + w.length) : ""));
                    log(`Thử từ "${w}" tại ${s.start}`, "info");
                    s.start += w.length;
                    break;
                }
            }
            if (s.start >= s.s.length) { s.done = true; log(`[KẾT QUẢ] paths found`, "success"); }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "start", value: s.start, cls: "accent" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "s|dict", value: cv.str || "catsanddog|cat,cats,and,sand,dog" }], cv);
        }
    });

    reg(143, {
        initialize(s, log, cv) {
            s.nums = [1, 2, 3, 4, 5];
            V.applyNums(s, cv, "nums", s.nums);
            s.mid = Math.ceil(s.nums.length / 2);
            s.phase = 0; s.done = false;
            log(`[Khởi tạo] Reorder List L→…→L`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.phase === 0) {
                s.tail = s.nums.slice(s.mid).reverse();
                log(`Reverse nửa sau: [${s.tail.join("→")}]`, "info");
                s.phase = 1; return;
            }
            s.result = [];
            for (let i = 0; i < s.mid; i++) {
                s.result.push(s.nums[i]);
                if (i < s.tail.length) s.result.push(s.tail[i]);
            }
            s.done = true;
            log(`[KẾT QUẢ] [${s.result.join("→")}]`, "success");
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "phase", value: s.phase, cls: "accent" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "list", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    reg(147, {
        initialize(s, log, cv) {
            s.nums = [4, 2, 1, 3];
            V.applyNums(s, cv, "nums", s.nums);
            s.i = 1; s.done = false;
            log(`[Khởi tạo] Insertion Sort List`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) { s.done = true; log(`[KẾT QUẢ] [${s.nums.join("→")}]`, "success"); return; }
            const key = s.nums[s.i];
            let j = s.i - 1;
            while (j >= 0 && s.nums[j] > key) { s.nums[j + 1] = s.nums[j]; j--; }
            s.nums[j + 1] = key;
            log(`Chèn ${key} → [${s.nums.join(",")}]`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }]);
            V.section(V.stage(), 1, "list").appendChild(V.arrayRow(s.nums, { active: s.i }));
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "list", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    reg(148, {
        initialize(s, log, cv) {
            s.nums = [4, 2, 1, 3];
            V.applyNums(s, cv, "nums", s.nums);
            s.stack = [0]; s.i = 1; s.done = false;
            log(`[Khởi tạo] Sort List (merge sort bottom-up sim)`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) {
                s.nums.sort((a, b) => a - b);
                s.done = true;
                log(`[KẾT QUẢ] [${s.nums.join("→")}]`, "success");
                return;
            }
            log(`Merge pass tại i=${s.i}`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "list", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    reg(149, {
        initialize(s, log, cv) {
            s.pts = [[1, 1], [2, 2], [3, 3]];
            s.i = 0; s.best = 1; s.done = false;
            log(`[Khởi tạo] Max Points on a Line`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.pts.length) { s.done = true; log(`[KẾT QUẢ] ${s.best} điểm`, "success"); return; }
            let local = 1;
            for (let j = 0; j < s.i; j++) {
                const dx = s.pts[s.i][0] - s.pts[j][0];
                const dy = s.pts[s.i][1] - s.pts[j][1];
                if (dx === 0 && dy === 0) continue;
                local++;
            }
            s.best = Math.max(s.best, local);
            log(`Điểm ${s.i}: best line = ${s.best}`, "info");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "max", value: s.best, cls: "success" }]);
            c.appendChild(V.stage());
        },
        renderControls(s, c) {
            c.innerHTML = '<span class="viz-ll-empty">3 điểm mẫu (1,1)(2,2)(3,3)</span>';
        }
    });
})();
