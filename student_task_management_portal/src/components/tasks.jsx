import { Link } from "react-router-dom";

function Tasks(props) {
  return (
    <main className="dashboard">
      <section className="task-section">
        <div className="section-header">
          <h2>Tasks Page</h2>
          <p>All the students tasks will appear here!</p>
        </div>

        <div className="task-container">
          {props.tasks.map((task) => (
            <div className="task-card" key={task.id}>
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <span className={`task-status ${task.status.toLowerCase().replace(/\s+/g, "-")}`}>{task.status}</span>
              </div>
              <div className="task-actions">
                <Link className="change-status-btn" to={`/tasks/${task.id}`}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Tasks;