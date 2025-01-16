export type ServerActionResult = {error: string} | undefined

export function handleServerError (result: ServerActionResult) {
  if (result?.error) {
    throw Error(result.error)
  }
}