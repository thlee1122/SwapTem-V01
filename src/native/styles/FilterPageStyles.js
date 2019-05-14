import { StyleSheet }             from 'react-native';
import { Dimensions }             from 'react-native';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  filterPage: {
    backgroundColor: 'white', 
    borderTopWidth: 1, 
    borderTopColor: '#A3A3A2'
  },

  filterPageScrollView: {
    marginTop: height * 0.03, 
    marginLeft: 16, 
    marginRight: 16, 
    height: height * 0.75
  },

  categorySectionTitle: {
    fontSize: 14, 
    lineHeight: 16, 
    color: "#A3A3A2", 
    marginBottom: 6
  },

  dropDown: {
    height: 56, 
    paddingTop: 14, 
    paddingBottom: 14, 
    borderBottomWidth: 1, 
    borderBottomColor: "#A3A3A2",
    flexDirection: 'row'
  },

  selectedText: {
    fontSize: 18, 
    marginTop: 4
  },

  arrowIcon: {
    position: 'absolute',
    right: 0,
    marginTop: 18
  },

  flatList: {
    borderColor: '#A3A3A2', 
    borderWidth: 1, 
    height: 202
  },

  singleCategory: {
    flex: 1, 
    flexDirection: 'row'
  },

  singleCategoryName: {
    paddingTop: 2, 
    paddingBottom: 2, 
    fontSize: 16, 
    paddingLeft: 10
  },

  checkIcon: {
    position: 'absolute',
    right: 0,
  },

  sectionTitleTwo: {
    fontSize: 14, 
    lineHeight: 16, 
    color: "#A3A3A2", 
    marginBottom: 6, 
    marginTop: 32
  },

  locationSection: {
    height: 56, 
    flex: 1, 
    paddingTop: 14, 
    paddingBottom: 14, 
    borderBottomWidth: 1, 
    borderBottomColor: "#A3A3A2",
  },

  locationSectionTextInput: {
    paddingBottom: 0, 
    fontSize: 18
  },

  buttonSection: {
    marginTop: height * 0.16, 
    flexDirection: 'row', 
    alignSelf: 'center'
  },

  resetButton: {
    borderBottomWidth: 1, 
    borderBottomColor: 'black', 
    width: 80, 
    height: 48,
    flexDirection: 'row',
    marginRight: width * 0.195
  },

  arrowRightIcon: {
    marginTop: 12
  },

  resetButtonText: {
    marginTop: 15, 
    position: 'absolute', 
    right: 0
  },

  applyButton: {
    borderWidth: 1, 
    borderColor: 'black', 
    borderRadius: 50,
    width: 123, 
    height: 48
  },

  applyButtonText: {
    textAlign: 'center', 
    marginTop: 12
  }

});





