window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[206] = {
    initialize: function(state, log, customValues) {
        state.listNodes = [1, 2, 3, 4, 5];
        if (customValues && customValues.nums) {
            const parsed = customValues.nums.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));
            if (parsed.length > 0) state.listNodes = parsed;
        }
        state.prevIdx = -1;
        state.currIdx = 0;
        state.nextIdx = 1;
        state.reversedArrows = {};
        log(`[Khởi tạo] Đảo ngược danh sách liên kết đơn: ${state.listNodes.join(" -> ")} -> NULL.`, "info");
    },
    step: function(state, log, stopAuto) {
        if (state.currIdx >= state.listNodes.length) {
            state.done = true;
            log(`[KẾT QUẢ] Đảo chiều con trỏ linked list hoàn tất! Nút đầu mới là Nút ${state.listNodes[state.listNodes.length - 1]}.`, "success");
            return;
        }

        const nodeVal = state.listNodes[state.currIdx];
        const pStr = state.prevIdx === -1 ? "NULL" : `Nút ${state.listNodes[state.prevIdx]}`;
        const nStr = state.nextIdx >= state.listNodes.length ? "NULL" : `Nút ${state.listNodes[state.nextIdx]}`;
        
        log(`Bước ${state.stepIndex}: Xét Nút ${nodeVal}. Đảo chiều liên kết next chỉ về: ${pStr}.`, "info");
        
        // Record reversed connection
        state.reversedArrows[state.currIdx] = state.prevIdx;

        // Shift pointers
        state.prevIdx = state.currIdx;
        state.currIdx = state.nextIdx;
        state.nextIdx = state.currIdx + 1;
    },
    render: function(state, sandboxCanvas, statsPanel) {
        statsPanel.innerHTML = `
            <div>PREV: <span style="color:var(--easy); font-weight:bold;">${state.prevIdx === -1 ? "NULL" : "0x7ffe0" + state.prevIdx + " (Val:" + state.listNodes[state.prevIdx] + ")"}</span></div>
            <div>CURR: <span style="color:var(--primary); font-size:1.1rem; font-weight:bold;">${state.currIdx >= state.listNodes.length ? "NULL" : "0x7ffe0" + state.currIdx + " (Val:" + state.listNodes[state.currIdx] + ")"}</span></div>
            <div>NEXT: <span style="color:var(--medium); font-weight:bold;">${state.nextIdx >= state.listNodes.length ? "NULL" : "0x7ffe0" + state.nextIdx + " (Val:" + state.listNodes[state.nextIdx] + ")"}</span></div>
        `;

        const canvas = document.createElement("div");
        canvas.style.display = "flex";
        canvas.style.alignItems = "center";
        canvas.style.gap = "12px";
        canvas.style.width = "100%";
        canvas.style.minHeight = "180px";
        canvas.style.background = "#090d16";
        canvas.style.border = "1px solid var(--border-color)";
        canvas.style.borderRadius = "12px";
        canvas.style.padding = "25px 15px";
        canvas.style.overflowX = "auto";
        canvas.style.justifyContent = "center";
        canvas.style.boxShadow = "inset 0 4px 15px rgba(0,0,0,0.5)";

        // Draw NULL left indicator if we have started or finished
        if (state.prevIdx >= 0 || state.done) {
            const nullNode = document.createElement("div");
            nullNode.style.display = "flex";
            nullNode.style.alignItems = "center";
            
            const nullBox = document.createElement("div");
            nullBox.style.padding = "6px 12px";
            nullBox.style.borderRadius = "6px";
            nullBox.style.border = "1px dashed #64748b";
            nullBox.style.background = "#151c2c";
            nullBox.style.color = "#64748b";
            nullBox.style.fontSize = "0.75rem";
            nullBox.style.fontFamily = "monospace";
            nullBox.style.fontWeight = "bold";
            nullBox.innerText = "NULL";
            nullNode.appendChild(nullBox);

            const arrow = document.createElement("div");
            arrow.style.fontSize = "1rem";
            arrow.style.color = "var(--easy)";
            arrow.style.margin = "0 6px";
            arrow.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
            nullNode.appendChild(arrow);

            canvas.appendChild(nullNode);
        }

        state.listNodes.forEach((val, idx) => {
            const nodeContainer = document.createElement("div");
            nodeContainer.style.display = "flex";
            nodeContainer.style.alignItems = "center";
            nodeContainer.style.position = "relative";

            const node = document.createElement("div");
            node.style.width = "48px";
            node.style.height = "48px";
            node.style.borderRadius = "50%";
            node.style.border = "2px solid rgba(148, 163, 184, 0.4)";
            node.style.display = "flex";
            node.style.flexDirection = "column";
            node.style.justifyContent = "center";
            node.style.alignItems = "center";
            node.style.fontWeight = "bold";
            node.style.background = "linear-gradient(135deg, #151c2c, #0f172a)";
            node.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
            node.style.transition = "all 0.3s ease";
            node.style.position = "relative";

            // Node val
            const valEl = document.createElement("div");
            valEl.innerText = val;
            valEl.style.fontSize = "1.05rem";
            node.appendChild(valEl);

            // RAM addr
            const addrEl = document.createElement("div");
            addrEl.innerText = `0x7fe${idx}`;
            addrEl.style.fontSize = "0.55rem";
            addrEl.style.color = "#64748b";
            node.appendChild(addrEl);

            // Pointer highlight
            if (idx === state.currIdx) {
                node.style.borderColor = "var(--primary)";
                node.style.background = "rgba(56, 189, 248, 0.12)";
                node.style.boxShadow = "0 0 15px rgba(56, 189, 248, 0.5)";
                node.classList.add("anim-active");
                
                const label = document.createElement("div");
                label.style.position = "absolute";
                label.style.bottom = "-22px";
                label.style.color = "var(--primary)";
                label.style.fontSize = "0.6rem";
                label.style.fontWeight = "800";
                label.style.textTransform = "uppercase";
                label.innerText = "curr";
                nodeContainer.appendChild(label);
            } else if (idx === state.prevIdx) {
                node.style.borderColor = "var(--easy)";
                node.style.background = "rgba(16, 185, 129, 0.12)";
                node.style.boxShadow = "0 0 15px rgba(16, 185, 129, 0.4)";
                
                const label = document.createElement("div");
                label.style.position = "absolute";
                label.style.bottom = "-22px";
                label.style.color = "var(--easy)";
                label.style.fontSize = "0.6rem";
                label.style.fontWeight = "800";
                label.style.textTransform = "uppercase";
                label.innerText = "prev";
                nodeContainer.appendChild(label);
            } else if (idx === state.nextIdx) {
                node.style.borderColor = "var(--medium)";
                node.style.background = "rgba(245, 158, 11, 0.08)";
                
                const label = document.createElement("div");
                label.style.position = "absolute";
                label.style.bottom = "-22px";
                label.style.color = "var(--medium)";
                label.style.fontSize = "0.6rem";
                label.style.fontWeight = "800";
                label.style.textTransform = "uppercase";
                label.innerText = "next";
                nodeContainer.appendChild(label);
            }

            nodeContainer.appendChild(node);

            // Arrow linking
            if (idx < state.listNodes.length - 1) {
                const arrow = document.createElement("div");
                arrow.style.fontSize = "1.2rem";
                arrow.style.margin = "0 4px";
                arrow.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), color 0.5s ease";
                
                const isReversed = state.reversedArrows[idx + 1] === idx;
                if (isReversed) {
                    arrow.innerHTML = `<i class="fa-solid fa-arrow-left" style="color:var(--easy);"></i>`;
                    arrow.style.transform = "rotate(180deg)";
                } else {
                    arrow.innerHTML = `<i class="fa-solid fa-arrow-right" style="color:#475569;"></i>`;
                }
                nodeContainer.appendChild(arrow);
            } else {
                // Last node right pointing arrow
                if (!state.done) {
                    const arrow = document.createElement("div");
                    arrow.style.fontSize = "0.85rem";
                    arrow.style.color = "#475569";
                    arrow.style.margin = "0 6px";
                    arrow.innerHTML = `&rarr; <span style="font-size:0.7rem; font-weight:bold; font-family:monospace;">NULL</span>`;
                    nodeContainer.appendChild(arrow);
                }
            }

            canvas.appendChild(nodeContainer);
        });

        sandboxCanvas.appendChild(canvas);
    },
    renderControls: function(state, container, customValues) {
        container.innerHTML = `
            <div style="display: flex; gap: 8px; align-items: center;">
                <span style="color: var(--text-muted); font-size: 0.75rem;">Phần tử list:</span>
                <input type="text" id="lc-input-nums" value="${customValues.nums || state.listNodes.join(',')}" placeholder="ví dụ: 1,2,3,4,5" style="width: 120px; background: #090d16; border: 1px solid var(--border-color); border-radius: 4px; padding: 4px 8px; color: white; font-size: 0.75rem; font-family: monospace; outline:none;">
            </div>
        `;
    }
};
