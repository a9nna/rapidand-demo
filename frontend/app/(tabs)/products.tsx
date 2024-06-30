import { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import useProductApi from '@/hooks/useProductApi'
import { styles } from '@/constants/styles'
import ProductCard from '@/components/ProductCard'
import { ProductForm } from '@/constants/types'

const App = () => {
  const { getProducts } = useProductApi()
  const [products, setProducts] = useState<ProductForm[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts()
      if (!data) return

      console.log(data)
      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <ScrollView>
      <View style={styles.cardsContainer}>
        {products.map((product, position) => (
          <ProductCard
            image={product.image}
            name={product.name}
            type={product.type}
            key={position}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default App
