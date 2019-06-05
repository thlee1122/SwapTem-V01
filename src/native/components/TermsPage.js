import React, { Component }                               from 'react';
import { View, TouchableOpacity, ScrollView, 
         SafeAreaView, Dimensions }                       from 'react-native';
import { Container, Content, Text }                       from 'native-base';
import { Actions }                                        from 'react-native-router-flux';

class TermsPage extends Component {
  render() {
    const { height, width } = Dimensions.get('window');

    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <SafeAreaView>
            <Text>
              Terms Page
            </Text>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}

export default TermsPage;

