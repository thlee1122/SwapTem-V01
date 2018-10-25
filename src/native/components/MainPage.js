import React from 'react';
import { TextInput, View, Image, Modal, Alert, TouchableHighlight, TouchableOpacity } from 'react-native';
import {
  Container, Content, H1, H2, H3, List, ListItem, Body, Left, Right, Text, Button, Tabs, Tab, TabHeading, Card, CardItem,
} from 'native-base';

import Spacer from './Spacer';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { Actions } from 'react-native-router-flux';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: 'Useless Placeholder',
      modalVisible: false
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleSearchButton = () => {
    alert('search button has been clicked');
    // this.setModalVisible(!this.state.modalVisible);
    // this.setModalVisible(false);
    // Actions.searchResult();
  }

  render() {
    return (
      <Container style={{backgroundColor: 'white'}}>
        <Content padder style={{backgroundColor: 'white'}}>

          <Modal
            animationType="slide"
            animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(false)
            }}
            style={{marginTop: 100}}
          >
            <View style={{backgroundColor: 'white', marginTop: 140, height: 100 }}>
              <View style={{flex: 1, flexDirection: 'row', marginLeft: 20, marginTop: 15}}>
                <Text style={{fontWeight: 'bold', fontSize: 30}}>Trending this week</Text>

                <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                style={{marginLeft: 50, marginTop: 5}}
                >
                  <MaterialIcon name="close" size={20}/>
                </TouchableHighlight>
              </View>

              <Tabs style={{position: 'absolute', marginTop: 60, height: 510}}>
                <Tab heading={ <TabHeading><Text style={{fontSize: 20}}>Top Items</Text></TabHeading>}>
                  <Content>
                    <View>                    
                      <List>
                        <ListItem style={{flex: 1, flexDirection: 'row', height: 80, right: 10}}>
                          <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
                            <Text style={{fontWeight: 'bold', position: 'absolute', left: 0, marginTop: -20}}>Laptop</Text>
                            <Text style={{fontSize: 12, color: "#959595", position: 'absolute', left: 0}}>55,891 searches</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', position: 'absolute', right: 0}}>
                            
                            <Button 
                              style={{
                                backgroundColor: 'white', 
                                borderWidth: 1, 
                                borderColor: '#00529b', 
                                borderRadius: 10, 
                                marginRight: 10, 
                                width: 80, 
                                height: 35
                              }}
                              onPress={this.handleSearchButton} 
                            >
                              <Text style={{color: "#00529b", fontSize: 15, paddingLeft: 15}}>Search</Text>
                            </Button>
                        
                            <Text style={{marginRight: 10}}>or</Text>
                            <Button style={{backgroundColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{fontSize: 15, paddingLeft: 25}}>Post</Text>
                            </Button>
                          </View>
                        </ListItem>

                        <ListItem style={{flex: 1, flexDirection: 'row', height: 80, right: 10}}>
                          <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
                            <Text style={{fontWeight: 'bold', position: 'absolute', left: 0, marginTop: -20}}>MacBook</Text>
                            <Text style={{fontSize: 12, color: "#959595", position: 'absolute', left: 0}}>51,087 searches</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', position: 'absolute', right: 0}}>
                            <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{color: "#00529b", fontSize: 15, paddingLeft: 15}}>Search</Text>
                            </Button>
                            <Text style={{marginRight: 10}}>or</Text>
                            <Button style={{backgroundColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{fontSize: 15, paddingLeft: 25}}>Post</Text>
                            </Button>
                          </View>
                        </ListItem>

                        <ListItem style={{flex: 1, flexDirection: 'row', height: 80, right: 10}}>
                          <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
                            <Text style={{fontWeight: 'bold', position: 'absolute', left: 0, marginTop: -20}}>Jeans</Text>
                            <Text style={{fontSize: 12, color: "#959595", position: 'absolute', left: 0}}>47,922 searches</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', position: 'absolute', right: 0}}>
                            <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{color: "#00529b", fontSize: 15, paddingLeft: 15}}>Search</Text>
                            </Button>
                            <Text style={{marginRight: 10}}>or</Text>
                            <Button style={{backgroundColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{fontSize: 15, paddingLeft: 25}}>Post</Text>
                            </Button>
                          </View>
                        </ListItem>

                        <ListItem style={{flex: 1, flexDirection: 'row', height: 80, right: 10}}>
                          <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
                            <Text style={{fontWeight: 'bold', position: 'absolute', left: 0, marginTop: -20}}>Handbag</Text>
                            <Text style={{fontSize: 12, color: "#959595", position: 'absolute', left: 0}}>42,763 searches</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', position: 'absolute', right: 0}}>
                            <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{color: "#00529b", fontSize: 15, paddingLeft: 15}}>Search</Text>
                            </Button>
                            <Text style={{marginRight: 10}}>or</Text>
                            <Button style={{backgroundColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{fontSize: 15, paddingLeft: 25}}>Post</Text>
                            </Button>
                          </View>
                        </ListItem>

                        <ListItem style={{flex: 1, flexDirection: 'row', height: 80, right: 10}}>
                          <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
                            <Text style={{fontWeight: 'bold', position: 'absolute', left: 0, marginTop: -20}}>Sweater</Text>
                            <Text style={{fontSize: 12, color: "#959595", position: 'absolute', left: 0}}>40,862 searches</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', position: 'absolute', right: 0}}>
                            <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{color: "#00529b", fontSize: 15, paddingLeft: 15}}>Search</Text>
                            </Button>
                            <Text style={{marginRight: 10}}>or</Text>
                            <Button style={{backgroundColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{fontSize: 15, paddingLeft: 25}}>Post</Text>
                            </Button>
                          </View>
                        </ListItem>

                        <ListItem style={{flex: 1, flexDirection: 'row', height: 80, right: 10}}>
                          <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
                            <Text style={{fontWeight: 'bold', position: 'absolute', left: 0, marginTop: -20}}>Wii</Text>
                            <Text style={{fontSize: 12, color: "#959595", position: 'absolute', left: 0}}>38,972 searches</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', position: 'absolute', right: 0}}>
                            <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{color: "#00529b", fontSize: 15, paddingLeft: 15}}>Search</Text>
                            </Button>
                            <Text style={{marginRight: 10}}>or</Text>
                            <Button style={{backgroundColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{fontSize: 15, paddingLeft: 25}}>Post</Text>
                            </Button>
                          </View>
                        </ListItem>

                        <ListItem style={{flex: 1, flexDirection: 'row', height: 80, right: 10}}>
                          <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
                            <Text style={{fontWeight: 'bold', position: 'absolute', left: 0, marginTop: -20}}>Jacket</Text>
                            <Text style={{fontSize: 12, color: "#959595", position: 'absolute', left: 0}}>36,722 searches</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', position: 'absolute', right: 0}}>
                            <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{color: "#00529b", fontSize: 15, paddingLeft: 15}}>Search</Text>
                            </Button>
                            <Text style={{marginRight: 10}}>or</Text>
                            <Button style={{backgroundColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{fontSize: 15, paddingLeft: 25}}>Post</Text>
                            </Button>
                          </View>
                        </ListItem>
                      </List>
                    </View>
                  </Content>
                </Tab>

                <Tab heading={ <TabHeading><Text style={{fontSize: 20}}>Top Items</Text></TabHeading>}>
                  <Content>
                    <View>                    
                      <List>
                        <ListItem style={{flex: 1, flexDirection: 'row', height: 80, right: 10}}>
                          <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
                            <Text style={{fontWeight: 'bold', position: 'absolute', left: 0, marginTop: -20}}>Apple</Text>
                            <Text style={{fontSize: 12, color: "#959595", position: 'absolute', left: 0}}>55,891 searches</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', position: 'absolute', right: 0}}>
                            <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{color: "#00529b", fontSize: 15, paddingLeft: 15}}>Search</Text>
                            </Button>
                            <Text style={{marginRight: 10}}>or</Text>
                            <Button style={{backgroundColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{fontSize: 15, paddingLeft: 25}}>Post</Text>
                            </Button>
                          </View>
                        </ListItem>

                        <ListItem style={{flex: 1, flexDirection: 'row', height: 80, right: 10}}>
                          <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
                            <Text style={{fontWeight: 'bold', position: 'absolute', left: 0, marginTop: -20}}>Nintendo</Text>
                            <Text style={{fontSize: 12, color: "#959595", position: 'absolute', left: 0}}>51,087 searches</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', position: 'absolute', right: 0}}>
                            <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{color: "#00529b", fontSize: 15, paddingLeft: 15}}>Search</Text>
                            </Button>
                            <Text style={{marginRight: 10}}>or</Text>
                            <Button style={{backgroundColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{fontSize: 15, paddingLeft: 25}}>Post</Text>
                            </Button>
                          </View>
                        </ListItem>

                        <ListItem style={{flex: 1, flexDirection: 'row', height: 80, right: 10}}>
                          <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
                            <Text style={{fontWeight: 'bold', position: 'absolute', left: 0, marginTop: -20}}>Coach</Text>
                            <Text style={{fontSize: 12, color: "#959595", position: 'absolute', left: 0}}>47,922 searches</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', position: 'absolute', right: 0}}>
                            <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{color: "#00529b", fontSize: 15, paddingLeft: 15}}>Search</Text>
                            </Button>
                            <Text style={{marginRight: 10}}>or</Text>
                            <Button style={{backgroundColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{fontSize: 15, paddingLeft: 25}}>Post</Text>
                            </Button>
                          </View>
                        </ListItem>

                        <ListItem style={{flex: 1, flexDirection: 'row', height: 80, right: 10}}>
                          <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
                            <Text style={{fontWeight: 'bold', position: 'absolute', left: 0, marginTop: -20}}>Jordan</Text>
                            <Text style={{fontSize: 12, color: "#959595", position: 'absolute', left: 0}}>42,763 searches</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', position: 'absolute', right: 0}}>
                            <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{color: "#00529b", fontSize: 15, paddingLeft: 15}}>Search</Text>
                            </Button>
                            <Text style={{marginRight: 10}}>or</Text>
                            <Button style={{backgroundColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{fontSize: 15, paddingLeft: 25}}>Post</Text>
                            </Button>
                          </View>
                        </ListItem>

                        <ListItem style={{flex: 1, flexDirection: 'row', height: 80, right: 10}}>
                          <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
                            <Text style={{fontWeight: 'bold', position: 'absolute', left: 0, marginTop: -20}}>Nike</Text>
                            <Text style={{fontSize: 12, color: "#959595", position: 'absolute', left: 0}}>40,862 searches</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', position: 'absolute', right: 0}}>
                            <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{color: "#00529b", fontSize: 15, paddingLeft: 15}}>Search</Text>
                            </Button>
                            <Text style={{marginRight: 10}}>or</Text>
                            <Button style={{backgroundColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{fontSize: 15, paddingLeft: 25}}>Post</Text>
                            </Button>
                          </View>
                        </ListItem>

                        <ListItem style={{flex: 1, flexDirection: 'row', height: 80, right: 10}}>
                          <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
                            <Text style={{fontWeight: 'bold', position: 'absolute', left: 0, marginTop: -20}}>Samsung</Text>
                            <Text style={{fontSize: 12, color: "#959595", position: 'absolute', left: 0}}>38,972 searches</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', position: 'absolute', right: 0}}>
                            <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{color: "#00529b", fontSize: 15, paddingLeft: 15}}>Search</Text>
                            </Button>
                            <Text style={{marginRight: 10}}>or</Text>
                            <Button style={{backgroundColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{fontSize: 15, paddingLeft: 25}}>Post</Text>
                            </Button>
                          </View>
                        </ListItem>

                        <ListItem style={{flex: 1, flexDirection: 'row', height: 80, right: 10}}>
                          <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
                            <Text style={{fontWeight: 'bold', position: 'absolute', left: 0, marginTop: -20}}>Adidas</Text>
                            <Text style={{fontSize: 12, color: "#959595", position: 'absolute', left: 0}}>36,722 searches</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', position: 'absolute', right: 0}}>
                            <Button style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{color: "#00529b", fontSize: 15, paddingLeft: 15}}>Search</Text>
                            </Button>
                            <Text style={{marginRight: 10}}>or</Text>
                            <Button style={{backgroundColor: '#00529b', borderRadius: 10, marginRight: 10, width: 80, height: 35}}>
                              <Text style={{fontSize: 15, paddingLeft: 25}}>Post</Text>
                            </Button>
                          </View>
                        </ListItem>
                      </List>
                    </View>
                  </Content>
                </Tab>
              </Tabs>
            </View>


          </Modal>

          <View style={{
            flex: 1, 
            flexDirection: 'row',
            justifyContent: 'center', 
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: '#EDEDED', 
            borderRadius: 10, 
            alignSelf: 'center',
            width: 300,
            zIndex: 10
          }}>
            <MaterialIcon name="search" size={25} color="#00529b" style={{paddingLeft: 50}}/>
            <TextInput
              style={{
                height: 40, 
                // borderColor: 'black', 
                // borderWidth: 1, 
                // backgroundColor: '#EDEDED', 
                // borderRadius: 10, 
                color: "#00529b", 
                fontWeight: 'bold',
                width: 300, 
              }}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              paddingLeft={10}
              textAlignVertical='top'
              // value="Placeholder"
              maxLength={40}
              onFocus={() => {
                this.setModalVisible(true);
              }}
            />
          </View>

          <View
            style={{
              marginTop: 10,
              borderBottomColor: '#EDEBEB',
              borderBottomWidth: 1,
              width: '98%',
              marginLeft: 5
            }}
          />

          <Spacer size={15} />

          
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}>
              <View 
                style={{ width: 50, 
                    height: 50, 
                    backgroundColor:'#959595',
                    borderRadius: 50 }}
              />
              <Text style={{fontSize: 13, marginTop: 5}}>Trending</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}>
              <View 
                style={{ width: 50, 
                    height: 50, 
                    backgroundColor:'#959595',
                    borderRadius: 50 }}
              />
              <Text numberOfLines={2} style={{fontSize: 13, marginTop: 5, width: 50, textAlign: 'center'}}>Men Wear</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}>
              <View 
                style={{ width: 50, 
                    height: 50, 
                    backgroundColor:'#959595',
                    borderRadius: 50 }}
              />
              <Text numberOfLines={2} style={{fontSize: 13, marginTop: 5, width: 50, textAlign: 'center'}}>Women Wear</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}>
              <View 
                style={{ width: 50, 
                    height: 50, 
                    backgroundColor:'#959595',
                    borderRadius: 50 }}
              />
              <Text style={{fontSize: 13, marginTop: 5}}>Electronics</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}>
              <View 
                style={{ width: 50, 
                    height: 50, 
                    backgroundColor:'#959595',
                    borderRadius: 50 }}
              />
              <Text style={{fontSize: 13, marginTop: 5, textAlign: 'center'}}>Home</Text>
            </View>
          </View>
          
          <Spacer size={7} />

          <View
            style={{
              marginTop: 10,
              borderBottomColor: '#EDEBEB',
              borderBottomWidth: 1,
              width: '98%',
              marginLeft: 5
            }}
          />      

          <Spacer size={15} />
          <View>
            <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
              <Text style={{fontWeight: 'bold'}}>
                ACTIVITIES in the last 10 minutes
              </Text>
              <Text style={{color: "#00529b", position: 'absolute', right: 10}}>More</Text>
            </View>
          </View>
          <Spacer size={10} />
          
        </Content>
      </Container>
    );
  }
}

export default MainPage;
