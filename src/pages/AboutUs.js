import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import ActionBarImage from '../components/ActionBarImage'
export default class AboutUs extends Component {


static navigationOptions =
   {
      title: 'Home',
 
      headerRight : <ActionBarImage />,
 
      headerStyle: {
 
        backgroundColor: '#4b964b'
 
    },
 
    headerTintColor: '#fff',
 
   };

    render() {
        return (
            <View style={styles.viewColor}>
                <View style={{backgroundColor:"#5fc25f",margin:30,borderRadius:10,minHeight:300}}>
<Text style={styles.buttonStyle}>Customer service</Text>

<Text style={styles.buttonStyleSmall}>Good customer service is different from company to company, but the key characteristics of good customer service include: a rapid response time to service requests, responding to all customer feedback (positive or negative), self-service help documents, and a frictionless process for getting in touch with support. </Text>

<Text style={styles.buttonStyleRight}>Contact us</Text>
<Text style={styles.buttonStyleRightSmall}>+91 78710 76570</Text>
<Text style={styles.buttonStyleRightSmall}>email@gmail.com</Text>
                </View>
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
},buttonStyle:{
    fontSize:16,
    textAlign:"center",
    color:"#fff",
    borderWidth:0,
    borderColor:"#FFFFFF",
    padding: 5,
    fontWeight:'bold',
    // backgroundColor:'#5fc25f',
    
},
buttonStyleSmall:{
    fontSize:16,
    textAlign:"center",
    color:"#fff",
    borderWidth:0,
    borderColor:"#FFFFFF",
    padding: 5,
    // fontWeight:'bold',
    // backgroundColor:'#5fc25f',
    
},
buttonStyleRight:{
    fontSize:16,
    textAlign:"right",
    color:"#fff",
    borderWidth:0,
    borderColor:"#FFFFFF",
    padding: 5,
    fontWeight:'bold',
    // backgroundColor:'#5fc25f',
    
},
buttonStyleRightSmall:{
    fontSize:16,
    textAlign:"right",
    color:"#fff",
    borderWidth:0,
    borderColor:"#FFFFFF",
    paddingLeft: 5,
    paddingRight: 5,
    // backgroundColor:'#5fc25f',
    
},
})