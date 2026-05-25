window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[21] = {
    initialize: function(state, log, customValues) {
        state.list1 = [1, 2, 4];
        state.list2 = [1, 3, 4];
        if (customValues) {
            if (customValues.nums) {
                const parsed = customValues.nums.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x)).sort((a,b) => a-b);
                if (parsed.length > 0) state.list1 = parsed;
            }
            if (customValues.str) {
                const parsed = customValues.str.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x)).sort((a,b) => a-b);
                if (parsed.length > 0) state.list2 = parsed;
            }
        }
        state.p1 = 0;
        state.p2 = 0;
        state.mergedList = [];
        log(`[Khởi tạo] Trộn 2 danh sách liên kết đã sắp xếp: L1=[${state.list1.join(" -> ")}], L2=[${state.list2.join(" -> ")}].`, "info");
    },

    step: function(state, log, stopAuto) {
        const empty1 = state.p1 >= state.list1.length;
        const empty2 = state.p2 >= state.list2.length;

        if (empty1 && empty2) {
            state.done = true;
            s.outputText = String(`Đã trộn hoàn tất! Danh sách kết quả: ${state.mergedList.map(x => x.val).join(" -> ")}`); log(`[KẾT QUẢ] Đã trộn hoàn tất! Danh sách kết quả: ${state.mergedList.map(x => x.val).join(" -> ")}`, "success");
            return;
        }

        if (empty1) {
            const val = state.list2[state.p2];
            state.mergedList.push({ val: val, source: 2, idx: state.p2 });
            log(`Bước ${state.stepIndex}: Danh sách L1 trống. Lấy Nút ${val} ở L2 đưa xuống danh sách kết quả.`, "info");
            state.p2++;
            return;
        }

        if (empty2) {
            const val = state.list1[state.p1];
            state.mergedList.push({ val: val, source: 1, idx: state.p1 });
            log(`Bước ${state.stepIndex}: Danh sách L2 trống. Lấy Nút ${val} ở L1 đưa xuống danh sách kết quả.`, "info");
            state.p1++;
            return;
        }

        const v1 = state.list1[state.p1];
        const v2 = state.list2[state.p2];

        if (v1 <= v2) {
            state.mergedList.push({ val: v1, source: 1, idx: state.p1 });
            log(`Bước ${state.stepIndex}: So sánh L1[${state.p1}]=${v1} &le; L2[${state.p2}]=${v2}. Lấy Nút L1[${v1}] xếp xuống kết quả.`, "info");
            state.p1++;
        } else {
            state.mergedList.push({ val: v2, source: 2, idx: state.p2 });
            log(`Bước ${state.stepIndex}: So sánh L1[${state.p1}]=${v1} &gt; L2[${state.p2}]=${v2}. Lấy Nút L2[${v2}] xếp xuống kết quả.`, "info");
            state.p2++;
        }
    },

    render: function(state, sandboxCanvas, statsPanel) {
        const p1Label = state.p1 >= state.list1.length
            ? "Hết"
            : `idx ${state.p1} · val ${state.list1[state.p1]}`;
        const p2Label = state.p2 >= state.list2.length
            ? "Hết"
            : `idx ${state.p2} · val ${state.list2[state.p2]}`;

        statsPanel.innerHTML = `
            <div class="viz-stats-bar">
                <div class="viz-stat">
                    <span class="label">Con trỏ L1</span>
                    <span class="value accent">${p1Label}</span>
                </div>
                <div class="viz-stat">
                    <span class="label">Con trỏ L2</span>
                    <span class="value warn">${p2Label}</span>
                </div>
                <div class="viz-stat">
                    <span class="label">Đã merge</span>
                    <span class="value success">${state.mergedList.length} nút</span>
                </div>
            </div>`;

        const stage = document.createElement("div");
        stage.className = "viz-ll-stage";

        function appendArrow(parent, merged) {
            const arrow = document.createElement("div");
            arrow.className = "viz-ll-arrow" + (merged ? " merged" : "");
            arrow.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
            parent.appendChild(arrow);
        }

        function buildListRow(labelClass, tagClass, items, currentPtr, activeClass) {
            const row = document.createElement("div");
            row.className = "viz-ll-row";

            const label = document.createElement("div");
            label.className = `viz-ll-label ${labelClass}`;
            label.textContent = labelClass === "l1" ? "List 1" : "List 2";
            row.appendChild(label);

            const nodes = document.createElement("div");
            nodes.className = "viz-ll-nodes";

            items.forEach((val, idx) => {
                const wrap = document.createElement("div");
                wrap.className = "viz-ll-node-wrap";

                const tag = document.createElement("div");
                tag.className = `viz-ll-tag ${tagClass}` + (idx === currentPtr ? " visible" : "");
                tag.textContent = "p ▼";
                wrap.appendChild(tag);

                const node = document.createElement("div");
                node.className = "viz-ll-node";
                node.innerHTML = `<span class="val">${val}</span><span class="addr">0x${idx}</span>`;

                if (idx === currentPtr) {
                    node.classList.add(activeClass, "anim-active");
                } else if (idx < currentPtr) {
                    node.classList.add("done");
                }

                wrap.appendChild(node);
                nodes.appendChild(wrap);

                if (idx < items.length - 1) {
                    appendArrow(nodes, false);
                }
            });

            row.appendChild(nodes);
            return row;
        }

        stage.appendChild(buildListRow("l1", "l1", state.list1, state.p1, "active-l1"));
        stage.appendChild(buildListRow("l2", "l2", state.list2, state.p2, "active-l2"));

        const mergedRow = document.createElement("div");
        mergedRow.className = "viz-ll-row viz-ll-divider";

        const mLabel = document.createElement("div");
        mLabel.className = "viz-ll-label merged";
        mLabel.textContent = "Merged";
        mergedRow.appendChild(mLabel);

        const mNodes = document.createElement("div");
        mNodes.className = "viz-ll-nodes";

        const dummyWrap = document.createElement("div");
        dummyWrap.className = "viz-ll-node-wrap";
        const dummy = document.createElement("div");
        dummy.className = "viz-ll-node dummy";
        dummy.innerHTML = '<span class="val">dum</span><span class="addr">0x00</span>';
        dummyWrap.appendChild(dummy);
        mNodes.appendChild(dummyWrap);

        appendArrow(mNodes, true);

        if (state.mergedList.length === 0) {
            const empty = document.createElement("span");
            empty.className = "viz-ll-empty";
            empty.textContent = "Danh sách kết quả đang trống…";
            mNodes.appendChild(empty);
        } else {
            state.mergedList.forEach((item, index) => {
                const wrap = document.createElement("div");
                wrap.className = "viz-ll-node-wrap";

                const node = document.createElement("div");
                node.className = "viz-ll-node merged";
                node.innerHTML = `<span class="val">${item.val}</span><span class="addr">L${item.source}:${item.idx}</span>`;

                if (index === state.mergedList.length - 1) {
                    node.classList.add("anim-pop");
                }

                wrap.appendChild(node);
                mNodes.appendChild(wrap);

                if (index < state.mergedList.length - 1) {
                    appendArrow(mNodes, true);
                }
            });
        }

        mergedRow.appendChild(mNodes);
        stage.appendChild(mergedRow);
        sandboxCanvas.appendChild(stage);
    },

    renderControls: function(state, container, customValues) {
        VizCore.controls(container, [
            { type: "array", id: "lc-input-nums", label: "L1", values: VizCore.parseNums(customValues.nums || state.list1.join(",")).length ? VizCore.parseNums(customValues.nums || state.list1.join(",")) : state.list1, placeholder: 1 },
            { type: "array", id: "lc-input-str", label: "L2", values: VizCore.parseNums(customValues.str || state.list2.join(",")).length ? VizCore.parseNums(customValues.str || state.list2.join(",")) : state.list2, placeholder: 1 }
        ], customValues);
    }
};
