import React, { Component } from 'react'
import { Text, View ,StyleSheet,TextInput,Button,Alert,TouchableHighlight,
TouchableOpacity,ActivityIndicator,Modal,Image,
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
         Alert_Visibility: false,
         selectedItem:{},
         licenceNumber:'',
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

     cancelAlertBox(visible,context) {
    context.setState({ Alert_Visibility: visible });
  }
  okButton = () => {
var context=this
    var item=context.state.selectedItem
    console.log(item);
    const lcnumber=context.state.licenceNumber
    if(lcnumber==''){
      alert("licence number should not be empty!");
    }else{
 item.licence_number=lcnumber
 context.update(lcnumber,item)
    }
    
  }

  //insert
update=(licenceNumber,item)=>{
  var currentDate = new Date();
  var day = currentDate.getDate()
var month = currentDate.getMonth() + 1
var year = currentDate.getFullYear()
  var dayAfterDate=new Date(new Date().getTime() + 48 * 60 * 60 * 1000);

  console.log("dayAfterDate" +dayAfterDate);
  
       db.transaction((tx)=> {
            tx.executeSql(
              'UPDATE customer_reg SET licence_number="'+licenceNumber+'",due_date="'+dayAfterDate+'" where user_id='+item.user_id,
              [],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are Update Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>{
                          this.setState({
                            Alert_Visibility:false,
                          })
                          
                          SendSMS.send({
        //Message body
        body: "From Driving school, Please come and get your licence in our office" ,
        //Recipients Number
        recipients: [item.phone_number],
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


editDriver(item) {
  Actions.customerUpdate({item: item});
}


delete(selecteditem) {
  Alert.alert('Customer List', 'Are you sure want to Delete?', [
    {text: 'No'},
    {
      text: 'Yes',
      onPress: () => {
        db.transaction(txn => {
          txn.executeSql(
            'DELETE FROM customer_reg where user_id=?',
            [selecteditem.user_id],
            (tx, res) => {
              console.log('item:', res.rows.length);
              const filteredData = this.state.dataSource.filter(
                item => item.user_id !== selecteditem.user_id,
              );
              this.setState({
                dataSource: filteredData,
              });
            },
          );
        });
      },
    },
  ]);
}

  SearchList(name) {
    var constThis = this;
    console.log('name : ' + name);
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='customer_reg'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length > 0) {
            db.transaction(txn => {
              txn.executeSql(
                "SELECT * FROM customer_reg where user_name LIKE '" +
                name +
                  "' or phone_number LIKE '" +
                  name +
                  "'",
                [],
                (tx, res) => {
                  console.log('item:', res.rows.length);
                  if (res.rows.length > 0) {
                    var temp = [];
                    for (let i = 0; i < res.rows.length; ++i) {
                      temp.push(res.rows.item(i));
                    }
                    constThis.setState({
                      isLoading: false,
                      animating: false,
                      dataSource: temp,
                    });
                  } else {
                    alert('No Data found')
                  }
                },
              );
            });
          }
        },
      );
    });
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

 <Modal
          visible={this.state.Alert_Visibility}
          transparent={false}
          animationType={"fade"}
          style={{backgroundColor:'#00000000'}}
          onRequestClose={() => { this.cancelAlertBox(!this.state.Alert_Visibility,this) }} >

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: "#00000000",  }}>

            <View style={styles.MainAlertView}>

              <Text style={styles.AlertTitle}>Custom Alert Dialog Box Title.</Text>
              <View style={{ width: '100%', height: 0.5, backgroundColor: '#fff' }} />

              <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Licence Number" 
                placeholderTextColor="#afafaf"
                onChangeText={(text) => this.setState({licenceNumber : text})}
                />

              <View style={{ width: '100%', height: 0.5, backgroundColor: '#fff' }} />

              <View style={{ flexDirection: 'row', height: '30%' }}>
                <TouchableOpacity style={styles.AlertbuttonStyle} onPress={this.okButton} activeOpacity={0.7} >
                  <Text style={styles.TextStyle}> OK </Text>
                </TouchableOpacity>

                <View style={{ width: 0.5, height: '100%', backgroundColor: '#fff' }} />

                <TouchableOpacity style={styles.AlertbuttonStyle} onPress={() => { this.cancelAlertBox(!this.state.Alert_Visibility,this) }} activeOpacity={0.7} >
                  <Text style={styles.TextStyle}> CANCEL </Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>

        <TextInput 
            style={styles.textSearchInputStyle}
            placeholder="Search Name/number" 
            onChangeText={(text)=> this.setState({searchId: text})}
            />
            <TouchableOpacity 
            onPress={()=> this.SearchList(this.state.searchId)}
            style={styles.button}>
            <Text style={styles.searchButtonStyle}> Search </Text>
            </TouchableOpacity>

             <TouchableOpacity 
    style={styles.button}
    onPress={()=>this.newDriver() }>
      <Text style={styles.buttonStyle}>New Customer Add</Text>
    </TouchableOpacity>

          <ActivityIndicator animating={animating}/>
        {this.state.dataSource.map((item, index) => (
          <CustomView  item={item} context={this}/> 
              
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


const CustomView=({item,context})=>{
console.log({uri: "data:image/png;base64,"+item.image});
var ImageURL = "data:image/gif;base64,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";
return(
<TouchableOpacity
              style = {styles.listStyle}
                key = {item}
                onPress = {() =>{context.cancelAlertBox(true,context)
                context.setState({selectedItem:item})
                } }>
                <View style = {styles.container}>
                <View  style={styles.image_item}>
                                {/*<Image
                                 source = { item.image
                                  ? 
                               
                                   {uri: `data:image/gif;base64,${item.image}`}
                                  
                                  : 
                                  require('../images/avatar_image.png')}
                                style={styles.image}/>*/}
                               
                                 <Image
                                 source = {{uri: "data:image/png;base64,"+item.image}}
                                style={styles.image}/>
                        
                            </View>
                <View style = {styles.content}>
                <TouchableOpacity
                    onPress={() => context.editDriver(item)}
                    style={styles.listStyleEdit}
                    key={item}>
                    <Image
                      style={styles.imageEdit}
                      source={require('../images/edit.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => context.delete(item)}
                    style={styles.listStyleTrash}
                    key={item}>
                    <Image
                      style={styles.imageTrash}
                      source={require('../images/trash.png')}
                    />
                  </TouchableOpacity>
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
                </View>
              </TouchableOpacity>

)
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
searchButtonStyle:{

  fontSize:15,
  textAlign:"center",
  color:"#FFFFFF",
  borderWidth:0,
  borderColor:"#FFFFFF"
},
image: {
        // flex:1,
        width: 64,
        height: 64,
        // aspectRatio: 1.5, 
        borderRadius: 150 / 2,
        overflow: "hidden",
        // borderWidth: 1,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderColor: "#422F86",
        marginBottom: 10,
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
flexDirection:'row',
  },
  content:{
    borderColor:"#FFFFFF",
    // shadowColor: "#000",
padding:10,
flex: 1,
flexDirection:'column',
  },
  textDate:{
     textAlign:"right",
  },
  textDate:{
    //  textAlign:"right",
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
textSearchInputStyle:{
  margin:5,
  paddingLeft:5,
  paddingRight:5,
  color:"#439243",
  borderColor:"#dbdbdb",
  borderWidth:0.5,
  borderRadius:10,
  
},
listStyleEdit: {
  // backgroundColor: Colors.lighter,
  shadowColor: '#d0d0d0',
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 2,
  // margin: 3,
  // position: 'absolute',
  alignSelf: 'flex-end',
  width: 24,
  height: 24,
  marginRight: 33,
  // padding: 10,
},
listStyleTrash: {
  // backgroundColor: Colors.lighter,
  shadowColor: '#d0d0d0',
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 2,
  margin: 3,
  position: 'absolute',
  alignSelf: 'flex-end',
  width: 24,
  height: 24,
  top: 10,
  // padding: 10,
},
imageEdit: {
  width: 24,
  height: 24,
  marginRight: 33,
},
imageTrash: {
  width: 24,
  height: 24,
  marginRight: 3,
},
});

export default CustomerList
