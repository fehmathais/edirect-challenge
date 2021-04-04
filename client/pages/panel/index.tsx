import Header from "../../components/organism/molecules/header";
import { useEffect } from "react";
import Router from "next/router";

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
            
            <h1>TESTE</h1>
        </div>
    )
}

export default PanelPage;