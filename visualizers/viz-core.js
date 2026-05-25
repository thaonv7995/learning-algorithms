/* Shared visualizer core — Algorithms Explorer */
window.VizCore = {
    parseNums(str) {
        if (!str || !String(str).trim()) return [];
        return String(str).split(",").map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x));
    },

    parseStr(str) {
        return str != null ? String(str) : "";
    },

    parseInt(val, fallback) {
        const n = parseInt(val, 10);
        return isNaN(n) ? fallback : n;
    },

    applyNums(state, customValues, key, fallback) {
        state[key] = fallback.slice();
        if (customValues && customValues.nums) {
            const p = this.parseNums(customValues.nums);
            if (p.length) state[key] = p;
        }
    },

    applyStr(state, customValues, key, fallback) {
        state[key] = fallback;
        if (customValues && customValues.str) state[key] = this.parseStr(customValues.str);
    },

    applyTarget(state, customValues, fallback) {
        state.target = fallback;
        if (customValues && customValues.target !== undefined && customValues.target !== "") {
            state.target = this.parseInt(customValues.target, fallback);
        }
    },

    statsBar(statsPanel, items) {
        statsPanel.innerHTML = `<div class="viz-stats-bar">${items.map(it => `
            <div class="viz-stat">
                <span class="label">${it.label}</span>
                <span class="value ${it.cls || ""}">${it.value}</span>
            </div>`).join("")}</div>`;
    },

    controls(container, fields, customValues) {
        container.innerHTML = "";
        const panel = document.createElement("div");
        panel.className = "viz-input-panel";

        const row = document.createElement("div");
        row.className = "viz-inputs";

        fields.forEach(f => {
            if (f.type === "array") {
                row.appendChild(this.buildArrayEditor(f));
            } else if (f.type === "target" || (f.type === "number" && f.id === "lc-input-target")) {
                row.appendChild(this.buildTargetField(f));
            } else if (f.type === "string") {
                row.appendChild(this.buildStringField(f));
            } else if (f.type === "select") {
                row.appendChild(this.buildSelectField(f));
            } else if (f.type === "textarea") {
                row.appendChild(this.buildTextareaField(f));
            } else if (f.type === "matrix") {
                row.appendChild(this.buildMatrixEditor(f));
            } else {
                const grp = document.createElement("div");
                grp.className = "viz-input-group";
                grp.innerHTML = `<label for="${f.id}">${f.label}</label>
                    <input type="${f.type || "text"}" id="${f.id}" value="${f.value != null ? this._esc(f.value) : ""}" placeholder="${f.placeholder || ""}">`;
                row.appendChild(grp);
            }
        });

        panel.appendChild(row);

        const applyBtn = document.createElement("button");
        applyBtn.type = "button";
        applyBtn.className = "viz-btn-apply";
        applyBtn.id = "lc-btn-apply";
        applyBtn.title = "Áp dụng dữ liệu mới";
        applyBtn.setAttribute("aria-label", "Áp dụng dữ liệu mới");
        applyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

        const arrayEditor = row.querySelector(".viz-array-editor");
        const matrixEditor = row.querySelector(".viz-matrix-editor");
        if (arrayEditor) {
            arrayEditor.appendChild(applyBtn);
        } else if (matrixEditor) {
            matrixEditor.appendChild(applyBtn);
        } else {
            const editors = row.querySelectorAll(".viz-string-editor, .viz-target-editor, .viz-select-editor, .viz-textarea-editor");
            const inlineHost = editors.length ? editors[editors.length - 1] : null;
            if (inlineHost) {
                inlineHost.appendChild(applyBtn);
            } else {
                const actions = document.createElement("div");
                actions.className = "viz-input-actions";
                actions.appendChild(applyBtn);
                panel.appendChild(actions);
            }
        }

        container.appendChild(panel);
    },

    _esc(v) {
        return String(v).replace(/"/g, "&quot;");
    },

    getArrayEditorValues(editorEl) {
        if (!editorEl) return [];
        return Array.from(editorEl.querySelectorAll(".viz-array-edit-cell input"))
            .map(inp => inp.value.trim())
            .filter(v => v !== "" && !isNaN(parseInt(v, 10)))
            .map(v => parseInt(v, 10));
    },

    syncArrayEditorHidden(editorEl) {
        if (!editorEl) return;
        const hidden = document.getElementById(editorEl.dataset.hiddenId || "lc-input-nums");
        if (hidden) hidden.value = this.getArrayEditorValues(editorEl).join(",");
    },

    buildArrayEditor(field) {
        const wrap = document.createElement("div");
        wrap.className = "viz-input-group viz-array-editor-group";

        const label = document.createElement("label");
        label.textContent = field.label;
        label.setAttribute("for", field.id + "-cell-0");
        wrap.appendChild(label);

        const editor = document.createElement("div");
        editor.className = "viz-array-editor";
        editor.id = "lc-array-editor-" + field.id;
        editor.dataset.hiddenId = field.id;

        const hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.id = field.id;

        const cells = document.createElement("div");
        cells.className = "viz-array-edit-cells";

        const values = Array.isArray(field.values) ? field.values : this.parseNums(String(field.values || ""));
        if (!values.length) values.push(0);

        const self = this;

        function addCell(val, idx) {
            const cell = document.createElement("div");
            cell.className = "viz-array-edit-cell";
            const inp = document.createElement("input");
            inp.type = "number";
            inp.value = val;
            inp.id = field.id + "-cell-" + idx;
            inp.title = "Index " + idx;
            inp.addEventListener("keydown", e => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    self.syncArrayEditorHidden(editor);
                    if (typeof window.__lcApplyInputs === "function") window.__lcApplyInputs();
                }
            });
            inp.addEventListener("input", () => self.syncArrayEditorHidden(editor));
            cell.appendChild(inp);

            const rm = document.createElement("button");
            rm.type = "button";
            rm.className = "viz-array-edit-rm";
            rm.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            rm.title = "Xóa phần tử";
            rm.addEventListener("click", () => {
                if (cells.children.length <= 1) return;
                cell.remove();
                self.syncArrayEditorHidden(editor);
            });
            cell.appendChild(rm);
            cells.appendChild(cell);
        }

        values.forEach((v, i) => addCell(v, i));

        const addBtn = document.createElement("button");
        addBtn.type = "button";
        addBtn.className = "viz-array-edit-add";
        addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
        addBtn.title = "Thêm phần tử";
        addBtn.addEventListener("click", () => {
            addCell(field.placeholder || 0, cells.children.length);
            self.syncArrayEditorHidden(editor);
            const last = cells.lastElementChild && cells.lastElementChild.querySelector("input");
            if (last) last.focus();
        });

        editor.appendChild(cells);
        editor.appendChild(addBtn);
        wrap.appendChild(editor);
        wrap.appendChild(hidden);

        this.syncArrayEditorHidden(editor);
        return wrap;
    },

    buildTargetField(field) {
        const wrap = document.createElement("div");
        wrap.className = "viz-input-group viz-target-group";

        const label = document.createElement("label");
        label.textContent = field.label;
        label.setAttribute("for", field.id);
        wrap.appendChild(label);

        const box = document.createElement("div");
        box.className = "viz-target-editor";

        const inp = document.createElement("input");
        inp.type = "number";
        inp.id = field.id;
        inp.value = field.value != null ? field.value : "";
        inp.placeholder = field.placeholder != null ? field.placeholder : "0";
        inp.title = field.label;
        box.appendChild(inp);

        wrap.appendChild(box);
        return wrap;
    },

    buildStringField(field) {
        const wrap = document.createElement("div");
        wrap.className = "viz-input-group viz-string-group";

        const label = document.createElement("label");
        label.textContent = field.label;
        label.setAttribute("for", field.id);
        wrap.appendChild(label);

        const box = document.createElement("div");
        box.className = "viz-string-editor";

        const inp = document.createElement("input");
        inp.type = "text";
        inp.id = field.id;
        inp.value = field.value != null ? field.value : "";
        inp.placeholder = field.placeholder || "";
        inp.title = field.label;
        inp.spellcheck = false;
        box.appendChild(inp);

        wrap.appendChild(box);
        return wrap;
    },

    buildSelectField(field) {
        const wrap = document.createElement("div");
        wrap.className = "viz-input-group viz-select-group";

        const label = document.createElement("label");
        label.textContent = field.label;
        label.setAttribute("for", field.id);
        wrap.appendChild(label);

        const box = document.createElement("div");
        box.className = "viz-select-editor";

        const sel = document.createElement("select");
        sel.id = field.id;
        (field.options || []).forEach(opt => {
            const o = document.createElement("option");
            o.value = opt.value;
            o.textContent = opt.label;
            if (String(field.value) === String(opt.value)) o.selected = true;
            sel.appendChild(o);
        });
        box.appendChild(sel);
        wrap.appendChild(box);
        return wrap;
    },

    buildTextareaField(field) {
        const wrap = document.createElement("div");
        wrap.className = "viz-input-group viz-textarea-group";
        wrap.style.flex = "1 1 180px";
        wrap.style.minWidth = "140px";

        const label = document.createElement("label");
        label.textContent = field.label;
        label.setAttribute("for", field.id);
        wrap.appendChild(label);

        const box = document.createElement("div");
        box.className = "viz-textarea-editor";

        const ta = document.createElement("textarea");
        ta.id = field.id;
        ta.rows = field.rows || 4;
        ta.spellcheck = false;
        ta.placeholder = field.placeholder || "";
        ta.value = field.value != null ? field.value : "";
        ta.style.cssText = "width:100%;min-width:120px;font-family:monospace;font-size:0.72rem;line-height:1.35;resize:vertical;background:var(--surface,#0f172a);color:#e2e8f0;border:1px solid var(--border,#334155);border-radius:8px;padding:8px;";
        box.appendChild(ta);
        wrap.appendChild(box);
        return wrap;
    },

    parseMatrix(text, fallback) {
        const fb = (fallback || [[1]]).map(r => r.slice());
        if (!text || !String(text).trim()) return fb;
        const rows = String(text).trim().split(/\r?\n/)
            .map(l => l.split(/[,\s]+/).map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x)))
            .filter(r => r.length);
        if (!rows.length) return fb;
        const n = Math.max(...rows.map(r => r.length));
        return rows.map(r => {
            const row = r.slice();
            while (row.length < n) row.push(0);
            return row;
        });
    },

    matrixToBoardText(matrix) {
        return (matrix || []).map(row => row.join(",")).join("\n");
    },

    matrixValues(customValues, state, fallback) {
        if (customValues && customValues.board) {
            const p = this.parseMatrix(customValues.board, fallback);
            if (p.length) return p;
        }
        if (state && state.matrix && state.matrix.length) return state.matrix.map(r => r.slice());
        return (fallback || [[1]]).map(r => r.slice());
    },

    getMatrixEditorValues(editorEl) {
        if (!editorEl) return [];
        const n = parseInt(editorEl.dataset.size, 10) || 3;
        const grid = editorEl.querySelector(".viz-matrix-edit-grid");
        if (!grid) return [];
        const rows = [];
        for (let r = 0; r < n; r++) {
            const row = [];
            for (let c = 0; c < n; c++) {
                const inp = grid.querySelector(`input[data-r="${r}"][data-c="${c}"]`);
                const v = inp ? parseInt(inp.value, 10) : 0;
                row.push(isNaN(v) ? 0 : v);
            }
            rows.push(row);
        }
        return rows;
    },

    syncMatrixEditorHidden(editorEl) {
        if (!editorEl) return;
        const hidden = document.getElementById(editorEl.dataset.hiddenId || "lc-input-board");
        if (hidden) hidden.value = this.matrixToBoardText(this.getMatrixEditorValues(editorEl));
    },

    buildMatrixEditor(field) {
        const self = this;
        const wrap = document.createElement("div");
        wrap.className = "viz-input-group viz-matrix-editor-group";

        const label = document.createElement("label");
        label.textContent = field.label || "Ma trận n×n";
        wrap.appendChild(label);

        const toolbar = document.createElement("div");
        toolbar.className = "viz-matrix-toolbar";

        const hidden = document.createElement("textarea");
        hidden.id = field.id || "lc-input-board";
        hidden.style.display = "none";
        hidden.spellcheck = false;

        const editor = document.createElement("div");
        editor.className = "viz-matrix-editor";
        editor.id = "lc-matrix-editor-" + (field.id || "board");
        editor.dataset.hiddenId = field.id || "lc-input-board";

        let matrix = Array.isArray(field.values) && field.values.length
            ? field.values.map(r => r.slice())
            : this.parseMatrix(field.value, [[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        let n = field.size || matrix.length || 3;
        n = Math.min(6, Math.max(2, n));

        const sizeLbl = document.createElement("span");
        sizeLbl.className = "viz-matrix-size";
        sizeLbl.textContent = `${n}×${n}`;

        const btnDec = document.createElement("button");
        btnDec.type = "button";
        btnDec.className = "viz-matrix-size-btn";
        btnDec.textContent = "−";
        btnDec.title = "Giảm kích thước";

        const btnInc = document.createElement("button");
        btnInc.type = "button";
        btnInc.className = "viz-matrix-size-btn";
        btnInc.textContent = "+";
        btnInc.title = "Tăng kích thước";

        toolbar.appendChild(btnDec);
        toolbar.appendChild(sizeLbl);
        toolbar.appendChild(btnInc);
        wrap.appendChild(toolbar);

        const gridWrap = document.createElement("div");
        gridWrap.className = "viz-matrix-edit-grid-wrap";

        function paintGrid() {
            gridWrap.innerHTML = "";
            const grid = document.createElement("div");
            grid.className = "viz-matrix-edit-grid";
            grid.style.gridTemplateColumns = `repeat(${n}, 34px)`;

            for (let r = 0; r < n; r++) {
                for (let c = 0; c < n; c++) {
                    const cell = document.createElement("div");
                    cell.className = "viz-matrix-edit-cell";
                    const inp = document.createElement("input");
                    inp.type = "number";
                    inp.dataset.r = String(r);
                    inp.dataset.c = String(c);
                    inp.value = matrix[r] && matrix[r][c] != null ? matrix[r][c] : (r === c ? r + 1 : 0);
                    inp.addEventListener("input", () => self.syncMatrixEditorHidden(editor));
                    cell.appendChild(inp);
                    grid.appendChild(cell);
                }
            }
            gridWrap.appendChild(grid);
            editor.dataset.size = String(n);
            sizeLbl.textContent = `${n}×${n}`;
            self.syncMatrixEditorHidden(editor);
        }

        function resize(newN) {
            newN = Math.min(6, Math.max(2, newN));
            if (newN === n) return;
            const next = Array.from({ length: newN }, (_, r) =>
                Array.from({ length: newN }, (_, c) =>
                    matrix[r] && matrix[r][c] != null ? matrix[r][c] : (r === c ? r + 1 : 0)
                )
            );
            n = newN;
            matrix = next;
            paintGrid();
        }

        btnDec.addEventListener("click", () => resize(n - 1));
        btnInc.addEventListener("click", () => resize(n + 1));

        editor.appendChild(gridWrap);
        wrap.appendChild(editor);
        wrap.appendChild(hidden);

        hidden.value = self.matrixToBoardText(matrix);
        paintGrid();
        return wrap;
    },

    /**
     * Render square matrix grid for simulation.
     * opts: { active:[r,c], secondary:[r,c], highlightRow, flash, swap, result }
     */
    renderMatrixGrid(matrix, opts) {
        opts = opts || {};
        const n = matrix.length;
        const wrap = document.createElement("div");
        wrap.className = "viz-matrix-display" + (opts.flash ? " flash" : "") + (opts.result ? " result" : "");

        const grid = document.createElement("div");
        grid.className = "viz-matrix-grid";
        grid.style.gridTemplateColumns = `repeat(${n}, 36px)`;

        matrix.forEach((row, ri) => {
            row.forEach((cell, ci) => {
                const el = document.createElement("div");
                el.className = "viz-matrix-cell";
                const isActive = opts.active && opts.active[0] === ri && opts.active[1] === ci;
                const isSecondary = opts.secondary && opts.secondary[0] === ri && opts.secondary[1] === ci;
                const inRow = opts.highlightRow === ri;
                if (isActive) el.classList.add("active");
                if (isSecondary) el.classList.add("secondary");
                if (inRow && opts.phase === "reverse") el.classList.add("row-hl");
                if (opts.swap && (isActive || isSecondary)) el.classList.add("swap");
                if (opts.result) el.classList.add("result-cell");
                el.innerHTML = `<span class="val">${cell}</span><span class="idx">${ri},${ci}</span>`;
                grid.appendChild(el);
            });
        });

        wrap.appendChild(grid);
        return wrap;
    },

    /** Parse Sudoku board: 9 dòng × 9 ký tự hoặc 81 ký tự liên tiếp. */
    parseSudokuBoard(text) {
        const fallback = () => Array.from({ length: 9 }, () => Array(9).fill("."));
        if (!text || !String(text).trim()) return fallback();
        const raw = String(text).trim();
        const lines = raw.split(/\r?\n/).map(l => l.replace(/\s/g, "")).filter(Boolean);
        if (lines.length >= 9) {
            return lines.slice(0, 9).map(line => {
                const row = line.slice(0, 9).split("");
                while (row.length < 9) row.push(".");
                return row.map(ch => (/^[1-9]$/.test(ch) ? ch : "."));
            });
        }
        const flat = raw.replace(/[^1-9.]/g, "");
        if (flat.length >= 81) {
            const board = [];
            for (let r = 0; r < 9; r++) board.push(flat.slice(r * 9, r * 9 + 9).split("").map(ch => (/^[1-9]$/.test(ch) ? ch : ".")));
            return board;
        }
        return fallback();
    },

    boardToSudokuText(board) {
        return (board || []).map(row => row.join("")).join("\n");
    },

    /**
     * Render 9×9 Sudoku grid.
     * opts: { active:[r,c], conflict:[r,c], highlightRow, highlightCol, highlightBox, cellSize }
     */
    renderSudokuGrid(board, opts) {
        opts = opts || {};
        const size = opts.cellSize || 32;
        const gap = 2;
        const br = opts.active ? opts.active[0] : -1;
        const bc = opts.active ? opts.active[1] : -1;
        const cr = opts.conflict ? opts.conflict[0] : -1;
        const cc = opts.conflict ? opts.conflict[1] : -1;
        const hRow = opts.highlightRow;
        const hCol = opts.highlightCol;
        const hBox = opts.highlightBox;

        const wrap = document.createElement("div");
        wrap.style.cssText = "display:inline-block;padding:6px;background:#0f172a;border-radius:10px;border:2px solid #334155;";

        const grid = document.createElement("div");
        grid.style.cssText = `display:grid;grid-template-columns:repeat(9,${size}px);gap:${gap}px;font-family:monospace;font-size:0.85rem;`;

        board.forEach((row, ri) => row.forEach((cell, ci) => {
            const el = document.createElement("div");
            const isActive = ri === br && ci === bc;
            const isConflict = ri === cr && ci === cc;
            const inRow = hRow === ri;
            const inCol = hCol === ci;
            const inBox = hBox != null && Math.floor(ri / 3) * 3 + Math.floor(ci / 3) === hBox;
            const thickR = ci % 3 === 0 && ci > 0;
            const thickB = ri % 3 === 0 && ri > 0;

            let bg = "#1e293b";
            if (isConflict) bg = "#ef444455";
            else if (isActive) bg = "#818cf855";
            else if (inRow || inCol || inBox) bg = "#6366f122";

            let border = "#475569";
            if (isConflict) border = "#ef4444";
            else if (isActive) border = "#818cf8";
            else if (inBox) border = "#6366f1";

            el.style.cssText = [
                `width:${size}px`, `height:${size}px`,
                "display:flex", "align-items:center", "justify-content:center",
                `border:1px solid ${border}`,
                thickR ? "border-left:2px solid #64748b" : "",
                thickB ? "border-top:2px solid #64748b" : "",
                `border-radius:4px`, `background:${bg}`,
                `color:${cell === "." ? "#475569" : "#f1f5f9"}`,
                `font-weight:${cell === "." ? "400" : "700"}`
            ].filter(Boolean).join(";");
            el.textContent = cell;
            grid.appendChild(el);
        }));

        wrap.appendChild(grid);
        return wrap;
    },

    /** Explicit override — visualizer sets state.vizOutput = { kind, ... } */
    resolveOutput(state) {
        if (!state) return null;
        if (state.vizOutput) return state.vizOutput;

        const resolvers = window.LC_OUTPUT_RESOLVERS;
        if (resolvers && state.id != null && Object.prototype.hasOwnProperty.call(resolvers, state.id)) {
            return resolvers[state.id](state);
        }
        if (window.LC_OUTPUT_FALLBACK) {
            const fb = window.LC_OUTPUT_FALLBACK(state);
            if (fb) return fb;
        }

        const cur = state.current;
        const flashFound = cur && cur.type === "found";

        if (state.done && typeof state.res === "number" && state.bit !== undefined) {
            return { kind: "value", value: state.res, flash: true, suffix: "kết quả" };
        }

        if (Array.isArray(state.merged) && state.merged.length) {
            return { kind: "flow", text: state.merged.join(" → "), flash: state.done };
        }

        if (Array.isArray(state.resultPair) && state.resultPair.length) {
            return { kind: "array", values: state.resultPair.slice(), flash: state.done, label: "indices" };
        }

        if (state.done && state.maxLen != null && state.last != null
            && typeof state.last === "object" && !Array.isArray(state.last)) {
            return { kind: "value", value: state.maxLen, suffix: "maxLen", flash: true };
        }

        if (state.done && state.id === 20 && Array.isArray(state.stack) && typeof state.str === "string") {
            return {
                kind: "bool",
                value: state.stack.length === 0 && state.left >= state.str.length,
                flash: true
            };
        }

        if (state.done && state.reversedArrows && Object.keys(state.reversedArrows).length > 0
            && Array.isArray(state.listNodes) && state.listNodes.length) {
            return {
                kind: "flow",
                text: state.listNodes.slice().reverse().join(" → "),
                flash: true
            };
        }

        if (Array.isArray(state.allRes) && state.allRes.length && Array.isArray(state.allRes[0])) {
            const items = (state.res && state.res.length ? state.res : state.allRes)
                .map(a => `[${a.join(", ")}]`);
            const total = state.allRes.length;
            const progress = (state.res || []).length;
            return {
                kind: "items",
                items,
                progress: flashFound ? progress : (state.done ? total : progress),
                total,
                flash: flashFound
            };
        }

        if (Array.isArray(state.res) && state.res.length) {
            const first = state.res[0];
            if (Array.isArray(first)) {
                return {
                    kind: "items",
                    items: state.res.map(a => `[${a.join(", ")}]`),
                    flash: flashFound
                };
            }
            if (typeof first === "number") {
                if (state.t !== undefined && state.dir !== undefined) {
                    return { kind: "flow", text: state.res.join(" → "), flash: state.done };
                }
                if (first >= 0 && first <= 1 && state.s && state.p) {
                    return null;
                }
                return { kind: "array", values: state.res.slice(), flash: state.done };
            }
            if (typeof first === "string") {
                if (state.lines || state.res.every(x => typeof x === "string")) {
                    return { kind: "lines", lines: state.res.slice(), flash: state.done };
                }
                return { kind: "items", items: state.res.slice(), flash: flashFound || state.done };
            }
        }

        if (Array.isArray(state.lines) && state.lines.length) {
            return { kind: "lines", lines: state.lines.slice(), flash: state.done };
        }

        if (state.groups && typeof state.groups === "object") {
            const keys = Object.keys(state.groups);
            if (keys.length) {
                return {
                    kind: "items",
                    items: keys.map(k => `${k}: [${state.groups[k].join(", ")}]`),
                    flash: state.done
                };
            }
        }

        if (state.done && state.result && Array.isArray(state.result[0])) {
            return { kind: "matrix", matrix: state.result, orig: state.orig, flash: true };
        }

        if (Array.isArray(state.output) && (state.done || state.output.some((v, i) => v !== 1 && v !== 0))) {
            return { kind: "array", values: state.output.slice(), flash: state.done, label: "output[]" };
        }

        if (Array.isArray(state.ans) && state.ans.length) {
            return { kind: "array", values: state.ans.slice(), flash: state.done };
        }

        if (Array.isArray(state.found) && state.found.length) {
            if (typeof state.found[0] === "number") {
                return { kind: "array", values: state.found.slice(), flash: state.done };
            }
        }

        if (Array.isArray(state.result)) {
            return { kind: "flow", text: state.result.join(" → "), flash: state.done };
        }

        if (state.mergedList && state.mergedList.length) {
            const vals = state.mergedList.map(x => (x && x.val != null ? x.val : x));
            return { kind: "flow", text: vals.join(" → "), flash: state.done };
        }

        if (Array.isArray(state.merged) && state.merged.length) {
            return { kind: "flow", text: state.merged.join(" → "), flash: state.done };
        }

        if (Array.isArray(state.work) && state.work.length && state.done) {
            return { kind: "flow", text: state.work.join(" → "), flash: true };
        }

        if (Array.isArray(state.digits) && state.done) {
            return { kind: "array", values: state.digits.slice(), flash: true };
        }

        if (typeof state.valid === "boolean" && state.done) {
            return { kind: "bool", value: state.valid, flash: true };
        }
        if (typeof state.ok === "boolean" && state.done) {
            return { kind: "bool", value: state.ok, flash: true };
        }
        if (typeof state.result === "boolean" && state.done) {
            return { kind: "bool", value: state.result, flash: true };
        }

        if (state.done) {
            if (typeof state.best === "string" && state.best) {
                return { kind: "text", text: `"${state.best}"`, flash: true };
            }
            if (typeof state.best === "number") {
                return { kind: "value", value: state.best, flash: true };
            }
            if (state.maxArea != null && state.maxArea > 0) {
                return { kind: "value", value: state.maxArea, suffix: "diện tích", flash: true };
            }
            if (state.id === 42 || (Array.isArray(state.waterLevels) && state.waterLevels.length)) {
                return { kind: "value", value: state.water, suffix: "nước đọng", flash: true };
            }
            if (state.maxLen != null && state.last != null && typeof state.last === "object" && !Array.isArray(state.last)) {
                return { kind: "value", value: state.maxLen, suffix: "độ dài", flash: true };
            }
            if (state.maxProfit != null && state.minPrice !== undefined) {
                return { kind: "value", value: state.maxProfit, suffix: "lợi nhuận", flash: true };
            }
            if (state.answer != null) {
                return { kind: "value", value: state.answer, flash: true };
            }
            if (typeof state.result === "number") {
                return { kind: "value", value: state.result, flash: true };
            }
            if (typeof state.result === "string") {
                return { kind: "text", text: `"${state.result}"`, flash: true };
            }
            if (state.ans != null && typeof state.ans === "number") {
                return { kind: "value", value: state.ans, flash: true };
            }
            if (state.len != null && typeof state.str === "string") {
                return { kind: "value", value: state.len, suffix: "độ dài từ", flash: true };
            }
            if (state.count != null && (state.cols || state.id === 51 || state.id === 52)) {
                return { kind: "value", value: state.count, suffix: "cách", flash: true };
            }
            if (state.dp && Array.isArray(state.dp) && state.nums && state.nums.length && state.i >= state.nums.length) {
                const v = Math.max(state.dp[0] || 0, state.dp[1] || 0);
                return { kind: "value", value: v, suffix: "max", flash: true };
            }
            if (state.dp && state.target != null && state.coinIdx !== undefined) {
                const v = state.dp[state.target];
                if (v != null) {
                    return {
                        kind: "value",
                        value: v === Infinity ? "∞" : v,
                        suffix: "dp[target]",
                        flash: true
                    };
                }
            }
        }

        if (Array.isArray(state.res) && state.res.length && !state.done) {
            return { kind: "items", items: state.res.map(x => String(x)), progress: state.res.length, flash: flashFound };
        }

        return null;
    },

    renderOutputItems(sec, items, flashIdx, heroLabel) {
        if (heroLabel) {
            const lbl = document.createElement("div");
            lbl.className = "viz-output-hero-label";
            lbl.textContent = heroLabel;
            sec.appendChild(lbl);
        }
        const wrap = document.createElement("div");
        wrap.className = "viz-output-list";
        if (!items || !items.length) {
            const empty = document.createElement("div");
            empty.className = "viz-output-empty";
            empty.textContent = "Chưa có kết quả — tiếp tục Step…";
            wrap.appendChild(empty);
        } else {
            items.forEach((item, idx) => {
                const chip = document.createElement("div");
                chip.className = "viz-output-chip" + (idx === flashIdx ? " flash" : "");
                chip.textContent = typeof item === "string" ? item : JSON.stringify(item);
                wrap.appendChild(chip);
            });
        }
        sec.appendChild(wrap);
    },

    renderOutputSpec(sec, spec, state) {
        state = state || {};

        if (state.vizError) {
            const err = document.createElement("div");
            err.className = "viz-output-empty error";
            err.textContent = `✗ Lỗi: ${state.vizError}`;
            sec.appendChild(err);
            return;
        }

        if (!spec) {
            const empty = document.createElement("div");
            empty.className = "viz-output-empty" + (state.done ? " done" : "");
            if (!state.done) {
                empty.textContent = "Chưa có kết quả — nhấn Step hoặc Tự động để chạy tiếp…";
            } else if (state.outputNote) {
                empty.textContent = state.outputNote;
            } else if (state._catalogFallback) {
                empty.textContent = `✓ Hoàn tất (sandbox tạm) — LC #${state.id || "?"} cần visualizer riêng để hiện Output chính xác. Xem log [KẾT QUẢ] bên dưới.`;
            } else {
                const id = state.id != null ? ` #${state.id}` : "";
                empty.textContent = `✓ Hoàn tất${id} — chưa map Output panel (thiếu resolver hoặc state.kết quả). Xem dòng log [KẾT QUẢ] phía dưới.`;
            }
            sec.appendChild(empty);
            return;
        }

        const flash = !!spec.flash;

        if (spec.kind === "items") {
            const flashIdx = spec.flash ? (spec.progress != null ? spec.progress - 1 : spec.items.length - 1) : -1;
            const label = spec.total ? `Kết quả (${spec.progress || spec.items.length}/${spec.total})` : null;
            this.renderOutputItems(sec, spec.items, flashIdx >= 0 ? flashIdx : -1, flash && flashIdx >= 0 ? label : null);
            return;
        }

        if (spec.kind === "array") {
            const hero = document.createElement("div");
            hero.className = "viz-output-hero" + (flash ? " flash" : "");
            if (spec.label) {
                const lbl = document.createElement("div");
                lbl.className = "viz-output-hero-label";
                lbl.textContent = spec.label;
                hero.appendChild(lbl);
            }
            hero.appendChild(this.arrayRow(spec.values, {
                found: spec.values.map((_, i) => i)
            }));
            sec.appendChild(hero);
            return;
        }

        if (spec.kind === "value") {
            const box = document.createElement("div");
            box.className = "viz-output-hero" + (flash ? " flash" : "");
            box.innerHTML = `<div class="viz-output-hero-label">${spec.suffix || "Kết quả"}</div><div class="viz-output-scalar">${spec.value}</div>`;
            sec.appendChild(box);
            return;
        }

        if (spec.kind === "text") {
            const box = document.createElement("div");
            box.className = "viz-output-hero" + (flash ? " flash" : "");
            box.innerHTML = `<div class="viz-output-hero-label">Kết quả</div><div class="viz-output-text">${spec.text}</div>`;
            sec.appendChild(box);
            return;
        }

        if (spec.kind === "bool") {
            const box = document.createElement("div");
            box.className = "viz-output-hero" + (flash ? " flash" : "");
            box.style.borderColor = spec.value ? "#34d399" : "#f87171";
            box.innerHTML = `<div class="viz-output-scalar" style="color:${spec.value ? "#86efac" : "#fca5a5"}">${spec.value ? "✓ true" : "✗ false"}</div>`;
            sec.appendChild(box);
            return;
        }

        if (spec.kind === "flow") {
            const box = document.createElement("div");
            box.className = "viz-output-hero" + (flash ? " flash" : "");
            const flow = document.createElement("div");
            flow.className = "viz-output-flow";
            flow.textContent = spec.text;
            box.appendChild(flow);
            sec.appendChild(box);
            return;
        }

        if (spec.kind === "lines") {
            const wrap = document.createElement("div");
            wrap.className = "viz-output-list";
            spec.lines.forEach((ln, idx) => {
                const chip = document.createElement("div");
                chip.className = "viz-output-chip" + (flash && idx === spec.lines.length - 1 ? " flash" : "");
                chip.textContent = `"${ln}"`;
                wrap.appendChild(chip);
            });
            sec.appendChild(wrap);
            return;
        }

        if (spec.kind === "matrix") {
            const compare = document.createElement("div");
            compare.className = "viz-matrix-compare";
            if (spec.orig) compare.appendChild(this.renderMatrixGrid(spec.orig, {}));
            const arrow = document.createElement("div");
            arrow.className = "viz-matrix-arrow";
            arrow.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
            compare.appendChild(arrow);
            const resultWrap = document.createElement("div");
            resultWrap.className = "viz-output-hero" + (flash ? " flash" : "");
            resultWrap.appendChild(this.renderMatrixGrid(spec.matrix, { result: true, flash }));
            compare.appendChild(resultWrap);
            sec.appendChild(compare);
        }
    },

    ensureOutputPanel(canvas, state) {
        if (!canvas || !state) return;
        if (canvas.querySelector(".viz-output-section:not(.viz-output-auto)")) return;

        const existing = canvas.querySelector(".viz-output-auto");
        if (existing) existing.remove();

        let stage = canvas.querySelector(".viz-stage");
        if (!stage) {
            stage = this.stage();
            canvas.appendChild(stage);
        }

        const num = stage.querySelectorAll(".viz-section").length + 1;
        const sec = this.section(stage, num, "Output");
        sec.classList.add("viz-output-section", "viz-output-auto");

        const spec = this.resolveOutput(state);
        this.renderOutputSpec(sec, spec, state);
    },

    bindApply(container, callback) {
        const btn = container.querySelector("#lc-btn-apply");
        if (btn) btn.addEventListener("click", callback);
        container.querySelectorAll("input:not(.viz-array-edit-cell input), select, textarea").forEach(el => {
            el.addEventListener("keydown", e => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); callback(); }
            });
        });
    },

    /** Build values array for array editor from state + customValues */
    arrayValues(customValues, state, fallback) {
        const fromCv = customValues && customValues.nums ? this.parseNums(customValues.nums) : [];
        if (fromCv.length) return fromCv;
        if (state && state.nums && state.nums.length) return state.nums.slice();
        return fallback.slice();
    },

    stage() {
        const el = document.createElement("div");
        el.className = "viz-stage";
        return el;
    },

    section(stage, num, title) {
        const sec = document.createElement("div");
        sec.className = "viz-section";
        sec.innerHTML = `<div class="viz-section-label"><span class="step-num">${num}</span> ${title}</div>`;
        stage.appendChild(sec);
        return sec;
    },

    flowStatus(text, type) {
        const el = document.createElement("div");
        el.className = "viz-flow-status " + (type || "pending");
        el.innerHTML = text;
        return el;
    },

    arrayRow(nums, opts) {
        opts = opts || {};
        const row = document.createElement("div");
        row.className = "viz-array-row";

        nums.forEach((val, idx) => {
            const wrap = document.createElement("div");
            wrap.className = "viz-cell-wrap";

            const pointers = (opts.pointers || []).filter(p => p.idx === idx);
            const ptr = document.createElement("div");
            ptr.className = "viz-pointer" + (pointers.length ? " visible" : "");
            ptr.textContent = pointers.map(p => p.label).join(" ");
            wrap.appendChild(ptr);

            const cell = document.createElement("div");
            cell.className = "viz-cell";
            cell.innerHTML = `<span class="val">${val}</span><span class="idx">[${idx}]</span>`;

            if (opts.found && opts.found.includes(idx)) cell.classList.add("found");
            else if (opts.active === idx) cell.classList.add("active", "anim-active");
            else if (opts.left === idx) cell.classList.add("active");
            else if (opts.right === idx) cell.classList.add("found");
            else if (opts.mid === idx) cell.classList.add("active", "anim-active");
            else if (opts.dimmed && opts.dimmed(idx)) cell.classList.add("done");
            else if (opts.highlight && opts.highlight(idx)) cell.classList.add("found");

            if (opts.left === idx) cell.style.borderColor = "#818cf8";
            if (opts.right === idx) cell.style.borderColor = "#f87171";
            if (opts.write === idx) cell.style.borderColor = "#fbbf24";

            wrap.appendChild(cell);
            row.appendChild(wrap);
        });

        return row;
    },

    charRow(str, opts) {
        opts = opts || {};
        const chars = str.split("");
        const row = document.createElement("div");
        row.className = "viz-array-row";

        chars.forEach((ch, idx) => {
            const wrap = document.createElement("div");
            wrap.className = "viz-cell-wrap";

            const pointers = (opts.pointers || []).filter(p => p.idx === idx);
            const ptr = document.createElement("div");
            ptr.className = "viz-pointer" + (pointers.length ? " visible" : "");
            ptr.textContent = pointers.map(p => p.label).join(" ");
            wrap.appendChild(ptr);

            const cell = document.createElement("div");
            cell.className = "viz-cell";
            cell.style.width = "44px";
            cell.style.height = "48px";
            const display = ch === " " ? "␣" : ch;
            cell.innerHTML = `<span class="val" style="font-size:0.85rem">${display}</span><span class="idx">${idx}</span>`;

            if (opts.active === idx) cell.classList.add("active", "anim-active");
            if (opts.left === idx) { cell.classList.add("active"); cell.style.borderColor = "#818cf8"; }
            if (opts.right === idx) { cell.classList.add("found"); cell.style.borderColor = "#f87171"; }
            if (opts.inWindow && idx >= opts.windowL && idx <= opts.windowR) {
                cell.style.background = "rgba(99,102,241,0.1)";
            }
            if (opts.skip && opts.skip(idx)) { cell.style.opacity = "0.35"; }

            wrap.appendChild(cell);
            row.appendChild(wrap);
        });

        return row;
    },

    flowEquation(tokens) {
        const flow = document.createElement("div");
        flow.className = "viz-flow";
        const eq = document.createElement("div");
        eq.className = "viz-flow-equation";
        eq.innerHTML = tokens.map(t => {
            if (t.op) return `<span class="viz-flow-op">${t.op}</span>`;
            return `<span class="viz-flow-token ${t.cls || ""}"><span class="tok-label">${t.label}</span><span class="tok-val">${t.val}</span></span>`;
        }).join("");
        flow.appendChild(eq);
        return flow;
    },

    mapPanel(title, entries, matchKey) {
        const panel = document.createElement("div");
        panel.className = "viz-map-panel";
        panel.innerHTML = `<div class="map-title"><i class="fa-solid fa-database"></i> ${title}</div>`;
        const list = document.createElement("div");
        list.className = "viz-map-list";
        const keys = Object.keys(entries);
        if (!keys.length) {
            list.innerHTML = '<span class="viz-map-empty">Trống</span>';
        } else {
            keys.forEach(k => {
                const tag = document.createElement("div");
                tag.className = "viz-map-tag" + (matchKey != null && String(k) === String(matchKey) ? " match" : "");
                tag.innerHTML = `<span class="k">${k}</span><span class="arrow">→</span><span class="v">${entries[k]}</span>`;
                list.appendChild(tag);
            });
        }
        panel.appendChild(list);
        return panel;
    },

    barChart(nums, opts) {
        opts = opts || {};
        const max = Math.max(...nums, 1);
        const wrap = document.createElement("div");
        wrap.style.cssText = "display:flex;align-items:flex-end;justify-content:center;gap:6px;padding:12px 0;min-height:120px;flex-wrap:wrap;";
        nums.forEach((h, idx) => {
            const col = document.createElement("div");
            col.style.cssText = "display:flex;flex-direction:column;align-items:center;gap:4px;position:relative;";
            const barH = Math.max(24, Math.round((h / max) * 90));
            const bar = document.createElement("div");
            bar.style.cssText = `width:28px;height:${barH}px;border-radius:6px 6px 2px 2px;border:2px solid #1e2a42;background:#0e1422;display:flex;align-items:flex-end;justify-content:center;padding-bottom:4px;transition:all 0.25s;font-family:JetBrains Mono,monospace;font-size:0.65rem;font-weight:700;color:#e2e8f0;`;
            bar.textContent = h;
            if (opts.left === idx) { bar.style.borderColor = "#818cf8"; bar.style.background = "rgba(99,102,241,0.2)"; bar.classList.add("anim-active"); }
            if (opts.right === idx) { bar.style.borderColor = "#f87171"; bar.style.background = "rgba(248,113,113,0.15)"; }
            if (opts.active === idx) { bar.style.borderColor = "#38bdf8"; bar.style.boxShadow = "0 0 12px rgba(56,189,248,0.3)"; }
            const lbl = document.createElement("span");
            lbl.style.cssText = "font-size:0.58rem;color:#64748b;";
            lbl.textContent = idx;
            col.appendChild(bar);
            col.appendChild(lbl);
            wrap.appendChild(col);
        });
        return wrap;
    }
};
