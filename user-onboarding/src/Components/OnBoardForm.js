import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnBoardForm = ({ errors, touched, values, status }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (status) {
      setUser([...user, status]);
      console.log(user);
    }
  }, [status]);

  return (
    <Form>
      <Field name="name" placeholder="Name" />
      {touched.name && errors.name && <p className="errors">{errors.name}</p>}

      <Field name="email" type="email" placeholder="Email" />
      {touched.email && errors.email && (
        <p className="errors">{errors.email}</p>
      )}

      <Field name="password" type="password" placeholder="Password" />
      {touched.password && errors.password && (
        <p className="errors">{errors.password}</p>
      )}

      <Field name="termsCheck" type="checkbox" />
      {touched.termsCheck && errors.termsCheck && (
        <p className="errors">{errors.termsCheck}</p>
      )}

      <Field name="favBug" component="select">
        <option>Select favorite bug</option>
        <option value="Hornet">Hornet</option>
        <option value="Beetle">Beetle</option>
        <option value="Spider">Spider</option>
        <option value="Mosquito">Mosquito</option>
      </Field>
      {touched.favBug && errors.favBug && (
        <p className="errors">{errors.favBug}</p>
      )}

      {user.map(item => (
        <div>
          <p key={item.id}>{item.name}</p>
        </div>
      ))}

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

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Invalid input"),
    email: Yup.string()
      .email("Email not valid")
      .required("Invalid input"),
    password: Yup.string()
      .min(6, "Password must be 6 characters long")
      .required("Invalid input"),
    termsCheck: Yup.boolean().required(),
    favBug: Yup.string().required("Choose a bug")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(result => {
        console.log("handleSubmit: ", result);
        setStatus(result.data);
        resetForm();
      })
      .catch(err => {
        console.log("handleSubmit: ", err);
      });
  }
})(OnBoardForm);

export default FormikLoginForm;
