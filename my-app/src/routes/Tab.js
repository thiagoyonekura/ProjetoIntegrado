import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import telaAgenda from '../pages/telaAgenda';
import telaHistorico from '../pages/telaHistorico';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import telaMedicos from '../pages/telaMedicos';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const Tab2 = createMaterialTopTabNavigator();
export default props => {
    return(
            <>
                
                <Tab.Navigator 
                screenOptions={{
                    tabBarItemStyle:{height:50, paddingTop:10},
                    tabBarActiveTintColor:'#5599ff',
                    tabBarInactiveTintColor: 'black',
                }}>
                <Tab.Screen name="Home" component={telaAgenda} ></Tab.Screen>
                <Tab.Screen name="Histórico" component={telaHistorico}></Tab.Screen>
                </Tab.Navigator>
            </>
    )
}