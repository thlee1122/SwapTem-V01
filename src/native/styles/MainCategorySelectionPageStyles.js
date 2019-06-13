import { StyleSheet }             from 'react-native';

export default StyleSheet.create({
  statusBar: {
    color: 'white',
    zIndex: 10
  },

  backButton: {
    marginLeft: 10,
    marginTop: 32
  },

  mainCategorySearchInput: {
    height: 64, 
    borderColor: 'black', 
    borderBottomWidth: 1,
    borderBottomColor: '#A3A3A2',
    width: '90%',
    margin: 5,
    marginRight: 10,
    alignSelf: 'center',
    fontSize: 24,
    lineHeight: 28,
    color: 'black',
    marginTop: 60
  },

  mainCategorySubTitle: {
    fontSize: 12, 
    color: "#A3A3A2", 
    lineHeight: 16, 
    padding: 16
  },

  continueButton: {
    flexDirection: 'row', 
    borderWidth: 1,
    borderRadius: 30,
    width: 278,
    height: 58,
    marginTop: 50,
    marginBottom: 50
  },

  continueButtonText: {
    fontSize: 14, 
    fontWeight: 'bold', 
    lineHeight: 20,
    flex: 1,
    textAlign: 'center',
    marginTop: 18,
  }

});
