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

  levelOrder(callback, queue = [this.root], levelOrderData = []) {
    const firstNode = queue.shift();
    if (!firstNode) return;

    if (firstNode.leftChild) queue.push(firstNode.leftChild);
    if (firstNode.rightChild) queue.push(firstNode.rightChild);

    if (callback) {
      callback(firstNode);
      this.levelOrder(callback, queue);
    } else {
      levelOrderData.push(firstNode.data);
      this.levelOrder(callback, queue, levelOrderData);
      return levelOrderData;
    }
  }

  inorder(callback, node = this.root, inorderData = []) {
    if (node === null) return;

    if (node.leftChild) this.inorder(callback, node.leftChild, inorderData);

    if (callback) {
      callback(node);
    } else {
      inorderData.push(node.data);
    }

    if (node.rightChild) this.inorder(callback, node.rightChild, inorderData);

    if (inorderData.length) return inorderData;
  }

  preorder(callback, node = this.root, preorderData = []) {
    if (node === null) return;

    if (callback) {
      callback(node);
    } else {
      preorderData.push(node.data);
    }

    if (node.leftChild) this.preorder(callback, node.leftChild, preorderData);
    if (node.rightChild) this.preorder(callback, node.rightChild, preorderData);

    if (preorderData.length) return preorderData;
  }

  postorder(callback, node = this.root, postorderData = []) {
    if (node === null) return;

    if (node.leftChild) this.postorder(callback, node.leftChild, postorderData);
    if (node.rightChild)
      this.postorder(callback, node.rightChild, postorderData);

    if (callback) {
      callback(node);
    } else {
      postorderData.push(node.data);
      return postorderData;
    }
  }

  height(data) {
    function calcHeight(node) {
      const leafNode = !node.leftChild && !node.rightChild;
      if (leafNode) return 0;

      const leftHeight = node.leftChild ? calcHeight(node.leftChild) + 1 : 0;
      const rightHeight = node.rightChild ? calcHeight(node.rightChild) + 1 : 0;

      return Math.max(leftHeight, rightHeight);
    }

    const node = this.find(data);
    return node ? calcHeight(node) : null;
  }

  depth(data, node = this.root) {
    if (!data) throw "missing argument!";

    if (data === node.data) {
      return 0;
    }

    const leafNode = !node.leftChild && !node.rightChild;
    if (leafNode) return null;

    if (data < node.data) {
      const leftDepth = this.depth(data, node.leftChild);
      return leftDepth !== null ? leftDepth + 1 : null;
    }

    if (data > node.data) {
      const rightDepth = this.depth(data, node.rightChild);
      return rightDepth !== null ? rightDepth + 1 : null;
    }
  }

  isBalanced(node = this.root) {
    const leafNode = !node.leftChild && !node.rightChild;
    if (leafNode) return true;

    const left = { height: 0 };
    if (node.leftChild) {
      left.isBalanced = this.isBalanced(node.leftChild);
      if (!left.isBalanced) return false;
      left.height = this.height(node.leftChild.data);
    }

    const right = { height: 0 };
    if (node.rightChild) {
      right.isBalanced = this.isBalanced(node.rightChild);
      if (!right.isBalanced) return false;
      right.height = this.height(node.rightChild.data);
    }

    const difference = Math.abs(left.height - right.height);
    return difference <= 1;
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
// tree.prettyPrint();
tree.delete(22);
// tree.prettyPrint();
// tree.delete(8);
// // tree.prettyPrint();
// tree.delete(6);
tree.prettyPrint();
// console.log(tree.find(6));
// console.log(tree.find(7));
// function callback(node) {
//   console.log("traversal:");
//   console.log(node);
//   console.log(" ");
// }
// tree.levelOrder(callback);
// console.log(tree.levelOrder());
// tree.inorder(callback);
// console.log(tree.inorder());
// tree.preorder(callback);
// console.log(tree.preorder());
// tree.postorder(callback);
// console.log(tree.postorder());
// console.log(tree.height(4));
// console.log(tree.height(2));
// console.log(tree.height(10));
// console.log(tree.height(22));
// console.log(tree.height(42));
// console.log(tree.depth(7));
// console.log(tree.depth(4));
// console.log(tree.depth(22));
// console.log(tree.depth(8));
// console.log(tree.depth(6));
// console.log(tree.depth(3));
console.log(tree.isBalanced());
