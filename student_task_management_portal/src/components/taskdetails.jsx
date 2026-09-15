import { useParams } from "react-router-dom";

function TaskDetails(props) {
  const { id } = useParams();
  const task = props.tasks.find((item) => item.id === Number(id));

  if (!task) {
    return (
      <main className="dashboard">
        <section className="task-section">
          <div className="section-header">
            <h2>Task Not Found!</h2>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <section className="task-section">
        <div className="section-header">
          <h2>Task Details</h2>
        </div>

        <div className="task-card">
          <div className="task-info">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span className={`task-status ${task.status.toLowerCase().replace(/\s+/g, "-")}`}>{task.status}</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TaskDetails;