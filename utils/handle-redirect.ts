export const handleRedirect = (url: string): void => {
  setTimeout(() => {
    window.location.href = url
  }, 2000)
}
