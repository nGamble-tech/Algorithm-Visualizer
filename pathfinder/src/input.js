export function setupInput(canvas, grid, cellSize, getState, onChange) {
  let isMouseDown = false;

  function cellFromMouse(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const c = Math.floor(x / cellSize);
    const r = Math.floor(y / cellSize);
    return { r, c };
  }

  function applyTool(r, c) {
    if (!grid[r] || !grid[r][c]) return;

    const state = getState();
    const cell = grid[r][c];

    // Don’t allow editing while running
    if (state.isRunning) return;

    const isStart = (r === state.start.r && c === state.start.c);
    const isEnd = (r === state.end.r && c === state.end.c);

    if (state.tool === "start") {
      if (isEnd || cell.isWall) return;
      state.start.r = r; state.start.c = c;
      onChange();
      return;
    }

    if (state.tool === "end") {
      if (isStart || cell.isWall) return;
      state.end.r = r; state.end.c = c;
      onChange();
      return;
    }

    if (isStart || isEnd) return; // don’t paint over start/end

    if (state.tool === "walls") {
      cell.isWall = true;
      cell.weight = 1;
      onChange();
      return;
    }

    if (state.tool === "weights") {
      cell.isWall = false;
      cell.weight = Math.max(1, state.weightValue);
      onChange();
      return;
    }

    if (state.tool === "erase") {
      cell.isWall = false;
      cell.weight = 1;
      onChange();
      return;
    }
  }

  canvas.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    const { r, c } = cellFromMouse(e);
    applyTool(r, c);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    const state = getState();
    if (state.tool === "start" || state.tool === "end") return; // avoid dragging start/end
    const { r, c } = cellFromMouse(e);
    applyTool(r, c);
  });

  window.addEventListener("mouseup", () => {
    isMouseDown = false;
  });
}