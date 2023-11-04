import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection:"column"
  },
  search: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: 180,
    backgroundColor: "#EAEDF1",
  },
  children: {
    marginRight: 180,
    padding: 8,
    width: 200,
  },
  EditDelete: {
    flexDirection: 'row',  
  },
  EditHike:{
    margin: 5
  },
  DeleteHike:{
    margin: 5
  }

});
export { styles };
