import { useState } from "react";
import moment from "moment-timezone";
import TasksApi from "../../../../../services/TasksApi";
import Alert from "../../../../../components/organism/atoms/alerts";
import TextInput from "../../../../../components/organism/atoms/inputs/text";
import DateInput from "../../../../../components/organism/atoms/inputs/time";
import PrimaryButton from "../../../../../components/organism/atoms/buttons/primary";

interface IProps {
    projectId: string;
    onNewTaskCreated: () => any;
}

const CreateNewTask = (props: IProps) => {
    const [creating, setCreating] = useState(false);
    const [description, setDescription] = useState('');
    const [expiration, setExpiration] = useState('');
    const [errors, setErrors] = useState([]);
    
    const create = async () => {
        const current = moment().tz('America/Sao_Paulo');
        const hours = expiration.split('h')[0];
        const minutes = expiration.split('h')[1];
        
        const expiresAt = current
            .add(hours, 'hours')
            .add(minutes, 'minutes')
            .format();
        
        const response = await TasksApi.create({
            description, 
            expiration: expiresAt,
            projectId: props.projectId
        });

        if (response.status !== 201) {
            return setErrors(response.data);
        }
        
        
        setCreating(false);
        return props.onNewTaskCreated();
    }
    
    if (!creating) {
        return (
            <div>
                <a href="#"
                   className="card-link" onClick={() => setCreating(true)}>
                    <i className="bi bi-plus"></i>
                    Add new task
                </a>
            </div>
        );
    }
    
    return (
        <div>
            <Alert errors={errors} />
            
            <TextInput label={'Task description'} 
                       placeholder={'Your task description'} 
                       setTextValue={(value) => {
                           setErrors([]);
                           setDescription(value);
                       }} 
                       onPressEnter={() => {
                           return create();
                       }} 
            />
            
            <DateInput label={'Expiration time'} 
                       placeholder={'00h00'} 
                       setTimeValue={(value) => {
                           setErrors([]);
                           setExpiration(value);
                       }} 
                       onPressEnter={() => {
                           return create();
                       }}
            />
            
            <PrimaryButton label={'Create'} 
                           clicked={() => {
                               return create();
                           }}
            />
        </div>
    );
};

export default CreateNewTask;