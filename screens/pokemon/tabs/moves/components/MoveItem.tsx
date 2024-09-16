import { Image, StyleSheet, View } from 'react-native'

import { LoadingIndicator } from '@/components/indicators/LoadingIndicator'
import { CustomText } from '@/components/typography/customText'
import { getIconSource } from '@/utils/icons/getMoveIconSource'

import { capitalize } from 'lodash'

import palette from '@/constants/palette'

interface MoveDetail {
  ename: string
  type: string
}

interface MoveItemProps {
  moveDetail: MoveDetail | undefined
}

export const MoveItem = ({ moveDetail }: MoveItemProps) => {
  const iconSource = moveDetail ? getIconSource(moveDetail.type) : getIconSource('normal')

  return (
    <View style={styles.moveItem}>
      {moveDetail && (
        <>
          <View style={styles.textContainer}>
            <CustomText style={styles.moveText}>{capitalize(moveDetail.ename.replace(/-/g, ' '))}</CustomText>
            <CustomText style={styles.moveTypeText}>{moveDetail.type}</CustomText>
          </View>
          {iconSource ? (
            <Image
              source={iconSource}
              style={styles.icon}
              accessibilityLabel={moveDetail ? moveDetail.ename : 'Default move icon'}
            />
          ) : (
            <LoadingIndicator size="small" />
          )}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  moveItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(180, 180, 180, 0.05)'
  },
  icon: {
    width: 26,
    height: 26,
    marginRight: 10
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  moveText: {
    fontSize: 14,
    flex: 1
  },
  moveTypeText: {
    fontSize: 14,
    marginRight: 20,
    color: palette.colors.grey.light
  }
})
