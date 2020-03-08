import React, { Component } from 'react'
import { Text, View ,StyleSheet,TextInput,Button,Alert,TouchableHighlight,TouchableOpacity,ActivityIndicator,
FlatList,SafeAreaView, ScrollView,BackHandler} from 'react-native'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Actions } from 'react-native-router-flux'
import SendSMS from 'react-native-sms'
import { openDatabase } from 'react-native-sqlite-storage';
import ActionBarImage from '../components/ActionBarImage'
var db = openDatabase({ name: 'DSchool.db' });
export class CustomerList extends Component {

static navigationOptions =
   {
      title: 'Home',
 
      headerRight : <ActionBarImage />,
 
      headerStyle: {
 
  backgroundColor: '#4b964b'
 
    },
 
    headerTintColor: '#fff', 
   };


  constructor(props) {
    super(props)

     this.state ={   
       userName: '',
       password: '',
       backHandler:'',
       dataSource:[],
       animating:true,
       isLoading: true,
       };
  
const constThis=this;
      db.transaction((txn)=> {
           
        txn.executeSql("SELECT * FROM customer_reg",[],(tx, res)=>{
          console.log('item:', res.rows.length);
          
          if (res.rows.length != 0) {
            var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
         console.log('temp:',temp);
            constThis.setState({
              isLoading:false,
              animating:false,
          dataSource: temp,
          }); 
          console.log('dataSource:', this.state.dataSource);
          }else{
            console.log("No data" )
            console.log( " datasource1 " ) 
            constThis.setState({
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
       
      //  handleBackPress(backHandler){
      //    console.log("backHandler :" +backHandler);
      //    Actions.userList(onBack=()=>

      //    )
    // return true; 
      //  }

      sendSms(){
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

   newDriver(){
Actions.customerRegistration()
   }

    render() {
const animating = this.state.animating
      
        return (
          <View style={styles.viewColor}>
              <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <View>
             <TouchableOpacity 
    style={styles.button}
    onPress={()=>this.newDriver() }>
      <Text style={styles.buttonStyle}>New Customer Add</Text>
    </TouchableOpacity>

          <ActivityIndicator animating={animating}/>
        {this.state.dataSource.map((item, index) => (
              <TouchableOpacity
              style = {styles.listStyle}
                key = {item}
                onPress = {() =>  Alert.alert(item.user_id.toString())}>
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
                </View>
              </TouchableOpacity>
          ))
        }

  {/* <FlatList
                data={this.state.dataSource}
                renderItem={({item}) => 
                <Text>{item.user_id}</Text>
                }
                keyExtractor={({id}, index) => id}
              /> */}

            </View>
                     </ScrollView>  
          </SafeAreaView>
          </View>
        )
    }
}

const styles=StyleSheet.create({
viewColor:{
    alignContent:"center",
    // justifyContent:"center",
    backgroundColor:"#FFFFFF",
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

    fontSize:15,
    textAlign:"center",
    color:"#FFFFFF",
    borderWidth:0,
    borderColor:"#FFFFFF"
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
    borderColor:"#FFFFFF"
  },
  container:{
    borderColor:"#FFFFFF",
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 1.84,
elevation: 1,
padding:10,
  },
  textDate:{
     textAlign:"right",
  },

listStyle:{
    // borderColor:"#FFFFFF",
    shadowColor: "#d0d0d0",
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 2,
margin:3,
  },
});

export default CustomerList
