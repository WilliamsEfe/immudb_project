import React, { useState } from 'react';
import { createPatient } from '../../services/patientApiService.js';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Typography, Container, FormControlLabel, Checkbox, makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    '& .MuiTextField-root': {
      margin: '10px 0',
      width: '100%',
    },
    '& .MuiButton-root': {
      margin: '20px 0',
    },
    '& .MuiTypography-root': {
      margin: '20px 0',
    },
  },
  appBar: {
    marginBottom: '30px',
  },
  homeLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  title: {
    flexGrow: 1,
    marginRight: '100px',
    textAlign: 'center',
  },
});

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  age: yup
    .number('Enter your age')
    .positive('Age must be a positive number')
    .required('Age is required'),
  address: yup
    .string('Enter your address')
    .required('Address is required'),
  city: yup
    .string('Enter your city')
    .required('City is required'),
  country: yup
    .string('Enter your country')
    .required('Country is required'),
  phone: yup
    .string('Enter your phone number')
    .required('Phone number is required'),
  is_active: yup
    .boolean('Specify if active or not')
    .required('This field is required'),
});

export default function CreatePatientForm() {
    const classes = useStyles();
    const [submitError, setSubmitError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      age: '',
      address: '',
      city: '',
      country: '',
      phone: '',
      is_active: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        setSubmitError('');
        setLoading(true);
        try {
          const response = await createPatient(values);
          console.log(response.data);
          setFormSuccess(true);
        } catch (error) {
          setSubmitError('An error occurred while creating the patient.');
          console.error(error);
        }
        setLoading(false);
      },
    });  

  return (
    <Container maxWidth="md">
      <form onSubmit={formik.handleSubmit} className={classes.root}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="age"
          name="age"
          label="Age"
          type="number"
          value={formik.values.age}
          onChange={formik.handleChange}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age}
        />
        <TextField
          fullWidth
          id="address"
          name="address"
          label="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <TextField
          fullWidth
          id="city"
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
        <TextField
          fullWidth
          id="country"
          name="country"
          label="Country"
          value={formik.values.country}
          onChange={formik.handleChange}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.is_active}
              onChange={formik.handleChange}
              name="is_active"
              color="primary"
            />
          }
          label="Active"
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Submit
        </Button>
        {submitError && <Typography color="error">{submitError}</Typography>}
      </form>
      {loading && <CircularProgress />}
      {formSuccess && <Typography variant="h6" color="primary">Patient created successfully!</Typography>}
      {submitError && <Typography variant="h6" color="error">{submitError}</Typography>}
    </Container>
  );
}
