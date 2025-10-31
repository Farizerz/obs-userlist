import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material/TextField";

const BasicTextFields: React.FC<TextFieldProps> = ({ ...props }) => {
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { width: "100%" } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" variant="outlined" {...props} />
    </Box>
  );
};

export default BasicTextFields;
