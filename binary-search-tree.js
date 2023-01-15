const testArray = [1, 2, 3, 4, 5, 6, 7];

class Node {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class Tree {
  constructor(arr) {
    // Remove duplicates and sort array
    arr = [...new Set(arr)];
    arr.sort((a, b) => a - b);

    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    // Base case
    if (arr.length === 1) {
      const leafNode = new Node(arr[0]);
      leafNode.leftChild = null;
      leafNode.rightChild = null;
      return leafNode;
    }

    // Recursive case
    const mid = Math.floor((arr.length - 1) / 2);
    const root = new Node(arr[mid]);
    root.leftChild = this.buildTree(arr.slice(0, mid));
    root.rightChild = this.buildTree(arr.slice(mid + 1));
    return root;
  }

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node.rightChild !== null) {
      this.prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
      this.prettyPrint(
        node.leftChild,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  };
}

const tree = new Tree(testArray);
tree.prettyPrint();
