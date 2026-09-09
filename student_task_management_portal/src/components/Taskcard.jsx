function Taskcard({ title, description, status }) {
    return (
        <div className="task-card">
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>Status: {status}</p>
            </div>
        </div>
    );
}

export default Taskcard;