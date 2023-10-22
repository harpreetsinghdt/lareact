import React, { useRef, useState } from "react";
import { Form, Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    // console.log(payload);
    setErrors(null);
    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          // console.log(response.data.errors);
          setErrors(response.data.errors);
        }
      });
  };
  return (
    <Form id="signup" onSubmit={onSubmit}>
      <h1 className="text-center">Signup for free</h1>
      {errors && (
        <div className="alert">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      )}
      <input name="name" ref={nameRef} type="text" placeholder="Full Name" />
      <input name="email" ref={emailRef} type="email" placeholder="Email" />
      <input
        name="password"
        ref={passwordRef}
        type="password"
        placeholder="Password"
        autoComplete="true"
      />
      <input
        name="password_confirmation"
        ref={passwordConfirmationRef}
        type="password"
        placeholder="Confirm Password"
        autoComplete="true"
      />
      <button className="btn btn-block">Signup</button>
      <p className="message">
        Already Registered? <Link to="/login">Sign In</Link>
      </p>
    </Form>
  );
}

export default Signup;
