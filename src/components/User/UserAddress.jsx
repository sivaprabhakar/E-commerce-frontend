import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

const EditAddress = () => {
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    country: '',
    city: '',
    postalCode: '',
    phoneNo: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Fetch existing shipping info from local storage
    const existingShippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
    if (existingShippingInfo) {
      setShippingInfo(existingShippingInfo);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save updated shipping info to local storage
    localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
    console.log('Shipping address updated successfully:', shippingInfo);
    setSuccessMessage('Address updated successfully');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Edit Address
      </Typography>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Display success message on top
      />
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={shippingInfo.address}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Country"
          name="country"
          value={shippingInfo.country}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="City"
          name="city"
          value={shippingInfo.city}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Postal Code"
          name="postalCode"
          value={shippingInfo.postalCode}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNo"
          value={shippingInfo.phoneNo}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default EditAddress;
