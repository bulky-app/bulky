import styles from "../globalStyles";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ToastAndroid,
} from "react-native";
import Parse from "../../backend/server";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { toggleActive } from "../redux/features/auth";

const SModal = ({ handleModal, modalVisible }) => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const logout = async (nav, dispatch) => {
    try {
      await Parse.User.logOut();
      ToastAndroid.showWithGravityAndOffset(
        `Logged out successfully.`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
      dispatch(toggleActive());
      return nav.navigate("LoginScreen");
    } catch (error) {
      () => error;
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        handleModal();
      }}
    >
      <View style={localStyles.centeredView}>
        <Text style={{ fontSize: 24 }}>Are you sure you want to logout?</Text>
        <View style={localStyles.modalView}>
          <Pressable
            style={localStyles.button}
            activeOpacity={0.3}
            onPress={() => logout(nav, dispatch)}
          >
            <Text style={[localStyles.textStyle, styles.dangerText]}>
              Logout
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={localStyles.lastButton}
          activeOpacity={0.3}
          onPress={() => handleModal()}
        >
          <Text style={[localStyles.textStyle, { marginLeft: 0 }]}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    padding: 30,
    width: "100%",
    marginTop: "150%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: styles.safeContainer.backgroundColor,
    //alignItems: "center", //To be activated in future
  },
  modalView: {
    marginVertical: 30,
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  lastButton: {
    borderRadius: 20,
    paddingVertical: 10,
    alignSelf: "center",
    flexDirection: "row",
  },
  textStyle: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
});

export default SModal;
