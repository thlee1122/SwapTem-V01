import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Form, Item, Label, Input, Text, Button, View,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import { translate } from '../../i18n';
import Header from './Header';
import Spacer from './Spacer';

import Expo from 'expo';
// import {View as RNView} from 'react-native';
// import { LoginButton } from 'react-native-fbsdk';
//const FBSDK = require('react-native-fbsdk');
/*
const {
  LoginButton,
  AccessToken
} = FBSDK;
*/
class Login extends React.Component {
  // static propTypes = {
  //   member: PropTypes.shape({
  //     email: PropTypes.string,
  //   }),
  //   locale: PropTypes.string,
  //   error: PropTypes.string,
  //   success: PropTypes.string,
  //   loading: PropTypes.bool.isRequired,
  //   onFormSubmit: PropTypes.func.isRequired,
  // }

  static defaultProps = {
    error: null,
    success: null,
    locale: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
      loggedIn: false,
      name: "",
      photoUrl: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then(() => Actions.pop())
      .catch(e => console.log(`Error: ${e}`));
  }

  handleGoogleSignin = async () => {
    // console.log("Google Sign In has been pressed");

    const googleOAuthClientID = "273007938095-lj39nobbh02i5smuejsgrhagheqk3krl.apps.googleusercontent.com";

    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: googleOAuthClientID,
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        console.log("@@@@", result);
        // return result.accessToken;

        this.setState({
          loggedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        });

      } else {
        // return {cancelled: true};
        console.log("login cancelled");
      }
    } catch(e) {
      // return {error: true};
      console.log("error", e);
    }

  }

  render() {
    const {
      loading,
      error,
      success,
      locale,
    } = this.props;
    const { email } = this.state;

    // const google OAuth Client ID = "273007938095-lj39nobbh02i5smuejsgrhagheqk3krl.apps.googleusercontent.com";

    if (loading) return <Loading />;

    return (

      <Container style={{backgroundColor: 'white'}}>
        <Content>
          {/* <RNView>
            <LoginButton
              publishPermissions={["email"]}
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    alert("Login failed with error: " + error.message);
                  } else if (result.isCancelled) {
                    alert("Login was cancelled");
                  } else {
                    alert("Login was successful with permissions: " + result.grantedPermissions)
                  }
                }
              }
              onLogoutFinished={() => alert("User logged out")}/>
          </RNView> */}

          <View padder>
            <Header
              title="Welcome back"
              content="Please use your email and password to login."
            />
            { success ? <Messages type="success" message={success} /> : null }
            { error ? <Messages message={error} /> : null }
          </View>

          <Form>
            <Item stackedLabel>
              <Label>
                {translate('Email', locale)}
              </Label>
              <Input
                autoCapitalize="none"
                value={email}
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>
            <Item stackedLabel>
              <Label>
                {translate('Password', locale)}
              </Label>
              <Input
                secureTextEntry
                onChangeText={v => this.handleChange('password', v)}
              />
            </Item>

            <Spacer size={20} />

            <View padder>
              <Button block onPress={this.handleSubmit}>
                <Text>
                  {translate('Login', locale)}
                </Text>
              </Button>

              {/* <Button onPress={this.handleGoogleSignin} style={{marginTop: 15}}>
                <Text>
                  Google Sign In
                </Text>
              </Button> */}

              

              
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Login;
