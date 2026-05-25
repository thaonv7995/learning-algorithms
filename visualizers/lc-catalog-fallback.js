/**
 * Generic sandbox for LC problems without a dedicated visualizer (catalog tier).
 * Registered on demand via ensureCatalogVisualizer(id, title).
 */
(function () {
    const V = window.VizCore;
    const R = window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

    function inferKind(title) {
        const t = (title || "").toLowerCase();
        if (/string|path|parentheses|anagram|palindrome|word|decode|substring/.test(t)) return "str";
        if (/tree|binary search tree|bst|inorder|preorder|postorder/.test(t)) return "tree";
        if (/matrix|grid|2d|island|spiral|sudoku/.test(t)) return "grid";
        return "array";
    }

    function makeGeneric(id, title) {
        const kind = inferKind(title);
        return {
            _catalogFallback: true,
            initialize(s, log, cv) {
                s.vizKind = kind;
                s.i = 0;
                s.outputText = null;
                s.outputResult = null;
                if (kind === "str") {
                    s.str = "abcabcbb";
                    if (cv && cv.str) s.str = V.parseStr(cv.str);
                    log(`[Khởi tạo] #${id} ${title} — chuỗi "${s.str}"`, "info");
                } else if (kind === "tree") {
                    s.nums = [3, 9, 20, -1, -1, 15, 7];
                    V.applyNums(s, cv, "nums", s.nums);
                    s.visit = [];
                    log(`[Khởi tạo] #${id} ${title} — cây [${s.nums.join(", ")}]`, "info");
                } else if (kind === "grid") {
                    s.grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
                    if (cv && cv.str) {
                        const rows = String(cv.str).trim().split(/\r?\n/)
                            .map(l => l.split(",").map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x)))
                            .filter(r => r.length);
                        if (rows.length) s.grid = rows;
                    }
                    s.r = 0; s.c = 0;
                    log(`[Khởi tạo] #${id} ${title} — lưới ${s.grid.length}×${s.grid[0].length}`, "info");
                } else {
                    s.nums = [1, 2, 3, 4, 5];
                    V.applyNums(s, cv, "nums", s.nums);
                    log(`[Khởi tạo] #${id} ${title} — [${s.nums.join(", ")}]`, "info");
                }
            },
            step(s, log) {
                if (s.done) return;
                if (s.vizKind === "str") {
                    if (s.i >= s.str.length) {
                        s.done = true;
                        s.outputText = `"${s.str}" (${s.str.length} ký tự)`;
                        log(`[KẾT QUẢ] Duyệt xong chuỗi`, "success");
                        return;
                    }
                    log(`Bước ${s.stepIndex}: s[${s.i}]='${s.str[s.i]}'`, "info");
                    s.i++;
                    return;
                }
                if (s.vizKind === "tree") {
                    if (s.i >= s.nums.length) {
                        s.done = true;
                        s.outputText = `[${s.visit.join(" → ")}]`;
                        log(`[KẾT QUẢ] Thứ tự duyệt: ${s.outputText}`, "success");
                        return;
                    }
                    const v = s.nums[s.i];
                    if (v !== -1 && v != null) {
                        s.visit.push(v);
                        log(`Thăm nút ${v}`, "info");
                    } else log(`Index ${s.i}: null`, "info");
                    s.i++;
                    return;
                }
                if (s.vizKind === "grid") {
                    if (s.r >= s.grid.length) {
                        s.done = true;
                        s.outputText = `Quét xong ${s.grid.length}×${s.grid[0].length}`;
                        log(`[KẾT QUẢ] Hoàn tất quét lưới`, "success");
                        return;
                    }
                    log(`Ô (${s.r},${s.c}) = ${s.grid[s.r][s.c]}`, "info");
                    s.c++;
                    if (s.c >= s.grid[0].length) { s.c = 0; s.r++; }
                    return;
                }
                if (s.i >= s.nums.length) {
                    s.done = true;
                    s.outputResult = s.nums.length;
                    s.outputText = `Duyệt xong n=${s.nums.length}`;
                    log(`[KẾT QUẢ] Hoàn tất`, "success");
                    return;
                }
                log(`Bước ${s.stepIndex}: nums[${s.i}]=${s.nums[s.i]}`, "info");
                s.i++;
            },
            render(s, canvas, stats) {
                if (s.vizKind === "str") {
                    V.statsBar(stats, [
                        { label: "i", value: s.done ? "done" : s.i, cls: "accent" },
                        { label: "len", value: s.str.length, cls: "success" }
                    ]);
                    const stage = V.stage();
                    V.section(stage, 1, title).appendChild(
                        V.charRow(s.str, { active: s.done ? -1 : s.i, dimmed: idx => idx < s.i })
                    );
                    canvas.appendChild(stage);
                    return;
                }
                if (s.vizKind === "tree") {
                    V.statsBar(stats, [
                        { label: "i", value: s.done ? "done" : s.i, cls: "accent" },
                        { label: "visit", value: s.visit.join("→") || "—", cls: "success" }
                    ]);
                    const stage = V.stage();
                    V.section(stage, 1, title).appendChild(
                        V.arrayRow(s.nums.map(v => v === -1 ? "∅" : v), { active: s.done ? -1 : s.i, dimmed: idx => idx < s.i })
                    );
                    canvas.appendChild(stage);
                    return;
                }
                if (s.vizKind === "grid") {
                    V.statsBar(stats, [
                        { label: "cell", value: s.done ? "done" : `(${s.r},${s.c})`, cls: "accent" },
                        { label: "rows", value: s.grid.length, cls: "success" }
                    ]);
                    const stage = V.stage();
                    const sec = V.section(stage, 1, title);
                    if (V.renderMatrixGrid) sec.appendChild(V.renderMatrixGrid(s.grid, { active: s.done ? null : [s.r, s.c] }));
                    else sec.appendChild(document.createTextNode(JSON.stringify(s.grid)));
                    canvas.appendChild(stage);
                    return;
                }
                V.statsBar(stats, [
                    { label: "i", value: s.done ? "done" : s.i, cls: "accent" },
                    { label: "val", value: s.done ? "—" : s.nums[s.i], cls: "warn" },
                    { label: "n", value: s.nums.length, cls: "success" }
                ]);
                const stage = V.stage();
                V.section(stage, 1, title).appendChild(
                    V.arrayRow(s.nums, { active: s.done ? -1 : s.i, pointers: s.done ? [] : [{ idx: s.i, label: "i▼" }], dimmed: idx => idx < s.i })
                );
                canvas.appendChild(stage);
            },
            renderControls(s, c, cv) {
                if (s.vizKind === "str") {
                    V.controls(c, [{ type: "string", id: "lc-input-str", label: "Input", value: cv.str || s.str }], cv);
                } else if (s.vizKind === "grid") {
                    V.controls(c, [{
                        type: "textarea", id: "lc-input-str", label: "Grid (CSV rows)",
                        value: cv.str || s.grid.map(r => r.join(",")).join("\n"), rows: 3
                    }], cv);
                } else {
                    V.controls(c, [{
                        type: "array", id: "lc-input-nums", label: "Input",
                        values: V.arrayValues(cv, s, s.nums || s.visit || [1, 2, 3])
                    }], cv);
                }
            }
        };
    }

    window.ensureCatalogVisualizer = function (id, title) {
        if (R[id]) return R[id];
        R[id] = makeGeneric(id, title || `LC #${id}`);
        return R[id];
    };
})();
