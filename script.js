let args = process.argv;
let text = require('fs').readFileSync(args[2]).toString();
const toFind = args[3];

const index = find(text, toFind);
console.log(index != -1);

function find(text, toFind) 
{
  len = text.length;
  toFindLen = toFind.length;
  badCharacterTable = new Object();
  for (i = 0; i < toFindLen - 1; i++) 
    badCharacterTable[toFind[i]] = toFindLen - i - 1;
  shift = 0;
  while (shift <= len - toFindLen)
  {
    let symbolsToCheckLeft = toFindLen - 1;
    while (symbolsToCheckLeft >= 0
       && toFind[symbolsToCheckLeft] == text[shift + symbolsToCheckLeft])
      symbolsToCheckLeft--;
    if (symbolsToCheckLeft == -1) return shift;
    if (text[shift + symbolsToCheckLeft] in badCharacterTable)
      shift += badCharacterTable[text[shift + symbolsToCheckLeft]];
    else shift += toFindLen;
  }
  return -1;
}
