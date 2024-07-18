type WriteToStorageInput<T = unknown> = {
  tableName: "products" | "addresses" | "cards" | "carts";
  id: string;
  data: T;
};

type ReadFromStorage<T> = Omit<WriteToStorageInput<T>, "data">;

export function readFromLocalStorage<T>({ id, tableName }: ReadFromStorage<T>) {
  try {
    const item = localStorage.getItem(`${tableName}-${id}`);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading from local storage: ${error}`);
    return null;
  }
}

export function writeToLocalStorage<T>({
  tableName,
  id,
  data,
}: WriteToStorageInput<T>) {
  try {
    const item = JSON.stringify(data);
    localStorage.setItem(`${tableName}-${id}`, item);
    return true;
  } catch (error) {
    console.error(`Error writing to local storage: ${error}`);
    return false;
  }
}

export function getIntersectionByField<T, K extends keyof T>(
  arr1: T[],
  arr2: T[],
  field: K,
): T[] {
  if (arr1.length === 0 || arr2.length === 0) return [];

  const valuesToMatch = new Set(
    arr2.map((obj) => obj[field]).filter((v) => !!v),
  );

  if (valuesToMatch.size === 0) return [];

  return arr1.filter((obj1) => valuesToMatch.has(obj1[field]));
}



