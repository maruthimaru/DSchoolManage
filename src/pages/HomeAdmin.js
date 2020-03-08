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
 
        backgroundColor: '#4b964b'
 
    },
 
    headerTintColor: '#fff', 
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
moveAboutUsScreen(){
Actions.aboutUs()
}
    render() {
        return (
            // <ImageBackground style= { styles.backgroundImage } source={require("../images/bg.png")}>
            <View style={styles.viewColor}>

            <View style={styles.viewRow}>
            <TouchableOpacity 
                onPress={(this.moveCarScreen)}
                style={styles.button}>
                <Text style={styles.buttonStyle}> New Car </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
            onPress={(this.moveDriverScreen)}
            style={styles.button}>
                <Text style={styles.buttonStyle}> Driver </Text>
            </TouchableOpacity>
            </View>
              <View style={styles.viewRow}>
                <TouchableOpacity 
                onPress={(this.moveCustomerScreen)}
                style={styles.button}>
                <Text style={styles.buttonStyle}> Customer </Text>
                
            </TouchableOpacity>
            <TouchableOpacity 
                // onPress={(this.moveCustomerScreen)}
                style={styles.button}>
                <Text style={styles.buttonStyle}> Attendance </Text>
                
            </TouchableOpacity>

            
</View>
 <View style={styles.viewRow}>
                <TouchableOpacity 
                onPress={(this.moveAboutUsScreen)}
                style={styles.button}>
                <Text style={styles.buttonStyle}> About us </Text>
                
            </TouchableOpacity>
            </View>
            {/* <TouchableOpacity 
                onPress={(this.moveSlotScreen)}
                style={styles.button}>
                <Text> New Slot </Text>
            </TouchableOpacity> */}
            {/*  </ImageBackground> */}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    viewColor:{
    // alignContent:"center",
    justifyContent:"center",
    backgroundColor:"#FFf",
    flex:1,
    flexDirection:'column',
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
    buttonStyle:{
    fontSize:16,
    textAlign:"center",
    color:"#fff",
    borderWidth:0,
    borderColor:"#FFFFFF",
    // backgroundColor:'#5fc25f',
    
},
})

export default HomeAdmin
