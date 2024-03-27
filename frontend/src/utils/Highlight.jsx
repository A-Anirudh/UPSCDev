// utils.js
export const Highlight = (text, segments) => {
  if (!text || !segments.length) {
    return text;
  }

  const highlightedHtml = segments.reduce((acc, segment) => {
    const before = acc.slice(0, segment.startOffset);
    const highlighted = acc.slice(segment.startOffset, segment.endOffset);
    const after = acc.slice(segment.endOffset);

    // Extract existing styles from the highlighted portion
    const existingStyles = highlighted.match(/style="[^"]*"/);

    // Construct the replacement with yellow background and existing styles
    const replacement = `<span style="background-color: yellow;${existingStyles || ''}">${highlighted}</span>`;

    return `${before}${replacement}${after}`;
  }, text);

  return highlightedHtml;
};
