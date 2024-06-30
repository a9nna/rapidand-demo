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
import useProductApi from '@/hooks/useProductApi'
import { globalStyles } from '@/constants/globalStyles'

const NewProduct = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
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
  const [selectedImageUri, setSelectedImageUri] = useState<string>('')
  const [modalData, setModalData] = useState<string>('')
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
      setSelectedImageUri(pickerResult.assets[0].uri)

      const base64 = pickerResult.assets[0].base64
      const mimeType = pickerResult.assets[0].mimeType
      const fileName = pickerResult.assets[0].fileName

      if (base64 && fileName && mimeType) {
        const base64ToBlob = (base64: string) => {
          const binary = atob(base64.replace(/\s/g, ''))
          const length = binary.length
          const buffer = new ArrayBuffer(length)
          const view = new Uint8Array(buffer)
          for (let i = 0; i < length; i++) {
            view[i] = binary.charCodeAt(i)
          }
          return new File([view], fileName, {
            type: mimeType,
            lastModified: Date.now(),
          })
        }

        const imageBlob = base64ToBlob(base64)
        setValue('image', imageBlob)
      }
    }
  }

  const handleImageDelete = () => {
    setSelectedImageUri('')
    setValue('image', undefined as unknown as File)
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
      setModalData('Product created successfully')
      setModalVisible(true)

      setSelectedImageUri('')
      reset()
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
            <CustomInput
              control={control}
              name="name"
              label="product name"
              isError={!!errors.name}
              errorMessage={errors.name?.message!}
            />
            {selectedImageUri ? (
              <View style={globalStyles.previewImageContainer}>
                <Image
                  source={{ uri: selectedImageUri }}
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
