import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import LoginPage from './loginPage';
import Register from './Register';

export default createMaterialTopTabNavigator(
    {
        login: LoginPage,
        register: Register,
    }, {
    tabBarOptions: {
        indicatorStyle: { backgroundColor: 'white' },
        labelStyle: { fontSize: 14, fontWeight: 'bold' },
        tabStyle: {height:50}
    },
});