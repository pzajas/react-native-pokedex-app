import { CustomText } from '@/components/typography/customText'
import React from 'react'
import { StyleSheet } from 'react-native'

export const PokemonDescription = ({ description }: { description: string }) => {
  return (
    <>
      <CustomText weight="semibold" style={{ marginBottom: 10 }}>
        Description
      </CustomText>
      <CustomText style={styles.description}>{description}</CustomText>
    </>
  )
}

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    marginBottom: 8
  }
})
