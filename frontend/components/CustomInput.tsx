import { globalStyles } from '@/constants/globalStyles'
import { Control, Controller } from 'react-hook-form'
import { View, TextInput, Text } from 'react-native'

interface FormInputProps {
  name: string
  control: Control
  label?: string
  secureTextEntry?: boolean
  isError: boolean
  errorMessage: string
}

const CustomInput: React.FC<FormInputProps> = ({
  name,
  control,
  label,
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
