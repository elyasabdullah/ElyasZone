import { useFormik } from "formik";
import * as Yup from 'yup';
import { ServiceData } from "src/types";

interface Iprops {
  onSubmitForm: (data: ServiceData) => void,
  initialState: ServiceData | undefined
}

const useCreateNewService = ({onSubmitForm, initialState}:Iprops) =>{ 
  const activityScheme = Yup.object({
    type: Yup.string().required("You should select service type"),
    description:Yup.string().required("You need to add the service description"),
    contactInfo: Yup.string().required("You need to add the contact information"),
  })

  const formik = useFormik<Partial<ServiceData>>({
    validationSchema: activityScheme,
    enableReinitialize: true,
    initialValues: initialState ?? {},
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    onSubmit: (values, { resetForm }) => {
      onSubmitForm(values as ServiceData);
    }
  });

  const getError = (key: keyof ServiceData) => {
    return formik.errors?.[key] as string;
  };

  const handleChange = async (value: string | null, key: string) => {
    await formik.setFieldValue(key!, value)
  }

  const onSubmit = () => {
    formik.handleSubmit();
  }

  return {
    values: formik.values,
    getError,
    handleChange,
    resetForm: formik.resetForm,
    onSubmit
  }
}

export default useCreateNewService