import palette from '@/constants/palette'
import { Foundation } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'

interface IGenderIcon {
  gender: 'male' | 'female'
}

export const GenderIcon = ({ gender }: IGenderIcon) => {
  const genderIcon = gender === 'male' ? 'male-symbol' : 'female-symbol'
  const genderColor = gender === 'male' ? palette.gender.male : palette.gender.female

  return (
    <View style={styles.container}>
      <Foundation name={genderIcon} size={20} color={genderColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
