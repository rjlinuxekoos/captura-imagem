import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal, Image, FlatList } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
//import * as Permissions from 'expo-permissions';
import * as Permissions from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import { useIsFocused } from "@react-navigation/native";


export function Home() {
  const camRef = useRef<Camera>(null)
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [arrCapturePhotos, setArrCapturePhotos] = useState<string>([]);
  const [open, setOpen] = useState<boolean | null>(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused(false);
  const [zoom, setZoom] = useState<number>(0.1);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      const { status } = await Permissions.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, [isFocused]);

  if (hasPermission == null) {
    return <View />;
  }
  if (hasPermission == false) {
    return <Text>Acesso negado!</Text>
  }
  async function takePicture() {
    if (camRef) {
      const data = await camRef.current?.takePictureAsync();
      setCapturedPhoto(data.uri);
      setOpen(true);
    }

  }
  async function savePicture() {
    const asset = await MediaLibrary.createAssetAsync(capturedPhoto).then(() => {
      setArrCapturePhotos(prevState => [...prevState, capturedPhoto]);
      setOpen(false);
    })
      .catch(error => {
        console.log('err', error);
      })

  }
  async function deletePicture() {
    setCapturedPhoto(null);
    setOpen(false)
  }

  function handleListaImagens() {
    navigation.navigate('ListaImagens', { arrCapturePhotos });
  }


  return (
    <SafeAreaView style={styles.container}>

      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={camRef}
        zoom={zoom}
      >
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ position: 'absolute', bottom: 20, left: 20, }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );

            }}
          >

            {/*<Text style={{ fontSize:20 , marginBottom: 13, color: "#FFF"}}>Trocar</Text>*/}

          </TouchableOpacity>
        </View>
      </Camera>

      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <FontAwesome name="camera" size={23} color="#FFF" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleListaImagens}>
        <FontAwesome name="image" size={23} color="#FFF" />
      </TouchableOpacity>

      {capturedPhoto &&
        <Modal
          animationType='slide'
          transparent={false}
          visible={open}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>

            <View style={{ margin: 10, flexDirection: 'row' }}>
              <TouchableOpacity style={{ margin: 10 }} onPress={deletePicture}>
                <FontAwesome name="window-close" size={50} color="#FF0000" />
              </TouchableOpacity>
              <TouchableOpacity style={{ margin: 10 }} onPress={savePicture}>
                <FontAwesome name="upload" size={50} color="#121212" />
              </TouchableOpacity>
            </View>
            <Image
              style={{ width: '100%', height: 450, borderRadius: 20 }}
              source={{ uri: capturedPhoto }}
            />
          </View>
        </Modal>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    margin: 20,
    borderRadius: 10,
    height: 50,
  }

});
