import React                                                        from 'react';
import get                                                          from 'lodash.get';
import { connect }                                                  from 'react-redux';
import { TextInput, View, Image, Modal, Alert, Dimensions,
         TouchableHighlight, TouchableOpacity, ScrollView }         from 'react-native';
import { Container, Content, Text, Button, Card, CardItem }         from 'native-base';
import { LinearGradient }                                           from 'expo';
import Spacer                                                       from './Spacer';
import MaterialIcon                                                 from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon                                        from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions }                                                  from 'react-native-router-flux';
// import Autocomplete                                                 from 'react-native-autocomplete-input';
// import MentionsTextInput                                            from 'react-native-mentions';
import { postItem, getMetadata, 
         getItem, detectImage }                                     from '../../actions/registerItemActions';
import { getUserInfo }                                              from '../../actions/userInfoActions';
import LikeComponent                                                from './LikeComponent';
import Login                                                        from './Login';
import { searchTrendingKeywords, categories }                       from '../data/sampleTrendingKeywords';

import { LoginManager } from 'react-native-fbsdk';


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: 'Search keywords',
      modalVisible: false,
      loggedIn: false,
      searchStart: false
    };

    this.currentUserId = "";
  }

  componentDidMount() {
    this.props.getItem();
    this.props.getUserInfo();
    this.props.getMetadata();
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

  handleSearchTextChange = (text) => {
    this.setState({
      text: text
    });
  }

  // handleLogin = (loginStatus) => { 
  // }

  // async loginFacebook() {
  //   try {
  //     let result = await LoginManager.logInWithReadPermissions(['public_profile']);
  //     if(result.isCancelled) {
  //       alert('Login was cancelled');
  //     } else {
  //       alert('Login was successful with permissions: ' 
  //         + result.grantedPermissions.toString());
  //     }
  //   } catch(error) {
  //     alert('Login failed with error' + error);
  //   }
  // }

  render() {
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    const registerItem = get(this.props, "registerItem", {});
    const getItem = get(registerItem, 'getItem', {});
    const data = get(getItem, 'data', []);
    const userInfo = get(this.props.userInfo, "userInfo", {});
    this.currentUserId = this.props.userInfo.userInfo.id;
    const { height, width } = Dimensions.get('window');
    const metadata = get(registerItem, "metadata", {});
    const metaDatatags = get(metadata, "tags", []);
    // const tags = get(metadata, "tags", []);

    // console.log("~~~~~~", this.props);
    // console.log("@@@@@ userInfo", userInfo);
    const tags = ["textbook", "electronics", "data"];

    return (
      <React.Fragment>
        {
          this.state.loggedIn === true ?
          <Login handleLogin = {this.handleLogin} />
          :
          <Container style={{backgroundColor: 'white'}}>
            <Content padder style={{backgroundColor: 'white'}}>

              {/* Trending This Week Modal START */}
              {/* <Modal
                animationType="slide"
                animationIn={'slideInLeft'}
                animationOut={'slideOutRight'}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => { this.setModalVisible(false) }}
              >
                <View style={{backgroundColor: 'white', marginTop: 140, }}>
                  <View style={{height: 50, flexDirection: 'row', marginLeft: 20, marginTop: 15}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 5}}>Trending this week</Text>
                    <TouchableHighlight
                      onPress={() => { this.setModalVisible(!this.state.modalVisible); }}
                      style={{position: 'absolute', marginTop: 10, right: 20}}
                    >
                      <MaterialIcon name="close" size={25}/>
                    </TouchableHighlight>
                  </View>

                  <ScrollView style={{ borderWidth: 1, height: 610}}>
                    {
                      searchTrendingKeywords.map((item, index) => {
                        const keyWord = item.keyWord;
                        const numberOfPosts = item.numberOfPosts;
                        
                        return (
                          <TouchableOpacity key={index} style={{borderWidth: 1, borderColor: '#959595'}}>
                            <View style={{flexDirection: 'row', paddingLeft: 15, paddingRight: 15, paddingTop: 20, paddingBottom: 20}}>
                              <Text style={{fontSize: 20, fontWeight: "700", color: "#00529b"}}>{keyWord}</Text>
                              <Text style={{paddingTop: 5, position: 'absolute', right: 15, marginTop: 20, color: '#959595'}}>
                                {`${numberOfPosts.toLocaleString('en')} posts`}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })
                    }
                  </ScrollView>
                </View>
              </Modal> */}
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
                    color: "#00529b", 
                    fontWeight: 'bold',
                    width: 300, 
                  }}
                  onChangeText={(text) => this.handleSearchTextChange({text})}
                  value={this.state.text}
                  paddingLeft={10}
                  textAlignVertical='top'
                  maxLength={40}
                  onFocus={() => {
                    Actions.searchResult({
                      metaDatatags: metaDatatags
                    });
                  }}
                />
              </View>

              {/* <View>
                <Button
                  onPress={this.loginFacebook}
                >
                  <Text>Login with Facebook</Text>
                </Button>
              </View> */}





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
              
              <ScrollView 
                style={{flex: 1, flexDirection: 'row', marginLeft: 5}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {
                  categories.map((category) => {
                    return (
                      <TouchableOpacity key={category.categoryId}>
                        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', marginRight: 20}}>
                          <View 
                            style={{ width: 50, 
                                height: 50, 
                                backgroundColor:'#959595',
                                borderRadius: 50 }}
                          />
                          <Text style={{fontSize: 15, marginTop: 5, fontWeight: '500', textAlign: 'center'}}>
                            {category.categoryName}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                }
              </ScrollView>
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
                <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>                  
                  <View 
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignItems: 'flex-start'
                    }}
                  >
                    {
                      data.map((item, index) => {
                        const hashTags = item.HashTags;
                        const thumbnailUrl = `https://s3.us-east-2.amazonaws.com/swaptem/${item.ItemFiles[0].thumbPath}`;
                        let itemPrice = Number(item.price).toFixed(2);
                        let itemHashTags = [];
                        let itemDistance = (Number(item.distance) / 1609.344).toFixed(2);
                        let cartUserIdArray = [];

                        const locationCoordinates = item.User.location.coordinates;
                        
                        for(let i = 0; i < hashTags.length; i++) {
                          let text = `#${hashTags[i].text}`;
                          itemHashTags.push(text);
                        }
 
                        return (
                          <TouchableOpacity 
                            key={item.id}
                            onPress={ () => { Actions.singleProduct({ 
                              singleProduct: item, 
                              locationCoordinates: locationCoordinates,
                              userInfo: userInfo
                            }) }}
                            style={{width: '47%', marginRight: 10}}
                          >
                          <View 
                            style={{width: '100%', marginBottom: 5, marginRight: 5, backgroundColor: 'rgb(250,250,250)'}}
                          >
                            <Image 
                              source={{uri: thumbnailUrl}}
                              style={{width: '100%', height: 180, borderRadius: 5}}
                            />

                            <LikeComponent 
                              itemId={item.id}
                              itemCartUser={item.CartUser}
                              currentUserId={this.currentUserId}
                            />

                            <View>
                              <View style={{
                                backgroundColor: 'black', 
                                opacity: 0.7, 
                                position: 'absolute', 
                                marginTop: -30, 
                                width: '100%', 
                                height:30,
                                flexDirection: 'row'
                              }}>
                                <MaterialIcon name="location-on" size={18} color="white" style={{padding: 6}}/>
                                <Text style={{color: 'white', paddingTop: 7, fontSize: 13, fontWeight: '500'}}>
                                  {`${itemDistance} mi.`}
                                </Text>
                              </View>
                            </View>
                            
                            <View style={{flexDirection: 'row', padding: 5}}>
                              {
                                item.sell === true ?
                                <View style={{
                                  borderRadius: 5,
                                  borderWidth: 1,
                                  borderColor: '#007aff',
                                  width: 42, 
                                  alignItems: 'center', 
                                  marginRight: 5,
                                  height: 20
                                }}>
                                  <Text style={{color: '#007aff', alignSelf: 'center', fontSize: 13, paddingTop:1}}>
                                    Sell
                                  </Text>
                                </View>
                                : null
                              }

                              {
                                item.swap === true ?
                                <View style={{
                                  borderRadius: 5,
                                  borderWidth: 1,
                                  borderColor: '#007aff',
                                  width: 45, 
                                  alignItems: 'center',
                                  height: 20
                                }}>
                                  <Text style={{color: '#007aff', alignSelf: 'center', fontSize: 13, paddingTop:1}}>
                                    Swap
                                  </Text>
                                </View>
                                : null
                              }
                            </View>

                            <Text style={{fontWeight: '500', marginLeft: 5, marginBottom: 5, width: 160}}>
                              {itemHashTags.join(" ")}
                            </Text>

                            <View style={{flexDirection: 'row'}}>
                              <Text style={{fontSize: 14, marginLeft: 5, marginBottom: 5, color: 'rgb(30,30,30)'}}>
                                {`$${itemPrice}`}
                              </Text>

                              <View style={{flexDirection: 'row', marginLeft: 10}}>
                                <MaterialCommunityIcon name="coin" size={20} color="#FBDB0A" style={{marginTop: -1}}/>
                                <Text style={{fontSize: 14, marginLeft: 2, marginBottom: 5, color: 'rgb(30,30,30)'}}>
                                  100.00
                                </Text>
                              </View>
                            </View>
                          </View>
                          </TouchableOpacity>
                        );
                      })
                    }
                  </View>
                </View>
              </View>
              {/* Main Page Trending Body END */}
            </Content>
          </Container>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  registerItem: state.registerItem || {},
  userInfo: state.userInfo || {}
});

const mapDispatchToProps = {
  getItem: getItem,
  getUserInfo: getUserInfo,
  getMetadata: getMetadata
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
