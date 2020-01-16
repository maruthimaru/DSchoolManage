import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity } from 'react-native'
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
// Actions.driverList()
}
moveCustomerScreen(){
// Actions.customerList()
}
    render() {
        return (
            <View style={styles.viewColor}>
            <TouchableOpacity 
            onPress={(this.moveDriverScreen)}
            style={styles.button}>
                <Text> login success Driver </Text>
            </TouchableOpacity>
                {/* <TouchableOpacity 
                onPress={(this.moveCustomerScreen)}
                style={styles.button}>
                <Text> Customer </Text>
            </TouchableOpacity> */}
            </View>
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
})

export default HomeDriver
