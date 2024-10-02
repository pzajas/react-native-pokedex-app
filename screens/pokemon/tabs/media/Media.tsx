import { SmallRoundButton } from '@/components/buttons/SmallRoundButton'
import { useNameLocalSearchParams } from '@/hooks/useNameLocalSearchParams'
import { storage } from '@/services/firebase/firebase'
import { usePokemonData } from '@/services/hooks/usePokemonData'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import { getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage'
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native'
import { PokeTabSectionHeader } from '../PokeTabSectionHeader'
import { PokemonCries } from './components/PokemonCries'

const fetchImages = async (name) => {
  const storageRef = ref(storage, `images/${name}/`)
  const listResponse = await listAll(storageRef)
  const urls = await Promise.all(listResponse.items.map((item) => getDownloadURL(item)))
  return urls
}

const uploadImage = async (pickedUri, name) => {
  const response = await fetch(pickedUri)
  const blob = await response.blob()
  const storageRef = ref(storage, `images/${name}/${Date.now()}`)
  const uploadTask = uploadBytesResumable(storageRef, blob)
  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.error('Upload failed:', error)
        reject(error)
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        resolve(url)
      }
    )
  })
}

export const Media = () => {
  const { name } = useNameLocalSearchParams()
  const { cries } = usePokemonData(name)
  const queryClient = useQueryClient()

  const { data: imageUris = [] } = useQuery({
    queryKey: ['images', name],
    queryFn: () => fetchImages(name),
    enabled: !!name
  })

  const uploadImageMutation = useMutation({
    mutationFn: (pickedUri) => uploadImage(pickedUri, name),
    onSuccess: (url) => {
      Alert.alert('Upload successful', 'Image has been uploaded successfully!')
    },
    onError: (error) => {
      console.error('Error uploading image:', error)
      Alert.alert('Upload failed', error.message)
    }
  })

  const pickAndUploadImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permissionResult.granted) {
      Alert.alert('Permission to access the camera roll is required!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      const pickedUri = result.assets[0].uri
      console.log('Picked Image URI:', pickedUri)

      const manipResult = await ImageManipulator.manipulateAsync(pickedUri, [{ resize: { width: 800 } }], {
        compress: 0.7,
        format: ImageManipulator.SaveFormat.WEBP
      })

      const compressedUri = manipResult.uri
      console.log('Compressed Image URI (WEBP):', compressedUri)

      queryClient.setQueryData(['images', name], (oldData) => [...oldData, compressedUri])
      uploadImageMutation.mutate(compressedUri)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <PokemonCries latest={cries.latest} legacy={cries.legacy} />

        <PokeTabSectionHeader title={'Gallery'} />

        {imageUris.length > 0 && (
          <View>
            <View style={styles.thumbnailContainer}>
              {imageUris.map((uri, index) => (
                <Image key={index} source={{ uri }} style={styles.thumbnail} resizeMode="cover" />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <SmallRoundButton onPress={pickAndUploadImage} iconName="add" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  scrollView: {
    paddingBottom: 80
  },
  thumbnailContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  thumbnail: {
    width: '15%',
    height: 50,
    aspectRatio: 1,
    marginBottom: 10,
    marginHorizontal: '0.5%',
    borderRadius: 8
  }
})
