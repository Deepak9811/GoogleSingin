import React, {Component} from 'react';
import {Text, StyleSheet, View, Button, Image} from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  ClientId:
    '788271073845-q7m0liqggm7kdkr6l8p295u8ohoosisf.apps.googleusercontent.com',
  // offlineAccess: true,
  forceCodeForRefreshToken: true,
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userGoogleInfo: {},
      fname:"",
      lname:"",
      image: '',
    };
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // this.setState({ userInfo });

      this.setState({
        userGoogleInfo: userInfo,
        fname: userInfo.user.givenName,
        lname:userInfo.user.familyName,
        image: userInfo.user.photo,
      });

      console.log('user Info', this.state.userGoogleInfo);

      console.log("name",userInfo.user.givenName)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.warn('SIGN IN CANCELLED', error.message);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.warn('IN PROGRESS', error.message);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.warn('play services not available or outdated', error.message);
      } else {
        console.warn('Meassage', error.message);
      }
    }
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize:20,fontWeight:"700"}}> hi,I'm {this.state.fname + " " + this.state.lname} 😃 </Text>

        <View>
          <GoogleSigninButton onPress={() => this.signIn()} />
        </View>

        <Image
          style={{width: 300, height: 300}}
          source={{uri: this.state.image}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
