import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	Image,
} from "react-native";
import MyReviewCard from "../components/bookpals_MyReviewCard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";

export default function MyReviews() {
	const [reviews, setReviews] = useState([]);
	const [userId, setUserId] = useState(null);

	const [isLoading, setIsLoading] = useState(false);

	const navigation = useNavigation();

	useEffect(() => {
		async function fetchData() {
			await getUserData();
			fetchUserReviews();
		}

		fetchData();
	}, []);

	useEffect(() => {
		setIsLoading(true);
		fetchUserReviews();
	}, [userId]);

	// Use useFocusEffect to refetch data when the screen gains focus
	useFocusEffect(() => {
		fetchUserReviews();
	});

	// Get the userId of the currently logged in user
	const getUserData = async () => {
		try {
			const savedUser = await AsyncStorage.getItem("user");
			if (savedUser) {
				const currentUser = JSON.parse(savedUser);
				if (currentUser.role === "user") {
					setUserId(currentUser.id);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Fetch the reviews created by the logged in user
	const fetchUserReviews = async () => {
		try {
			const response = await axios.get(
				`http://192.168.227.139:3500/api/reviews/myreviews/${userId}`
			);

			setReviews(response.data);
		} catch (error) {
			console.error("Error fetching user reviews: ", error);
		} finally {
			// Set loading state to false when data fetching is done
			setIsLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => navigation.navigate("HomeScreenUser")}
				>
					<Image
						source={require("../assets/back_btn_icon.png")}
						style={styles.backButton}
						resizeMode="contain"
					/>
				</TouchableOpacity>
				<Text style={styles.headerText}>My Reviews</Text>
			</View>

			{isLoading ? (
				<Spinner
					visible={isLoading}
					textContent=""
					textStyle={{ color: "transparent" }}
					color="#FA7A50"
					overlayColor="transparent"
				/>
			) : (
				<ScrollView style={styles.scrollArea}>
					{reviews.map((review) => (
						<MyReviewCard key={review._id} review={review} />
					))}
				</ScrollView>
			)}

			<ScrollView style={styles.scrollArea}>
				{reviews.map((review) => (
					<MyReviewCard key={review._id} review={review} />
				))}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		paddingTop: 20,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		margin: 8,
		paddingTop: 30,
		paddingBottom: 10,
	},
	backButton: {
		width: 20,
		height: 20,
		tintColor: "#192A56",
	},
	headerText: {
		fontSize: 20,
		fontWeight: "bold",
		paddingLeft: 95,
		color: "#192A56",
	},
	scrollArea: {
		marginBottom: 85,
	},
});
