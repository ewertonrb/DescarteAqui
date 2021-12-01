import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const {Navigator, Screen} = createNativeStackNavigator();

import CollectionMap from './pages/CollectionMap';
import LocalDetails from './pages/LocalDetails';
import SelectMapPosition from './pages/CreateLocal/SelectMapPosition';
import LocalData from './pages/CreateLocal/LocalData';
import Header from './components/Header';


export default function Routes(){
    return(
        <NavigationContainer>
        <Navigator screenOptions = {{headerShown: false, cardStyle: {backgroundColor:'#f2f3f5'}}}>
        <Screen 
        name = "CollectionMap" 
        component= {CollectionMap}
        />
        <Screen 
        name = "LocalDetails" 
        component= {LocalDetails}
        options = {{
            headerShown: true,
            header: () => <Header title = "Local" />
        }}
        />
        <Screen 
        name = "SelectMapPosition" 
        component= {SelectMapPosition}
        options = {{
            headerShown: true,
            header: () => <Header showCancel = {false} title = "Marque o local no Mapa" />
        }}
        />
         <Screen 
        name = "LocalData" 
        component= {LocalData}
        options = {{
            headerShown: true,
            header: () => <Header title = "Informe os Dados" />
        }}
        />
        </Navigator>
        
        
        
        </NavigationContainer>
    );

}