import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import {Feather} from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import mapMarker from '../images/map-marker.png';
import api from '../services/api';

interface Local{
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}


export default function CollectionMap(){
  const [locais, setLocais] = useState<Local[]>([]);
  const navigation = useNavigation();
    

    useFocusEffect(()=>{
      api.get('locais').then(Response=> {
        setLocais(Response.data);
      });
    });

    function handleNavigateToLocalDetails(id: number){
        navigation.navigate('LocalDetails',{id});
    }
    function handleNavigateToCreateLocal(){
        navigation.navigate('SelectMapPosition');
    }

    return(
        <View style={styles.container}>
    <MapView 
    provider = {PROVIDER_GOOGLE}
    style = {styles.map}
    initialRegion={{
     latitude: -14.864311,
     longitude: -40.8429771,
     latitudeDelta: 0.040,
     longitudeDelta: 0.040,
    }}
    >
      {locais.map(local =>{
        return(
          <Marker 
          key ={local.id}
          icon = {mapMarker}
          coordinate ={{
          latitude:local.latitude,
          longitude: local.longitude,
      }}
      >
        <Callout tooltip = {true} onPress= {()=>handleNavigateToLocalDetails(local.id)}>
        <View style = {styles.calloutContainer}>
           <Text style = {styles.calloutText}>{local.name}</Text>
        </View>

        </Callout>
        </Marker>
        )
      })}

    </MapView>

      <View style= {styles.footer}>
        <Text style = {styles.footerText}> {locais.length} Locais Encontrados</Text>

        <TouchableOpacity style = {styles.createLocalButton} onPress = {handleNavigateToCreateLocal}>
        <Feather name ='plus' size = {20} color = "#fff"/> 
        </TouchableOpacity>
      </View>

    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
  
      elevation: 3,
  
    },
    calloutText: {
      color: '#0089a5',
      fontSize: 14,
    },
  
    footer:{
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#fff',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 5,
    },
  
    footerText:{
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3',
      alignItems: 'center',
    },
    createLocalButton: {
  
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,

      alignItems: 'center',
  
      justifyContent: 'center',
    },

  });