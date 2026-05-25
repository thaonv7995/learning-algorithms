window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[1] = {
    initialize: function(state, log, customValues) {
        state.nums = [2, 7, 11, 15];
        state.target = 9;
        if (customValues) {
            if (customValues.nums) {
                const parsed = customValues.nums.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));
                if (parsed.length > 0) state.nums = parsed;
            }
            if (customValues.target !== undefined && customValues.target !== "") {
                const parsed = parseInt(customValues.target);
                if (!isNaN(parsed)) state.target = parsed;
            }
        }
        state.seenMap = {};
        state.left = 0; // current pointer
        state.resultPair = null;
        log(`[Khởi tạo] Bài toán Two Sum. Mảng=[${state.nums.join(", ")}], Target=${state.target}. Bảng băm trống.`, "info");
    },
    step: function(state, log, stopAuto) {
        if (state.left >= state.nums.length) {
            state.done = true;
            log(`[Thất bại] Duyệt hết mảng nhưng không tìm thấy cặp số có tổng bằng ${state.target}!`, "error");
            return;
        }

        const val = state.nums[state.left];
        const comp = state.target - val;

        if (state.seenMap[comp] !== undefined) {
            state.done = true;
            state.resultPair = [state.seenMap[comp], state.left];
            log(`[TÌM THẤY] nums[${state.left}] = ${val}. Tìm complement = ${state.target} - ${val} = ${comp} đã có trong map tại chỉ số ${state.seenMap[comp]}!`, "success");
            log(`Cặp chỉ số tìm thấy là: [${state.resultPair.join(", ")}]`, "success");
            return;
        }

        log(`Bước ${state.stepIndex}: Xét nums[${state.left}] = ${val}. Complement cần tìm = ${comp}. Map chưa ghi nhận ${comp}. Đẩy {${val} -> ${state.left}}`, "info");
        state.seenMap[val] = state.left;
        state.left++;
    },
    render: function(state, sandboxCanvas, statsPanel) {
        statsPanel.innerHTML = `
            <div>TARGET: <span style="color:var(--medium); font-size:1.1rem;">${state.target}</span></div>
            <div>DUYỆT ĐẾN CHỈ SỐ: <span style="color:var(--primary); font-size:1.1rem;">i = ${state.left >= state.nums.length ? "HẾT" : state.left}</span></div>
            <div>HÀNG HÀNG MAP: <span style="font-family:monospace; color:var(--accent);">${JSON.stringify(state.seenMap)}</span></div>
        `;

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "20px";
        container.style.width = "100%";
        container.style.padding = "10px";

        // Comparison Interactive Board
        const compBoard = document.createElement("div");
        compBoard.style.background = "#0f172a";
        compBoard.style.border = "1px solid var(--border-color)";
        compBoard.style.borderRadius = "8px";
        compBoard.style.padding = "10px 15px";
        compBoard.style.display = "flex";
        compBoard.style.justifyContent = "center";
        compBoard.style.alignItems = "center";
        compBoard.style.gap = "15px";
        compBoard.style.fontFamily = "monospace";
        compBoard.style.fontSize = "0.9rem";
        
        const currVal = state.left < state.nums.length ? state.nums[state.left] : "?";
        const neededVal = state.left < state.nums.length ? (state.target - state.nums[state.left]) : "?";
        const found = state.left < state.nums.length && state.seenMap[neededVal] !== undefined;

        compBoard.innerHTML = `
            <div style="color:var(--text-muted);">TÍNH TOÁN:</div>
            <div style="font-weight:bold; color:white;">${state.target} (Target)</div>
            <div style="color:var(--text-muted);">&minus;</div>
            <div style="font-weight:bold; color:var(--primary);">${currVal} (nums[i])</div>
            <div style="color:var(--text-muted);">&equals;</div>
            <div style="font-weight:bold; color:${found ? 'var(--easy)' : 'var(--medium)'};">${neededVal} (Complement)</div>
            <div style="padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; background: ${found ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)'}; color: ${found ? 'var(--easy)' : 'var(--text-muted)'};">
                ${found ? '<i class="fa-solid fa-circle-check"></i> KHỚP TRONG MAP!' : '<i class="fa-solid fa-spinner fa-spin"></i> CHƯA CÓ TRONG MAP'}
            </div>
        `;
        container.appendChild(compBoard);

        // Render array blocks
        const arrRow = document.createElement("div");
        arrRow.style.display = "flex";
        arrRow.style.gap = "12px";
        arrRow.style.justifyContent = "center";
        arrRow.style.position = "relative";

        state.nums.forEach((val, idx) => {
            const cell = document.createElement("div");
            cell.style.width = "50px";
            cell.style.height = "55px";
            cell.style.border = "2px solid var(--border-color)";
            cell.style.borderRadius = "8px";
            cell.style.display = "flex";
            cell.style.flexDirection = "column";
            cell.style.justifyContent = "center";
            cell.style.alignItems = "center";
            cell.style.fontFamily = "monospace";
            cell.style.fontSize = "1.05rem";
            cell.style.fontWeight = "bold";
            cell.style.transition = "all 0.3s ease";
            cell.innerHTML = `<span>${val}</span><span style="font-size:0.6rem; color:#64748b; margin-top:2px;">i:${idx}</span>`;

            if (state.done && state.resultPair && state.resultPair.includes(idx)) {
                cell.style.borderColor = "var(--easy)";
                cell.style.background = "rgba(16, 185, 129, 0.18)";
                cell.style.color = "var(--easy)";
                cell.style.boxShadow = "0 0 15px rgba(16, 185, 129, 0.6)";
                cell.classList.add("anim-pop");
            } else if (idx === state.left) {
                cell.style.borderColor = "var(--primary)";
                cell.style.background = "rgba(56, 189, 248, 0.15)";
                cell.classList.add("anim-active");
            } else {
                cell.style.background = "#151c2c";
            }

            arrRow.appendChild(cell);
        });
        container.appendChild(arrRow);

        // Render HashMap visually
        const mapBox = document.createElement("div");
        mapBox.style.background = "#090d16";
        mapBox.style.border = "1px solid var(--border-color)";
        mapBox.style.borderRadius = "8px";
        mapBox.style.padding = "15px";
        mapBox.innerHTML = `
            <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--primary); margin-bottom:8px;"><i class="fa-solid fa-database"></i> Bảng băm seenMap (Value &rarr; Index)</div>
            <div id="lc-hashmap-list" style="display:flex; flex-wrap:wrap; gap:8px; font-family:monospace; font-size:0.8rem;">
                <!-- Key val list -->
            </div>
        `;
        container.appendChild(mapBox);

        sandboxCanvas.appendChild(container);

        const mapList = document.getElementById("lc-hashmap-list");
        const keys = Object.keys(state.seenMap);
        if (keys.length === 0) {
            mapList.innerHTML = `<span style="color:#64748b; font-style:italic;">Map đang trống...</span>`;
        } else {
            keys.forEach(k => {
                const tag = document.createElement("div");
                tag.style.background = "#1e293b";
                tag.style.border = "1px solid var(--border-color)";
                tag.style.padding = "4px 8px";
                tag.style.borderRadius = "4px";
                tag.style.transition = "all 0.3s ease";
                tag.classList.add("anim-pop");
                
                const isMatch = found && parseInt(k) === neededVal;
                if (isMatch) {
                    tag.style.borderColor = "var(--easy)";
                    tag.style.background = "rgba(16, 185, 129, 0.2)";
                    tag.style.boxShadow = "0 0 10px var(--easy)";
                }
                
                tag.innerHTML = `<span style="color:var(--medium); font-weight:bold;">${k}</span> &rarr; <span style="color:var(--primary); font-weight:bold;">${state.seenMap[k]}</span>`;
                mapList.appendChild(tag);
            });
        }
    },
    renderControls: function(state, container, customValues) {
        container.innerHTML = `
            <div style="display: flex; gap: 8px; align-items: center;">
                <span style="color: var(--text-muted); font-size: 0.75rem;">Mảng:</span>
                <input type="text" id="lc-input-nums" value="${customValues.nums || state.nums.join(',')}" placeholder="ví dụ: 2,7,11,15" style="width: 100px; background: #090d16; border: 1px solid var(--border-color); border-radius: 4px; padding: 4px 8px; color: white; font-size: 0.75rem; font-family: monospace;">
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
                <span style="color: var(--text-muted); font-size: 0.75rem;">Target:</span>
                <input type="number" id="lc-input-target" value="${customValues.target !== undefined ? customValues.target : state.target}" style="width: 50px; background: #090d16; border: 1px solid var(--border-color); border-radius: 4px; padding: 4px 8px; color: white; font-size: 0.75rem; font-family: monospace;">
            </div>
        `;
    }
};
