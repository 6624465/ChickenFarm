import { StyleSheet } from 'react-native';
var styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //marginTop: 120,
        padding: 20,
        backgroundColor: '#ffffff',      
    },
    login_container: {
        flex: 1,
        justifyContent: 'center',
        //marginTop: 120,
        padding: 20,
        backgroundColor: '#ffffff',      
    },
    button_text:{
        color:'#fff', 
        fontWeight:'bold', 
        fontSize:18
    },
    touchableOpacity_text:{
        color:'blue',
        fontSize:15,
        fontWeight:'bold'
    },
    width_50_flex_end:{
        width:'50%', 
        alignItems:'flex-end'
    },
    width_50:{
        width:'50%'
    },
    flexDirectionWrap:{
        flexDirection:'row', 
        flexWrap:'wrap'
    },
    paddingtop_10:{
        paddingTop:'10%'
    },
    activeindicator:{
        flex: 1, 
        justifyContent:'center', 
        alignItems:'center'
    },
  });

  module.exports=styles;