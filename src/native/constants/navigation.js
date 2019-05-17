import Colors from '../../../native-base-theme/variables/commonColor';

export default {
  navbarProps: {
    navigationBarStyle: { backgroundColor: 'white' },
    titleStyle: {
      color: Colors.textColor,
      alignSelf: 'center',
      letterSpacing: 2,
      fontSize: Colors.fontSizeBase,
    },
    backButtonTintColor: Colors.textColor,
  },

  tabProps: {
    swipeEnabled: false,
    // activeBackgroundColor: 'rgba(255,255,255,0.1)',
    activeBackgroundColor: 'white',
    inactiveBackgroundColor: 'white',
    tabBarStyle: { backgroundColor: 'white', borderTopWidth: 1, borderTopColor: 'rgba(0, 0, 0, 0.87)' }
    // inactiveBackgroundColor: Colors.brandPrimary,
    // tabBarStyle: { backgroundColor: Colors.brandPrimary },
  },

  icons: {
    style: { color: 'black', height: 30, width: 30 },
  },
};
