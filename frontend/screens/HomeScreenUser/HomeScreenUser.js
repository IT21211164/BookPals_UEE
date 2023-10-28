import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import HomeContent from "../HomeContent/HomeContent";
import Wishlist from "../bookWishlist";
import ProfileUser from "../ProfileUser/ProfileUser";
import Notifications from "../Notifications/Notifications";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreenUser() {
  const [homeScreenContent, setHomeScreenContent] = useState(1);
  const [drawerMenuOpen, setDrawerMenuOpen] = useState(false);
  const navigation = useNavigation();

  const [userId, setUserId] = useState("null");
  const [userRole, setuserRole] = useState("null");
  const [userName, setuserName] = useState("null");
  const [preferedCategory, setpreferedCategory] = useState("null");

  const getUserPreferences = async () => {
    try {
      await AsyncStorage.getItem("user", async (err, savedUser) => {
        if (!err) {
          const currentUser = JSON.parse(savedUser);
          if (currentUser.role === "user") {
            setUserId(currentUser.id);
            setuserRole(currentUser.role);
            setuserName(currentUser.username);
            setpreferedCategory(currentUser.category);
          }
        } else {
          // Handle AsyncStorage error
          console.log(err);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserPreferences();
  }, []);

  const navigateToDonationForm = () => {
    navigation.navigate("DonationGuidelines");
    setDrawerMenuOpen(false);
  };

  const navigateRequestList = () => {
    navigation.navigate("RequestList");
    setDrawerMenuOpen(false);
  };

  const navigateExploreReviews = () => {
    navigation.navigate("ExploreReviews");
    setDrawerMenuOpen(false);
  };

  const navigateMyReviews = () => {
    navigation.navigate("MyReviews");
    setDrawerMenuOpen(false);
  };

  const contentChanger = (screen) => {
    setHomeScreenContent(screen);
  };

  const closeMenu = () => {
    setDrawerMenuOpen(false);
  };

  const openMenu = () => {
    setDrawerMenuOpen(true);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("LoginForm");
  };

  return (
    <View style={styles.container}>
      <View style={styles.homeTopBar}>
        <Text style={styles.appLogoText}>Book Pals</Text>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => openMenu()}
        >
          <Image
            source={require("../../assets/icons/drawer-menu-icon.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>

      {/* home content container */}
      <ScrollView style={{ flex: 1, width: "100%", height: 700 }}>
        {homeScreenContent === 1 ? (
          <HomeContent />
        ) : homeScreenContent === 2 ? (
          <Wishlist />
        ) : homeScreenContent === 3 ? (
          <Notifications />
        ) : (
          <ProfileUser />
        )}
      </ScrollView>

      {/* bottom-navigationbar */}
      <View style={styles.bottomNavContainer}>
        <TouchableOpacity
          style={styles.bottomNavButton}
          onPress={() => contentChanger(1)}
        >
          <Image
            source={
              homeScreenContent === 1
                ? require("../../assets/icons/home-clicked.png")
                : require("../../assets/icons/home-not-clicked.png")
            }
            style={{ width: 30, height: 30 }}
          />
          <Text
            style={{
              color: homeScreenContent === 1 ? "#FA7A50" : "#192A56",
              marginTop: 2
            }}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavButton}
          onPress={() => contentChanger(2)}
        >
          <Image
            source={
              homeScreenContent === 2
                ? require("../../assets/icons/wishlist-clicked.png")
                : require("../../assets/icons/wishlist-not-clicked.png")
            }
            style={{ width: 32, height: 32 }}
          />
          <Text
            style={{
              color: homeScreenContent === 2 ? "#FA7A50" : "#192A56",
              marginTop: 2
            }}
          >
            Wishlist
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavButton}
          onPress={() => contentChanger(3)}
        >
          <Image
            source={
              homeScreenContent === 3
                ? require("../../assets/icons/notification-clicked.png")
                : require("../../assets/icons/notification-not-clicked.png")
            }
            style={{ width: 30, height: 30 }}
          />
          <Text
            style={{
              color: homeScreenContent === 3 ? "#FA7A50" : "#192A56",
              marginTop: 2
            }}
          >
            Notices
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavButton}
          onPress={() => contentChanger(4)}
        >
          <Image
            source={
              homeScreenContent === 4
                ? require("../../assets/icons/profile-clicked.png")
                : require("../../assets/icons/profile-not-clicked.png")
            }
            style={{ width: 30, height: 30 }}
          />
          <Text
            style={{
              color: homeScreenContent === 4 ? "#FA7A50" : "#192A56",
              marginTop: 2
            }}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
      {/* drawer menu */}

      <Animatable.View
        style={[
          styles.drawerMenu,
          drawerMenuOpen ? styles.drawerMenuOpen : styles.drawerMenuClosed
        ]}
        transition="translateX"
        duration={500} // Specify the transition duration in milliseconds
        easing="ease-out" // Specify the easing function
      >
        {/* Menu content */}
        <View style={styles.drawerContainer}>
          {/* menu close button */}
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={() => closeMenu()}>
              <Image
                source={require("../../assets/icons/drawer-menu-close.png")}
                style={{ width: 30, height: 30, marginRight: 20 }}
              />
            </TouchableOpacity>
          </View>
          {/* user information container */}
          <View style={styles.userDetailsContainer}>
            <Image
              source={require("../../assets/profiles/dummy-profile.png")}
              style={styles.userProfilePhoto}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userRole}>registered {userRole}</Text>
            </View>
          </View>

          {/* links container section */}
          <TouchableOpacity onPress={navigateExploreReviews}>
            <Text style={styles.drawerMenuLinks}>Book Reviews</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateMyReviews}>
            <Text style={styles.drawerMenuLinks}>My Book Reviews</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateRequestList}>
            <Text style={styles.drawerMenuLinks}>Book Exchanges</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToDonationForm}>
            <Text style={styles.drawerMenuLinks}>Donate Books</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.drawerMenuLinks}>Drop Off Location</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.drawerMenuLinks}>Customer Support</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.drawerMenuLinks}>FAQ</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => logout()}>
            <Text style={styles.drawerMenuLinks}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center"
  },

  homeTopBar: {
    marginTop: 30,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between"
  },

  appLogoText: {
    fontSize: 23,
    fontWeight: "700",
    color: "#FA7A50",
    letterSpacing: 1
  },

  userDetailsContainer: {
    marginTop: 40,
    width: 200,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    transform: [{ translateX: -40 }]
  },

  userInfo: {
    display: "flex",
    marginLeft: 20
  },

  userName: {
    width: 220,
    fontSize: 19,
    color: "black",
    fontWeight: "600"
  },

  userRole: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(0,0,0,0.6)",
    textTransform: "capitalize"
  },

  userProfilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: "#192A56",
    borderWidth: 4
  },

  contentChanger: {
    width: "100%",
    height: 700,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },

  drawerMenu: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,.4)"
  },

  drawerMenuOpen: {
    transform: [{ translateX: 0 }]
  },

  drawerMenuClosed: {
    transform: [{ translateX: 450 }]
  },

  drawerMenuLinks: {
    marginTop: 20,
    width: 220,
    fontSize: 22,
    textAlign: "left",
    color: "#192A56"
  },

  drawerContainer: {
    width: "80%",
    height: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    paddingTop: 50
  },

  closeButtonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    minHeight: 20
  },

  bottomNavContainer: {
    width: "100%",
    paddingTop: 4,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderTopColor: ""
  },

  bottomNavButton: {
    width: 90,
    height: 57,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end"
  }
});

export default HomeScreenUser;
