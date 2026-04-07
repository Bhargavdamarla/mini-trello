import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { createTask } from "../services/api";
import "./Column.css";

function Column({ status, tasks, refreshTasks }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const filtered = tasks.filter(task => task.status === status);

  // Format status for display
  const statusDisplay = status === "IN_PROGRESS" ? "In Progress" : status;
  const statusClass = status === "TODO" ? "todo" : status === "IN_PROGRESS" ? "in-progress" : "done";

  const handleAddCard = async () => {
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }
    setIsSubmitting(true);
    try {
      await createTask({
        title: title.trim(),
        description: description.trim(),
        status: status
      });
      setTitle("");
      setDescription("");
      setShowForm(false);
      refreshTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="column">
      <div className={`column-header ${statusClass}`}>
        {statusDisplay}
        <span style={{ fontSize: "12px", opacity: 0.9 }}>({filtered.length})</span>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            className="column-content"
            style={{
              background: snapshot.isDraggingOver ? "rgba(102, 126, 234, 0.1)" : "transparent"
            }}
          >
            {filtered.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="column-footer">
        {!showForm ? (
          <button className="add-card-btn" onClick={() => setShowForm(true)}>
            + Add a card
          </button>
        ) : (
          <div className="add-card-form">
            <input
              autoFocus
              placeholder="Enter card title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              onKeyPress={(e) => e.key === "Enter" && handleAddCard()}
            />
            <textarea
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              rows="2"
            />
            <div className="form-buttons">
              <button 
                className="form-btn save-btn" 
                onClick={handleAddCard}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add"}
              </button>
              <button 
                className="form-btn cancel-btn" 
                onClick={() => {
                  setShowForm(false);
                  setTitle("");
                  setDescription("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Column;