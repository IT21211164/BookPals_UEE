import React, { useState, useEffect } from "react";
import { AirbnbRating } from "react-native-ratings";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Image,
	SafeAreaView,
	ScrollView,
	Picker,
    Alert
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditBookReview() {
    const [reviewId, setReviewId] = useState(null); 
	const [bookName, setBookName] = useState(null);
	const [authorName, setAuthorName] = useState(null);
	const [bookRating, setBookRating] = useState(null);
	const [bookCover, setBookCover] = useState(null);
	const [bookDescription, setBookDescription] = useState(null);

	// const [userId, setUserId] = useState("null");
	// const [username, setUsername] = useState("null");

	const navigation = useNavigation();
	const route = useRoute();
	const reviewData = route.params.data;

	useEffect(() => {
		if (reviewData) {
			// Populate the form fields with the review data
			setBookName(reviewData.bookName);
			setAuthorName(reviewData.authorName);
			setBookRating(reviewData.rating);
			setBookDescription(reviewData.description);
			setBookCover(reviewData.bookCover);
            setReviewId(reviewData._id)
		}
	}, [reviewData]);

    // Function to handle the confirmation of the update
	const handleSubmit = async () => {
		Alert.alert(
			"Confirm Update",
			"Are you sure you want to update this review? (This will reset your review's vote count to zero)",
			[
				{
					text: "No",
					style: "cancel",
				},
				{
					text: "Yes",
					onPress: () => confirmSubmit(),
				},
			]
		);
	};

	// Function to handle the update itself
	const confirmSubmit = async () => {
		// Check if required fields are not empty
		if (!bookName || !authorName || !bookDescription) {
			console.log("Please fill in all required fields.");
			alert("Please fill in all required fields.");
			return;
		}

		// Convert the selected image to base64
		if (!bookCover) {
			console.log("Please select a book cover image.");
			alert("Please select a book cover image");
			return;
		}

		try {
			// Send a PUT request to update the review
			await axios.put(
				`http://192.168.227.139:3500/api/reviews/update/${reviewId}`,
				{
					bookName,
					authorName,
					rating: bookRating,
					description: bookDescription,
					bookCover,
                    votes : 0
				}
			);

			// Handle the response
			navigation.navigate("MyReviews");

			console.log("Review updated successfully");
		} catch (error) {
			console.error("Error updating the review:", error);
		}
	};

	// Top back button navigation configuration
	const handleTopBackBtn = () => {
		navigation.navigate("MyReviews");
	};

	// Image picker configuration
	const openImagePicker = async () => {
		const { status } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			console.log("Permission to access media library denied");
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
			base64: true, // Request the image in base64 format
		});

		if (!result.canceled) {
			const base64Image = result.base64; // The selected image in base64 format
			setBookCover(base64Image);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={handleTopBackBtn}>
					<Image
						source={require("../assets/back_btn_icon.png")}
						style={styles.backButton}
						resizeMode="contain"
					/>
				</TouchableOpacity>
				<Text style={styles.headerText}>Edit Your Book Review</Text>
			</View>
			<ScrollView>
				<View style={styles.form}>
					<Text style={styles.formInstruction}>
						Change the details accordingly
					</Text>
					<View style={styles.formGroup}>
						<View style={styles.labelContainer}>
							<Text style={styles.label}>Book Name</Text>
							<Text style={styles.labelVal}>*</Text>
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								value={bookName}
								onChangeText={(text) => setBookName(text)}
								underlineColorAndroid="transparent"
								placeholder="Enter Book Name"
							/>
						</View>
					</View>
					<View style={styles.formGroup}>
						<View style={styles.labelContainer}>
							<Text style={styles.label}>Author Name</Text>
							<Text style={styles.labelVal}>*</Text>
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								value={authorName}
								onChangeText={(text) => setAuthorName(text)}
								underlineColorAndroid="transparent"
								placeholder="Enter Author Name"
							/>
						</View>
					</View>
					<View style={styles.formGroup}>
						<View style={styles.labelContainer}>
							<Text style={styles.label}>Rate The Book</Text>
							<Text style={styles.labelVal}>*</Text>
						</View>
						<View>
							<AirbnbRating
								reviews={[
									"Poor",
									"Bad",
									"Good",
									"Very Good",
									"Excellent",
								]}
								count={5}
								defaultRating={bookRating}
								selectedColor="#FA7A50"
								unSelectedColor="#C0C0C0"
								reviewColor="#FA7A50"
								size={28}
								showRating={false}
								onFinishRating={(rating) =>
									setBookRating(rating)
								}
							/>
						</View>
					</View>
					<View style={styles.formGroup}>
						<View style={styles.labelContainer}>
							<Text style={styles.label}>
								Upload Book Cover Image
							</Text>
							<Text style={styles.labelVal}>*</Text>
						</View>
						<View style={styles.imageUploadContainer}>
							<TouchableOpacity
								value={bookCover}
								onPress={openImagePicker}
							>
								<Image
									source={require("../assets/image_upload_btn.png")}
									style={styles.imageUploadButton}
								/>
							</TouchableOpacity>
							{bookCover && (
								<View style={styles.checkmarkContainer}>
									<Ionicons
										name="md-checkmark-circle"
										size={24}
										color="green"
									/>
								</View>
							)}
						</View>
					</View>
					<View style={styles.formGroup}>
						<View style={styles.labelContainer}>
							<Text style={styles.label}>Book Description</Text>
							<Text style={styles.labelVal}>*</Text>
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								style={[styles.bookDescriptionInput]}
								value={bookDescription}
								onChangeText={(text) =>
									setBookDescription(text)
								}
								multiline
								underlineColorAndroid="transparent"
								placeholder="Enter Book Description"
								textAlignVertical="top"
							/>
						</View>
					</View>
					<View style={styles.submitBtnContainer}>
						<TouchableOpacity
							style={styles.submitBtn}
							onPress={handleSubmit}
						>
							<Text style={styles.submitText}>Update Review</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		padding: 16,
		paddingTop: 20,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		margin: 8,
		paddingTop: 30,
		paddingBottom: 20,
	},
	backButton: {
		width: 20,
		height: 20,
		tintColor: "#192A56",
	},
	headerText: {
		fontSize: 20,
		fontWeight: "bold",
		paddingLeft: 60,
		color: "#192A56",
	},
	form: {
		padding: 16,
	},
	formInstruction: {
		fontSize: 16,
		fontWeight: "500",
		color: "#FA7A50",
		// fontFamily: "Inter"
	},
	formGroup: {
		marginVertical: 8,
	},
	labelContainer: {
		flexDirection: "row",
		marginLeft: 5,
		marginBottom: 5,
	},
	label: {
		fontSize: 14,
		fontWeight: "400",
		color: "#2d3436",
	},
	labelVal: {
		fontSize: 14,
		fontWeight: "400",
		color: "#FA7A50",
	},
	inputContainer: {
		borderColor: "#C0C0C0",
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: "#D9D9D9",
		marginBottom: 10,
	},
	input: {
		height: 40,
		padding: 8,
	},
	bookDescriptionInput: {
		height: 130,
		padding: 8,
	},
	imageUploadButton: {
		width: 50,
		height: 50,
		alignSelf: "center",
		tintColor: "#FA7A50",
	},
	submitBtnContainer: {
		alignItems: "center",
	},
	submitBtn: {
		backgroundColor: "#FA7A50",
		padding: 12,
		borderRadius: 10,
		alignItems: "center",
		marginVertical: 16,
		width: 200,
	},
	submitText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
	},
	checkmarkContainer: {
		position: "absolute",
		top: 30,
		right: 135,
	},
});
