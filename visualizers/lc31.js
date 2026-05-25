window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

window.LeetCodeVisualizers[31] = {
    initialize(s, log, cv) {
        s.nums = [1, 2, 3];
        VizCore.applyNums(s, cv, "nums", s.nums);
        s.phase = "find_i"; s.i = s.nums.length - 2;
        s.orig = s.nums.slice();
        log(`[Khởi tạo] Next Permutation [${s.nums.join(",")}]`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.phase === "find_i") {
            while (s.i >= 0 && s.nums[s.i] >= s.nums[s.i + 1]) s.i--;
            if (s.i < 0) {
                s.nums.reverse();
                s.done = true;
                s.outputText = String(`Hoán vị max → [${s.nums.join(",")}]`); log(`[KẾT QUẢ] Hoán vị max → [${s.nums.join(",")}]`, "success");
                return;
            }
            log(`Pivot i=${s.i} (nums[i]=${s.nums[s.i]})`, "info");
            s.phase = "find_j"; s.j = s.nums.length - 1;
            return;
        }
        if (s.phase === "find_j") {
            while (s.nums[s.j] <= s.nums[s.i]) s.j--;
            [s.nums[s.i], s.nums[s.j]] = [s.nums[s.j], s.nums[s.i]];
            log(`Swap i=${s.i}, j=${s.j}`, "info");
            s.phase = "reverse";
            s.lo = s.i + 1; s.hi = s.nums.length - 1;
            return;
        }
        if (s.phase === "reverse") {
            if (s.lo >= s.hi) {
                s.done = true;
                s.outputText = String(`[${s.nums.join(",")}]`); log(`[KẾT QUẢ] [${s.nums.join(",")}]`, "success");
                return;
            }
            [s.nums[s.lo], s.nums[s.hi]] = [s.nums[s.hi], s.nums[s.lo]];
            s.lo++; s.hi--;
        }
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "phase", value: s.phase, cls: "accent" }, { label: "i", value: s.i, cls: "warn" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Mảng").appendChild(VizCore.arrayRow(s.nums, {
            pointers: [{ idx: s.i, label: "i▼" }],
            found: s.j != null ? [s.j] : []
        }));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
    }
};

window.LeetCodeVisualizers[32] = {
    initialize(s, log, cv) {
        s.str = "(()())";
        if (cv && cv.str) s.str = VizCore.parseStr(cv.str);
        s.st = [-1]; s.i = 0; s.best = 0;
        log(`[Khởi tạo] Longest valid parens "${s.str}"`, "info");
    },
    step(s, log) {
        if (s.i >= s.str.length) {
            s.done = true;
            s.outputText = String(`max=${s.best}`); log(`[KẾT QUẢ] max=${s.best}`, "success");
            return;
        }
        const c = s.str[s.i];
        if (c === "(") {
            s.st.push(s.i);
            log(`'(' push ${s.i}`, "info");
        } else {
            s.st.pop();
            if (!s.st.length) {
                s.st.push(s.i);
                log(`')' thừa → base=${s.i}`, "warn");
            } else {
                s.best = Math.max(s.best, s.i - s.st[s.st.length - 1]);
                log(`')' hợp lệ → len=${s.i - s.st[s.st.length - 1]}`, "success");
            }
        }
        s.i++;
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "max", value: s.best, cls: "success" }, { label: "stack", value: s.st.join(","), cls: "warn" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Chuỗi ngoặc").appendChild(VizCore.charRow(s.str, { active: s.i < s.str.length ? s.i : -1 }));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "s", value: cv.str || s.str }], cv);
    }
};

window.LeetCodeVisualizers[33] = {
    initialize(s, log, cv) {
        s.nums = [4, 5, 6, 7, 0, 1, 2];
        s.target = 0;
        VizCore.applyNums(s, cv, "nums", s.nums);
        VizCore.applyTarget(s, cv, 0);
        s.l = 0; s.r = s.nums.length - 1;
        log(`[Khởi tạo] Search rotated target=${s.target}`, "info");
    },
    step(s, log) {
        if (s.l > s.r) {
            s.done = true;
            s.outputText = String(`${s.ans ?? -1}`); log(`[KẾT QUẢ] ${s.ans ?? -1}`, "success");
            return;
        }
        const m = Math.floor((s.l + s.r) / 2);
        if (s.nums[m] === s.target) {
            s.ans = m; s.done = true;
            s.outputText = String(`index=${m}`); log(`[KẾT QUẢ] index=${m}`, "success");
            return;
        }
        if (s.nums[s.l] <= s.nums[m]) {
            if (s.target >= s.nums[s.l] && s.target < s.nums[m]) {
                log(`Left sorted [${s.l}..${m}]`, "info");
                s.r = m - 1;
            } else {
                log(`Right half`, "info");
                s.l = m + 1;
            }
        } else {
            if (s.target > s.nums[m] && s.target <= s.nums[s.r]) {
                log(`Right sorted [${m}..${s.r}]`, "info");
                s.l = m + 1;
            } else {
                s.r = m - 1;
            }
        }
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "L/R", value: `${s.l}/${s.r}`, cls: "accent" }, { label: "mid", value: s.l <= s.r ? Math.floor((s.l + s.r) / 2) : "—", cls: "warn" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Rotated array BS").appendChild(VizCore.arrayRow(s.nums, {
            pointers: [{ idx: s.l, label: "L▼" }, { idx: s.r, label: "R▼" }]
        }));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) },
            { type: "target", id: "lc-input-target", label: "target", value: cv.target ?? s.target }
        ], cv);
    }
};

window.LeetCodeVisualizers[34] = {
    initialize(s, log, cv) {
        s.nums = [5, 7, 7, 8, 8, 10];
        s.target = 8;
        VizCore.applyNums(s, cv, "nums", s.nums);
        VizCore.applyTarget(s, cv, 8);
        s.phase = "left"; s.l = 0; s.r = s.nums.length - 1; s.ansL = -1; s.ansR = -1;
        log(`[Khởi tạo] searchRange target=${s.target}`, "info");
    },
    step(s, log) {
        if (s.phase === "left") {
            if (s.l > s.r) {
                s.phase = "right"; s.l = 0; s.r = s.nums.length - 1;
                log(`Leftmost=${s.ansL}, tìm rightmost`, "info");
                return;
            }
            const m = Math.floor((s.l + s.r) / 2);
            if (s.nums[m] === s.target) { s.ansL = m; s.r = m - 1; log(`Found left at ${m}`, "info"); }
            else if (s.nums[m] < s.target) s.l = m + 1;
            else s.r = m - 1;
            return;
        }
        if (s.l > s.r) {
            s.done = true;
            s.outputText = String(`[${s.ansL}, ${s.ansR}]`); log(`[KẾT QUẢ] [${s.ansL}, ${s.ansR}]`, "success");
            return;
        }
        const m = Math.floor((s.l + s.r) / 2);
        if (s.nums[m] === s.target) { s.ansR = m; s.l = m + 1; log(`Found right at ${m}`, "info"); }
        else if (s.nums[m] < s.target) s.l = m + 1;
        else s.r = m - 1;
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "phase", value: s.phase, cls: "accent" }, { label: "range", value: `[${s.ansL},${s.ansR}]`, cls: "success" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Binary search range").appendChild(VizCore.arrayRow(s.nums, {
            pointers: [{ idx: s.l, label: "L▼" }, { idx: s.r, label: "R▼" }],
            found: [s.ansL, s.ansR].filter(x => x >= 0)
        }));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) },
            { type: "target", id: "lc-input-target", label: "target", value: cv.target ?? s.target }
        ], cv);
    }
};

window.LeetCodeVisualizers[35] = {
    initialize(s, log, cv) {
        s.nums = [1, 3, 5, 6];
        s.target = 5;
        VizCore.applyNums(s, cv, "nums", s.nums);
        VizCore.applyTarget(s, cv, 5);
        s.l = 0; s.r = s.nums.length - 1;
        log(`[Khởi tạo] searchInsert target=${s.target}`, "info");
    },
    step(s, log) {
        if (s.l > s.r) {
            s.done = true;
            s.outputText = String(`insert at ${s.l}`); log(`[KẾT QUẢ] insert at ${s.l}`, "success");
            return;
        }
        const m = Math.floor((s.l + s.r) / 2);
        log(`mid=${m} val=${s.nums[m]}`, "info");
        if (s.nums[m] < s.target) s.l = m + 1;
        else s.r = m - 1;
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "L", value: s.l, cls: "accent" }, { label: "R", value: s.r, cls: "warn" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Insert position BS").appendChild(VizCore.arrayRow(s.nums, {
            pointers: [{ idx: s.l, label: "L▼" }, { idx: Math.max(0, s.r), label: "R▼" }]
        }));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) },
            { type: "target", id: "lc-input-target", label: "target", value: cv.target ?? s.target }
        ], cv);
    }
};

window.LeetCodeVisualizers[36] = (function () {
    const PRESETS = {
        valid: "53..7....\n6..195...\n...8....6\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79",
        invalid_row: "533.7....\n6..195...\n...8....6\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79",
        invalid_col: "53..7....\n5..195...\n...8....6\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79",
        invalid_box: "563.7....\n6..195...\n...8....6\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79",
        sparse: "........1\n.......2.\n......3..\n.....4...\n....5....\n...6.....\n..7......\n.8.......\n9........",
        full: "534678912\n672195348\n198342567\n859761423\n426853791\n713924856\n961537284\n287419635\n345286179"
    };

    const PRESET_OPTS = [
        { value: "valid", label: "✓ Hợp lệ (LC mẫu)" },
        { value: "invalid_row", label: "✗ Trùng hàng" },
        { value: "invalid_col", label: "✗ Trùng cột" },
        { value: "invalid_box", label: "✗ Trùng ô 3×3" },
        { value: "sparse", label: "Thưa (1–9 chéo)" },
        { value: "full", label: "Đầy đủ hợp lệ" }
    ];

    function loadBoard(cv) {
        if (cv && cv.board && String(cv.board).trim()) {
            return VizCore.parseSudokuBoard(cv.board);
        }
        if (cv && cv.preset && PRESETS[cv.preset]) {
            return VizCore.parseSudokuBoard(PRESETS[cv.preset]);
        }
        return VizCore.parseSudokuBoard(PRESETS.valid);
    }

    function resetScan(s) {
        s.r = 0; s.c = 0; s.ok = true; s.done = false;
        s.seen = { row: {}, col: {}, box: {} };
        s.conflict = null;
        s.conflictType = null;
    }

    function bindSudokuControls(container, cv, boardText) {
        const sel = container.querySelector("#lc-input-preset");
        const ta = container.querySelector("#lc-input-board");
        if (sel && ta) {
            sel.addEventListener("change", () => {
                if (PRESETS[sel.value]) ta.value = PRESETS[sel.value];
            });
        }
    }

    return {
        initialize(s, log, cv) {
            s.board = loadBoard(cv);
            s.boardText = VizCore.boardToSudokuText(s.board);
            resetScan(s);
            log(`[Khởi tạo] Valid Sudoku — quét 81 ô (hàng/cột/box)`, "info");
        },

        step(s, log) {
            if (s.r >= 9) {
                s.done = true;
                s.outputText = String(`${s.ok}`); log(`[KẾT QUẢ] ${s.ok}`, s.ok ? "success" : "warn");
                return;
            }
            const v = s.board[s.r][s.c];
            s.conflict = null;
            s.conflictType = null;
            if (v !== ".") {
                const d = v.charCodeAt(0) - 49;
                const box = Math.floor(s.r / 3) * 3 + Math.floor(s.c / 3);
                const rk = `${s.r}-${d}`, ck = `${s.c}-${d}`, bk = `${box}-${d}`;
                if (s.seen.row[rk]) {
                    s.ok = false;
                    s.conflict = [s.r, s.c];
                    s.conflictType = "hàng";
                    log(`Trùng '${v}' tại (${s.r},${s.c}) — hàng ${s.r}`, "warn");
                } else if (s.seen.col[ck]) {
                    s.ok = false;
                    s.conflict = [s.r, s.c];
                    s.conflictType = "cột";
                    log(`Trùng '${v}' tại (${s.r},${s.c}) — cột ${s.c}`, "warn");
                } else if (s.seen.box[bk]) {
                    s.ok = false;
                    s.conflict = [s.r, s.c];
                    s.conflictType = "box 3×3";
                    log(`Trùng '${v}' tại (${s.r},${s.c}) — box ${box}`, "warn");
                } else {
                    s.seen.row[rk] = s.seen.col[ck] = s.seen.box[bk] = true;
                    log(`'${v}' tại (${s.r},${s.c}) — OK`, "info");
                }
            }
            s.c++;
            if (s.c >= 9) { s.c = 0; s.r++; }
        },

        render(s, c, st) {
            const box = Math.floor(s.r / 3) * 3 + Math.floor(s.c / 3);
            VizCore.statsBar(st, [
                { label: "cell", value: `(${s.r},${s.c})`, cls: "accent" },
                { label: "valid", value: s.ok, cls: s.ok ? "success" : "warn" },
                { label: "check", value: s.conflictType || "—", cls: s.conflict ? "warn" : "" }
            ]);
            const stage = VizCore.stage();
            const sec = VizCore.section(stage, 1, "Board — tô hàng / cột / box đang kiểm tra");
            sec.appendChild(VizCore.renderSudokuGrid(s.board, {
                active: [s.r, s.c],
                conflict: s.conflict,
                highlightRow: s.r,
                highlightCol: s.c,
                highlightBox: box,
                cellSize: 34
            }));
            if (s.conflict) {
                const msg = document.createElement("p");
                msg.style.cssText = "font-size:0.75rem;color:#fca5a5;margin-top:8px;";
                msg.textContent = `Xung đột ${s.conflictType} tại ô (${s.conflict[0]},${s.conflict[1]})`;
                sec.appendChild(msg);
            }
            c.appendChild(stage);
        },

        renderControls(s, c, cv) {
            const preset = (cv && cv.preset) || "valid";
            const boardVal = (cv && cv.board) || PRESETS[preset] || s.boardText;
            VizCore.controls(c, [
                { type: "select", id: "lc-input-preset", label: "Mẫu nhanh", value: preset, options: PRESET_OPTS },
                { type: "textarea", id: "lc-input-board", label: "Board (9 dòng)", value: boardVal, rows: 9, placeholder: "53..7....\\n6..195..." }
            ], cv);
            bindSudokuControls(c, cv, boardVal);
        }
    };
})();

window.LeetCodeVisualizers[37] = (function () {
    const PRESETS = {
        puzzle: "53..7....\n6..195...\n...8....6\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79",
        easy: "........1\n.......2.\n......3..\n.....4...\n....5....\n...6.....\n..7......\n.8.......\n9........",
        empty: ".........\n.........\n.........\n.........\n.........\n.........\n.........\n.........\n........."
    };
    const PRESET_OPTS = [
        { value: "puzzle", label: "LC mẫu (chưa giải)" },
        { value: "easy", label: "Dễ (1–9 chéo)" },
        { value: "empty", label: "Trống hoàn toàn" }
    ];

    function loadBoard(cv) {
        if (cv && cv.board && String(cv.board).trim()) return VizCore.parseSudokuBoard(cv.board);
        if (cv && cv.preset && PRESETS[cv.preset]) return VizCore.parseSudokuBoard(PRESETS[cv.preset]);
        return VizCore.parseSudokuBoard(PRESETS.puzzle);
    }

    function isValid(board, r, c, d) {
        for (let i = 0; i < 9; i++) {
            if (board[r][i] === d || board[i][c] === d) return false;
        }
        const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (board[br + i][bc + j] === d) return false;
        return true;
    }

    return {
        initialize(s, log, cv) {
            s.board = loadBoard(cv);
            s.orig = s.board.map(row => row.slice());
            s.r = 0; s.c = -1; s.d = 0; s.done = false;
            log(`[Khởi tạo] Sudoku solver — backtracking`, "info");
        },

        _nextEmpty(s) {
            for (let r = 0; r < 9; r++)
                for (let c = 0; c < 9; c++)
                    if (s.board[r][c] === ".") return { r, c };
            return null;
        },

        step(s, log) {
            if (s.done) return;
            const pos = s._nextEmpty(s);
            if (!pos) {
                s.done = true;
                s.outputText = String(`Đã giải xong`); log(`[KẾT QUẢ] Đã giải xong`, "success");
                return;
            }
            if (s.r !== pos.r || s.c !== pos.c) {
                s.r = pos.r; s.c = pos.c; s.d = 0;
            }
            s.d++;
            const digit = String(s.d);
            if (s.d > 9) {
                s.board[s.r][s.c] = s.orig[s.r][s.c] === "." ? "." : s.orig[s.r][s.c];
                s.d = 0;
                log(`Backtrack (${s.r},${s.c})`, "warn");
                return;
            }
            if (isValid(s.board, s.r, s.c, digit)) {
                s.board[s.r][s.c] = digit;
                log(`Thử ${digit} tại (${s.r},${s.c}) ✓`, "info");
            }
        },

        render(s, c, st) {
            const box = Math.floor(s.r / 3) * 3 + Math.floor(s.c / 3);
            VizCore.statsBar(st, [
                { label: "try", value: s.d || "—", cls: "accent" },
                { label: "cell", value: `(${s.r},${s.c})`, cls: "warn" }
            ]);
            const stage = VizCore.stage();
            const sec = VizCore.section(stage, 1, "Backtracking — ô trống tiếp theo");
            sec.appendChild(VizCore.renderSudokuGrid(s.board, {
                active: [s.r, s.c],
                highlightBox: box,
                cellSize: 34
            }));
            c.appendChild(stage);
        },

        renderControls(s, c, cv) {
            const preset = (cv && cv.preset) || "puzzle";
            VizCore.controls(c, [
                { type: "select", id: "lc-input-preset", label: "Mẫu", value: preset, options: PRESET_OPTS },
                { type: "textarea", id: "lc-input-board", label: "Board (9 dòng, . = trống)", value: (cv && cv.board) || PRESETS[preset], rows: 9 }
            ], cv);
            const sel = c.querySelector("#lc-input-preset");
            const ta = c.querySelector("#lc-input-board");
            if (sel && ta) sel.addEventListener("change", () => { if (PRESETS[sel.value]) ta.value = PRESETS[sel.value]; });
        }
    };
})();

window.LeetCodeVisualizers[38] = {
    initialize(s, log, cv) {
        s.n = 4; s.step = 1; s.cur = "1";
        if (cv && cv.target !== undefined) s.n = parseInt(cv.target, 10) || 4;
        log(`[Khởi tạo] countAndSay n=${s.n}`, "info");
    },
    step(s, log) {
        if (s.step >= s.n) {
            s.done = true;
            s.outputText = String(`"${s.cur}"`); log(`[KẾT QUẢ] "${s.cur}"`, "success");
            return;
        }
        let nxt = "", i = 0;
        while (i < s.cur.length) {
            let j = i;
            while (j < s.cur.length && s.cur[j] === s.cur[i]) j++;
            nxt += String(j - i) + s.cur[i];
            i = j;
        }
        log(`Step ${s.step}: "${s.cur}" → "${nxt}"`, "info");
        s.cur = nxt; s.step++;
        if (s.step >= s.n) { s.done = true; s.outputText = String(`"${s.cur}"`); log(`[KẾT QUẢ] "${s.cur}"`, "success"); }
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "step", value: `${s.step}/${s.n}`, cls: "accent" }, { label: "cur", value: s.cur, cls: "success" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "RLE term").appendChild(VizCore.charRow(s.cur, {}));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "target", id: "lc-input-target", label: "n", value: cv.target ?? s.n }], cv);
    }
};

window.LeetCodeVisualizers[39] = {
    initialize(s, log, cv) {
        s.c = [2, 3, 6, 7]; s.t = 7; s.path = []; s.res = []; s.i = 0;
        VizCore.applyNums(s, cv, "nums", s.c);
        VizCore.applyTarget(s, cv, 7);
        s.t = s.target;
        log(`[Khởi tạo] combinationSum target=${s.t}`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.t === 0) {
            s.res.push(s.path.slice());
            log(`Found ${JSON.stringify(s.path)}`, "success");
            if (s.path.length) { s.t += s.path.pop(); s.i++; }
            else { s.done = true; s.outputText = String(`${JSON.stringify(s.res)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success"); }
            return;
        }
        if (s.t < 0 || s.i >= s.c.length) {
            if (!s.path.length) { s.done = true; s.outputText = String(`${JSON.stringify(s.res)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success"); return; }
            s.t += s.path.pop(); s.i++;
            return;
        }
        s.path.push(s.c[s.i]); s.t -= s.c[s.i];
        log(`+${s.c[s.i]} path=${JSON.stringify(s.path)} remain=${s.t}`, "info");
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "remain", value: s.t, cls: "accent" }, { label: "found", value: s.res.length, cls: "success" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Backtracking").appendChild(VizCore.arrayRow(s.c, { active: s.i }));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "array", id: "lc-input-nums", label: "candidates", values: VizCore.arrayValues(cv, s, s.c) },
            { type: "target", id: "lc-input-target", label: "target", value: cv.target ?? s.t }
        ], cv);
    }
};

window.LeetCodeVisualizers[40] = {
    initialize(s, log, cv) {
        s.c = [10, 1, 2, 7, 6, 1, 5]; s.c.sort((a, b) => a - b);
        s.t = 8; s.path = []; s.res = []; s.i = 0; s.start = 0;
        VizCore.applyNums(s, cv, "nums", s.c);
        VizCore.applyTarget(s, cv, 8);
        s.t = s.target;
        log(`[Khởi tạo] combinationSum2 target=${s.t}`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.t === 0) {
            s.res.push(s.path.slice());
            log(`Found ${JSON.stringify(s.path)}`, "success");
            s.i = s.path.length ? s.path.length : s.c.length;
            if (s.path.length) { const v = s.path.pop(); s.t += v; s.start = s.c.indexOf(v, s.start) + 1; }
            else { s.done = true; s.outputText = String(`${s.res.length} combos`); log(`[KẾT QUẢ] ${s.res.length} combos`, "success"); }
            return;
        }
        if (s.start >= s.c.length || s.t < 0) {
            if (!s.path.length) { s.done = true; s.outputText = String(`${JSON.stringify(s.res)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success"); return; }
            const v = s.path.pop(); s.t += v; s.start = s.c.indexOf(v) + 1;
            return;
        }
        const v = s.c[s.start];
        s.path.push(v); s.t -= v;
        log(`pick ${v} at ${s.start}`, "info");
        s.start++;
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "remain", value: s.t, cls: "accent" }, { label: "found", value: s.res.length, cls: "success" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Unique combos").appendChild(VizCore.arrayRow(s.c, { active: s.start }));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "array", id: "lc-input-nums", label: "candidates", values: VizCore.arrayValues(cv, s, s.c) },
            { type: "target", id: "lc-input-target", label: "target", value: cv.target ?? s.t }
        ], cv);
    }
};
