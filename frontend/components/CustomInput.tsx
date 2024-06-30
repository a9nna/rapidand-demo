import { styles } from '@/constants/styles'
import { Control, Controller } from 'react-hook-form'
import { View, TextInput, Text } from 'react-native'

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

export default CustomInput
