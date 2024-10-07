import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { PokeTabSectionHeader } from '../../../PokeTabSectionHeader'
interface ImageGalleryProps {
  imageUris: string[]
  onOpenImage: (index: number) => void
}

export const ImageGallery = ({ imageUris, onOpenImage }: ImageGalleryProps) => {
  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <TouchableOpacity onPress={() => onOpenImage(index)}>
        <Image source={{ uri: item }} style={styles.thumbnail} resizeMode="cover" />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.thumbnailContainer}>
      <PokeTabSectionHeader title={'Gallery'} />
      <FlatList
        data={imageUris}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item}-${index}`}
        numColumns={6}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  thumbnailContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10
  },
  thumbnail: {
    width: '15%',
    height: 50,
    aspectRatio: 1,
    marginBottom: 10,
    marginHorizontal: '0.5%',
    borderRadius: 8,
    marginTop: 20
  }
})
