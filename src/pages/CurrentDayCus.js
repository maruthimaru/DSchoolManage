import React, { Component } from 'react'
import { Text, View,TextInput,TouchableOpacity,StyleSheet,Alert,ActivityIndicator } from 'react-native'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Actions } from 'react-native-router-flux'
import { openDatabase } from 'react-native-sqlite-storage';
import ActionBarImage from '../components/ActionBarImage'
import SendSMS from 'react-native-sms'
import moment from 'moment';
var db = openDatabase({ name: 'DSchool.db' });

// var date = new Date().getDate();
//       var month = new Date().getMonth() + 1;
//       var year = new Date().getFullYear();
//       var currentDate= date + '-' + month + '-' + year;

        //Getting the current date-time with required formate and UTC   
    var currentDate = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD');

      var currentTime = moment()
      .utcOffset('+05:30')
      .format('hh:mm a');

export class CurrentDayCus extends Component {


static navigationOptions =
   {
      title: 'Customer Attendance',
 
      headerRight : <ActionBarImage />,
 
      headerStyle: {
 
        backgroundColor: '#4b964b'
 
    },
 
    headerTintColor: '#fff',
 
   };
    constructor(props) {
      super(props)

      this.state={
    searchId:'',
    trainerId:'',
    animating:true,
    dataSource:[],
    totalDay:0,
}


//creating today customer table
  db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='today_customer_reg'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS today_customer_reg', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS today_customer_reg(user_id INTEGER PRIMARY KEY AUTOINCREMENT,'+
               'user_name VARCHAR(225), age VARCHAR(225), address VARCHAR(225), llr_number VARCHAR(225),'+
               'licence_number VARCHAR(225), phone_number VARCHAR(15),'+
               'status VARCHAR(225), password VARCHAR(255), trainerId VARCHAR(255),selected_slot VARCHAR(255),'+
               'date VARCHAR(255),start VARCHAR(255),end VARCHAR(255))',
              []
            );
            console.log("table created")
          }else{
            console.log("already table created")
          }
        }
      );
    });

//getting data from the login
      db.transaction((txn)=> {
           
        txn.executeSql("SELECT * FROM login",[],(tx, res)=>{
          console.log('item:', res.rows.length);
          
          if (res.rows.length != 0) {
            var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
        this.setState({
          trainerId:temp[0].trainer_id,
        })
        this.CurrentList(temp[0].trainer_id)
          }
        });
              });
    };

    CurrentList(trainer_id){
        console.log(" currentDate: "+currentDate + "trainer_id "+trainer_id);
      db.transaction((txn)=> {
           
        txn.executeSql("SELECT * FROM today_customer_reg where trainerId='"+trainer_id+"' and date='"+currentDate+"'",[],(tx, res)=>{
          console.log('item:', res.rows.length);
          
          if (res.rows.length != 0) {
            var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
         console.log('temp:',temp);
            this.setState({
              isLoading:false,
                animating:false,
          dataSource: temp,
          }); 
          console.log('dataSource:', this.state.dataSource);
          }else{
            console.log("No data" )
            console.log( " datasource1 " ) 
            this.setState({
          isLoading: true,
            animating:true,
          dataSource: [],
          });
          console.log( " datasource " + this.state.dataSource) 
          }
        }
      );
              });

      }

     SearchList(id){
           
        console.log(" currentDate: "+currentDate);
console.log("id : "+id);
          db.transaction((txn)=> {
           txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='today_customer_reg'",
        [],
        (tx, res)=> {
          console.log('item:', res.rows.length);
          if (res.rows.length > 0) {
        
      db.transaction((txn)=> {
           console.log("SELECT * FROM today_customer_reg as tcr inner join customer_reg as cr on tcr.user_id = cr.user_id where tcr.user_id="+id +" and tcr.date='"+currentDate+"'");
           
        txn.executeSql("SELECT * FROM today_customer_reg as tcr inner join customer_reg as cr on tcr.user_id = cr.user_id where tcr.user_id="+id +" and tcr.date='"+currentDate+"'",[],(tx, res)=>{
          console.log('item:', res.rows.length);
          this.setState({
        totalDay:res.rows.length,

          })
          if (res.rows.length == 0) {
         console.log('Eligible to attend');
        console.log(res.rows.item);
        
        this.training(id)
          }else{
            alert("Today Training completed")
            console.log("Already attended" )
          }
        }
      );
              });
               }
         }
      );
              });

      }

      someFunction(number) {

           db.transaction((txn)=> {
           console.log("SELECT * FROM today_customer_reg as tcr inner join customer_reg as cr on tcr.user_id = cr.user_id where tcr.user_id="+id);
           
        txn.executeSql("SELECT * FROM today_customer_reg as tcr inner join customer_reg as cr on tcr.user_id = cr.user_id where tcr.user_id="+id,[],(tx, res)=>{
          console.log('item:', res.rows.length);
          if (res.rows.length==30) {
              SendSMS.send({
        //Message body
        body: "From Driving school, Today is your last training class completed" ,
        //Recipients Number
        recipients: [number],
        //An array of types that would trigger a "completed" response when using android
        successTypes: ['sent', 'queued']
    }, (completed, cancelled, error) => {
        if(completed){
          console.log('SMS Sent Completed');
        }else if(cancelled){
          console.log('SMS Sent Cancelled');
        }else if(error){
          console.log('Some error occured');
        }
    });
          }else if (res.rows.length>27) {
          var count=res.rows.length - 30
         console.log('number'+number +" count "+ count);
    SendSMS.send({
        //Message body
        body: "From Driving school, You have "+count +"more day's to complete" ,
        //Recipients Number
        recipients: [number],
        //An array of types that would trigger a "completed" response when using android
        successTypes: ['sent', 'queued']
    }, (completed, cancelled, error) => {
        if(completed){
          console.log('SMS Sent Completed');
        }else if(cancelled){
          console.log('SMS Sent Cancelled');
        }else if(error){
          console.log('Some error occured');
        }
    });
        }
        }
      );
              });

  }

      training=(id)=>{
        
 Alert.alert(
                    'Success',
                    'Training started Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>{
                          db.transaction((txn)=> {
           console.log("SELECT * FROM customer_reg where user_id="+id);
           
        txn.executeSql("SELECT * FROM customer_reg where user_id="+id,[],(tx, res)=>{
          console.log('item:', res.rows.length);
          
          if (res.rows.length > 0) {
            var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
this.someFunction(temp[0].phone_number)
          this.insert(temp[0].user_name,temp[0].age,temp[0].address,temp[0].llr_number,temp[0].licence_number,temp[0].phone_number
         ,temp[0].status,temp[0].password,temp[0].trainerId,temp[0].selected_slot,currentDate)
        
          }
        }
      );
              });
                        }
                      },
                    ],
                    { cancelable: true }
                  );
      }

//insert
insert=(user_name,age,address,llrNumber,licenceNumber,phoneNumber,status,password,trainerId,selectedSlot,date)=>{
  console.log("username : "+user_name +"age "+age +" llr "+llrNumber+" licence "+licenceNumber +" phone " 
  +phoneNumber+" status "+status+" pass "+ password+" selectedSlot "+selectedSlot)

  var currentTime = moment()
      .utcOffset('+05:30')
      .format('hh:mm a');

       db.transaction((tx)=> {
            tx.executeSql(
              'INSERT INTO today_customer_reg(user_name, age, address, llr_number,licence_number,phone_number,status,password,trainerId,selected_slot,date,start,end) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
              [user_name,age,address,llrNumber,licenceNumber,phoneNumber,status, password,trainerId,selectedSlot,date,currentTime,""],
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
                           this.CurrentList(this.state.trainerId)
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

//update
update=(singleItem)=>{

  var currentTime = moment()
      .utcOffset('+05:30')
      .format('hh:mm a');
  Alert.alert(
                    'End',
                    'Are you sure want to end!',
                    [
                      {
                        text: 'Yes',
                        onPress: () =>{
                           db.transaction((tx)=> {
            tx.executeSql(
              'UPDATE today_customer_reg set end=? where user_id=?',
              [currentTime,singleItem.user_id],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are Updated end time',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                           this.CurrentList(this.state.trainerId)
                      },
                    ],
                    { cancelable: true }
                  );
                } else {
                  alert('Update Failed');
                }
              }
            );
          });
                         } ,
                      }, {
                        text: 'No',
                        onPress: () =>{
                           
                         } ,
                      }
                    ],
                    { cancelable: false }
                  );
}
    render() {
      const animating = this.state.animating
        return (
            <View>

            <TextInput 
            style={styles.textInputStyle}
            placeholder="Search User Id" 
            onChangeText={(text)=> this.setState({searchId: text})}
            />
            <TouchableOpacity 
            onPress={()=> this.SearchList(this.state.searchId)}
            style={styles.button}>
            <Text style={styles.buttonStyle}> Search </Text>
            </TouchableOpacity>

             <ActivityIndicator animating={animating}/>
        {this.state.dataSource.map((item, index) => (
              <TouchableOpacity
              style = {styles.listStyle}
                key = {item}
                onPress = {() =>  this.update(item)}>
                <View style = {styles.container}>
                <Text style = {styles.text}>
                    {item.user_name}
                </Text>
                <Text style = {styles.text}>
                    {item.address}
                </Text>
                {/* <Text style = {styles.text}>Slot : 
                    {item.selected_slot}
                </Text> */}
                <Text style = {styles.textDate}>Ph:
                    {item.phone_number}
                </Text>

                <Text style = {styles.textDate}>Training: {item.start} - {item.end}
                </Text>
                </View>
              </TouchableOpacity>
          ))
        }
                
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
    marginLeft:20,
    marginTop:20,
    marginRight:20,
    paddingLeft:5,
    paddingRight:5,
    color:"#000000",
    borderColor:"#a6a6a6",
    borderWidth:1,
    borderRadius:10,
    
},
buttonStyle:{

   fontSize:16,
    textAlign:"center",
    color:"#fff",
    borderWidth:0,
    borderColor:"#FFFFFF",
    padding: 5,
    // backgroundColor:'#5fc25f',
},
 button: {
   justifyContent:"center",
    alignItems: 'center',
    backgroundColor: '#5fc25f',
    height:35,
    margin:20,
  borderRadius:10,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container:{
    backgroundColor: Colors.lighter,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
paddingLeft:5,
paddingRight:5,
  },
  textDate:{
     textAlign:"right",
  },

listStyle:{
    backgroundColor: Colors.lighter,
    shadowColor: "#d0d0d0",
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 2,
margin:3,
  },
});


export default CurrentDayCus
