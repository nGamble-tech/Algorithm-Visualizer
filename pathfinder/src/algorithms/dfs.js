export function* dfs(grid, start, end) {
  const stack = [];
  const startCell = grid[start.r][start.c];
  const endCell = grid[end.r][end.c];

  startCell.visited = true;
  stack.push(startCell);

  while (stack.length > 0) {
    const current = stack.pop();

    // yield as we process
    yield current;

    if (current === endCell) return;

    const neighbors = getNeighbors(grid, current);

    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighbor = neighbors[i];
      if (!neighbor.visited && !neighbor.isWall) {
        neighbor.visited = true;
        neighbor.prev = current;
        stack.push(neighbor);
      }
    }
  }
}

function getNeighbors(grid, cell) {
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const out = [];
  for (const [dr, dc] of dirs) {
    const r = cell.r + dr;
    const c = cell.c + dc;
    if (grid[r] && grid[r][c]) out.push(grid[r][c]);
  }
  return out;
}