import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity,ImageBackground,Dimensions } from 'react-native'
import DriverList from './DriverList'
import CustomerList from './CustomerList'
import { Actions } from 'react-native-router-flux'
import ActionBarImage from '../components/ActionBarImage'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height*(10/30);

export class HomeDriver extends Component {

static navigationOptions =
   {
      title: 'Home',
 
      headerRight : <ActionBarImage />,
 
      headerStyle: {
 
        backgroundColor: '#4b964b'
 
    },
 
    headerTintColor: '#fff',
 
   };


moveDriverScreen(){
Actions.trainerCustomerList()
}
moveCustomerScreen(){
Actions.currentDayCus()
}
moveAboutUsScreen(){
Actions.aboutUs()
}
    render() {
        return (
            // <ImageBackground style= { styles.backgroundImage } source={require("../images/bg.png")}>
            <View style={styles.viewColor}>
                  {/* <View style={{height:windowHeight,width:windowWidth,backgroundColor: '#5fc25f',}}>

            </View> */}
  <View style={styles.viewRow}>
            <TouchableOpacity 
            onPress={(this.moveCustomerScreen)}
            style={styles.button}>
                <Text  style={styles.buttonStyle}> Customer Attendance </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={(this.moveDriverScreen)}
            style={styles.button}>
                <Text  style={styles.buttonStyle}> Customer List </Text>
            </TouchableOpacity>
            </View>
             <View style={styles.viewRow}>
            <TouchableOpacity 
            onPress={(this.moveAboutUsScreen)}
            style={styles.button}>
                <Text  style={styles.buttonStyle}> About us </Text>
            </TouchableOpacity>
            </View>
                {/* <TouchableOpacity 
                onPress={(this.moveCustomerScreen)}
                style={styles.button}>
                <Text> Customer </Text>
            </TouchableOpacity> */}
            {/* </ImageBackground> */}
      
            </View>
            
        )
    }
}

const styles=StyleSheet.create({
    viewColor:{
    alignContent:"center",
    justifyContent:"center",
    backgroundColor:"#FFf",
    flex:1
},
 buttonStyle:{
    fontSize:16,
    textAlign:"center",
    color:"#fff",
    borderWidth:0,
    borderColor:"#FFFFFF",
    padding: 5,
    // backgroundColor:'#5fc25f',
    
},

  viewRow:{
    // alignContent:"center",
    // justifyContent:"center",
    alignSelf:'center',
    backgroundColor:"#FFf",
    flexDirection:'row',
},
    button: {
    alignItems: 'center',
    backgroundColor: '#5fc25f',
    height:100,
    width:100,
    justifyContent:"center",
    margin:20,
    borderRadius:10,

  },
  backgroundImage:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    },
})

export default HomeDriver
