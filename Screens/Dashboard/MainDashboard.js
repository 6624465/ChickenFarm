import React, { Component } from 'react';
import {View, Text} from 'react-native';

import {StackNavigator} from 'react-navigation';


export default class MainDashboard extends Component{
    static navigationOptions={
        title : 'Main Dashboard',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'}
    }

//naresh commitdfjsdfjdsfjlsd
    
    render(){
            return(        
                <View>
                    <Text>sdfsdf</Text>
                    </View>        
            // <Container>
            //         <Header>
            //             <Left>
            //                 <Button transparent onPress={()=>this.props.navigation.navigate('DrawerOpen')}>
            //                 <Icon ios='ios-menu' android="md-menu" />
            //                 </Button>
            //             </Left>
            //             <Body>
            //                 <Title>My Farm Dashboard</Title>
            //             </Body>
            //         </Header>

            //         <Content contentContainerStyle={{
            //             flex:1,
            //             alignItems:'center',
            //             justifyContent:'center'
            //         }}>
            //             <Text>My Farm Dashboard</Text>
            //         </Content>
            //     </Container>
            );

    }
}
