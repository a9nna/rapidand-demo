import { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import useProductApi from '@/hooks/useProductApi'
import { globalStyles } from '@/constants/globalStyles'
import ProductCard from '@/components/ProductCard/ProductCard'
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
      <View style={globalStyles.cardsContainer}>
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
