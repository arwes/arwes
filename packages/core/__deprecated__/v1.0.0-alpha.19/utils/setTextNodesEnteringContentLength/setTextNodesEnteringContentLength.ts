const setTextNodesEnteringContentLength = (
  textNodes: Node[],
  texts: string[],
  newLength: number
): void => {
  let markerLength = 0;

  for (let index = 0; index < textNodes.length; index++) {
    const textNode = textNodes[index];
    const text = texts[index];
    const newMarkerLength = markerLength + text.length;

    if (newMarkerLength <= newLength) {
      if (textNode.textContent !== text) {
        textNode.textContent = text;
      }

      if (newMarkerLength === newLength) {
        break;
      }

      markerLength = newMarkerLength;
    }
    else {
      const currentTextNodeLengthPortion = newLength - markerLength;
      const currentTextNodeText = text.substring(0, currentTextNodeLengthPortion);

      textNode.textContent = currentTextNodeText;

      break;
    }
  }
};

export { setTextNodesEnteringContentLength };
