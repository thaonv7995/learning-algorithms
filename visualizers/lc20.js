window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[20] = {
    initialize: function(state, log, customValues) {
        state.str = "()[]{}";
        if (customValues && customValues.str) {
            const cleaned = customValues.str.trim();
            if (cleaned.length > 0) state.str = cleaned;
        }
        state.left = 0;
        state.stack = [];
        state.activeAction = null; // 'push', 'pop-match', 'pop-error'
        state.lastPopped = null;
        log(`[Khởi tạo] Bài toán Valid Parentheses. Chuỗi kiểm tra: "${state.str}". Ngăn xếp LIFO trống.`, "info");
    },
    step: function(state, log, stopAuto) {
        state.activeAction = null;
        state.lastPopped = null;

        if (state.left >= state.str.length) {
            state.done = true;
            if (state.stack.length === 0) {
                s.outputText = String(`Chuỗi ngoặc khớp LIFO tuyệt đối. Kết luận: HỢP LỆ!`); log(`[KẾT QUẢ] Chuỗi ngoặc khớp LIFO tuyệt đối. Kết luận: HỢP LỆ!`, "success");
            } else {
                s.outputText = String(`Hết chuỗi nhưng Stack vẫn còn ${state.stack.length} ngoặc dư. Kết luận: KHÔNG HỢP LỆ!`); log(`[KẾT QUẢ] Hết chuỗi nhưng Stack vẫn còn ${state.stack.length} ngoặc dư. Kết luận: KHÔNG HỢP LỆ!`, "error");
            }
            return;
        }

        const c = state.str[state.left];
        if (c === '(' || c === '[' || c === '{') {
            state.stack.push({ char: c, id: state.stepIndex });
            state.activeAction = 'push';
            log(`Bước ${state.stepIndex}: Gặp ngoặc mở '${c}'. Đẩy (push) bay xuống Stack LIFO.`, "info");
        } else {
            if (state.stack.length === 0) {
                state.done = true;
                state.activeAction = 'pop-error';
                log(`Bước ${state.stepIndex}: Gặp ngoặc đóng '${c}' nhưng Stack rỗng. Kết luận: KHÔNG HỢP LỆ!`, "error");
                return;
            }
            const top = state.stack[state.stack.length - 1];
            const isMatch = (c === ')' && top.char === '(') || (c === ']' && top.char === '[') || (c === '}' && top.char === '{');
            if (isMatch) {
                state.lastPopped = state.stack.pop();
                state.activeAction = 'pop-match';
                log(`Bước ${state.stepIndex}: Gặp ngoặc đóng '${c}'. So khớp ăn khớp khớp với '${top.char}' ở đỉnh Stack. Hợp lệ.`, "success");
            } else {
                state.done = true;
                state.activeAction = 'pop-error';
                log(`Bước ${state.stepIndex}: Gặp ngoặc đóng '${c}' lệch loại với đỉnh Stack '${top.char}'. Kết luận: KHÔNG HỢP LỆ!`, "error");
                return;
            }
        }
        state.left++;
    },
    render: function(state, sandboxCanvas, statsPanel) {
        statsPanel.innerHTML = `
            <div>CHUỖI ĐANG XÉT: <span style="color:var(--primary); font-family:monospace; letter-spacing: 2px; font-size: 1.15rem;">${state.str}</span></div>
            <div>KÝ TỰ HIỆN TẠI: <span style="color:var(--medium); font-family:monospace; font-weight: bold; font-size:1.2rem;">${state.str[state.left] || "HẾT"}</span></div>
            <div>ĐỘ SÂU NGĂN XẾP: <span style="color:var(--accent); font-weight: bold;">${state.stack.length}</span></div>
        `;

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.alignItems = "center";
        container.style.gap = "25px";
        container.style.width = "100%";
        container.style.padding = "10px";

        // String view with a sleek layout and laser scanning beam
        const strRow = document.createElement("div");
        strRow.style.display = "flex";
        strRow.style.gap = "10px";
        strRow.style.justifyContent = "center";
        strRow.style.padding = "10px";
        strRow.style.borderRadius = "8px";
        strRow.style.background = "#0f172a";
        strRow.style.border = "1px solid var(--border-color)";
        strRow.style.width = "100%";
        strRow.style.maxWidth = "400px";
        strRow.style.position = "relative";

        state.str.split("").forEach((char, idx) => {
            const charEl = document.createElement("div");
            charEl.style.width = "36px";
            charEl.style.height = "36px";
            charEl.style.display = "flex";
            charEl.style.justifyContent = "center";
            charEl.style.alignItems = "center";
            charEl.style.fontFamily = "monospace";
            charEl.style.fontSize = "1.3rem";
            charEl.style.fontWeight = "800";
            charEl.style.borderRadius = "6px";
            charEl.style.transition = "all 0.3s ease";
            charEl.innerText = char;

            if (idx === state.left) {
                charEl.style.background = "rgba(56, 189, 248, 0.2)";
                charEl.style.color = "var(--primary)";
                charEl.style.border = "2px solid var(--primary)";
                charEl.style.boxShadow = "0 0 15px rgba(56, 189, 248, 0.6)";
                charEl.classList.add("anim-active");
                charEl.classList.add("laser-scanner");
            } else if (idx < state.left) {
                charEl.style.color = "#475569";
                charEl.style.textDecoration = "line-through";
            } else {
                charEl.style.color = "#cbd5e1";
            }
            strRow.appendChild(charEl);
        });
        container.appendChild(strRow);

        // Glassmorphic stack box
        const stackWrapper = document.createElement("div");
        stackWrapper.style.display = "flex";
        stackWrapper.style.flexDirection = "column";
        stackWrapper.style.alignItems = "center";
        stackWrapper.style.gap = "8px";

        const stackBox = document.createElement("div");
        stackBox.style.width = "120px";
        stackBox.style.height = "200px";
        stackBox.style.border = "4px solid rgba(148, 163, 184, 0.4)";
        stackBox.style.borderTop = "none";
        stackBox.style.borderRadius = "0 0 16px 16px";
        stackBox.style.background = "linear-gradient(180deg, rgba(15, 23, 42, 0.3) 0%, rgba(9, 13, 22, 0.8) 100%)";
        stackBox.style.boxShadow = "inset 0 4px 20px rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.4)";
        stackBox.style.display = "flex";
        stackBox.style.flexDirection = "column-reverse";
        stackBox.style.alignItems = "center";
        stackBox.style.gap = "8px";
        stackBox.style.padding = "12px 10px";
        stackBox.style.position = "relative";

        state.stack.forEach((item, index) => {
            const itemEl = document.createElement("div");
            itemEl.style.width = "85px";
            itemEl.style.height = "32px";
            itemEl.style.background = "linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(56, 189, 248, 0.05))";
            itemEl.style.border = "2px solid rgba(56, 189, 248, 0.5)";
            itemEl.style.borderRadius = "8px";
            itemEl.style.display = "flex";
            itemEl.style.justifyContent = "center";
            itemEl.style.alignItems = "center";
            itemEl.style.color = "#f1f5f9";
            itemEl.style.fontFamily = "monospace";
            itemEl.style.fontSize = "1.2rem";
            itemEl.style.fontWeight = "bold";
            itemEl.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
            itemEl.innerText = item.char;

            // Animate push step
            if (state.activeAction === 'push' && index === state.stack.length - 1) {
                itemEl.classList.add("anim-pop");
                itemEl.style.borderColor = "var(--primary)";
                itemEl.style.boxShadow = "0 0 15px var(--primary)";
            }

            stackBox.appendChild(itemEl);
        });

        // Flash red stack border on error
        if (state.activeAction === 'pop-error') {
            stackBox.style.borderColor = "rgba(239, 68, 68, 0.6)";
            stackBox.classList.add("anim-conflict");
        }

        stackWrapper.appendChild(stackBox);

        const label = document.createElement("div");
        label.style.fontFamily = "monospace";
        label.style.fontSize = "0.75rem";
        label.style.fontWeight = "800";
        label.style.color = "var(--text-muted)";
        label.style.textTransform = "uppercase";
        label.style.letterSpacing = "1px";
        label.innerText = "LIFO Stack Ngăn Xếp";
        stackWrapper.appendChild(label);

        container.appendChild(stackWrapper);
        sandboxCanvas.appendChild(container);
    },
    renderControls: function(state, container, customValues) {
        VizCore.controls(container, [{
            type: "string",
            id: "lc-input-str",
            label: "Ngoặc",
            value: customValues.str || state.str,
            placeholder: "()[]{}"
        }], customValues);
    }
};
