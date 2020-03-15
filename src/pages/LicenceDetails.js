import React, { Component } from 'react'
import { Text, View ,StyleSheet,TextInput,Button,Alert,TouchableHighlight,
TouchableOpacity,ActivityIndicator,Modal,
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
       dataSource:{},
       animating:true,
       isLoading: true,
         Alert_Visibility: false,
         selectedItem:{},
         licenceNumber:'',
       };
  
const constThis=this;
console.log("global.customerId : "+global.customerId);

      db.transaction((txn)=> {
           
        txn.executeSql("SELECT * FROM customer_reg where user_id="+global.customerId,[],(tx, res)=>{
          console.log('item:', res.rows.length);
          
          if (res.rows.length != 0) {
            var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
         console.log('temp:',temp[0]);
         // this.cancelAlertBox(true)
 if( temp[0].licence_number!=null &&  temp[0].licence_number!=''){
   constThis.setState({
              isLoading:false,
              animating:false,
          dataSource: temp[0],
          Alert_Visibility: true
          }); 
 }else{
constThis.setState({
              isLoading:false,
              animating:false,
          dataSource: temp[0],
          }); 
 }
        
            
          console.log('dataSource:', this.state.dataSource);
          // return this.state
          }else{
            console.log("No data" )
            console.log( " datasource1 " ) 
            constThis.setState({
          isLoading: true,
          animating:true,
          dataSource: {},
          });
          console.log( " datasource " + this.state.dataSource) 
          // return this.state
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

     cancelAlertBox(visible) {
    this.setState({ Alert_Visibility: visible });

    if(!visible){
      Actions.homeCustomer()
    }
  }
  okButton = () => {

  }

    render() {
const animating = this.state.animating
      const item=this.state.dataSource
      console.log( " datasource4 " ) 
      console.log(item.licence_number);
      
      if(item.licence_number!=null && item.licence_number!=''){
        
        return (
          <View style={styles.viewColor}>
              <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <View>

 <Modal
          visible={this.state.Alert_Visibility}
          transparent={false}
          animationType={"fade"}
          style={{backgroundColor:'#00000000'}}
          onRequestClose={() => { this.cancelAlertBox(!this.state.Alert_Visibility) }} >

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: "#00000000",  }}>

            <View style={styles.MainAlertView}>

              <Text style={styles.AlertTitle}>Custom Alert Dialog Box Title.</Text>
              <View style={{ width: '100%', height: 0.5, backgroundColor: '#fff' }} />

              <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Licence Number" 
                placeholderTextColor="#afafaf"
                value={item.licence_number}
                editable={false}
                onChangeText={(text) => this.setState({licenceNumber : text})}
                />

              <View style={{ width: '100%', height: 0.5, backgroundColor: '#fff' }} />

              <View style={{ flexDirection: 'row', height: '30%' }}>
                <TouchableOpacity style={styles.AlertbuttonStyle} onPress={this.okButton} activeOpacity={0.7} >
                  <Text style={styles.TextStyle}> OK </Text>
                </TouchableOpacity>

                <View style={{ width: 0.5, height: '100%', backgroundColor: '#fff' }} />

                <TouchableOpacity style={styles.AlertbuttonStyle} onPress={() => { this.cancelAlertBox(!this.state.Alert_Visibility) }} activeOpacity={0.7} >
                  <Text style={styles.TextStyle}> CANCEL </Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>

            
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
      }else{
        return(
<View style={{flex:1,justifyContent:'center'}}>

<Text style={{textAlign:'center'}}>Licence not yet received</Text>

</View>
        )
      }
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

   MainAlertView: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#d0d0d0", 
      height: 200,
      width: '90%',      
      borderColor: '#fff',
      borderRadius:10,
    },
    AlertTitle: {
      fontSize: 25,
      color: "#fff",
      textAlign: 'center',
      padding: 10,
      height: '28%'
    },
    AlertMessage: {
      fontSize: 22,
      color: "#fff",
      textAlign: 'center',
      textAlignVertical: 'center',
      padding: 10,
      height: '40%'
    },
    AlertbuttonStyle: {
      width: '50%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    TextStyle: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 22,
      marginTop: -5
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
});

export default CustomerList
