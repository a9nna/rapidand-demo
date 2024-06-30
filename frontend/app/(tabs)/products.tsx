import { useEffect, useState } from 'react'
import { View, ScrollView, Button } from 'react-native'
import useProductApi from '@/hooks/useProductApi'
import { globalStyles } from '@/constants/globalStyles'
import ProductCard from '@/components/ProductCard/ProductCard'
import { ProductForm } from '@/constants/types'

const Products = () => {
  const { getProducts } = useProductApi()
  const [products, setProducts] = useState<ProductForm[]>([])

  const fetchProducts = async () => {
    const data = await getProducts()
    if (!data) return

    setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleReload = async () => {
    await fetchProducts()
  }

  return (
    <>
      <View style={globalStyles.button}>
        <Button
          title="Reload products"
          onPress={handleReload}
          color="transparent"
        />
      </View>
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
    </>
  )
}

export default Products
