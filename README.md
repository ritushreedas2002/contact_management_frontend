# 🚀 Contact Management System

## Table of Contents
1. [Project Description](#project-description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
5. [Database Schema](#database-schema)
6. [Challenges Faced](#challenges-faced)
7. [Future Enhancements](#future-enhancements)

---

## 📖 Project Description

This is a **Contact Management System** that allows users to:
- Add, edit, and delete contacts.
- View contact details in a paginated table.
- Sort contacts by name (ascending/descending).
- Validate contact details with both frontend and backend validation.

The app is built with a **React frontend** and a **Node.js/Express backend** using MongoDB for the database.


## 🎯 Features
### Frontend:
- Pagination, sorting functionality in the contact table.
- Form validations for required fields and valid email/phone formats.
- Error handling for backend responses.

## 🛠️ Technologies Used
### Frontend:
- **React**: User interface library.
- **Material-UI**: Styling and components library.
- **Axios**: HTTP client for API requests.

## 🚧 Challenges Faced
### Frontend:
- **State Management**: Managing selectedContact state between components required careful synchronization.
- **Form Validation**: Ensuring both frontend and backend validations aligned (e.g., email and phone number format).
- **Pagination and Sorting**: Implementing dynamic sorting without affecting pagination required extra handling.


## Resolution

1. **Centralized the `selectedContact` state** in the parent component (e.g., `App.js`) to manage the state and actions (edit and reset) globally.
2. **Passed `setSelectedContact` and `selectedContact` as props** to both the `ContactForm` and `ContactsTable` components to ensure seamless updates.
3. **Used conditional rendering (`isFormVisible`)** in the parent component to toggle the form's visibility.

## SETUP
1.Click on my deployed URL to get the frontend in working state
```bash
https://contact-management-frontend-wine.vercel.app/
```

