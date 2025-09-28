# Blood Donation Application

**Assignment:** assignment12_category_001  
**Stack:** MERN (MongoDB, Express.js, React, Node.js)

---

## 🌟 Objective

The Blood Donation Application is designed to connect blood donors with recipients, streamlining the donation process. The app provides role-based dashboards for **Admin**, **Donor**, and **Volunteer**, enabling user management, donation request handling, and content management.

---

## 🔑 Admin Credentials

- **Username:** riad@gmail.com
- **Password:** 123456

---

## 🌐 Live Site

[Visit Blood Donation Application](https://your-live-site-url.com)

---

## 💻 Features

1. **User Registration & Login:** Donors can register and log in to manage their profiles.
2. **Role-Based Dashboards:** Separate dashboards for Admin, Donor, and Volunteer with tailored features.
3. **Donation Requests:** Create, view, edit, and manage blood donation requests.
4. **Profile Management:** Users can update their personal info and avatar securely.
5. **Content Management:** Admins can create, publish, unpublish, and delete blogs using a rich text editor.
6. **Search Donors:** Filter donors by blood group, district, and upazila.
7. **Notifications:** Sweet alerts/toasts for all CRUD operations and authentication events.
8. **Responsive Design:** Fully responsive for mobile, tablet, and desktop, including dashboards.
9. **JWT Authentication:** Protects all private APIs using Firebase or custom JWT.
10. **Funding Integration:** Users can donate funds using Stripe; totals displayed in dashboards.
11. **Pagination & Filtering:** Applied in user, donation, and funding tables.
12. **Environment Variables:** Firebase and MongoDB credentials hidden via `.env`.
13. **Tanstack Query:** Used for all GET requests to fetch data efficiently.
14. **Status Management:** Admin can block/unblock users; only active users can create donation requests.

---

## 🧑‍🤝‍🧑 User Roles

| Role          | Permissions                                                    |
| ------------- | -------------------------------------------------------------- |
| **Admin**     | Full access: manage users, donations, content, funding, roles. |
| **Donor**     | Create/view/edit own donation requests, update profile.        |
| **Volunteer** | View and update donation requests, manage content (limited).   |

---

## 📄 User Authentication

### Registration

- Email, Name, Avatar (via imageBB)
- Blood Group, District, Upazila
- Password & Confirm Password
- Default role: `donor`
- Default status: `active`

### Login

- Email & Password
- Redirects between login & registration pages

---

## 📊 Dashboard

### Donor

- View 3 recent donation requests
- Create, edit, delete, and view donation requests
- Paginated table & status filtering

### Admin

- Dashboard with statistics cards: total users, funds, donation requests
- Manage all users (block/unblock, assign roles)
- Manage all donation requests
- Full content/blog management

### Volunteer

- View all donation requests (limited update access)
- Manage content (except publish/delete)

---

## 🏠 Public Pages

- **Home Page:** Banner, Join as Donor, Search Donors, Featured section, Contact Us, Footer
- **Search Page:** Filter donors by blood group, district, upazila
- **Donation Requests:** View pending donation requests
- **Donation Request Details:** Donate to requests (private route)
- **Blog Page:** View published blogs, detailed reading

---

## ⚡ Challenges Implemented

- **Funding Page:** Show all funds, integrate Stripe, paginate table
- **JWT:** Protect private APIs
- **Tanstack Query:** Implemented for GET requests
- **Sweet Alerts & Notifications:** All CRUD and auth operations

---

## 📂 GitHub Commits

- **Client-side:** 20+ notable commits
- **Server-side:** 12+ notable commits

---

## 📝 Notes

- No social login implemented
- No email verification or password reset
- No Lorem Ipsum used
- Private routes maintain login state after reload

---

> **Enjoy donating blood and saving lives! 🩸**
