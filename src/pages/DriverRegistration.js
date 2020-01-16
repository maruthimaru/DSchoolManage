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
import UserList from './UserList'
import { openDatabase } from 'react-native-sqlite-storage';
import ActionBarImage from '../components/ActionBarImage'
var db = openDatabase({ name: 'DSchool.db' });

export class DriverRegistration extends Component {

static navigationOptions =
   {
      title: 'Home',
 
      headerRight : <ActionBarImage />,
 
      headerStyle: {
 
      backgroundColor: '#FFf'
 
    },
 
    headerTintColor: '#000',
 
   };


  constructor(props) {
    super(props)
  
  db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='driver_reg'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS driver_reg', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS driver_reg(user_id INTEGER PRIMARY KEY AUTOINCREMENT,'+
               'user_name VARCHAR(225), age VARCHAR(225),licence_number VARCHAR(225),phone_number VARCHAR(225),'+
               'status VARCHAR(225), password VARCHAR(255))',
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
       age: '',
       licenceNumber: '',
       phoneNumber: '',
       status: 'active',
       password: '',
       isLoading: true}

       //insert
insert=(user_name,age,licenceNumber,phoneNumber,status,password)=>{
  console.log("username : "+user_name +" pass "+ password)
       db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO driver_reg(user_name, age,licence_number,phone_number,status,password) VALUES (?,?,?,?,?,?)',
              [user_name,age,licenceNumber,phoneNumber,status, password],
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
                           Actions.driverList() ,
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

    render() {
      // console.log(this.state.data)


        return (
      
       <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}> 
            <View style={styles.viewColor}>
                <Text style={styles.textColor}> Driver Registration </Text>
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Name" 
                placeholderTextColor="#afafaf"
                onChangeText={(text) => this.setState({userName : text})}
                />
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Age" 
                placeholderTextColor="#afafaf"
                onChangeText={(text) => this.setState({age : text})}
                />
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Licence Number" 
                placeholderTextColor="#afafaf"
                onChangeText={(text) => this.setState({licenceNumber : text})}
                />
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Phone Number" 
                placeholderTextColor="#afafaf"
                onChangeText={(text) => this.setState({phoneNumber : text})}
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
                onPress={()=> this.insert(  this.state.userName,this.state.age,this.state.licenceNumber, 
                this.state.phoneNumber,this.state.status,this.state.password) } 
                style={styles.button}>
                <Text style={styles.buttonStyle}>Register</Text>
                </TouchableOpacity>
          </View>
          </ScrollView>  
          </SafeAreaView> 
          
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

export default DriverRegistration
