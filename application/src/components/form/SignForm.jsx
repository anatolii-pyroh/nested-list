import React, { Fragment } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

const SignForm = ({ userFunction, buttonText }) => {
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

  const style = {
    my: 0.5,
    "& label.Mui-focused": {
      color: "rgb(123, 76, 204)"
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "rgb(123, 76, 204)"
      }
    }
  }
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
      <Typography color='red' variant='body2' gutterBottom>
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
      <Typography color='red' variant='body2' gutterBottom>
        {errors.password?.message}
      </Typography>
      <Button
        disabled={inputsNotValid ? true : false}
        variant='contained'
        type='submit'
        sx={{
          marginTop: 0,
          width: "100px"
        }}
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default SignForm;
