import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity, Dimensions}                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import { Actions }                                                  from 'react-native-router-flux';
import { Permissions, Contacts }                                           from 'expo';

// import { MaterialIcons, Ionicons } from '@expo/vector-icons';
// import { connect }                                     from 'react-redux';


class TrustedContactConfirmPage extends Component {

  constructor(props) {
    super(props);

    this.trustedContactName = [];
  }

  componentWillMount = () => {
    const { selectedContactList } = this.props;
    
    if(!!selectedContactList && Object.keys(selectedContactList).length !== 0) {
      selectedContactList.map((item, index) => {
        let firstName = item.fullName.split(" ")[0];
        this.trustedContactName.push(firstName);
      });
    }
  }

  render() {
    const { selectedContactList } = this.props;
    const { height, width } = Dimensions.get('window');

    return (
      <Container>
        <Content style={{backgroundColor: 'white' }}>
          <View style={{height: height * 0.8}}>
            <Image 
              // source={{uri: thumbnailUrl}}
              style={{width: '100%', height: '40%', borderWidth: 1}}
            />
            <View style={{flexDirection: 'column', margin: 15, height: 200}}>
              <Text style={{fontSize: 25, fontWeight: '500', textAlign: 'center'}}>
                Your Trusted Contacts are set up
              </Text>

              <Text style={{fontSize: 18, color: "#959595", marginTop: 20, letterSpacing: 1, lineHeight: 22}}>
                Now it's even easier to share meetings with the people you trust.
              </Text>

              <Text style={{fontSize: 18, color: "#959595", marginTop: 20, letterSpacing: 1, lineHeight: 22, marginTop: 20}}>
                To add or remove Trusted Contacts, go to your app settings.
              </Text>
            </View>

            <TouchableOpacity 
              style={{
                backgroundColor: '#007aff', 
                width: 250, 
                height: 50, 
                alignSelf: 'center', 
                borderRadius: 5, 
                position: 'absolute',
                bottom: 50
              }}
              onPress={() => { Actions.chatRoom({
                trustedContactSubmitted: true,
                trustedContactName: this.trustedContactName
              }); }}
            >
              <Text style={{color: 'white', fontWeight: '500', fontSize: 20, flex: 1, textAlign: 'center', marginTop: 10}}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

export default TrustedContactConfirmPage;

