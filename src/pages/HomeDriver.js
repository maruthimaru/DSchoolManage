import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity,ImageBackground } from 'react-native'
import DriverList from './DriverList'
import CustomerList from './CustomerList'
import { Actions } from 'react-native-router-flux'
import ActionBarImage from '../components/ActionBarImage'

export class HomeDriver extends Component {

static navigationOptions =
   {
      title: 'Home',
 
      headerRight : <ActionBarImage />,
 
      headerStyle: {
 
      backgroundColor: '#FFf'
 
    },
 
    headerTintColor: '#000',
 
   };


moveDriverScreen(){
Actions.trainerCustomerList()
}
moveCustomerScreen(){
Actions.currentDayCus()
}
    render() {
        return (
            <ImageBackground style= { styles.backgroundImage } source={require("../images/bg.png")}>

            <TouchableOpacity 
            onPress={(this.moveCustomerScreen)}
            style={styles.button}>
                <Text> Current Day Customer List </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={(this.moveDriverScreen)}
            style={styles.button}>
                <Text> Customer List </Text>
            </TouchableOpacity>
                {/* <TouchableOpacity 
                onPress={(this.moveCustomerScreen)}
                style={styles.button}>
                <Text> Customer </Text>
            </TouchableOpacity> */}
            </ImageBackground>
        )
    }
}

const styles=StyleSheet.create({
    viewColor:{
    alignContent:"center",
    justifyContent:"center",
    backgroundColor:"#500077",
    flex:1
},
    button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height:35,
    justifyContent:"center",
    margin:20,

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
