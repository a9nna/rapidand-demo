import { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { Picker } from '@react-native-picker/picker'
import { ClientForm } from '@/constants/types'
import { yupResolver } from '@hookform/resolvers/yup'
import clientValidationSchema from '@/utils/clientValidationSchema'
import CustomInput from '@/components/CustomInput'
import CustomDatePicker from '@/components/CustomDatePicket/CustomDatePicker'
import CustomModal from '@/components/CustomModal/CustomModal'
import formattedFormData from '@/utils/formattedFormData'
import useClientApi from '@/hooks/useClientApi'
import { globalStyles } from '@/constants/globalStyles'

const App = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(clientValidationSchema),
    defaultValues: {
      name: '',
      lastName: '',
      dateOfBirth: new Date(),
      email: '',
      phone: '',
      address: '',
      creditCardNumber: '',
      expirationDate: '',
      cvv: '',
      parish: '',
      town: '',
    },
  })

  const { createClient } = useClientApi()
  const [expirationDate, setExpirationDate] = useState('')
  const [isModalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState<string[]>([])
  const [towns, setTowns] = useState<string[]>([
    'Kingston',
    'Spanish Town',
    'Portmore',
    'Montego Bay',
    'Mandeville',
    'May Pen',
  ])

  const formatExpirationDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
    }
    return cleaned
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const onSubmit = async (data: ClientForm) => {
    await createClient(data).then((res) => {
      const formattedData = formattedFormData(data)

      setModalData(formattedData)
      setModalVisible(true)
    })
  }

  return (
    <View>
      <CustomModal
        data={modalData}
        isVisible={isModalVisible}
        onClose={closeModal}
      />
      <View style={globalStyles.formContainer}>
        <View style={globalStyles.form}>
          <View style={globalStyles.column}>
            <CustomInput
              control={control}
              name="name"
              label="first name"
              isError={!!errors.name}
              errorMessage={errors.name?.message!}
            />
            <CustomInput
              control={control}
              name="lastName"
              label="last name"
              isError={!!errors.lastName}
              errorMessage={errors.lastName?.message!}
            />
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker onChange={onChange} value={value} />
              )}
            />
            {errors.dateOfBirth && (
              <Text style={{ color: 'red' }}>{errors.dateOfBirth.message}</Text>
            )}
            <Controller
              control={control}
              name="parish"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={globalStyles.label}>select a parish:</Text>
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={globalStyles.input}
                    itemStyle={{ height: 45, backgroundColor: 'red' }}
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
              <Text style={{ color: 'red' }}>{errors.parish.message}</Text>
            )}
            <CustomInput
              control={control}
              name="creditCardNumber"
              label="credit card number"
              isError={!!errors.creditCardNumber}
              errorMessage={errors.creditCardNumber?.message!}
            />
          </View>
          <View style={globalStyles.column}>
            <CustomInput
              control={control}
              name="email"
              label="email"
              isError={!!errors.email}
              errorMessage={errors.email?.message!}
            />
            <CustomInput
              control={control}
              name="phone"
              label="phone"
              isError={!!errors.phone}
              errorMessage={errors.phone?.message!}
            />
            <CustomInput
              control={control}
              name="address"
              label="address"
              isError={!!errors.address}
              errorMessage={errors.address?.message!}
            />
            <Controller
              control={control}
              name="town"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={globalStyles.label}>select a town:</Text>
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={globalStyles.input}
                    itemStyle={{ height: 45, backgroundColor: 'red' }}
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
              <Text style={{ color: 'red' }}>{errors.parish.message}</Text>
            )}
            <CustomInput
              control={control}
              name="cvv"
              label="cvv"
              isError={!!errors.cvv}
              errorMessage={errors.cvv?.message!}
            />
            <Controller
              control={control}
              name="expirationDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={globalStyles.label}>
                    expiration date (mm/yy)
                  </Text>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={(text) => {
                      const formatted = formatExpirationDate(text)
                      setExpirationDate(formatted)
                      onChange(formatted)
                    }}
                    value={value || expirationDate}
                    style={globalStyles.input}
                    keyboardType="number-pad"
                  />
                </>
              )}
            />
            {errors.expirationDate && (
              <Text style={{ color: 'red' }}>
                {errors.expirationDate.message}
              </Text>
            )}
          </View>
        </View>
        <View style={globalStyles.button}>
          <Button
            title="Save"
            onPress={handleSubmit(onSubmit)}
            color="transparent"
          />
        </View>
      </View>
    </View>
  )
}

export default App
