# GolfGiving

GolfGiving is a full-stack MERN application that combines charitable giving with subscription-based prize draws. Users can purchase subscriptions, donate to charities, participate in scheduled draws, and track their winning history, while administrators manage charities and conduct draws through a dedicated dashboard.

## Tech Stack

* Frontend: React, Tailwind CSS
* Backend: Node.js, Express.js
* Database: MongoDB
* Authentication: JWT (HTTP-only Cookies)
* Architecture: MVC
* Scheduling: node-cron
* Deployment: Vercel (Frontend), Render (Backend)

---

## Features

### Guest

* Browse charities
* View previous draw results
* Sign up and log in

### User

* Update profile
* Purchase a subscription
* Become a subscriber

### Subscriber

* Participate in donation draws
* Donate to charities
* Purchase new subscriptions
* Cancel existing subscriptions
* View draw results and winning history

### Admin

* Add and manage charities
* Create new administrators
* Run donation draws
* Publish draw results
* Manage the overall platform

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yahhshika/golfGving.git
cd golfGving
```

### Install Dependencies

#### Frontend

```bash
cd Frontend
npm install
```

#### Backend

```bash
cd Backend
npm install
```

---

## Running the Project

### Start the Backend

```bash
cd Backend
node index.js
```

### Start the Frontend

```bash
cd Frontend
npm run dev
```

---

## Demo Accounts

### Subscriber

**Email**

```text
henry@example.com
```

**Password**

```text
password123
```

Subscriber permissions:

* Participate in donation draws
* Donate to charities
* Purchase new subscriptions
* Cancel existing subscriptions
* View draw results and winning history

---

### Admin

**Email**

```text
yashika@golfgiving.com
```

**Password**

```text
yashika
```

Admin permissions:

* Run donation draws
* Publish draw results
* Add and manage charities
* Create new administrators

---

## New Users

You can register a new account using the Sign Up page.

After signing up, purchase a subscription to become a subscriber and unlock all subscriber features.

---

## Project Highlights

* Full-stack MERN architecture
* Secure JWT authentication using HTTP-only cookies
* Role-based access control (Guest, User, Subscriber, and Admin)
* RESTful APIs following the MVC architecture
* Automated scheduled tasks using node-cron
* Centralized error handling and request validation
* Responsive user interface built with React and Tailwind CSS
* Production deployment using Vercel and Render

---

## Future Improvements

* Payment gateway integration
* Email notifications
* Analytics dashboard
* Real-time draw updates
* Unit and integration testing

---

## Author

**Yashika Soni**

GitHub: https://github.com/yahhshika
