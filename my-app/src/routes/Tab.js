import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import telaAgenda from '../pages/telaAgenda';
import telaHistorico from '../pages/telaHistorico';

const Tab = createMaterialTopTabNavigator();

export default props => {
    console.disableYellowBox = true;
    return(
            <>
                <Tab.Navigator 
                screenOptions={{
                    tabBarItemStyle:{height:50, paddingTop:10},
                    tabBarActiveTintColor:'#5599ff',
                    tabBarInactiveTintColor: 'black',
                }}>
                <Tab.Screen name="Consultas Agendadas" component={telaAgenda}></Tab.Screen>
                <Tab.Screen name="Histórico" component={telaHistorico} ></Tab.Screen>
                </Tab.Navigator>
            </>
    )
}