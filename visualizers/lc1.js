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
        state.left = 0;
        state.resultPair = null;
        state.done = false;
        log(`[Khởi tạo] Two Sum — nums=[${state.nums.join(", ")}], target=${state.target}`, "info");
    },

    step: function(state, log, stopAuto) {
        if (state.left >= state.nums.length) {
            state.done = true;
            log(`[Thất bại] Duyệt hết mảng, không tìm thấy cặp có tổng = ${state.target}`, "error");
            return;
        }

        const val = state.nums[state.left];
        const comp = state.target - val;

        if (state.seenMap[comp] !== undefined) {
            state.done = true;
            state.resultPair = [state.seenMap[comp], state.left];
            s.outputText = String(`complement ${comp} tại index ${state.seenMap[comp]} → [${state.resultPair.join(", ")}]`); log(`[KẾT QUẢ] complement ${comp} tại index ${state.seenMap[comp]} → [${state.resultPair.join(", ")}]`, "success");
            return;
        }

        log(`Bước ${state.stepIndex}: nums[${state.left}]=${val}, cần complement=${comp} — chưa có, ghi {${val}→${state.left}}`, "info");
        state.seenMap[val] = state.left;
        state.left++;
    },

    render: function(state, sandboxCanvas, statsPanel) {
        const i = state.left;
        const atEnd = i >= state.nums.length;
        const currVal = atEnd ? "—" : state.nums[i];
        const comp = atEnd ? "—" : state.target - state.nums[i];
        const found = !atEnd && state.seenMap[comp] !== undefined;
        const mapJson = Object.keys(state.seenMap).length
            ? JSON.stringify(state.seenMap)
            : "{ }";

        statsPanel.innerHTML = `
            <div class="viz-stats-bar">
                <div class="viz-stat">
                    <span class="label">Target</span>
                    <span class="value warn">${state.target}</span>
                </div>
                <div class="viz-stat">
                    <span class="label">Con trỏ i</span>
                    <span class="value accent">${atEnd ? "done" : i}</span>
                </div>
                <div class="viz-stat">
                    <span class="label">Hash Map</span>
                    <span class="value success">${mapJson}</span>
                </div>
            </div>`;

        const stage = document.createElement("div");
        stage.className = "viz-stage";

        // ① Array — pointer first so user sees WHERE we are
        const secArray = document.createElement("div");
        secArray.className = "viz-section";
        secArray.innerHTML = `<div class="viz-section-label"><span class="step-num">1</span> Duyệt mảng — vị trí con trỏ i</div>`;

        const arrRow = document.createElement("div");
        arrRow.className = "viz-array-row";

        state.nums.forEach((val, idx) => {
            const wrap = document.createElement("div");
            wrap.className = "viz-cell-wrap";

            const pointer = document.createElement("div");
            pointer.className = "viz-pointer" + (!atEnd && idx === i ? " visible" : "");
            pointer.textContent = "i ▼";

            const cell = document.createElement("div");
            cell.className = "viz-cell";
            cell.innerHTML = `<span class="val">${val}</span><span class="idx">[${idx}]</span>`;

            if (state.done && state.resultPair && state.resultPair.includes(idx)) {
                cell.classList.add("found");
                cell.classList.add("anim-pop");
            } else if (!atEnd && idx === i) {
                cell.classList.add("active");
                cell.classList.add("anim-active");
            }

            wrap.appendChild(pointer);
            wrap.appendChild(cell);
            arrRow.appendChild(wrap);
        });

        secArray.appendChild(arrRow);
        stage.appendChild(secArray);

        // ② Formula — WHAT we're computing
        const secFlow = document.createElement("div");
        secFlow.className = "viz-section";
        secFlow.innerHTML = `<div class="viz-section-label"><span class="step-num">2</span> Tính complement cần tìm</div>`;

        const flow = document.createElement("div");
        flow.className = "viz-flow";

        const eq = document.createElement("div");
        eq.className = "viz-flow-equation";
        eq.innerHTML = `
            <span class="viz-flow-token target"><span class="tok-label">target</span><span class="tok-val">${state.target}</span></span>
            <span class="viz-flow-op">−</span>
            <span class="viz-flow-token current"><span class="tok-label">nums[i]</span><span class="tok-val">${currVal}</span></span>
            <span class="viz-flow-op">=</span>
            <span class="viz-flow-token result ${found ? "" : "pending"}"><span class="tok-label">complement</span><span class="tok-val">${comp}</span></span>`;

        const status = document.createElement("div");
        status.className = "viz-flow-status " + (found ? "found" : "pending");
        status.innerHTML = found
            ? '<i class="fa-solid fa-circle-check"></i> Complement có trong Hash Map — tìm thấy cặp!'
            : atEnd
                ? '<i class="fa-solid fa-flag-checkered"></i> Đã duyệt hết mảng'
                : '<i class="fa-solid fa-magnifying-glass"></i> Kiểm tra complement có trong Hash Map chưa…';

        flow.appendChild(eq);
        flow.appendChild(status);
        secFlow.appendChild(flow);
        stage.appendChild(secFlow);

        // ③ Hash Map — WHERE we store / lookup
        const secMap = document.createElement("div");
        secMap.className = "viz-section";
        secMap.innerHTML = `<div class="viz-section-label"><span class="step-num">3</span> Hash Map — value → index đã ghi nhận</div>`;

        const mapPanel = document.createElement("div");
        mapPanel.className = "viz-map-panel";
        mapPanel.innerHTML = `<div class="map-title"><i class="fa-solid fa-database"></i> seenMap</div>`;

        const mapList = document.createElement("div");
        mapList.className = "viz-map-list";

        const keys = Object.keys(state.seenMap);
        if (keys.length === 0) {
            mapList.innerHTML = '<span class="viz-map-empty">Map trống — các phần tử đã duyệt sẽ được lưu tại đây</span>';
        } else {
            keys.forEach(k => {
                const tag = document.createElement("div");
                const isMatch = found && parseInt(k, 10) === comp;
                tag.className = "viz-map-tag" + (isMatch ? " match anim-pop" : "");
                tag.innerHTML = `<span class="k">${k}</span><span class="arrow">→</span><span class="v">${state.seenMap[k]}</span>`;
                mapList.appendChild(tag);
            });
        }

        mapPanel.appendChild(mapList);
        secMap.appendChild(mapPanel);
        stage.appendChild(secMap);

        sandboxCanvas.appendChild(stage);
    },

    renderControls: function(state, container, customValues) {
        VizCore.controls(container, [
            { type: "array", id: "lc-input-nums", label: "Mảng", values: VizCore.arrayValues(customValues, state, [2, 7, 11, 15]), placeholder: 2 },
            { id: "lc-input-target", label: "Target", type: "target", value: customValues.target !== undefined ? customValues.target : state.target }
        ], customValues);
    }
};
