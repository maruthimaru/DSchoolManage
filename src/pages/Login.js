import React, { Component } from 'react'
import { Text, View ,StyleSheet,TextInput,Button,Alert,TouchableHighlight,TouchableOpacity,ActivityIndicator,
FlatList,SafeAreaView, ScrollView} from 'react-native'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Actions } from 'react-native-router-flux'
import UserList from './UserList'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'DSchool.db' });

export class Login extends Component {

  constructor(props) {
    super(props)
  
  db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='login'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS login', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS login(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(225), password VARCHAR(255))',
              []
            );
            console.log("table created")
          }else{
            console.log("already table created")
          }
        }
      );
    });
  }
  

    state ={   
      list:[
           {name:"raja"},
           {name:"Sri"},
           {name:"hari"},
           {name:"Ram"},
           {name:"Jp"},
       ],
       userName: '',
       password: '',
       isLoading: true}

       //insert
insert=(user_name,password)=>{
  console.log("username : "+user_name +" pass "+ password)
       db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO login(user_name, password) VALUES (?,?)',
              [user_name, password],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are Registered Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                           Actions.userList() ,
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Registration Failed');
                }
              }
            );
          });
}

   loginGetApi=(userName,password)=>{
       var url="https://developer.scoto.in/react/api/Login/user?username="+ userName+
      "&password="+ password
      console.log(userName +" pass "+ password + " url "+url)
      return fetch(url)
 
    .then((response) => response.json())
    .then((responseJson) => {
        //  Alert.alert(responseJson.message)
        if (responseJson.status) {
          this.insert(userName,password)
        }else{
            Alert.alert(responseJson.message)
        }
        // console.log(responseJson)
        // this.props.navigation.navigate('UserList')
      return responseJson.status;
    })
    .catch((error) => {
      console.error(error);
    });
   }

    render() {
      // console.log(this.state.data)


        return (
      <>
      {/* <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}> */}
            <View style={styles.viewColor}>
                <Text style={styles.textColor}> Login </Text>
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Name" 
                placeholderTextColor="#afafaf"
                onChangeText={(text) => this.setState({userName : text})}
                />
                
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Password" 
                placeholderTextColor="#afafaf"
                secureTextEntry={true}
                 onChangeText={(text) => this.setState({password : text})}
                />

               {/* {
                this.state.data.map((item, index) => (
                  <TouchableOpacity
                     key = {item}
                     style = {styles.container}
                     onPress = {() =>  Alert.alert(item.message)}>
                     <Text style = {styles.text}>
                        {item.message}
                     </Text>
                  </TouchableOpacity>
               ))
               } */}

                <TouchableOpacity 
                onPress={()=> this.loginGetApi(  this.state.userName,   this.state.password) } 
                style={styles.button}>
                <Text style={styles.buttonStyle}>Login</Text>
                </TouchableOpacity>
          </View>
         {/* </ScrollView>  
          </SafeAreaView> */}
            </>
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
    backgroundColor: Colors.lighter,
  }

});

export default Login
