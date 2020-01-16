import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity } from 'react-native'
import DriverList from './DriverList'
import CustomerList from './CustomerList'
import ActionBarImage from '../components/ActionBarImage'
import { Actions } from 'react-native-router-flux'



export class HomeAdmin extends Component {

static navigationOptions =
   {
      title: 'Home',
 
      headerRight : <ActionBarImage />,
 
      headerStyle: {
 
      backgroundColor: '#FFf'
 
    },
 
    headerTintColor: '#000',
 
   };

// static navigationOptions = ({ navigation }) => {
//   return {
//     //Heading/title of the header
//     title: navigation.getParam('Title', 'Left Right Custom Header'),
//     //Heading style
//     headerStyle: {
//       backgroundColor: navigation.getParam('BackgroundColor', 'red'),
//     },
//     //Heading text color
//     headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
//     headerRight: (
//       <TouchableOpacity onPress={() => alert('Right Menu Clicked')}>
//         <Text
//           style={{
//             color: 'white',
//           }}>
//           Right Menu
//         </Text>
//       </TouchableOpacity>
//     ),
//     headerLeft: (
//       <TouchableOpacity onPress={() => navigation.navigate('FirstPage')}>
//         <Text
//           style={{
//             color: 'white',
//           }}>
//           Left Menu
//         </Text>
//       </TouchableOpacity>
//     ),
//   };
// };

 
moveDriverScreen(){
Actions.driverList()
}
moveCustomerScreen(){
Actions.customerList()
}
    render() {
        return (
            <View style={styles.viewColor}>
            <TouchableOpacity 
            onPress={(this.moveDriverScreen)}
            style={styles.button}>
                <Text> Driver </Text>
            </TouchableOpacity>
                <TouchableOpacity 
                onPress={(this.moveCustomerScreen)}
                style={styles.button}>
                <Text> Customer </Text>
            </TouchableOpacity>
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

export default HomeAdmin