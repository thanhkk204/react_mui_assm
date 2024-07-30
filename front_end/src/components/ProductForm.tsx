import { useEffect, useState } from "react";
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
  formTitle: string;
  buttonColor: string;
};

const StyledFormContainer = styled('form')({
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
});

function ProductForm({ onSubmit, initialValues, formTitle, buttonColor }: ProductFormProps) {
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
    if (!categoryId) errors.categoryId = "Can nhap category vao";
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
          <StyledFormContainer onSubmit={handleSubmit}>
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
                    <FormControl fullWidth error={meta.touched && !!meta.error}>
                      <InputLabel>Category</InputLabel>
                      <Select label="Category" {...input}>
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
                    </FormControl>
                  );
                }}
              />
              <Button type="submit" style={{ backgroundColor: buttonColor, color: '#fff' }}>
                Submit
              </Button>
            </Stack>
          </StyledFormContainer>
        );
      }}
    />
  );
}

export default ProductForm;
