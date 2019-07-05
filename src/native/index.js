import React from 'react';
import { StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Stack } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { Root, StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import theme from '../../native-base-theme/variables/commonColor';

import Routes from './routes/index';
import Loading from './components/Loading';

import firebase from 'firebase';

// Hide StatusBar on Android as it overlaps tabs
if (Platform.OS === 'android') StatusBar.setHidden(true);

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC4APSMm0VCd8XQij3rHezp-cSPR1UtThc",
    authDomain: "one-time-password-5b1e8.firebaseapp.com",
    databaseURL: "https://one-time-password-5b1e8.firebaseio.com",
    projectId: "one-time-password-5b1e8",
    storageBucket: "",
    messagingSenderId: "555348986180",
    appId: "1:555348986180:web:efb27cbc8af235b4"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const App = ({ store, persistor }) => (
  <Root>
    <Provider store={store}>
      <PersistGate
        loading={<Loading />}
        persistor={persistor}
      >
        <StyleProvider style={getTheme(theme)}>
          <Router>
            <Stack key="root">
              {Routes}
            </Stack>
          </Router>
        </StyleProvider>
      </PersistGate>
    </Provider>
  </Root>
);

// const App = ({ store, persistor }) => (
//   <Root>
//     <Provider store={store}>
//       <PersistGate
//         loading={<Loading />}
//         persistor={persistor}
//       >
//         <StyleProvider style={getTheme(theme)}>
//           <Router>
//             <Stack key="root">
//               {Routes}
//             </Stack>
//           </Router>
//         </StyleProvider>
//       </PersistGate>
//     </Provider>
//   </Root>
// );

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({}).isRequired,
};

export default App;
