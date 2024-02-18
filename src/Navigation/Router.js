import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameScreen from '../Component/GameScreen';
import WelcomeScreen from '../Component/WelcomeScreen';
import Winner from '../Component/Winner';

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="Winner" component={Winner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}