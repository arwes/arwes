const setTextNodesExitingContentLength = (
  textNodes: Node[],
  texts: string[],
  newLength: number,
  totalLength: number
): void => {
  let markerLength = totalLength;

  for (let index = textNodes.length - 1; index >= 0; index--) {
    const textNode = textNodes[index];
    const text = texts[index];
    const newMarkerLength = markerLength - text.length;

    if (newMarkerLength >= newLength) {
      if (textNode.textContent !== '') {
        textNode.textContent = '';
      }

      if (newMarkerLength === newLength) {
        break;
      }

      markerLength = newMarkerLength;
    }
    else {
      const currentTextNodeLengthPortionRight = markerLength - newLength;
      const currentTextNodeLengthPortionLeft = text.length - currentTextNodeLengthPortionRight;
      const currentTextNodeText = text.substring(0, currentTextNodeLengthPortionLeft);

      textNode.textContent = currentTextNodeText;

      break;
    }
  }
};

export { setTextNodesExitingContentLength };
