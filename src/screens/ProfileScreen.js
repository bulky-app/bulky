import {
  View,
  Text,
  Share,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "../globalStyles";
import Modal from "../components/Modal";
import Parse from "../../backend/server";
import { useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import ProfileCard, { styless } from "../components/ProfileCard";
import { Ionicons, Feather, SimpleLineIcons } from "@expo/vector-icons";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();

  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [walletBalance, setWalletBalance] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const onSharePress = () =>
    Share.share({
      title: "Share bulk with friends.",
      message:
        "Hey, there is this app called *Bulky* where grocery is *cheaper* than anywhere else. Check its out here https://bulky.co.za",
      url: "https://bulky.co.za",
      subject: "Check out Bulky",
    });

  const active = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      const currentUser = async () => {
        try {
          await Parse.User.currentAsync(); // Do not remove it Solves a certain error LOL.
          const user = Parse.User.current();
          setUserId(user.id);
          try {
            const updatedUserDetails = await Parse.Cloud.run("getUserDetails", {
              objectId: user.id,
            });
            setUser(updatedUserDetails.get("name"));
            return setWalletBalance(
              updatedUserDetails.get("walletBalance").toFixed(2)
            );
          } catch (e) {
            setUser(user.get("name"));
            return setWalletBalance(user.get("walletBalance").toFixed(2));
          }
        } catch (error) {
          setUser("No name")
          setWalletBalance(0.00)
          return
        }
      };
      currentUser();
    }, [active])
  );

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <StatusBar style="dark" />
      {user ? (
        <View>
          <View>
            <ProfileCard
              userId={userId}
              userName={user}
              userBalance={walletBalance}
            />
          </View>
        </View>
      ) : <ActivityIndicator />}

      <View
        style={[localStyles.optionsCard, styless.profileCard.boxWithShadow]}
      >
        {/* Links here */}
        <ProfileOption
          nav={nav}
          text="Account"
          icon={<Feather name="user-check" size={24} color="black" />}
        />
        <ProfileOption
          nav={nav}
          text="Wallet"
          icon={<Ionicons name="wallet-outline" size={24} color="black" />}
        />
        <ProfileOption
          nav={nav}
          text="Address"
          icon={<Ionicons name="location-outline" size={24} color="black" />}
        />
        <ProfileOption
          nav={nav}
          text="Settings"
          icon={<Ionicons name="settings-outline" size={24} color="black" />}
        />
      </View>
      <View
        style={[localStyles.optionsCard, styless.profileCard.boxWithShadow]}
      >
        {/* Links here */}
        <ProfileOption
          nav={nav}
          text="Help"
          icon={<SimpleLineIcons name="question" size={24} color="black" />}
        />
        <ProfileOption
          nav={nav}
          text="About"
          icon={
            <Ionicons
              size={28}
              name="information-circle-outline"
              color="black"
            />
          }
        />
        <ProfileOption
          text="Share"
          nav={onSharePress}
          icon={
            <Ionicons name="share-social-outline" size={24} color="black" />
          }
        />
        <ProfileOption
          nav={nav}
          text="Logout"
          handleModal={handleModal}
          icon={<Ionicons name="log-out-outline" size={24} color="black" />}
        />
      </View>
      {modalVisible && (
        <Modal
          handleModal={handleModal}
          modalVisible={modalVisible}
          nav={nav}
          dispatch={dispatch}
        />
      )}
    </ScrollView>
  );
};

export default ProfileScreen;

const ProfileOption = ({ text, icon, nav, handleModal }) => {
  const actionExecutor = () => {
    {
      if (text === "Share") {
        nav();
      } else if (text === "Logout") {
        handleModal();
      }
    }
  };
  return (
    <TouchableOpacity
      onPress={() =>
        text === "Share" || text === "Logout"
          ? actionExecutor()
          : nav.navigate(text)
      }
      activeOpacity={0.3}
      style={localStyles.option}
    >
      <Text style={[localStyles.text]}>{text}</Text>
      {icon}
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  optionsCard: {
    padding: 10,
    borderRadius: 13,
    marginTop: 30,
    marginBottom: 5,
    marginHorizontal: 15,
    backgroundColor: styles.blackWhiteText.color,
  },
  option: {
    borderRadius: 40,
    borderWidth: 0.8,
    marginVertical: 5,
    paddingVertical: 5,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    borderColor: "#F2F4F5",
    justifyContent: "space-between",
  },
  text: {
    padding: 10,
    fontSize: 20,
    fontWeight: "400",
  },
});
