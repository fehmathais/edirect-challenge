import Header from "../../components/organism/molecules/header";
import { useEffect } from "react";
import Router from "next/router";
import Projects from "./projects";

const PanelPage = ({ currentUser }) => {
    useEffect((): any => {
        if (!currentUser) {
            return Router.push('/');
        }
    }, []);
    
    if (!currentUser) {
        return (
            <div>Carregando...</div>
        )
    }
    
    return (
        <div>
            <Header currentuser={currentUser} />
            
            <div className="container-fluid mt-3">
                <Projects />
            </div>
        </div>
    )
}

export default PanelPage;