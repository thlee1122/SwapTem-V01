import React, { Component }                               from 'react';
import { View, Image, TouchableOpacity}                   from 'react-native';
import { Container, Content, List, Text }                 from 'native-base';
import { Actions }                                        from 'react-native-router-flux';
// import { connect }                                     from 'react-redux';


class SettingsScreen extends Component {


  render() {
    const { closeDrawer } = this.props;

    return (
      <Container>
        <Content style={{backgroundColor: 'transparent' }}>
          <TouchableOpacity style={{height: 700}} onPress={()=> closeDrawer()} activeOpacity={1}>
            <View 
              style={{
                flexDirection: 'column', 
                backgroundColor: 'white', 
                shadowColor: '#000000', 
                shadowOpacity: 2, 
                shadowRadius: 3,
                shadowOffset: {
                  height: 1,
                  width: 1
                },
                marginTop: 40
              }}>
              <TouchableOpacity>
                <Text style={{fontSize: 16, letterSpacing: 1, margin: 10}}>
                  Safety Tips
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={{fontSize: 16, letterSpacing: 1, margin: 10}}>
                  Block User
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={{fontSize: 16, letterSpacing: 1, margin: 10}}>
                  Delete Chat
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={{fontSize: 16, letterSpacing: 1, margin: 10}}>
                  Report User
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={{fontSize: 16, letterSpacing: 1, margin: 10}}>
                  Mark as Swapped
                </Text>
              </TouchableOpacity>

            </View>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

export default SettingsScreen;

