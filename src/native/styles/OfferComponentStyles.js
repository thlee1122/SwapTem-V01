import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  mainContent: {
    backgroundColor: 'white'
  },

  itemName: {
    fontWeight: 'bold', 
    fontSize: 26, 
    lineHeight: 32, 
    color: 'black', 
    marginTop: 30
  },

  valueText: {
    fontSize: 16, 
    lineHeight: 20, 
    color: 'black', 
    marginTop: 6
  },

  locationText: {
    fontSize: 12, 
    lineHeight: 16, 
    color: '#A3A3A2', 
    position: 'absolute', 
    left: 0
  },

  offerMainTabText: {
    fontSize: 16,
  },

  offerSingleCard: {
    backgroundColor: 'white', 
    height: 225, 
    marginBottom: 16
  },

  singleOfferContent: {
    backgroundColor: 'rgba(236, 235, 235, 0.5)', 
    padding: 16,
    // flex: 1
  },

  singleOfferCountDown: {
    position: 'absolute',
    zIndex: 100,
    right: 0,
    bottom: 0,
    width: 100,
    backgroundColor: 'black'
  },

  singleOfferImage: {
    height: 224,
    width: width * 0.343,
    borderWidth: 1, 
    borderColor: 'black',
    zIndex: 90,
    backgroundColor: '#E5E3E3',  
  },

  pillText: {
    color: '#FFFFFF', 
    fontSize: 12, 
    lineHeight: 16, 
    flex: 1, 
    textAlign: 'center', 
    marginTop: 4
  },

  cardFooter: {
    flexDirection: 'row', 
    marginTop: 28, 
    flex: 1
  },

  shippingAvailability: {
    flexDirection: 'row', 
    position: 'absolute', 
    right: 0
  },

  shippingText: {
    fontSize: 12, 
    lineHeight: 16, 
    color: '#A3A3A2'
  },

  cardRightSection: {
    width: width * 0.343,
    zIndex: 1, 
    flex: 1, 
    backgroundColor: '#E5E3E3'
  },
});




