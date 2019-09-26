import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableHighlight,
} from 'react-native';
import ChatBubble from './chatBubble';
export default class Chat extends Component {
  render() {
    return (
      <View style={styles.chat}>
          <View style={styles.messages}>
            <FlatList
              data={[
                {type:"friend",text:"I'm fine, thank you. What about you, are you fine? I'm fine, thank you."},
                {type:"me",text:"Hi, how are you?"},
                {type:"friend",text:"I'm fine, thank you. What about you, are you fine?"},
                {type:"me",text:"Hi, how are you?"},
                {type:"friend",text:"I'm fine, thank you. What about you, are you fine?"},
                {type:"me",text:"Hi, how are you? What about you, are you fine?"},
                {type:"friend",text:"I'm fine, thank you. What about you, are you fine? I'm fine, thank you."},
                {type:"me",text:"Hi, how are you?"},
                {type:"friend",text:"I'm fine, thank you. What about you, are you fine? I'm fine, thank you. What about you, are you fine?"},
                {type:"me",text:"Hi, how are you?"},
                {type:"friend",text:"I'm fine, thank you. What about you, are you fine?"},
                {type:"me",text:"Hi, how are you?"},
            ]}
              keyExtractor={(item, index) => index.toString()}
              inverted={true}
              renderItem = {({item,index})=>
                  <ChatBubble message={item}/>
            }
          >
          </FlatList>
          <View style={[styles.footer]}>
              <TextInput style={[styles.input]}
                placeholder = 'type message here..'
                multiline = {true}
                placeholderTextColor= "#aac3e3"
                autoCorrect = {false}
                selectionColor= '#aac3e3'
              ></TextInput>
              <TouchableHighlight
                onPress = {()=>null} 
                activeOpacity = {0.2}  
                underlayColor = {null}       
              >
                <Image
                source={require('../../assets/images/send.png')}
                style={{width: 51, height: 51, marginLeft: 5, backgroundColor:"#f5f5f5", borderRadius:30}}
                />
              </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chat:{
      flex:1,
  },
  messages:{
    flex:1,
    height:"auto",
    backgroundColor:"#dbdbdb"
  },
  textMessages:{
    flex:1,
  },
  footer:{
    alignSelf:"flex-end",
    //marginTop:'auto',
    height: 'auto',
    flexDirection:'row',
    marginBottom: 5,
    paddingLeft:5,
    paddingRight:5,
    marginTop:5
  },
  input:{
    height: 'auto',
    borderColor: '#80b2f2',
    borderRadius: 25,
    borderWidth: 1,
    flex:1,
    backgroundColor:"#f7f7f7",
    paddingLeft: 20,
    fontSize: 20,
    maxHeight: 89,
  }
});
