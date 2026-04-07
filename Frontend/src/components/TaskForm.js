import { useState } from "react";
import { createTask } from "../services/api";

function TaskForm({ refresh }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "TODO"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title.trim()) {
      alert("Please enter a task title");
      return;
    }
    setIsSubmitting(true);
    try {
      await createTask(task);
      setTask({ title: "", description: "", status: "TODO" });
      refresh();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex",
      gap: "12px",
      alignItems: "flex-end",
      flexWrap: "wrap"
    }}>
      <div style={{ flex: 1, minWidth: "200px" }}>
        <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "6px", color: "#666" }}>
          Task Title
        </label>
        <input
          placeholder="e.g. Fix bug in login"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            transition: "all 0.2s",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
          }}
          onFocus={(e) => e.target.style.borderColor = "#667eea"}
          onBlur={(e) => e.target.style.borderColor = "#ddd"}
        />
      </div>

      <div style={{ flex: 1, minWidth: "200px" }}>
        <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "6px", color: "#666" }}>
          Description
        </label>
        <input
          placeholder="Add details..."
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            transition: "all 0.2s",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
          }}
          onFocus={(e) => e.target.style.borderColor = "#667eea"}
          onBlur={(e) => e.target.style.borderColor = "#ddd"}
        />
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        style={{
          padding: "10px 24px",
          backgroundColor: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          fontSize: "14px",
          fontWeight: "600",
          transition: "all 0.2s",
          opacity: isSubmitting ? 0.6 : 1,
          boxShadow: "0 2px 6px rgba(102, 126, 234, 0.3)"
        }}
        onMouseOver={(e) => !isSubmitting && (e.target.style.background = "#5568d3", e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)")}
        onMouseOut={(e) => !isSubmitting && (e.target.style.background = "#667eea", e.target.style.boxShadow = "0 2px 6px rgba(102, 126, 234, 0.3)")}
      >
        {isSubmitting ? "Adding..." : "+ Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;