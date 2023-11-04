import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, Alert, StyleSheet } from "react-native";
import Database from "./Database";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EditHikeScreen = ({ route, navigation }) => {
  const [hikeDetails, setHikeDetails] = useState({
    id: "",
    hikeName: "",
    location: "",
    selectedDate: new Date(),
    parkingAvailable: "yes",
    length: "",
    difficulty: "",
    description: "",
  });

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  useEffect(() => {
    const loadHikeDetails = async () => {
      if (route.params?.id) {
        try {
          const details = await Database.getHikeById(route.params.id);
          if (details) {
            setHikeDetails({
              ...details,
              selectedDate: new Date(details.selectedDate),
            });
          } else {
            Alert.alert("Error", "Hike details not found.");
            navigation.goBack();
          }
        } catch (error) {
          console.error("Error fetching hike details:", error);
          Alert.alert("Error", "Unable to load hike details");
        }
      }
    };

    loadHikeDetails();
  }, [route.params?.id]);

  const handleSave = async () => {
    try {
      const result = await Database.updateHike(
        hikeDetails.id,
        hikeDetails.hikeName,
        hikeDetails.location,
        hikeDetails.selectedDate.toISOString(),
        hikeDetails.parkingAvailable,
        hikeDetails.length,
        hikeDetails.difficulty,
        hikeDetails.description
      );
      Alert.alert("Success", "Hike details updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating hike:", error);
      Alert.alert("Error", "Failed to update hike");
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setHikeDetails({ ...hikeDetails, selectedDate: date });
    hideDatePicker();
  };

  const handleChange = (name, value) => {
    setHikeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <View style={styles.container}>
      {/* Name Input */}
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={hikeDetails.hikeName}
        onChangeText={(text) => handleChange("hikeName", text)}
      />

      {/* Location Input */}
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={hikeDetails.location}
        onChangeText={(text) => handleChange("location", text)}
      />

      {/* Date Picker */}
      <Text style={styles.label}>Date of the hike:</Text>
      <Button title="Select a date" onPress={showDatePicker} />
      {datePickerVisible && (
        <DateTimePickerModal
          date={hikeDetails.selectedDate}
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      )}
      <Text style={styles.dateDisplay}>
        {hikeDetails.selectedDate.toLocaleDateString()}
      </Text>

      {/* Parking Available Picker */}
      <Text style={styles.label}>Parking Available:</Text>
      <RNPickerSelect
        value={hikeDetails.parkingAvailable}
        onValueChange={(value) => handleChange("parkingAvailable", value)}
        items={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
      />

      {/* Length Input */}
      <Text style={styles.label}>Length of hike:</Text>
      <TextInput
        style={styles.input}
        value={hikeDetails.length}
        onChangeText={(text) => handleChange("length", text)}
      />

      {/* Difficulty Input */}
      <Text style={styles.label}>Difficulty Level:</Text>
      <TextInput
        style={styles.input}
        value={hikeDetails.difficulty}
        onChangeText={(text) => handleChange("difficulty", text)}
      />

      {/* Description Input */}
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={hikeDetails.description}
        onChangeText={(text) => handleChange("description", text)}
        multiline
      />

      {/* Save Button */}
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "grey",
    marginBottom: 10,
    padding: 10,
  },
  dateDisplay: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default EditHikeScreen;
