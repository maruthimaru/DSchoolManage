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
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'DSchool.db' });
export class CustomerList extends Component {


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
  
      db.transaction((txn)=> {
           
        txn.executeSql("SELECT * FROM customer_reg",[],(tx, res)=>{
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
          dataSource: temp,
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

   newDriver(){
Actions.customerRegistration()
   }

    render() {
const animating = this.state.animating
      
        return (
              <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <View>
             <TouchableOpacity 
    style={styles.button}
    onPress={()=>this.newDriver() }>
      <Text>New Customer Add</Text>
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
                <Text style = {styles.textDate}>
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
   justifyContent:"center",
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height:35,
    margin:20,
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

export default CustomerList
