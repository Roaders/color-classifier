export function minBy<T>(array: any, key: string): T {
  const sortedArray = [...array];

  sortedArray.sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });

  return sortedArray.shift();
}
