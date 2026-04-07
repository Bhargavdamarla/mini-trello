import { Draggable } from "@hello-pangea/dnd";
import "./TaskCard.css";

function TaskCard({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card ${snapshot.isDragging ? "dragging" : ""}`}
          style={provided.draggableProps.style}
        >
          <h4>{task.title}</h4>
          {task.description && <p>{task.description}</p>}
          <div className="task-card-footer">
            <span className="task-badge">{task.status}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;