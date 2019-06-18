import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
    flex: 1
  },

  filterPageContainer: {
    flexDirection: 'column'
  },

  itemMainImage: {
    width: 300, 
    height: 250,
    alignSelf: 'center'
  },

  itemTitle: {
    fontWeight: 'bold', 
    fontSize: 22, 
    width: 350, 
    alignSelf: 'center', 
    textAlign: 'center', 
    marginTop: 20
  },

  categorySection: {
    flexDirection: 'row', 
    width: 350, 
    alignSelf: 'center', 
    marginTop: 30
  },

  categorySectionTitle: {
    fontSize: 22,
    fontWeight: 'bold', 
    marginRight: 10,
    marginBottom: 10
  },

  selectedCategory: {
    width: 215, 
    lineHeight: 25, 
    marginTop: -5
  },

  categoryEditButton: {
    width: 20, 
    height: 30, 
    backgroundColor: 'white', 
    marginLeft: 5
  },

  categoryEditSection: {
    flexDirection: 'column', 
    width: 350, 
    alignSelf: 'center'
  },

  categoryEditSelection: {
    borderWidth: 1, 
    borderColor: 'black', 
    backgroundColor: '#EDEDED', 
    zIndex: 10
  },

  categoryEditSaveButton: {
    width: 250, 
    alignSelf: 'center', 
    marginTop: 10
  },

  categoryEditButtonText: {
    flex: 1, 
    textAlign: 'center'
  },

  hashTagSection: {
    flexDirection: 'row', 
    width: 350, 
    alignSelf: 'center', 
    marginTop: 20
  },

  hashTagSectionTitle: {
    fontWeight: 'bold', 
    marginRight: 10
  },

  hashTagSectionSubtitle: {
    width: 215, 
    lineHeight: 25, 
    marginTop: -5
  },

  hashTagEditButton: {
    width: 20, 
    height: 30, 
    backgroundColor: 'white', 
    marginLeft: 5
  },

  tradeSection: {
    flexDirection: 'column', 
    width: 330, 
    alignSelf: 'center', 
    marginTop: 10
  },

  tradeSectionTitle: {
    fontSize: 25,
    fontWeight: 'bold', 
    marginRight: 10
  },

  tradeSectionSubTitle: {
    color: "#00529b", 
    fontSize: 16, 
    marginTop: 5, 
    marginBottom: 10
  },

  tradeSelectionSection: {
    marginLeft: 0,
    marginTop: 15
  },

  tradeSingleSelectionSection: {
    flex: 1, 
    flexDirection: 'row', 
    marginBottom: 10
  },

  tradeSingleSelectionSectionText: {
    flex:1, 
    fontWeight: 'bold', 
    fontSize: 18, 
    color: "#3578e5"
  },

  tradeSelectionSwitch: {
    right: 10
  },

  genderSection: {
    flexDirection: 'column', 
    marginTop: 20, 
    width: 350, 
    alignSelf: 'center'
  },

  genderSectionSubtitle: {
    color: "#00529b", 
    fontSize: 16, 
    marginTop: 5, 
    marginBottom: 10
  },

  genderButtonSection: {
    flexDirection: 'row', 
    alignSelf: 'center'
  },

  genderSelectionButon: {
    display: 'flex',
    alignItems: 'center', 
    alignSelf: 'center',
    // backgroundColor: genderClicked === true && this.gender === "Male" ? "#3578e5" : "white",
    borderWidth: 1,
    borderColor: "#3578e5",
    height: 50,
    width: 150,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 20
  },

  genderSelectionButtonText: {
    textAlign: 'center', flex: 1,
  },

  sizeSection: {
    flexDirection: 'column', 
    marginTop: 20, 
    width: 350, 
    alignSelf: 'center'
  },

  sizeSectionSubTitle: {
    color: "#00529b", 
    fontSize: 16, 
    marginTop: 5, 
    marginBottom: 10
  },

  collegeSection: {
    flexDirection: 'column', 
    marginTop: 20, 
    width: 350, 
    alignSelf: 'center'
  },

  collegeSectionSubTitle: {
    color: "#00529b", 
    fontSize: 14, 
    marginTop: 5, 
    marginBottom: 10
  },

  collegeSelectionBox: {
    borderWidth: 1, 
    borderColor: 'black', 
    backgroundColor: '#EDEDED', 
    zIndex: 10
  },

  textBookSection: {
    flexDirection: 'column', 
    marginTop: 35, 
    width: 350, 
    alignSelf: 'center'
  },

  textBookSectionSubTitle: {
    color: 'red', 
    fontSize: 13, 
    marginTop: 5
  },

  textBookSectionInputbox: {
    width: 350,
    height: 40, 
    color: "#00529b", 
    fontWeight: 'bold',
    fontSize: 15,
    borderBottomWidth: 2,
  },

  courseNameSection: {
    flexDirection: 'column', 
    marginTop: 20, 
    width: 350, 
    alignSelf: 'center'
  },

  courseNameSectionErrorMsg: {
    color: 'red', 
    fontSize: 13, 
    marginTop: 5
  },

  brandSection: {
    flexDirection: 'column', 
    marginTop: 30, 
    width: 350, 
    alignSelf: 'center'
  },

  brandSectionTextInput: {
    width: 350,
    height: 40, 
    color: "#00529b", 
    fontWeight: 'bold',
    fontSize: 15,
    borderBottomWidth: 2,
  },

  conditionSection: {
    flexDirection: 'column', 
    marginTop: 100,
    width: 340, 
    alignSelf: 'center'
  },

  conditionButtonSection: {
    display: 'flex', 
    flex: -1, 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    marginRight: 15
  },

  conditionButton: {
    display: 'flex',
    alignItems: 'center', 
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: "#3578e5",
    height: 90,
    marginTop: 10,
    marginBottom: 10
  },

  conditionButtonText: {
    textAlign: 'center',
    fontSize: 10
  },

  descriptionSection: {
    flexDirection: 'column', 
    marginTop: 100, 
    width: 350, 
    alignSelf: 'center'
  },

  descriptionInputBox: {
    width: 350,
    color: "#00529b", 
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 20,
    borderWidth: 2,
    height: 120,
    marginTop: 10,
    paddingRight: 10
  },

  swapCategorySelectionSection: {
    backgroundColor: 'white',
    flexDirection: 'column', 
    marginTop: width * 0.3, 
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16 
    // alignSelf: 'center'
  },

  swapCategorySubTitle: {
    color: 'red',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 16
  },

  swapCategoryErrorMsg: {
    color: "#00529b", 
    fontSize: 13.5, 
    marginTop: 5
  },

  swapCategorySelectionBox: {
    borderWidth: 1, 
    borderColor: 'black', 
    backgroundColor: '#E3E3E3', 
    zIndex: 10
  },

  valueSection: {
    flexDirection: 'column',
    marginTop: 100, 
    width: 330, 
    alignSelf: 'center'    
  },

  valueSectionSubTitle: {
    color: "#00529b", 
    fontSize: 16, 
    marginTop: 5,
    lineHeight: 22
  },

  valueSectionErrorMsg: {
    color: 'red', 
    fontSize: 13,
    marginTop: 5
  },

  valueSectionTextInput: {
    width: 330,
    height: 40, 
    color: "#00529b", 
    fontWeight: 'bold',
    fontSize: 15,
    borderBottomWidth: 2,
    marginTop: 20
  },

  submitButtonSection: {
    marginTop: 50, 
    width: 350, 
    alignSelf: 'center', 
    marginBottom: 20
  },

  submitButton: {
    width: 250, 
    alignSelf: 'center'
  },

  submitButtonText: {
    flex: 1, 
    textAlign: 'center'
  },

  hashTagPage: {
    marginTop: 120, 
    width: 330, 
    alignSelf: 'center'
  },

  hashTagPageTitle: {
    fontSize: 25, 
    fontWeight: 'bold',
    marginBottom: 10
  },

  hashTagPageSubTitle: {
    fontSize: 16, 
    marginBottom: 10, 
    lineHeight: 22
  },

  hashTagPageContent: {
    flex: 1, 
    flexDirection: 'column'
  },

  hashTagePageButton: {
    alignSelf: 'center', 
    width: 250, 
    alignItems: 'center', 
    marginTop: 20
  },

  hashTagePageButtonText: {
    textAlign: 'center', 
    flex: 1
  },

  categoryPageSubTitle: {
    fontSize: 16, 
    marginTop: 10,
    marginBottom: 8, 
    lineHeight: 22
  },

  userResponseSection: {
    top: 0,
    minHeight: 60,
    maxHeight: 250,
    borderTopWidth: 1, 
    borderTopColor: '#959595', 
    marginBottom: 0, 
    zIndex: 10, 
    backgroundColor: 'white'
  },

  firstUserResponseSection: {
    display: 'flex', 
    flex: 1, 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    marginLeft: 15, 
    marginRight: 15
  },

  blueButton: {
    display: 'flex', 
    width: 100,
    alignSelf: 'center', 
    height: 40
  },

  pinkButton: {
    display: 'flex', 
    width: 100, 
    alignItems: 'center', 
    alignSelf: 'center', 
    height: 40,
    backgroundColor: '#FA6D7D'
  },

  blackButton: {
    display: 'flex', 
    width: 100, 
    alignItems: 'center', 
    alignSelf: 'center', 
    height: 40,
    backgroundColor: '#1F222F'
  },

  blueButtonText: {
    textAlign: 'center',
    marginLeft: 10
  },

  selectDropdown: {
    backgroundColor: '#E3E3E3', 
    borderRadius: 5, 
    marginTop: 7, 
    height: 45,
    width: 345,
    marginRight: 15, 
    paddingLeft: 10, 
    paddingRight: 10, 
    paddingTop: 5
  },

  selectFashionTypeDropdown: {
    backgroundColor: '#E3E3E3', 
    borderRadius: 5,
    marginBottom: 5,
    height: 45,
    width: 345,
    marginRight: 15, 
    paddingLeft: 10, 
    paddingRight: 10, 
    paddingTop: 5,
    marginTop: 15
  },

  textInput: {
    height: 45, 
    backgroundColor: '#EDEDED', 
    borderRadius: 10, 
    color: "#00529b", 
    fontWeight: 'bold',
    width: 315,
  },

  sendButton: {
    marginLeft: 10, 
    backgroundColor: 'white',
  },

  hashTagSendButton: {
    marginLeft: 10, 
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    marginBottom: 10
  },

  firstConditionCard: {
    display: 'flex',
    alignItems: 'center', 
    alignSelf: 'center', 
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: "#3578e5",
    height: 90,
    marginTop: 10,
    marginBottom: 10
  },

  conditionCard: {
    display: 'flex',
    alignItems: 'center', 
    alignSelf: 'center', 
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: "#3578e5",
    height: 90,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },

  conditionCardView: {
    display: 'flex', 
    flexDirection: 'column', 
    padding: 0
  },

  conditionCardTitle: {
    textAlign: 'center', 
    color: "#3578e5"
  },

  conditionCardText: {
    textAlign: 'center', 
    color: "#3578e5", 
    fontSize: 10
  },

  firstRecommendedValueCard: {
    display: 'flex',
    alignItems: 'center', 
    alignSelf: 'center', 
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: "#3578e5",
    height: 90,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30
  },

  recommendedValueCard: {
    display: 'flex',
    alignItems: 'center', 
    alignSelf: 'center', 
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: "#3578e5",
    height: 90,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 30
  },

  multiSelectSubmitButton: {
    alignItems: 'center', 
    alignSelf: 'center', 
    width: 320, 
    borderRadius: 10, 
    marginTop: 5, 
    height: 40, 
    marginBottom: 10
  },

  lastViews: {
    flex: -1, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    marginTop: 10, 
    marginBottom:10
  },

  interestedCategorySection: {
    // width: 350, 
    width: '100%',
    // flex: 1,
    // alignSelf: 'center', 
    flexDirection: 'column', 
    marginTop: 32, 
    marginBottom: 5
  },

  interestedCategoryTitleSection: {
    flexDirection: 'row'
  },

  interestedCategoryTitle: {
    fontWeight: 'bold', 
    lineHeight: 30, 
    width: 305, 
    fontSize: 16,
    marginBottom: 24,
  },

  interestedCategoryEditButton: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    marginLeft: 15,
    marginTop: 5,
    position: 'absolute',
    right: 0
  },

  interestedCategoryInstruction: {
    // marginTop: 5, 
    color: '#A3A3A2', 
    fontSize: 16
  },

  selectedInterestedCategories: {
    fontWeight: 'bold', 
    marginTop: 30, 
    color: '#A3A3A2'
  }
});



