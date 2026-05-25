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
        if (arrayEditor) {
            arrayEditor.appendChild(applyBtn);
        } else {
            const editors = row.querySelectorAll(".viz-string-editor, .viz-target-editor, .viz-select-editor");
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

    bindApply(container, callback) {
        const btn = container.querySelector("#lc-btn-apply");
        if (btn) btn.addEventListener("click", callback);
        container.querySelectorAll("input:not(.viz-array-edit-cell input), select").forEach(el => {
            el.addEventListener("keydown", e => {
                if (e.key === "Enter") { e.preventDefault(); callback(); }
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
