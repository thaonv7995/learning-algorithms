window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    function reg(id, viz) { window.LeetCodeVisualizers[id] = viz; }

    reg(84, {
        initialize(s, log, cv) {
            s.heights = [2, 1, 5, 6, 2, 3];
            VizCore.applyNums(s, cv, "nums", s.heights);
            s.i = 0;
            s.stack = [];
            s.maxArea = 0;
            s.best = null;
            s.phase = "scan";
            log(`[Khởi tạo] Largest Rectangle — monotonic stack`, "info");
        },
        step(s, log) {
            if (s.done) return;
            const n = s.heights.length;

            if (s.phase === "scan") {
                if (s.i >= n) {
                    s.phase = "flush";
                    log(`Duyệt xong — xử lý phần tử còn trong stack`, "info");
                    return;
                }
                const h = s.heights[s.i];
                while (s.stack.length && s.heights[s.stack[s.stack.length - 1]] > h) {
                    const top = s.stack.pop();
                    const width = s.stack.length ? s.i - s.stack[s.stack.length - 1] - 1 : s.i;
                    const area = s.heights[top] * width;
                    if (area > s.maxArea) {
                        s.maxArea = area;
                        s.best = { h: s.heights[top], w: width, area };
                    }
                    log(`Pop idx=${top} h=${s.heights[top]} → area=${area}`, area >= s.maxArea ? "success" : "info");
                }
                s.stack.push(s.i);
                log(`Push idx=${s.i} h=${h} — stack=[${s.stack.join(",")}]`, "info");
                s.i++;
                return;
            }

            if (!s.stack.length) {
                s.done = true;
                s.outputText = String(`maxArea=${s.maxArea}`); log(`[KẾT QUẢ] maxArea=${s.maxArea}`, "success");
                return;
            }
            const top = s.stack.pop();
            const width = s.stack.length ? n - s.stack[s.stack.length - 1] - 1 : n;
            const area = s.heights[top] * width;
            if (area > s.maxArea) {
                s.maxArea = area;
                s.best = { h: s.heights[top], w: width, area };
            }
            log(`Flush idx=${top} → area=${area}`, "info");
        },
        render(s, c, st) {
            VizCore.statsBar(st, [
                { label: "i", value: s.done ? "done" : (s.phase === "flush" ? "flush" : s.i), cls: "accent" },
                { label: "stack", value: s.stack.length ? s.stack.join(",") : "∅", cls: "warn" },
                { label: "maxArea", value: s.maxArea, cls: "success" }
            ]);
            const stage = VizCore.stage();
            const sec = VizCore.section(stage, 1, "Histogram");
            sec.appendChild(VizCore.barChart(s.heights, {
                active: s.done || s.phase === "flush" ? -1 : Math.min(s.i, s.heights.length - 1),
                found: s.stack
            }));
            if (s.best) {
                const note = document.createElement("div");
                note.style.cssText = "margin-top:8px;font-family:monospace;font-size:0.72rem;color:#86efac;";
                note.textContent = `Best: h=${s.best.h} × w=${s.best.w} = ${s.best.area}`;
                sec.appendChild(note);
            }
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{
                type: "array", id: "lc-input-nums", label: "heights",
                values: VizCore.arrayValues(cv, s, s.heights)
            }], cv);
        }
    });
})();
