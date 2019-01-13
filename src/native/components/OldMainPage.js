import React from 'react';
import { TextInput, View, Image, Modal, Alert, TouchableHighlight, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import {
  Container, Content, H1, H2, H3, List, ListItem, Body, Left, Right, Text, Button, Tabs, Tab, TabHeading, Card, CardItem,
} from 'native-base';

import Spacer from './Spacer';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { Actions } from 'react-native-router-flux';

import Autocomplete from 'react-native-autocomplete-input';

import MentionsTextInput from 'react-native-mentions';

import * as hashTagData from '../data/sampleHashTagData.json';

const API = 'https://swapi.co/api';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: 'Useless Placeholder',
      modalVisible: false,



      films: [],
      query: "",
      hashTags: [],

      hashTagValues: "",
      keyword: "",
      data: []
    };

    this.reqTimer = 0;
  }

  componentDidMount() {
    // console.log(hashTagData);

    fetch(`${API}/films/`).then(res => res.json()).then((json) => {
      const { results: films } = json;
      this.setState({ films });
    });

    this.setState({
      hashTags: hashTagData.results,
      data: hashTagData.results
    });
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

  findFilm(query) {
    if(query === "") return [];

    // const { films } = this.state;
    // const regex = new RegExp(`${query.trim()}`, 'i');
    // return films.filter(film => film.title.search(regex) >= 0);

    const { hashTags } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return hashTags.filter(hashTag => hashTag.hashTagValue.search(regex) >= 0);
  }

  getUserSuggestions = (keyword) => {
    const { hashTags } = this.state;
    const regex = new RegExp(`${keyword.trim()}`, 'i');

    return hashTags.filter(hashTag => hashTag.hashTagValue.search(regex) >= 0);
  }


  callback = (keyword) => {
    const { hashTags } = this.state;
    const regex = new RegExp(`${keyword.trim()}`, 'i');
    if (this.reqTimer) {
      clearTimeout(this.reqTimer);
    }

    let newValue = hashTags.filter(hashTag => hashTag.hashTagValue.search(regex) >= 0);

    this.reqTimer = setTimeout(() => {
      this.setState({
        keyword: keyword,
        data: [...newValue]
      })
    }, 200);

    // this.reqTimer = setTimeout(() => {
    //   this.getUserSuggestions(keyword)
    //     .then(data => {
    //         this.setState({
    //           keyword: keyword,
    //           data: [...data]
    //         })
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    // }, 200);

    // this.reqTimer = setTimeout(() => {
    //   getUserSuggestions(keyword)
    //     .then(data => {
    //       this.setState({
    //         keyword: keyword,
    //         data: [...data]
    //       })
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }, 200);
  }

  onSuggestionTap = (hashTagValue, hidePanel) => {
    hidePanel();
    const comment = this.state.hashTagValues.slice(0, - this.state.keyword.length)

    this.setState({
      data: [],
      hashTagValues: comment + hashTagValue
    })
  }

  renderSuggestionsRow({ item }, hidePanel) {
    return (
      <TouchableOpacity 
        key={item} 
        style={{marginTop: 13}}
        onPress={() => this.onSuggestionTap(item.hashTagValue, hidePanel)}
      >
        <View key={item}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{left: 15}}>{item.hashTagValue}</Text>
            <Text style={{position: 'absolute', right: 15}}>{(item.numberOfPosts).toLocaleString('en')} posts</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }


  render() {
    const { query } = this.state;
    // const films = this.findFilm(query);

    const hashTags = this.findFilm(query);

    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    // console.log(this.state);

    const { height, width } = Dimensions.get('window');

    return (
      <Container style={{backgroundColor: 'white'}}>
        <Content padder style={{backgroundColor: 'white'}}>

          {/* Trending This Week Modal START */}
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
          {/* Trending This Week Modal END */}

          {/* Search Bar START */}
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
          {/* Search Bar END */}

          {/* Main Page Category Section START */}
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
          {/* Main Page Category Section END */}

          {/* Main Page Trending Body START */}
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
          {/* Main Page Trending Body END */}

          {/* <View>
            <Autocomplete
              autoCapitalize="none"
              autoCorrect={false}
              // containerStyle={styles.autocompleteContainer}
              // data={films.length === 1 && comp(query, films[0].title) ? [] : films}
              data={hashTags.length === 1 && comp(query, hashTags[0].hashTagValue) ? [] : hashTags}
              defaultValue={query}
              onChangeText={text => this.setState({ query: text })}
              placeholder="Enter Star Wars film title"
              renderItem={({ hashTagValue, numberOfPosts }) => (
                <TouchableOpacity onPress={() => this.setState({ query: hashTagValue })} key={hashTagValue}>
                  <Text>
                    {hashTagValue} ({numberOfPosts})
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View>
            <MentionsTextInput
              textInputStyle={{ borderColor: '#ebebeb', borderWidth: 1, padding: 5, fontSize: 15 }}
              suggestionsPanelStyle={{ backgroundColor: '#FBFBFB', borderWidth: 1, borderColor: "#E3E1E1" }}
              loadingComponent={() => <View style={{ flex: 1, width, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>}
              textInputMinHeight={30}
              textInputMaxHeight={80}
              trigger={'#'}
              triggerLocation={'new-word-only'}
              value={this.state.hashTagValues}
              onChangeText={(val) => { this.setState({ hashTagValues: val }) }}
              triggerCallback={this.callback.bind(this)}
              renderSuggestionsRow={this.renderSuggestionsRow.bind(this)}
              suggestionsData={this.state.data}
              keyExtractor={(item, index) => item.UserName}
              suggestionRowHeight={45}
              horizontal={false}
              MaxVisibleRowCount={3}
            />
          </View> */}
        </Content>
      </Container>
    );
  }
}

export default MainPage;
