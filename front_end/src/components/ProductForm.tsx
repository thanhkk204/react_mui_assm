import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import axios from "axios";
import { Category, ProductFormParams } from "../constants/type";
import { InputText } from "./elements/InputText";
import { styled } from "@mui/system";

type ProductFormProps = {
  onSubmit: (values: ProductFormParams) => void;
  initialValues?: any;
};

const StyledFormControl = styled(FormControl)({
  '& .MuiInputBase-root': {
    borderRadius: '4px',
    border: '1px solid #ccc',
    padding: '8px',
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
    },
    '&.Mui-focused': {
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
      border: '1px solid #000',
    },
  },
});

function ProductForm({ onSubmit, initialValues }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/category")
      .then(response => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const validate = (values: ProductFormParams) => {
    const { title, image, categoryId, price } = values;
    const errors: ValidationErrors = {};
    if (!title) errors.title = "Can nhap title vao";
    if (title && title.length < 6) errors.title = "Can nhap toi thieu 6 ky tu vao";
    if (!image) errors.image = "Can nhap image vao";
    if (!categoryId) errors.categoryId = "Can nhap categoryId vao";
    if (!price) errors.price = "Can nhap price vao";
    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Field
                name="title"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Title"}
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
              <Field
                name="image"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Image"}
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
              <Field<string>
                name="description"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Description"}
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
              <Field<number>
                name="price"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Price"}
                    messageError={meta.touched && meta.error}
                    type="number"
                  />
                )}
              />
              <Field<string>
                name="isShow"
                type="checkbox"
                render={({ input, meta }) => {
                  return (
                    <FormControlLabel
                      control={<Checkbox {...input} />}
                      label="Show Product"
                    />
                  );
                }}
              />
              <Field<string>
                name="categoryId"
                render={({ input, meta }) => {
                  return (
                    <StyledFormControl fullWidth error={meta.touched && !!meta.error}>
                      <InputLabel>categoryId</InputLabel>
                      <Select label="categoryId" {...input}>
                        <MenuItem value="">Select</MenuItem>
                        {categories.map(category => (
                          <MenuItem key={category._id} value={category._id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {meta.touched && meta.error && (
                        <FormHelperText>{meta.error}</FormHelperText>
                      )}
                    </StyledFormControl>
                  );
                }}
              />
              <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Stack>
          </form>
        );
      }}
    />
  );
}

export default ProductForm;
