import { MinPriorityQueue } from "../utils/pq.js";
import { manhattan } from "../utils/heuristics.js";

export function* astar(grid, start, end) {
  const pq = new MinPriorityQueue();
  const startCell = grid[start.r][start.c];
  const endCell = grid[end.r][end.c];

  startCell.dist = 0; // g
  startCell.f = manhattan(startCell, endCell); // f = g + h
  pq.push(startCell, startCell.f);
  startCell.inFrontier = true;

  while (pq.size() > 0) {
    const current = pq.pop();

    if (current.visited) continue;

    current.visited = true;
    current.inFrontier = false;
    yield current;

    if (current === endCell) return;

    for (const neighbor of getNeighbors(grid, current)) {
      if (neighbor.isWall || neighbor.visited) continue;

      const tentativeG = current.dist + neighbor.weight;

      if (tentativeG < neighbor.dist) {
        neighbor.dist = tentativeG;
        neighbor.prev = current;

        const h = manhattan(neighbor, endCell);
        neighbor.f = tentativeG + h;

        pq.push(neighbor, neighbor.f);
        neighbor.inFrontier = true;
      }
    }
  }
}

function getNeighbors(grid, cell) {
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  const out = [];
  for (const [dr, dc] of dirs) {
    const r = cell.r + dr;
    const c = cell.c + dc;
    if (grid[r] && grid[r][c]) out.push(grid[r][c]);
  }
  return out;
}