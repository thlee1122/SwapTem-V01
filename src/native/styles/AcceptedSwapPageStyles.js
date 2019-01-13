import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  showMainContent: {
    display: 'flex',
    backgroundColor: 'white'
  },

  hideMainContent: {
    display: 'none'
  },

  selectDropdown: {
    backgroundColor: '#E3E3E3', 
    borderRadius: 5, 
    marginTop: 10, 
    height: 45,
    width: 280,
    marginRight: 15,
    marginLeft: 15,
    paddingLeft: 10, 
    paddingRight: 10, 
    paddingTop: 5
  },

  lineTwo: {
    marginTop: 14,
    borderBottomColor: '#EDEBEB',
    borderBottomWidth: 1,
    width: '98%',
    marginLeft: 5
  }
});