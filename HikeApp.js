import React, { useState, useEffect } from "react";
import {
  Button,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { styles } from "./styles/HikeAddStyle";
import Database from "./Database";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const HikeApp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

  const [location, setLocation] = useState("");
  const [parkingAvailable, setParkingAvailable] = useState("yes");
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [length, setLength] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const initDB = async () => {
      try {
        await Database.initDatabase();
        console.log("Database initialized");
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    initDB();
  }, []);
  const handleAddHike = async () => {
    const originalDate = new Date(dateTime);
    console.log(originalDate);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    if (
      !name ||
      !location ||
      !formattedDate ||
      !parkingAvailable ||
      !length ||
      !difficulty 
    ) {
      Alert.alert("Error", "All required fields must be filled ");
      return;
    }

    try {
      // Add the hike to the database
      const insertId = await Database.addHike(
        name,
        location,
        formattedDate, // You should use formattedDate here, not dateTime
        parkingAvailable,
        length,
        difficulty,
        description
      );

      console.log("Hike added with ID:", insertId);

      if (insertId) {
        Alert.alert("Success", "Your hike has been added");
        // Navigate to the HikeDetail screen with the new hike's id
        navigation.navigate("HikeDetail", { id: insertId });
      } else {
        Alert.alert("Error", "Failed to add hike");
      }
    } catch (error) {
      console.error("Error adding hike:", error);
      Alert.alert("Error", "Failed to add hike");
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const handleConfirm = (date) => {
    setDateTime(date);
    hideDatePicker();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput
            placeholder="Search..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.infomation}>
          <View style={styles.children}>
            <Text style={styles.TextInf}> Name of hike </Text>
            <TextInput
              placeholder="Son Dong"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.children}>
            <Text style={styles.TextInf}> Location</Text>
            <TextInput
              placeholder="Quang Binh"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <Text style={styles.text}>Date of the hike</Text>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 2 }}>
            {dateTime
              ? new Date(dateTime).toLocaleDateString()
              : "No date selected"}
          </Text>
          <Button title="Select a date" onPress={showDatePicker} />
          <DateTimePickerModal
            date={dateTime}
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <View style={styles.children}>
            <Text style={styles.TextInf}>Parking Available</Text>
            <RNPickerSelect
              onValueChange={(value) => setParkingAvailable(value)}
              items={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </View>

          <View style={styles.children}>
            <Text style={styles.TextInf}> Length of hike </Text>
            <TextInput
              placeholder="100"
              value={length}
              onChangeText={setLength}
            />
          </View>

          <View style={styles.children}>
            <Text style={styles.TextInf}>Difficult Level </Text>
            <TextInput
              placeholder="High"
              value={difficulty}
              onChangeText={setDifficulty}
            />
          </View>

          <View style={styles.children}>
            <Text style={styles.TextInf}>Description</Text>
          </View>
          <TextInput
            placeholder="Description about hike....."
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        <View style={styles.Button}>
  
<View style={styles.add}><Button  
          style={styles.buttonText} 
          onPress={handleAddHike} 
          title="Add"/>
          </View>
<View><Button
              title="Detail"
              onPress={() => {
                navigation.navigate("HikeDetail");
              }}/></View>
          

          
          
            
          
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HikeApp;
