export function getRandomizedIndexCollection ({ totalCount, returnCount }) {
  const collection = new Map();
  while ( collection.size < returnCount) {
    const randomIndex = Math.floor(Math.random() * totalCount);
    collection.set(randomIndex, null);
  }
  return collection;
}
