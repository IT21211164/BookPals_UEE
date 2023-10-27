import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Image,
	SafeAreaView,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import axios from "axios";
import ReviewCard from "../components/bookpals_ReviewCard";
import filter from "lodash.filter";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";

const API_ENDPOINT = "http://192.168.8.117:3500/api/reviews/read";

export default function ExploreReviews() {
	const [searchQuery, setSearchQuery] = useState("");
	const [error, setError] = useState(null);
	const [reviews, setReviews] = useState([]);
	const [fullData, setFullData] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [activeFilter, setActiveFilter] = useState("all");

	const [isLoading, setIsLoading] = useState(false);

	const isFocused = useIsFocused();

	const navigation = useNavigation();

	useEffect(() => {
		setIsLoading(true);
		fetchReviews();
	}, [isFocused, refresh]);

	// Navigation of the add review button
	const handleAddReview = () => {
		navigation.navigate("AddBookReviewForm");
		setRefresh(true);
	};

	// Fetch all reviews from the database
	const fetchReviews = async () => {
		try {
			const response = await axios.get(API_ENDPOINT);

			setReviews(response.data);
			setFullData(response.data);
			// setIsLoading(false);
		} catch (error) {
			console.error("Error fetching reviews: ", error);
			setError(error);
			// setIsLoading(false);
		} finally {
			// Set loading state to false when data fetching is done
			setIsLoading(false);
		}
	};

	// Function to handle the search
	const handleSearch = (query) => {
		setSearchQuery(query);
		const formattedQuery = query.toLowerCase();
		const filteredData = filter(fullData, (review) => {
			return contains(review, formattedQuery);
		});
		setReviews(filteredData);
	};

	const contains = ({ bookName, authorName }, query) => {
		const lowerCaseQuery = query.toLowerCase();

		if (
			bookName.toLowerCase().includes(lowerCaseQuery) ||
			authorName.toLowerCase().includes(lowerCaseQuery)
		) {
			return true;
		}
		return false;
	};

	// Function to filter reviews based on the active filter
	const filterReviews = () => {
		switch (activeFilter) {
			case "highestVoted":
				return reviews.slice().sort((a, b) => b.votes - a.votes);
			case "lowestVoted":
				return reviews.slice().sort((a, b) => a.votes - b.votes);
			default:
				return reviews;
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
				<Text style={styles.headerText}>Explore Reviews</Text>
			</View>
			<View style={styles.addReviewBtnContainer}>
				<TouchableOpacity
					style={styles.addReviewBtn}
					onPress={handleAddReview}
				>
					<Text style={styles.addReviewText}>Add a Review</Text>
				</TouchableOpacity>
			</View>
			<TextInput
				style={styles.searchInput}
				placeholder="Search by book name/author"
				clearButtonMode="always"
				autoCapitalize="none"
				autoCorrect={false}
				value={searchQuery}
				onChangeText={(query) => handleSearch(query)}
			/>

			<View style={styles.filterBar}>
				<TouchableOpacity
					style={[
						styles.filterBtn,
						activeFilter === "all" && {
							backgroundColor: "#192A56",
						},
					]}
					onPress={() => setActiveFilter("all")}
				>
					<Text
						style={[
							styles.filterBtnText,
							activeFilter === "all" && { color: "white" },
						]}
					>
						All Reviews
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.filterBtn,
						activeFilter === "highestVoted" && {
							backgroundColor: "#192A56",
						},
					]}
					onPress={() => setActiveFilter("highestVoted")}
				>
					<Text
						style={[
							styles.filterBtnText,
							activeFilter === "highestVoted" && {
								color: "white",
							},
						]}
					>
						Highest Voted
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.filterBtn,
						activeFilter === "lowestVoted" && {
							backgroundColor: "#192A56",
						},
					]}
					onPress={() => setActiveFilter("lowestVoted")}
				>
					<Text
						style={[
							styles.filterBtnText,
							activeFilter === "lowestVoted" && {
								color: "white",
							},
						]}
					>
						Lowest Voted
					</Text>
				</TouchableOpacity>
			</View>

			{isLoading ? (
				<ActivityIndicator
					size="large"
					color="#FA7A50"
					style={{ marginTop: 20, marginBottom: 20 }}
				/>
			) : (
				<ScrollView style={styles.scrollArea}>
					{filterReviews().map((review) => (
						<ReviewCard key={review._id} review={review} />
					))}
				</ScrollView>
			)}

			<ScrollView style={styles.scrollArea}>
				{filterReviews().map((review) => (
					<ReviewCard key={review._id} review={review} />
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
		paddingLeft: 75,
		color: "#192A56",
	},
	addReviewBtnContainer: {
		alignItems: "center",
	},
	addReviewBtn: {
		backgroundColor: "#192A56",
		padding: 12,
		borderRadius: 10,
		alignItems: "center",
		marginVertical: 10,
		width: 200,
	},
	addReviewText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
	},
	scrollArea: {
		marginBottom: 255,
	},
	searchInput: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
	},

	filterBar: {
		flexDirection: "row",
		marginBottom: 10,
	},
	filterBtn: {
		backgroundColor: "lightgrey",
		paddingHorizontal: 17,
		paddingVertical: 8,
		borderRadius: 20,
		alignItems: "center",
		marginRight: 5,
		width: "auto",
		color: "#192A56",
	},
	filterBtnText: {
		color: "#192A56",
		fontSize: 14,
	},
});
