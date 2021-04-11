export function addSlash(path: string) {
  return path.endsWith("/") ? path : path + "/"
}
