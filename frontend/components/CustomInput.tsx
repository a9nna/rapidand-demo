import { globalStyles } from '@/constants/globalStyles'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { View, TextInput, Text } from 'react-native'

interface FormInputProps<T extends FieldValues> {
  name: string
  control: Control<T>
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
      {label && <Text style={globalStyles.label}>{label}</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType}
            style={globalStyles.input}
          />
        )}
        name={name}
      />
      {isError && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
    </View>
  )
}

export default CustomInput
