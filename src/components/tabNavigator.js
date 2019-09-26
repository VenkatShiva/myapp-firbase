import {
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import Chat from './Chat';
import Profile from './Profile';

export default createMaterialTopTabNavigator({
  chat: Chat,
  profile: Profile,
}, {
  tabBarOptions: {
    indicatorStyle: { backgroundColor: 'white' },
    labelStyle: { fontSize: 14, fontWeight: 'bold' },
    tabStyle: {height:55}
  },
});
