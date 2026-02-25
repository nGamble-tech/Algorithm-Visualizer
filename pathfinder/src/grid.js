export function makeGrid(rows, cols) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        r, c,
        isWall: false,
        visited: false,
        inFrontier: false,
        dist: Infinity,
        f: Infinity,
        isPath: false,
        prev: null
        
      });
    }
    grid.push(row);
  }
  return grid;
}

export function resetSearch(grid) {
  for (const row of grid) {
    for (const cell of row) {
      cell.visited = false;
      cell.inFrontier = false;
      cell.isPath = false;
      cell.dist = Infinity;
      cell.f = Infinity;
      cell.prev = null;
      cell.isPath = false;
    }
  }
}