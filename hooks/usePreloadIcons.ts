import { useEffect, useState } from 'react'
import { Image } from 'react-native'

export const usePreloadIcons = (icons: Record<string, any>) => {
  const [iconsLoaded, setIconsLoaded] = useState(false)

  useEffect(() => {
    const preloadIcons = async () => {
      try {
        const promises = Object.values(icons).map(
          (icon) =>
            new Promise<void>((resolve, reject) => {
              Image.prefetch(icon)
                .then(() => resolve())
                .catch(() => reject())
            })
        )

        await Promise.all(promises)
        setIconsLoaded(true)
      } catch (error) {
        console.error('Error preloading icons:', error)
      }
    }

    preloadIcons()
  }, [icons])

  return iconsLoaded
}
