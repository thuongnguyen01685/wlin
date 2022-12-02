import { Provider } from "react-redux";
import Navigator from "./navigation/Navigator";
import { store } from "./redux/store";
import * as Updates from "expo-updates";
import { Alert } from "react-native";

export default  function App() {
  
  Updates.checkForUpdateAsync().then((update) => {
    if (update.isAvailable) {
      Updates.fetchUpdateAsync().then((rs) => {
        if (rs.isNew) {
          Alert.alert(
            "UPDATE",
            "Chương trình có cập nhật mới. Mời bạn khởi động lại chương trình để áp dụng phiên bản mới nhất nhé!",
            [
              {
                text: "restart",
                onPress: () => {
                  return Updates.reloadAsync();
                },
              },
            ]
          );
        }
      });
    }
  });
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
