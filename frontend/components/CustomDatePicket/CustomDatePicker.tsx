import { useState } from 'react'
import { Button, Platform, Text, TextInput } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { customDatePickerStyles } from './customDatePickerStyles'

const CustomDatePicker = ({
  onChange,
  value,
}: {
  onChange: (date: Date | null) => void
  value: Date
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: Date | null) => {
    hideDatePicker()
  }

  if (Platform.OS === 'web') {
    return (
      <>
        <Text style={customDatePickerStyles.label}>Date of birth</Text>
        <DatePicker
          showMonthDropdown
          showYearDropdown
          selected={value}
          onChange={onChange}
          dateFormat="dd/MM/yyyy"
          dropdownMode="select"
          calendarStartDay={1}
          customInput={<TextInput style={customDatePickerStyles.input} />}
        />
      </>
    )
  } else {
    return (
      <>
        <Button title="Select Date of Birth" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => {
            handleConfirm(date)
            onChange(date)
          }}
          onCancel={hideDatePicker}
        />
      </>
    )
  }
}

export default CustomDatePicker
