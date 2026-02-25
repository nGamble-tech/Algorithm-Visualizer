export class MinPriorityQueue {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  push(value, priority) {
    const node = { value, priority };
    this.heap.push(node);
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this._sinkDown(0);
    }
    return min.value;
  }

  _bubbleUp(i) {
    const node = this.heap[i];
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.heap[p].priority <= node.priority) break;
      this.heap[i] = this.heap[p];
      this.heap[p] = node;
      i = p;
    }
  }

  _sinkDown(i) {
    const length = this.heap.length;
    const node = this.heap[i];

    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < length && this.heap[left].priority < this.heap[smallest].priority) {
        smallest = left;
      }
      if (right < length && this.heap[right].priority < this.heap[smallest].priority) {
        smallest = right;
      }
      if (smallest === i) break;

      this.heap[i] = this.heap[smallest];
      this.heap[smallest] = node;
      i = smallest;
    }
  }
}