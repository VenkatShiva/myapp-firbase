import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.profile}>
          {/* <Header navigation={this.props.navigation}/> */}
          <View style={[styles.center]}>
            <Text style={styles.text}>My Profile</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    fontFamily: "LobsterTwo-Bold",
    color: "black",
    fontSize: 30,
  }
});
