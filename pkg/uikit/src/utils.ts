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

export function lerp(progress: number, value1: number, value2: number): number {
  return (value2 - value1) * progress + value1
}

export function shuffle<T = unknown>(arr: T[]): T[] {
  const _arr = [...arr]
  for (let i = _arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[_arr[i], _arr[j]] = [_arr[j], _arr[i]]
  }
  return _arr
}
