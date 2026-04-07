import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import "./Board.css";

const statuses = ["TODO", "IN_PROGRESS", "DONE"];

function Board({ tasks, setTasks, updateTask, refreshTasks }) {

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;

    const updatedTasks = tasks.map(task => {
      if (task.id === draggableId) {
        return { ...task, status: destination.droppableId };
      }
      return task;
    });

    setTasks(updatedTasks);

    // update backend
    const movedTask = updatedTasks.find(t => t.id === draggableId);
    updateTask(movedTask.id, movedTask);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-container">
        {statuses.map(status => (
          <Column key={status} status={status} tasks={tasks} refreshTasks={refreshTasks} />
        ))}
      </div>
    </DragDropContext>
  );
}

export default Board;