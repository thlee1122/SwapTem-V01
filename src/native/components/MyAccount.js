import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Right, Text,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from './Header';
import CheckCircle                    from '@material-ui/icons/CheckCircle';
import Tooltip                        from '@material-ui/core/Tooltip';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';


const MyAccount = ({ member, logout }) => (
  <Container>
    <Content style={{backgroundColor: 'white'}}>
      <List>
        {(member && member.email)
          ? (
            <View>
              <Content padder>
                <Header
                  title={`Hi ${member.firstName},`}
                  content={`You are currently logged in as ${member.email}`}
                />
              </Content>

              <ListItem onPress={Actions.updateProfile} icon>
                <Left>
                  <MaterialIcon name="person-add" />
                </Left>
                <Body>
                  <Text>
                    Update My Profile
                  </Text>
                </Body>
              </ListItem>
              <ListItem onPress={logout} icon>
                <Left>
                  <MaterialIcon name="power" />
                </Left>
                <Body>
                  <Text>
                    Logout
                  </Text>
                </Body>
              </ListItem>
            </View>
          )
          

          : (
            <View>
              <Content padder>
                {/* <Header
                  title="Account Settings"
                  // content="Please login to gain extra access"
                /> */}
                
                {/* <View style={{flex: 1, flexDirection: 'row'}}>
                  <FeatherIcon name="arrow-left" size={25} style={{marginRight: 10}}/>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginBottom: 30
                    }}
                  >
                    Account Settings
                  </Text>
                  <Right>
                    <MaterialIcon name="settings" size={25} color="#959595" style={{marginTop: -25}}/>
                  </Right>
                </View> */}

                <View 
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1, 
                    width: 100, 
                    height: 100, 
                    backgroundColor:'#959595',
                    borderRadius: 50,
                    alignSelf: 'center'
                  }}
                >

                </View>
                <Text
                  style={{
                    fontSize: 35,
                    fontWeight: 'bold',
                    marginTop: 15,
                    alignSelf: 'center'
                  }}
                >
                  Tae Hoon 
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    color:'#696969',
                    alignSelf: 'center',
                    marginTop: 10
                  }}
                >
                  Joined Aug 2018
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    color:'#00529b',
                    alignSelf: 'center',
                    marginTop: 10
                  }}
                  // onPress={this._goToURL}
                >
                  View your profile page
                </Text>

                <View
                  style={{
                    marginTop: 14,
                    borderBottomColor: '#696969',
                    borderBottomWidth: 1,
                  }}
                />

                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 14,
                    color:'#696969',
                    alignSelf: 'center',
                    textAlign: 'center',
                    width: 380
                  }}
                >
                  Boost your reputation by confirming your information
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    color:'#00529b',
                    alignSelf: 'center',
                    marginTop: 10
                  }}
                  onPress={Actions.privacy}
                  // onPress={this._goToURL}
                >
                  How we protect your privacy
                </Text>

                <View style={{flex: 1, flexDirection: 'row', marginTop: 15, alignSelf: 'center'}}>
                  <View style={{borderBottomColor: '#00529b', width: 50, borderBottomWidth: 10}}/>
                  <View style={{borderBottomColor: '#00529b', width: 50, borderBottomWidth: 10, marginLeft: 5}}/>
                  <View style={{borderBottomColor: '#00529b', width: 50, borderBottomWidth: 10, marginLeft: 5}}/>
                  <View style={{borderBottomColor: '#696969', width: 50, borderBottomWidth: 10, marginLeft: 5}}/>
                  <View style={{borderBottomColor: '#696969', width: 50, borderBottomWidth: 10, marginLeft: 5}}/>
                  
                  <MaterialIcon name="check-circle" size={25} color="#696969" style={{marginLeft: 10}}/>
                  
                </View>

                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 14,
                    color:'#696969',
                    alignSelf: 'center',
                    textAlign: 'center',
                    width: 380
                  }}
                >
                  60% complete
                </Text>

              </Content>

              <ListItem onPress={Actions.login} icon style={{marginTop: 20}}>
                <Left>
                  <MaterialIcon name="location-on" size={22} color="#00529b"/>
                </Left>
                <Body>
                  <Text>
                    Confirm your location
                  </Text>
                </Body>
              </ListItem>
              <ListItem onPress={Actions.signUp} icon>
                <Left>
                  <MaterialIcon name="camera-alt" size={22} color="#00529b" />
                </Left>
                <Body>
                  <Text>
                    Profile picture added
                  </Text>
                </Body>
                <Right>
                  <Text>
                    Edit
                  </Text>
                </Right>
              </ListItem>

              <ListItem onPress={Actions.forgotPassword} icon>
                <Left>
                  <MaterialIcon name="smartphone" size={22} color="#00529b" />
                </Left>
                <Body>
                  <Text>
                    Confirm phone
                  </Text>
                </Body>
              </ListItem>

              <ListItem onPress={Actions.forgotPassword} icon>
                <Left>
                  <MaterialIcon name="email" size={22} color="#00529b" />
                </Left>
                <Body>
                  <Text>
                    thlee1122@gmail.com
                  </Text>
                </Body>

                <Right>
                  <Text>
                    Edit
                  </Text>
                </Right>
              </ListItem>


              <ListItem onPress={Actions.forgotPassword} icon>
                <Left>
                  <FontAwesomeIcon name="facebook-official" size={22} color="#00529b" />
                </Left>
                <Body>
                  <Text>
                    Connect Facebook
                  </Text>
                </Body>
              </ListItem>

              <ListItem onPress={Actions.forgotPassword} icon>
                <Left>
                  <FontAwesomeIcon name="heart" size={22} color="#00529b" />
                </Left>
                <Body>
                  <Text>
                    View your liked items
                  </Text>
                </Body>
              </ListItem>

              <ListItem onPress={Actions.forgotPassword} icon>
                <Left>
                  <FontAwesomeIcon name="share-alt" size={22} color="#00529b" />
                </Left>
                <Body>
                  <Text>
                    View your shared items
                  </Text>
                </Body>
              </ListItem>

              <ListItem onPress={Actions.forgotPassword} icon>
                <Left>
                  <FeatherIcon name="award" size={22} color="#00529b" />
                </Left>
                <Body>
                  <Text>
                    View your badges
                  </Text>
                </Body>
              </ListItem>

              <ListItem onPress={Actions.accountSettings} icon>
                <Left>
                  <MaterialIcon name="settings" size={22} color="#00529b" />
                </Left>
                <Body>
                  <Text>
                    Account Settings
                  </Text>
                </Body>
              </ListItem>
            </View>
          )
        }
      </List>
    </Content>
  </Container>
);

// AccountSettings.propTypes = {
//   member: PropTypes.shape({}),
//   // logout: PropTypes.func.isRequired,
// };

// AccountSettings.defaultProps = {
//   member: {},
// };

export default MyAccount;
