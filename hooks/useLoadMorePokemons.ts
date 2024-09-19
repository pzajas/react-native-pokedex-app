import { useCallback } from 'react'

export const useLoadMorePoekmons = (fetchNextPage: () => void, hasNextPage: boolean) => {
  return useCallback(() => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage])
}
