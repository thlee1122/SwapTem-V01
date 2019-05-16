import { StyleSheet, Dimensions }       from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  searchResultPage: {
    backgroundColor: 'white', 
    paddingLeft: 16, 
    paddingRight: 16
  },

  searchBarInput: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 'bold'
  },

  searchBarLabel: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 'bold',
    paddingLeft: 8
  },

  searchBarContainer: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#A3A3A2"
  },

  suggestedSearchSection: {
    flexDirection: 'column', 
    marginRight: 10, 
    marginLeft:10, 
    marginTop: height * 0.08, 
    marginBottom: height * 0.14
  },

  suggestedSearchSectionTitle: {
    fontSize: 14, 
    color: "#000000", 
    marginBottom: 40, 
    fontWeight: 'bold'
  },

  singleSearchResult: {
    flexDirection: 'row', 
    marginBottom: 15
  },

  singleSearchResultText: {    
    letterSpacing: 2,
    fontSize: 16,
    flex: 1
  },

  singleSearchResultSubtext: {
    fontSize: 16, 
    position: 'absolute', 
    right: 0, 
    alignSelf: 'center',
    letterSpacing: 2,
    color: "#959595"
  },

  searchAlertSection: {
    flexDirection: 'column', 
    marginRight: 10, 
    marginLeft:10, 
    marginTop: height * 0.08, 
    marginBottom: height * 0.14
  },

  searchAlertSectionTitle: {
    fontSize: 14, 
    color: "#000000", 
    marginBottom: 40, 
    fontWeight: 'bold'
  },

  singleSearchAlert: {
    flexDirection: 'row', 
    marginBottom: 32
  },

  singleSearchAlertText: {
    fontSize: 16, 
    letterSpacing: 2, 
    flex: 1
  },

  singleSearchAlertSwitch: {
    position: 'absolute', 
    right: 0
  },

  buttonSection: {
    position: 'absolute', 
    bottom: 0,
  },

  manageButton: {
    alignSelf: 'center', 
    borderWidth: 1, 
    borderColor: "#000000",
    borderRadius: 50,
    width: 278,
    height: 58
  },

  manageButtonText: {
    fontSize: 14, 
    fontWeight: 'bold', 
    color: "#000000", 
    letterSpacing: 2, 
    flex: 1, 
    textAlign: 'center',
    paddingTop: 19
  }



});



