import React, { Fragment } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

const SignForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const inputsNotValid = errors.email?.message || errors.password?.message;

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(() => {
          console.log("form submit");
        })}
      >
        <TextField
          fullWidth
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          label="Email"
          size="small"
          variant="outlined"
          sx={{ my: 1 }}
          InputProps={{
            autoComplete: "off"
          }}
        />
        <Typography color="red" variant="body2" gutterBottom>
          {errors.email?.message}
        </Typography>
        <TextField
          fullWidth
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum length of password is 6"
            }
          })}
          label="Password"
          size="small"
          variant="outlined"
          sx={{ marginBottom: 1 }}
          InputProps={{
            autoComplete: "off"
          }}
        />
        <Typography color="red" variant="body2" gutterBottom>
          {errors.password?.message}
        </Typography>
        <Button
          disabled={inputsNotValid ? true : false}
          variant="contained"
          type="submit"
          sx={{ marginTop: 0, width: "100px" }}
        >
          Log in
        </Button>
      </form>
    </Fragment>
  );
};

export default SignForm;
