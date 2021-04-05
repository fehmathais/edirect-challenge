import TimeRemaining from "./time-remaining";

interface IProps {
    tasks: [
        {
            id: string;
            status: string;
            projectId: string;
            expiration: string;
            description: string;
        }
    ]
}

const Tasks = (props: IProps) => {
    
    const tasks = props.tasks.map((task, index) => {
        return (
            <li className="list-group-item" key={index}>
                <div>{task.description}</div>
                <TimeRemaining time={task.expiration} />
            </li>
        )
    })
    
    return (
        <div>
            <ul className="list-group list-group-flush">
                {tasks}
                
                <li className="list-group-item">
                    <i className="bi bi-plus"></i>
                    Add new task
                </li>
            </ul>
        </div>
    );
}

export default Tasks;