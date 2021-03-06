import React from 'react'
import { TouchableOpacity,Text,View,ScrollView,FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase'

export default class MyTradesScreen extends React.Component{
    constructor(){
        super();
        this.state={
            allTrades:[],
        };
    }

    componentDidMount=async()=>{
        this.getTrades();
    }

    getTrades=()=>{
        db.collection('Trades').where('donorid','==',firebase.auth().currentUser.email).onSnapshot((snapshot)=>{
            var dt= snapshot.docs.map(document=>document.data())
            this.setState({
                allDonations:dt
            })
        })
    }

    render(){
        return(
            <ScrollView>
               
    
    <FlatList  data={this.state.allTrades}
         renderItem={({item,index})=>(
            <View key={index} style={{backgroundColor:'red',borderWidth:2,marginTop:10}}>
                  <Text>{"Address: "+item.address}</Text>
                  <Text>{"Book Name: "+item.bookname} </Text>
                  <Text>{"EmailID: "+item.emailid}</Text>
                  <Text>{"PhoneNo: "+item.phone_no}</Text>
                  <TouchableOpacity>
                      <Text>Send Book</Text>
                  </TouchableOpacity>
             </View>
         )} keyExtractor={(item,index)=>{
           index.toString();
         }} 
         onEndReachedThreshold={0.6}/>
            </ScrollView>
        )
    }
}
