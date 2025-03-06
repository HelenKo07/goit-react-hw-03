import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";

const initialValues = {
  name: "",
  number: "",
};

export default function ContactForm({onAdd}) {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {    
    onAdd({
        id: Date.now(),
        ...values,
    });
    actions.resetForm();
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
      number: Yup.string()
      .matches(/^[+\d]?[0-9\s\-()]{3,50}$/, "Number must be between 3 and 50 digits")
      .required("Number is required"),
  });
 

  return (
    <Formik initialValues={ initialValues } onSubmit={handleSubmit} validationSchema={validationSchema}>
      <Form className={css.form}>
        <label htmlFor={nameFieldId}>Name</label>
        <Field
          className={css.field}
          autoComplete="on"
          type="text"
          name="name"
          id={nameFieldId}
        />
          <ErrorMessage className={css.error} name="name" as="span" />
        <label htmlFor={numberFieldId}>Number</label>
        <Field
          className={css.field}
          autoComplete="on"
          type="text"
          name="number"
          id={numberFieldId}
        />
          <ErrorMessage className={css.error} name="number" as="span" />
        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}


