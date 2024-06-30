import { styles } from '@/constants/styles'
import { ProductForm } from '@/constants/types'
import { Image, Text, View } from 'react-native'

const ProductCard = ({ image, name, type }: ProductForm) => {
  console.log(
    'base',
    `/Users/anapaulacoronel/Documents/Developer/Proyectos/rapidand-products-form/rapidand-demo/backend/src/uploads`,
  )
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: require(`../../backend`),
        }}
        style={styles.previewImage}
      />
      <Text style={styles.label}>{name}</Text>
      <Text>{type}</Text>
    </View>
  )
}

export default ProductCard
