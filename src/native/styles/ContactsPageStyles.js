import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contentSection: {
    backgroundColor: 'white'
  },

  searchBar: {
    backgroundColor: "#EFEEEE", 
    minHeight: 50, 
    flexDirection: 'row'
  },

  searchBarContactList: {
    flexDirection: 'row', 
    display: 'flex', 
    flexWrap: 'wrap',
    marginRight: 10
  },

  searchBarSingleContact: {
    borderWidth: 1, 
    borderColor: "#007aff", 
    backgroundColor: '#007aff', 
    borderRadius: 5,
    marginRight: 5,
    height: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 5
  },

  singleContactText: {
    fontSize: 16, 
    color: "white", 
    paddingBottom: 5, 
    paddingLeft: 10, 
    paddingRight: 10, 
    paddingTop: 3
  }

});