import { Platform, StyleSheet } from 'react-native'

export const productCardStyles = StyleSheet.create({
  card: {
    width: 300,
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
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: '700',
    height: 45,
  },
  button: {},
})
