# 📝 Todo API with Express & MySQL

A simple and modular RESTful Todo API built using Node.js, Express, and MySQL. This project supports full CRUD operations and is designed for clarity, scalability, and real-world use.

## 🚀 Features
- Add new tasks
- Retrieve all tasks
- Update tasks by ID
- Delete tasks by name
- Search tasks by ID and name
- Robust error handling and modular routing

## 🛠 Tech Stack
- Node.js
- Express.js
- MySQL
- Postman (for testing)

## 📦 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/AshishResolute/todo-api-express.git
   cd todo-api-express

#- Install dependencies
npm i or npm install

# Configure MySQl
Create a database names todo
Update your db.js with sql credentials

- Start the server
nodemon main.js


# API Endpoints
get : /task  
post : /addTask  
put :  /task/:id 
delete : /delete/:task  
get : /findTasks/:id/:task  

# I built this Todo API from scratch in just 2 days. Before this, I had zero experience with REST APIs or databases. This project marks a turning point in my backend development journey — from confusion to clarity, one endpoint at a time.

📚 Future Improvements
- Add pagination and filtering
- Implement JWT-based authentication
- Deploy to Render or Railway
- Write unit tests with Jest or Mocha

# Feel free to fork, clone, or contribute. Feedback and suggestions are welcome!


---

Once you save this as `README.md` in your project folder, run:

```bash
git add README.md
git commit -m "Add README with project overview"
git push



