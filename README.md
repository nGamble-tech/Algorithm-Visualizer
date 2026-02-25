# Pathfinder — Algorithm Visualization Tool

Pathfinder is an interactive web-based algorithm visualizer for understanding and comparing pathfinding algorithms.

It is built using vanilla JavaScript and HTML Canvas. No frameworks or external libraries are used.

---

## Overview

This project shows how different graph traversal and shortest-path algorithms explore a grid to find a path between two points.

Currently implemented:

- Grid rendering
- Wall drawing (click and drag)
- Animated Breadth-First Search (BFS)
- Animated Depth-First Search (DFS)
- Animated Dijkstra's Algorithm
- Automatic shortest path reconstruction

Planned additions:

- A\* Search
- Speed controls
- Maze generation
- Weighted nodes
- UI improvements

---

## How It Works

### Grid System

The grid is represented as a 2D array of cell objects.

Each cell stores:

- Position (row, column)
- Wall state
- Visited state
- Path state
- Previous node reference (for path reconstruction)

---

### Rendering

The grid is rendered using HTML Canvas.

Color scheme:

- Dark background: empty cells
- Gray: walls
- Blue: visited cells
- Yellow: final shortest path
- Orange: start node
- Red: end node

Rendering updates occur during algorithm animation.

---

### Breadth-First Search (BFS)

BFS is implemented as a generator function.

Behavior:

- Uses a queue (FIFO)
- Explores neighbors in four directions (up, down, left, right)
- Marks nodes as visited
- Stores previous node references
- Stops when the target node is reached

After completion, the shortest path is reconstructed by tracing back using the `prev` references.

Because BFS explores in layers, it guarantees the shortest path in an unweighted grid.

---

## Project Structure

pathfinder/
│
├── index.html
├── styles.css
└── src/
├── main.js
├── grid.js
├── renderer.js
├── input.js
└── algorithms/
└── bfs.js

---

## How to Run

Must use a local development server because ES modules are used.

### Option 1: VS Code Live Server

Right-click `index.html` → Open with Live Server/Alt + L, Alt + O

### Option 2: Python

python -m http.server 5500

Then open:
http://localhost:5500

---

## Controls

- Click and drag to draw walls
- Click "Run" to execute selected algorithm
- Click "Clear" to reset the grid

---

## Purpose

This project is designed to:

- Improve understanding of graph traversal algorithms
- Demonstrate animation with generators
- Practice modular JavaScript architecture

---

## Future Goals

- Add DFS, Dijkstra, and A\*
- Add heuristic visualization
- Add weighted edges
- Improve UI controls and styling
- Add algorithm comparison mode

---

## Author

Built as part of a continued exploration of algorithms and interactive visualization using pure JavaScript by Niger Gamble.
