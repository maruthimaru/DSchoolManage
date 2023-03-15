import React, { Component } from 'react'
import { Text, View ,StyleSheet,TextInput,Button,Alert,TouchableHighlight,TouchableOpacity,ActivityIndicator,
FlatList,SafeAreaView, ScrollView,BackHandler,Image} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { openDatabase } from 'react-native-sqlite-storage';
import ActionBarImage from '../components/ActionBarImage'
var db = openDatabase({ name: 'DSchool.db' });
export class DriverList extends Component {

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
       isLoading: true,
       animating:true,
       };
  
      db.transaction((txn)=> {
           
        txn.executeSql("SELECT * FROM driver_reg",[],(tx, res)=>{
          console.log('item:', res.rows.length);
          
          if (res.rows.length != 0) {
            var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
        //  console.log('temp:',temp);
            this.setState({
              isLoading:false,
                animating:false,
          dataSource: temp,
          }); 
          // console.log('dataSource:', this.state.dataSource);
          }else{
            console.log("No data" )
            console.log( " datasource1 " ) 
            this.setState({
          isLoading: true,
            animating:true,
          
          });
          // console.log( " datasource " + this.state.dataSource) 
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
Actions.driverRegistration()
   }

  editDriver(item) {
    Actions.driverUpdate({item: item});
  }

  
  delete(selecteditem) {
    Alert.alert('Driver List', 'Are you sure want to Delete?', [
      {text: 'No'},
      {
        text: 'Yes',
        onPress: () => {
          db.transaction(txn => {
            txn.executeSql(
              'DELETE FROM driver_reg where user_id=?',
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
      <Text style={styles.buttonStyle}>New Driver Add</Text>
    </TouchableOpacity>
  
          <ActivityIndicator animating={animating}/>
        {this.state.dataSource.map((item, index) => (
          
             <CustomView  item={item} context ={this}/> 
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
                onPress = {() =>  Alert.alert(item.user_id.toString())}>
                <View style = {styles.container}>
        <View style={styles.image_item}>
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
                <Text style = {styles.text}>Licence:
                    {item.licence_number}
                </Text>
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
buttonStyle:{

    fontSize:15,
    textAlign:"center",
    color:"#FFFFFF",
    borderWidth:0,
    borderColor:"#FFFFFF"
},
 button: {
    alignItems: 'center',
    justifyContent:"center",
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
	height: 1,
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
    flex: 1,
padding:10,
flexDirection:'column',
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

export default DriverList
