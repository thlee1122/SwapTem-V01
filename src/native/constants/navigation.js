import Colors from '../../../native-base-theme/variables/commonColor';

export default {
  navbarProps: {
    navigationBarStyle: { backgroundColor: 'white', height: 72},
    titleStyle: {
      color: Colors.textColor,
      // flex: 1,
      textAlignVertical: "center",
      textAlign: 'center',
      width: '90%',
      alignSelf: 'center',
      letterSpacing: 2,
      // fontSize: Colors.fontSizeBase,
      fontSize: 20,
    },
    // backButtonTintColor: Colors.textColor,
    backButtonTintColor: 'black',
  },

  tabProps: {
    swipeEnabled: false,
    // activeBackgroundColor: 'rgba(255,255,255,0.1)',
    activeBackgroundColor: 'white',
    inactiveBackgroundColor: 'white',
    tabBarStyle: { backgroundColor: 'white', borderTopWidth: 1, borderTopColor: 'rgba(0, 0, 0, 0.87)', flex: 1 }
    // inactiveBackgroundColor: Colors.brandPrimary,
    // tabBarStyle: { backgroundColor: Colors.brandPrimary },
  },

  icons: {
    style: { color: 'black', height: 30, width: 30 },
  },
};
