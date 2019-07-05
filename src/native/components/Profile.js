import React                                            from 'react';
import get                                              from 'lodash.get';
import { connect }                                      from 'react-redux';
import { View, Image, TouchableOpacity, Dimensions, 
         SafeAreaView, StatusBar }    from 'react-native';
import { Container, Content, List, ListItem, Body, 
         Left, Right, Text, Button, Tabs, Tab, 
         TabHeading, Card, CardItem, ScrollableTab }    from 'native-base';
import { Actions }                                      from 'react-native-router-flux';
import FeatherIcon                                      from 'react-native-vector-icons/Feather';
import Ionicons                                         from 'react-native-vector-icons/Ionicons';
import { getUserInfo, getUserProfileInfo}               from '../../actions/userInfoActions';
import { getItem }                                      from '../../actions/registerItemActions';
import StarRating                                       from 'react-native-star-rating';
import { ProgressBar }                                  from 'react-native-paper';
import styles                                           from '../styles/ProfileStyles';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    following: false,
    reportFlagColor: "white"
  }

  componentWillMount() {
    this.props.getItem();
    this.props.getUserProfileInfo("banner");
    this.props.getUserProfileInfo("badge");
    this.props.getUserProfileInfo("item");
  }

  handleFollowButton = () => {
    if(this.state.following === false) {
      this.setState({
        following: true
      });

    } else {
      this.setState({
        following: false 
      });
    }
  }

  handleReportButton = () => {
    if(this.state.reportFlagColor === "white") {
      this.setState({
        reportFlagColor: "#1D60FD"
      });
      Actions.reportItem();

    } else {
      this.setState({
        reportFlagColor: "white"
      });
    }
  }

  render() {
    const { userInfo, bannerInfo, badgeInfo, itemInfo } = this.props.userInfo;
    const name = get(bannerInfo, "name", "");
    const itemCount = get(bannerInfo, "item_count", 0);
    const rating = get(bannerInfo, "rating", 0);
    const reviewCount = get(bannerInfo, "review_count", 0);
    const tradeCount = get(bannerInfo, "tradeCount", 0);
    const { registerItem } = this.props;
    const getItem = get(registerItem, "getItem", {});
    const data = get(getItem, "data", []);
    const { height, width } = Dimensions.get('window');

    console.log("@#@#@# badgeInfo", badgeInfo);

    return (
      <React.Fragment>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          style={{ color: 'white', zIndex: 10 }}
        />

        <Content style={{backgroundColor: 'white'}}>  
          <View style={{ flex: 1, backgroundColor: '#000000', height: 448 }}>
            <View style={styles.profileHeadShot} />
          
            <View style={styles.profileHeaderContent}>
              <Text style={styles.profileName}>
                {name}
              </Text>

              <View style={styles.profileRating}>
                <Text style={styles.profileRatingNum}>
                  {rating === null ? 0 : rating}
                </Text>

                <StarRating
                  disabled={true}
                  maxStars={1}
                  rating={1}
                  fullStarColor="#A3A3A2"
                  starSize={20}
                  containerStyle={{width: 120}}
                />
              </View>
            </View>

            <View style={styles.profileStatSection}>
              <Text style={styles.profileStateOne}>
                {`${itemCount} ${"\n"}Products`}
              </Text>

              <Text style={styles.profileStateOne}>
                {`${tradeCount} ${"\n"}Trades`}
              </Text>

              <View style={styles.profileReviewSection}>
                <Ionicons name="ios-arrow-forward" color="#ECEBEB" size={22} style={{marginTop: 25, marginRight: 10}}/>

                <Text style={styles.profileStateTwo}>
                  {`${reviewCount} ${"\n"}Reviews`}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.contentMainBackground}>
            <View style={styles.verificationSection}>
              <Text style={styles.verificationTitle}>
                Badges
              </Text>

              <View style={{flexDirection: 'row', marginLeft: 16, marginRight: 16, marginBottom: 20, display: 'flex'}}>
                {
                  badgeInfo.map((item, index) => {
                    return (
                    <React.Fragment key={item.id}>
                      { 
                        (item.name).includes("dummy") === false ?
                          <TouchableOpacity 
                            key={item.id}
                            style={{flexDirection: 'column', flex: 1}}
                          >
                            {
                              item.name === "phone" ?
                              <View 
                                style={{
                                  backgroundColor: item.owned === true ? 'black' : '#ECEBEB', 
                                  width: 64, 
                                  height: 64, 
                                  borderRadius: 50, 
                                  alignSelf: 'center'
                                }}
                              >
                                <FeatherIcon 
                                  name="phone" 
                                  size={25} 
                                  color= "white"
                                  style={{alignSelf: 'center', marginTop: 18}}
                                />
                              </View>

                              : item.name === "email" ?
                              <View 
                                style={{
                                  backgroundColor: item.owned === true ? 'black' : '#ECEBEB',
                                  width: 64, 
                                  height: 64, 
                                  borderRadius: 50, 
                                  alignSelf: 'center'
                                }}>
                                <FeatherIcon 
                                  name="mail" 
                                  size={25} 
                                  color="white"
                                  style={{
                                    alignSelf: 'center', 
                                    marginTop: 18
                                  }}
                                />
                              </View>

                              : item.name === "facebook" ?
                              <View 
                                style={{
                                  backgroundColor: item.owned === true ? 'black' : '#ECEBEB', 
                                  width: 64, 
                                  height: 64, 
                                  borderRadius: 50, 
                                  alignSelf: 'center'
                                }}
                              >
                                <FeatherIcon 
                                  name="facebook" 
                                  size={25} 
                                  color="white"
                                  style={{alignSelf: 'center', marginTop: 18}}
                                />
                              </View>
                              : null
                            }
                            
                            <Text style={{fontSize: 14, lineHeight: 20, textAlign: 'center', flex: 1, marginTop: 16}}>
                            {
                              item.owned === true ?
                                (item.name).substring(0,1).toUpperCase() + (item.name).substring(1)
                              : `${item.name} needs verification`
                            }
                            </Text>
                          </TouchableOpacity>
                        : null
                      }
                    </React.Fragment>
                    );
                  })
                }
              </View>
            </View>
          </View>
          
          <View style={styles.contentMainBackground}>
            {/* Profile page product feed START */}
            <View style={styles.itemFeedSection}>
              <View style={styles.itemRow}>
                {
                  itemInfo.map((item, index) => {
                    const hashTags = item.HashTags;
                    let itemHashTags = [];
                    const thumbnailUrl = `https://s3.us-east-2.amazonaws.com/swaptem/${item.ItemFiles[0].thumbPath}`;
                    const itemPrice = (Number(item.price).toFixed(2) / 100);
                    // let itemDistance = (Number(item.distance) / 1609.344).toFixed(2);                  
                    // const locationCoordinates = item.User.location.coordinates;

                    for(let i = 0; i < hashTags.length; i++) {
                      let text = `#${hashTags[i].text}`;
                      itemHashTags.push(text);
                    }

                    return (
                      <TouchableOpacity
                        style={{
                          marginBottom: 10, 
                          width: "44%",
                          marginLeft: index === 0 || index % 2 === 0 ? 16 : 0,
                          marginRight: index === 0 || index % 2 === 0 ? 16 : 0
                        }} 
                        key={item.id}
                        // onPress={ () => { Actions.singleProduct({ singleProduct: item, locationCoordinates: locationCoordinates }) }}
                      >
                        <View style={styles.itemCardTopSection}>
                          <Image 
                            source={{uri: thumbnailUrl}}
                            style={styles.itemImage}
                          />

                          <View style={styles.itemPillSection}>
                            {
                              item.sell === true ?
                              <View style={styles.sellPill}>
                                <Text style={styles.sellPillText}>
                                  Sell
                                </Text>
                              </View>
                              : null
                            }

                            {
                              item.swap === true ?
                              <View style={styles.swapPill}>
                                <Text style={styles.swapPillText}>
                                  Swap
                                </Text>
                              </View>
                              : null
                            }
                          </View>

                          <Text style={styles.itemHashTag}>
                            {itemHashTags.join(" ")}
                          </Text>

                          <Text style={styles.itemPrice}>
                            {`$${itemPrice}`}
                          </Text>
                        </View>

                      </TouchableOpacity>
                    );
                  })
                }
              </View>
            </View>
            {/* Profile page product feed END */}                  
          </View>
        </Content>
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
  getUserProfileInfo: getUserProfileInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

