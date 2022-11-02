import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

import * as ImagePicker from "expo-image-picker";
import ModalPayment from "../../components/modal/ModalPayment";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const PushImage = (props) => {
  const navigation = useNavigation();
  const [modalSuccess, setModalSuccess] = useState(false);
  const [image, setImage] = useState(null);

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  // const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  // const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      // setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  //choose image
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      //   navigation.navigate("PayBenefits", {
      //     photo: result.uri,
      //   });
    }
  };

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    // setPhoto(newPhoto);
    if (newPhoto) {
      MediaLibrary.saveToLibraryAsync(newPhoto.uri);
      //   navigation.navigate("PayBenefits", {
      //     photo: "data:image/jpg;base64," + newPhoto.base64,
      //   });
      setModalSuccess(true);
    }
  };

  // if (photo) {
  //   let sharePic = () => {
  //     shareAsync(photo.uri).then(() => {
  //       setPhoto(undefined);
  //     });
  //   };

  //   let savePhoto = () => {
  //     MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
  //       setPhoto(undefined);
  //     });
  //   };

  //   return (
  //     <SafeAreaView style={{ flex: 0.8, marginBottom: 200 }}>
  //       <Image
  //         style={styles.preview}
  //         source={{ uri: "data:image/jpg;base64," + photo.base64 }}
  //       />
  //       <Button title="Share" onPress={sharePic} />
  //       {hasMediaLibraryPermission ? (
  //         <Button title="Save" onPress={savePhoto} />
  //       ) : undefined}
  //       <Button title="Discard" onPress={() => setPhoto(undefined)} />
  //     </SafeAreaView>
  //   );
  // }
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: "80%" }}>
        {modalSuccess && (
          <ModalPayment
            modalSuccess={modalSuccess}
            setModalSuccess={setModalSuccess}
            showTakePicture={props.showTakePicture}
            setShowTakePicture={props.setShowTakePicture}
            content={"Xác nhận thanh toán thành công"}
            textButton={"Tiếp tục"}
          />
        )}
        <View style={{ marginVertical: 12 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              fontWeight: "600",
            }}>
            Dùng máy ảnh của bạn chụp lại
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <View style={styles.barcodebox}>
            <Camera ref={cameraRef} style={{ height: 400, width: 300 }} />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}>
          <TouchableOpacity style={{ width: "15%" }} onPress={takePic}>
            <LinearGradient
              start={{ x: 0, y: 0.3 }}
              end={{ x: 1, y: 1 }}
              colors={["#9D85F2", "rgba(157, 133, 242, 0.4)"]}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "center",
                borderRadius: 30,
              }}>
              <View style={styles.borderBacRounded}>
                <Ionicons name="camera-outline" size={20} color="#ffffff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
          onPress={pickImage}>
          <Ionicons name="image-outline" size={20} />
          <Text style={{ fontSize: 12, fontWeight: "600", marginLeft: 5 }}>
            Tải mã QR có sẵn
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  barcodebox: {
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "#711775",
  },
  borderBacRounded: {
    padding: 20,
  },
  imageCheckin: {
    width: 20,
    height: 20,
  },
});

//make this component available to the app
export default PushImage;
