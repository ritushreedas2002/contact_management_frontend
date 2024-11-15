import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Alert } from '@mui/material';
import axiosInstance from '../axiosInstance';

const ContactForm = ({ selectedContact, fetchContacts, setSelectedContact, onClose }) => {
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (selectedContact) {
      setContactData(selectedContact);
    } else {
      setContactData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
      });
    }
    setErrors({});
    setFormError(null);
  }, [selectedContact]);

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    
    ['firstName', 'lastName', 'email', 'phoneNumber'].forEach((field) => {
      if (!contactData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      }
    });

    if (contactData.email && !contactData.email.includes('@')) {
      newErrors.email = 'Invalid email address.';
    }

    if (contactData.phoneNumber && !/^\d{10}$/.test(contactData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormError('Please correct the errors in the form.');
      return;
    }
  
    try {
      if (selectedContact) {
        await axiosInstance.put(
          `/contacts/${selectedContact._id}`,
          contactData
        );
        setSelectedContact(null);
        setFormError('Contact updated successfully!');
      } else {
        const response = await axiosInstance.post(
          '/contacts',
          contactData
        );
        setFormError(response.data.message); 
      }
      fetchContacts();
      onClose();
      setContactData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setFormError(error.response.data.message);
      } else {
        setFormError('Failed to submit the form. Please try again.');
      }
    }
  };
  

  return (
    <Paper style={{ padding: 16, marginTop: 16 }}>
      <Typography variant="h6">
        {selectedContact ? 'Edit Contact' : 'Add New Contact'}
      </Typography>
      {formError && (
        <Alert severity="error" style={{ marginBottom: 16 }}>
          {formError}
        </Alert>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {['firstName', 'lastName', 'email', 'phoneNumber', 'company', 'jobTitle'].map((field, index) => (
          <div key={field} style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              required={['firstName', 'lastName', 'email', 'phoneNumber'].includes(field)}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              fullWidth
              value={contactData[field]}
              onChange={handleChange}
              error={!!errors[field]}
              helperText={errors[field]}
            />
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          {selectedContact && (
            <Button
              onClick={() => {
                setSelectedContact(null);
                onClose();
              }}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" variant="contained" color="primary">
            {selectedContact ? 'Update' : 'Add'}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default ContactForm;
