import { useState } from 'react'

export const useFilterHandler = (initialFilters: string[], onApplyFilters: (filters: string[]) => void) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>(initialFilters)

  const handleFilterPress = () => {
    setIsModalVisible(true)
  }

  const handleApplyFilters = (filters: string[]) => {
    setActiveFilters(filters)
    onApplyFilters(filters)
  }

  const toggleFavoriteView = () => {
    onApplyFilters(activeFilters)
  }

  return {
    isModalVisible,
    handleFilterPress,
    handleApplyFilters,
    toggleFavoriteView,
    setIsModalVisible
  }
}
