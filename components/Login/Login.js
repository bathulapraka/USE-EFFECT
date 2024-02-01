import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [CollegeName, SetCollegeName] = useState("");
  const [ClgValid, SetClgValid] = useState();

  useEffect(() => {
    setFormIsValid(
      enteredEmail.includes("@") &&
      enteredPassword.trim().length > 6 &&
      CollegeName.trim() !== ""
    );
  }, [enteredEmail, enteredPassword, CollegeName]);

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setFormIsValid(
      event.target.value.trim().length > 6 &&
      enteredEmail.includes("@") &&
      CollegeName.trim() !== ""
    );
  };

  const SetClgName = (event) => {
    const inputcollegename = event.target.value;
    SetCollegeName(inputcollegename);

    if (inputcollegename.trim() === "") {
      SetClgValid(false);
      setFormIsValid(false);
    } else {
      SetClgValid(true);
      setFormIsValid(
        enteredEmail.includes("@") &&
        enteredPassword.trim().length > 6 &&
        inputcollegename.trim() !== ""
      );
    }
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (CollegeName.trim() === "") {
      SetClgValid(false);
      setFormIsValid(false);
      return;
    }
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>

        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />
        </div>

        <div
          className={`${classes.control} ${
            ClgValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="Clg-Name">CollegeName</label>
          <input
            type="text"
            id="collegename"
            value={CollegeName}
            onChange={SetClgName}
            onBlur={validatePasswordHandler}
          />
        </div>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
