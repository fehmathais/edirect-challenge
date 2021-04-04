import { useEffect, useState } from "react";
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
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                </ul>
                <div className="card-body d-flex justify-content-center">
                    <button 
                       className="btn btn-danger" onClick={() => remove(project.id)}>
                        Delete this project
                    </button>
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