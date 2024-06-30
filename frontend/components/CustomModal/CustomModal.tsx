import { Button, Modal, Text, View } from 'react-native'
import { customModalStyles } from '@/components/CustomModal/customModalStyles'

interface CustomModalProps {
  data: string
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
      <View style={customModalStyles.modalBackground}>
        <View style={customModalStyles.modalContainer}>
          <Text>{data}</Text>
          <Button title="Close" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  )
}

export default CustomModal
