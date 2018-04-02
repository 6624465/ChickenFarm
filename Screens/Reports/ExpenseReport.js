import React, { Component } from 'react';
import {View, Text, Image,StyleSheet} from 'react-native';

import { Container, Content, Header, Icon, Left, Title, Body, Button, Right } from 'native-base';

import {StackNavigator} from 'react-navigation';
// import LoginNavigation from '../Registration/Login'
import {PieChart} from 'react-native-mp-android-chart';

export default class ExpenseReport extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }
    constructor() {
        super();
    
        this.state = {
          legend: {
            enabled: true,
            textSize: 14,
            form: 'CIRCLE',
            position: 'BELOW_CHART_LEFT',
            fontFamily: 'monospace',
            wordWrapEnabled: true
          },
          data: {
            datasets: [{
              yValues: [40, 21, 15, 9],
              label: '',
              config: {
                colors: ['#C0FF8C', '#FFF78C', '#FFD08C', '#8CEAFF'],
    
                sliceSpace:0,
                selectionShift:0
              }
            }],
            xValues: ['Sandwiches', 'Salads', 'Soup', 'Beverages']
          },
          description: {
            text: '',
            textSize: 15,
            textColor: 'darkgray',
            fontFamily: 'monospace',
            fontStyle: 2
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
                             <Title>Expense Report</Title>
                        </View>
                    </Body>
                    <Right></Right>
                    </Header>
                <PieChart
                style={styles.chart}
                logEnabled={true}
                backgroundColor={'#f0f0f0'}
                description={this.state.description}
                data={this.state.data}
                legend={this.state.legend}
        
                drawSliceText={true}
                usePercentValues={false}
                //centerText={'Pie center text!'}
                //centerTextRadiusPercent={100}
                holeRadius={0}
                
                transparentCircleRadius={0}
                transparentCircleColor={'#f0f0f0'}
                transparentCircleAlpha={50}
                maxAngle={360}
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
  
