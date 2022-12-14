import { Provider } from "react-redux";
import Navigator from "./navigation/Navigator";
import { store } from "./redux/store";
import * as Updates from "expo-updates";
import { Alert } from "react-native";
import {
  useFonts,
  LexendDeca_100Thin,
  LexendDeca_200ExtraLight,
  LexendDeca_300Light,
  LexendDeca_400Regular,
  LexendDeca_500Medium,
  LexendDeca_600SemiBold,
  LexendDeca_700Bold,
  LexendDeca_800ExtraBold,
  LexendDeca_900Black,
} from "@expo-google-fonts/lexend-deca";

export default function App() {
  // Updates.checkForUpdateAsync().then((update) => {
  //   if (update.isAvailable) {
  //     Updates.fetchUpdateAsync().then((rs) => {
  //       if (rs.isNew) {
  //         Alert.alert(
  //           " UPDATE",
  //           "Chương trình có cập nhật mới. Bạn hãy khởi động lại chương trình để áp dụng phiên bản mới nhất!",
  //           [
  //             {
  //               text: "restart",
  //               onPress: () => {
  //                 return Updates.reloadAsync();
  //               },
  //             },
  //           ]
  //         );
  //       }
  //     });
  //   }
  // });
  let [fontsLoaded] = useFonts({
    LexendDeca_100Thin,
    LexendDeca_200ExtraLight,
    LexendDeca_300Light,
    LexendDeca_400Regular,
    LexendDeca_500Medium,
    LexendDeca_600SemiBold,
    LexendDeca_700Bold,
    LexendDeca_800ExtraBold,
    LexendDeca_900Black,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
