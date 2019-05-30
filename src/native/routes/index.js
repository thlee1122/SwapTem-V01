import React, { Component }  from 'react';
import { View, Image, TouchableOpacity, Dimensions, 
         SafeAreaView, Text, Platform }                   from 'react-native';




// import MaterialIcon                                                 from 'react-native-vector-icons/MaterialIcons';

import Ionicons                                                     from 'react-native-vector-icons/Ionicons';


import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon, Drawer } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import RecipesContainer from '../../containers/Recipes';
import RecipesComponent from '../components/Recipes';
import RecipeViewComponent from '../components/Recipe';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import LocaleContainer from '../../containers/Locale';
import LocaleComponent from '../components/Locale';

import MyAccountComponent from '../components/MyAccount';

import AccountSettingsComponent from '../components/AccountSettings';


import ReportPageComponent from '../components/ReportPage';

import RegisterItemComponent from '../components/RegisterItemComponent';
import NewRegisterItemComponent from '../components/newRegisterItemComponent';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/Profile';

import MainPage from '../components/MainPage';

import SingleProductComponent from '../components/SingleProduct';

import InboxComponent from '../components/Inbox';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FeatherIcon  from 'react-native-vector-icons/Feather';

import SearchResultPageComponent from '../components/SearchResultPage';

import OfferComponent from '../components/OfferComponent';

import AcceptedSwapProductPage from '../components/AcceptedSwapProductPage';
import ScheduleMeetupPage from '../components/ScheduleMeetupPage';

import ChatRoomComponent from '../components/ChatRoom';
import ReviewPage         from '../components/ReviewPage';

import MyReview         from '../components/MyReview';
import LikedItems       from '../components/LikedItems';

import UserProfile      from '../components/UserProfile';

import MySwapItems      from '../components/MySwapItems';
import MyItemList       from '../components/MyItemList';

import OfferSubmissionPage from '../components/OfferSubmissionPage';
import RegisterItemSubmissionPage from '../components/RegisterItemComponent/RegisterItemSubmissionPage';
import shareMyMeetingPage from '../components/ChatRoomScreens/ShareMyMeetingPage';
import ContactsPage from '../components/ChatRoomScreens/ContactsPage';
import ShareMeetingReminder from '../components/ChatRoomScreens/ShareMeetingReminder';
import TrustedContactConfirmPage from '../components/ChatRoomScreens/TrustedContactConfirmPage';

import PaymentPage from '../components/paymentPage';

import StoreEditPage from '../components/StoreEditPage';

import StandoutSelectionPage from '../components/StandoutSelectionPage';

// import NavBar from '../components/NavBar';
import SideBarMenu from '../components/SideBarMenu';

import FilterPage from '../components/FilterPage';


import InterestSelectionPage from '../components/InterestSelectionPage';

import LoginPageOne from '../components/LoginPageOne';


import { Actions }                                        from 'react-native-router-flux';


class NavBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const { initialRouteName } = this.props;

    console.log("###### route.js", this.props);

    console.log("1111111", Platform.OS);
    console.log("2222222 initialRouteName", initialRouteName);

    return (
      <React.Fragment>
      {
        initialRouteName !== 'profileHome' && this.props.routeName !== "reviewPage" ?
        <SafeAreaView 
          style={{
            backgroundColor: initialRouteName === 'profileHome' ? '#000000' : '#fff'
          }}
        >
          <View 
            style={{
              paddingLeft: 10, 
              paddingRight: 10, 
              paddingTop: Platform.OS === "ios" ? 15 : 35, 
              height: Platform.OS === "ios" ? 60 : 85
            }}
          >
            <View 
              style={{
              flex: 1, 
              flexDirection: 'row',
            }}>


              <TouchableOpacity 
                style={{position: 'absolute', left: 0, marginLeft: 5, zIndex:10}}
                onPress={()=> openDrawer()}
              >
                <MaterialIcon 
                  size={24} 
                  name="menu" 
                  color={initialRouteName === 'profileHome' ? 'white' : 'black'}
                />
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
                {
                  initialRouteName === 'home' ?
                  <TouchableOpacity 
                    style={{marginRight: 24}}
                    onPress={(e) => Actions.filterPage()}
                  >
                    <Ionicons size={24} name="ios-options" />
                  </TouchableOpacity>
                  : null
                }

                <TouchableOpacity
                  onPress={(e) => Actions.searchResult()}
                >
                  <Ionicons 
                    size={24} 
                    name="ios-search" 
                    color={initialRouteName === 'profileHome' ? 'white' : 'black'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
        : null
      }
      </React.Fragment>
    );
  }
}

function openDrawer() {
    console.log("drawer clicked");

    this.drawer._root.open()

  }

function closeDrawer() {
  this.drawer._root.close();
}

console.log("~~~~ this", this.ref);
// console.log("#####", document.getElementsByClassName("main-nav-drawer"));

const Index = (
  
  <Stack 
    hideNavBar
    // navBar={NavBar}
  >
    <Stack
      key="loginPages"
      hideNavBar
    >
      <Scene key="loginPageOne" component={LoginPageOne} />
    </Stack>

    <Stack
      key="introPages"
    >
      <Scene key="interestPage" title="Select your interests" component={InterestSelectionPage} />


    </Stack>

    
    
    <Scene hideNavBar>
      <Tabs
        // key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={false}
        {...DefaultProps.tabProps}

      >
        <Stack
          hideNavBar

          


          key="home-main"
          title={AppConfig.appName.toUpperCase()}
          // icon={() => <Icon name="planet" {...DefaultProps.icons} />}
          icon={() => <FeatherIcon name="home" size={25} color="black" />}
          // {...DefaultProps.navbarProps}
        >
          <Drawer
            className="main-nav-drawer"
            navBar={NavBar}
            // hideNavBar
            ref={(ref) => { this.drawer = ref; }}
            // content={<SideBarMenu closeDrawer={this.closeDrawer}/>}
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
          <Scene key="home" title="dsdsdsd" component={MainPage} />
          <Scene hideNavBar back title="Item" key="singleProduct" component={SingleProductComponent} />
          <Scene title="Reviews" key="reviewPage" component={ReviewPage} />
          <Scene hideNavBar={true} title="User Profile" key="userProfilePage" component={UserProfile} />
          <Scene title="My Swap Items" key="mySwapItemsPage" component={MySwapItems} />
          <Scene title="My Items" key="myItemListPage" component={MyItemList} />
          <Scene title="Swap Requested" key="offerSubmissionPage" component={OfferSubmissionPage} />
          {/* <Scene key="home" component={RegisterItemComponent} /> */}

          <Scene
            back
            key="searchResult"
            component={SearchResultPageComponent}
          />

          <Scene
            back
            title="Filter Page"
            key="filterPage"
            component={FilterPage}
          />
          </Drawer>
        </Stack>

        {/* <Stack
          key="recipes"
          title="RECIPES"
          icon={() => <Icon name="book" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="recipes" component={RecipesContainer} Layout={RecipesComponent} />
        </Stack> */}

        {/* <Stack
          key="checkout"
          title="Checkout"
          icon={() => <MaterialCommunityIcons name="cards" size={25} color="white"/>}
          {...DefaultProps.navbarProps}
        >
          <Scene key="payment" component={PaymentPage} />
        </Stack> */}




        <Stack
          navBar={NavBar}
          key="offer"
          title="OFFER"
          // icon={() => <Icon name="book" {...DefaultProps.icons} />}
          icon={() => <MaterialCommunityIcons name="cards-outline" size={30} color="black" style={{marginTop:3}}/>}
          // {...DefaultProps.navbarProps}
        >
          <Scene key="inbox" component={LocaleContainer} Layout={OfferComponent} />

          <Scene key="acceptedSwapProductPage" component={AcceptedSwapProductPage} />
          <Scene title="SCHEDULE A MEETING" key="scheduleMeetupPage" component={ScheduleMeetupPage} />
        </Stack>





        {/* <Stack
          key="registerItem"
          title="REGISTER ITEM"
          // icon={() => <Icon name="book" {...DefaultProps.icons} />}
          onPress={() => { alert("sdsdsds")}}
          icon={() => <FontAwesomeIcon name="camera" size={23} color="white"/>}
          {...DefaultProps.navbarProps}
        >

          <!-- Comment out START -->
          <Scene key="registerItemSubmission" component={RegisterItemSubmissionPage} />
          <Scene key="registerItem" component={LocaleContainer} Layout={RegisterItemComponent} />
          <!-- Comment out END -->

          <Scene key="registerItem" component={LocaleContainer} Layout={NewRegisterItemComponent} />
        </Stack> */}

         {/* <Stack
          hideNavBar 
          key="inbox"
          title="INBOX"
          // icon={() => <Icon name="book" {...DefaultProps.icons} />}
          icon={() => <FontAwesomeIcon name="inbox" size={25} color="black"/>}
          {...DefaultProps.navbarProps}
        >
          <Scene key="inbox" component={LocaleContainer} Layout={InboxComponent} />
          <Scene title= "CHAT" key="chatRoom" component={ChatRoomComponent} />
          <Scene
            back
            title=""
            key="shareMyMeetingPage"
            component={shareMyMeetingPage}
          />
          <Scene
            back
            title=""
            key="contactsPage"
            component={ContactsPage}
          />

          <Scene
            back
            title=""
            key="shareMeetingReminder"
            component={ShareMeetingReminder}
          />

          <Scene
            back
            title=""
            key="trustedContactConfirmPage"
            component={TrustedContactConfirmPage}
          />
          <Scene title="SCHEDULE A MEETING" key="scheduleMeetupPageTwo" component={ScheduleMeetupPage} />
        </Stack> */}    

        <Stack
          // hideNavBar
          navBar={NavBar}
          key="profile"
          title="PROFILE"
          icon={() => <Icon name="contact" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="profileHome" component={MemberContainer} Layout={ProfileComponent} />

          <Scene key="editStore" title="STORE EDIT" component={StoreEditPage} />

          <Scene key="standOutSelection" title="" component={StandoutSelectionPage} />


          <Scene key="myReviews" title="MY REVIEWS" component={MyReview} />
          <Scene key="likedItems" title="LIKED ITEMS" component={LikedItems} />
          <Scene
            back
            key="signUp"
            title="SIGN UP"
            {...DefaultProps.navbarProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />
          <Scene
            back
            key="login"
            title="LOGIN"
            {...DefaultProps.navbarProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />
          <Scene
            back
            key="forgotPassword"
            title="FORGOT PASSWORD"
            {...DefaultProps.navbarProps}
            component={ForgotPasswordContainer}
            Layout={ForgotPasswordComponent}
          />
          <Scene
            back
            key="locale"
            title="CHANGE LANGUAGE"
            {...DefaultProps.navbarProps}
            component={LocaleContainer}
            Layout={LocaleComponent}
          />


          {/* EDIT START */}
          <Scene
            back
            key="privacy"
            title="HOW WE PROTECT YOUR PRIVACY"
            {...DefaultProps.navbarProps}
            component={LocaleContainer}
            Layout={LocaleComponent}
          />

          <Scene
            back
            key="myaccount"
            title="MY ACCOUNT"
            {...DefaultProps.navbarProps}
            component={LocaleContainer}
            Layout={MyAccountComponent}
          />

          <Scene
            back
            key="accountSettings"
            title="ACCOUNT SETTINGS"
            {...DefaultProps.navbarProps}
            // component={LocaleContainer}
            component={AccountSettingsComponent}
          />



          <Scene
            back
            key="reportItem"
            title="Report Item"
            {...DefaultProps.navbarProps}
            component={LocaleContainer}
            Layout={ReportPageComponent}
          />

          <Scene
            back
            key="singleProduct"
            title="Single Product"
            {...DefaultProps.navbarProps}
            // component={LocaleContainer}
            component={SingleProductComponent}
          />



          {/* EDIT END */}


          <Scene
            back
            key="updateProfile"
            title="UPDATE PROFILE"
            {...DefaultProps.navbarProps}
            component={UpdateProfileContainer}
            Layout={UpdateProfileComponent}
          />
        </Stack>
      </Tabs>
    </Scene>

    {/* <Scene
      back
      clone
      key="recipe"
      title="RECIPE"
      {...DefaultProps.navbarProps}
      component={RecipesContainer}
      Layout={RecipeViewComponent}
    /> */}
  </Stack>
  
);

export default Index;
