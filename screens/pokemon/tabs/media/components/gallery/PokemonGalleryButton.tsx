import { Alert } from 'react-native'

import { SmallRoundButton } from '@/components/buttons/SmallRoundButton'
import { uploadImage } from '@/services/firebase/firebaseFunctions'
import { QueryClient, useMutation } from '@tanstack/react-query'

import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'

interface PokemonGalleryButtonProps {
  name: string
  queryClient: QueryClient
}

export const PokemonGalleryButton = ({ name, queryClient }: PokemonGalleryButtonProps) => {
  const uploadImageMutation = useMutation({
    mutationFn: (pickedUri: string) => uploadImage(pickedUri, name),
    onSuccess: (url: string) => {
      Alert.alert('Upload successful', 'Image has been uploaded successfully!')
    },
    onError: (error: Error) => {
      console.error('Error uploading image:', error)
      Alert.alert('Upload failed', error.message || 'An unknown error occurred.')
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

    if (!result.canceled && result.assets.length > 0) {
      const pickedUri = result.assets[0].uri
      if (pickedUri) {
        const manipResult = await ImageManipulator.manipulateAsync(pickedUri, [{ resize: { width: 800 } }], {
          compress: 0.7,
          format: ImageManipulator.SaveFormat.WEBP
        })

        const compressedUri = manipResult.uri

        queryClient.setQueryData(['images', name], (oldData: string[] = []) => [...oldData, compressedUri])
        uploadImageMutation.mutate(compressedUri)
      }
    }
  }

  return <SmallRoundButton onPress={pickAndUploadImage} iconName="add" />
}
