import * as S from "../styles";
import TextInput from "../../../../components/organism/atoms/inputs/text";
import PrimaryButton from "../../../../components/organism/atoms/buttons/primary";
import { useState } from "react";
import ProjectsApi from "../../../../services/ProjectsApi";

interface IProps {
    onCreated: (data: {}) => any;
}

const NewProject = (props: IProps) => {
    const [title, setTitle] = useState('');
    
    const create = async () => {
        const response = await ProjectsApi.create({title});
        return props.onCreated(response.data);
    }
    
    return (
        <S.Card className="card ml-3">
            <div className="card-body">
                <h5 className="card-title">New Project</h5>
                
                <TextInput label={'Title'} 
                           placeholder={'Your project title'} 
                           setTextValue={(text => {
                               setTitle(text);
                           })} 
                           onPressEnter={() => {
                               return create();
                           }} />
                
                <PrimaryButton label={'Create'} clicked={() => {
                    return create();
                }} />
            </div>

        </S.Card>  
    );
};

export default NewProject;