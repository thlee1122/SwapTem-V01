import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity}                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import { Actions }                                                  from 'react-native-router-flux';
import { Permissions, Contacts }                                           from 'expo';

// import { MaterialIcons, Ionicons } from '@expo/vector-icons';
// import { connect }                                     from 'react-redux';


class ShareMyMeetingPage extends Component {

  constructor(props) {
    super(props);

    this.contactsData = "";
  }

  async showFirstContactAsync() {
    const permission = await Permissions.askAsync(Permissions.CONTACTS);
    let contacts = '';
    console.log("@@@ permission", permission);
    
    if(permission.status !== 'granted') {
      return;

    } else {
      contacts = await Contacts.getContactsAsync({
        fields: [
          Contacts.PHONE_NUMBERS,
          Contacts.EMAILS,
        ],
        pageSize: 10,
        pageOffset: 0,
      });
    }

    if(contacts.data.length > 0) {
      this.contactsData = contacts.data;
    }

    Actions.contactsPage({ contactsData: this.contactsData });

    // console.log("@@@ contacts", contacts);
    console.log("@@@ this.contactsData", this.contactsData);

    // if(contacts.total > 0) {
    //   console.log("@@@@@ contacts", contacts);
    // }
  }

  render() {


    return (
      <Container>
        <Content style={{backgroundColor: 'white' }}>
          <Image 
            // source={{uri: thumbnailUrl}}
            style={{width: '100%', height: 300, borderWidth: 1}}
          />
          <View style={{flexDirection: 'column', margin: 15}}>
            <Text style={{fontSize: 25, fontWeight: '500', flex: 1, textAlign: 'center'}}>
              Let loved ones follow your meeting
            </Text>

            <Text style={{fontSize: 18, color: "#959595", marginTop: 20, letterSpacing: 1, lineHeight: 22}}>
              Trusted Contacts lets you share your meeting status with family and friends in a single tap.
            </Text>

            <View style={{flexDirection: 'column', marginTop: 20, marginLeft: 20}}>
              <Text style={{fontSize: 16, color: "#959595", marginBottom: 10, letterSpacing: 1, lineHeight: 22}}>
                {`\u2022`} Set personalized reminders so you never forget to share meetings.  
              </Text>

              <Text style={{fontSize: 16, color: "#959595", marginBottom: 15, letterSpacing: 1, lineHeight: 22}}>
                {`\u2022`} Meeting info will never be shared without your permissions.
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            style={{
              backgroundColor: '#007aff', 
              width: 250, 
              height: 50, 
              alignSelf: 'center', 
              borderRadius: 5, 
              marginTop: 30
            }}
            onPress={() => { this.showFirstContactAsync(); }}
          >
            <Text style={{color: 'white', fontWeight: '500', fontSize: 20, flex: 1, textAlign: 'center', marginTop: 10}}>
              Next
            </Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

export default ShareMyMeetingPage;

