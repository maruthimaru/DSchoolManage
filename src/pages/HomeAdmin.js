import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity,ImageBackground } from 'react-native'
import DriverList from './DriverList'
import CustomerList from './CustomerList'
import ActionBarImage from '../components/ActionBarImage'
import { Actions } from 'react-native-router-flux'

export class HomeAdmin extends Component {

    constructor(props) {
        super(props)
//    Actions.sideMenu()
    }
    
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

moveSlotScreen(){
Actions.slotList()
}
moveCarScreen(){
Actions.carList()
}
    render() {
        return (
            <ImageBackground style= { styles.backgroundImage } source={require("../images/bg.png")}>
            
            <TouchableOpacity 
                onPress={(this.moveCarScreen)}
                style={styles.button}>
                <Text> New Car </Text>
            </TouchableOpacity>
            
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

            {/* <TouchableOpacity 
                onPress={(this.moveSlotScreen)}
                style={styles.button}>
                <Text> New Slot </Text>
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

export default HomeAdmin
