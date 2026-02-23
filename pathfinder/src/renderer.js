export function draw(ctx, grid, cellSize, start, end) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (const row of grid) {
    for (const cell of row) {
      const x = cell.c * cellSize;
      const y = cell.r * cellSize;

      if (cell.isWall) ctx.fillStyle = "#1f2937";
      else ctx.fillStyle = "#0f1720";

      if (cell.visited) ctx.fillStyle = "#2563eb";
      if (cell.inFrontier) ctx.fillStyle = "#22c55e";
      if (cell.isPath) ctx.fillStyle = "#fbbf24"; // yellow pathway

      ctx.fillRect(x, y, cellSize, cellSize);

      ctx.strokeStyle = "#111827";
      ctx.strokeRect(x, y, cellSize, cellSize);
    }
  }

  // start/end
  ctx.fillStyle = "#f59e0b";
  ctx.fillRect(start.c * cellSize, start.r * cellSize, cellSize, cellSize);

  ctx.fillStyle = "#ef4444";
  ctx.fillRect(end.c * cellSize, end.r * cellSize, cellSize, cellSize);
}