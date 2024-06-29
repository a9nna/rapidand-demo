import { useState } from 'react'
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker'
import { yupResolver } from '@hookform/resolvers/yup'
import productValidationSchema from '@/utils/productValidationSchema'
import CustomInput from '@/components/CustomInput'
import { ProductForm } from '@/utils/types'
import CustomModal from '@/components/CustomModal'
import formattedFormData from '@/utils/formattedFormData'

const App = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(productValidationSchema),
    defaultValues: {
      name: '',
      type: '',
      image: '',
    },
  })

  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [modalData, setModalData] = useState<string[]>([])
  const [towns, setTowns] = useState<string[]>([
    'Kingston',
    'Spanish Town',
    'Portmore',
    'Montego Bay',
    'Mandeville',
    'May Pen',
  ])

  const handleImageUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
      console.log('Permission to access camera roll is required!')
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri)
      setValue('image', pickerResult.assets[0].uri)
    }
  }

  const handleImageDelete = () => {
    setSelectedImage(null)
    setValue('image', '')
  }

  const onSubmit = (data: ProductForm) => {
    const formattedData = formattedFormData(data)

    setModalData(formattedData)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <View>
      <CustomModal
        data={modalData}
        isVisible={isModalVisible}
        onClose={closeModal}
      />
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.column}>
            <CustomInput
              control={control}
              name="name"
              label="product name"
              isError={!!errors.name}
              errorMessage={errors.name?.message!}
            />
            {selectedImage ? (
              <View style={styles.previewImageContainer}>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.previewImage}
                />
                <View style={styles.selectImageButton}>
                  <Button
                    title="Delete Image"
                    onPress={handleImageDelete}
                    color="transparent"
                  />
                </View>
              </View>
            ) : (
              <View style={styles.selectImageButton}>
                <Button
                  title="Pick Image"
                  onPress={handleImageUpload}
                  color="transparent"
                />
              </View>
            )}
            {errors.image && (
              <Text style={{ color: 'red' }}>{errors.image.message}</Text>
            )}
          </View>
          <View style={styles.column}>
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={styles.label}>select a type of product:</Text>
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={styles.input}
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
            {errors.type && (
              <Text style={{ color: 'red' }}>{errors.type.message}</Text>
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
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  column: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '20%',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  selectImageButton: {
    backgroundColor: '#2c6ed7',
    borderRadius: 10,
    height: 45,
    justifyContent: 'center',
  },
  previewImageContainer: {
    flexDirection: 'row',
    gap: 10,
  },
})

export default App
