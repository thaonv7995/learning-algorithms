window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    function buildTree(arr) {
        if (!arr.length || arr[0] == null || arr[0] === -1) return null;
        const nodes = arr.map(v => (v == null || v === -1 ? null : { val: v, left: null, right: null }));
        let j = 1;
        for (let i = 0; i < arr.length; i++) {
            if (!nodes[i]) continue;
            if (j < arr.length) nodes[i].left = nodes[j++];
            if (j < arr.length) nodes[i].right = nodes[j++];
        }
        return nodes[0];
    }

    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

    /* 106 inorder + postorder */
    reg(106, {
        initialize(s, log, cv) {
            s.in = [9, 3, 15, 20, 7];
            s.post = [9, 15, 7, 20, 3];
            if (cv && cv.str) {
                const p = String(cv.str).split("|");
                if (p[0]) s.in = VizCore.parseNums(p[0]);
                if (p[1]) s.post = VizCore.parseNums(p[1]);
            }
            s.root = s.post[s.post.length - 1];
            s.mid = s.in.indexOf(s.root);
            s.step = 0;
            log(`[Khởi tạo] post[-1]=${s.root} root, split in at ${s.mid}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.step === 0) {
                log(`Left in=[${s.in.slice(0, s.mid).join(",")}] post=[${s.post.slice(0, s.mid).join(",")}]`, "info");
                s.step = 1; return;
            }
            s.done = true;
            s.outputText = String(`Root=${s.root}, left size=${s.mid}, right size=${s.in.length - s.mid - 1}`); log(`[KẾT QUẢ] Root=${s.root}, left size=${s.mid}, right size=${s.in.length - s.mid - 1}`, "success");
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "root", value: s.root, cls: "accent" }, { label: "mid", value: s.mid, cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "Inorder / Postorder").appendChild(VizCore.arrayRow(s.in, { found: [s.mid] }));
            const sec2 = VizCore.section(stage, 2, "Postorder");
            sec2.appendChild(VizCore.arrayRow(s.post, { found: [s.post.length - 1] }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "inorder|postorder", value: cv.str || `${s.in.join(",")}|${s.post.join(",")}` }], cv);
        }
    });

    /* 107 level order bottom-up */
    reg(107, {
        initialize(s, log, cv) {
            s.nums = [3, 9, 20, -1, -1, 15, 7];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.root = buildTree(s.nums);
            s.q = s.root ? [s.root] : [];
            s.levels = [];
            log(`[Khởi tạo] BFS rồi reverse tầng`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (!s.q.length) {
                s.levels.reverse();
                s.done = true;
                s.outputText = String(`${JSON.stringify(s.levels)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.levels)}`, "success");
                return;
            }
            const size = s.q.length, row = [];
            for (let k = 0; k < size; k++) {
                const n = s.q.shift();
                row.push(n.val);
                if (n.left) s.q.push(n.left);
                if (n.right) s.q.push(n.right);
            }
            s.levels.push(row);
            log(`Tầng ${s.levels.length}: [${row.join(",")}]`, "info");
            if (!s.q.length) {
                s.levels.reverse();
                s.done = true;
                s.outputText = String(`${JSON.stringify(s.levels)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.levels)}`, "success");
            }
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "levels", value: s.levels.length, cls: "success" }]);
            const stage = VizCore.stage();
            const sec = VizCore.section(stage, 1, "Bottom-up order");
            sec.classList.add("viz-output-section");
            s.levels.forEach(lv => {
                const d = document.createElement("div");
                d.className = "viz-output-chip";
                d.textContent = `[${lv.join(", ")}]`;
                sec.appendChild(d);
            });
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 108 sorted array → BST */
    reg(108, {
        initialize(s, log, cv) {
            s.nums = [-10, -3, 0, 5, 9];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.lo = 0; s.hi = s.nums.length - 1;
            s.picks = [];
            log(`[Khởi tạo] Chọn mid làm root`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.lo > s.hi) {
                s.done = true;
                s.outputText = String(`picks=[${s.picks.join(",")}]`); log(`[KẾT QUẢ] picks=[${s.picks.join(",")}]`, "success");
                return;
            }
            const mid = Math.floor((s.lo + s.hi) / 2);
            s.picks.push(s.nums[mid]);
            log(`mid=${mid} val=${s.nums[mid]} range [${s.lo},${s.hi}]`, "success");
            s.hi = mid - 1;
            if (s.lo > s.hi) { s.lo = 0; s.hi = s.nums.length - 1; s.phase = "right"; }
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "picks", value: s.picks.join("→") || "—", cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "Sorted array").appendChild(
                VizCore.arrayRow(s.nums, { found: s.picks.map(v => s.nums.indexOf(v)).filter(i => i >= 0) })
            );
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 109 sorted list → BST (array view) */
    reg(109, {
        initialize(s, log, cv) {
            s.list = [-10, -3, 0, 5, 9];
            VizCore.applyNums(s, cv, "nums", s.list);
            s.mid = Math.floor((s.list.length - 1) / 2);
            s.root = s.list[s.mid];
            s.done = false;
            log(`[Khởi tạo] List→BST: root=nums[mid]=${s.root}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            s.done = true;
            s.outputText = String(`Root=${s.root}, left=[${s.list.slice(0, s.mid).join(",")}] right=[${s.list.slice(s.mid + 1).join(",")}]`); log(`[KẾT QUẢ] Root=${s.root}, left=[${s.list.slice(0, s.mid).join(",")}] right=[${s.list.slice(s.mid + 1).join(",")}]`, "success");
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "root", value: s.root, cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "Linked list view").appendChild(
                VizCore.arrayRow(s.list, { found: [s.mid], pointers: [{ idx: s.mid, label: "mid▼" }] })
            );
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "list", values: VizCore.arrayValues(cv, s, s.list) }], cv);
        }
    });

    /* 110 balanced tree */
    reg(110, {
        initialize(s, log, cv) {
            s.nums = [3, 9, 20, -1, -1, 15, 7];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.root = buildTree(s.nums);
            s.result = null;
            s.checking = s.root;
            log(`[Khởi tạo] Kiểm tra |h(L)-h(R)| ≤ 1`, "info");
        },
        height(n) {
            if (!n) return 0;
            return 1 + Math.max(this.height(n.left), this.height(n.right));
        },
        balanced(n) {
            if (!n) return true;
            const l = this.height(n.left), r = this.height(n.right);
            return Math.abs(l - r) <= 1 && this.balanced(n.left) && this.balanced(n.right);
        },
        step(s, log) {
            if (s.done) return;
            s.result = this.balanced(s.root);
            s.done = true;
            s.outputText = String(`${s.result} (h left=${this.height(s.root && s.root.left)}, h right=${this.height(s.root && s.root.right)})`); log(`[KẾT QUẢ] ${s.result} (h left=${this.height(s.root && s.root.left)}, h right=${this.height(s.root && s.root.right)})`, s.result ? "success" : "warn");
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "balanced", value: s.result ?? "…", cls: s.result ? "success" : "warn" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "Tree").appendChild(VizCore.arrayRow(s.nums.map(v => v === -1 ? "∅" : v), {}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 111 min depth */
    reg(111, {
        initialize(s, log, cv) {
            s.nums = [3, 9, 20, -1, -1, 15, 7];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.root = buildTree(s.nums);
            s.q = s.root ? [{ n: s.root, d: 1 }] : [];
            s.minDepth = 0;
            log(`[Khởi tạo] BFS đến lá đầu tiên`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (!s.q.length) { s.done = true; return; }
            const { n, d } = s.q.shift();
            if (!n.left && !n.right) {
                s.minDepth = d; s.done = true;
                s.outputText = String(`minDepth=${d} tại nút ${n.val}`); log(`[KẾT QUẢ] minDepth=${d} tại nút ${n.val}`, "success");
                return;
            }
            if (n.left) s.q.push({ n: n.left, d: d + 1 });
            if (n.right) s.q.push({ n: n.right, d: d + 1 });
            log(`Thăm ${n.val} depth=${d}`, "info");
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "queue", value: s.q.length, cls: "accent" }, { label: "min", value: s.minDepth || "…", cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "Tree").appendChild(VizCore.arrayRow(s.nums.map(v => v === -1 ? "∅" : v), {}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 112 path sum */
    reg(112, {
        initialize(s, log, cv) {
            s.nums = [5, 4, 8, 11, -1, -1, 13, 4, 7, 2, -1, -1, -1, 1];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.target = 22;
            VizCore.applyTarget(s, cv, 22);
            s.root = buildTree(s.nums);
            s.stack = [{ n: s.root, sum: 0 }];
            s.found = false;
            log(`[Khởi tạo] Path Sum target=${s.target}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (!s.stack.length) {
                s.done = true;
                s.outputText = String(`${s.found}`); log(`[KẾT QUẢ] ${s.found}`, s.found ? "success" : "warn");
                return;
            }
            const { n, sum } = s.stack.pop();
            if (!n) return;
            const ns = sum + n.val;
            if (!n.left && !n.right) {
                if (ns === s.target) { s.found = true; s.done = true; s.outputText = String(`true — lá ${n.val} sum=${ns}`); log(`[KẾT QUẢ] true — lá ${n.val} sum=${ns}`, "success"); }
                else log(`Lá ${n.val} sum=${ns} ≠ ${s.target}`, "info");
                return;
            }
            if (n.right) s.stack.push({ n: n.right, sum: ns });
            if (n.left) s.stack.push({ n: n.left, sum: ns });
            log(`DFS ${n.val} partial=${ns}`, "info");
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "target", value: s.target, cls: "warn" }, { label: "found", value: s.found, cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "Tree").appendChild(VizCore.arrayRow(s.nums.map(v => v === -1 ? "∅" : v), {}));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [
                { type: "array", id: "lc-input-nums", label: "tree", values: VizCore.arrayValues(cv, s, s.nums) },
                { type: "target", id: "lc-input-target", label: "target", value: cv.target ?? s.target }
            ], cv);
        }
    });

    /* 113 path sum II */
    reg(113, {
        initialize(s, log, cv) {
            s.nums = [5, 4, 8, 11, -1, -1, 13, 4, 7, 2, -1, -1, 5, 1];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.target = 22;
            VizCore.applyTarget(s, cv, 22);
            s.root = buildTree(s.nums);
            s.path = []; s.res = [];
            s.stack = [{ n: s.root, sum: 0 }];
            log(`[Khởi tạo] Thu mọi path sum=${s.target}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (!s.stack.length) {
                s.done = true;
                s.outputText = String(`${JSON.stringify(s.res)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success");
                return;
            }
            const { n, sum } = s.stack.pop();
            if (!n) return;
            const ns = sum + n.val;
            const p = [...(s.path || []), n.val];
            if (!n.left && !n.right && ns === s.target) {
                s.res.push(p);
                log(`Path [${p.join("→")}]`, "success");
            }
            if (n.right) s.stack.push({ n: n.right, sum: ns, path: p });
            if (n.left) s.stack.push({ n: n.left, sum: ns, path: p });
            s.path = p;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "paths", value: s.res.length, cls: "success" }]);
            const stage = VizCore.stage();
            const sec = VizCore.section(stage, 1, "Paths found");
            sec.classList.add("viz-output-section");
            VizCore.renderOutputItems(sec, s.res.map(p => p.join("→")), s.res.length ? s.res.length - 1 : -1, null);
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [
                { type: "array", id: "lc-input-nums", label: "tree", values: VizCore.arrayValues(cv, s, s.nums) },
                { type: "target", id: "lc-input-target", label: "target", value: cv.target ?? s.target }
            ], cv);
        }
    });

    /* 114 flatten to linked list */
    reg(114, {
        initialize(s, log, cv) {
            s.nums = [1, 2, 5, 3, 4, -1, 6];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.out = [];
            s.stack = [];
            s.i = 0;
            log(`[Khởi tạo] Reverse preorder → right,left,root`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.nums.length) {
                s.done = true;
                s.outputText = String(`[${s.out.join("→")}]`); log(`[KẾT QUẢ] [${s.out.join("→")}]`, "success");
                return;
            }
            const v = s.nums[s.i];
            if (v !== -1) { s.out.unshift(v); log(`prepend ${v}`, "info"); }
            s.i++;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "flat", value: s.out.join("→") || "—", cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "Preorder flatten sim").appendChild(
                VizCore.arrayRow(s.nums.map(v => v === -1 ? "∅" : v), { active: s.i < s.nums.length ? s.i : -1 })
            );
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 115 distinct subsequences — DP step */
    reg(115, {
        initialize(s, log, cv) {
            s.s = "rabbbit"; s.t = "rabbit";
            if (cv && cv.str) { const p = String(cv.str).split("|"); s.s = p[0] || s.s; s.t = p[1] || s.t; }
            s.dp = Array(s.t.length + 1).fill(0);
            s.dp[0] = 1;
            s.i = 0;
            log(`[Khởi tạo] DP subsequence s→t`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.i >= s.s.length) {
                s.done = true;
                s.outputText = String(`${s.dp[s.t.length]} cách`); log(`[KẾT QUẢ] ${s.dp[s.t.length]} cách`, "success");
                return;
            }
            const c = s.s[s.i];
            for (let j = s.t.length; j >= 1; j--)
                if (s.t[j - 1] === c) s.dp[j] += s.dp[j - 1];
            log(`s[${s.i}]='${c}' dp[${s.t.length}]=${s.dp[s.t.length]}`, "info");
            s.i++;
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "ways", value: s.dp[s.t.length], cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "Strings").appendChild(VizCore.charRow(s.s, { active: s.i < s.s.length ? s.i : -1 }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "s|t", value: cv.str || `${s.s}|${s.t}` }], cv);
        }
    });

    /* 116 next right pointers */
    reg(116, {
        initialize(s, log, cv) {
            s.nums = [1, 2, 3, 4, 5, 6, 7];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.root = buildTree(s.nums);
            s.q = s.root ? [s.root] : [];
            s.links = [];
            log(`[Khởi tạo] BFS connect next`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (!s.q.length) { s.done = true; s.outputText = String(`${s.links.length} liên kết`); log(`[KẾT QUẢ] ${s.links.length} liên kết`, "success"); return; }
            const size = s.q.length;
            for (let i = 0; i < size; i++) {
                const n = s.q.shift();
                if (i < size - 1 && s.q.length) {
                    s.links.push(`${n.val}→${s.q[0].val}`);
                    log(`Link ${n.val} → ${s.q[0].val}`, "info");
                }
                if (n.left) s.q.push(n.left);
                if (n.right) s.q.push(n.right);
            }
            if (!s.q.length) { s.done = true; s.outputText = String(`done`); log(`[KẾT QUẢ] done`, "success"); }
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "links", value: s.links.length, cls: "success" }]);
            const stage = VizCore.stage();
            const sec = VizCore.section(stage, 1, "next pointers");
            s.links.forEach(ln => {
                const d = document.createElement("div");
                d.className = "viz-output-chip";
                d.textContent = ln;
                sec.appendChild(d);
            });
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "perfect tree", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 117 next right II — same viz */
    reg(117, {
        initialize(s, log, cv) {
            s.nums = [1, 2, 3, 4, 5, -1, 7];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.root = buildTree(s.nums);
            s.q = s.root ? [s.root] : [];
            s.links = [];
            s.done = false;
            log(`[Khởi tạo] Next pointers (cây không đầy)`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (!s.q.length) {
                s.done = true;
                s.outputText = String(`${s.links.length} liên kết`); log(`[KẾT QUẢ] ${s.links.length} liên kết`, "success");
                return;
            }
            const size = s.q.length;
            for (let i = 0; i < size; i++) {
                const n = s.q.shift();
                if (i < size - 1 && s.q.length) {
                    s.links.push(`${n.val}→${s.q[0].val}`);
                    log(`Link ${n.val} → ${s.q[0].val}`, "info");
                }
                if (n.left) s.q.push(n.left);
                if (n.right) s.q.push(n.right);
            }
            if (!s.q.length) {
                s.done = true;
                s.outputText = String(`done`); log(`[KẾT QUẢ] done`, "success");
            }
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "links", value: s.links.length, cls: "success" }]);
            const stage = VizCore.stage();
            const sec = VizCore.section(stage, 1, "next pointers");
            s.links.forEach(ln => {
                const d = document.createElement("div");
                d.className = "viz-output-chip";
                d.textContent = ln;
                sec.appendChild(d);
            });
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    });

    /* 118 Pascal triangle */
    reg(118, {
        initialize(s, log, cv) {
            s.n = 5;
            VizCore.applyTarget(s, cv, 5);
            s.rows = [[1]];
            s.r = 1;
            log(`[Khởi tạo] Pascal n=${s.n}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.r >= s.n) { s.done = true; s.outputText = String(`${s.rows.length} hàng`); log(`[KẾT QUẢ] ${s.rows.length} hàng`, "success"); return; }
            const prev = s.rows[s.r - 1];
            const row = [1];
            for (let j = 1; j < s.r; j++) row.push(prev[j - 1] + prev[j]);
            row.push(1);
            s.rows.push(row);
            log(`Row ${s.r}: [${row.join(",")}]`, "info");
            s.r++;
            if (s.r >= s.n) { s.done = true; s.outputText = String(`done`); log(`[KẾT QUẢ] done`, "success"); }
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "rows", value: s.rows.length, cls: "success" }]);
            const stage = VizCore.stage();
            const sec = VizCore.section(stage, 1, "Pascal");
            sec.classList.add("viz-output-section");
            s.rows.forEach(row => {
                const d = document.createElement("div");
                d.className = "viz-output-chip";
                d.textContent = `[${row.join(", ")}]`;
                sec.appendChild(d);
            });
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "target", id: "lc-input-target", label: "numRows", value: cv.target ?? s.n }], cv);
        }
    });

    /* 119 Pascal row k */
    reg(119, {
        initialize(s, log, cv) {
            s.k = 3;
            VizCore.applyTarget(s, cv, 3);
            s.row = [1];
            s.r = 1;
            log(`[Khởi tạo] Chỉ hàng thứ ${s.k}`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.r > s.k) { s.done = true; s.outputText = String(`[${s.row.join(",")}]`); log(`[KẾT QUẢ] [${s.row.join(",")}]`, "success"); return; }
            const next = [1];
            for (let j = 1; j < s.r; j++) next.push(s.row[j - 1] + s.row[j]);
            next.push(1);
            s.row = next;
            log(`Row ${s.r}: [${s.row.join(",")}]`, "info");
            s.r++;
            if (s.r > s.k) { s.done = true; s.outputText = String(`[${s.row.join(",")}]`); log(`[KẾT QUẢ] [${s.row.join(",")}]`, "success"); }
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "row", value: s.row.join(","), cls: "success" }]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "Row k").appendChild(VizCore.arrayRow(s.row, { found: s.row.map((_, i) => i) }));
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "target", id: "lc-input-target", label: "rowIndex", value: cv.target ?? s.k }], cv);
        }
    });

    /* 120 triangle min path */
    reg(120, {
        initialize(s, log, cv) {
            s.tri = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]];
            if (cv && cv.str) {
                const rows = String(cv.str).trim().split(/\r?\n/).map(l => l.split(",").map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x))).filter(r => r.length);
                if (rows.length) s.tri = rows;
            }
            s.r = 1; s.dp = s.tri[0].slice();
            log(`[Khởi tạo] Min path top→bottom`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (s.r >= s.tri.length) {
                s.done = true;
                s.ans = Math.min(...s.dp);
                s.outputText = String(`min=${s.ans}`); log(`[KẾT QUẢ] min=${s.ans}`, "success");
                return;
            }
            const row = s.tri[s.r];
            const ndp = row.map((v, j) => {
                const a = j < s.dp.length ? s.dp[j] : Infinity;
                const b = j > 0 ? s.dp[j - 1] : Infinity;
                return v + Math.min(a, b);
            });
            log(`Row ${s.r}: dp=[${ndp.join(",")}]`, "info");
            s.dp = ndp; s.r++;
            if (s.r >= s.tri.length) {
                s.done = true; s.ans = Math.min(...s.dp);
                s.outputText = String(`min=${s.ans}`); log(`[KẾT QUẢ] min=${s.ans}`, "success");
            }
        },
        render(s, c, st) {
            VizCore.statsBar(st, [{ label: "row", value: s.r, cls: "accent" }, { label: "min", value: s.done ? s.ans : Math.min(...s.dp), cls: "success" }]);
            const stage = VizCore.stage();
            s.tri.forEach((row, ri) => {
                const sec = VizCore.section(stage, ri + 1, `Hàng ${ri}`);
                sec.appendChild(VizCore.arrayRow(row, { found: ri === s.r - 1 ? row.map((_, i) => i) : [] }));
            });
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "textarea", id: "lc-input-str", label: "triangle rows", value: cv.str || s.tri.map(r => r.join(",")).join("\n"), rows: 4 }], cv);
        }
    });
})();
