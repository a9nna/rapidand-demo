import { styles } from '@/constants/styles'
import { Button, Modal, Text, View } from 'react-native'

interface CustomModalProps {
  data: string[]
  isVisible: boolean
  onClose?: () => void
}

const CustomModal = ({ data, isVisible, onClose }: CustomModalProps) => {
  const closeModal = () => {
    onClose?.()
  }

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
            }}
          >
            Form Data
          </Text>
          {data.map((item, position) => (
            <Text key={position}>{item}</Text>
          ))}
          <Button title="Close" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  )
}

export default CustomModal
