# Binary Search Tree :mag_right: :evergreen_tree:
This project is part of the CS section of the NodeJS path in [The Odin Project](https://www.theodinproject.com/).<br>
The assignment can be seen [here](https://www.theodinproject.com/lessons/javascript-binary-search-trees#assignment).

## Description:
Implementation of  a Binary Search Tree class in JavaScript containing the following methods:
 - <b>`buildTree(arr)`</b> takes an array of data and turns it into a balanced binary tree.<br><br>
 - <b>`prettyPrint()`</b> logs tree in a structured format.<br><br>
 - <b>`insert(value)`</b> inserts value into the tree.<br><br>
 - <b>`delete(value)`</b> deletes value from the tree.<br><br>
 - <b>`find(value)`</b> accepts a value and returns the node containing the given value.<br><br>
 - <b>`levelOrder(optionalCallback)`</b> accepts a callback as parameter, traverses the tree in breadth-first level order, and provides each node as argument to the callback. If no callback is passed, levelOrder will return an array containing the tree's node's values in level order.<br><br>
 - <b>`inorder()`</b>, <b>`preorder()`</b>, and <b>`postorder()`</b> accept a callback as parameter, traverse the tree in their respective depth-first order and yield each node to the provided callback. These functions will return an array containing the tree's node's values if no callback is passed as argument.<br><br>
 - <b>`height(value)`</b> accepts a value and returns the height of its node. Height is defined as the number of edges in the longest path from a given node to a leaf node.<br><br>
 - <b>`depth(value)`</b> accepts a value and returns depth of its node. Depth is defined as the number of edges in path from a given node to the tree’s root node.<br><br>
 - <b>`isBalanced()`</b> checks whether the tree is balanced. A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not greater than 1.<br><br>
 - <b>`rebalance()`</b> rebalances an unbalanced tree.
 
 ## Usage:
To test the Binary Search class with randomly generated inputs, [make sure you have node installed](https://stackoverflow.com/questions/10475651/how-to-tell-if-node-js-is-installed-or-not), and run `node [path to driver-script.js]`. Furthermore, you could also test the class however you want inside `driver.script.js`. If doing so, consider using [Nodemon](https://www.npmjs.com/package/nodemon) to re-run `driver-script.js` every time you try a new method.
