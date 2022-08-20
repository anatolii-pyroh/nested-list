import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import classes from './SignForm.module.css'

const SignForm = ({ userFunction, buttonText, signUp }) => {
  // react hook form states
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // input style
  const style = {
    my: 0.3,
    "& label.Mui-focused": {
      color: "rgb(123, 76, 204)"
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "rgb(123, 76, 204)"
      }
    }
  }
  // check if inputs are valid when error message is true
  const inputsNotValid = errors.email?.message || errors.password?.message;

  return (
    <form
      onSubmit={handleSubmit((data) => {
        userFunction(data.email, data.password);
        reset();
      })}
      autoComplete="off"
      style={{ textAlign: "center" }}
    >
      <TextField
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
        fullWidth
        label='Email'
        size='small'
        variant='outlined'
        sx={style}
      />
      <Typography color='red' variant='body2' gutterBottom sx={{textAlign: "start", ml: 0.5}}>
        {errors.email?.message}
      </Typography>
      <TextField
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Minimum length of password is 6",
          },
        })}
        fullWidth
        type='password'
        label='Password'
        size='small'
        variant='outlined'
        sx={style}
      />
      <Typography color='red' variant='body2' gutterBottom sx={{textAlign: "start", ml: 0.5}}>
        {errors.password?.message}
      </Typography>
      <Button
        disabled={inputsNotValid ? true : false}
        variant='contained'
        type='submit'
        sx={{
          my: 1,
          width: "100%",
          color: "white !important",
          backgroundColor: "rgb(103,46,227) !important",
          ":hover": {
            color: "white !important",
            backgroundColor: "rgb(128, 84, 202) !important"
          }
        }}
      >
        {buttonText}
      </Button>
      {signUp && 
      <div className={classes["privacy_text"]}>
      <p>By clicking "Sign Up", you agree to our <a href="/">Terms</a> and 
      have read and acknowledge our <a href="/">Global Privacy Statement</a></p>
      </div>
      }
    </form>
  );
};

export default SignForm;
