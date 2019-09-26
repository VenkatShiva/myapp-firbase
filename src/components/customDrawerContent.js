import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { DrawerNavigatorItems } from "react-navigation-drawer";

export default class CustomDrawerContent extends Component {
  render() {
    return (
      <SafeAreaView style = {styles.profile}>
          <View style={[styles.drawerHead,styles.center]}>
            <Image
               source={require('../../assets/images/dp.jpg')}
               style={{width: 75, height: 75,borderRadius:75}}
            />
            <Text style={styles.text}>Venkat Shiva</Text>
          </View>
            <DrawerNavigatorItems {...this.props}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    center:{
        justifyContent: "center",
        alignItems:"center",
    },
    drawerHead:{
        height: 120,
    },
    text:{
        fontFamily: "LobsterTwo-BoldItalic",
        color: "black",
        fontSize: 20,
    }
});
