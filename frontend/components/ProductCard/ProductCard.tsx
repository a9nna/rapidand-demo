import { ProductForm } from '@/constants/types'
import { Image, Text, View } from 'react-native'
import { productCardStyles } from './productCardStyles'

const ProductCard = ({ image, name, type }: ProductForm) => {
  return (
    <View style={productCardStyles.card}>
      <Image
        source={{
          uri: `${image}`,
        }}
        style={productCardStyles.image}
        resizeMode="cover"
      />
      <Text style={productCardStyles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text>{type}</Text>
    </View>
  )
}

export default ProductCard
