import React,{Component} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import {Header} from 'react-native-elements';


export default class HomeScreen extends Component{

constructor(){  
super();
this.state={
text:"",
isSearchPressed : '',
word: '', definition: '', phonetics: ''
}
}

/*getWord=(word)=>{
var searchKeyword= word.toLowerCase()
var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+"json"
return fetch(url).then((data)=>{
if(data.status===200)
{
return data.json()
}
else {
return null
}
})
.then((response)=>{
var responseObject= response

if(responseObject){
var wordData = responseObject.definitions[0];
var definition=wordData.description;
var lexicalCategory=wordData.wordtype;

this.setState({
"word":this.state.text,
"definition": definition,
"lexicalCategory": lexicalCategory
})
} else {
this.setState({
"word":this.state.text,
"definition":"Not Found",
})
}

})

}*/

getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' +word;
    return fetch(url).then((data) => {
    return data.json();
    })
      .then((response) => {
      var responseObject= response
   
        var word = response[0].word;
        var definition = response[0].meanings[0].definitions[0].definition;
        var lexicalCategory=response[0].word;
        
        /*trim allows an operating system to inform a solid-state drive*/ 
        this.setState({
        word: word.trim(),
        definition: definition.trim(),
        })
      });
  };

render(){
  return (
<View style={styles.container}>
     <Header backgroundColor ={'turquoise'} 
      centerComponent = {{text:'Pocket Dictionary', style : {color:'black', fontSize:20, fontFamily:'times new roman'}}}/> 

    <TextInput style = {styles.inputBox} placeholder = "Enter a word"onChangeText = {text=>{
      this.setState({text:text, isSearchPressed:false,word:"Loading...",lexicalCategory:'', examples:[], definition:""});
    }} 
     value= {this.state.text}/>
     <TouchableOpacity style = {styles.searchbutton} onPress = {()=>{
      this.setState({isSearchPressed:true});
      this.getWord(this.state.text)
      }}>
      <Text style = {styles.buttontext}> Search </Text> 
      </TouchableOpacity>
 
<View style = {styles.detailsContainer}>
<Text style = {styles.detailsTitle}> Word :{""} </Text>
<Text style = {{fontSize:18}}> {this.state.word} </Text>
</View>

<View style = {{flexDirection:'row', flexWrap:'wrap'}}>
<Text style = {styles.detailsTitle}> Definition :{""} </Text>
<Text style = {{fontSize:18}}> {this.state.definition} </Text>
</View>


<Image 
      style ={{width :190,height:190,marginTop:100, margin:90, marginLeft:70}}
      source ={require ('../assets/book.png')}/>




</View>

  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
 inputBox: {
    width: "75%",
    height:30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#a1feff",
    marginTop:30,
    marginLeft:45,
    shadowColor: "turquoise",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

  searchbutton:{
   width:'30%',
  height:20,
  alignSelf:'center',
  padding:20,
  margin:15,
  borderRadius:3,
  textAlign:'center',
  fontSize:30,
  fontWeight: 'bold',
  },

  buttontext:{
  height:70,
  alignSelf:'center',
  marginTop:-20,
  borderRadius:6,
  textAlign:'center',
  fontSize:20,
  fontWeight: 'bold',
color:"#00a1a3",
  borderWidth:3,
  width:135,
  fontFamily:'quicksand'
  },

  detailsContainer:{
  fontWeight:'bold'
  },

  detailsTitle:{
  fontWeight:'bold',
  fontSize:18,
  color:'#00a1a3'
  }, 

  


});