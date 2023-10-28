import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Alert,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


export default function MyReviewCard({ review }) {

	const rData = review;

	const navigation = useNavigation();

	// Function to handle the confirmation of the delete function of a card
	const handleDelete = async () => {
		Alert.alert(
			"Confirm Delete",
			"Are you sure you want to delete this review?",
			[
				{
					text: "No",
					style: "cancel",
				},
				{
					text: "Yes",
					onPress: () => confirmDelete(), // Call confirmDelete when "Yes" is pressed
				},
			]
		);
	};

	// Function to handle he delete function itself
	const confirmDelete = async () => {
		try {
			await axios.delete(`http://192.168.227.139:3500/api/reviews/delete/${review._id}`);
			console.log("Review Deleted Successfully");
		} catch (error) {
			console.error("Error deleting review: ", error);
		}
	};

	// Function to navigate to the edit review page
	const handleEditReview = (review) => {
		// Navigate to the EditBookReview page with the review data as a parameter
		

		navigation.navigate("EditBookReview", {data:review});
	  };

	return (
		<View style={styles.container}>
			<View style={styles.cardFirstRow}>
				<View style={styles.votes}>
					<View style={styles.voteIcon}>
						<Icon
							name="chevron-up"
							size={25}
							style={styles.voteIcon}
						></Icon>
					</View>
					<View style={styles.voteCount}>
						<Text>{review.votes}</Text>
						{/* <Text>{review.votes}</Text> */}
					</View>
					<View style={styles.voteIcon}>
						<Icon
							name="chevron-down"
							size={25}
							style={styles.voteIcon}
						></Icon>
					</View>
				</View>

				<View style={styles.bookData}>
					<Text style={styles.bookTitle}>{review.bookName}</Text>
					<Text
						style={styles.authorName}
					>{`By ${review.authorName}`}</Text>
					<View style={styles.starRating}>
						<AirbnbRating
							count={5}
							defaultRating={review.rating}
							size={20}
							showRating={false}
							isDisabled
							selectedColor="#FA7A50"
							unSelectedColor="#C0C0C0"
							reviewColor="#FA7A50"
						/>
					</View>
					<Text style={styles.profileName}>
						Review by{" "}
						<Text style={styles.profileName}>
							{review.username}
						</Text>
					</Text>
				</View>

				<View style={styles.bookImage}>
					<Image
						source={{
							uri: `data:image/png;base64,${review.bookCover}`,
						}}
						style={styles.bookCover}
						resizeMode="cover"
					/>
				</View>
			</View>
			<View style={styles.cardSecondRow}>
				<Text style={styles.description}>{review.description}</Text>
			</View>
			<View style={styles.actionButtons}>
				<TouchableOpacity
					style={styles.editButton}
					onPress={()=>handleEditReview(rData)}
				>
					<Text style={styles.buttonText}>Edit</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.deleteButton}
					onPress={handleDelete}
				>
					<Text style={styles.buttonText}>Delete</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// flexDirection: "row",
		// alignItems: "center",
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#EAEAEA",
		backgroundColor: "#D2D9F0",
		borderRadius: 10,
		marginBottom: 30,
	},
	cardFirstRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	votes: {
		paddingTop: 3,
		alignItems: "center",
		marginRight: 10,
		paddingLeft: 7,
	},
	voteIcon: {
		color: "grey",
	},
	bookData: {
		//marginRight: 10
	},
	bookTitle: {
		fontSize: 16,
		fontWeight: "bold",
		paddingLeft: 5,
		marginTop: 5,
		width: 190,
	},
	authorName: {
		fontSize: 14,
		color: "#666",
		marginTop: 5,
		paddingLeft: 5,
		width: 175,
	},
	starRating: {
		marginTop: 5,
		alignItems: "flex-start",
	},
	profileName: {
		marginLeft: -47,
		//paddingLeft: 5,
		fontSize: 12,
		color: "#666",
		marginTop: 25,
	},
	bookImage: {
		alignItems: "flex-end",
	},
	bookCover: {
		width: 89,
		height: 125,
		marginLeft: -15,
		//marginRight: 10,
		borderRadius: 10,
		marginRight: 5,
	},
	cardSecondtRow: {
		flexDirection: "row",
	},
	description: {
		fontSize: 14,
		textAlign: "justify",
		marginTop: 5,
		paddingHorizontal: 5,
	},
	actionButtons: {
		position: "absolute",
		bottom: -18,
		right: 10,
		flexDirection: "row",
	},
	editButton: {
		backgroundColor: "#192A56",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5,
		marginRight: 10,
		width: 70,
		alignItems: "center",
	},
	deleteButton: {
		backgroundColor: "#EA2027",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5,
		width: 70,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
});
