import { Button, Modal, StyleSheet, Text, View } from 'react-native'

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

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    gap: 20,
  },
})

export default CustomModal
