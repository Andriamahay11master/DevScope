# DevScope

An AI-powered GitHub analytics platform that transforms developer profiles into insightful dashboards, showcasing repository activity, coding trends, top technologies, and intelligent developer summaries through modern data visualization.

---

## 🚀 Features

- 🔍 Search any GitHub developer profile
- 📊 Interactive analytics dashboard
- 🧠 AI-generated developer insights
- 📁 Repository explorer
- 🌐 Most used programming languages
- ⭐ Stars, forks, followers, and activity metrics
- 📈 Charts and visual statistics
- 🌙 Dark / Light mode
- ⚡ Fast and responsive interface

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- TailwindCSS
- Axios
- React Router
- Framer Motion
- Recharts

### Backend

- FastAPI
- Python
- GitHub REST API

### Deployment

- Frontend: Vercel
- Backend: Render

---

## 📂 Project Structure

```bash
DevScope/
├── client/
└── server/
```

---

## 🧩 Architecture

```text
React Frontend
      ↓
FastAPI REST API
      ↓
GitHub REST API
```

---

## 📸 Planned Dashboard Analytics

- Total repositories
- Total stars
- Followers & following
- Most used languages
- Repository activity
- Most starred repositories
- Account creation timeline
- AI profile summary

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/devscope.git
cd devscope
```

---

## 🖥️ Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 🧠 Backend Setup

```bash
cd server

python -m venv venv
```

### Activate virtual environment

#### Windows

```bash
venv\Scripts\activate
```

#### macOS / Linux

```bash
source venv/bin/activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Run FastAPI server

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```bash
http://localhost:8000
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server/` folder.

```env
GITHUB_TOKEN=your_github_token
```

---

## 📌 API Endpoint Example

```http
GET /api/github/{username}
```

Example:

```http
GET /api/github/gaearon
```

---

## 🎯 Project Goals

- Practice REST API integration
- Learn full-stack architecture
- Build production-ready React applications
- Integrate AI into developer tooling
- Create a strong portfolio project

---

## 🚧 Roadmap

### Version 1

- [x] Project setup
- [ ] GitHub user search
- [ ] Profile dashboard
- [ ] Repository listing

### Version 2

- [ ] Charts and analytics
- [ ] AI-generated summaries
- [ ] Favorites system
- [ ] Authentication

### Version 3

- [ ] Compare multiple developers
- [ ] Export analytics reports
- [ ] Team analytics dashboard

---

## 🤝 Contributing

Contributions, ideas, and feedback are welcome.

---

## 📄 License

This project is licensed under the MIT License.
