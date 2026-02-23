export function setupInput(canvas, grid, cellSize, onChange) {
  let isMouseDown = false;

  function cellFromMouse(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const c = Math.floor(x / cellSize);
    const r = Math.floor(y / cellSize);
    return { r, c };
  }

  canvas.onmousedown = (e) => {
    isMouseDown = true;
    const { r, c } = cellFromMouse(e);
    if (grid[r] && grid[r][c]) {
      grid[r][c].isWall = !grid[r][c].isWall;
      onChange();
    }
  };

  canvas.onmousemove = (e) => {
    if (!isMouseDown) return;
    const { r, c } = cellFromMouse(e);
    if (grid[r] && grid[r][c]) {
      grid[r][c].isWall = true;
      onChange();
    }
  };

  window.onmouseup = () => (isMouseDown = false);
}