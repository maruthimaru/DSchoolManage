import React, { Component } from 'react'
import { Text, View ,StyleSheet,TextInput,Button,Alert,TouchableHighlight,TouchableOpacity,ActivityIndicator,
FlatList,SafeAreaView, ScrollView} from 'react-native'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
import { Actions } from 'react-native-router-flux'
import HomeAdmin from './HomeAdmin'
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
              'CREATE TABLE IF NOT EXISTS login(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(225), password VARCHAR(255), type VARCHAR(255))',
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
insert=(user_name,password,loginType)=>{
  console.log("username : "+user_name +" pass "+ password +" loginType "+loginType)
       db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO login(user_name, password,type) VALUES (?,?,?)',
              [user_name, password,loginType],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are Registered Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>{
                          if (loginType=="Admin") {
                           Actions.homeAdmin() 
                          }else if(loginType=="Driver"){
                          Actions.homeDriver() 
                          }else{
                          Actions.homeCustomer()         
                          }
                           
                         } ,
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
          this.insert(userName,password,"Admin")
        }else{
          this.checkDriver(userName,password)
            
        }
        // console.log(responseJson)
        // this.props.navigation.navigate('UserList')
      return responseJson.status;
    })
    .catch((error) => {
      console.error(error);
    });
   }

   checkDriver(userName,password){
       console.log(userName +" pass "+ password )
      db.transaction((txn)=> {
           txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='driver_reg'",
        [],
        (tx, res)=> {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
             this.checkCustomer(userName,password)
            console.log("table created")
          }else{
            console.log("already table created")
       var query="SELECT * FROM driver_reg where phone_number='"+userName+"' and password ='"+password+"'"
       console.log(query);
       
        txn.executeSql("SELECT * FROM driver_reg where phone_number='"+userName+"' and password ='"+password+"'"
        ,[],(tx, res)=>{
          console.log('item:', res.rows.length);
          
          if (res.rows.length != 0) {
           this.insert(userName,password,"Driver")
          }else{
            console.log("No data" )
           this.checkCustomer(userName,password)
          }
        }).catch(err =>{
        console.log("error : "+err);
        
        });
        }
         }
      );
              });
   }
   checkCustomer(userName,password){
       console.log(userName +" pass "+ password )
      db.transaction((txn)=> {
           txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='customer_reg'",
        [],
        (tx, res)=> {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            Alert.alert("Invalid login")
            console.log("table created")
          }else{
          
        txn.executeSql("SELECT * FROM customer_reg where phone_number='"+userName+"' and password ='"+password+"'"
        ,[],(tx, res)=>{
          console.log('item:', res.rows.length);
          
          if (res.rows.length != 0) {
           this.insert(userName,password,"Cusomer")
          }else{
            console.log("No data" )
           Alert.alert("Invalid login")
          }
        });
           }
        }
      );
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
                placeholder="Enter Name / Number"
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
