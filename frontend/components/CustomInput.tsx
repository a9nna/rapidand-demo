import { Control, Controller } from 'react-hook-form'
import { StyleSheet, View, TextInput, Text } from 'react-native'

interface FormInputProps {
  name: string
  control: Control
  label?: string
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  isError: boolean
  errorMessage: string
}

const CustomInput: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  keyboardType = 'default',
  isError,
  errorMessage,
}) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType}
            style={styles.input}
          />
        )}
        name={name}
      />
      {isError && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 45,
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
    color: '#333',
  },
})
export default CustomInput
