import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

const ReviewCard = ({ review }) => {
	const [isUpvoted, setIsUpvoted] = useState(false);
	const [isDownvoted, setIsDownvoted] = useState(false);
	const [voteCount, setVoteCount] = useState(review.votes);

	const API_ENDPOINT = "http://192.168.8.117:3500/api/reviews";

	// Function to handle the upvote of a review
	const handleUpvote = async () => {
		let newVoteCount = voteCount;

		if (isUpvoted) {
			// If already upvoted, cancel the upvote
			newVoteCount -= 1;
			setIsUpvoted(false);
		} else {
			// Upvote
			newVoteCount += 1;
			setIsUpvoted(true);

			// If previously downvoted, cancel the downvote
			if (isDownvoted) {
				newVoteCount += 1;
				setIsDownvoted(false);
			}
		}

		setVoteCount(newVoteCount);

		// Send an upvote request to your API
		await axios.put(`${API_ENDPOINT}/upvote/${review._id}`, {
			newVoteCount,
		});
	};

	// Function to handle the downvote of a review
	const handleDownvote = async () => {
		let newVoteCount = voteCount;

		if (isDownvoted) {
			// If already downvoted, cancel the downvote
			newVoteCount += 1;
			setIsDownvoted(false);
		} else {
			// Downvote
			newVoteCount -= 1;
			setIsDownvoted(true);

			// If previously upvoted, cancel the upvote
			if (isUpvoted) {
				newVoteCount -= 1;
				setIsUpvoted(false);
			}
		}

		setVoteCount(newVoteCount);

		// Send a downvote request to API
		await axios.put(`${API_ENDPOINT}/downvote/${review._id}`, {
			newVoteCount,
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.cardFirstRow}>
				<View style={styles.votes}>
					<View style={styles.upVoteIcon}>
						<TouchableOpacity onPress={handleUpvote}>
							<Icon
								name="chevron-up"
								size={25}
								style={{
									...styles.icon,
									color: isUpvoted ? "green" : "black",
								}}
							></Icon>
						</TouchableOpacity>
					</View>
					<View style={styles.voteCount}>
						<Text>{voteCount}</Text>
						{/* <Text>{review.votes}</Text> */}
					</View>
					<View style={styles.downVoteIcon}>
						<TouchableOpacity onPress={handleDownvote}>
							<Icon
								name="chevron-down"
								size={25}
								style={{
									...styles.icon,
									color: isDownvoted ? "red" : "black",
								}}
							></Icon>
						</TouchableOpacity>
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// flexDirection: "row",
		// alignItems: "center",
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#EAEAEA",
		backgroundColor: "#D2D9F0",
		borderRadius: 10,
		marginBottom: 10,
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
});

export default ReviewCard;
