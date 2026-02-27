function randInt(n) {
  return Math.floor(Math.random() * n);
}

export function generateDfsMaze(grid, start, end) {
  const rows = grid.length;
  const cols = grid[0].length;

  // Fill with walls
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
      cell.weight = 1;
    }
  }

  // Helper: keep start/end open
  const keepOpen = (cell) =>
    (cell.r === start.r && cell.c === start.c) ||
    (cell.r === end.r && cell.c === end.c);

  // Pick a starting "room" cell on odd coords
  const sr = clampOdd(start.r, rows);
  const sc = clampOdd(start.c, cols);

  const stack = [];
  const visited = new Set();

  const key = (r, c) => `${r},${c}`;
  const inBounds = (r, c) => r > 0 && c > 0 && r < rows - 1 && c < cols - 1;

  function carve(r, c) {
    const cell = grid[r][c];
    cell.isWall = false;
    visited.add(key(r, c));
  }

  carve(sr, sc);
  stack.push([sr, sc]);

  const dirs = [
    [2, 0],
    [-2, 0],
    [0, 2],
    [0, -2],
  ];

  while (stack.length) {
    const [r, c] = stack[stack.length - 1];

    // Collect unvisited neighbors 2 steps away
    const options = [];
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (!inBounds(nr, nc)) continue;
      if (!visited.has(key(nr, nc))) options.push([nr, nc, dr, dc]);
    }

    if (options.length === 0) {
      stack.pop();
      continue;
    }

    const [nr, nc, dr, dc] = options[randInt(options.length)];

    // Carve wall between
    const wr = r + dr / 2;
    const wc = c + dc / 2;

    carve(wr, wc);
    carve(nr, nc);
    stack.push([nr, nc]);
  }

  // Ensure start/end are open
  grid[start.r][start.c].isWall = false;
  grid[end.r][end.c].isWall = false;

  // Also open immediate neighbors so it’s not stuck in a wall pocket
  for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
    const r1 = start.r + dr, c1 = start.c + dc;
    const r2 = end.r + dr, c2 = end.c + dc;
    if (grid[r1] && grid[r1][c1] && !keepOpen(grid[r1][c1])) grid[r1][c1].isWall = false;
    if (grid[r2] && grid[r2][c2] && !keepOpen(grid[r2][c2])) grid[r2][c2].isWall = false;
  }
}

function clampOdd(x, max) {
  // clamp to [1, max-2] and make odd
  let v = Math.max(1, Math.min(max - 2, x));
  if (v % 2 === 0) v = Math.max(1, v - 1);
  return v;
}