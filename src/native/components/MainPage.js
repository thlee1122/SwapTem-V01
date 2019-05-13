import React                                                        from 'react';
import get                                                          from 'lodash.get';
import { connect }                                                  from 'react-redux';
import { TextInput, View, Image, Modal, Alert, Dimensions,
         TouchableHighlight, TouchableOpacity, ScrollView }         from 'react-native';
import { Container, Content, Text, Button, Card, CardItem, Drawer }         from 'native-base';
import { LinearGradient, Font }                                           from 'expo';
import Spacer                                                       from './Spacer';
import MaterialIcon                                                 from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon                                        from 'react-native-vector-icons/MaterialCommunityIcons';

import Ionicons                                                     from 'react-native-vector-icons/Ionicons';

import { Actions }                                                  from 'react-native-router-flux';
// import Autocomplete                                                 from 'react-native-autocomplete-input';
// import MentionsTextInput                                            from 'react-native-mentions';
import { postItem, getMetadata, 
         getItem, detectImage }                                     from '../../actions/registerItemActions';
import { getUserInfo }                                              from '../../actions/userInfoActions';
import LikeComponent                                                from './LikeComponent';
import Login                                                        from './Login';
import { searchTrendingKeywords, categories }                       from '../data/sampleTrendingKeywords';


import SingleCard         from './SingleCard';

import { LoginManager } from 'react-native-fbsdk';


import SideBarMenu from './SideBarMenu';


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: 'Search keywords',
      modalVisible: false,
      loggedIn: false,
      searchStart: false,

      selectedCategoryIndx: 0
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

  openDrawer = () => {
    this.drawer._root.open()
  }

  closeDrawer = () => {
    this.drawer._root.close();
  }

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
    const tags = ["textbook", "electronics", "data"];

    const drawerStyles = {
      drawer: {},
    };

    console.log("22222222 this.props", this.props);

    return (
      <React.Fragment>
        {
          this.state.loggedIn === true ?
          <Login handleLogin = {this.handleLogin} />
          :
          <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<SideBarMenu closeDrawer={this.closeDrawer}/>}
            // content={<View style={{backgroundColor: 'black', zIndex: 10}}>Sample Page</View>}
            side="left"
            // openDrawerOffset={0.5}
            openDrawerOffset={0}
            // type="overlay"
            // panCloseMask={0}
            // closedDrawerOffset={-3}
            // styles={drawerStyles}
            // tapToClose={true}
            elevation={1}
          >
          <Container style={{backgroundColor: 'white'}}>
            <Content style={{backgroundColor: '#ECEBEB'}}>

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
              {/* <View style={{
                flex: 1, 
                flexDirection: 'row',
              }}>
                <TouchableOpacity 
                  style={{position: 'absolute', left: 0, marginLeft: 5, zIndex:10}}
                  onPress={()=> this.openDrawer()}
                >
                  <MaterialIcon size={24} name="menu" />
                </TouchableOpacity>
                <Text 
                  style={{
                    fontWeight: '500', 
                    textAlign: 'center', 
                    fontSize: 20, 
                    lineHeight: 24,
                    flex: 1
                  }}
                >
                  SwapTem
                </Text>
                
                <View style={{flexDirection: 'row', position: 'absolute', right: 0, marginRight: 5}}>
                  <Ionicons size={24} name="ios-options" style={{marginRight: 24}}/>

                  <Ionicons size={24} name="ios-search" />

                </View>
              </View> */}

              {/* Search Bar END */}

              {/* Main Page Category Section START */}
              <View style={{backgroundColor: 'white'}}>
              <View
                style={{
                  borderBottomColor: '#EDEBEB',
                  borderBottomWidth: 1,
                  width: '98%',
                  marginLeft: 5
                }}
              />

              <Spacer size={25} />

              {/* Category Section START */}
              <ScrollView 
                style={{
                  flex: 1, 
                  flexDirection: 'row', 
                  marginLeft: 16, 
                  marginRight: 16, 
                  height: 32, 
                  paddingTop: 4, 
                  backgroundColor: 'white'
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {
                  categories.map((category, index) => {
                    return (
                      <TouchableOpacity key={category.categoryId}>
                        <Text 
                          style={{
                            fontSize: 16,
                            fontWeight: '500', 
                            textAlign: 'center', 
                            lineHeight: 24,
                            marginRight: 28,
                            color: index === this.state.selectedCategoryIndx ? 'black' : '#A3A3A2'
                          }}
                        >
                          {category.categoryName}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                }
              </ScrollView>
              {/* Category Section END */}

              <Spacer size={25} />
              </View>

              {/* Main Page Category Section END */}

              {/* Main Page Trending Body START */}
                    
              

              <View style={{marginTop: 5}}>
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
                        const locationCoordinates = item.User.location.coordinates;
                        
                        for(let i = 0; i < hashTags.length; i++) {
                          let text = `#${hashTags[i].text}`;
                          itemHashTags.push(text);
                        }
 
                        return (
                          <SingleCard
                            itemIndex={index}
                            key={item.id}
                            item={item}
                            currentUserId={this.currentUserId}
                            locationCoordinates={locationCoordinates}
                            itemDistance={itemDistance}
                            itemHashTags={itemHashTags}
                            itemPrice={itemPrice}
                            thumbnailUrl={thumbnailUrl}
                          />
                        );
                      })
                    }
                  </View>
                </View>
              </View>
              {/* Main Page Trending Body END */}
            </Content>
          </Container>
          </Drawer>
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
