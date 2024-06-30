import { Platform, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  formContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
      },
    }),
  },
  cardsContainer: {
    padding: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 20,
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  column: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 45,
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '20%',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  selectImageButton: {
    backgroundColor: '#2c6ed7',
    borderRadius: 10,
    height: 45,
    justifyContent: 'center',
  },
  previewImageContainer: {
    flexDirection: 'row',
    gap: 10,
  },
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
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
      },
    }),
  },
})
