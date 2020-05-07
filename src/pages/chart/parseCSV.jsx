export default function parseCSV(str = ''/* , useHeader = true */) {
  const arr = [];
  let quote = false;
  str = str.replace(/;;/g, ';');
  // str = str.replace(/,/g, '.');
  for (let row = 0, col = 0, c = 0; c < str.length; c++) {
    const cc = str[c]; const
      nc = str[c + 1];
    arr[row] = arr[row] || [];
    arr[row][col] = arr[row][col] || '';
    if (cc === '"' && quote && nc === '"') {
      arr[row][col] += cc; ++c;
    } else if (cc === '"') {
      quote = !quote;
    } else if ((cc === ',' || cc === ';') && !quote) {
      ++col;
    } else if (cc === '\r' && nc === '\n' && !quote) {
      ++row; col = 0; ++c;
    } else if (cc === '\n' && !quote) {
      ++row; col = 0;
    } else if (cc === '\r' && !quote) {
      ++row; col = 0;
    } else {
      arr[row][col] += cc;
    }
  }

  return arr;
}
