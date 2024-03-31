export const calculateTextAreaHeight = (text: string) => {
  const rows = text.split('\n').length;
  const minHeight = 20;
  const rowHeight = 20;
  return `${Math.max(minHeight, rows * rowHeight)}px`;
};
