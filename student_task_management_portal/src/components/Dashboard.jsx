import StatCard from "./statcard";
import TaskCard from "./taskcard";

function Dashboard() {
    return (
        <main>

            <div className="stats-container">

                <StatCard title="Total Tasks" value={10} />
                <StatCard title="Completed" value={6} />
                <StatCard title="Pending" value={4} />

            </div>

            <h2>Recent Tasks</h2>

            <div className="tasks-container">

                <TaskCard
                    title="Learn React"
                    description="Understanding Components"
                    status="In Progress"
                />

                <TaskCard
                    title="Build Portfolio"
                    description="Create personal portfolio website"
                    status="Completed"
                />

                <TaskCard
                    title="Submit Assignment"
                    description="Complete and submit the assignment"
                    status="Pending"
                />

            </div>

        </main>
    );
}

export default Dashboard;