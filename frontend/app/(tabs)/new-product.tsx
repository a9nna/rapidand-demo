import { useState } from 'react'
import { View, Text, Button, Image } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker'
import { yupResolver } from '@hookform/resolvers/yup'
import productValidationSchema from '@/utils/productValidationSchema'
import CustomInput from '@/components/CustomInput'
import { ProductForm } from '@/constants/types'
import CustomModal from '@/components/CustomModal'
import formattedFormData from '@/utils/formattedFormData'
import useProductApi from '@/hooks/useProductApi'
import { styles } from '@/constants/styles'

const App = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(productValidationSchema),
    defaultValues: {
      name: '',
      type: '',
      image: '',
    },
  })

  const { createProduct } = useProductApi()
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
      base64: true,
    })

    if (!pickerResult.canceled) {
      const image: string = pickerResult.assets[0].uri
      setSelectedImage(image)
      setValue('image', image)
    }
  }

  const handleImageDelete = () => {
    setSelectedImage(null)
    setValue('image', '')
  }

  const onSubmit = async (data: ProductForm) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('type', data.type)

    if (data.image) {
      if (data.image.size > 0) {
        formData.append('image', data.image, data.image.name)
      }
    }

    await createProduct(formData).then((response) => {
      const formattedData = formattedFormData(data)

      setModalData(formattedData)
      setModalVisible(true)
    })
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
      <View style={styles.formContainer}>
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
                  resizeMode="cover"
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

export default App
