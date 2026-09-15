import { Link } from "react-router-dom";

function TaskCard(props) {
  const normalizedStatus = props.status.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="task-card">
      <div className="task-info">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <span className={`task-status ${normalizedStatus}`}>{props.status}</span>
      </div>

      <div className="task-actions">
        <button className="change-status-btn" onClick={props.onToggle}>
          Change Status
        </button>
        <button className="cancel-btn" onClick={props.onDelete}>
          Delete
        </button>
        <Link className="view-all-btn" to={`/tasks/${props.id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
}

export default TaskCard;