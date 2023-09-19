import {createNativeStackNavigator} from  '@react-navigation/native-stack';
import { Home } from '../Home';
import { ListaImagens } from '../ListaImagens';
const {Navigator, Screen} = createNativeStackNavigator();
export function AppRoutes(){
    return(
        <Navigator>
            <Screen
                name="Home"
                component={Home}
            />            
            <Screen
                name="ListaImagens"
                component={ListaImagens}
            />
        </Navigator>
    );
}