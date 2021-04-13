import { useEffect, useState } from "react";
import Tasks from "./tasks";
import NewProject from "./new-project";
import ProjectsApi from "../../../services/ProjectsApi";
import * as S from './styles';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    
    const remove = async (id: string) => {
        await ProjectsApi.remove(id);
        return setProject({});
    }
    
    const getAllProjects = async () => {
        const response = await ProjectsApi.showAll();
        return setProjects(response.data);
    }
    
    useEffect(() => {
        getAllProjects().then();
    }, [project]);

    const showAllProjects = projects.map((project, index) => {
        return (
            <S.Card className="card ml-3" key={index}>
                <div className="card-body">
                    <h5 className="card-title">{project.title}</h5>
                    <p className="card-text">See your current tasks below:</p>
                </div>
                
                <Tasks tasks={project.tasks} projectId={project.id} onNewTaskCreated={() => setProject({})} />
                
                <div className="card-body d-flex justify-content-center">
                    <a href="#" 
                       className="card-link text-danger" 
                       onClick={() => remove(project.id)}>
                        Delete this project
                    </a>
                </div>
            </S.Card>
        )
    });
    
    return (
        <S.Container>
            {showAllProjects}

            <NewProject onCreated={(data) => {
                return setProject(data);
            }} />
        </S.Container>
    )    
}

export default Projects;