import React, { Component } from 'react'
import { Text, View ,StyleSheet,TextInput,Button,Alert,TouchableHighlight} from 'react-native'

export class Login extends Component {
    render() {
        return (
            <View style={styles.viewColor}>
                <Text style={styles.textColor}> Login </Text>
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Name" 
                placeholderTextColor="#afafaf"/>
                
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Password" 
                placeholderTextColor="#afafaf"
                secureTextEntry={true}
                />

                <TouchableHighlight 
                onPress={()=> Alert.alert('login clicked')} 
                style={styles.button}
                ><Text style={styles.buttonStyle}>Login</Text></TouchableHighlight>

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
textColor:{
    fontSize:25,
    textAlign:"center",
    color:"#FFFFFF"
},
textInputStyle:{
    margin:20,
    paddingLeft:5,
    paddingRight:5,
    color:"#FFFFFF",
    borderColor:"#dbdbdb",
    borderWidth:0.5,
    
},
buttonStyle:{

    fontSize:25,
    textAlign:"center",
    color:"#000",
    borderWidth:0,
    borderColor:"#FFFFFF"
},
 button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height:35,
    margin:20,
  },

});

export default Login
