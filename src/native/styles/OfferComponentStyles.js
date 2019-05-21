import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  mainContent: {
    backgroundColor: 'white'
  },

  offerSections: {
    flexDirection: 'column', 
    marginTop: 8
  },

  swapCardRemaining: {
    borderColor: '#007aff',
    borderWidth: 1,
    borderRadius: 22/2,
    marginLeft: 5,
    backgroundColor: '#007aff',
    width: 22,
    height: 22,
  },

  swapCardRemainingNumber: {
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    marginTop: 2,
    fontSize: 12,
    textAlign: 'center',
  },

  lottieAnimationMedium: {
    width: 250,
    height: 250,
    marginTop: -10,
    marginBottom: -10,
    alignSelf: 'center'
  },

  allSwapCardSwipedSection: {
    flexDirection: 'column', 
    alignSelf: 'center', 
    top: '8%'
  },

  allSwapCardSwipedTextSection: {
    width: 330, 
    alignSelf: 'center'
  },

  allSwapCardSwipedTextOne: {
    fontSize: 18, 
    textAlign: 'center'
  },

  allSwapCardSwipedTextTwo: {
    fontSize: 18, 
    marginTop: 10, 
    textAlign: 'center'
  },

  allSwapCardSwipedButton: {
    width: 300, 
    marginTop: 25, 
    backgroundColor: '#007aff', 
    alignSelf: 'center'
  },

  allSwapCardSwipedButtonText: {
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold', 
    flex: 1, 
    textAlign: 'center'
  },

  selectDropdown: {
    backgroundColor: '#E3E3E3', 
    borderRadius: 5, 
    marginTop: 20, 
    height: 45,
    width: 280,
    marginRight: 15,
    marginLeft: 15,
    paddingLeft: 10, 
    paddingRight: 10, 
    paddingTop: 5
  },

  container: {
    flex: 1,
  },

  //Swap Card Section START
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 300,
    marginTop: -50
  },

  cardImage: {
    flex: 1, 
    backgroundColor: '#E5E3E3', 
    margin: 2
  },

  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },

  itemName: {
    fontWeight: 'bold', 
    fontSize: 20, 
    margin: 10, 
    textAlign: 'center',
    flexWrap: 'wrap'
  },

  matchingText: {
    fontWeight: 'bold', 
    fontSize: 18, 
    marginLeft: 10, 
    marginRight: 10,
    marginBottom: 10,
    textAlign: 'center',
    flexWrap: 'wrap', 
    color: "#007aff"
  },

  valueText: {
    fontSize: 18, 
    textAlign: 'center', 
    marginBottom: 10
  },

  cardSubContent: {
    flexDirection: 'row', 
    alignSelf: 'center'
  },

  locationText: {
    fontSize: 16, 
    textAlign: 'center'
  },

  shippingSection: {
    marginLeft: 20, 
    flexDirection: 'row'
  },

  shippingText: {
    fontSize: 16, 
    textAlign: 'center', 
    marginLeft: 5
  },
  //Swap Card Section END

  //Accepted Offer Section START
  offerAcceptedHeader: {
    marginBottom: 8,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10
  },
  //Accepted Offer Section END

  //Received Offer Section START
  offerReceivedHeader: {
    marginBottom: 8,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10
  },
  //Received Offer Section END

  //Like Modal One START
  likeModalOne: {
    marginTop: '10%',
    height: 520,
    width: 320,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#E5E4E4",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    padding: 10
  },

  likeModalOneTitle: {
    fontWeight: 'bold', 
    fontSize: 25, 
    textAlign: 'center', 
    marginTop: -40
  },

  likeModalOneLottie: {
    width: 150,
    height: 150,
    marginTop: 10,
    marginBottom: 10
  },

  likeModalOneTextOne: {
    fontSize: 18, 
    textAlign: 'center', 
    marginTop: 20
  },

  likeModalOneTextTwo: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#007aff', 
    marginTop: 30
  },

  likeModalOneButton: {
    width: 240, 
    marginTop: 20,
    alignSelf: 'center'
  },

  likeModalOneButtonText: {
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold', 
    flex: 1, 
    textAlign: 'center'
  },
  //Like Modal One START

  //Like Modal Two START
  likeModalTwo: {
    marginTop: '50%',
    borderColor: "#E5E4E4",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 240,
    height: 150
  },

  likeModalTwoTitle: {
    fontWeight: 'bold', 
    fontSize: 22, 
    textAlign: 'center', 
    marginTop: 10, 
    color: '#03CA71'
  },

  likeModalTwoLottie: {
    width: 120,
    height: 120,
    alignSelf: 'center'
  },
  //Like Modal Two END

  //Global CSS START
  offerMainTabText: {
    fontSize: 16,
  },

  offerCardHeaderMainText: {
    fontWeight: 'bold', 
    fontSize: 18,
    marginBottom: 5
  },

  offerCardHeaderSubText: {
    marginTop: 5, 
    fontSize: 15, 
    color: "#007aff",
    marginBottom: 10
  },

  offerCardSection: {
    marginLeft: 20, 
    marginRight: 12, 
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
  },

  offerSingleCard: {
    width: 165,
    height: 245,
    borderWidth: 1,
    borderColor: '#E5E3E3',
    marginBottom: 5,
    marginRight: 5,
    flexDirection: 'row'
  },

  offerCardImage: {
    flex: 1, 
    backgroundColor: '#E5E3E3', 
    margin: 2
  },

  offerCardCountdown: {
    position: 'absolute',
    right: 5,
    marginTop: 5
  },

  offerCardName: {
    fontWeight: 'bold', 
    fontSize: 15, 
    margin: 5, 
    textAlign: 'center',
    flexWrap: 'wrap'
  },

  offerCardMessage: {
    fontWeight: 'bold', 
    fontSize: 13, 
    marginLeft: 5, 
    marginRight: 5,
    marginBottom: 5,
    textAlign: 'center',
    flexWrap: 'wrap', 
    color: "#007aff"
  },

  offerCardValueText: {
    fontSize: 13, 
    textAlign: 'center', 
    marginBottom: 5, 
    marginLeft: 5, 
    marginRight: 5
  },

  offerCardSubSection: {
    flexDirection: 'column', 
    alignSelf: 'center'
  },

  offerCardLocationSection: {
    flexDirection: 'row', 
    alignSelf: 'center', 
    marginBottom: 5
  },

  offerCardLocationText: {
    fontSize: 13, 
    textAlign: 'center'
  },

  offerCardShippingSection: {
    flexDirection: 'row', 
    alignSelf: 'center', 
    marginBottom: 5
  },

  offerCardShippingText: {
    fontSize: 13, 
    textAlign: 'center', 
    marginLeft: 5
  },

  offerCardButton: {
    height: 40,
    width: 200,
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },

  offerCardButtonText: {
    flex: 1, 
    textAlign: 'center', 
    fontSize: 18, 
    color: 'white',
    fontWeight: 'bold'
  },

  offerButtonSection: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    marginTop: 10, 
    marginBottom: 10
  },

  selectedButton: {
    backgroundColor: '#007aff',
    flexDirection: 'row',
    padding: 8,
    borderWidth: 1, 
    borderRadius: 10,
    borderColor: 'white'
  },

  unSelectedButton: {
    backgroundColor: '#EBEBEB',
    flexDirection: 'row',
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white'
  },

  selectedButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  unSelectedButtonText: {
    color: 'black',
    fontWeight: 'bold'
  },

  selectedButtonCheck: {
    color: 'white',
    marginRight: 3
  },

  unSelectedButtonCheck: {
    color: 'black',
    marginRight: 3
  },
  //Global CSS END

  singleOffer: {
    borderWidth: 1, 
    borderRadius: 5, 
    marginBottom: 10, 
    // width: 350,
    flex: 1,
    alignSelf: 'center',
    borderColor: '#D2D2D2'
  },

  singleOfferContent: {
    flexDirection: 'row', 
    marginLeft: 0, 
    marginRight: 5,
    flex: 1
  },

  singleOfferContentColumn: {
    flexDirection: 'column', 
    margin: 5, 
    flex: 1,
    maxWidth: 240, 
    alignSelf: 'center'
  },

  singleOfferType: {
    fontSize: 13,
    fontWeight: 'bold',
  },

  singleOfferCountDown: {
    position: 'absolute',
    zIndex: 10,
    right: 0,
    bottom: 0,
    width: 100,
    backgroundColor: 'black'
  },

  singleOfferImage: {
    height: 224,
    width: width * 0.343,
    // borderWidth: 1, 
    // borderColor: 'black',
    // flex: 1,
    backgroundColor: '#E5E3E3', 
  },

  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  }
});




