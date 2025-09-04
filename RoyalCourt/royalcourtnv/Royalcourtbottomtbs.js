import LinearGradient from 'react-native-linear-gradient';
import Royalcourtshmscr from '../royalcourtscrns/royalcourttbs/Royalcourtshmscr';
import Royalcourtqscr from '../royalcourtscrns/royalcourttbs/Royalcourtqscr';
import Royalcourtsvscr from '../royalcourtscrns/royalcourttbs/Royalcourtsvscr';
import Royalcourtprfscr from '../royalcourtscrns/royalcourttbs/Royalcourtprfscr';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, StyleSheet, View } from 'react-native';

const Tab = createBottomTabNavigator();

const Royalcourtbottomtbs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.royalcourttb,
        tabBarBackground: () => (
          <View style={{ flex: 1 }}>
            <LinearGradient
              colors={[
                '#BB862A',
                '#C48E24',
                '#DBA414',
                '#F0B706',
                '#FEF387',
                '#F0B706',
                '#ECCB64',
                '#BB862A',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <LinearGradient
                colors={['#550101', '#550101']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.royalcourttbbrd}
              ></LinearGradient>
            </LinearGradient>
          </View>
        ),
      }}
    >
      <Tab.Screen
        name="Royalcourtshmscr"
        component={Royalcourtshmscr}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image source={require('../../assets/icons/royalcourthm.png')} />
            ) : (
              <Image source={require('../../assets/icons/royalcourthma.png')} />
            ),
        }}
      />
      <Tab.Screen
        name="Royalcourtqscr"
        component={Royalcourtqscr}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image source={require('../../assets/icons/royalcourtqs.png')} />
            ) : (
              <Image source={require('../../assets/icons/royalcourtqsa.png')} />
            ),
        }}
      />
      <Tab.Screen
        name="Royalcourtsvscr"
        component={Royalcourtsvscr}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image source={require('../../assets/icons/royalcourtsvd.png')} />
            ) : (
              <Image
                source={require('../../assets/icons/royalcourtsvda.png')}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Royalcourtprfscr"
        component={Royalcourtprfscr}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image source={require('../../assets/icons/royalcourtprf.png')} />
            ) : (
              <Image
                source={require('../../assets/icons/royalcourtprfa.png')}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  royalcourttbbrd: {
    height: Platform.OS === 'ios' ? 124 : 124,
    padding: 2,
    paddingTop: 2.5,
    margin: Platform.OS === 'android' && 2,
    marginTop: Platform.OS === 'android' && 2.5,
  },
  royalcourttb: {
    elevation: 0,
    paddingTop: 30,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 35,
    backgroundColor: 'transparent',
    paddingBottom: Platform.OS === 'ios' ? 2 : 22,
  },
});

export default Royalcourtbottomtbs;
