import * as Yup from 'yup';
import { useFormik } from 'formik';
import { LoginRequest } from 'src/types';

type props = {
  onSubmitForm: (data: LoginRequest) => void,
  initialState: LoginRequest | undefined
}

const useLogin = ({onSubmitForm, initialState}: props) => {

  const loginScheme = Yup.object({
    username: Yup.string().trim().required("Username is required"), 
    password: Yup.string().trim().required("your password is required"),
  })

  const formik = useFormik<Partial<LoginRequest>>({
    validationSchema: loginScheme,
    enableReinitialize: true,
    initialValues: initialState || {},
    validateOnChange:false,
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: (values) => {
      onSubmitForm(values as LoginRequest)
    }
  })

  const getError = (key: keyof LoginRequest) => {
    return formik.errors?.[key] as string;
  }

  const handleChange = async (value: string | null, key: string) => {
    await formik.setFieldValue(key!, value)
  }

  const onSubmit = () => {
    formik.handleSubmit();
  }
  
  return {
    values: formik.values,
    onSubmit,
    getError,
    handleChange,
    errors: formik.errors,
  }
}

export default useLogin