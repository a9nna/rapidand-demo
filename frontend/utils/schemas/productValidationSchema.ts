import * as yup from 'yup'

const maxDate = new Date()
maxDate.setFullYear(maxDate.getFullYear() - 18)

const productValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  type: yup.string().required('Type of product is required'),
  image: yup
    .mixed<File>()
    .required('Image is required')
    .test('is-file', 'Uploaded file is not of type image', (value) => {
      return value && value instanceof File
    }),
})

export default productValidationSchema
