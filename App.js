import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HikeApp from "./HikeApp";
import EditHikeScreen from "./EditHikeScreen";
import HikeDetail from "./HikeDetail";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HikeApp">
        <Stack.Screen name="HikeApp" component={HikeApp} />
        <Stack.Screen name="HikeDetail" component={HikeDetail} />
        <Stack.Screen name="EditHikeScreen" component={EditHikeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
