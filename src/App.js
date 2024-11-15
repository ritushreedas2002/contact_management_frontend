import React, { useState, useEffect } from 'react';
import { Container, Button, Typography } from '@mui/material';
import ContactForm from './components/ContactForm.jsx';
import ContactsTable from './components/ContactTable.jsx';
import axiosInstance from './axiosInstance.js';

function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);


  const fetchContacts = async () => {
    try {
      const response = await axiosInstance.get('/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error.response.data);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddNewContact = () => {
    setSelectedContact(null); 
    setIsFormVisible(true); 
  };

  const handleCloseForm = () => {
    setSelectedContact(null);
    setIsFormVisible(false); 
  };


  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsFormVisible(true); 
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      <Typography variant="h4" style={{ marginBottom: 20, textAlign: 'center' }}>
        Contact Management
      </Typography>
      <div  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
        <Button variant="contained" color="primary" onClick={handleAddNewContact}>
          + Add Contact
        </Button>
      </div>
      {isFormVisible && (
        <ContactForm
          selectedContact={selectedContact}
          fetchContacts={fetchContacts}
          setSelectedContact={setSelectedContact}
          onClose={handleCloseForm}
        />
      )}
      <ContactsTable
        contacts={contacts}
        fetchContacts={fetchContacts}
        setSelectedContact={handleEdit} 
      />
    </Container>
  );
}

export default App;
