import { StyleSheet, Dimensions, Platform }          from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  bigCardPillSection: {
    flexDirection: 'row', 
    position: 'absolute', 
    left: '5%', 
    top: '5%'
  },

  bigImage: {
    width: '100%', 
    height: height * 0.32
  },

  smallImage: {
    width: '100%', 
    height: 180
  },

  bigSwapPill: {
    borderRadius: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    width: width * 0.19, 
    alignItems: 'center',
    height: height * 0.038,
    marginRight: 10
  },

  bigSellPill: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    width: width * 0.19, 
    alignItems: 'center', 
    marginRight: 5,
    height: height * 0.038
  },

  bigPillText: {
    color: 'black', 
    alignSelf: 'center', 
    fontSize: 14, 
    paddingTop: Platform.OS === "ios" ? 6 : 3
  },

  bigHashTagText: {
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 28,
    color: "#FFFFFF",
    position: 'absolute',
    bottom: '25%',
    left: '5%'
  },

  bigItemPriceText: {
    fontSize: 16,
    color: '#FFFFFF',
    position: 'absolute',
    left: '5%',
    bottom: '8%'
  },

  smallPillSection: {
    flexDirection: 'row', 
    marginTop: 10, 
    marginLeft: 5
  },

  smallSwapPill: {
    borderRadius: 50,
    backgroundColor: '#ECEBEB',
    width: width * 0.16, 
    alignItems: 'center',
    height: height * 0.03,
    marginRight: 8
  },

  smallSellPill: {
    borderRadius: 50,
    backgroundColor: '#ECEBEB',
    width: width * 0.16, 
    alignItems: 'center', 
    marginRight: 5,
    height: height * 0.03
  },

  smallPillText: {
    color: 'black', 
    alignSelf: 'center', 
    fontSize: 14, 
    paddingTop:4
  },

  smallHashTagText: {
    fontWeight: 'bold', 
    marginLeft: 5, 
    marginBottom: 18,
    flex: 1,
    marginTop: 11, 
    color: 'rgba(0, 0, 0, 0.87)', 
    fontSize: 14
  },

  smallItemPriceText: {
    fontSize: 14, 
    marginLeft: 5, 
    marginBottom: 16, 
    color: 'rgb(30,30,30)',
    lineHeight: 20
  }

  
});