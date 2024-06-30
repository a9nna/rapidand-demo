import { globalStyles } from '@/constants/globalStyles'
import { ProductForm } from '@/constants/types'
import { Image, Text, View } from 'react-native'
import { productCardStyles } from '@/components/ProductCard/productCardStyles'

const ProductCard = ({ image, name, type }: ProductForm) => {
  console.log(
    'base',
    `/Users/anapaulacoronel/Documents/Developer/Proyectos/rapidand-products-form/rapidand-demo/backend/src/uploads`,
  )
  return (
    <View style={productCardStyles.card}>
      <Image
        source={{
          uri: require(`../../backend`),
        }}
        style={globalStyles.previewImage}
      />
      <Text style={globalStyles.label}>{name}</Text>
      <Text>{type}</Text>
    </View>
  )
}

export default ProductCard
