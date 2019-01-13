import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contentSection: {
    backgroundColor: 'white'
  },

  contentViewSection: {
    marginLeft: 20, 
    marginTop: 25
  },

  singleMessageContainer: {
    flex: 1, 
    flexDirection: 'row', 
    marginBottom: 25
  },

  itemPic: {
    width: 65, 
    height: 65, 
    backgroundColor:'#959595',
    borderRadius: 5 
  },

  singleMessageContent: {
    flex: 1, 
    flexDirection: 'column', 
    marginLeft: 15
  },

  userName: {
    fontWeight: 'bold', 
    marginBottom: 5
  },

  productName: {
    width: 200, 
    overflow: 'hidden', 
    marginBottom: 5
  },

  hourText: {
    color: "#959595"
  },

  userHeadshot: {
    width: 50, 
    height: 50, 
    backgroundColor:'#959595',
    marginTop: 5,
    borderRadius: 50,
    marginRight: 20
  }
});