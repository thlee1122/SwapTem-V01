import { StyleSheet }             from 'react-native';
import { Dimensions }             from 'react-native';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  profileHeadShot: {
    marginLeft: "4.27%",
    marginTop: "19.83%",
    width: 94, 
    height: 94, 
    backgroundColor:'#959595',
    borderRadius: 50,
  },

  profileHeaderContent: {
    flex: 1, 
    flexDirection: 'column', 
    marginLeft: 20, 
    marginTop: 35
  },

  profileName: {
    fontSize: 24, 
    fontWeight: 'bold', 
    color: 'white', 
    lineHeight: 28
  },

  profileDesc: {
    marginTop: 13, 
    fontSize: 16, 
    color: '#ECEBEB', 
    lineHeight: 24
  },

  profileRating: {
    flex: 1, 
    flexDirection: 'row', 
    marginTop: 5
  },

  profileRatingNum: {
    fontWeight: 'bold', 
    color: '#ECEBEB', 
    fontSize: 15, 
    textAlign: 'center', 
    marginRight: 10
  },

  profileStatSection: {
    flex: 1, 
    flexDirection: 'row', 
    marginTop: 30, 
    marginLeft: 20
  },

  profileStateOne: {
    color: '#ECEBEB', 
    fontSize: 16, 
    fontWeight: 'bold', 
    lineHeight: 20, 
    marginRight: '11%'
  },

  profileReviewSection: {
    flex: 1, 
    flexDirection: 'row'
  },

  profileStateTwo: {
    color: '#ECEBEB', 
    fontSize: 16, 
    fontWeight: 'bold', 
    lineHeight: 20
  },

  profileContentIntro: {
    marginTop: 32,
    fontSize: 16, 
    color:'rgba(0, 0, 0, 0.87)',
    alignSelf: 'center',
    textAlign: 'center',
    width: 300,
    lineHeight: 24
  },

  privacyLink: {
    fontSize: 15,
    color:'#00529b',
    alignSelf: 'center',
    marginTop: 12
  },

  progressSection: {
    marginBottom: 15, 
    marginTop: 48
  },

  progressPercent: {
    marginTop: 10,
    fontSize: 14,
    color:'#696969',
    alignSelf: 'center',
    textAlign: 'center',
    width: 380
  },

  contentMainBackground: {
    backgroundColor: "#ECEBEB"
  },

  verificationSection: {
    backgroundColor:"white", 
    margin: 16
  },

  verificationTitle: {
    fontSize: 16, 
    color: "rgba(0, 0, 0, 0.87)", 
    lineHeight: 20,  
    marginTop: 24,
    marginLeft: 16,
    marginBottom: 24,
    fontWeight: 'bold'
  },

  verificationListItem: {
    width: "90%", 
    height: 60
  },

  verificationArrow: {
    marginLeft: 10, 
    marginTop: 14
  },

  likeShareSection: {
    backgroundColor: 'white', 
    marginTop: 0, 
    marginLeft: 16, 
    marginRight: 16, 
    marginBottom: 16
  },

  storeSection: {
    backgroundColor: '#E6F4FF', 
    height: 310, 
    marginBottom: 16
  },

  storeEditIcon: {
    position: 'absolute',
    right: 16, 
    top: 16
  },

  storeContent: {
    backgroundColor: 'white', 
    width: 307, 
    height: 142, 
    alignSelf: 'center', 
    marginTop: 59
  },

  storeTitle: {
    fontSize: 20, 
    fontWeight: 'bold', 
    lineHeight: 24, 
    textAlign: 'center', 
    paddingTop: 24 
  },

  storeDesc: {
    width: 256, 
    height: 51, 
    fontSize: 16, 
    lineHeight: 24, 
    textAlign: 'center', 
    alignSelf: 'center', 
    marginTop: 20
  },

  storeAnalyticsButton: {
    width: width*0.6, 
    height: 58, 
    borderWidth: 1, 
    borderColor: 'black', 
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 26
  },

  storeAnalyticsButtonText: {
    alignSelf: 'center', 
    textAlign: 'center', 
    marginTop: 19, 
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 16
  },

  itemFeedSection: {
    flex: 1, 
    flexDirection: 'column', 
    paddingTop: 16, 
    backgroundColor: '#ECEBEB'
  },

  itemRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },

  itemCardTopSection: {
    width: '100%', 
    marginBottom: 5,
    backgroundColor: 'rgb(250,250,250)'
  },

  itemImage: {
    width: "100%", 
    height: 180
  },

  itemPillSection: {
    flexDirection: 'row', 
    height: 20, 
    marginLeft: 5, 
    marginRight: 5, 
    marginTop: 10
  },

  sellPill: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    width: 42, 
    alignItems: 'center', 
    marginRight: 5,
    height: 20
  },

  sellPillText: {
    color: '#007aff', 
    alignSelf: 'center', 
    fontSize: 13, 
    paddingTop:1
  },

  swapPill: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    width: 45, 
    alignItems: 'center',
    height: 20
  },

  swapPillText: {
    color: '#007aff', 
    alignSelf: 'center', 
    fontSize: 13, 
    paddingTop:1
  },

  itemHashTag: {
    fontWeight: '500', 
    marginLeft: 5, 
    marginBottom: 15, 
    flex: 1, 
    marginTop: 8
  },

  itemPrice: {
    fontSize: 14, 
    marginLeft: 5, 
    marginBottom: 8, 
    color: 'rgb(30,30,30)', 
    lineHeight: 20
  }

});







