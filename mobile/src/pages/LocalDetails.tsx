import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import {useRoute} from '@react-navigation/native'

import mapMarkerImg from '../images/map-marker.png';
import api from '../services/api';
import { RectButton } from 'react-native-gesture-handler';

interface LocalDetailsRouteParams{
  id: number;
}

interface Local{
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  phone: string;
  instructions: string;
  horario_funcionamento: string;
  images: Array<{
    id:number,
    url: string,
  }>;
}

export default function LocalDetails(){
  const route = useRoute();
  const [local, setLocal] = useState<Local>();

  const params = route.params as LocalDetailsRouteParams;

  useEffect(()=>{
    api.get(`locais/${params.id}`).then(response=> {
      setLocal(response.data);
    })
  },[params.id]);

  if(!local){
    return(
      <View style = {styles.container}>
        <Text style = {styles.description}>Carregando... </Text>
      </View>
    )
  }
  function handleOpenGoogleMapRoutes(){
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${local?.latitude},${local?.longitude}`)
  }
  function openWhatsapp(){
    Linking.openURL(`http://api.whatsapp.com/send?phone=55${local?.phone}`);
  }

    return(
        <ScrollView style={styles.container}>
        <View style={styles.imagesContainer}>
          <ScrollView horizontal pagingEnabled>
            {local.images.map(image =>{
              return(
                <Image
                key={image.id}
                style = {styles.image}
                source = {{uri: image.url}}
                />
              );
            })}
            
          </ScrollView>
        </View>
  
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{local.name}</Text>
          <Text style={styles.description}>
            {local.about}
          </Text>
        
          <View style={styles.mapContainer}>
            <MapView 
              provider = {PROVIDER_GOOGLE}
              initialRegion={{
                latitude: local.latitude,
                longitude: local.longitude,
                latitudeDelta: 0.020,
                longitudeDelta: 0.020,
              }} 
              zoomEnabled={false}
              pitchEnabled={false}
              scrollEnabled={false}
              rotateEnabled={false}
              style={styles.mapStyle}
            >
              <Marker 
                icon={mapMarkerImg}
                coordinate={{ 
                  latitude: local.latitude,
                  longitude: local.longitude,
                }}
              />
            </MapView>
  
            <TouchableOpacity onPress={handleOpenGoogleMapRoutes} style={styles.routesContainer}>
              <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
            </TouchableOpacity>
          </View>
        
          <View style={styles.separator} />
  
          <Text style={styles.title}>Instru????es para coleta:</Text>
          <Text style={styles.description}>
            {local.instructions}
          </Text>
  
          <View style={styles.scheduleContainer}>
            <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
              <Feather name="clock" size={40} color="#2AB5D1" />
              <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>Segunda ?? Sexta {local.horario_funcionamento}</Text>
            </View>

          </View>
  
          <RectButton style={styles.contactButton} onPress={openWhatsapp}>
            <FontAwesome name="whatsapp" size={24} color="#FFF" />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
              </RectButton> 
              </View>
              </ScrollView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    imagesContainer: {
      height: 240,
    },
  
    image: {
      width: Dimensions.get('window').width,
      height: 240,
      resizeMode: 'cover',
    },
  
    detailsContainer: {
      padding: 24,
    },
  
    title: {
      color: '#4D6F80',
      fontSize: 30,
      fontFamily: 'Nunito_700Bold',
    },
  
    description: {
      fontFamily: 'Nunito_600SemiBold',
      color: '#5c8599',
      lineHeight: 24,
      marginTop: 16,
    },
  
    mapContainer: {
      borderRadius: 20,
      overflow: 'hidden',
      borderWidth: 1.2,
      borderColor: '#B3DAE2',
      marginTop: 40,
      backgroundColor: '#E6F7FB',
    },
  
    mapStyle: {
      width: '100%',
      height: 150,
    },
  
    routesContainer: {
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    routesText: {
      fontFamily: 'Nunito_700Bold',
      color: '#0089a5'
    },
  
    separator: {
      height: 0.8,
      width: '100%',
      backgroundColor: '#D3E2E6',
      marginVertical: 40,
    },
  
    scheduleContainer: {
      marginTop: 24,
      flexDirection: 'row-reverse',
      justifyContent: 'center'
    },
  
    scheduleItem: {
      width: '80%',
      padding: 20,
    },
  
    scheduleItemBlue: {
      backgroundColor: '#E6F7FB',
      borderWidth: 1,
      borderColor: '#B3DAE2',
      borderRadius: 20,
    },
  
    scheduleItemGreen: {
      backgroundColor: '#EDFFF6',
      borderWidth: 1,
      borderColor: '#A1E9C5',
      borderRadius: 20,
    },
  
    scheduleText: {
      fontFamily: 'Nunito_600SemiBold',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 20,
    },
  
    scheduleTextBlue: {
      color: '#5C8599'
    },
  
    scheduleTextGreen: {
      color: '#37C77F'
    },
  
    contactButton: {
      backgroundColor: '#3CDC8C',
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 56,
      marginTop: 40,
    },
  
    contactButtonText: {
      fontFamily: 'Nunito_800ExtraBold',
      color: '#FFF',
      fontSize: 16,
      marginLeft: 16,
    }
  });