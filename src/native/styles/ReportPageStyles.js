import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contentSection: {
    backgroundColor: 'white'
  },

  listSection: {
    marginLeft: 20, 
    marginTop: 30, 
    marginRight: 20
  },

  reportPageTitle: {
    fontWeight: 'bold',
     marginBottom: 20
  },

  reportContent: {
    display: 'flex', 
    flex: 1, 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between'
  },

  reportCategory: {
    alignItems: 'center'
  },

  reportCategoryCheckCircle: {
    width: 80, 
    height: 80,
    marginTop: 5,
    borderRadius: 50,
    position: 'absolute',
    zIndex: 1
  },

  reportCategoryCircle: {
    width: 80, 
    height: 80, 
    backgroundColor:'#959595',
    marginTop: 5,
    borderRadius: 50,
  },

  reportCategoryTitle: {
    fontSize: 13, 
    marginTop: 10, 
    fontWeight: 'bold',
    width: 100,
    textAlign: 'center',
    marginBottom: 20
  },

  submitButton: {
    backgroundColor: '#00529b', 
    borderRadius: 15, 
    marginRight: 10, 
    width: 200, 
    marginTop: 30, 
    alignItems: 'center', 
    alignSelf: 'center'
  },

  submitButtonText: {
    fontSize: 15, 
    textAlign: 'center', 
    marginLeft: '30%'
  }
});



