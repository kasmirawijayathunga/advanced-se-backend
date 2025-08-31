# Microservices App

A **Node.js Microservices Application** consisting of independent services for authentication, server logic, and shop management. Each service is self-contained with its own dependencies and can be run independently or together.

---

## 🚀 Project Structure

```
root
├── server           # Main API server / Gateway
├── auth-service     # Handles user authentication & authorization
└── shop-service     # Handles shop-related operations
└── data-service     # Handles data-related operations
```

## 📦 Installation

Clone the repository and install dependencies for each service:

```bash
git clone <repo-url>
cd <repo-root>
npm install
cd auth-service
npm install
cd ../server
npm install
cd ../shop-service
npm install
```

---

## ▶️ Running the App

You can start all services together using the root `start.js` script:

```bash
npm run start
```

Or start each service individually:

```bash
cd auth-service && npm start
cd server && npm start
cd shop-service && npm start
```

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MySQL
* JWT for authentication
* npm for package management

---

## 📜 License

This project is licensed under the MIT License.

---

Made with ❤️ by **Kasmira Wijayathunga**
