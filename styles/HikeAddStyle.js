import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  search: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingRight: 180,
    backgroundColor: "#EAEDF1",
  },
  infomation: {
    marginRight: 200,
  },
  children: {
    marginBottom: 10,
  },
  TextInf: {
    fontWeight: "bold",
    fontSize: 17,
  },
  ButtonSM: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 40,
  },
  ButtonDT: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 40,
  },
  Button: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
});
