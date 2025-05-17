# 🎬 NFlix

A full-stack web application for uploading, viewing, and managing movies. Built with **Angular**, **Django**, **PostgreSQL**, and **Docker**.

## Demo Video

https://www.dropbox.com/scl/fi/c0ey2yrfo6u5vhi5exmm3/NFlix-Website-Review-Demo-Video.mkv?rlkey=u9gozy7nh3dq8c8r8q950fb8f&st=ofa4g0jb&dl=0

## 🧰 Tech Stack

- **Frontend:** Angular, TailwindCSS
- **Backend:** Django, Django REST Framework
- **Database:** PostgreSQL
- **Deployment:** Docker, docker-compose

---

## ⚙️ Prerequisites

Before running this project, make sure you have the following installed:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) >= 23.x
- [Redis](https://redis.io/docs/latest/operate/oss_and_stack/install/archive/install-redis/) >= 6
- [Celery](https://docs.celeryq.dev/en/stable/getting-started/first-steps-with-celery.html) >= 5.x
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

## 📡 API Endpoints

| Method | Endpoint        | Description                         |
| ------ | --------------- | ----------------------------------- |
| GET    | `/movies/`      | List all movies                     |
| GET    | `/movies/<id>/` | Get a specific movie's details      |
| POST   | `/movies/`      | Upload a new movie (with video)     |
| PUT    | `/movies/<id>/` | Update a movie, including the video |
| DELETE | `/movies/<id>/` | Delete a movie                      |

---

## 🙌 Contributing

Contributions are welcomed! To contribute to the Lanao del Norte Tourism Guide:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m "Add some feature"`
4. Push to your forked repository: `git push origin feature/your-feature-name`
5. Create a pull request.

---

## 💬 Contact

Feel free to reach out to me via email at phillip.mgalan@gmail.com or connect with me on [LinkedIn](https://www.linkedin.com/in/migui-galan/).
