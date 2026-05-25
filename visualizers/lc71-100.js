window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    const V = window.VizCore;

    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

    /* 71 Simplify Path */
    reg(71, {
        initialize(s, log, cv) {
            s.path = "/home//foo/./bar/../baz/";
            if (cv && cv.str) s.path = V.parseStr(cv.str);
            s.parts = s.path.split("/");
            s.i = 0; s.stack = [];
            log(`[Khởi tạo] Simplify Path`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.parts.length) {
                s.done = true;
                s.result = "/" + s.stack.join("/");
                if (s.result === "/") s.result = "/";
                else if (!s.stack.length) s.result = "/";
                s.outputText = String(`"${s.result}"`); log(`[KẾT QUẢ] "${s.result}"`, "success");
                return;
            }
            const p = s.parts[s.i];
            if (p === "" || p === ".") log(`Bỏ "${p || 'empty'}"`, "info");
            else if (p === "..") {
                if (s.stack.length) { s.stack.pop(); log(`Pop → stack=[${s.stack.join("/")}]`, "info"); }
                else log(`".." ở root — bỏ qua`, "warn");
            } else { s.stack.push(p); log(`Push "${p}"`, "info"); }
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "stack", value: s.stack.join("/") || "∅", cls: "success" }]);
            const stage = V.stage();
            V.section(stage, 1, "Stack canonical").appendChild(V.charRow(s.path, { active: s.i < s.path.length ? s.i : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "path", value: cv.str || s.path }], cv);
        }
    });

    /* 72 Edit Distance */
    reg(72, {
        initialize(s, log, cv) {
            s.a = "horse"; s.b = "ros";
            if (cv && cv.str) { const p = String(cv.str).split("|"); if (p[0]) s.a = p[0].trim(); if (p[1]) s.b = p[1].trim(); }
            s.m = s.a.length; s.n = s.b.length;
            s.dp = Array.from({ length: s.m + 1 }, (_, i) => Array.from({ length: s.n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
            for (let i = 1; i <= s.m; i++) for (let j = 1; j <= s.n; j++) {
                if (s.a[i - 1] === s.b[j - 1]) s.dp[i][j] = s.dp[i - 1][j - 1];
                else s.dp[i][j] = 1 + Math.min(s.dp[i - 1][j], s.dp[i][j - 1], s.dp[i - 1][j - 1]);
            }
            s.i = 1; s.j = 1;
            log(`[Khởi tạo] Edit Distance "${s.a}" → "${s.b}"`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i > s.m) { s.done = true; s.outputText = String(`dp[${s.m}][${s.n}] = ${s.dp[s.m][s.n]}`); log(`[KẾT QUẢ] dp[${s.m}][${s.n}] = ${s.dp[s.m][s.n]}`, "success"); return; }
            log(`dp[${s.i}][${s.j}] = ${s.dp[s.i][s.j]}`, "info");
            s.j++;
            if (s.j > s.n) { s.j = 1; s.i++; }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "cell", value: s.done ? "done" : `(${s.i},${s.j})`, cls: "accent" }, { label: "dist", value: s.dp[s.m][s.n], cls: "success" }]);
            const stage = V.stage();
            const sec = V.section(stage, 1, "Bảng DP");
            sec.appendChild(V.charRow("a: " + s.a, {}));
            sec.appendChild(V.charRow("b: " + s.b, {}));
            const tbl = document.createElement("div");
            tbl.style.cssText = "font-family:monospace;font-size:0.65rem;color:#86efac;margin-top:6px;";
            tbl.textContent = `Kết quả = ${s.dp[s.m][s.n]}`;
            sec.appendChild(tbl);
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "string", id: "lc-input-str", label: "word1|word2", value: cv.str || `${s.a}|${s.b}` }], cv);
        }
    });

    /* 73 Set Matrix Zeroes */
    reg(73, {
        initialize(s, log, cv) {
            s.matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];
            if (cv && cv.str) {
                const rows = String(cv.str).trim().split(/\r?\n/).map(l => l.split(",").map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x))).filter(r => r.length);
                if (rows.length) s.matrix = rows;
            }
            s.r = 0; s.c = 0; s.zeros = [];
            log(`[Khởi tạo] Set Matrix Zeroes`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.r >= s.matrix.length) {
                s.zeros.forEach(([ri, ci]) => {
                    for (let j = 0; j < s.matrix[0].length; j++) s.matrix[ri][j] = 0;
                    for (let i = 0; i < s.matrix.length; i++) s.matrix[i][ci] = 0;
                });
                s.done = true;
                s.outputText = String(`Đã zero hóa ${s.zeros.length} hàng/cột`); log(`[KẾT QUẢ] Đã zero hóa ${s.zeros.length} hàng/cột`, "success");
                return;
            }
            if (s.matrix[s.r][s.c] === 0) { s.zeros.push([s.r, s.c]); log(`Zero tại (${s.r},${s.c})`, "warn"); }
            s.c++;
            if (s.c >= s.matrix[0].length) { s.c = 0; s.r++; }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "scan", value: s.done ? "done" : `(${s.r},${s.c})`, cls: "accent" }, { label: "zeros", value: s.zeros.length, cls: "warn" }]);
            const stage = V.stage();
            if (V.renderMatrixGrid) V.section(stage, 1, "Matrix").appendChild(V.renderMatrixGrid(s.matrix, { active: s.done ? null : [s.r, s.c] }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "textarea", id: "lc-input-str", label: "matrix", value: cv.str || s.matrix.map(r => r.join(",")).join("\n"), rows: 3 }], cv);
        }
    });

    /* 74 Search a 2D Matrix */
    reg(74, {
        initialize(s, log, cv) {
            s.matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]];
            s.target = 3;
            V.applyTarget(s, cv, 3);
            if (cv && cv.str) {
                const rows = String(cv.str).trim().split(/\r?\n/).map(l => l.split(",").map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x))).filter(r => r.length);
                if (rows.length) s.matrix = rows;
            }
            s.l = 0; s.r = s.matrix.length * s.matrix[0].length - 1;
            s.found = false;
            log(`[Khởi tạo] Search 2D target=${s.target}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.l > s.r) {
                s.done = true; s.ans = false;
                s.outputText = String(`false`); log(`[KẾT QUẢ] false`, "warn");
                return;
            }
            const mid = Math.floor((s.l + s.r) / 2);
            const cols = s.matrix[0].length;
            const val = s.matrix[Math.floor(mid / cols)][mid % cols];
            log(`mid=${mid} val=${val}`, "info");
            if (val === s.target) { s.done = true; s.outputText = String(`true`); s.found = true; s.ans = true; log(`[KẾT QUẢ] true`, "success"); return; }
            if (val < s.target) s.l = mid + 1; else s.r = mid - 1;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "L/R", value: `${s.l}/${s.r}`, cls: "accent" }, { label: "found", value: s.done ? s.found : "…", cls: "success" }]);
            const stage = V.stage();
            if (V.renderMatrixGrid) V.section(stage, 1, "BS trên mảng phẳng").appendChild(V.renderMatrixGrid(s.matrix, {}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [
                { type: "textarea", id: "lc-input-str", label: "matrix", value: cv.str || s.matrix.map(r => r.join(",")).join("\n"), rows: 3 },
                { type: "target", id: "lc-input-target", label: "target", value: cv.target ?? s.target }
            ], cv);
        }
    });

    /* 75 Sort Colors */
    reg(75, {
        initialize(s, log, cv) {
            s.nums = [2, 0, 2, 1, 1, 0];
            V.applyNums(s, cv, "nums", s.nums);
            s.p0 = 0; s.p2 = s.nums.length - 1; s.i = 0;
            log(`[Khởi tạo] Dutch National Flag`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i > s.p2) { s.done = true; s.outputText = String(`[${s.nums.join(",")}]`); log(`[KẾT QUẢ] [${s.nums.join(",")}]`, "success"); return; }
            const v = s.nums[s.i];
            if (v === 0) {
                [s.nums[s.p0], s.nums[s.i]] = [s.nums[s.i], s.nums[s.p0]];
                s.p0++; s.i++;
                log(`Swap 0 → p0`, "info");
            } else if (v === 2) {
                [s.nums[s.p2], s.nums[s.i]] = [s.nums[s.i], s.nums[s.p2]];
                s.p2--;
                log(`Swap 2 → p2`, "info");
            } else { s.i++; log(`1 giữ nguyên`, "info"); }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "p0/p2", value: `${s.p0}/${s.p2}`, cls: "warn" }]);
            const stage = V.stage();
            V.section(stage, 1, "3-way partition").appendChild(V.arrayRow(s.nums, {
                pointers: [{ idx: s.i, label: "i▼" }, { idx: s.p0, label: "p0▼" }, { idx: s.p2, label: "p2▼" }]
            }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums (0,1,2)", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 77 Combinations */
    reg(77, {
        initialize(s, log, cv) {
            s.n = 4; s.k = 2;
            V.applyTarget(s, cv, 4);
            if (cv && cv.nums) { const p = V.parseNums(cv.nums); if (p[0]) s.k = p[0]; }
            s.start = 1; s.path = []; s.res = [];
            log(`[Khởi tạo] C(${s.n},${s.k})`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.path.length === s.k) {
                s.res.push(s.path.slice());
                log(`Found [${s.path.join(",")}]`, "success");
                if (!s.path.length) { s.done = true; s.outputText = String(`${JSON.stringify(s.res)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success"); return; }
                s.start = s.path.pop() + 1;
                if (s.start > s.n) { s.done = true; s.outputText = String(`${s.res.length} tổ hợp`); log(`[KẾT QUẢ] ${s.res.length} tổ hợp`, "success"); }
                return;
            }
            if (s.start > s.n) {
                if (!s.path.length) { s.done = true; s.outputText = String(`${JSON.stringify(s.res)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success"); return; }
                s.start = s.path.pop() + 1; return;
            }
            s.path.push(s.start);
            log(`+${s.start}`, "info");
            s.start++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "path", value: s.path.join(",") || "—", cls: "accent" }, { label: "found", value: s.res.length, cls: "success" }]);
            const stage = V.stage();
            V.section(stage, 1, "Backtracking").appendChild(V.arrayRow(Array.from({ length: s.n }, (_, i) => i + 1), { found: s.path.map(x => x - 1) }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [
                { type: "target", id: "lc-input-target", label: "n", value: cv.target ?? s.n },
                { type: "array", id: "lc-input-nums", label: "k", values: V.arrayValues(cv, s, [s.k]) }
            ], cv);
        }
    });

    /* 78 Subsets */
    reg(78, {
        initialize(s, log, cv) {
            s.nums = [1, 2, 3];
            V.applyNums(s, cv, "nums", s.nums);
            s.i = 0; s.path = []; s.res = [[]];
            log(`[Khởi tạo] Subsets`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) {
                s.done = true;
                s.outputText = String(`${s.res.length} subsets`); log(`[KẾT QUẢ] ${s.res.length} subsets`, "success");
                return;
            }
            const withVal = s.path.concat(s.nums[s.i]);
            s.res.push(withVal.slice());
            s.path.push(s.nums[s.i]);
            log(`Thêm ${s.nums[s.i]} → [${withVal.join(",")}]`, "success");
            s.i++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "subsets", value: s.res.length, cls: "success" }]);
            const stage = V.stage();
            const sec = V.section(stage, 1, "Power set");
            s.res.slice(-5).forEach(sub => {
                const d = document.createElement("div");
                d.className = "viz-output-chip";
                d.textContent = `[${sub.join(", ")}]`;
                sec.appendChild(d);
            });
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 79 Word Search — simplified scan */
    reg(79, {
        initialize(s, log, cv) {
            s.board = [["A", "B", "C"], ["D", "E", "F"], ["G", "H", "I"]];
            s.word = "ABE";
            if (cv && cv.str) s.word = V.parseStr(cv.str);
            if (cv && cv.board) {
                const rows = String(cv.board).trim().split(/\r?\n/).map(l => l.split(",").map(x => x.trim()));
                if (rows.length) s.board = rows;
            }
            s.found = false; s.r = 0; s.c = 0;
            log(`[Khởi tạo] Word Search "${s.word}"`, "info");
        },
        step(s, log) {
            if (s.done) return;
            const ch = s.board[s.r][s.c];
            if (ch === s.word[0]) {
                s.found = true; s.done = true;
                s.outputText = String(`true — '${ch}' tại (${s.r},${s.c})`); log(`[KẾT QUẢ] true — '${ch}' tại (${s.r},${s.c})`, "success");
                return;
            }
            s.c++;
            if (s.c >= s.board[0].length) { s.c = 0; s.r++; }
            if (s.r >= s.board.length) { s.done = true; s.outputText = String(`false`); s.found = false; log(`[KẾT QUẢ] false`, "warn"); }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "word", value: s.word, cls: "warn" }, { label: "found", value: s.done ? s.found : "…", cls: "success" }]);
            const stage = V.stage();
            const grid = document.createElement("div");
            grid.style.cssText = "display:flex;flex-direction:column;gap:3px;";
            s.board.forEach((row, ri) => {
                const r = document.createElement("div");
                r.style.cssText = "display:flex;gap:3px;";
                row.forEach((cell, ci) => {
                    const el = document.createElement("div");
                    el.style.cssText = `width:28px;height:28px;display:flex;align-items:center;justify-content:center;border:1px solid #475569;border-radius:4px;font-weight:700;color:${ri === s.r && ci === s.c ? "#818cf8" : "#e2e8f0"};`;
                    el.textContent = cell;
                    r.appendChild(el);
                });
                grid.appendChild(r);
            });
            V.section(stage, 1, "Grid DFS (rút gọn)").appendChild(grid);
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [
                { type: "string", id: "lc-input-str", label: "word", value: cv.str || s.word },
                { type: "textarea", id: "lc-input-board", label: "board", value: cv.board || s.board.map(r => r.join(",")).join("\n"), rows: 3 }
            ], cv);
        }
    });

    /* 80 Remove Duplicates II */
    reg(80, {
        initialize(s, log, cv) {
            s.nums = [1, 1, 1, 2, 2, 3];
            V.applyNums(s, cv, "nums", s.nums);
            s.w = 2; s.r = 2;
            log(`[Khởi tạo] At most 2 duplicates`, "info");
        },
        step(s, log) {
            if (s.r >= s.nums.length) { s.done = true; s.outputText = String(`k=${s.w}`); log(`[KẾT QUẢ] k=${s.w}`, "success"); return; }
            if (s.nums[s.r] !== s.nums[s.w - 2]) {
                s.nums[s.w] = s.nums[s.r]; s.w++;
                log(`Giữ ${s.nums[s.r]}`, "info");
            } else log(`Skip ${s.nums[s.r]}`, "info");
            s.r++;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "w", value: s.w, cls: "success" }, { label: "r", value: s.r, cls: "accent" }]);
            const stage = V.stage();
            V.section(stage, 1, "In-place").appendChild(V.arrayRow(s.nums, { pointers: [{ idx: s.w - 1, label: "w▼" }, { idx: s.r, label: "r▼" }] }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 88 Merge Sorted Array */
    reg(88, {
        initialize(s, log, cv) {
            s.nums1 = [1, 2, 3, 0, 0, 0]; s.m = 3;
            s.nums2 = [2, 5, 6]; s.n = 3;
            V.applyNums(s, cv, "nums", s.nums1);
            s.p1 = s.m - 1; s.p2 = s.n - 1; s.w = s.m + s.n - 1;
            s.work = s.nums1.slice();
            log(`[Khởi tạo] Merge from end`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.w < 0) { s.done = true; s.outputText = String(`[${s.work.join(",")}]`); log(`[KẾT QUẢ] [${s.work.join(",")}]`, "success"); return; }
            const v1 = s.p1 >= 0 ? s.work[s.p1] : -Infinity;
            const v2 = s.p2 >= 0 ? s.nums2[s.p2] : -Infinity;
            if (v1 > v2) { s.work[s.w] = v1; s.p1--; log(`Place ${v1} from nums1`, "info"); }
            else { s.work[s.w] = v2; s.p2--; log(`Place ${v2} from nums2`, "info"); }
            s.w--;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "w", value: s.w, cls: "accent" }, { label: "p1/p2", value: `${s.p1}/${s.p2}`, cls: "warn" }]);
            const stage = V.stage();
            V.section(stage, 1, "Merge backward").appendChild(V.arrayRow(s.work, { active: s.w >= 0 ? s.w : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums1 (with zeros)", values: V.arrayValues(cv, s, s.nums1) }], cv);
        }
    });

    /* 89 Gray Code */
    reg(89, {
        initialize(s, log, cv) {
            s.n = 2;
            V.applyTarget(s, cv, 2);
            s.res = [0]; s.i = 1;
            log(`[Khởi tạo] Gray Code n=${s.n}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            const prev = s.res[s.res.length - 1];
            const next = prev ^ (1 << (s.i - 1));
            s.res.push(next);
            log(`G(${s.i}) = ${next}`, "info");
            s.i++;
            if (s.i >= (1 << s.n)) { s.done = true; s.outputText = String(`[${s.res.join(",")}]`); log(`[KẾT QUẢ] [${s.res.join(",")}]`, "success"); }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "seq", value: s.res.length, cls: "success" }]);
            const stage = V.stage();
            V.section(stage, 1, "Reflect & prefix").appendChild(V.arrayRow(s.res, { found: s.res.map((_, i) => i) }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "target", id: "lc-input-target", label: "n", value: cv.target ?? s.n }], cv);
        }
    });

    /* 94 Binary Tree Inorder */
    reg(94, {
        initialize(s, log, cv) {
            s.nums = [1, -1, 2, 3];
            V.applyNums(s, cv, "nums", s.nums);
            s.stack = []; s.i = 0; s.visit = []; s.curr = 0;
            log(`[Khởi tạo] Inorder traversal`, "info");
        },
        step(s, log) {
            if (s.done) return;
            while (s.curr < s.nums.length && s.nums[s.curr] !== -1) {
                s.stack.push(s.curr);
                s.curr = s.curr * 2 + 1;
            }
            if (!s.stack.length) { s.done = true; s.outputText = String(`[${s.visit.join(",")}]`); log(`[KẾT QUẢ] [${s.visit.join(",")}]`, "success"); return; }
            s.curr = s.stack.pop();
            if (s.nums[s.curr] !== -1) { s.visit.push(s.nums[s.curr]); log(`Visit ${s.nums[s.curr]}`, "success"); }
            s.curr = s.curr * 2 + 2;
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "stack", value: s.stack.length, cls: "accent" }, { label: "out", value: s.visit.join("→") || "—", cls: "success" }]);
            const stage = V.stage();
            V.section(stage, 1, "Iterative inorder").appendChild(V.arrayRow(s.nums.map(v => v === -1 ? "∅" : v), {}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree (level)", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 98 Validate BST */
    reg(98, {
        initialize(s, log, cv) {
            s.nums = [2, 1, 3];
            V.applyNums(s, cv, "nums", s.nums);
            s.i = 0; s.valid = true; s.prev = -Infinity;
            log(`[Khởi tạo] Validate BST`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length || s.nums[s.i] === -1) {
                s.i++;
                if (s.i >= s.nums.length) { s.done = true; s.outputText = String(s.valid); log(`[KẾT QUẢ] ${s.valid}`, s.valid ? "success" : "warn"); }
                return;
            }
            const v = s.nums[s.i];
            if (v <= s.prev) { s.valid = false; s.done = true; s.outputText = String(`false (${v} ≤ ${s.prev})`); log(`[KẾT QUẢ] false (${v} ≤ ${s.prev})`, "warn"); return; }
            s.prev = v;
            log(`OK ${v}`, "info");
            s.i++;
            if (s.i >= s.nums.length) { s.done = true; s.outputText = String(`true`); log(`[KẾT QUẢ] true`, "success"); }
        },
        render(s, c, st) {
            V.statsBar(st, [{ label: "prev", value: s.prev, cls: "warn" }, { label: "valid", value: s.done ? s.valid : "…", cls: "success" }]);
            const stage = V.stage();
            V.section(stage, 1, "Inorder check").appendChild(V.arrayRow(s.nums.map(v => v === -1 ? "∅" : v), { active: s.i < s.nums.length ? s.i : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree", values: V.arrayValues(cv, s, s.nums) }], cv);
        }
    });
})();
