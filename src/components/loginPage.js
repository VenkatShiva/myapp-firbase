import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
  Dimensions,
  Picker,
  KeyboardAvoidingView,
  Animated,
  ScrollView,
  UIManager,
  LayoutAnimation,
  ImageBackground
} from 'react-native';
import {
    NavigationActions,
    StackActions } from "react-navigation";
import { connect } from "react-redux";

import { setMobileNumber } from '../reducers/actions';
let mobileInputs = [];
const dimensions = Dimensions.get('window');
if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
           mobileCode:"+91",
           mobileInput:"",
           isMobileEntered: false,
           errorMessage:"",
           otpEntered: Array(6).fill(""),
           animatedValue : new Animated.Value(0),
           focus: {},
        }
        this.mobileInputChange = this.mobileInputChange.bind(this);
        this.submitMobileNumber = this.submitMobileNumber.bind(this);
        this.inputFocused = this.inputFocused.bind(this);
        this.inputBlurred = this.inputBlurred.bind(this);
    }
  mobileInputChange(number){
      let numberWithoutSpace = number.replace(/[^0-9]/g,"");
      this.setState({
        mobileInput : numberWithoutSpace
      })
  }
  async submitMobileNumber(){
    if(this.state.mobileInput.length != 10){
        this.setState({
            errorMessage : "Please enter valid mobile number"
        })
    }
    else{
        await this.props.setMobileNumber(this.state.mobileInput);
        this.setState((previousState, props)=>{
            return Object.assign({},previousState ,{isMobileEntered:true})
        },()=>{
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut,()=>{
                Animated.timing(this.state.animatedValue, {
                    toValue: 1,
                    duration: 200
                  }).start(()=>{
                    mobileInputs[0].focus();
                  })
            });
        });
    }
  }
  gotoApp(){
      let otp = this.state.otpEntered.slice();
      otp = otp.join("");
      if(otp.length != 6) {
        this.setState({
            errorMessage : "Please enter 6 digits pin"
        })
      }
      else if(otp != "123456"){
        this.setState((previousState,props)=>{
            const otps = Array(6).fill(""); 
            return Object.assign({},previousState ,{otpEntered : otps,errorMessage : "Wrong pin, try again"});
        })
      }
      else {
        this.props.navigation.navigate('myApp');
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
            NavigationActions.navigate({ routeName: 'myApp'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
     }
  }
  inputFocused(input,index){
        // let newFocus = Object();
        let feildOnFocus = {}
        //someProperty[input] = true;
        //this.setState({someProperty})
        feildOnFocus[input] = true;
        if(index != undefined) feildOnFocus[input] = index;
        this.setState({
            errorMessage : "",
            focus:feildOnFocus
        })
    }
    inputBlurred(){
        this.setState({
            focus:{},
        })
    }
  render() {
    let inputs = Array(6).fill(0);
    return (
        <ImageBackground resizeMode={'cover'}  source={require('../../assets/images/background.png')} style={{flex:1,backgroundColor:"#8cbeff",height:dimensions.height-55,width:dimensions.width}}>
            <KeyboardAvoidingView style={styles.login}
                 enabled
                >
                
                <ScrollView contentContainerStyle={{flexGrow: 1,justifyContent:"center"}}
                    style={[styles.inputField,]}
                    keyboardShouldPersistTaps="never"
                    keyboardDismissMode="on-drag">
                    <Text style={styles.welcome}>Welcome to MyApp</Text>
                    <Text style={[styles.textFont,{alignSelf:"center",fontSize:25,color:"black"}]}>Login Here</Text>
                    <Text style={[styles.textFont,this.state.focus.mobile ? {color:"#0000ff"}:{}]}>Enter your mobile number *</Text>
                    <View style={[styles.numberField,this.state.isMobileEntered? {opacity:0.7}:{}, this.state.focus.mobile ? {borderColor:"#0000ff",borderWidth:2}:{}]}>
                        <Picker
                            selectedValue={this.state.mobileCode}
                            style={styles.numberCode}  
                            enabled={this.state.isMobileEntered ? false:true}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({mobileCode: itemValue})}
                        >
                            <Picker.Item label="  +91" value="+91" color="black"/>
                            {/* <Picker.Item label="  +44" value="+44" /> */}
                        </Picker>
                        <TextInput
                            placeholder = 'mobile number'
                            placeholderTextColor = "#8a8a8a"
                            keyboardType = "number-pad"
                            editable = {this.state.isMobileEntered ? false:true}
                            style={styles.numberInput}
                            value={this.state.mobileInput}
                            onChangeText={this.mobileInputChange}
                            blurOnSubmit = {true}
                            maxLength={10}
                            selectionColor = "#aac3e3"
                            textContentType="telephoneNumber"
                            onFocus = {()=>{this.inputFocused('mobile')}}
                            onBlur={this.inputBlurred}
                            onSubmitEditing = {()=>{
                                    this.submitMobileNumber();
                                }
                            }
                        >
                        </TextInput>
                    </View>
                    <Animated.View style={[{display:this.state.isMobileEntered ? "flex":"none",opacity:this.state.animatedValue}]}>
                        <Text style={[styles.textFont,this.state.focus.otp != undefined  ? {color:"#0000ff"}:{}]}>Enter your pin *</Text>
                        <View style={styles.otpContainer}>
                                {
                                    inputs.map((value,index)=>{
                                        return (
                                            <View style={[styles.otpInput, (this.state.focus.otp == index) ? {borderColor:"#0000ff",borderWidth:2}:{}]} key={index+"otp"}>
                                                <TextInput
                                                keyboardType = "decimal-pad"
                                                ref={(ref)=>{
                                                    mobileInputs[index]=ref;
                                                }}
                                                style={styles.otpField}
                                                onChangeText={
                                                    (value)=>{
                                                        let enteredValue = value.replace(/[^0-9]/g,"");
                                                        this.setState((previousState,props)=>{
                                                            let otps = previousState.otpEntered.slice();
                                                            otps[index] = enteredValue;
                                                            return Object.assign({},previousState ,{otpEntered : otps});
                                                        },()=>{
                                                            if(enteredValue !== ""){
                                                                if(index == 5){
                                                                    mobileInputs[index].blur();
                                                                    this.gotoApp();
                                                                }
                                                                else 
                                                                    mobileInputs[index+1].focus();
                                                            }
                                                            // else if(index > 0){
                                                            //     mobileInputs[index-1].focus()
                                                            // }
                                                        });
                                                    }
                                                }
                                                onKeyPress={(nativeEvent)=>{
                                                    if(nativeEvent.nativeEvent.key == "Backspace"){
                                                        if(index>0)
                                                            mobileInputs[index-1].focus();
                                                    }
                                                }}
                                                textAlign={'center'}
                                                selectionColor = "#aac3e3"
                                                value={this.state.otpEntered[index]?"*":""}
                                                maxLength={1}
                                                selectTextOnFocus={true}
                                                onFocus = {()=>{this.inputFocused('otp',index)}}
                                                onBlur={this.inputBlurred}
                                                >
                                                </TextInput>
                                            </View>
                                        )
                                    })
                                }
                        </View>
                    </Animated.View>
                    
                    <Text style={{color:"red",display: this.state.errorMessage ? "flex":"none",fontFamily:"Bitter-Regular"}}>{this.state.errorMessage}</Text>
                    <View style={styles.radius}>
                        <TouchableNativeFeedback
                            onPress={() => {
                                if(this.state.isMobileEntered){
                                    this.gotoApp();
                                } else {
                                    this.submitMobileNumber();
                                } 
                            }}
                            background={TouchableNativeFeedback.Ripple( "white", true)}
                            
                        >
                            <View style={styles.submitNumber}>
                                <Text style={[styles.textFont,{padding:3,paddingVertical:3,fontSize:15,color:"white"}]}>
                                    SUBMIT
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                        
                    </View>
                </ScrollView>
                
            </KeyboardAvoidingView>
            </ImageBackground>
    );
  }
}
const mapStateToProps =  state => {
    return {
      mobileNumber: state.myNumber,
    };
};
export default  connect(mapStateToProps,{setMobileNumber})(LoginPage);
//const dimensions = Dimensions.get('window');
const width = Math.round(dimensions.width*9/10);
const styles = StyleSheet.create({
  login:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
  },
  welcome:{
      fontSize:30,
      color:"black",
      fontFamily: "LobsterTwo-BoldItalic",
      alignSelf:"center",
      textShadowColor:"#9e9d9d",
      textShadowOffset:{width:1,height:4},
      textShadowRadius:10
  },
  inputField:{
      width,
      maxWidth: 350,
      padding:10,
  },
  numberField:{
      flexDirection:"row",
      borderColor:"black",
      borderWidth:1,
      borderRadius:10,
      backgroundColor:"#f2f7ff"
  },
  numberCode:{
      width: 110,
  },
  numberInput:{
      flex:1,
      fontSize: 18,
      paddingLeft:10,
      color:"black"
  },
  submitNumber:{
      padding:10,
      backgroundColor:"#006eff",
      borderRadius:10,
  },
  otpContainer:{
      flexDirection:"row",
  },
  otpInput:{
      height: 50,
      borderWidth:1,
      borderRadius:5,
      borderColor:"black",
      backgroundColor:"#f2f7ff",
      marginHorizontal:3,
      justifyContent:"center",
      alignItems:"center",
      flex:1
  },
  otpField:{
      fontSize:20,
  },
  radius:{
      width:"auto",
      height:"auto",
      borderRadius:10,
      borderWidth:0,
      marginTop:15,
      borderColor:"black",
      alignSelf: "flex-end",
  },
  textFont:{
    color:"#2c2c2c",
    paddingVertical:10,
    fontSize: 20,
    fontFamily:"Bitter-Regular",
    textShadowColor:"#9e9d9d",
    textShadowOffset:{width:1,height:2},
    textShadowRadius:5
  }
});
