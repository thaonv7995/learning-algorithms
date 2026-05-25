window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

    /* 121 — override lc-patterns with full buy/sell viz */
    reg(121, {
        initialize(s, log, cv) {
            s.nums = [7, 1, 5, 3, 6, 4];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.i = 0; s.minP = Infinity; s.minDay = 0;
            s.maxProfit = 0; s.buyDay = -1; s.sellDay = -1;
            log(`[Khởi tạo] Best Time I — một giao dịch`, "info");
        },
        step(s, log) {
            if (s.i >= s.nums.length) {
                s.done = true;
                log(`[KẾT QUẢ] maxProfit=${s.maxProfit}`, "success");
                return;
            }
            const p = s.nums[s.i];
            if (p < s.minP) { s.minP = p; s.minDay = s.i; log(`Min mới ${p} ngày ${s.i}`, "info"); }
            else {
                const profit = p - s.minP;
                if (profit > s.maxProfit) {
                    s.maxProfit = profit; s.buyDay = s.minDay; s.sellDay = s.i;
                    log(`Profit ${profit} — kỷ lục!`, "success");
                }
            }
            s.i++;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [
                { label: "i", value: s.done ? "done" : s.i, cls: "accent" },
                { label: "min", value: s.minP === Infinity ? "—" : s.minP, cls: "warn" },
                { label: "profit", value: s.maxProfit, cls: "success" }
            ]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "Prices").appendChild(VizCore.arrayRow(s.nums, {
                active: s.done ? -1 : s.i,
                found: [s.buyDay, s.sellDay].filter(x => x >= 0)
            }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "prices", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 122 unlimited transactions */
    reg(122, {
        initialize(s, log, cv) {
            s.nums = [7, 1, 5, 3, 6, 4];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.i = 1; s.profit = 0;
            log(`[Khởi tạo] Greedy — cộng mọi đoạn tăng`, "info");
        },
        step(s, log) {
            if (s.i >= s.nums.length) {
                s.done = true;
                log(`[KẾT QUẢ] profit=${s.profit}`, "success");
                return;
            }
            if (s.nums[s.i] > s.nums[s.i - 1]) {
                s.profit += s.nums[s.i] - s.nums[s.i - 1];
                log(`+${s.nums[s.i] - s.nums[s.i - 1]} (${s.nums[s.i - 1]}→${s.nums[s.i]})`, "success");
            } else log(`Không tăng — bỏ qua`, "info");
            s.i++;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "profit", value: s.profit, cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "Greedy peaks").appendChild(VizCore.arrayRow(s.nums, { active: s.i < s.nums.length ? s.i : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "prices", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 123 at most 2 transactions */
    reg(123, {
        initialize(s, log, cv) {
            s.nums = [3, 3, 5, 0, 0, 3, 1, 4];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.buy1 = s.buy2 = -Infinity; s.sell1 = s.sell2 = 0; s.i = 0;
            log(`[Khởi tạo] DP 2 giao dịch`, "info");
        },
        step(s, log) {
            if (s.i >= s.nums.length) {
                s.done = true;
                log(`[KẾT QUẢ] max=${s.sell2}`, "success");
                return;
            }
            const p = s.nums[s.i];
            s.buy1 = Math.max(s.buy1, -p);
            s.sell1 = Math.max(s.sell1, s.buy1 + p);
            s.buy2 = Math.max(s.buy2, s.sell1 - p);
            s.sell2 = Math.max(s.sell2, s.buy2 + p);
            log(`p=${p}: sell2=${s.sell2}`, "info");
            s.i++;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "sell2", value: s.sell2, cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "State machine").appendChild(VizCore.flowEquation([
                { label: "sell1", val: s.sell1, cls: "warn" },
                { op: "→" },
                { label: "sell2", val: s.sell2, cls: "success" }
            ]));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "prices", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 124 max path sum — override patterns */
    reg(124, {
        initialize(s, log, cv) {
            s.nums = [-10, 9, 20, -1, -1, 15, 7];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.best = -Infinity; s.i = 0;
            s.vals = s.nums.filter(v => v !== -1);
            log(`[Khởi tạo] Max path sum (rút gọn)`, "info");
        },
        step(s, log) {
            if (s.i >= s.vals.length) {
                s.done = true;
                log(`[KẾT QUẢ] maxGain=${s.best}`, "success");
                return;
            }
            s.best = Math.max(s.best, s.vals[s.i]);
            log(`Xét nút ${s.vals[s.i]}`, "info");
            s.i++;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "best", value: s.best, cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "Tree values").appendChild(VizCore.arrayRow(s.nums.map(v => v === -1 ? "∅" : v), {}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 126/127 word ladder — BFS layers */
    reg(127, {
        initialize(s, log, cv) {
            s.begin = "hit"; s.end = "cog";
            s.words = ["hot", "dot", "dog", "lot", "log", "cog"];
            if (cv && cv.str) {
                const p = String(cv.str).split("|");
                s.begin = p[0] || s.begin; s.end = p[1] || s.end;
            }
            s.q = [s.begin]; s.visited = new Set([s.begin]); s.depth = 1;
            log(`[Khởi tạo] BFS Word Ladder`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (!s.q.length) {
                s.done = true; s.ans = 0;
                log(`[KẾT QUẢ] 0 — không tới được`, "warn");
                return;
            }
            const w = s.q.shift();
            if (w === s.end) {
                s.done = true; s.ans = s.depth;
                log(`[KẾT QUẢ] ${s.depth} bước`, "success");
                return;
            }
            for (const t of s.words) {
                if (s.visited.has(t)) continue;
                let diff = 0;
                for (let i = 0; i < w.length; i++) if (w[i] !== t[i]) diff++;
                if (diff === 1) {
                    s.q.push(t); s.visited.add(t);
                    log(`${w} → ${t}`, "info");
                }
            }
            if (!s.q.length && !s.done) {
                s.depth++;
                log(`Tăng depth=${s.depth}`, "info");
            }
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "depth", value: s.depth, cls: "accent" }, { label: "queue", value: s.q.length, cls: "warn" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "BFS").appendChild(VizCore.charRow(`${s.begin} → … → ${s.end}`, {}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "begin|end", value: cv.str || `${s.begin}|${s.end}` }], cv);
        }
    });

    reg(126, {
        initialize(s, log, cv) {
            window.LeetCodeVisualizers[127].initialize(s, log, cv);
            s.allPaths = [];
            log(`[Khởi tạo] Word Ladder II — thu mọi đường ngắn nhất`, "info");
        },
        step(s, log) {
            window.LeetCodeVisualizers[127].step(s, log);
            if (s.done && s.ans) s.allPaths = [[s.begin, "…", s.end]];
        },
        render(s, c, st) { window.LeetCodeVisualizers[127].render(s, c, st); },
        renderControls(s, c, cv) { window.LeetCodeVisualizers[127].renderControls(s, c, cv); }
    });

    /* 128 consecutive — override patterns */
    reg(128, {
        initialize(s, log, cv) {
            s.nums = [100, 4, 200, 1, 3, 2];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.set = new Set(s.nums); s.i = 0; s.best = 0;
            log(`[Khởi tạo] HashSet + expand streak`, "info");
        },
        step(s, log) {
            if (s.i >= s.nums.length) {
                s.done = true;
                log(`[KẾT QUẢ] longest=${s.best}`, "success");
                return;
            }
            const x = s.nums[s.i];
            if (!s.set.has(x - 1)) {
                let len = 1, cur = x + 1;
                while (s.set.has(cur)) { len++; cur++; }
                if (len > s.best) { s.best = len; log(`Streak từ ${x} len=${len}`, "success"); }
            } else log(`Skip ${x} — không phải start`, "info");
            s.i++;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "best", value: s.best, cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "nums").appendChild(VizCore.arrayRow(s.nums, { active: s.i < s.nums.length ? s.i : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 129 root to leaf sum */
    reg(129, {
        initialize(s, log, cv) {
            s.nums = [1, 2, 3];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.sum = 0; s.total = 0; s.i = 0;
            log(`[Khởi tạo] DFS tích lũy số trên đường`, "info");
        },
        step(s, log) {
            if (s.i >= s.nums.length || s.nums[s.i] === -1) {
                s.i++;
                if (s.i >= s.nums.length) { s.done = true; log(`[KẾT QUẢ] total=${s.total}`, "success"); }
                return;
            }
            s.sum = s.sum * 10 + s.nums[s.i];
            log(`+${s.nums[s.i]} → partial=${s.sum}`, "info");
            s.i++;
            if (s.i >= s.nums.length) { s.total += s.sum; s.done = true; log(`[KẾT QUẢ] ${s.total}`, "success"); }
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "path", value: s.sum, cls: "accent" }, { label: "total", value: s.total, cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "Tree").appendChild(VizCore.arrayRow(s.nums.map(v => v === -1 ? "∅" : v), {}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 130 surrounded regions — grid DFS */
    reg(130, {
        initialize(s, log, cv) {
            s.grid = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]];
            if (cv && cv.str) {
                const rows = String(cv.str).trim().split(/\r?\n/).map(l => l.split(",").map(x => x.trim()));
                if (rows.length) s.grid = rows;
            }
            s.r = 0; s.c = 0; s.flipped = 0;
            log(`[Khởi tạo] Flip O không nối biên`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.r >= s.grid.length) {
                s.done = true;
                log(`[KẾT QUẢ] flipped=${s.flipped} (sim)`, "success");
                return;
            }
            const ch = s.grid[s.r][s.c];
            if (ch === "O" && (s.r === 0 || s.c === 0 || s.r === s.grid.length - 1 || s.c === s.grid[0].length - 1))
                log(`(${s.r},${s.c}) O biên — giữ`, "info");
            else if (ch === "O") { s.grid[s.r][s.c] = "X"; s.flipped++; log(`Flip (${s.r},${s.c})`, "warn"); }
            s.c++;
            if (s.c >= s.grid[0].length) { s.c = 0; s.r++; }
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "flip", value: s.flipped, cls: "warn" }]);
            const stage = VizCore.stage();
            if (VizCore.renderMatrixGrid)
                VizCore.section(stage, 1, "Board").appendChild(VizCore.renderMatrixGrid(s.grid.map(r => r.map(c => c === "O" ? 1 : 0)), {}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "textarea", id: "lc-input-str", label: "board O/X rows", value: cv.str || s.grid.map(r => r.join(",")).join("\n"), rows: 4 }], cv);
        }
    });

    /* 134 gas station */
    reg(134, {
        initialize(s, log, cv) {
            s.gas = [1, 2, 3, 4, 5]; s.cost = [3, 4, 5, 1, 2];
            VizCore.applyNums(s, cv, "nums", s.gas);
            if (cv && cv.str) s.cost = VizCore.parseNums(cv.str);
            s.tank = 0; s.start = 0; s.i = 0; s.found = -1;
            log(`[Khởi tạo] Tìm điểm xuất phát vòng`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.gas.length) {
                s.done = true;
                log(`[KẾT QUẢ] start=${s.found}`, s.found >= 0 ? "success" : "warn");
                return;
            }
            s.tank += s.gas[s.i] - s.cost[s.i];
            log(`i=${s.i} tank=${s.tank}`, s.tank < 0 ? "warn" : "info");
            if (s.tank < 0) { s.start = s.i + 1; s.tank = 0; log(`Reset start=${s.start}`, "warn"); }
            else s.found = s.start;
            s.i++;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "start", value: s.found, cls: "accent" }, { label: "tank", value: s.tank, cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "gas/cost").appendChild(VizCore.arrayRow(s.gas, { active: s.i < s.gas.length ? s.i : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [
                { type: "array", id: "lc-input-nums", label: "gas", values: VizCore.arrayValues(cv, s, s.gas) },
                { type: "string", id: "lc-input-str", label: "cost CSV", value: cv.str || s.cost.join(",") }
            ], cv);
        }
    });

    /* 135 candy */
    reg(135, {
        initialize(s, log, cv) {
            s.ratings = [1, 0, 2];
            VizCore.applyNums(s, cv, "nums", s.ratings);
            s.candies = s.ratings.map(() => 1);
            s.pass = 0; s.i = 1;
            log(`[Khởi tạo] Two pass candy`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.pass === 0) {
                if (s.i >= s.ratings.length) { s.pass = 1; s.i = s.ratings.length - 2; log(`Pass 2 phải→trái`, "info"); return; }
                if (s.ratings[s.i] > s.ratings[s.i - 1])
                    s.candies[s.i] = Math.max(s.candies[s.i], s.candies[s.i - 1] + 1);
                s.i++;
                return;
            }
            if (s.i < 0) {
                s.done = true;
                s.total = s.candies.reduce((a, b) => a + b, 0);
                log(`[KẾT QUẢ] ${s.total} kẹo`, "success");
                return;
            }
            if (s.ratings[s.i] > s.ratings[s.i + 1])
                s.candies[s.i] = Math.max(s.candies[s.i], s.candies[s.i + 1] + 1);
            s.i--;
        },
        render(s, c, st) {
            const total = s.candies.reduce((a, b) => a + b, 0);
            VizCore.statsBar(st, [{ label: "pass", value: s.pass ? "R→L" : "L→R", cls: "accent" }, { label: "total", value: s.done ? total : "…", cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "ratings / candies").appendChild(VizCore.arrayRow(s.candies, {}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "ratings", values: VizCore.arrayValues(cv, s, s.ratings) }], cv);
        }
    });

    /* 131 palindrome partition */
    reg(131, {
        initialize(s, log, cv) {
            s.str = "aab"; s.path = []; s.res = [];
            if (cv && cv.str) s.str = VizCore.parseStr(cv.str);
            s.start = 0;
            log(`[Khởi tạo] Backtracking partition palindrome`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.start >= s.str.length) {
                s.res.push(s.path.slice());
                s.done = true;
                log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success");
                return;
            }
            for (let end = s.start; end < s.str.length; end++) {
                const sub = s.str.slice(s.start, end + 1);
                const isPal = sub === sub.split("").reverse().join("");
                if (isPal) {
                    s.path.push(sub);
                    log(`Palindrome "${sub}"`, "success");
                    s.start = end + 1;
                    if (s.start >= s.str.length) {
                        s.res.push(s.path.slice());
                        s.done = true;
                        log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success");
                    }
                    return;
                }
            }
            s.done = true;
            log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success");
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "path", value: s.path.join("|") || "—", cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "String").appendChild(VizCore.charRow(s.str, {}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "s", value: cv.str || s.str }], cv);
        }
    });

    /* 133 clone graph — BFS nodes */
    reg(133, {
        initialize(s, log, cv) {
            s.adj = [[2, 4], [1, 3], [2, 4], [1, 3]];
            s.i = 0; s.clone = {}; s.order = [];
            log(`[Khởi tạo] Clone graph BFS`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.adj.length) {
                s.done = true;
                log(`[KẾT QUẢ] cloned ${Object.keys(s.clone).length} nodes`, "success");
                return;
            }
            const id = s.i + 1;
            if (!s.clone[id]) { s.clone[id] = { val: id, neighbors: [] }; s.order.push(id); }
            log(`Clone node ${id} → neighbors ${JSON.stringify(s.adj[s.i])}`, "info");
            s.i++;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "nodes", value: s.order.length, cls: "success" }]);
            const stage = VizCore.stage();
            s.adj.forEach((nb, i) => {
                const d = document.createElement("div");
                d.style.cssText = "font-family:monospace;font-size:0.72rem;color:#86efac;margin:2px 0;";
                d.textContent = `${i + 1}: [${nb.join(",")}]`;
                stage.appendChild(d);
            });
            c.appendChild(stage);
        },
        renderControls(s, c) {
            c.innerHTML = '<span class="viz-ll-empty">Graph mẫu 4 nút</span>';
        }
    });
})();
