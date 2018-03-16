import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image, Keyboard} from 'react-native';

//import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
var ImagePicker = NativeModules.ImageCropPicker;

export default class FarmProfileList extends Component{
    static navigationOptions={
        title : 'Farm Profile',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'}
    }

    constructor()
    {
        super();
        this.state ={
            FarmProfileDetails:{
                FullName:null,
                FarmAddress:null,
                ContactDetails:null,
                Page:null,
                WebSite:null,
                AboutUs:null,
                Logo:null
            },
            isLogo:false
        },

        this.AddFarmProfile=t.struct({
            FullName:t.String,
            FarmAddress:t.String,
            ContactDetails:t.Number,
            Page:t.String,
            WebSite:t.String,
            AboutUs:t.String,
            //AddLogo:t.String
        }),

        this.AddFarmProfileOptions={
            fields:{
                FullName:{
                    label: 'Full Name',
                    placeholder:'Please Enter Your Full Name',
                    //error:'Please Enter Your Full Name'
                
                },
                FarmAddress:{
                    label: 'Farm Address',
                    placeholder:'Please Enter Farm Address',
                    //error:'Please Enter Farm Address'
                
                },
                ContactDetails:{
                    label: 'Contact Details',
                    placeholder:'Please Enter Tel/Line Number',
                    //error:'Please Enter Tel/Line Number'
                
                },
                Page:{
                    label: 'Social Page',
                    placeholder:'Social Page Name',
                    // error:'Please Enter Your Full Name'
                
                },
                WebSite:{
                    label: 'Web Site',
                    placeholder:' Web Site Name',
                    // error:'Please Enter Your Full Name'
                
                },
                AboutUs:{
                    label: 'About Us',
                    placeholder:'About Us',
                    multiline:true,                           
                    //error:'Please Enter Your Full Name'                        
                },
            }
        }
    }

    onChange = (FarmProfileDetails) => {
        this.setState({FarmProfileDetails});
    }

    cleanupImages() {
        // ImagePicker.clean().then(() => {

        //   console.log('removed tmp images from tmp directory');
        // }).catch(e => {
        //   alert(e);
        // });

        this.setState({
            FarmProfileDetails:{    
                FullName:this.state.FarmProfileDetails.FullName,
                FarmAddress:this.state.FarmProfileDetails.FarmAddress,
                ContactDetails:this.state.FarmProfileDetails.ContactDetails,
                Page:this.state.FarmProfileDetails.Page,
                WebSite:this.state.FarmProfileDetails.WebSite,
                AboutUs:this.state.FarmProfileDetails.AboutUs,

                Logo: null
            },
            isLogo:false
        });
    }
    
    pickMultiple() {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
        }).then(images => {
        debugger;
        this.setState({
            FarmProfileDetails:{
                FullName:this.state.FarmProfileDetails.FullName,
                FarmAddress:this.state.FarmProfileDetails.FarmAddress,
                ContactDetails:this.state.FarmProfileDetails.ContactDetails,
                Page:this.state.FarmProfileDetails.Page,
                WebSite:this.state.FarmProfileDetails.WebSite,
                AboutUs:this.state.FarmProfileDetails.AboutUs,

                Logo: images.map(i => {
                    console.log('received image', i);
                    return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
                })
            },
            isLogo:true
          });
        }).catch(e => alert(e));
    }

    renderImage(image) {
        return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
    }
        
    renderAsset(image) {
        // if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
        //   return this.renderVideo(image);
        // }

        return this.renderImage(image);
    }
    SaveFarmProfile=()=>
    {
      Keyboard.dismiss();
      this.props.navigation.navigate('Navigation');
    }
    ResetFarmProfile=()=>
    {
      Keyboard.dismiss();
      this.props.navigation.navigate('Navigation');
    }
    render(){
        return(
            <Container>
                <Header>
                    <Left>                        
                        <Button transparent onPress={()=>this.props.navigation.navigate('DrawerOpen')}>
                            <Icon ios='ios-menu' android="md-menu" />
                        </Button>                        
                    </Left>
                    <Body>
                        <Title>Add Farm Profile</Title>
                    </Body>
                </Header>

                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.AddFarmProfile}
                            options={this.AddFarmProfileOptions}
                            value={this.state.FarmProfileDetails}
                            onChange={this.onChange}
                        />

                         <TouchableOpacity onPress={this.state.isLogo ? this.cleanupImages.bind(this) : this.pickMultiple.bind(this)} style={{marginBottom: 10}}>
                            <Text style={{color:'blue'}}>{this.state.isLogo ? 'Clear Logos' : 'Select Logos'}</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={this.cleanupImages.bind(this)} style={{marginBottom: 10}}>
                            <Text style={{color:'blue'}}>Clear Logo</Text>
                        </TouchableOpacity>
                         */}

                        <ScrollView>
                            {/* {this.state.value.image ? this.renderAsset(this.state.value.image) : null} */}
                            {this.state.FarmProfileDetails.Logo ? this.state.FarmProfileDetails.Logo.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
                        </ScrollView>
                    </View>
                </Content>
                
                <Footer style={{backgroundColor:'white'}}>
                    <View style={{flexDirection:'row' ,flexWrap:'wrap'}} >
                        <View style={{width:'50%'}}>
                            <Button success  block rounded onPress={this.ResetFarmProfile.bind(this)} style={{width:'100%',justifyContent:'center'}}>
                                <Text style={{color:'white'}} >Reset</Text>
                            </Button>
                        </View>
                        <View style={{width:'50%', alignItems:'flex-end'}}>
                            <Button primary  block rounded onPress={this.SaveFarmProfile.bind(this)} style={{width:'100%',justifyContent:'center'}}>
                                <Text style={{color:'white'}}>Save</Text>
                            </Button>
                        </View>
                    </View>
                </Footer>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //marginTop: 120,
        padding: 20,
        backgroundColor: '#ffffff',      
    }
  });
