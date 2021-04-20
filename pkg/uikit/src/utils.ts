export function addSlash(path: string) {
  return path.endsWith("/") ? path : path + "/"
}

function list(count: number): number[]
function list<T extends unknown>(
  count: number,
  callback: (index: number) => T
): T[]

function list<T extends unknown>(
  count: number,
  callback?: (index: number) => T
): T[] {
  const _callback = callback || ((index) => index as T)
  return Array.from(Array(count), (_, index) => _callback(index))
}
export { list }
