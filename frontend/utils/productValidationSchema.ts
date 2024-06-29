import * as yup from 'yup'

const maxDate = new Date()
maxDate.setFullYear(maxDate.getFullYear() - 18)

const productValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  type: yup.string().required('Type of product is required'),
  image: yup.string().required('Image is required'),
})

export default productValidationSchema
