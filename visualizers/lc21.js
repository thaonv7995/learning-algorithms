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
            log(`[KẾT QUẢ] Đã trộn hoàn tất! Danh sách kết quả: ${state.mergedList.map(x => x.val).join(" -> ")}`, "success");
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
        statsPanel.innerHTML = `
            <div>CON TRỎ L1: <span style="color:var(--primary); font-weight:bold;">${state.p1 >= state.list1.length ? "HẾT" : "nút " + state.p1 + " (Val: " + state.list1[state.p1] + ")"}</span></div>
            <div>CON TRỎ L2: <span style="color:var(--medium); font-weight:bold;">${state.p2 >= state.list2.length ? "HẾT" : "nút " + state.p2 + " (Val: " + state.list2[state.p2] + ")"}</span></div>
            <div>TỔNG SỐ NÚT MERGED: <span style="color:var(--accent); font-weight:bold;">${state.mergedList.length}</span></div>
        `;

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "18px";
        container.style.width = "100%";
        container.style.padding = "5px";

        function createLinkedListRow(labelTitle, colorVar, items, currentPtr) {
            const row = document.createElement("div");
            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.gap = "8px";
            row.style.overflowX = "auto";
            row.style.padding = "6px 0";
            
            const titleSpan = document.createElement("span");
            titleSpan.style.fontSize = "0.7rem";
            titleSpan.style.color = `var(${colorVar})`;
            titleSpan.style.fontWeight = "800";
            titleSpan.style.width = "50px";
            titleSpan.style.textTransform = "uppercase";
            titleSpan.innerText = labelTitle;
            row.appendChild(titleSpan);

            items.forEach((val, idx) => {
                const nodeContainer = document.createElement("div");
                nodeContainer.style.display = "flex";
                nodeContainer.style.alignItems = "center";
                nodeContainer.style.position = "relative";

                const node = document.createElement("div");
                node.style.width = "36px";
                node.style.height = "36px";
                node.style.borderRadius = "50%";
                node.style.border = "2px solid var(--border-color)";
                node.style.display = "flex";
                node.style.flexDirection = "column";
                node.style.justifyContent = "center";
                node.style.alignItems = "center";
                node.style.fontWeight = "bold";
                node.style.fontSize = "0.9rem";
                node.style.background = "#151c2c";
                node.style.transition = "all 0.3s ease";
                
                // Val & Address
                node.innerHTML = `<span>${val}</span><span style="font-size:0.5rem; color:#64748b; margin-top:-2px;">0x${idx}</span>`;

                if (idx === currentPtr) {
                    node.style.borderColor = `var(${colorVar})`;
                    node.style.background = `rgba(56, 189, 248, 0.12)`;
                    node.style.boxShadow = `0 0 12px var(${colorVar})`;
                    node.classList.add("anim-active");
                    
                    const ptrLabel = document.createElement("div");
                    ptrLabel.style.position = "absolute";
                    ptrLabel.style.bottom = "-16px";
                    ptrLabel.style.color = `var(${colorVar})`;
                    ptrLabel.style.fontSize = "0.55rem";
                    ptrLabel.style.fontWeight = "900";
                    ptrLabel.innerText = "Active";
                    nodeContainer.appendChild(ptrLabel);
                } else if (idx < currentPtr) {
                    node.style.opacity = "0.35";
                    node.style.borderStyle = "dashed";
                }

                nodeContainer.appendChild(node);

                // Add arrow pointer
                if (idx < items.length - 1) {
                    const arrow = document.createElement("div");
                    arrow.style.fontSize = "0.9rem";
                    arrow.style.color = "#475569";
                    arrow.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
                    nodeContainer.appendChild(arrow);
                }

                row.appendChild(nodeContainer);
            });

            return row;
        }

        // List 1 row
        container.appendChild(createLinkedListRow("List 1", "--primary", state.list1, state.p1));
        // List 2 row
        container.appendChild(createLinkedListRow("List 2", "--medium", state.list2, state.p2));

        // Merged output list with Dummy Node header
        const mergedRow = document.createElement("div");
        mergedRow.style.display = "flex";
        mergedRow.style.alignItems = "center";
        mergedRow.style.gap = "8px";
        mergedRow.style.borderTop = "1px dashed rgba(148, 163, 184, 0.2)";
        mergedRow.style.paddingTop = "15px";
        mergedRow.style.overflowX = "auto";

        const mTitle = document.createElement("span");
        mTitle.style.fontSize = "0.7rem";
        mTitle.style.color = "var(--easy)";
        mTitle.style.fontWeight = "800";
        mTitle.style.width = "50px";
        mTitle.style.textTransform = "uppercase";
        mTitle.innerText = "Merged";
        mergedRow.appendChild(mTitle);

        // Standard Dummy Node creation
        const dummyNode = document.createElement("div");
        dummyNode.style.display = "flex";
        dummyNode.style.alignItems = "center";
        
        const dummyCircle = document.createElement("div");
        dummyCircle.style.width = "36px";
        dummyCircle.style.height = "36px";
        dummyCircle.style.borderRadius = "50%";
        dummyCircle.style.border = "1.5px dashed #64748b";
        dummyCircle.style.background = "rgba(15, 23, 42, 0.5)";
        dummyCircle.style.display = "flex";
        dummyCircle.style.flexDirection = "column";
        dummyCircle.style.justifyContent = "center";
        dummyCircle.style.alignItems = "center";
        dummyCircle.innerHTML = `<span style="font-size:0.75rem; color:#64748b; font-weight:bold;">dum</span><span style="font-size:0.5rem; color:#475569; margin-top:-2px;">0x00</span>`;
        dummyNode.appendChild(dummyCircle);

        const dummyArrow = document.createElement("div");
        dummyArrow.style.fontSize = "0.9rem";
        dummyArrow.style.color = "var(--easy)";
        dummyArrow.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
        dummyNode.appendChild(dummyArrow);

        mergedRow.appendChild(dummyNode);

        // Appending merged nodes
        if (state.mergedList.length === 0) {
            const emptyHint = document.createElement("span");
            emptyHint.style.color = "#64748b";
            emptyHint.style.fontStyle = "italic";
            emptyHint.style.fontSize = "0.75rem";
            emptyHint.innerText = "Danh sách kết quả đang trống...";
            mergedRow.appendChild(emptyHint);
        } else {
            state.mergedList.forEach((item, index) => {
                const nodeContainer = document.createElement("div");
                nodeContainer.style.display = "flex";
                nodeContainer.style.alignItems = "center";
                nodeContainer.style.position = "relative";

                const node = document.createElement("div");
                node.style.width = "36px";
                node.style.height = "36px";
                node.style.borderRadius = "50%";
                node.style.border = "2px solid var(--easy)";
                node.style.display = "flex";
                node.style.flexDirection = "column";
                node.style.justifyContent = "center";
                node.style.alignItems = "center";
                node.style.fontWeight = "bold";
                node.style.fontSize = "0.9rem";
                node.style.background = "rgba(16, 185, 129, 0.12)";
                node.style.boxShadow = "0 0 10px rgba(16, 185, 129, 0.3)";
                
                // Content & original address details
                node.innerHTML = `<span>${item.val}</span><span style="font-size:0.45rem; color:#10b981; font-weight:normal; margin-top:-2px;">L${item.source}:${item.idx}</span>`;

                if (index === state.mergedList.length - 1) {
                    node.classList.add("anim-pop");
                    node.style.boxShadow = "0 0 15px var(--easy)";
                }

                nodeContainer.appendChild(node);

                if (index < state.mergedList.length - 1) {
                    const arrow = document.createElement("div");
                    arrow.style.fontSize = "0.9rem";
                    arrow.style.color = "var(--easy)";
                    arrow.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
                    nodeContainer.appendChild(arrow);
                }

                mergedRow.appendChild(nodeContainer);
            });
        }

        container.appendChild(mergedRow);
        sandboxCanvas.appendChild(container);
    },
    renderControls: function(state, container, customValues) {
        container.innerHTML = `
            <div style="display: flex; gap: 8px; align-items: center;">
                <span style="color: var(--text-muted); font-size: 0.75rem;">L1:</span>
                <input type="text" id="lc-input-nums" value="${customValues.nums || state.list1.join(',')}" placeholder="ví dụ: 1,2,4" style="width: 70px; background: #090d16; border: 1px solid var(--border-color); border-radius: 4px; padding: 4px 8px; color: white; font-size: 0.75rem; font-family: monospace; outline: none;">
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
                <span style="color: var(--text-muted); font-size: 0.75rem;">L2:</span>
                <input type="text" id="lc-input-str" value="${customValues.str || state.list2.join(',')}" placeholder="ví dụ: 1,3,4" style="width: 70px; background: #090d16; border: 1px solid var(--border-color); border-radius: 4px; padding: 4px 8px; color: white; font-size: 0.75rem; font-family: monospace; outline: none;">
            </div>
        `;
    }
};
