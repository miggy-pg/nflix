# 🎬 NFlix

A full-stack web application for uploading, viewing, and managing movies. Built with **Angular**, **Django**, **PostgreSQL**, and **Docker**. Authentication is handled via **JWT**.

## 🧰 Tech Stack

- **Frontend:** Angular, TailwindCSS
- **Backend:** Django, Django REST Framework
- **Auth:** JWT (JSON Web Tokens)
- **Database:** PostgreSQL
- **Deployment:** Docker, docker-compose

---

## ⚙️ Prerequisites

Before running this project, make sure you have the following installed:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) >= 23.x
- [Python](https://www.python.org/) >= 3.11
- [npm](https://www.npmjs.com/)

---

## 🚀 Setup Instructions

### 🐳 Backend (Django API)

```bash
# Clone the repo
git clone https://github.com/miggy-pg/nflix.git
cd nflix

# Start backend + db using Docker Compose
docker-compose up --build

# The backend API will be available at:
http://localhost:8000
```

### 🌐 Frontend (Angular)

```bash
cd frontend
npm install

# Start the Angular development server
npm run start

# The frontend will be available at:
# http://localhost:4200
```

---

## 🔐 Authentication (JWT)

---

## 📡 API Endpoints

| Method | Endpoint        | Description                         |
| ------ | --------------- | ----------------------------------- |
| GET    | `/movies/`      | List all movies                     |
| GET    | `/movies/<id>/` | Get a specific movie's details      |
| POST   | `/movies/`      | Upload a new movie (with video)     |
| PUT    | `/movies/<id>/` | Update a movie, including the video |
| DELETE | `/movies/<id>/` | Delete a movie                      |

---

## 🐞 Known Issues or Limitations

---

## 🙌 Contributing

We welcome contributions! Please fork this repo, open a PR, or file an issue.

---

## 💬 Contact

Feel free to reach out to me via email at phillip.mgalan@gmail.com or connect with me on [LinkedIn](https://www.linkedin.com/in/migui-galan/).
