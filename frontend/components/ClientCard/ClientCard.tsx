import { ClientForm } from '@/constants/types'
import { Text, View } from 'react-native'
import { clientCardStyles } from './clientCardStyles'
import formattedFormData from '@/utils/formattedFormData'

const ClientCard = (data: ClientForm) => {
  const formattedData = formattedFormData(data)
  return (
    <View style={clientCardStyles.card}>
      {formattedData
        .filter((item) => item.key !== 'Id')
        .map((item, position) => (
          <View
            style={
              position % 2 === 0
                ? clientCardStyles.evenItem
                : clientCardStyles.item
            }
            key={position}
          >
            <Text style={clientCardStyles.name}>{item.key}</Text>
            {item.value && <Text>{item.value}</Text>}
          </View>
        ))}
    </View>
  )
}

export default ClientCard
