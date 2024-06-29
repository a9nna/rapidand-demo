import * as yup from 'yup'
import valid from 'card-validator'

const maxDate = new Date()
maxDate.setFullYear(maxDate.getFullYear() - 18)

const clientValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  dateOfBirth: yup
    .date()
    .required('Date of birth is required')
    .max(maxDate, 'You must be at least 18 years old'),
  lastName: yup
    .string()
    .required('Last name is required')
    .max(100, 'Last name cannot exceed 100 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email address'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]{9}$/, 'Enter a valid phone number (10 digits)'),
  address: yup
    .string()
    .required('Address is required')
    .max(100, 'Address cannot exceed 100 characters'),
  creditCardNumber: yup
    .string()
    .required('Credit card number is required')
    .test(
      'test-credit-card',
      'Enter a valid credit card number',
      (value) => valid.number(value).isValid,
    ),
  cvv: yup
    .string()
    .required('CVV is required')
    .test('test-cvv', 'Enter a valid CVV', (value) => valid.cvv(value).isValid),
  expirationDate: yup
    .string()
    .required('Expiration date is required')
    .test(
      'test-expiration-date',
      'Enter a valid expiration date',
      (value) => valid.expirationDate(value).isValid,
    ),
  parish: yup.string().required('Parish is required'),
  town: yup.string().required('Town is required'),
})

export default clientValidationSchema
