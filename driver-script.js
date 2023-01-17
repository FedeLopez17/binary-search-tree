import Tree from "./binary-search-tree.js";

function randomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeRandomArray() {
  const randomArray = [];

  for (let i = 0; i < randomIntegerInRange(6, 15); i++) {
    randomArray.push(randomIntegerInRange(0, 100));
  }

  return randomArray;
}

const randomArray = makeRandomArray();
console.log("Input array:");
console.log(randomArray);
console.log("");

const tree = new Tree(randomArray);
console.log("Output tree:");
tree.prettyPrint();
console.log("");

console.log(`Balanced: ${tree.isBalanced()}`);
console.log("");

console.log("BFS Level order traversal:");
console.log(tree.levelOrder());
console.log("");

console.log("DFS preorder traversal:");
console.log(tree.preorder());
console.log("");

console.log("DFS postorder traversal:");
console.log(tree.postorder());
console.log("");

console.log("DFS inorder traversal:");
console.log(tree.inorder());
console.log("");

console.log("UNBALANCE TREE:");
for (let i = 0; i < randomIntegerInRange(2, 4); i++) {
  const randomNumber = randomIntegerInRange(100, 200);
  tree.insert(randomNumber);
  console.log(`insert ${randomNumber}`);
}
console.log("");
tree.prettyPrint();
console.log("");

console.log(`Balanced: ${tree.isBalanced()}`);
console.log("");

console.log("REBALANCE TREE:");
console.log("");
tree.rebalance();
tree.prettyPrint();
console.log("");
console.log(`Balanced: ${tree.isBalanced()}`);
console.log("");

console.log("BFS Level order traversal:");
console.log(tree.levelOrder());
console.log("");

console.log("DFS preorder traversal:");
console.log(tree.preorder());
console.log("");

console.log("DFS postorder traversal:");
console.log(tree.postorder());
console.log("");

console.log("DFS inorder traversal:");
console.log(tree.inorder());
console.log("");
