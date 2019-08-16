import React from "react";
import { withFormik, Form, Field } from "formik";

const OnBoardForm = ({ errors, touched, values }) => {
  return (
    <Form>
      <Field name="name" placeholder="Name" />
      <Field name="email" placeholder="Email" />
      <Field name="password" placeholder="Password" />
      <Field type="checkbox" name="termsCheck" />
      <Field component="select" name="favBug">
        <option value="Hornet">Hornet</option>
        <option value="Beetle">Beetle</option>
        <option value="Spider">Spider</option>
        <option value="Mosquito">Mosquito</option>
      </Field>
      <button>Submit!</button>
    </Form>
  );
};
const FormikLoginForm = withFormik({
  mapPropsToValues({ name, email, password, termsCheck, favBug }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      termsCheck: termsCheck || false,
      favBug: favBug || ""
    };
  },
  handleSubmit(values) {
    console.log(values);
  }
})(OnBoardForm);

export default FormikLoginForm;
