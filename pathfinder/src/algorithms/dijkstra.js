import { MinPriorityQueue } from "../utils/pq.js";

export function* dijkstra(grid, start, end) {
  const pq = new MinPriorityQueue();
  const startCell = grid[start.r][start.c];
  const endCell = grid[end.r][end.c];

  startCell.dist = 0;
  pq.push(startCell, 0);
  startCell.inFrontier = true;

  while (pq.size() > 0) {
    const current = pq.pop();

    // Skip if already finalized
    if (current.visited) continue;

    current.visited = true;
    current.inFrontier = false;
    yield current;

    if (current === endCell) return;

    const neighbors = getNeighbors(grid, current);

    for (const neighbor of neighbors) {
      if (neighbor.isWall || neighbor.visited) continue;

      const alt = current.dist + 1; // cost per move

      if (alt < neighbor.dist) {
        neighbor.dist = alt;
        neighbor.prev = current;
        pq.push(neighbor, neighbor.dist);
        neighbor.inFrontier = true;
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