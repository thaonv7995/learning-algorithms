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

    function levelArr(root) {
        if (!root) return [];
        const out = [], q = [root];
        while (q.length) {
            const n = q.shift();
            if (!n) { out.push(-1); continue; }
            out.push(n.val);
            q.push(n.left || null);
            q.push(n.right || null);
            while (out.length > 1 && out[out.length - 1] === -1 && out[out.length - 2] === -1) out.pop();
        }
        while (out.length && out[out.length - 1] === -1) out.pop();
        return out;
    }

    function isMirror(a, b) {
        if (!a && !b) return true;
        if (!a || !b || a.val !== b.val) return false;
        return isMirror(a.left, b.right) && isMirror(a.right, b.left);
    }

    /* ── 101 Symmetric Tree ── */
    window.LeetCodeVisualizers[101] = {
        initialize(s, log, cv) {
            s.nums = [1, 2, 2, 3, 4, 4, 3];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.root = buildTree(s.nums);
            s.phase = "compare";
            s.left = s.root && s.root.left;
            s.right = s.root && s.root.right;
            s.stack = [];
            s.result = null;
            log(`[Khởi tạo] Symmetric Tree — so gương trái/phải`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (!s.pairs) {
                s.pairs = [];
                (function walk(a, b) {
                    if (!a && !b) return;
                    s.pairs.push([a, b]);
                    if (a && b) { walk(a.left, b.right); walk(a.right, b.left); }
                })(s.root && s.root.left, s.root && s.root.right);
                s.pi = 0;
            }
            if (s.pi >= s.pairs.length) {
                s.done = true;
                s.result = true;
                s.outputText = String(`true — cây đối xứng`); log(`[KẾT QUẢ] true — cây đối xứng`, "success");
                return;
            }
            const [a, b] = s.pairs[s.pi];
            if (!a && !b) { log(`Cặp null,null — OK`, "info"); s.pi++; return; }
            if (!a || !b || a.val !== b.val) {
                s.done = true;
                s.result = false;
                s.outputText = String(`false — ${a ? a.val : "null"} vs ${b ? b.val : "null"}`); log(`[KẾT QUẢ] false — ${a ? a.val : "null"} vs ${b ? b.val : "null"}`, "warn");
                return;
            }
            log(`Khớp ${a.val} (mirror)`, "success");
            s.pi++;
            if (s.pi >= s.pairs.length) {
                s.done = true;
                s.result = true;
                s.outputText = String(`true`); log(`[KẾT QUẢ] true`, "success");
            }
        },
        render(s, canvas, stats) {
            VizCore.statsBar(stats, [
                { label: "pair", value: s.pi != null ? `${s.pi}/${(s.pairs || []).length}` : "0", cls: "accent" },
                { label: "?", value: s.result ?? "…", cls: s.result ? "success" : "" }
            ]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "Cây (level-order)").appendChild(
                VizCore.arrayRow(s.nums.map(v => v === -1 ? "∅" : v), {})
            );
            canvas.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    };

    /* ── 102 Level Order Traversal ── */
    window.LeetCodeVisualizers[102] = {
        initialize(s, log, cv) {
            s.nums = [3, 9, 20, -1, -1, 15, 7];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.root = buildTree(s.nums);
            s.q = s.root ? [s.root] : [];
            s.levels = [];
            s.cur = [];
            s.phase = "poll";
            log(`[Khởi tạo] BFS level-order`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (!s.q.length) {
                if (s.cur.length) s.levels.push(s.cur.slice());
                s.done = true;
                s.outputText = String(`${s.levels.length} tầng`); log(`[KẾT QUẢ] ${s.levels.length} tầng`, "success");
                return;
            }
            const size = s.q.length;
            s.cur = [];
            for (let k = 0; k < size; k++) {
                const n = s.q.shift();
                if (!n) continue;
                s.cur.push(n.val);
                log(`Thêm ${n.val} vào tầng hiện tại`, "info");
                if (n.left) s.q.push(n.left);
                if (n.right) s.q.push(n.right);
            }
            s.levels.push(s.cur.slice());
            log(`Hoàn tất tầng ${s.levels.length}: [${s.cur.join(",")}]`, "success");
            if (!s.q.length) {
                s.done = true;
                s.outputText = String(`${JSON.stringify(s.levels)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.levels)}`, "success");
            }
        },
        render(s, canvas, stats) {
            VizCore.statsBar(stats, [
                { label: "queue", value: s.q.length, cls: "accent" },
                { label: "levels", value: s.levels.length, cls: "success" }
            ]);
            const stage = VizCore.stage();
            const sec = VizCore.section(stage, 1, "Output theo tầng");
            s.levels.forEach((lv, i) => {
                const d = document.createElement("div");
                d.className = "viz-output-chip" + (i === s.levels.length - 1 && !s.done ? " flash" : "");
                d.textContent = `[${lv.join(", ")}]`;
                sec.appendChild(d);
            });
            if (!s.levels.length) sec.appendChild(document.createTextNode("Chưa có tầng — nhấn Step…"));
            canvas.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    };

    /* ── 103 Zigzag Level Order ── */
    window.LeetCodeVisualizers[103] = {
        initialize(s, log, cv) {
            s.nums = [3, 9, 20, -1, -1, 15, 7];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.root = buildTree(s.nums);
            s.q = s.root ? [s.root] : [];
            s.levels = [];
            s.leftToRight = true;
            log(`[Khởi tạo] Zigzag BFS`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (!s.q.length) {
                s.done = true;
                s.outputText = String(`${JSON.stringify(s.levels)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.levels)}`, "success");
                return;
            }
            const size = s.q.length;
            const row = [];
            for (let k = 0; k < size; k++) {
                const n = s.q.shift();
                if (!n) continue;
                row.push(n.val);
                if (n.left) s.q.push(n.left);
                if (n.right) s.q.push(n.right);
            }
            if (!s.leftToRight) row.reverse();
            s.levels.push(row.slice());
            log(`Tầng ${s.levels.length} (${s.leftToRight ? "L→R" : "R→L"}): [${row.join(",")}]`, "info");
            s.leftToRight = !s.leftToRight;
            if (!s.q.length) {
                s.done = true;
                s.outputText = String(`${JSON.stringify(s.levels)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.levels)}`, "success");
            }
        },
        render(s, canvas, stats) {
            VizCore.statsBar(stats, [
                { label: "dir", value: s.leftToRight ? "L→R" : "R→L", cls: "accent" },
                { label: "levels", value: s.levels.length, cls: "success" }
            ]);
            const stage = VizCore.stage();
            const sec = VizCore.section(stage, 1, "Zigzag output");
            sec.classList.add("viz-output-section");
            s.levels.forEach((lv, i) => {
                const d = document.createElement("div");
                d.className = "viz-output-chip" + (i === s.levels.length - 1 ? " flash" : "");
                d.textContent = `[${lv.join(", ")}]`;
                sec.appendChild(d);
            });
            canvas.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    };

    /* ── 104 Maximum Depth ── */
    window.LeetCodeVisualizers[104] = {
        initialize(s, log, cv) {
            s.nums = [3, 9, 20, -1, -1, 15, 7];
            VizCore.applyNums(s, cv, "nums", s.nums);
            s.stack = [{ node: buildTree(s.nums), depth: 1 }];
            s.maxDepth = 0;
            log(`[Khởi tạo] DFS độ sâu max`, "info");
        },
        step(s, log) {
            if (s.done) return;
            if (!s.stack.length) {
                s.done = true;
                s.outputText = String(`maxDepth = ${s.maxDepth}`); log(`[KẾT QUẢ] maxDepth = ${s.maxDepth}`, "success");
                return;
            }
            const { node, depth } = s.stack.pop();
            if (!node) {
                log(`null — bỏ qua`, "info");
                return;
            }
            s.maxDepth = Math.max(s.maxDepth, depth);
            log(`Nút ${node.val} depth=${depth}, max=${s.maxDepth}`, "info");
            s.stack.push({ node: node.right, depth: depth + 1 });
            s.stack.push({ node: node.left, depth: depth + 1 });
        },
        render(s, canvas, stats) {
            VizCore.statsBar(stats, [
                { label: "stack", value: s.stack.length, cls: "accent" },
                { label: "maxDepth", value: s.maxDepth, cls: "success" }
            ]);
            const stage = VizCore.stage();
            VizCore.section(stage, 1, "Cây").appendChild(
                VizCore.arrayRow(s.nums.map(v => v === -1 ? "∅" : v), {})
            );
            canvas.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "tree", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
        }
    };

    /* ── 105 Construct from Preorder + Inorder ── */
    window.LeetCodeVisualizers[105] = {
        initialize(s, log, cv) {
            s.pre = [3, 9, 20, 15, 7];
            s.in = [9, 3, 15, 20, 7];
            if (cv && cv.nums) {
                const p = VizCore.parseNums(cv.nums);
                if (p.length >= 5) s.pre = p.slice(0, 5);
            }
            if (cv && cv.str) {
                const p = String(cv.str).split("|").map(x => x.trim());
                if (p[0]) s.pre = VizCore.parseNums(p[0]);
                if (p[1]) s.in = VizCore.parseNums(p[1]);
            }
            s.pi = 0;
            s.buildSteps = [];
            s._build(s.pre.slice(), s.in.slice());
            s.stepIdx = 0;
            s.treeArr = [];
            log(`[Khởi tạo] Build tree pre=[${s.pre}] in=[${s.in}]`, "info");
        },
        _build(pre, inn) {
            if (!pre.length || !inn.length) return;
            const root = pre[0];
            const mid = inn.indexOf(root);
            this.buildSteps.push({ root, leftIn: inn.slice(0, mid), rightIn: inn.slice(mid + 1) });
        },
        step(s, log) {
            if (s.done) return;
            if (s.stepIdx >= s.buildSteps.length) {
                s.done = true;
                s.treeArr = levelArr(buildTree([s.buildSteps[0].root, ...s.buildSteps[0].leftIn, ...s.buildSteps[0].rightIn].filter((v, i, a) => i === 0 || v !== undefined)));
                s.outputText = String(`Root=${s.buildSteps[0].root}, tách inorder tại index ${s.in.indexOf(s.buildSteps[0].root)}`); log(`[KẾT QUẢ] Root=${s.buildSteps[0].root}, tách inorder tại index ${s.in.indexOf(s.buildSteps[0].root)}`, "success");
                return;
            }
            const st = s.buildSteps[s.stepIdx];
            log(`Root=${st.root} | left=[${st.leftIn.join(",")}] right=[${st.rightIn.join(",")}]`, "info");
            s.stepIdx++;
            if (s.stepIdx >= s.buildSteps.length) {
                s.done = true;
                s.outputText = String(`Cây có gốc ${st.root}`); log(`[KẾT QUẢ] Cây có gốc ${st.root}`, "success");
            }
        },
        render(s, canvas, stats) {
            const st = s.buildSteps[Math.min(s.stepIdx, s.buildSteps.length - 1)] || {};
            VizCore.statsBar(stats, [
                { label: "root", value: st.root ?? "—", cls: "accent" },
                { label: "step", value: `${s.stepIdx}/${s.buildSteps.length}`, cls: "warn" }
            ]);
            const stage = VizCore.stage();
            const sec = VizCore.section(stage, 1, "Preorder / Inorder");
            sec.appendChild(VizCore.arrayRow(s.pre, { found: [0] }));
            sec.appendChild(VizCore.arrayRow(s.in, { found: st.root != null ? [s.in.indexOf(st.root)] : [] }));
            canvas.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [
                { type: "array", id: "lc-input-nums", label: "preorder", values: VizCore.arrayValues(cv, s, s.pre) },
                { type: "string", id: "lc-input-str", label: "inorder (CSV)", value: cv.str || s.in.join(",") }
            ], cv);
        }
    };
})();
