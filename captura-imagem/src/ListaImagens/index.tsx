import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal, Image, FlatList } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { useRoute } from '@react-navigation/native';

export function ListaImagens() {
  const route = useRoute();
  const { arrCapturePhotos } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <FlatList style={styles.form}
          data={arrCapturePhotos}
          keyExtractor={item => item}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={true}

          renderItem={({ item, index }) => (
            <Image


              style={{ width: 300, height: 300, borderWidth: 2, margin: 8 }}
              source={{ uri: item }}
              key={index}

            />
          )} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%"

  },
  form: {
    flex: 1,

  },

});
