window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[2] = {
    initialize: function (state, log, customValues) {
        state.list1 = [2, 4, 3];
        state.list2 = [5, 6, 4];
        if (customValues) {
            if (customValues.nums) {
                const a = VizCore.parseNums(customValues.nums);
                if (a.length) state.list1 = a;
            }
            if (customValues.str) {
                const b = VizCore.parseNums(customValues.str);
                if (b.length) state.list2 = b;
            }
        }
        state.p1 = 0;
        state.p2 = 0;
        state.carry = 0;
        state.result = [];
        log(`[Khởi tạo] L1=[${state.list1.join("→")}] + L2=[${state.list2.join("→")}] (digits reversed).`, "info");
    },

    step: function (state, log) {
        if (state.done) return;

        const done1 = state.p1 >= state.list1.length;
        const done2 = state.p2 >= state.list2.length;
        if (done1 && done2 && state.carry === 0) {
            state.done = true;
            s.outputText = String(`[${state.result.join("→")}]`); log(`[KẾT QUẢ] [${state.result.join("→")}]`, "success");
            return;
        }

        const v1 = done1 ? 0 : state.list1[state.p1];
        const v2 = done2 ? 0 : state.list2[state.p2];
        const sum = v1 + v2 + state.carry;
        const digit = sum % 10;
        state.carry = Math.floor(sum / 10);
        state.result.push(digit);

        log(`Bước ${state.stepIndex}: ${v1}+${v2}+carry → ${sum} → digit ${digit}, carry ${state.carry}`, "info");

        if (!done1) state.p1++;
        if (!done2) state.p2++;

        if (state.p1 >= state.list1.length && state.p2 >= state.list2.length && state.carry === 0) {
            state.done = true;
            s.outputText = String(`[${state.result.join("→")}]`); log(`[KẾT QUẢ] [${state.result.join("→")}]`, "success");
        }
    },

    render: function (state, sandboxCanvas, statsPanel) {
        VizCore.statsBar(statsPanel, [
            { label: "Carry", value: state.carry, cls: "warn" },
            { label: "p1", value: `${Math.min(state.p1, state.list1.length)}/${state.list1.length}`, cls: "accent" },
            { label: "p2", value: `${Math.min(state.p2, state.list2.length)}/${state.list2.length}`, cls: "accent" },
            { label: "Sum digits", value: state.result.join("→") || "—", cls: "success" }
        ]);

        const stage = document.createElement("div");
        stage.className = "viz-ll-stage";

        function buildRow(label, cls, items, ptr) {
            const row = document.createElement("div");
            row.className = "viz-ll-row";
            const lab = document.createElement("div");
            lab.className = `viz-ll-label ${cls}`;
            lab.textContent = label;
            row.appendChild(lab);
            const nodes = document.createElement("div");
            nodes.className = "viz-ll-nodes";
            items.forEach((val, idx) => {
                const wrap = document.createElement("div");
                wrap.className = "viz-ll-node-wrap";
                const tag = document.createElement("div");
                tag.className = `viz-ll-tag ${cls}` + (idx === ptr && ptr < items.length ? " visible" : "");
                tag.textContent = "p ▼";
                wrap.appendChild(tag);
                const node = document.createElement("div");
                node.className = "viz-ll-node";
                if (idx === ptr && ptr < items.length) node.classList.add(cls === "l1" ? "active-l" : "active-r");
                else if (idx < ptr) node.classList.add("done");
                node.innerHTML = `<span class="val">${val}</span>`;
                wrap.appendChild(node);
                nodes.appendChild(wrap);
                if (idx < items.length - 1) {
                    const arr = document.createElement("div");
                    arr.className = "viz-ll-arrow";
                    arr.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
                    nodes.appendChild(arr);
                }
            });
            row.appendChild(nodes);
            stage.appendChild(row);
        }

        buildRow("L1", "l1", state.list1, state.p1);
        buildRow("L2", "l2", state.list2, state.p2);

        const sumRow = document.createElement("div");
        sumRow.className = "viz-ll-row";
        const sumLab = document.createElement("div");
        sumLab.className = "viz-ll-label merged";
        sumLab.textContent = "Sum";
        sumRow.appendChild(sumLab);
        const sumNodes = document.createElement("div");
        sumNodes.className = "viz-ll-nodes";
        if (!state.result.length) {
            sumNodes.innerHTML = '<span class="viz-ll-empty">—</span>';
        } else {
            state.result.forEach((val, idx) => {
                const wrap = document.createElement("div");
                wrap.className = "viz-ll-node-wrap";
                const node = document.createElement("div");
                node.className = "viz-ll-node merged" + (idx === state.result.length - 1 && !state.done ? " anim-active" : " done");
                node.innerHTML = `<span class="val">${val}</span>`;
                wrap.appendChild(node);
                sumNodes.appendChild(wrap);
                if (idx < state.result.length - 1) {
                    const arr = document.createElement("div");
                    arr.className = "viz-ll-arrow merged";
                    arr.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
                    sumNodes.appendChild(arr);
                }
            });
        }
        sumRow.appendChild(sumNodes);
        stage.appendChild(sumRow);
        sandboxCanvas.appendChild(stage);
    },

    renderControls: function (state, container, customValues) {
        VizCore.controls(container, [
            { type: "array", id: "lc-input-nums", label: "L1", values: VizCore.parseNums(customValues.nums || state.list1.join(",")).length ? VizCore.parseNums(customValues.nums || state.list1.join(",")) : state.list1 },
            { type: "array", id: "lc-input-str", label: "L2", values: VizCore.parseNums(customValues.str || state.list2.join(",")).length ? VizCore.parseNums(customValues.str || state.list2.join(",")) : state.list2 }
        ], customValues);
    }
};
