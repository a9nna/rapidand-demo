import { Platform, StyleSheet } from 'react-native'

export const clientCardStyles = StyleSheet.create({
  card: {
    width: '100%',
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  evenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#90b0e0',
    paddingVertical: 5,
  },
  name: {
    fontWeight: '700',
  },
})
