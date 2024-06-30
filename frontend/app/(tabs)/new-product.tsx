import { useState } from 'react'
import { View, Text, Button, Image } from 'react-native'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker'
import { yupResolver } from '@hookform/resolvers/yup'
import productValidationSchema from '@/utils/schemas/productValidationSchema'
import CustomInput from '@/components/CustomInput'
import { ProductForm } from '@/constants/types'
import CustomModal from '@/components/CustomModal/CustomModal'
import formattedFormData from '@/utils/formattedFormData'
import useProductApi from '@/hooks/useProductApi'
import { globalStyles } from '@/constants/globalStyles'

const NewProduct = () => {
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
      image: undefined,
    },
  })

  const { createProduct } = useProductApi()
  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
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
      const image = pickerResult as unknown as File
      setSelectedImage(image)
      setValue('image', image)
    }
  }

  const handleImageDelete = () => {
    setSelectedImage(null)
    setValue('image', '')
  }

  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('type', data.type)

    if (data.image) {
      if (data.image.size > 0) {
        formData.append('image', data.image, data.image.name)
      }
    }

    await createProduct(formData).then(() => {
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
      <View style={globalStyles.formContainer}>
        <View style={globalStyles.form}>
          <View style={globalStyles.column}>
            <CustomInput<T extends FieldValues>
              control={control}
              name="name"
              label="product name"
              isError={!!errors.name}
              errorMessage={errors.name?.message!}
            />
            {selectedImage ? (
              <View style={globalStyles.previewImageContainer}>
                <Image
                  source={{ uri: selectedImage }}
                  style={globalStyles.previewImage}
                  resizeMode="cover"
                />
                <View style={globalStyles.selectImageButton}>
                  <Button
                    title="Delete Image"
                    onPress={handleImageDelete}
                    color="transparent"
                  />
                </View>
              </View>
            ) : (
              <View style={globalStyles.selectImageButton}>
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
          <View style={globalStyles.column}>
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={globalStyles.label}>
                    select a type of product:
                  </Text>
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
            {errors.type && (
              <Text style={{ color: 'red' }}>{errors.type.message}</Text>
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

export default NewProduct
