export function getRandomizedIndexCollection ({ totalCount, returnCount }) {
  const collection = new Set();
  while ( collection.size < returnCount) {
    const randomIndex = Math.floor(Math.random() * totalCount);
    collection.add(randomIndex);
  }
  return collection;
}
