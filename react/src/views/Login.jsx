import React, { useRef, useState } from "react";
import { Form, Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    

    // console.log(payload);
    setErrors(null);
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        // debugger;
        setToken(data.token);
        setUser(data.user);
      })
      .catch((err) => {
        try {
          const response = err.response;
          if (response && response.status === 422) {
            if (response.data.errors) {
              setErrors(response.data.errors);
            } else {
              setErrors({ email: [response.data.message] });
            }
          }
        } catch (e) {
          console.error(e);
        }
      });
  };
  return (
    <Form onSubmit={onSubmit}>
      <h1 className="text-center">Login to your account</h1>
      {errors && (
        <div className="alert">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      )}
      <input ref={emailRef} type="email" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <button className="btn btn-block">Login</button>
      <p className="message">
        Not Registered? <Link to="/signup">Create an account</Link>
      </p>
    </Form>
  );
}
