import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import MainPage from '../components/MainPage';

const width = Dimensions.get("window").width;


const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: MainPage
  }
})


export default createAppContainer(DrawerNavigator);