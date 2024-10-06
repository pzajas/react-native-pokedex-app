import { useNameLocalSearchParams } from '@/hooks/useNameLocalSearchParams'
import { fetchImages } from '@/services/firebase/firebaseFunctions'
import { usePokemonData } from '@/services/hooks/usePokemonData'
import { queryClient } from '@/services/tanstack/queryClient'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import ImageViewing from 'react-native-image-viewing'
import { PokemonCries } from './components/cries/PokemonCries'
import { ImageGallery } from './components/gallery/PokemonGallery'
import { PokemonGalleryButton } from './components/gallery/PokemonGalleryButton'

export const Media = () => {
  const { name } = useNameLocalSearchParams()
  const { cries } = usePokemonData(name)

  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const { data: imageUris = [] } = useQuery({
    queryKey: ['images', name],
    queryFn: () => fetchImages(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  const openImageFullscreen = (index: number) => {
    setCurrentIndex(index)
    setIsVisible(true)
  }

  const combinedData = [
    { type: 'cries', data: cries },
    { type: 'gallery', data: imageUris }
  ]

  const renderItem = ({ item }: { item: { type: string; data: any } }) => {
    if (item.type === 'cries') {
      return <PokemonCries latest={item.data.latest} legacy={item.data.legacy} />
    }
    if (item.type === 'gallery' && item.data.length > 0) {
      return <ImageGallery imageUris={item.data} onOpenImage={openImageFullscreen} />
    }
    return null
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={combinedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item}-${index}`}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.buttonContainer}>
        <PokemonGalleryButton name={name} queryClient={queryClient} />
      </View>

      <ImageViewing
        images={imageUris.map((uri) => ({ uri }))}
        imageIndex={currentIndex}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingBottom: 20
  },
  buttonContainer: {
    position: 'absolute',
    bottom: -20,
    right: 0
  }
})
