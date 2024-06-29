import React, { useState } from "react";
import { View, Text, TextInput, Modal, StyleSheet, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { ClientForm } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import clientValidationSchema from "@/utils/clientValidationSchema";
import CustomInput from "@/components/CustomInput";
import CustomDatePicker from "@/components/CustomDatePicker";

const App = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(clientValidationSchema),
    defaultValues: {
      name: "",
      lastName: "",
      dateOfBirth: new Date(),
      email: "",
      phone: "",
      address: "",
      creditCardNumber: "",
      expirationDate: "",
      cvv: "",
      parish: "",
      town: "",
    },
  });

  const [expirationDate, setExpirationDate] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [towns, setTowns] = useState<string[]>([
    "Kingston",
    "Spanish Town",
    "Portmore",
    "Montego Bay",
    "Mandeville",
    "May Pen",
  ]);

  const formatExpirationDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onSubmit = (data: ClientForm) => {
    setModalVisible(true);
  };

  return (
    <View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Form Data
            </Text>
            <Text>Name: {getValues().name}</Text>
            <Text>Last Name: {getValues().lastName}</Text>
            <Text>
              Date of Birth: {getValues().dateOfBirth.toLocaleDateString()}
            </Text>
            <Text>Email: {getValues().email}</Text>
            <Text>Phone: {getValues().phone}</Text>
            <Text>Address: {getValues().address}</Text>
            <Text>Credit Card: {getValues().creditCardNumber}</Text>
            <Text>Expiration Date: {getValues().expirationDate}</Text>
            <Text>CVV: {getValues().cvv}</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.column}>
            <CustomInput control={control} name="name" label="first name" />
            {errors.name && (
              <Text style={{ color: "red" }}>{errors.name.message}</Text>
            )}
            <CustomInput control={control} name="lastName" label="last name" />
            {errors.lastName && (
              <Text style={{ color: "red" }}>{errors.lastName.message}</Text>
            )}
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker onChange={onChange} value={value} />
              )}
            />
            {errors.dateOfBirth && (
              <Text style={{ color: "red" }}>{errors.dateOfBirth.message}</Text>
            )}
            <Controller
              control={control}
              name="parish"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={styles.label}>select a parish:</Text>
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={styles.input}
                    itemStyle={{ height: 45, backgroundColor: "red" }}
                  >
                    <Picker.Item value="" />
                    {towns.map((town) => (
                      <Picker.Item key={town} label={town} value={town} />
                    ))}
                  </Picker>
                </>
              )}
            />
            {errors.parish && (
              <Text style={{ color: "red" }}>{errors.parish.message}</Text>
            )}
            <CustomInput
              control={control}
              name="creditCardNumber"
              label="credit card number"
            />
            {errors.creditCardNumber && (
              <Text style={{ color: "red" }}>
                {errors.creditCardNumber.message}
              </Text>
            )}
          </View>
          <View style={styles.column}>
            <CustomInput control={control} name="email" label="email" />
            {errors.email && (
              <Text style={{ color: "red" }}>{errors.email.message}</Text>
            )}
            <CustomInput control={control} name="phone" label="phone" />
            {errors.phone && (
              <Text style={{ color: "red" }}>{errors.phone.message}</Text>
            )}
            <CustomInput control={control} name="address" label="address" />
            {errors.address && (
              <Text style={{ color: "red" }}>{errors.address.message}</Text>
            )}
            <Controller
              control={control}
              name="town"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={styles.label}>select a town:</Text>
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={styles.input}
                    itemStyle={{ height: 45, backgroundColor: "red" }}
                  >
                    <Picker.Item value="" />
                    {towns.map((town) => (
                      <Picker.Item key={town} label={town} value={town} />
                    ))}
                  </Picker>
                </>
              )}
            />
            {errors.parish && (
              <Text style={{ color: "red" }}>{errors.parish.message}</Text>
            )}
            <CustomInput control={control} name="cvv" label="cvv" />
            {errors.cvv && (
              <Text style={{ color: "red" }}>{errors.cvv.message}</Text>
            )}
            <Controller
              control={control}
              name="expirationDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={styles.label}>expiration date (mm/yy)</Text>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={(text) => {
                      const formatted = formatExpirationDate(text);
                      setExpirationDate(formatted);
                      onChange(formatted);
                    }}
                    value={value || expirationDate}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                </>
              )}
            />
            {errors.expirationDate && (
              <Text style={{ color: "red" }}>
                {errors.expirationDate.message}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.button}>
          <Button
            title="Save"
            onPress={handleSubmit(onSubmit)}
            color="transparent"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  form: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  column: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 45,
  },
  label: {
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "green",
    color: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: "20%",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    gap: 20,
  },
});

export default App;
