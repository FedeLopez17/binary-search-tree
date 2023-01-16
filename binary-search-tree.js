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
    if (!arr) throw "missing constructor argument!";

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

  insert(data, node = this.root) {
    if (!data) throw "missing argument!";

    if (node === null) {
      return new Node(data);
    }

    if (data < node.data) {
      node.leftChild = this.insert(data, node.leftChild);
    }

    if (data > node.data) {
      node.rightChild = this.insert(data, node.rightChild);
    }

    return node;
  }

  delete(data, node = this.root) {
    if (node === null) {
      return node;
    }

    if (data < node.data) {
      node.leftChild = this.delete(data, node.leftChild);
    }

    if (data > node.data) {
      node.rightChild = this.delete(data, node.rightChild);
    }

    if (data === node.data) {
      // Leaf node
      if (!node.leftChild && !node.rightChild) return null;

      // Only left child
      if (node.leftChild && !node.rightChild) {
        node = node.leftChild;
        node.leftChild = null;
      }

      // Only right child
      if (!node.leftChild && node.rightChild) {
        node = node.rightChild;
        node.rightChild = null;
      }

      // Both children
      if (node.leftChild && node.rightChild) {
        function findInorderSuccessor(node) {
          if (!node.leftChild) return node.data;

          findInorderSuccessor(node.leftChild);
        }

        const inorderSuccessor = findInorderSuccessor(node.rightChild);
        node.data = inorderSuccessor;
        node.rightChild = this.delete(inorderSuccessor, node.rightChild);
      }
    }

    return node;
  }

  find(data, node = this.root) {
    if (node === null) return null;

    if (data === node.data) return node;

    if (data < node.data) return this.find(data, node.leftChild);

    if (data > node.data) return this.find(data, node.rightChild);
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
tree.insert(3);
tree.insert(8);
tree.insert(10);
tree.insert(22);
tree.prettyPrint();
tree.delete(22);
tree.prettyPrint();
tree.delete(8);
tree.prettyPrint();
tree.delete(6);
tree.prettyPrint();
console.log(tree.find(6));
console.log(tree.find(7));
