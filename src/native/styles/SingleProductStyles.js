import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  singleProductCard: {
    height: 550, 
    width: 370, 
    flex: 1
  },

  singleProductCardItem: {
    flex: 1, 
    flexDirection: 'column'
  },

  cardImage: {
    height: 100, 
    width: 370, 
    flex: 1
  },

  cardContent: {
    flex: 0, 
    flexDirection: 'column', 
    height: 250
  },

  cardHashTags: {
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 20, 
    marginTop: 20
  }
});