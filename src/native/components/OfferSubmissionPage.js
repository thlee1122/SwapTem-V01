import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity}                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
import LottieView                                         from 'lottie-react-native';
// import { connect }                                     from 'react-redux';
// import { inboxItem }                                      from '../data/sampleInboxData';
import styles                                             from '../styles/InboxStyles';

class OfferSubmissionPage extends Component {

  render() {

    const { UserName } = this.props;

    return (
      <Container>
        <Content style={styles.contentSection}>
          <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', marginTop: '10%'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: "#00529b"}}>
              Congratulation!
            </Text>

            <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: "10%"}}>
              Your Swap offer has been sent!
            </Text>

            <View style={{flexDirection: 'row', marginTop: '3%', height: 30}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                ** {UserName}
              </Text>
              <Text style={{fontSize: 18, marginLeft: 5, marginRight: 5}}>
                usually responds
              </Text>

              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                within an hour.
              </Text>
            </View>

            <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 2}}>
              Stay tuned!
            </Text>

            <Text style={{fontSize: 18, textAlign: 'center', marginTop: 15, color: '#959595'}}>
              You will receive an notification once your Swap offer has been accepted.
            </Text>

            {/* <Text style={{fontSize: 18, marginTop: 5, color: '#959595'}}>
              You can your request in the offer page.
            </Text> */}

            <LottieView
              source={require('../../lottieAnimations/990-inattentive.json')}
              autoPlay
              loop
              style={{
                width: 300,
                height: 300,
                alignSelf: 'center'
              }}
            />

            {/* <Text style={{fontSize: 18, marginTop: 5, color: '#959595'}}>
              Stay tuned!
            </Text> */}

            <TouchableOpacity
              style={{
                backgroundColor: '#00529b',
                borderRadius: 5, 
                width: 200, 
                height: 45, 
                borderColor: '#00529b', 
                borderWidth: 1,
                alignSelf: 'center',
                marginTop: "3%"
              }}
              // onPress={(e) => this.handleSwapSubmit()}
              onPress={ () => { Actions.offer() }}
            >
              <Text 
                style={{
                  fontSize: 16, 
                  color: 'white',
                  fontWeight: 'bold', 
                  flex: 1, 
                  textAlign: 'center', 
                  paddingTop: 10, 
                  letterSpacing: 2
                }}
              >
                Proceed
              </Text>
            </TouchableOpacity>
      </View>
        </Content>
      </Container>
    );
  }
}

export default OfferSubmissionPage;

