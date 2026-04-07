# Mini-Trello

A full-stack task management application inspired by Trello, built with **Spring Boot** backend and **React** frontend. Organize your tasks in a kanban board with drag-and-drop functionality.

## Features

- ✅ **User Authentication**: Secure signup and login with JWT tokens
- ✅ **Task Management**: Create, update, and delete tasks
- ✅ **Kanban Board**: Organize tasks into TODO, IN_PROGRESS, and DONE columns
- ✅ **User Profile**: View your account information and authentication token
- ✅ **Responsive Design**: Works on desktop and mobile devices
- 🔄 **Drag & Drop**: Move tasks between columns (coming soon)

## Screenshots

### Login Page
![Mini Trello Login](./screenshots/dashboard.png)

The login page provides a clean and intuitive interface for user authentication. Users can:
- Enter their email and password to login
- Access the signup page if they don't have an account
- Secure JWT token-based session management

### Kanban Board Dashboard
![Mini Trello Dashboard](./screenshots/login-page.png)

The main dashboard features a three-column kanban board:
- **TODO Column**: Tasks that need to be started
- **IN_PROGRESS Column**: Tasks currently being worked on
- **DONE Column**: Completed tasks

Users can:
- Create new tasks with title and description
- View task details
- Move tasks between columns (drag & drop)
- Delete completed tasks
- See task counts in each column
- Access Account settings and Logout from the header

## Tech Stack

### Backend
- **Java 23** - Programming language
- **Spring Boot 3.2.0** - Framework
- **MongoDB** - NoSQL database
- **Spring Security** - Authentication & authorization
- **Spring Data MongoDB** - Data persistence
- **Maven** - Build tool

### Frontend
- **React 18** - UI library
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling
- **Axios** - HTTP client
- **React Context API** - State management

## Project Structure

```
mini-trello/
├── Backend/
│   ├── src/main/java/com/example/trello/
│   │   ├── TrelloApplication.java         # Main application entry point
│   │   ├── config/SecurityConfig.java     # JWT & security configuration
│   │   ├── controller/                    # REST API endpoints
│   │   │   ├── AuthController.java       # Login/Signup endpoints
│   │   │   └── TaskController.java       # Task CRUD endpoints
│   │   ├── service/                       # Business logic
│   │   │   ├── AuthService.java          # User authentication logic
│   │   │   └── TaskService.java          # Task operations logic
│   │   ├── model/                         # Entity models
│   │   │   ├── User.java                 # User entity
│   │   │   └── Task.java                 # Task entity
│   │   ├── repository/                    # Database access layer
│   │   │   ├── UserRepository.java
│   │   │   └── TaskRepository.java
│   │   ├── security/JwtFilter.java        # Token validation filter
│   │   ├── dto/                           # Data transfer objects
│   │   │   ├── AuthRequest.java
│   │   │   └── AuthResponse.java
│   │   └── exception/                     # Custom exceptions & handlers
│   │       ├── GlobalExceptionHandler.java
│   │       ├── InvalidCredentialsException.java
│   │       └── EmailAlreadyExistsException.java
│   ├── pom.xml                            # Maven dependencies
│   └── src/main/resources/application.properties # Configuration
│
└── Frontend/
    ├── src/
    │   ├── components/                    # React components
    │   │   ├── Auth.js                    # Login/Signup component
    │   │   ├── Auth.css                   # Auth component styling
    │   │   ├── Board.js                   # Main kanban board component
    │   │   ├── Board.css                  # Board styling
    │   │   ├── Column.js                  # Task column component
    │   │   ├── Column.css                 # Column styling
    │   │   ├── TaskCard.js                # Individual task card
    │   │   ├── TaskCard.css               # Task card styling
    │   │   ├── TaskForm.js                # Task creation form
    │   │   ├── Profile.js                 # User profile component
    │   │   └── Profile.css                # Profile styling
    │   ├── context/AuthContext.js         # Authentication context
    │   ├── services/api.js                # API client
    │   ├── App.js                         # Main app component
    │   ├── index.js                       # Entry point
    │   └── index.css                      # Global styles
    ├── package.json                       # npm dependencies
    ├── package-lock.json                  # Dependency lock file
    └── public/index.html                  # HTML template
```

## Prerequisites

- **Java 17+** installed (Java 23 recommended)
- **Node.js 18+** installed
- **MongoDB 5.0+** (local or MongoDB Atlas)
- **Maven 3.6+** installed
- **Git** for version control

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Bhargavdamarla/mini-trello.git
cd mini-trello
```

### 2. Setup MongoDB

#### Option A: Local MongoDB
```bash
# Download from https://www.mongodb.com/try/download/community
# Install and start MongoDB service
# Default connection: mongodb://localhost:27017/mini-trello
```

#### Option B: MongoDB Atlas (Cloud - Recommended)
```bash
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create free account and cluster
# 3. Copy connection string: mongodb+srv://username:password@cluster.mongodb.net/mini-trello
```

### 3. Configure Backend Database Connection

Edit `Backend/src/main/resources/application.properties`:

```properties
# Local MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/mini-trello

# OR for MongoDB Atlas (replace with your credentials)
# spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/mini-trello
```

## Running the Application

### Start Backend Server

```bash
cd Backend
mvn clean install
mvn spring-boot:run
```

**Backend will be available at:** `http://localhost:8080`

### Start Frontend Server (in a new terminal)

```bash
cd Frontend
npm install
npm start
```

**Frontend will be available at:** `http://localhost:3000`

The application will automatically open in your default browser.

## API Endpoints

### Authentication (Public)
```
POST   /api/auth/signup    - Register new user
POST   /api/auth/login     - Login user
```

### Tasks (Requires JWT Token)
```
GET    /api/tasks          - Get all tasks for logged-in user
POST   /api/tasks          - Create new task
PUT    /api/tasks/{id}     - Update task (change status)
DELETE /api/tasks/{id}     - Delete task
```

### Request/Response Examples

#### Signup
```json
POST /api/auth/signup
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}

Response (201):
{
  "email": "user@example.com",
  "name": "John Doe",
  "token": "uuid-token-here"
}
```

#### Login
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

Response (200):
{
  "email": "user@example.com",
  "name": "John Doe",
  "token": "uuid-token-here"
}
```

#### Create Task
```json
POST /api/tasks
Headers: Authorization: Bearer <token>
{
  "title": "Fix login bug",
  "description": "Fix authentication issue"
}

Response (201):
{
  "_id": "task-id",
  "title": "Fix login bug",
  "description": "Fix authentication issue",
  "status": "TODO",
  "userId": "user-id"
}
```

## Database Schema

### Users Collection
```json
{
  "_id": "ObjectId",
  "email": "user@example.com",
  "name": "John Doe",
  "password": "plain-text-password",
  "token": "uuid-token"
}
```

### Tasks Collection
```json
{
  "_id": "ObjectId",
  "title": "Task Title",
  "description": "Task description",
  "status": "TODO|IN_PROGRESS|DONE",
  "userId": "user-id"
}
```

## Authentication Flow

1. User signs up or logs in with email and password
2. Server generates a UUID token and stores it in the database
3. Token is returned to frontend and stored in `localStorage`
4. For protected endpoints, token is sent in `Authorization: Bearer <token>` header
5. `JwtFilter` validates the token on each request
6. `userId` is extracted from the validated token and passed to controllers

## Usage Guide

### 1. Sign Up
- Click "Sign Up" on the login page
- Enter email, name, and password
- Click "Sign Up" button
- You'll be redirected to the login page

### 2. Login
- Enter your email and password
- Click "Login" button
- You'll be taken to the Kanban Board

### 3. Create a Task
- Enter task title (e.g., "Fix bug in login")
- Enter task description (optional)
- Click "+ Add Task" button
- Task will appear in the TODO column

### 4. Move Task Between Columns
- Click and drag a task card to move it between columns
- Drop it in the desired column (TODO → IN_PROGRESS → DONE)

### 5. View Task Details
- Click on a task card to see full details
- Edit or delete the task

### 6. View Profile
- Click "Account" in the navigation bar
- See your email, name, and authentication token

### 7. Logout
- Click "Logout" button in top right
- You'll be redirected to login page
- Session data will be cleared

## Security Notes

⚠️ **This is a development/learning project**

**Current limitations (for development only):**
- Passwords are stored in **plain text** (not encrypted)
- JWT tokens are UUID-based (not cryptographically signed)
- No HTTPS enforcement
- Limited input validation

**For production deployment, implement:**
- ✅ Password hashing (bcrypt, Argon2)
- ✅ Proper JWT signing with secret keys
- ✅ HTTPS/TLS encryption
- ✅ Rate limiting & throttling
- ✅ Input validation & sanitization
- ✅ CORS configuration
- ✅ Database encryption
- ✅ Audit logging

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Drag-and-drop task movement between columns
- [ ] Task due dates and reminders
- [ ] Collaborative boards (multiple user access)
- [ ] Task labels and categories
- [ ] Search and filter functionality
- [ ] Dark mode
- [ ] Mobile app version
- [ ] Real-time notifications (WebSockets)
- [ ] Task comments and activity log
- [ ] File attachments
- [ ] Email notifications

## Troubleshooting

### MongoDB Connection Error
```
Error: MongoTimeoutError
```
**Solution:** Ensure MongoDB is running on port 27017 or update the connection string in `application.properties`

### Frontend Port 3000 Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows
```

### Backend Port 8080 Already in Use
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :8080   # Windows
```

### JWT Token Expired
**Solution:** Login again to get a new token

### CORS Error
**Solution:** Ensure backend is running on port 8080 and frontend on port 3000

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- 📝 Create an issue on [GitHub](https://github.com/Bhargavdamarla/mini-trello/issues)
- 💬 Check existing issues for solutions
- 📧 Contact the maintainers

## Acknowledgments

- Inspired by [Trello](https://trello.com/)
- Built with love for learning full-stack development
- Thanks to the Spring Boot and React communities
