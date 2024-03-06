import React from "react";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

const FormTextField = ({ control, rules, name, children, ...props }) => {

  return (
    <Controller
      rules={rules}
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...props}
          value={props.value ?? field.value ?? ""}
          onChange={(e) => {
            field.onChange(e);
            props.onChange && props.onChange(e);
          }}
        >
          {children}
        </TextField>
      )}
    />
  );
};

export default FormTextField;
