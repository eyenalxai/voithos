type RevalidateRequestInit = RequestInit & {
  next: {
    revalidate: number
  }
}

type CacheRequestInit = RequestInit & {
  cache: string
}

const handleHTTPError = (response: Response): Response => {
  if (!response.ok) {
    const { status, statusText = 'Unknown error' } = response
    throw new Error(`HTTP error! Status: ${status} Message: ${statusText}`)
  }
  return response
}

const logAndThrowError = (error: Error): never => {
  console.error('Error during fetch:', error)
  throw error
}

export const fetcher = <T>(
  path: string,
  options?: RevalidateRequestInit | CacheRequestInit
): Promise<T> => {
  return fetch(path, options)
    .then(handleHTTPError)
    .then(response => response.json())
    .catch(logAndThrowError)
}
