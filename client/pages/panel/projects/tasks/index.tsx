import TimeRemaining from "./time-remaining";
import CreateNewTask from "./create-new-task";

interface IProps {
    projectId: string;
    tasks: [
        {
            id: string;
            status: string;
            projectId: string;
            expiration: string;
            description: string;
        }
    ];
    onNewTaskCreated: () => any;
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
                    <CreateNewTask projectId={props.projectId} onNewTaskCreated={() => props.onNewTaskCreated()} />
                </li>
            </ul>
        </div>
    );
}

export default Tasks;