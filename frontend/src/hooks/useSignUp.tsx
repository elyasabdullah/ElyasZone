import * as Yup from 'yup';
import { useFormik } from 'formik';
import { RegistrationData } from 'src/types';

type Iprops = {
  onSumitForm: (data: RegistrationData) => void,
  initialState: RegistrationData | undefined
}
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;

const useSignUp = ({onSumitForm, initialState}: Iprops) => {
  const signUpSheme = Yup.object({
    username: Yup.string().trim().required("Please enter your name"),
    password: Yup.string().trim().required("your password is required")
    .matches(passwordRules, {message: "Please create a stronger password"}),
  })

  const formik = useFormik<Partial<RegistrationData>>({
    validationSchema: signUpSheme,
    enableReinitialize: true,
    initialValues: initialState ?? {},
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: (values) => {
      onSumitForm(values as RegistrationData)
    }
  })

  const getError = (key: keyof RegistrationData) => {
    return formik.errors?.[key] as string
  }

  const handleChange = async (value: string | null, key: string) => {
    await formik.setFieldValue(key!, value)
  };

  const onSubmit = () => {
    const { username, password } = formik.values;
    formik.setValues({
      username: username?.trim(),
      password: password?.trim(),
    });
    formik.handleSubmit()
  }

  return {
    values: formik.values,
    onSubmit,
    getError,
    handleChange,
    resetForm: formik.resetForm
  }
}

export default useSignUp;
