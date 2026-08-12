import { Wire } from "../types/circuit";

export class CircuitGraph {
  private parent: Map<string, string> = new Map();

  constructor() {}

  /**
   * Builds connected components graph from wires.
   */
  public buildGraph(wires: Wire[]) {
    this.parent.clear();

    for (const wire of wires) {
      this.union(wire.from, wire.to);
    }
  }

  private find(item: string): string {
    if (!this.parent.has(item)) {
      this.parent.set(item, item);
      return item;
    }

    let root = item;
    while (root !== this.parent.get(root)) {
      root = this.parent.get(root)!;
    }

    // Path compression
    let curr = item;
    while (curr !== root) {
      const next = this.parent.get(curr)!;
      this.parent.set(curr, root);
      curr = next;
    }

    return root;
  }

  private union(a: string, b: string) {
    const rootA = this.find(a);
    const rootB = this.find(b);

    if (rootA !== rootB) {
      this.parent.set(rootA, rootB);
    }
  }

  /**
   * Checks if two terminal IDs belong to the same connected electrical net.
   */
  public areConnected(termA: string, termB: string): boolean {
    if (!this.parent.has(termA) || !this.parent.has(termB)) {
      return false;
    }
    return this.find(termA) === this.find(termB);
  }

  /**
   * Returns all terminals connected to the given terminal ID.
   */
  public getConnectedNet(termId: string): string[] {
    if (!this.parent.has(termId)) return [termId];
    const root = this.find(termId);
    const result: string[] = [];

    for (const key of this.parent.keys()) {
      if (this.find(key) === root) {
        result.push(key);
      }
    }

    return result;
  }
}
