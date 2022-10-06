import {
  ScrollView,
  Center,
  Skeleton,
  VStack,
  Text,
  View,
  Heading,
  useTheme,
  Container,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { Meme, TrendingMeme, useApi } from '../hooks/useApi'
import Swiper from 'react-native-swiper'
import { StyleSheet, Image } from 'react-native'
import MemeSelector from './MemeSelector'

import { NavigationProp } from '@react-navigation/native'
interface RouterProps {
  navigation: NavigationProp<any, any>
}

const HomeScreen = ({ navigation }: RouterProps) => {
  const theme = useTheme()
  const { getTrending } = useApi()
  const [memes, setMemes] = useState<TrendingMeme[] | null>(null)
  const [loading, setLoading] = useState(true)

  const styles = StyleSheet.create({
    wrapper: {
      height: 400,
    },
    text: {
      color: theme.colors.primary[500],
      fontSize: 30,
      fontWeight: 'bold',
    },
  })

  useEffect(() => {
    const loadMemes = async () => {
      const results = await getTrending()
      setMemes(results)
      setLoading(false)
    }
    loadMemes()
  }, [])

  const memeSelected = (meme: Meme) => {
    navigation.navigate('Creator', { meme: meme.name })
  }

  return (
    <ScrollView>
      {loading && (
        <Center w="100%" mt={8}>
          <VStack w="90%" space={4}>
            <Skeleton.Text px="2" />
            <Skeleton h="80" />
          </VStack>
        </Center>
      )}

      {!loading && (
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          showsPagination={false}
        >
          {memes?.map((meme, index) => (
            <View key={index}>
              <VStack alignItems={'center'} space={2} mt={4}>
                <Heading style={styles.text}>{meme.title}</Heading>
                <Image
                  source={{ uri: meme.url }}
                  resizeMode="contain"
                  style={{ width: '90%', height: 300 }}
                ></Image>
              </VStack>
            </View>
          ))}
        </Swiper>
      )}
      <MemeSelector onSelect={(meme) => memeSelected(meme)} />
    </ScrollView>
  )
}

export default HomeScreen
