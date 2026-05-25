window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

    /* 137 Single Number II — bit count mod 3 */
    reg(137, {
        initialize(s, log, cv) {
            s.nums = [2, 2, 3, 2];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.i = 0; s.ones = 0; s.twos = 0;
            log(`[Khởi tạo] Single Number II — đếm bit mod 3`, "info");
        },
        step(s, log) {
            if (s.i >= s.nums.length) {
                s.done = true;
                log(`[KẾT QUẢ] ones=${s.ones} (số đơn độc)`, "success");
                return;
            }
            const n = s.nums[s.i];
            s.twos |= s.ones & n;
            s.ones ^= n;
            s.ones &= ~s.twos;
            s.twos &= ~s.ones;
            log(`Xử lý ${n} → ones=${s.ones}, twos=${s.twos}`, "info");
            s.i++;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [
                { label: "i", value: s.done ? "done" : s.i, cls: "accent" },
                { label: "ones", value: s.ones, cls: "success" },
                { label: "twos", value: s.twos, cls: "warn" }
            ]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "nums").appendChild(VizCore.arrayRow(s.nums, { active: s.done ? -1 : s.i }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 138 Copy List with Random Pointer — hash clone */
    reg(138, {
        initialize(s, log) {
            s.nodes = [{ val: 7, rand: 1 }, { val: 13, rand: 0 }, { val: 11, rand: 4 }, { val: 10, rand: 2 }, { val: 1, rand: 0 }];
            s.map = {}; s.i = 0; s.order = [];
            log(`[Khởi tạo] Clone list + random pointer`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nodes.length) {
                s.done = true;
                log(`[KẾT QUẢ] cloned ${s.order.length} nodes`, "success");
                return;
            }
            const id = s.i;
            s.map[id] = { val: s.nodes[id].val, rand: s.nodes[id].rand };
            s.order.push(id);
            log(`Clone node ${id} val=${s.nodes[id].val} random→${s.nodes[id].rand}`, "info");
            s.i++;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "cloned", value: s.order.length, cls: "success" }]);
            const stage = VizCore.stage();
            s.nodes.forEach((n, i) => {
                const d = document.createElement("div");
                d.style.cssText = "font-family:monospace;font-size:0.72rem;color:#86efac;margin:2px 0;";
                d.textContent = `${i}: val=${n.val} random→${n.rand}`;
                stage.appendChild(d);
            });
            c.appendChild(stage);
        },
        renderControls(s, c) {
            c.innerHTML = '<span class="viz-ll-empty">List mẫu 5 nút</span>';
        }
    });

    /* 139 Word Break — DP */
    reg(139, {
        initialize(s, log, cv) {
            s.str = "leetcode";
            s.dict = ["leet", "code"];
            if (cv && cv.str) {
                const p = String(cv.str).split("|");
                if (p[0]) s.str = VizCore.parseStr(p[0]);
                if (p[1]) s.dict = p[1].split(",").map(x => x.trim()).filter(Boolean);
            }
            s.dp = Array(s.str.length + 1).fill(false);
            s.dp[0] = true;
            s.i = 1;
            log(`[Khởi tạo] Word Break DP`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i > s.str.length) {
                s.done = true;
                log(`[KẾT QUẢ] ${s.dp[s.str.length]}`, "success");
                return;
            }
            for (let j = 0; j < s.i; j++) {
                if (s.dp[j] && s.dict.includes(s.str.slice(j, s.i))) {
                    s.dp[s.i] = true;
                    log(`dp[${s.i}]=true via "${s.str.slice(j, s.i)}"`, "success");
                    break;
                }
            }
            if (!s.dp[s.i]) log(`dp[${s.i}]=false`, "info");
            s.i++;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "i", value: s.done ? "done" : s.i, cls: "accent" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "s").appendChild(VizCore.charRow(s.str, {}));
            const sec = VizCore.section(stage, 2, "dp");
            s.dp.forEach((v, i) => {
                const d = document.createElement("span");
                d.style.cssText = `margin:0 4px;font-family:monospace;color:${v ? "#86efac" : "#64748b"}`;
                d.textContent = `[${i}]=${v}`;
                sec.appendChild(d);
            });
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "s|dict", value: cv.str || `${s.str}|${s.dict.join(",")}` }], cv);
        }
    });

    /* 141 Linked List Cycle — Floyd */
    reg(141, {
        initialize(s, log, cv) {
            s.nums = [3, 2, 0, -4];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.cycleAt = 1;
            s.slow = 0; s.fast = 0; s.step = 0;
            log(`[Khởi tạo] Floyd cycle detection`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.step >= 8) {
                s.hasCycle = true;
                s.done = true;
                log(`[KẾT QUẢ] hasCycle=true (slow==fast)`, "success");
                return;
            }
            s.slow = (s.slow + 1) % s.nums.length;
            s.fast = (s.fast + 2) % s.nums.length;
            log(`slow→${s.slow} fast→${s.fast}`, "info");
            if (s.slow === s.fast && s.step > 0) {
                s.hasCycle = true; s.done = true;
                log(`[KẾT QUẢ] hasCycle=true`, "success");
                return;
            }
            s.step++;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [
                { label: "slow", value: s.slow, cls: "warn" },
                { label: "fast", value: s.fast, cls: "accent" }
            ]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "List (cycle at index 1)").appendChild(
                VizCore.arrayRow(s.nums, { found: [s.slow, s.fast], active: s.fast })
            );
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "values", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 142 Linked List Cycle II — find entry */
    reg(142, {
        initialize(s, log) {
            s.nums = [3, 2, 0, -4]; s.entry = 1;
            s.phase = 0; s.slow = 0; s.fast = 0; s.meet = -1;
            log(`[Khởi tạo] Tìm nút vào cycle`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.phase === 0) {
                s.slow = (s.slow + 1) % s.nums.length;
                s.fast = (s.fast + 2) % s.nums.length;
                if (s.slow === s.fast) { s.meet = s.slow; s.phase = 1; s.slow = 0; s.fast = s.meet; log(`Gặp tại ${s.meet}`, "success"); }
                else log(`Floyd: slow=${s.slow} fast=${s.fast}`, "info");
                if (s.phase === 0 && s.slow === 0 && s.fast === 0) { s.done = true; log(`[KẾT QUẢ] entry=${s.entry}`, "success"); }
                return;
            }
            s.slow = (s.slow + 1) % s.nums.length;
            s.fast = (s.fast + 1) % s.nums.length;
            if (s.slow === s.fast) { s.entry = s.slow; s.done = true; log(`[KẾT QUẢ] entry index=${s.entry}`, "success"); }
            else log(`Reset: slow=${s.slow} fast=${s.fast}`, "info");
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "entry", value: s.done ? s.entry : "—", cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "List").appendChild(VizCore.arrayRow(s.nums, { found: s.done ? [s.entry] : [s.slow, s.fast] }));
            c.appendChild(stage);
        },
        renderControls(s, c) {
            c.innerHTML = '<span class="viz-ll-empty">Cycle mẫu entry=1</span>';
        }
    });

    /* 144 preorder traversal */
    reg(144, {
        initialize(s, log, cv) {
            s.nums = [1, -1, 2, 3];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.stack = [0]; s.res = []; s.i = 0;
            log(`[Khởi tạo] Preorder iterative`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (!s.stack.length) {
                s.done = true;
                log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success");
                return;
            }
            const idx = s.stack.pop();
            if (s.nums[idx] == null || s.nums[idx] === -1) return;
            s.res.push(s.nums[idx]);
            log(`Visit ${s.nums[idx]}`, "success");
            if (idx * 2 + 2 < s.nums.length) s.stack.push(idx * 2 + 2);
            if (idx * 2 + 1 < s.nums.length) s.stack.push(idx * 2 + 1);
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "result", value: s.res.join(","), cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "Tree array").appendChild(VizCore.arrayRow(s.nums, {}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 145 postorder */
    reg(145, {
        initialize(s, log, cv) {
            s.nums = [1, -1, 2, 3];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.order = [2, 3, 1]; s.i = 0; s.res = [];
            log(`[Khởi tạo] Postorder mẫu`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.order.length) {
                s.done = true;
                log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success");
                return;
            }
            s.res.push(s.nums[s.order[s.i]]);
            log(`Postorder: ${s.nums[s.order[s.i]]}`, "info");
            s.i++;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "result", value: s.res.join(","), cls: "success" }]);
            c.appendChild(VizCore.stage());
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 146 LRU Cache — get/put demo */
    reg(146, {
        initialize(s, log) {
            s.cap = 2;
            s.ops = [["put", 1, 1], ["put", 2, 2], ["get", 1], ["put", 3, 3], ["get", 2], ["put", 4, 4], ["get", 1], ["get", 3], ["get", 4]];
            s.cache = new Map(); s.i = 0; s.lastGet = null;
            log(`[Khởi tạo] LRU capacity=${s.cap}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.ops.length) {
                s.done = true;
                log(`[KẾT QUẢ] cache keys=[${[...s.cache.keys()].join(",")}]`, "success");
                return;
            }
            const op = s.ops[s.i];
            if (op[0] === "put") {
                if (s.cache.size >= s.cap && !s.cache.has(op[1])) {
                    const first = s.cache.keys().next().value;
                    s.cache.delete(first);
                    log(`Evict ${first}`, "warn");
                }
                s.cache.delete(op[1]);
                s.cache.set(op[1], op[2]);
                log(`put(${op[1]},${op[2]})`, "info");
            } else {
                const k = op[1];
                if (s.cache.has(k)) {
                    const v = s.cache.get(k);
                    s.cache.delete(k);
                    s.cache.set(k, v);
                    s.lastGet = v;
                    log(`get(${k})→${v}`, "success");
                } else {
                    s.lastGet = -1;
                    log(`get(${k})→-1`, "info");
                }
            }
            s.i++;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [
                { label: "op", value: s.done ? "done" : s.i, cls: "accent" },
                { label: "last get", value: s.lastGet != null ? s.lastGet : "—", cls: "success" }
            ]);
            const stage = VizCore.stage();
            [...s.cache.entries()].forEach(([k, v]) => {
                const d = document.createElement("div");
                d.style.cssText = "font-family:monospace;font-size:0.72rem;color:#86efac;";
                d.textContent = `${k} → ${v}`;
                stage.appendChild(d);
            });
            c.appendChild(stage);
        },
        renderControls(s, c) {
            c.innerHTML = '<span class="viz-ll-empty">LRU cap=2 demo ops</span>';
        }
    });

    /* 150 Evaluate RPN */
    reg(150, {
        initialize(s, log, cv) {
            s.tokens = ["2", "1", "+", "3", "*"];
            if (cv && cv.str) s.tokens = String(cv.str).split(",").map(x => x.trim()).filter(Boolean);
            s.stack = []; s.i = 0;
            log(`[Khởi tạo] RPN stack eval`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.tokens.length) {
                s.done = true;
                log(`[KẾT QUẢ] ${s.stack[0]}`, "success");
                return;
            }
            const t = s.tokens[s.i];
            if (/^-?\d+$/.test(t)) {
                s.stack.push(parseInt(t, 10));
                log(`Push ${t}`, "info");
            } else {
                const b = s.stack.pop(), a = s.stack.pop();
                let r = 0;
                if (t === "+") r = a + b;
                else if (t === "-") r = a - b;
                else if (t === "*") r = a * b;
                else r = Math.trunc(a / b);
                s.stack.push(r);
                log(`${a} ${t} ${b} = ${r}`, "success");
            }
            s.i++;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "stack", value: s.stack.join(","), cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "tokens").appendChild(VizCore.arrayRow(s.tokens, { active: s.done ? -1 : s.i }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "tokens", value: cv.str || s.tokens.join(",") }], cv);
        }
    });
})();
