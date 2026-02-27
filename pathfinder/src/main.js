import { makeGrid } from "./grid.js";
import { draw } from "./renderer.js";
import { setupInput } from "./input.js";
import { bfs } from "./algorithms/bfs.js";
import { resetSearch } from "./grid.js";
import { dfs } from "./algorithms/dfs.js";
import { dijkstra } from "./algorithms/dijkstra.js";
import { astar } from "./algorithms/astar.js";
import { generateDfsMaze } from "./mazes/dfsMaze.js";


console.log("main.js loaded");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CELL = 20;
const rows = Math.floor(canvas.height / CELL);
const cols = Math.floor(canvas.width / CELL);

let grid = makeGrid(rows, cols);
let animationToken = 0;

let start = { r: 5, c: 5 };
let end = { r: rows - 6, c: cols - 6 };

function render() {
  draw(ctx, grid, CELL, start, end);
}

function animate(generator) {
  const token = ++animationToken;

  function step() {
    if (token !== animationToken) return;

    const result = generator.next();

    if (!result.done) {
      markPath();
      render();
      setTimeout(step, 20);
    } else {
      render();
    }
  }

  step();
}

function markPath() {
  let cur = grid[end.r][end.c];

  // no path found
  if (!cur.prev) return;

  while (cur && cur.prev) {
    cur.isPath = true;
    cur = cur.prev;
  }
}

setupInput(canvas, grid, CELL, render);

document.getElementById("run").addEventListener("click", () => {
  resetSearch(grid);

  const choice = document.getElementById("algo").value;

  let gen;
  if (choice === "bfs") gen = bfs(grid, start, end);
  else if (choice === "dfs") gen = dfs(grid, start, end);
  else if (choice === "dijkstra") gen = dijkstra(grid, start, end);
  else if (choice === "astar") gen = astar(grid, start, end);
  else gen = bfs(grid, start, end);

  animate(gen);
});

document.getElementById("clear").addEventListener("click", () => {
  animationToken++;
  grid = makeGrid(rows, cols);
  setupInput(canvas, grid, CELL, render);
  render();
});

document.getElementById("maze").addEventListener("click", () => {
  animationToken++;
  generateDfsMaze(grid, start, end);
  resetSearch(grid);
  render();
});

render();
