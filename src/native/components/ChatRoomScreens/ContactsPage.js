import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity, ScrollView, Dimensions }                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import { Actions }                                                  from 'react-native-router-flux';
import { MaterialIcons } from '@expo/vector-icons';
import SingleContact                                        from './SingleContact';
import styles                                               from '../../styles/ContactsPageStyles';

class ContactsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedContactList: []
    };

    this.selectedContactList = [];
  }

  handleSelectContact = (fullName, mobileNumber, index, contactSelected) => {
    if(contactSelected === true) {
      this.selectedContactList.push({
        fullName: fullName,
        mobileNumber: mobileNumber
      });

    } else {
      this.deleteContact(fullName, mobileNumber, index);
    }

    this.setState({
      selectedContactList: this.selectedContactList
    });
  }

  deleteContact = (fullName, mobileNumber, index) => {
    this.selectedContactList = this.selectedContactList.filter((item) => {
      return item.fullName !== fullName
    });

    this.setState({
      selectedContactList: this.selectedContactList
    });
  }

  render() {
    const { contactsData } = this.props;
    const { height, width } = Dimensions.get('window');

    return (
      <Container>
        <Content style={styles.contentSection}>
          <View>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={30} color="#757575" style={{margin: 10}}/>
            <View style={styles.searchBarContactList}>
              {
                this.state.selectedContactList.map((item, index) => {
                  const fullName = item.fullName;
                  const mobileNumber = item.mobileNumber;

                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.searchBarSingleContact}
                      onPress={() => { this.deleteContact(fullName, mobileNumber, index); }}
                    >
                      <Text style={styles.singleContactText}>
                        {fullName}
                      </Text>

                      <TouchableOpacity>
                        <MaterialIcons name="close" size={16} color="white" style={{paddingTop: 5, paddingRight: 10}}/>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                })
              }
            </View>
          </View>

          <ScrollView style={{flexDirection: 'column', flex: 1}}>
            {
              contactsData.map((item, index) => {
                const fullName = `${item.firstName} ${item.lastName}`;
                const mobileNumber = item.phoneNumbers[0].number;

                return (
                  <SingleContact
                    key={index}
                    index={index}
                    fullName={fullName}
                    mobileNumber={mobileNumber}
                    handleSelectContact={this.handleSelectContact}
                  />
                )
              })
            }
          </ScrollView>
          </View>

          <View style={{backgroundColor: "#EFEEEE", height: 65, position: 'absolute', top: height - 236, width: "100%"}}>
            <TouchableOpacity 
              style={{
                width: "60%", 
                height: 50, 
                backgroundColor: this.state.selectedContactList.length > 0 ? "#007aff" : "#DFDFDF", 
                borderRadius: 5, 
                alignSelf: 'center', 
                marginTop: 7
              }}
              disabled={this.state.selectedContactList.length > 0 ? false : true}
              onPress={() => { Actions.shareMeetingReminder({selectedContactList: this.selectedContactList}); }}
            > 
              <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>
                <Text 
                  style={{
                    color: this.state.selectedContactList.length > 0 ? 'white' : "#A2A2A2",
                    fontSize: 20, 
                    fontWeight: '500'
                  }}
                >
                  ADD
                </Text>
                
                {
                  this.state.selectedContactList.length > 0 ?
                  <Text 
                    style={{
                      marginLeft: 5, 
                      fontWeight: '500',
                      fontSize: 20, 
                      color: this.state.selectedContactList.length > 0 ? 'white' : "#A2A2A2"
                    }}
                  >
                    {`(${this.state.selectedContactList.length})`}
                  </Text>
                  : null
                }
              </View>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ContactsPage;

