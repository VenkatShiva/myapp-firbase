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
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {
    NavigationActions,
    StackActions } from "react-navigation";
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from "react-redux";

import { setMobileNumber } from '../reducers/actions';

let mobileInputs = [];
const dimensions = Dimensions.get('window');
class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            errorMessage:'',
            mobileCode:'+91',
            mobileNumber:'',
            gender:"male",
            dob:"",
            showCalender:false,
            otpEntered: Array(6).fill(""),
            focus: {},
            loading:false
        }
        this.validateName = this.validateName.bind(this);
        this.validateMobileNumber = this.validateMobileNumber.bind(this);
        this.setDate = this.setDate.bind(this);
        this.validatePin = this.validatePin.bind(this);
        this.inputFocused = this.inputFocused.bind(this);
        this.inputBlurred = this.inputBlurred.bind(this);
        this.validateAllFeilds = this.validateAllFeilds.bind(this);
    }
    validateName(name){
        let validatedName = name.replace(/[^\w ]/g,"");
        this.setState({
            name:validatedName
        })
    }
    validateMobileNumber(number){
        let validatedMobileNumber = number.replace(/[^0-9]/g,"");
        this.setState({
            mobileNumber : validatedMobileNumber
        })
    }
    setDate(event, date){
        if(date){
            const dd = ('0'+date.getDate()).slice(-2);
            const mm = ('0'+(date.getMonth()+1)).slice(-2);
            const yyyy = date.getFullYear();
            this.setState({
                dob: dd+'/'+mm+'/'+yyyy,
                showCalender:false,
            })
        }
        else{
            this.setState({
                showCalender:false,
            })
        }
        //console.log(date.getDate());
    }
    validatePin(pin){
        let validatedPin = pin.replace(/[^0-9]/g,"");
        this.setState({
            pin : validatedPin
        })
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
    validateAllFeilds(){
        let error='';
        if( !this.state.name ) {
            error = 'Enter your name';
        }
        else if( this.state.name.length < 5 || this.state.name.length > 16){
            error = 'Name should be in between 5-16 characters'
        }
        else if( this.state.mobileNumber.length != 10){
            error = 'Enter valid mobile number';
        }
        else if( !this.state.dob ){
            error = 'Set your date of birth';
        }
        else if( this.state.otpEntered.join('').length < 6){
            error = 'Enter valid pin';
        }
        else {
            this.setState({
                loading:true
            })
        }
        if(error){
            this.setState({
                errorMessage:error
            })
        }
    }
  render() {
    let inputs = Array(6).fill(0);
    // console.log("state-->",this.state);
    return (
        <ImageBackground resizeMode={'cover'}  source={require('../../assets/images/background.png')} style={{flex:1,backgroundColor:"#8cbeff",height:dimensions.height-50,width:dimensions.width}}>
            <KeyboardAvoidingView style={styles.register} enabled>
                
                <ScrollView 
                    style={[styles.maxWidth,{paddingTop:15,maxHeight:100,minHeight:100}]}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.welcome}>MyApp Welcoming You</Text>
                        <Text style={[styles.textFont,{alignSelf:"center",fontSize:25,color:"black"}]}>Glad to see you here</Text>
                </ScrollView>
                {
                    this.state.errorMessage ?  (<Text style={{color:"red",fontFamily:"Bitter-Regular"}}>{this.state.errorMessage}</Text>)   : null 
                } 
                <ScrollView contentContainerStyle={{paddingBottom:10}}
                        style={[styles.maxWidth,]}
                        keyboardShouldPersistTaps="never"
                        keyboardDismissMode="on-drag"
                        >
                    <Text style={[styles.textFont,this.state.focus.name ? {color:"#0000ff"}:{}]}>Enter your name *</Text>
                    <View style={[styles.inputContainer,this.state.focus.name ? {borderColor:"#0000ff",borderWidth:2}:{},this.state.loading?{opacity:0.7}:{}]}>
                        <TextInput
                            placeholder = 'Enter your name'
                            placeholderTextColor = "#8a8a8a"
                            keyboardType = "default"
                            style={styles.inputFeild}
                            value={this.state.name}
                            onChangeText={this.validateName}
                            blurOnSubmit = {true}
                            editable = {this.state.loading ? false: true}
                            maxLength={16}
                            autoCorrect = {false}
                            selectionColor = "#aac3e3"
                            textContentType="name"
                            onFocus = {()=>{this.inputFocused('name')}}
                            onBlur={this.inputBlurred}
                        >
                        </TextInput>
                    </View>
                    <Text style={[styles.textFont,this.state.focus.number ? {color:"#0000ff"}:{}]}>Enter your mobile number *</Text>
                    <View style={[styles.inputContainer,this.state.focus.number ? {borderColor:"#0000ff",borderWidth:2}:{},this.state.loading?{opacity:0.7}:{}]}>
                        <Picker
                            selectedValue={this.state.mobileCode}
                            style={{width:110}}  
                            mode="dropdown"
                            enabled={false}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({mobileCode: itemValue})}
                            >
                            <Picker.Item label="  +91" value={this.state.mobileCode} color="black"/>
                            <Picker.Item label="  +44" value="+44" />
                        </Picker>
                        <TextInput
                            placeholder = 'mobile number'
                            placeholderTextColor = "#8a8a8a"
                            keyboardType = "number-pad"
                            style={styles.inputFeild}
                            value={this.state.mobileNumber}
                            onChangeText={this.validateMobileNumber}
                            blurOnSubmit = {true}
                            editable = {this.state.loading ? false: true}
                            maxLength={20}
                            selectionColor = "#aac3e3"
                            textContentType="telephoneNumber"
                            onFocus = {()=>{
                                this.inputFocused('number')
                            }}
                            onBlur={this.inputBlurred}
                            >
                        </TextInput>    
                    </View>
                    <Text style={[styles.textFont]}>Select gender *</Text>
                    <View style={styles.genderContainer}>
                        <TouchableWithoutFeedback style={{flex:1}}
                            onPress={() => this.setState({
                                gender:"male",
                                errorMessage:""
                            })}
                            disabled={this.state.loading ? true: false}
                            style={{opacity:this.state.enabled?0.7:1}}
                        >
                            <View style={styles.genderOption}>
                                <View
                                    style={[styles.radioButton, this.state.gender=="male"? { backgroundColor:"#0000ff",opacity:1}:{}]}>   
                                    </View>
                                <Text style={[styles.textFont,this.state.gender=="male"?{color:"#0000ff",opacity:1}:{opacity:0.7}]}>Male</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={{flex:1}}
                            onPress={() => {
                                this.setState({
                                    gender:"female",
                                    errorMessage:""
                                })
                            }
                            }
                            disabled={this.state.loading ? true: false}
                            style={{opacity:this.state.enabled?0.7:1}}
                        >
                            <View style={styles.genderOption}>
                                <View
                                    style={[styles.radioButton, this.state.gender=="female"? { backgroundColor:"#0000ff",opacity:1}:{}]}>
                                </View>
                                <Text 
                                    style={[styles.textFont,this.state.gender=="female"?{color:"#0000ff",opacity:1}:{opacity:0.7}]}>Female</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Text style={styles.textFont}>Set date of birth *</Text>
                    <View style={[styles.genderContainer,{justifyContent:"center",}]}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.setState({
                                    showCalender:true,
                                    errorMessage:""
                                })
                            }
                        }
                        disabled={this.state.loading ? true: false}
                        >
                            <View style={[styles.datepicker,{opacity:this.state.loading?0.7:1}]}>
                                <Text style={[styles.textFont,{paddingVertical:5}]}>{this.state.dob ? this.state.dob : "DD/MM/YYYY"} &#9660;</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Text style={[styles.textFont,this.state.focus.otp != undefined  ? {color:"#0000ff"}:{}]}>Set your pin *</Text>
                    <View style={styles.genderContainer}>
                    {
                            inputs.map((value,index)=>{
                                return (
                                    <View style={[styles.otpInput, (this.state.focus.otp == index) ? {borderColor:"#0000ff",borderWidth:2}:{},this.state.loading?{opacity:0.7}:{}]} key={index+"otp"}>
                                        <TextInput
                                            keyboardType = "decimal-pad"
                                            ref={(ref)=>{
                                                mobileInputs[index]=ref;
                                            }}
                                            style={styles.otpField}
                                            editable = {this.state.loading ? false: true}
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
                                                                // this.gotoApp();
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
                    <View>
                        {
                            this.state.showCalender &&
                    <DateTimePicker value={new Date()}
                        mode="date"
                        is24Hour={true}
                        display="calendar"
                        maximumDate={new Date()}
                        minimumDate={new Date(1970,0,1)}
                        onChange={this.setDate} />
                        }
                    </View>
                    <View style={styles.radius}>
                        <TouchableNativeFeedback
                            onPress={this.validateAllFeilds}
                            background={TouchableNativeFeedback.Ripple( "white", true)}
                            style={{flex:1,}}
                            disabled={this.state.loading ? true: false}
                        >
                            <View style={[styles.submitNumber,this.state.loading?{opacity:0.7}:{}]}>
                                <Text style={[styles.textFont,{paddingVertical:0,color:"white",fontSize:15,alignSelf:"center"}]}>
                                    REGISTER
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                        {
                            this.state.loading && <ActivityIndicator style ={{position:"absolute",alignSelf:"center", flex:1}} size="large" color="#0000ff" />
                        }
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
export default  connect(mapStateToProps,{setMobileNumber})(Register);
const width = Math.round(dimensions.width*9/10);
const styles = StyleSheet.create({
  backgroundImage:{
    flex:1,
    backgroundColor:"#8cbeff",
    position:"absolute"
  },
  maxWidth:{
    width,
    maxWidth: 350,
    paddingHorizontal:10,
 },
 register:{
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
 textFont:{
    color:"#2c2c2c",
    paddingVertical:10,
    fontSize: 20,
    fontFamily:"Bitter-Regular",
    textShadowColor:"#9e9d9d",
    textShadowOffset:{width:1,height:2},
    textShadowRadius:5
  },
  inputContainer:{
    flexDirection:"row",
    borderColor:"black",
    borderWidth:1,
    borderRadius:10,
    backgroundColor:"#f2f7ff",
    elevation:5
  },
  inputFeild:{
    flex:1,
    fontSize: 18,
    paddingLeft:10,
  },
  genderContainer:{
      flexDirection:"row"
  },
  genderOption:{
      flexDirection:"row",
      flex:1,
      alignItems:"center",
      justifyContent:"space-around"
  },
  radioButton:{
    height:25,
    width:25,
    borderColor:"#f2f7ff",
    borderWidth:3,
    borderRadius:15,
    backgroundColor:"#8cbeff",
    opacity:0.7
  },
  datepicker:{
      padding:10,
      borderColor:"black",
      borderWidth:1,
      borderRadius:10,
      backgroundColor:"#f2f7ff",
      elevation:5
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
    flex:1,
    elevation:5
  },
  otpField:{
    fontSize:20,
  },
  radius:{
    borderRadius:10,    
    marginTop:20,
    borderWidth:0,
    borderColor:"black",
    position:'relative',
    justifyContent:"center",
    flex:1
 },
 submitNumber:{
    padding:13,
    backgroundColor:"#006eff",
    borderRadius:10,
    flex:1
 },
});
