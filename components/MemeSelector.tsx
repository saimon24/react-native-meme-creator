import { Heading, Image, Pressable, Row, Center } from 'native-base'
import { useEffect, useState } from 'react'
import { Meme, useApi } from '../hooks/useApi'

interface MemeProps {
  activeMeme?: string
  onSelect: (meme: Meme) => void
}

const MemeSelector: React.FC<MemeProps> = (props) => {
  const { getMemes } = useApi()
  const [memes, setMemes] = useState<Meme[] | null>(null)

  useEffect(() => {
    const loadMemes = () => {
      getMemes().then((results) => {
        setMemes(results)
      })
    }
    loadMemes()
  }, [])

  const memeSelected = (meme: Meme) => {
    props.onSelect(meme)
  }

  return (
    <>
      <Center>
        <Heading>Select your Meme:</Heading>
      </Center>
      <Row
        flexWrap={'wrap'}
        mb={5}
        mt={5}
        alignItems={'center'}
        justifyContent={'center'}
      >
        {memes?.map((meme) => (
          <Pressable
            key={meme.name}
            m={1}
            onPress={() => memeSelected(meme)}
            shadow="2"
          >
            <Image
              alt="Meme"
              source={meme.image}
              size={'lg'}
              borderColor={'cyan.600'}
              borderWidth={props.activeMeme === meme.name ? 4 : 0}
            />
          </Pressable>
        ))}
      </Row>
    </>
  )
}

export default MemeSelector
