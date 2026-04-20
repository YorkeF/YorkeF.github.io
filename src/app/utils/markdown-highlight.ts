function applyInline(text: string): string {
  // Bold: **text**
  text = text.replace(/\*\*([^*]+)\*\*/g, '<span class="md-bold">**$1**</span>');
  // Italic: _text_
  text = text.replace(/_([^_\s][^_]*)_/g, '<span class="md-italic">_$1_</span>');
  // Inline code: `text`
  text = text.replace(/`([^`]+)`/g, '<span class="md-code">`$1`</span>');
  return text;
}

export function highlightMarkdownLine(rawLine: string): string {
  // Escape HTML entities
  let line = rawLine
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // HTML comments: <!-- ... -->
  if (/^&lt;!--/.test(line)) {
    return `<span class="md-comment">${line}</span>`;
  }

  // Horizontal rule
  if (line === '---') {
    return `<span class="md-comment">---</span>`;
  }

  // Headings: # Title
  const headingMatch = line.match(/^(#{1,6})\s(.*)$/);
  if (headingMatch) {
    const [, hashes, rest] = headingMatch;
    return `<span class="md-hash">${hashes}</span><span class="md-heading"> ${applyInline(rest)}</span>`;
  }

  // Code fence markers: ``` or ```lang
  if (/^\`\`\`/.test(line) || /^\\`\\`\\`/.test(line)) {
    return `<span class="md-comment">${line}</span>`;
  }

  // Unordered list: - item or * item
  const listMatch = line.match(/^(\s*)([-*])\s(.*)$/);
  if (listMatch) {
    const [, indent, bullet, rest] = listMatch;
    return `${indent}<span class="md-bullet">${bullet}</span> ${applyInline(rest)}`;
  }

  // Key: Value — line starts with **Key:** (bold key pattern)
  const kvMatch = line.match(/^(\*\*[^*]+:\*\*)\s*(.*)$/);
  if (kvMatch) {
    const [, key, value] = kvMatch;
    return `<span class="md-key">${key}</span> <span class="md-value">${applyInline(value)}</span>`;
  }

  // Default: apply inline formatting
  return applyInline(line);
}
