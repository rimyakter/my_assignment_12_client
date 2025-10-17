# Blood Donation Application 🩸

![Blood Donation Application Screenshot](https://i.ibb.co.com/RpHfpS8Q/bloodbank.png)  


---

## 🌐 Live Site

[Visit Blood Donation Application](https://blood-bridge-63fb5.web.app)  

---

## 🔹 Project Overview

**Blood Donation Application** is designed to connect blood donors with recipients, streamlining the donation process.  
The app provides **role-based dashboards** for Admin, Donor, and Volunteer, enabling user management, donation request handling, and content management.

---

## 💻 Technologies Used

### Frontend
- React.js  
- React Router  
- Tailwind CSS / DaisyUI  
- Tanstack Query  
- Axios  
- SweetAlert2  

### Backend
- Node.js  
- Express.js  
- MongoDB (Atlas)  
- dotenv (env management)  
- cors (CORS handling)  
- jsonwebtoken (JWT authentication)  

### Authentication & Security
- Firebase Authentication (email/password)  
- JWT for protecting private APIs  

### Payments
- Stripe integration for funding/donations  

---

## ✨ Core Features

### 🔑 User Authentication
- Registration (Email, Name, Avatar via imageBB, Blood Group, District, Upazila, Password)  
- Login (Email & Password)  
- Role-based access control  
- JWT authentication for private APIs  

### 🧑‍🤝‍🧑 User Roles
| Role       | Permissions |
|------------|------------|
| Admin      | Full access: manage users, donations, content, funding, roles |
| Donor      | Create/view/edit own donation requests, update profile |
| Volunteer  | View all donation requests (limited update), manage content (except publish/delete) |

### 📄 Dashboard
**Donor**
- View 3 recent donation requests  
- Create, edit, delete, and view donation requests  
- Paginated table & status filtering  

**Admin**
- Dashboard with statistics cards: total users, funds, donation requests  
- Manage all users (block/unblock, assign roles)  
- Manage all donation requests  
- Full content/blog management  

**Volunteer**
- View all donation requests (limited update access)  
- Manage content (except publish/delete)  

### 🏠 Public Pages
- Home Page: Banner, Join as Donor, Search Donors, Featured section, Contact Us, Footer  
- Search Page: Filter donors by blood group, district, upazila  
- Donation Requests: View pending donation requests  
- Donation Request Details: Donate to requests (private route)  
- Blog Page: View published blogs, detailed reading  

### ⚡ Additional Features & Challenges
- Funding Page: Show all funds, integrate Stripe, paginate table  
- Tanstack Query used for GET requests  
- Sweet Alerts & notifications for all CRUD and auth operations  
- Private routes maintain login state after reload  
- Responsive design for mobile, tablet, and desktop  

---

## ⚙️ Dependencies

- react  
- react-dom  
- react-router
- tailwindcss  
- daisyui  
- axios  
- firebase  
- node  
- express  
- mongodb  
- dotenv  
- cors  
- jsonwebtoken  
- sweetalert2  
- stripe (for payments)  
- tanstack-query  

*(Check `package.json` for full list of dependencies)*

---

## 🚀 How to Run Locally

1. **Clone the repository**

```bash
git clone https://github.com/rimyakter/my_assignment_12_client.git
cd my_assignment_12_client
