import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

function Dashboard(props) {
  const total = props.tasks.length;
  const completed = props.tasks.filter((task) => task.status === "Completed").length;
  const pending = props.tasks.filter((task) => task.status === "Pending").length;

  function toggleTask(id) {
    props.setTasks(
      props.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status: task.status === "Completed" ? "Pending" : "Completed",
          };
        }
        return task;
      })
    );
  }

  function addTask(newTask) {
    props.setTasks([...props.tasks, newTask]);
  }

  function deleteTask(id) {
    props.setTasks(props.tasks.filter((task) => task.id !== id));
  }

  return (
    <main className="dashboard">
      <section className="dashboard-header">
        <h1>Student Task Manager</h1>
        <p>Plan your weekly learning goals and track progress.</p>
      </section>

      <section className="stats-container">
        <StatCard title="Total Tasks" value={String(total)} />
        <StatCard title="Completed" value={String(completed)} />
        <StatCard title="Pending" value={String(pending)} />
      </section>

      <AddTask onAddTask={addTask} onClose={() => {}} />

      <section className="task-section">
        <div className="section-header">
          <h2>Recent Tasks</h2>
          <p>Latest learning activity</p>
        </div>

        <div className="task-container">
          {props.tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;