import { StyleSheet } from 'react-native';
var styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //marginTop: 120,
        padding: 20,
        backgroundColor: '#ffffff',      
    },
    Dashboard_container: {
        flex: 1,
        //justifyContent: 'center',
        //marginTop: 120,
        padding: 3,
        backgroundColor: '#ffffff',      
    },
    login_container: {
        flex: 1,
        justifyContent: 'center',
        //marginTop: 120,
        padding: 20,
        backgroundColor: '#ffffff',      
    },
    listcontainer: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listcontainerView: {
        flex: 1,
        justifyContent: 'center',
        //marginTop: 120,
        padding: 5,
        backgroundColor: '#C1C1C1',    
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
    width_25_align_center:{
        width:'25%',  
        alignItems:'center'
    },
    flexDirectionWrap:{
        flexDirection:'row', 
        flexWrap:'wrap'
    },
    paddingtop_10:{
        paddingTop:'10%'
    },
    paddingleft_10:{
        paddingLeft:'10%'
    },
    paddingbottom_10:{
        paddingBottom:'10%'
    },
    paddingright_10:{
        paddingRight:'10%'
    },
    margintop_10:{
        marginTop:'10%'
    },
    marginleft_10:{
        marginLeft:'10%'
    },
    marginbottom_10:{
        marginBottom:'10%'
    },
    marginright_10:{
        marginRight:'10%'
    },
    activeindicator:{
        flex: 1, 
        justifyContent:'center', 
        alignItems:'center'
    },
    bgc_white:{
        backgroundColor:'white'
    },
    white:{
        color:'white'
    },
    blue:{
        color:'blue'
    },
    text: {
        marginLeft: 12,
        fontSize: 18,
        color:'#000'
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    photo: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
    contentContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    bold_12:{
        fontSize:12, 
        fontWeight:'bold'
    },

  });

  module.exports=styles;