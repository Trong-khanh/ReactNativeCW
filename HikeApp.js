import React, { useState } from "react";
import { Button, TextInput, View, Text, Platform,TouchableOpacity,Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { styles } from "./styles/HikeAddStyle";
import DateTimePicker from "@react-native-community/datetimepicker";
import Database from "./Database"; 
import DateTimePickerModal from "react-native-modal-datetime-picker";


const HikeApp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [dateTime, setDateTime] = useState(new Date()); // comment nhu n
  const [show, setShow] = useState(false);

  const [location, setLocation] = useState("");
  const [parkingAvailable, setParkingAvailable] = useState("yes");
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [length, setLength] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");;

  //
  const handleAddHike = async () => {
    const originalDate = new Date(dateTime);
    console.log(originalDate)
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    if (!name || !location ||!formattedDate ||!parkingAvailable ||!length ||!difficulty || !description) {
      Alert.alert("Error", "All required fields must be filled ");
      return;
    }
    try {
      await Database.initDatabase(); 

      const insertResult = await Database.addHike(
        name,
        location,
        formattedDate,
        parkingAvailable,
        length,
        difficulty,
        description
      );

      console.log(insertResult)
      console.log(name)
      console.log(location)
      console.log(formattedDate)
      console.log(parkingAvailable)
      console.log(length)
      console.log(difficulty)
      console.log(description)
      
      
      if (insertResult) {
        Alert.alert("Success", "Your Hike added");
      } else {
        Alert.alert("Error", "Failed to add Hike");
      }
    } catch (error) {
      console.error("Error adding Hike:", error);
      Alert.alert("Error", "Failed to add Hike");
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
        {}
        <TouchableOpacity style={styles.button} onPress={handleAddHike}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        <View style={styles.ButtonDT}>
          <Button
            title="Detail"
            onPress={() => {
              navigation.navigate("HikeDetail");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HikeApp;
