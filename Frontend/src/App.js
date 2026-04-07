import { useEffect, useState, useContext } from "react";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import { AuthContext } from "./context/AuthContext";
import {
  getTasks,
  updateTask,
  deleteTask
} from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("board");
  const { user, loading, logout } = useContext(AuthContext);

  // Load tasks from backend
  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  // Update task (used in drag & drop)
  const handleUpdateTask = async (id, updatedTask) => {
    await updateTask(id, updatedTask);
    loadTasks();
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>;
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#f8f9fa" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "16px 24px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div>
            <h1 style={{ margin: "0", fontSize: "28px", fontWeight: "700", letterSpacing: "-0.5px" }}>
              🎯 Mini Trello
            </h1>
            <p style={{ margin: "4px 0 0 0", fontSize: "12px", opacity: 0.9 }}>Organize your tasks effortlessly</p>
          </div>
          <div style={{ display: "flex", gap: "8px", borderLeft: "1px solid rgba(255, 255, 255, 0.3)", paddingLeft: "24px" }}>
            <button 
              onClick={() => setActiveTab("board")}
              style={{
                padding: "10px 16px",
                backgroundColor: activeTab === "board" ? "rgba(255, 255, 255, 0.25)" : "transparent",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s",
                borderBottom: activeTab === "board" ? "3px solid white" : "3px solid transparent"
              }}
              onMouseOver={(e) => e.target.style.background = "rgba(255, 255, 255, 0.15)"}
              onMouseOut={(e) => e.target.style.background = activeTab === "board" ? "rgba(255, 255, 255, 0.25)" : "transparent"}
            >
              📋 Board
            </button>
            <button 
              onClick={() => setActiveTab("profile")}
              style={{
                padding: "10px 16px",
                backgroundColor: activeTab === "profile" ? "rgba(255, 255, 255, 0.25)" : "transparent",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s",
                borderBottom: activeTab === "profile" ? "3px solid white" : "3px solid transparent"
              }}
              onMouseOver={(e) => e.target.style.background = "rgba(255, 255, 255, 0.15)"}
              onMouseOut={(e) => e.target.style.background = activeTab === "profile" ? "rgba(255, 255, 255, 0.25)" : "transparent"}
            >
              👤 Account
            </button>
          </div>
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: "0", fontSize: "14px", fontWeight: "500" }}>Welcome, <strong>{user.name}</strong></p>
            <p style={{ margin: "4px 0 0 0", fontSize: "12px", opacity: 0.8 }}>{user.email}</p>
          </div>
          <button 
            onClick={logout}
            style={{
              padding: "10px 20px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => { e.target.style.background = "rgba(255, 255, 255, 0.3)"; e.target.style.borderColor = "white"; }}
            onMouseOut={(e) => { e.target.style.background = "rgba(255, 255, 255, 0.2)"; e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"; }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {activeTab === "board" ? (
          <>
            {/* Add Task Form */}
            <div style={{ padding: "20px 24px", background: "white", borderBottom: "1px solid #e0e0e0" }}>
              <TaskForm refresh={loadTasks} />
            </div>

            {/* Board */}
            <div style={{ flex: 1, overflow: "hidden" }}>
              <Board
                tasks={tasks}
                setTasks={setTasks}
                updateTask={handleUpdateTask}
                deleteTask={handleDeleteTask}
                refreshTasks={loadTasks}
              />
            </div>
          </>
        ) : (
          <div style={{ padding: "24px", overflow: "auto" }}>
            <Profile />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;