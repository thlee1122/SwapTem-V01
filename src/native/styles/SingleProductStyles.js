import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  singleProductCard: {
    // height: 550, 
    flex: 1,
    // width: 370, 
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 20
    // flex: 1
  },

  singleProductCardItem: {
    flex: 1, 
    flexDirection: 'column'
  },

  cardImage: {
    height: 280, 
    width: '100%', 
    // flex: 1
  },

  cardContent: {
    // flex: 0,
    width: '100%',
    flexDirection: 'column', 
    // height: 250
    flex: 1,
  },

  cardHashTags: {
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 20, 
    marginTop: 15
  },

  swapButton: {
    backgroundColor: 'white', 
    borderWidth: 1, 
    borderColor: '#00529b', 
    borderRadius: 10, 
    width: '42%', 
    alignSelf: 'center'
  },

  swapButtonText: {
    color: '#00529b', 
    fontSize: 15, 
    textAlign: 'center', 
    flex: 1
  },

  sellButton: {
    backgroundColor: 'white', 
    borderWidth: 1, 
    borderColor: '#00529b', 
    borderRadius: 10, 
    width: '42%', 
    alignSelf: 'center', 
    marginLeft: 20
  },

  sellButtonText: {
    color: '#00529b', 
    fontSize: 15, 
    textAlign: 'center', 
    flex: 1
  },

  messageSellerButtonOne: {
    backgroundColor: '#00529b', 
    borderWidth: 1, 
    borderColor: '#00529b', 
    borderRadius: 10, 
    width: '90%', 
    alignSelf: 'center',
    marginTop: 15
  },

  messageSellerButtonOneText: {
    color: 'white', 
    fontSize: 15, 
    flex: 1, 
    textAlign: 'center'
  },

  sellerSectionTitle: {
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10
  },

  sellerSectionContent: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    alignSelf: 'center', 
    marginLeft: 10, 
    marginBottom: 10
  },

  sellerSectionHeadshot: {
    width: 60, 
    height: 60, 
    backgroundColor:'#959595',
    borderRadius: 50,
    marginRight: 10
  },

  sellerSectionContentTwo: {
    flexDirection: 'column', 
    alignSelf: 'center', 
    marginLeft: 10
  },

  sellerName: {
    fontWeight: 'bold', 
    color: "#00529b", 
    fontSize: 18
  },

  sellerConfirmSection: {
    flex: 1, 
    flexDirection: 'row', 
    marginTop: 5, 
    marginBottom: 5
  },


  blankLineOne: {
    marginTop: 14,
    borderBottomColor: '#EDEBEB',
    borderBottomWidth: 1,
    width: '98%',
    marginLeft: 5
  },

  ratingSection: {
    flex: 1, 
    width: '100%', 
    flexDirection: 'column', 
    alignItems: 'center',
    marginTop: 10
  },

  singleRating: {
    width: '80%', 
    marginBottom: 5, 
    marginRight: 5, 
    flexDirection: 'row'
  },

  singleRatingType: {
    fontWeight: 'bold', 
    fontSize: 16
  },

  singleRatingValue: {
    flex: 1, 
    position: 'absolute', 
    right: 0, 
    fontSize: 16
  },

  messageSellerButton: {
    backgroundColor: '#00529b', 
    borderWidth: 1, 
    borderColor: '#00529b', 
    borderRadius: 10, 
    width: '90%', 
    alignSelf: 'center', 
    marginTop: 20
  },

  messageSellerButtonText: {
    color: 'white', 
    fontSize: 15, 
    flex: 1, 
    textAlign: 'center'
  },

  blankLineTwo: {
    marginTop: 20,
    borderBottomColor: '#EDEBEB',
    borderBottomWidth: 1,
    width: '98%',
    marginLeft: 5
  },

  reviewSection: {
    marginTop: 15, 
    marginBottom: 20
  },

  reviewSectionTitle: {
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10
  },

  numbeOfReviews: {
    fontWeight: 'bold', 
    color: '#00529b', 
    fontSize: 15, 
    textAlign: 'center', 
    marginLeft: 10
  },

  singleReviewSection: {
    flex: 1, 
    flexDirection: 'row', 
    marginLeft: 10
  },

  singleReviewStars: {
    flex: 1, 
    flexDirection: 'row', 
    alignSelf: 'center'
  },

  singleReviewHeadshot: {
    width: 50, 
    height: 50, 
    backgroundColor:'#959595',
    borderRadius: 50,
    marginTop: 10
  },

  singleReviewContent: {
    flex: 1, 
    flexDirection: 'column', 
    marginLeft: 10, 
    marginTop: 5
  },

  singleReviewName: {
    fontWeight: 'bold', 
    marginBottom: 4
  },

  singleReviewDate: {
    fontSize: 15, 
    color: '#656464'
  },

  singleReviewContext: {
    marginLeft: 70, 
    marginTop: 10, 
    lineHeight: 22
  },

  readAllReviewButton: {
    marginBottom: 30
  },

  readAllReviewButtonText: {
    color: '#00529b', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    marginTop: 15
  }

});