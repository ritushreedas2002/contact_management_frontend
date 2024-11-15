import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton,
  TablePagination, Select, MenuItem, FormControl, InputLabel,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axiosInstance from '../axiosInstance';

const ContactsTable = ({ contacts, fetchContacts, setSelectedContact }) => {
  const [order, setOrder] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleEdit = (contact) => {
    setSelectedContact(contact);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error.response.data);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortChange = (event) => {
    setOrder(event.target.value);
  };

  
  const sortedContacts = [...contacts];
  if (order) {
    sortedContacts.sort((a, b) => {
      const isAsc = order === 'asc';
      if (a.firstName < b.firstName) return isAsc ? -1 : 1;
      if (a.firstName > b.firstName) return isAsc ? 1 : -1;
      return 0;
    });
  }

  const paginatedContacts = sortedContacts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper style={{ marginTop: 16, width: '100%', maxWidth: '1200px', margin: 'auto', padding: '16px' }}>
      {/* Dropdown */}
      <FormControl style={{ marginBottom: 16, width: '200px' }}>
        <InputLabel>Sort By Name</InputLabel>
        <Select value={order} onChange={handleSortChange}>
          <MenuItem value="">None</MenuItem>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
      <TableContainer style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {['firstName', 'lastName', 'email', 'phoneNumber', 'company', 'jobTitle'].map((headCell) => (
                <TableCell key={headCell}>
                  {headCell.charAt(0).toUpperCase() + headCell.slice(1)}
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phoneNumber}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(contact)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(contact._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {contacts.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No contacts available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination Controls */}
      <TablePagination
        component="div"
        count={contacts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default ContactsTable;
