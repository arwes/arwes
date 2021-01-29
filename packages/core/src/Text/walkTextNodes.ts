const walkTextNodes = (node: Node, callback: (child: Node) => void): void => {
  Array.from(node.childNodes).forEach(child => {
    if (child.nodeType === Node.TEXT_NODE) {
      callback(child);
    }
    else if (child.nodeType === Node.ELEMENT_NODE) {
      walkTextNodes(child, callback);
    }
  });
};

export { walkTextNodes };
