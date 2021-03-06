import React, { Component } from 'react'
import { Text, View ,StyleSheet,TextInput,Button,Alert,TouchableHighlight,TouchableOpacity,ActivityIndicator,ImageBackground,
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
              'CREATE TABLE IF NOT EXISTS login(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(225),' +
              'password VARCHAR(255), type VARCHAR(255), trainer_id VARCHAR(255), customer_id VARCHAR(255), customer_name VARCHAR(255),image VARCHAR(255))',
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
       isLoading: true,
       isAdmin: false}

       //insert
insert=(user_name,password,loginType,trainer_id,user_id,customer_name,image)=>{
  console.log("username : "+user_name +" pass "+ password +" loginType "+loginType+"trainer_id "+trainer_id)
       db.transaction((tx)=> {
            tx.executeSql(
              'INSERT INTO login(user_name, password,type,trainer_id,customer_id,customer_name,image) VALUES (?,?,?,?,?,?,?)',
              [user_name, password,loginType,trainer_id,user_id,customer_name,image],
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
                          // this.setState({isAdmin: true});
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
    //   return fetch(url)
 
    // .then((response) => response.json())
    // .then((responseJson) => {
    //     //  Alert.alert(responseJson.message)
    //     if (responseJson.status) {
    //       this.insert(userName,password,"Admin","","")
    //     }else{
    //       this.checkDriver(userName,password)
            
    //     }
    //     // console.log(responseJson)
    //     // this.props.navigation.navigate('UserList')
    //   return responseJson.status;
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
    if (userName=="admin" && password=="admin") {
          this.insert(userName,password,"Admin","","","","")
        }else{
          this.checkDriver(userName,password)
            
        }
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
            var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
         console.log('DriverDetails:',temp[0].driver_id);
            
           this.insert(userName,password,"Driver",temp[0].driver_id,"",temp[0].user_name,temp[0].image)
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
     var date1 = new Date();
    
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
          
        txn.executeSql("SELECT * FROM customer_reg where phone_number='"+
        userName+"' and password ='"+password+"'"
        ,[],(tx, res)=>{
          console.log('cus item:', res.rows.length);
          
          if (res.rows.length != 0) {
                var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
        var date2 = new Date(temp[0].due_date);
         console.log('customer details:',temp[0].due_date);
        var same = date1.getTime() <= date2.getTime();
        console.log("same : " +same);
        
    // var notSame = date1.getTime() >= date2.getTime();
    if(same || temp[0].due_date==null){
           this.insert(userName,password,"Cusomer",temp[0].trainerId,temp[0].user_id,temp[0].user_name,temp[0].image)
    }else{
      Alert.alert("Invalid login")
    }
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
        // if (this.state.isAdmin) {
        //   return(
        //                    <View  style={{flex:1}}>
        //                     <Routes/>
        //                     </View>)
        // }


        return (
      <>
      {/* <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}> */}
            {/* <ImageBackground style= { styles.backgroundImage } source={require("../images/bg.png")}> */}
<View style={styles.viewColor}>
                <Text style={styles.textColor}> Login </Text>
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Name / Number"
                placeholderTextColor="#dbdbdb"
                onChangeText={(text) => this.setState({userName : text})}
                />
                
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Password" 
                placeholderTextColor="#dbdbdb"
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
          {/* </ImageBackground> */}
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
    backgroundColor:"#FFFFFF",
    flex:1
},
textColor:{
    fontSize:25,
    textAlign:"center",
    color:"#439243"
},
textInputStyle:{
    margin:20,
    paddingLeft:5,
    paddingRight:5,
    color:"#439243",
    borderColor:"#dbdbdb",
    borderWidth:0.5,
    borderRadius:10,
    
},
buttonStyle:{
    fontSize:15,
    textAlign:"center",
    color:"#fff",
    borderWidth:0,
    borderColor:"#FFFFFF",
    // backgroundColor:'#5fc25f',
    
},
 button: {
    alignItems: 'center',
    backgroundColor: '#5fc25f',
    height:35,
    margin:20,
      borderRadius:10,
      justifyContent:"center",

  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  backgroundImage:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    },

});

export default Login
