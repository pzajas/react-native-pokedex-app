import { useCallback, useState } from 'react'
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

export const useScrollToTopButton = (flatListRef: React.RefObject<FlatList>) => {
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y
    setShowScrollToTop(offsetY > 100)
  }, [])

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
  }

  return {
    showScrollToTop,
    handleScroll,
    scrollToTop
  }
}
