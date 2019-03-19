import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scheduleMeetupPage: {
    backgroundColor: 'white'
  },

  scheduleMeetupPageContent: {
    marginLeft:10, 
    marginRight: 10, 
    marginTop: 10, 
    marginBottom: 10
  },

  scheduleMeetupPageTitle: {
    fontSize: 20, 
    fontWeight: 'bold'
  },

  locationCard: {
    borderRadius: 5,
    marginTop: 10
  },

  locationImage: {
    height: 145,
    margin: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },

  locationName: {
    fontWeight: 'bold',
    fontSize: 18, 
    flex: 1, 
    marginTop: 5, 
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20
  },

  locationAddress: {
    fontSize: 16, 
    marginBottom: 5, 
    flex: 1, 
    color: "#9E9E9E",
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20
  },

  locationSelectButton: {
    fontSize: 20, 
    flex: 1, 
    textAlign: 'center', 
    color: "#007aff", 
    marginLeft: 20, 
    marginRight: 20,
    marginBottom: 20,
    marginTop: 10,
    fontWeight: 'bold'
  },

  dateSection: {
    flexDirection: 'column'
  },

  dateSectionTitle: {
    fontSize: 20, 
    fontWeight: 'bold'
  },

  dateSectionText: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: "#9E9E9E", 
    marginTop: 5
  },

  timeSection: {
    flexDirection: 'column', 
    marginTop: 20
  },

  timeSectionTitle: {
    fontSize: 20, 
    fontWeight: 'bold'
  },

  timeSectionText: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: "#9E9E9E", 
    marginTop: 5
  },

  sendMeetingButton: {
    width: 250, 
    alignSelf: 'center', 
    marginTop: 50
  },

  sendMeetingButtonText: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: 'white', 
    flex: 1, 
    textAlign: 'center'
  }

});



