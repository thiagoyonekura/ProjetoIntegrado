import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import telaAgenda from '../pages/telaAgenda';
import telaHistorico from '../pages/telaHistorico';

const Tab = createMaterialTopTabNavigator();

export default props => {
    return(
            <Tab.Navigator 
            screenOptions={{
                tabBarItemStyle:{height:50},
                tabBarActiveTintColor:'#5599ff',
                tabBarInactiveTintColor: 'black',
            }}>
            <Tab.Screen name="Home" component={telaAgenda} ></Tab.Screen>
            <Tab.Screen name="Histórico" component={telaHistorico}></Tab.Screen>
            </Tab.Navigator>
    )
}