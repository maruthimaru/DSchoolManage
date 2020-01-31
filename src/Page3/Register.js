import React, { Component } from 'react'
import { Text, View, TextInput,TouchableOpacity,StyleSheet } from 'react-native'


export class Register extends Component {

        state={
            f_Name: '',
            l_Name: '',
            password: '',
            email: '',
            reg_json : {
                firstname:'',
                lastname:'',
                email:'',
                password:'',
            },
        }

        insert=(f_Name,l_Name,email,password)=>{
        console.log("fname" + f_Name+" l_Name" + l_Name+" email" + email+" password" + password);
        var regData=JSON.stringify({
          firstname: f_Name,
          lastname: l_Name,
          email:email,
          password:password
        })
        console.log( " regData " + regData);
// this.setState({
//             reg_json:{
//                 firstname: f_Name,
//                 lastname: l_Name,
//                 email: email,
//                 password: password,
//             }
//         });
//         console.log("object json "+ JSON.stringify(this.state.reg_json));
        
//         console.log("reg_json" + this.state.reg_json);
            
           return fetch('http://192.168.0.95:5000/registration', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: regData,
            }) 
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("responseJson "+responseJson.message);
                
                return responseJson;
                })
                .catch((error) => {
                console.error(error);
                });

        
        // console.log("reg_json" + this.state.reg_json);
        
        }

    render() {
        return (
            <View>
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter F-Name" 
                placeholderTextColor="#afafaf"
                onChangeText={(text) => {
                    const newUser = Object.assign({}, this.state.User, { firstname: text });
                    this.setState({
                        f_Name : text,
                        // reg_json:newUser,
                        })
                }}
                />
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter L-Name" 
                placeholderTextColor="#afafaf"
                onChangeText={(text) =>{
                    const newUser = Object.assign({}, this.state.User, { lastname: text });
                     this.setState({l_Name : text,
                        // reg_json:newUser,
                        })
                }}
                />
                 <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Email" 
                placeholderTextColor="#afafaf"
                onChangeText={(text) => {
                     const newUser = Object.assign({}, this.state.User, { email: text });
                    this.setState({email : text,
                    // reg_json:newUser,
                    })
                    }}
                />
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Password" 
                placeholderTextColor="#afafaf"
                secureTextEntry={true}
                onChangeText={(text) => {
                     const newUser = Object.assign({}, this.state.User, { password: text });
                    this.setState({password : text,
                    // reg_json:newUser,
                    })
                }}
                />

                 <TouchableOpacity 
                onPress={()=> this.insert(  this.state.f_Name,this.state.l_Name,this.state.email,this.state.password) } 
                style={styles.button}>
                <Text style={styles.buttonStyle}>Register</Text>
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
  scrollView: {
     alignContent:"center",
    backgroundColor:"#500077",
  }

});

export default Register
