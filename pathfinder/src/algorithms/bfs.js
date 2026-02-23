export function* bfs(grid, start, end) {
  const queue = [];
  const startCell = grid[start.r][start.c];
  const endCell = grid[end.r][end.c];

  startCell.visited = true;
  queue.push(startCell);

  while (queue.length > 0) {
    const current = queue.shift();

     if (current === endCell) {
    yield current;
    return;
  }

    yield current;

    const neighbors = getNeighbors(grid, current);

    for (const neighbor of neighbors) {
      if (!neighbor.visited && !neighbor.isWall) {
        neighbor.visited = true;
        neighbor.prev = current;
        queue.push(neighbor);
      }
    }
  }
}

function getNeighbors(grid, cell) {
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  const neighbors = [];

  for (const [dr, dc] of dirs) {
    const r = cell.r + dr;
    const c = cell.c + dc;

    if (grid[r] && grid[r][c]) {
      neighbors.push(grid[r][c]);
    }
  }

  return neighbors;
}