import { createStackNavigator } from '@react-navigation/stack';
import Royalcountwlc from '../../RoyalCourt/royalcourtscrns/royalcourtstck/Royalcountwlc';
import Royalcourtbottomtbs from './Royalcourtbottomtbs';

const Stack = createStackNavigator();

const Royalcourtstcknv = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Royalcountwlc" component={Royalcountwlc} />
      <Stack.Screen
        name="Royalcourtbottomtbs"
        component={Royalcourtbottomtbs}
      />
    </Stack.Navigator>
  );
};

export default Royalcourtstcknv;
