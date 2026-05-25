window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

function _lc46Matrix(grid, opts) {
    opts = opts || {};
    const wrap = document.createElement("div");
    wrap.style.cssText = "display:inline-flex;flex-direction:column;gap:3px;padding:6px;background:#0f172a;border-radius:8px;border:1px solid #334155;";
    grid.forEach((row, ri) => {
        const rowEl = document.createElement("div");
        rowEl.style.cssText = "display:flex;gap:3px;";
        row.forEach((cell, ci) => {
            const el = document.createElement("div");
            const on = opts.active && opts.active[0] === ri && opts.active[1] === ci;
            el.style.cssText = `width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;font-family:monospace;font-size:0.75rem;border:1px solid ${on ? "#818cf8" : "#475569"};background:${on ? "#818cf833" : "#1e293b"};color:#f1f5f9;font-weight:600;`;
            el.textContent = cell;
            rowEl.appendChild(el);
        });
        wrap.appendChild(rowEl);
    });
    return wrap;
}

function _parseMatrix(text, fallback) {
    if (!text || !String(text).trim()) return fallback.map(r => r.slice());
    const rows = String(text).trim().split(/\r?\n/).map(l => l.split(",").map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x))).filter(r => r.length);
    return rows.length ? rows : fallback.map(r => r.slice());
}

function _lc46BuildPermSteps(nums) {
    const steps = [];
    const path = [];
    const used = nums.map(() => false);
    const allRes = [];

    function backtrack() {
        if (path.length === nums.length) {
            allRes.push(path.slice());
            steps.push({ type: "found", path: path.slice(), perm: path.slice(), total: allRes.length });
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.push(nums[i]);
            steps.push({ type: "pick", path: path.slice(), pick: i, used: used.slice() });
            backtrack();
            path.pop();
            used[i] = false;
            steps.push({ type: "backtrack", path: path.slice(), unpick: i, used: used.slice() });
        }
    }
    backtrack();
    return { steps, allRes };
}

function _lc47BuildPermSteps(nums) {
    const sorted = nums.slice().sort((a, b) => a - b);
    const steps = [];
    const path = [];
    const used = sorted.map(() => false);
    const allRes = [];

    function backtrack() {
        if (path.length === sorted.length) {
            allRes.push(path.slice());
            steps.push({ type: "found", path: path.slice(), perm: path.slice(), total: allRes.length });
            return;
        }
        for (let i = 0; i < sorted.length; i++) {
            if (used[i]) continue;
            if (i > 0 && sorted[i] === sorted[i - 1] && !used[i - 1]) {
                steps.push({ type: "skip", path: path.slice(), skip: i, used: used.slice() });
                continue;
            }
            used[i] = true;
            path.push(sorted[i]);
            steps.push({ type: "pick", path: path.slice(), pick: i, used: used.slice() });
            backtrack();
            path.pop();
            used[i] = false;
            steps.push({ type: "backtrack", path: path.slice(), unpick: i, used: used.slice() });
        }
    }
    backtrack();
    return { steps, allRes, sorted };
}

function _lc46RenderOutputPanel(sec, res, flashIdx, heroPerm, heroLabel) {
    if (heroPerm && heroPerm.length) {
        const hero = document.createElement("div");
        hero.className = "viz-output-hero" + (flashIdx >= 0 ? " flash" : "");
        if (heroLabel) {
            const lbl = document.createElement("div");
            lbl.className = "viz-output-hero-label";
            lbl.textContent = heroLabel;
            hero.appendChild(lbl);
        }
        hero.appendChild(VizCore.arrayRow(heroPerm, { found: heroPerm.map((_, i) => i) }));
        sec.appendChild(hero);
    }

    const wrap = document.createElement("div");
    wrap.className = "viz-output-list";
    if (!res.length) {
        const empty = document.createElement("div");
        empty.className = "viz-output-empty";
        empty.textContent = "Chưa có hoán vị — tiếp tục Step để thu kết quả…";
        wrap.appendChild(empty);
    } else {
        res.forEach((perm, idx) => {
            const chip = document.createElement("div");
            chip.className = "viz-output-chip" + (idx === flashIdx ? " flash" : "");
            chip.textContent = `[${perm.join(", ")}]`;
            wrap.appendChild(chip);
        });
    }
    sec.appendChild(wrap);
}

function _lc46ApplyHistoryStep(s, st, nums, log) {
    s.current = st;
    s.path = st.path || [];
    s.used = st.used || s.used;
    s.pick = st.pick != null ? st.pick : -1;

    if (st.type === "pick") {
        log(`Chọn nums[${st.pick}]=${nums[st.pick]} → path=[${st.path.join(",")}]`, "info");
    } else if (st.type === "backtrack") {
        log(`Backtrack — bỏ nums[${st.unpick}]=${nums[st.unpick]}, path=[${st.path.join(",") || "∅"}]`, "warn");
    } else if (st.type === "skip") {
        log(`Skip trùng nums[${st.skip}]=${nums[st.skip]} (cùng level)`, "warn");
    } else if (st.type === "found") {
        s.res.push(st.perm.slice());
        log(`✓ Output #${st.total}: [${st.perm.join(",")}]`, "success");
    }
}

window.LeetCodeVisualizers[46] = {
    initialize(s, log, cv) {
        s.nums = [1, 2, 3];
        VizCore.applyNums(s, cv, "nums", s.nums);
        const built = _lc46BuildPermSteps(s.nums);
        s.history = built.steps;
        s.allRes = built.allRes;
        s.hi = 0;
        s.path = [];
        s.used = s.nums.map(() => false);
        s.res = [];
        s.pick = -1;
        s.current = null;
        log(`[Khởi tạo] Permutations — ${s.allRes.length} hoán vị sẽ được sinh`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.hi >= s.history.length) {
            s.done = true;
            s.outputText = String(`${JSON.stringify(s.allRes)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.allRes)}`, "success");
            return;
        }
        _lc46ApplyHistoryStep(s, s.history[s.hi++], s.nums, log);
        if (s.hi >= s.history.length) {
            s.done = true;
            s.outputText = String(`${s.allRes.length} hoán vị`); log(`[KẾT QUẢ] ${s.allRes.length} hoán vị`, "success");
        }
    },
    render(s, c, st) {
        const flashIdx = s.current && s.current.type === "found" ? s.res.length - 1 : -1;
        const heroPerm = flashIdx >= 0 ? s.res[flashIdx] : null;
        VizCore.statsBar(st, [
            { label: "path", value: s.path.length ? s.path.join(",") : "—", cls: "accent" },
            { label: "found", value: `${s.res.length}/${s.allRes.length}`, cls: "success" }
        ]);
        const stage = VizCore.stage();
        const usedIdx = (s.used || []).map((u, i) => u ? i : -1).filter(i => i >= 0);
        VizCore.section(stage, 1, "Backtrack — path / used").appendChild(
            VizCore.arrayRow(s.nums, {
                found: usedIdx,
                pointers: s.pick >= 0 ? [{ idx: s.pick, label: "pick▼" }] : []
            })
        );
        const outSec = VizCore.section(stage, 2, "Output — hoán vị");
        outSec.classList.add("viz-output-section");
        _lc46RenderOutputPanel(
            outSec,
            s.res,
            flashIdx,
            heroPerm,
            flashIdx >= 0 ? `Hoán vị mới #${flashIdx + 1}` : null
        );
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
    }
};

window.LeetCodeVisualizers[47] = {
    initialize(s, log, cv) {
        s.nums = [1, 1, 2];
        VizCore.applyNums(s, cv, "nums", s.nums);
        const built = _lc47BuildPermSteps(s.nums);
        s.nums = built.sorted;
        s.history = built.steps;
        s.allRes = built.allRes;
        s.hi = 0;
        s.path = [];
        s.used = s.nums.map(() => false);
        s.res = [];
        s.pick = -1;
        s.current = null;
        log(`[Khởi tạo] Permutations II — ${s.allRes.length} hoán vị unique`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.hi >= s.history.length) {
            s.done = true;
            s.outputText = String(`${JSON.stringify(s.allRes)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.allRes)}`, "success");
            return;
        }
        _lc46ApplyHistoryStep(s, s.history[s.hi++], s.nums, log);
        if (s.hi >= s.history.length) {
            s.done = true;
            s.outputText = String(`${s.allRes.length} hoán vị unique`); log(`[KẾT QUẢ] ${s.allRes.length} hoán vị unique`, "success");
        }
    },
    render(s, c, st) {
        const flashIdx = s.current && s.current.type === "found" ? s.res.length - 1 : -1;
        const heroPerm = flashIdx >= 0 ? s.res[flashIdx] : null;
        VizCore.statsBar(st, [
            { label: "path", value: s.path.length ? s.path.join(",") : "—", cls: "accent" },
            { label: "found", value: `${s.res.length}/${s.allRes.length}`, cls: "success" }
        ]);
        const stage = VizCore.stage();
        const usedIdx = (s.used || []).map((u, i) => u ? i : -1).filter(i => i >= 0);
        VizCore.section(stage, 1, "Sorted nums + skip duplicate").appendChild(
            VizCore.arrayRow(s.nums, {
                found: usedIdx,
                active: s.current && s.current.type === "skip" ? s.current.skip : -1,
                pointers: s.pick >= 0 ? [{ idx: s.pick, label: "pick▼" }] : []
            })
        );
        const outSec = VizCore.section(stage, 2, "Output — hoán vị unique");
        outSec.classList.add("viz-output-section");
        _lc46RenderOutputPanel(
            outSec,
            s.res,
            flashIdx,
            heroPerm,
            flashIdx >= 0 ? `Unique #${flashIdx + 1}` : null
        );
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, [1, 1, 2]) }], cv);
    }
};

function _lc48BuildRotateSteps(start) {
    const steps = [];
    const matrix = start.map(r => r.slice());
    const n = matrix.length;
    const orig = start.map(r => r.slice());

    steps.push({ type: "init", phase: "start", matrix: orig.map(r => r.slice()) });

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            steps.push({
                type: "swap",
                phase: "transpose",
                r1: i, c1: j, r2: j, c2: i,
                matrix: matrix.map(r => r.slice())
            });
            const t = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = t;
            steps.push({
                type: "after_swap",
                phase: "transpose",
                r1: i, c1: j, r2: j, c2: i,
                matrix: matrix.map(r => r.slice())
            });
        }
    }

    steps.push({ type: "phase", phase: "reverse", matrix: matrix.map(r => r.slice()) });

    for (let i = 0; i < n; i++) {
        let l = 0, r = n - 1;
        while (l < r) {
            steps.push({
                type: "swap",
                phase: "reverse",
                row: i, l, r,
                r1: i, c1: l, r2: i, c2: r,
                matrix: matrix.map(row => row.slice())
            });
            const t = matrix[i][l];
            matrix[i][l] = matrix[i][r];
            matrix[i][r] = t;
            steps.push({
                type: "after_swap",
                phase: "reverse",
                row: i, l, r,
                r1: i, c1: l, r2: i, c2: r,
                matrix: matrix.map(row => row.slice())
            });
            l++;
            r--;
        }
        steps.push({ type: "row_done", phase: "reverse", row: i, matrix: matrix.map(row => row.slice()) });
    }

    steps.push({ type: "done", phase: "done", matrix: matrix.map(r => r.slice()), result: matrix.map(r => r.slice()) });
    return { steps, orig, result: matrix };
}

function _lc48CellLabel(cur) {
    if (!cur) return "—";
    if (cur.type === "swap" || cur.type === "after_swap") {
        if (cur.phase === "reverse") return `row ${cur.row}: ${cur.l ?? cur.c1}↔${cur.r ?? cur.c2}`;
        return `(${cur.r1},${cur.c1})↔(${cur.r2},${cur.c2})`;
    }
    if (cur.type === "row_done") return `row ${cur.row} ✓`;
    if (cur.type === "phase") return "→ reverse";
    if (cur.type === "done") return "xong";
    return "—";
}

function _lc48PhaseLabel(cur, done) {
    if (done) return "Done";
    if (!cur) return "—";
    if (cur.phase === "start") return "Input";
    if (cur.phase === "transpose") return "Transpose";
    if (cur.phase === "reverse") return "Reverse hàng";
    if (cur.phase === "done") return "Output";
    return cur.phase || "—";
}

window.LeetCodeVisualizers[48] = {
    initialize(s, log, cv) {
        const fallback = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        s.orig = VizCore.matrixValues(cv, s, fallback);
        const built = _lc48BuildRotateSteps(s.orig);
        s.history = built.steps;
        s.result = built.result;
        s.matrix = s.orig.map(r => r.slice());
        s.hi = 0;
        s.current = null;
        log(`[Khởi tạo] Rotate Image ${s.orig.length}×${s.orig.length} — transpose + reverse`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.hi >= s.history.length) {
            s.done = true;
            s.outputText = String(`Xoay 90° CW xong`); log(`[KẾT QUẢ] Xoay 90° CW xong`, "success");
            return;
        }
        const st = s.history[s.hi++];
        s.current = st;
        s.matrix = st.matrix.map(r => r.slice());

        if (st.type === "init") {
            log("Ma trận gốc", "info");
        } else if (st.type === "swap") {
            if (st.phase === "reverse") log(`Reverse hàng ${st.row}: swap cột ${st.l} ↔ ${st.r}`, "info");
            else log(`Transpose: swap (${st.r1},${st.c1}) ↔ (${st.r2},${st.c2})`, "info");
        } else if (st.type === "after_swap") {
            if (st.phase === "reverse") log(`↔ Hàng ${st.row}: ${st.l}↔${st.r} hoán đổi xong`, "success");
            else log(`↔ Hoán đổi xong tại (${st.r1},${st.c1}) và (${st.r2},${st.c2})`, "success");
        } else if (st.type === "phase") {
            log("Transpose hoàn tất → reverse từng hàng", "info");
        } else if (st.type === "row_done") {
            log(`Hàng ${st.row} đã reverse xong`, "success");
        } else if (st.type === "done") {
            s.done = true;
            s.outputText = String(`${JSON.stringify(st.result)}`); log(`[KẾT QUẢ] ${JSON.stringify(st.result)}`, "success");
        }

        if (s.hi >= s.history.length && !s.done) {
            s.done = true;
            s.outputText = String(`Xoay 90° CW xong`); log(`[KẾT QUẢ] Xoay 90° CW xong`, "success");
        }
    },
    render(s, c, st) {
        const cur = s.current || {};
        const isSwap = cur.type === "after_swap";
        const isDone = s.done || cur.type === "done";

        VizCore.statsBar(st, [
            { label: "phase", value: _lc48PhaseLabel(cur, isDone), cls: "accent" },
            { label: "cell", value: _lc48CellLabel(cur), cls: "warn" },
            { label: "step", value: `${Math.min(s.hi, s.history.length)}/${s.history.length}`, cls: "success" }
        ]);

        const stage = VizCore.stage();

        if (cur.type === "phase") {
            stage.appendChild(VizCore.flowStatus('<i class="fa-solid fa-arrow-right"></i> Transpose xong — bắt đầu reverse từng hàng', "found"));
        }

        const mainSec = VizCore.section(stage, 1, isDone ? "Ma trận sau xoay" : "Ma trận in-place");
        mainSec.appendChild(VizCore.renderMatrixGrid(s.matrix, {
            active: cur.r1 != null ? [cur.r1, cur.c1] : null,
            secondary: cur.r2 != null ? [cur.r2, cur.c2] : null,
            highlightRow: cur.row,
            phase: cur.phase,
            flash: isSwap,
            swap: cur.type === "swap" || isSwap,
            result: isDone
        }));

        const outSec = VizCore.section(stage, 2, "Output — xoay 90° CW");
        outSec.classList.add("viz-output-section");
        if (isDone) {
            const compare = document.createElement("div");
            compare.className = "viz-matrix-compare";
            compare.appendChild(VizCore.renderMatrixGrid(s.orig, {}));
            const arrow = document.createElement("div");
            arrow.className = "viz-matrix-arrow";
            arrow.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
            compare.appendChild(arrow);
            const resultWrap = document.createElement("div");
            resultWrap.className = "viz-output-hero flash";
            resultWrap.appendChild(VizCore.renderMatrixGrid(s.result || s.matrix, { result: true, flash: true }));
            compare.appendChild(resultWrap);
            outSec.appendChild(compare);
        } else {
            const hint = document.createElement("div");
            hint.className = "viz-output-empty";
            hint.textContent = "Output sẽ hiện Input → Result khi xoay xong…";
            outSec.appendChild(hint);
        }

        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{
            type: "matrix",
            id: "lc-input-board",
            label: "Ma trận n×n",
            values: VizCore.matrixValues(cv, s, s.orig || [[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
            size: (s.orig || [[1, 2, 3], [4, 5, 6], [7, 8, 9]]).length
        }], cv);
    }
};

window.LeetCodeVisualizers[49] = {
    initialize(s, log, cv) {
        s.strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
        if (cv && cv.str) s.strs = String(cv.str).split(",").map(x => x.trim()).filter(Boolean);
        s.i = 0;
        s.groups = {};
        log(`[Khởi tạo] Group Anagrams — key = sort(s)`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.i >= s.strs.length) {
            s.done = true;
            const keys = Object.keys(s.groups);
            s.outputText = String(`${keys.length} nhóm anagram`); log(`[KẾT QUẢ] ${keys.length} nhóm anagram`, "success");
            return;
        }
        const w = s.strs[s.i];
        const key = w.split("").sort().join("");
        if (!s.groups[key]) s.groups[key] = [];
        s.groups[key].push(w);
        log(`"${w}" → key "${key}"`, "info");
        s.i++;
    },
    render(s, c, st) {
        const keys = Object.keys(s.groups);
        VizCore.statsBar(st, [{ label: "word", value: s.done ? "—" : s.i, cls: "accent" }, { label: "groups", value: keys.length, cls: "success" }]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Hash map buckets");
        keys.forEach(k => {
            const d = document.createElement("div");
            d.style.cssText = "font-family:monospace;font-size:0.75rem;margin:4px 0;color:#e2e8f0;";
            d.textContent = `${k}: [${s.groups[k].join(", ")}]`;
            sec.appendChild(d);
        });
        if (!keys.length) sec.appendChild(document.createTextNode("…"));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "strs (CSV)", value: cv.str || s.strs.join(",") }], cv);
    }
};

window.LeetCodeVisualizers[50] = {
    initialize(s, log, cv) {
        s.x = 2; s.n = 10; s.res = 1;
        if (cv && cv.target !== undefined && cv.target !== "") s.n = parseInt(cv.target, 10) || 10;
        if (cv && cv.str) s.x = parseFloat(cv.str) || 2;
        s.N = s.n < 0 ? -s.n : s.n;
        if (s.n < 0) s.x = 1 / s.x;
        s.bit = 0;
        log(`[Khởi tạo] Pow(${s.x}, ${s.n}) — binary exp`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (!s.N) { s.done = true; s.outputText = String(`${s.res}`); log(`[KẾT QUẢ] ${s.res}`, "success"); return; }
        if (s.N & 1) { s.res *= s.x; log(`Bit 1: res *= x → ${s.res}`, "info"); }
        else log(`Bit 0: bỏ qua nhân`, "info");
        s.x *= s.x; s.N >>= 1; s.bit++;
        if (!s.N) { s.done = true; s.outputText = String(`${s.res}`); log(`[KẾT QUẢ] ${s.res}`, "success"); }
    },
    render(s, c, st) {
        VizCore.statsBar(st, [
            { label: "N bits", value: s.N.toString(2) || "0", cls: "accent" },
            { label: "x", value: s.x.toFixed(4), cls: "warn" },
            { label: "res", value: s.res.toFixed(4), cls: "success" }
        ]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Binary exponentiation").appendChild(VizCore.flowEquation([
            { label: "x", val: s.x.toFixed(3), cls: "current" },
            { op: "^" },
            { label: "n", val: s.N, cls: "target" },
            { op: "=" },
            { label: "res", val: s.res.toFixed(3), cls: "result" }
        ]));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "string", id: "lc-input-str", label: "x", value: cv.str ?? "2" },
            { type: "target", id: "lc-input-target", label: "n", value: cv.target ?? 10 }
        ], cv);
    }
};

window.LeetCodeVisualizers[52] = {
    initialize(s, log, cv) {
        s.n = 4;
        if (cv && cv.target !== undefined && cv.target !== "") s.n = parseInt(cv.target, 10) || 4;
        s.row = 0; s.col = 0; s.count = 0; s.cols = new Set(); s.d1 = new Set(); s.d2 = new Set();
        log(`[Khởi tạo] N-Queens II n=${s.n}`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.row >= s.n) {
            s.count++; s.row--;
            if (s.row < 0) { s.done = true; s.outputText = String(`${s.count} cách`); log(`[KẾT QUẢ] ${s.count} cách`, "success"); return; }
            s.col = 0; log(`+1 solution → backtrack`, "success"); return;
        }
        if (s.col >= s.n) {
            s.row--; s.col = 0;
            if (s.row < 0) { s.done = true; s.outputText = String(`${s.count} cách`); log(`[KẾT QUẢ] ${s.count} cách`, "success"); return; }
            log(`Backtrack row ${s.row}`, "warn"); return;
        }
        const c = s.col, r = s.row;
        const ok = !s.cols.has(c) && !s.d1.has(r - c) && !s.d2.has(r + c);
        if (ok) {
            s.cols.add(c); s.d1.add(r - c); s.d2.add(r + c);
            log(`Queen tại (${r},${c})`, "info");
            s.row++; s.col = 0; return;
        }
        s.col++;
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "row", value: s.row, cls: "accent" }, { label: "solutions", value: s.count, cls: "success" }]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, `Board ${s.n}×${s.n}`);
        const grid = document.createElement("div");
        grid.style.cssText = `display:grid;grid-template-columns:repeat(${s.n},28px);gap:2px;`;
        for (let i = 0; i < s.n * s.n; i++) {
            const el = document.createElement("div");
            el.style.cssText = "width:26px;height:26px;border:1px solid #475569;border-radius:3px;background:#1e293b;";
            grid.appendChild(el);
        }
        sec.appendChild(grid);
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "target", id: "lc-input-target", label: "n", value: cv.target ?? s.n }], cv);
    }
};

window.LeetCodeVisualizers[53] = {
    initialize(s, log, cv) {
        s.nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
        VizCore.applyNums(s, cv, "nums", s.nums);
        s.i = 0; s.cur = s.nums[0]; s.best = s.nums[0];
        log(`[Khởi tạo] Kadane max subarray`, "info");
    },
    step(s, log) {
        if (s.done) return;
        s.i++;
        if (s.i >= s.nums.length) { s.done = true; s.outputText = String(`max = ${s.best}`); log(`[KẾT QUẢ] max = ${s.best}`, "success"); return; }
        s.cur = Math.max(s.nums[s.i], s.cur + s.nums[s.i]);
        if (s.cur > s.best) s.best = s.cur;
        log(`i=${s.i}: cur=${s.cur}, best=${s.best}`, "info");
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "cur", value: s.cur, cls: "warn" }, { label: "best", value: s.best, cls: "success" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Kadane").appendChild(VizCore.arrayRow(s.nums, { active: s.i, pointers: [{ idx: s.i, label: "i▼" }] }));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
    }
};

window.LeetCodeVisualizers[54] = {
    initialize(s, log, cv) {
        s.matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        s.matrix = VizCore.matrixValues(cv, s, s.matrix);
        s.res = []; s.t = 0; s.b = s.matrix.length - 1; s.l = 0; s.r = s.matrix[0].length - 1;
        s.dir = 0;
        log(`[Khởi tạo] Spiral Matrix`, "info");
    },
    step(s, log) {
        if (s.done) return;
        const m = s.matrix;
        if (s.t > s.b || s.l > s.r) { s.done = true; s.outputText = String(`[${s.res.join(",")}]`); log(`[KẾT QUẢ] [${s.res.join(",")}]`, "success"); return; }
        if (s.dir === 0) {
            for (let c = s.l; c <= s.r; c++) { s.res.push(m[s.t][c]); log(`→ ${m[s.t][c]}`, "info"); }
            s.t++; s.dir = 1;
        } else if (s.dir === 1) {
            for (let i = s.t; i <= s.b; i++) { s.res.push(m[i][s.r]); log(`↓ ${m[i][s.r]}`, "info"); }
            s.r--; s.dir = 2;
        } else if (s.dir === 2 && s.t <= s.b) {
            for (let c = s.r; c >= s.l; c--) { s.res.push(m[s.b][c]); log(`← ${m[s.b][c]}`, "info"); }
            s.b--; s.dir = 3;
        } else if (s.dir === 3 && s.l <= s.r) {
            for (let i = s.b; i >= s.t; i--) { s.res.push(m[i][s.l]); log(`↑ ${m[i][s.l]}`, "info"); }
            s.l++; s.dir = 0;
        } else s.dir = (s.dir + 1) % 4;
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "dir", value: ["→", "↓", "←", "↑"][s.dir], cls: "accent" }, { label: "out", value: s.res.length, cls: "success" }]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Spiral output");
        sec.appendChild(_lc46Matrix(s.matrix));
        const out = document.createElement("div");
        out.style.cssText = "font-family:monospace;font-size:0.75rem;margin-top:8px;color:#86efac;";
        out.textContent = s.res.length ? s.res.join(" → ") : "…";
        sec.appendChild(out);
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{
            type: "matrix",
            id: "lc-input-board",
            label: "Ma trận",
            values: VizCore.matrixValues(cv, s, s.matrix || [[1, 2, 3], [4, 5, 6], [7, 8, 9]])
        }], cv);
    }
};

window.LeetCodeVisualizers[55] = {
    initialize(s, log, cv) {
        s.nums = [2, 3, 1, 1, 4];
        VizCore.applyNums(s, cv, "nums", s.nums);
        s.i = 0; s.far = 0;
        log(`[Khởi tạo] Jump Game — greedy far`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.i > s.far) { s.done = true; s.outputText = String(`false — i=${s.i} > far=${s.far}`); log(`[KẾT QUẢ] false — i=${s.i} > far=${s.far}`, "warn"); return; }
        s.far = Math.max(s.far, s.i + s.nums[s.i]);
        log(`i=${s.i}: far=${s.far}`, "info");
        s.i++;
        if (s.i >= s.nums.length) { s.done = true; s.outputText = String(`true`); log(`[KẾT QUẢ] true`, "success"); }
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "i", value: s.done ? "—" : s.i, cls: "accent" }, { label: "far", value: s.far, cls: "success" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Reachable range [0..far]").appendChild(VizCore.arrayRow(s.nums, {
            active: s.i < s.nums.length ? s.i : -1,
            highlight: idx => idx <= s.far
        }));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
    }
};
