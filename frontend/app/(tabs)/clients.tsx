import { useEffect, useState } from 'react'
import { View, ScrollView, Button } from 'react-native'
import { globalStyles } from '@/constants/globalStyles'
import { ClientForm } from '@/constants/types'
import useClientApi from '@/hooks/useClientApi'
import ClientCard from '@/components/ClientCard/ClientCard'

const Clients = () => {
  const { getClient } = useClientApi()
  const [clients, setClients] = useState<ClientForm[]>([])

  const fetchClients = async () => {
    const data = await getClient()
    if (!data) return

    setClients(data)
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleReload = async () => {
    await fetchClients()
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
          {clients.map((client, position) => (
            <ClientCard {...client} key={position} />
          ))}
        </View>
      </ScrollView>
    </>
  )
}

export default Clients
