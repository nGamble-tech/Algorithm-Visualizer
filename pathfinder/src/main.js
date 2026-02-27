import { makeGrid } from "./grid.js";
import { draw } from "./renderer.js";
import { setupInput } from "./input.js";
import { bfs } from "./algorithms/bfs.js";
import { clearWallsAndWeights, resetSearch } from "./grid.js";
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
let isRunning = false;

let start = { r: 5, c: 5 };
let end = { r: rows - 6, c: cols - 6 };
let selectedTool = document.getElementById("tool").value;
let weightValue = Number(document.getElementById("weight").value) || 5;
const speedInput = document.getElementById("speed");
let speedMs = sliderToDelay(speedInput);

function sliderToDelay(input) {
  const min = Number(input.min) || 1;
  const max = Number(input.max) || 60;
  const value = Number(input.value) || min;
  return max - value + min;
}

function render() {
  draw(ctx, grid, CELL, start, end);
}

function animate(generator) {
  const token = ++animationToken;
  isRunning = true;

  function step() {
    if (token !== animationToken) {
      isRunning = false;
      return;
    }

    const result = generator.next();

    if (!result.done) {
      markPath();
      render();
      setTimeout(step, speedMs);
    } else {
      isRunning = false;
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

setupInput(
  canvas,
  grid,
  CELL,
  () => ({
    tool: selectedTool,
    weightValue,
    start,
    end,
    isRunning,
  }),
  render
);

document.getElementById("tool").addEventListener("change", (e) => {
  selectedTool = e.target.value;
});

document.getElementById("weight").addEventListener("input", (e) => {
  weightValue = Math.max(1, Number(e.target.value) || 1);
});

document.getElementById("speed").addEventListener("input", () => {
  speedMs = sliderToDelay(speedInput);
});

document.getElementById("run").addEventListener("click", () => {
  animationToken++;
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

document.getElementById("clearSearch").addEventListener("click", () => {
  animationToken++;
  isRunning = false;
  resetSearch(grid);
  render();
});

document.getElementById("clearWalls").addEventListener("click", () => {
  animationToken++;
  isRunning = false;
  clearWallsAndWeights(grid);
  resetSearch(grid);
  render();
});

document.getElementById("maze").addEventListener("click", () => {
  animationToken++;
  isRunning = false;
  clearWallsAndWeights(grid);
  generateDfsMaze(grid, start, end);
  resetSearch(grid);
  render();
});

render();
