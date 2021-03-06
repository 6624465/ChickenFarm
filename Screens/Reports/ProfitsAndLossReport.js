import React, { Component } from 'react';
import {View, Text,StyleSheet, Image} from 'react-native';

import { Container, Content, Header, Icon, Left, Title, Body, Button, Right } from 'native-base';

import {StackNavigator} from 'react-navigation';
// import LoginNavigation from '../Registration/Login'
import {BarChart} from 'react-native-mp-android-chart';
import {strings} from '../Localization';

export default class ProfitsAndLossReport extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }
    constructor() {
        super();
    
        this.state = {
          legend: {
            enabled: true,
            textSize: 14,
            form: 'SQUARE',
            formSize: 14,
            xEntrySpace: 10,
            yEntrySpace: 5,
            formToTextSpace: 5,
            wordWrapEnabled: true,
            maxSizePercent: 0.5
          },
          data: {
            datasets: [{
              yValues: [100, 105, 102, 110, 114, 109, 105, 99, 95],
              label: 'Bar dataset',
              config: {
                color: 'teal',
                barSpacePercent: 40,
                barShadowColor: 'lightgrey',
                highlightAlpha: 90,
                highlightColor: 'red'
              }
            }],
            xValues: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
          }
        };
      }
    
      render() {
        return (
          <View style={styles.container}>
           <Header>
                    <Left>
                           <Button transparent onPress={() => this.props.navigation.navigate('MainDashboard')}>
                           <Icon name='arrow-back'/>
                           </Button>
                       </Left>
                    <Body>
                        <View style={{width:230,alignItems:'flex-start'}}>
                             <Title>{strings.Profit_Loss_Report}</Title>
                        </View>
                    </Body>
                    <Right></Right>
                    </Header>
            <BarChart
              style={styles.chart}
              data={this.state.data}
              animation={{durationX: 2000}}
              legend={this.state.legend}
              gridBackgroundColor={'#ffffff'}
    
              drawBarShadow={false}
              drawValueAboveBar={true}
              drawHighlightArrow={true}
            />
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
      },
      chart: {
        flex: 1
      }
    });