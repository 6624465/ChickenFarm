import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity,Image,Keyboard,Text} from 'react-native';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Right } from 'native-base';
import {StackNavigator} from 'react-navigation';

export default class Vaccine extends Component{
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
                    <Title>Vaccine</Title>
                </Body>
                {/* <Right>
                    <Button transparent onPress={this.Logout}>
                        <Icon ios='ios-menu' android="md-menu" />
                    </Button>
                </Right> */}
            </Header>

            <Content contentContainerStyle={{
                flex:1,
                alignItems:'center',
                justifyContent:'center'
            }}>
            <View>
                <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('PurchasedVaccineList')}>
                    <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                      Purchased Vaccine List
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('VaccineScheduleList')}>
                    <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                      Vaccine Schedule List
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('GiveVaccineList')}>
                    <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                      Give Vaccine List
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('VaccineDue')}>
                    <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                      Vaccine Due 
                    </Text>
                </TouchableOpacity>
            </View>
            </Content>
        </Container>
    );
}
    // render(){
    //   return(
    //     <Container>
    //       <Header>
    //         <Left>
    //           <Button transparent onPress={()=>this.props.navigation.navigate('DrawerOpen')}>
    //             <Icon ios='ios-menu' android="md-menu" />
    //           </Button>
    //         </Left>
    //         <Body>
    //           <Title>Vaccine</Title>
    //         </Body>
    //       </Header>
    //       <Tabs>
    //         <Tab heading={ <TabHeading><Text>Purchased</Text></TabHeading>}>
    //           <Tab1 />
    //         </Tab>
    //         <Tab heading={ <TabHeading><Text> Schedule</Text></TabHeading>}>
    //           <Tab2 />
    //         </Tab>
    //         <Tab heading={ <TabHeading><Text>Give</Text></TabHeading>}>
    //           <Tab3 />
    //         </Tab>
    //         {/* <Tab heading={ <TabHeading><Text> Due</Text></TabHeading>}>
    //           <Tab4 />
    //         </Tab> */}
    //       </Tabs>
    //     </Container>
    //   );
    // }

}


