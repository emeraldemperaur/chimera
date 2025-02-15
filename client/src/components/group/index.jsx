import { useEffect } from "react";
import FloatingAction from "../artisan/floating_action_button";
import TitleRibbon from "../artisan/pagetitle_ribbon";

const Group = ({users}) => {
    useEffect(()=> {

    }, [])
    const onActionClick = () =>{
        console.log('On Action clicked -- Group')
    }
    return(
        <> 
        <TitleRibbon title='Group'/>
        <FloatingAction icon={<i className="fa-solid fa-plus"></i>} onClickFunction={onActionClick}/>
        </>
    )
}

export default Group;