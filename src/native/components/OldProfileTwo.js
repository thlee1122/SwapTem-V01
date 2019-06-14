import React                                            from 'react';
import get                                              from 'lodash.get';
import { connect }                                      from 'react-redux';
import { View, Image, TouchableOpacity, Dimensions, SafeAreaView }    from 'react-native';
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
    const { userInfo } = this.props.userInfo;
    
    const { bannerInfo, badgeInfo, itemInfo } = this.props.userInfo;
    // const badgeInfo = get(this.props.userInfo, "badgeInfo", []);

    const MyReviews = get(userInfo, "MyReviews", []);
    // const name = get(userInfo, "name", "");


    const name = get(bannerInfo, "name", "");
    const itemCount = get(bannerInfo, "item_count", 0);
    const rating = get(bannerInfo, "rating", 0);
    const reviewCount = get(bannerInfo, "review_count", 0);
    const tradeCount = get(bannerInfo, "tradeCount", 0);



    const { registerItem } = this.props;
    const getItem = get(registerItem, "getItem", {});
    const data = get(getItem, "data", []);
    const { height, width } = Dimensions.get('window');

    // console.log("11111 profile", height);
    // console.log("profile height", height * 0.5);
    // console.log("@@@ this.props", this.props);
    // console.log("#######", height * 0.15);

    console.log("11111 profile this.props", this.props);

    console.log("33333 profile badgeInfo", badgeInfo);

    console.log("44444 profile data", data);

    return (
      <Content style={{backgroundColor: 'white'}}>
        
        <View style={{ flex: 1, backgroundColor: '#000000', height: 448 }}>
          <View style={styles.profileHeadShot} />
        
          <View style={styles.profileHeaderContent}>
            <Text style={styles.profileName}>
              {name}
              {/* Alexandria Zoltowski */}
            </Text>

            {/* <Text style={styles.profileDesc}>
              Head of UX @Yelp
            </Text> */}

            <View style={styles.profileRating}>
              <Text style={styles.profileRatingNum}>
                {/* {MyReviews.length} */}
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

        {/* <View>
          <Text style={styles.profileContentIntro}>
            Boost your reputation by confirming your information.
          </Text>

          <Text
            style={styles.privacyLink}
            onPress={Actions.privacy}
            // onPress={this._goToURL}
          >
            How we protect your privacy
          </Text>

          <View style={styles.progressSection}>
            <ProgressBar progress={0.65} color='black' style={{width: width*0.8, alignSelf: 'center'}}/>

            <Text style={styles.progressPercent}>
              65% completed
            </Text>
          </View>
        </View> */}

        <View style={styles.contentMainBackground}>
          <View style={styles.verificationSection}>
            <Text style={styles.verificationTitle}>
              Badges
            </Text>

            <View style={{flexDirection: 'row', marginLeft: 16, marginRight: 16, marginBottom: 20, display: 'flex'}}>
              {
                badgeInfo.map((item, index) => {
                  return (
                    <TouchableOpacity 
                      key={item.id}
                      style={{flexDirection: 'column', flex: 1}}
                    >
                      {
                        item.name === "phone" ?
                        <View style={{backgroundColor: 'black', width: 64, height: 64, borderRadius: 50, alignSelf: 'center'}}>
                          <FeatherIcon name="phone" size={25} color="white" style={{alignSelf: 'center', marginTop: 18}}/>
                        </View>
                        : item.name === "email" ?
                        <View style={{backgroundColor: 'black', width: 64, height: 64, borderRadius: 50, alignSelf: 'center'}}>
                          <FeatherIcon name="mail" size={25} color="white" style={{alignSelf: 'center', marginTop: 18}}/>
                        </View>
                        : null
                      }
                      <Text style={{fontSize: 14, lineHeight: 20, textAlign: 'center', flex: 1, marginTop: 16}}>
                        {(item.name).substring(0,1).toUpperCase() + (item.name).substring(1)}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              }
              {/* <TouchableOpacity style={{flexDirection: 'column', flex: 1}}>
                <View style={{backgroundColor: 'black', width: 64, height: 64, borderRadius: 50, alignSelf: 'center'}}>
                  <FeatherIcon name="phone" size={25} color="white" style={{alignSelf: 'center', marginTop: 18}}/>
                </View>

                <Text style={{fontSize: 14, lineHeight: 20, textAlign: 'center', flex: 1, marginTop: 16}}>
                  Phone
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{flexDirection: 'column', flex: 1}}>
                <View style={{backgroundColor: 'black', width: 64, height: 64, borderRadius: 50, alignSelf: 'center'}}>
                  <FeatherIcon name="mail" size={25} color="white" style={{alignSelf: 'center', marginTop: 18}}/>
                </View>

                <Text style={{fontSize: 14, lineHeight: 20, textAlign: 'center', flex: 1, marginTop: 16}}>
                  Email
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{flexDirection: 'column', flex: 1}}>
                <View 
                  style={{
                    backgroundColor: 'white', 
                    width: 64, 
                    height: 64, 
                    borderRadius: 50,
                    borderColor: 'black',
                    borderWidth: 1, 
                    alignSelf: 'center'
                  }}
                >
                  <FeatherIcon name="facebook" size={25} color="black" style={{alignSelf: 'center', marginTop: 18}}/>
                </View>

                <Text style={{fontSize: 14, lineHeight: 20, textAlign: 'center', flex: 1, marginTop: 16}}>
                  Facebook
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
        
        <View style={styles.contentMainBackground}>
          {/* <View style={styles.verificationSection}>
            <Text style={styles.verificationTitle}>
              Verifications
            </Text>

            <ListItem onPress={Actions.forgotPassword} icon style={styles.verificationListItem}>
              <Left>
                <FeatherIcon name="phone" size={22} color="black" />
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text>
                  Phone verified
                </Text>
              </Body>
            </ListItem>

            <ListItem onPress={Actions.forgotPassword} icon style={styles.verificationListItem}>
              <Left>
                <FeatherIcon name="mail" size={22} color="black" />
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text>
                  Email verified
                </Text>
              </Body>
            </ListItem>

            <ListItem onPress={Actions.forgotPassword} icon style={styles.verificationListItem}>
              <Left>
                <FeatherIcon name="facebook" size={22} color="#A3A3A2" />
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text style={{color: '#A3A3A2'}}>
                  Facebook verification needed
                </Text>
              </Body>

              <Right style={{borderBottomWidth: 0}}>
                <FeatherIcon name="arrow-right" color="#A3A3A2" size={24} style={styles.verificationArrow}/>
              </Right>
            </ListItem>
          </View> */}

          {/* <View style={styles.likeShareSection}>
            <ListItem
              onPress={ () => { Actions.likedItems({ userInfo: userInfo }) }} 
              icon 
              style={styles.verificationListItem}>
              <Left>
                <FeatherIcon name="heart" size={22} color="#A3A3A2" />
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text style={{color: "#A3A3A2"}}>
                  View your liked items
                </Text>
              </Body>

              <Right style={{borderBottomWidth: 0}}>
                <FeatherIcon name="arrow-right" color="#A3A3A2" size={24} style={{marginLeft: 10, marginTop: 14}}/>
              </Right>
            </ListItem>

            <ListItem onPress={Actions.forgotPassword} icon style={styles.verificationListItem}>
              <Left>
                <FeatherIcon name="share-2" size={22} color="#A3A3A2" />
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text style={{color: "#A3A3A2"}}>
                  View your shared items
                </Text>
              </Body>

              <Right style={{borderBottomWidth: 0}}>
                <FeatherIcon name="arrow-right" color="#A3A3A2" size={24} style={{marginLeft: 10, marginTop: 14}}/>
              </Right>
            </ListItem>
          </View> */}

          {/* Store Title and Heading Section START */}
          {/* <View style={styles.storeSection}>
            <FeatherIcon 
              name="edit-2" 
              size={24} 
              color="#A3A3A2" 
              style={styles.storeEditIcon} 
              onPress={ () => { Actions.editStore({ userItems: data }) }} 
            />

            <View style={styles.storeContent}>
              <Text style={styles.storeTitle}>
                Welcome to Zoltowski Shop
              </Text>

              <Text style={styles.storeDesc}>
                One-of-a-kind unique items for every kind of Men
              </Text>
            </View>

            <TouchableOpacity style={styles.storeAnalyticsButton}>
              <Text style={styles.storeAnalyticsButtonText}>
                View Analytics
              </Text>
            </TouchableOpacity>
          </View> */}
          {/* Store Title and Heading Section END */}

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
                  
                  // let cartUserIdArray = [];
                  
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
              {/* {
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
                      style={{
                        marginBottom: 10, 
                        width: "44%",
                        marginLeft: index === 0 || index % 2 === 0 ? 16 : 0,
                        marginRight: index === 0 || index % 2 === 0 ? 16 : 0
                      }} 
                      key={item.id}
                      onPress={ () => { Actions.singleProduct({ singleProduct: item, locationCoordinates: locationCoordinates }) }}
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
              } */}
            </View>
          </View>
              
          {/* Profile page product feed END */}                  
        </View>
      </Content>
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
