import React from "react";
import { Accordion } from "../components/AccordionComponent";
import { projects } from "../utils/projects";

export const Resume:React.FC = ()=>{

    const projectList = projects.filter(project => project.type === "Programs");
    
    return (
        <>
            <Accordion 
                title="PROJECTS"
                content={
                    <>
                        <Accordion 
                            title="SambaPOS Point of Sales Integration"
                            content={
                                <>
                                    <h5>Spearheaded a project that integrated modules for a Point of Sales system(SambaPOS) which has reduced error rates from roughly 5% to 0.004%(50 errors in the last roughly 14,000 orders); decreased order input time by 99%; and reduced end-of-day closing time by 10%(if end-of-day totals were not matching, reduced time by over 90%)</h5>
                                    <ul>
                                        <li>Deliverect integration: Automatically process orders that were pushed from Deliverect, and add/settle/cancel orders in SambaPOS. </li>
                                        <li>Gloria Foods integration: Poll for new orders, and add new orders to SambaPOS.</li>
                                        <li>Clover Payments integration: Poll for new payments and settle corresponding tickets.</li>
                                        <li>Online report viewer: View current total sales, evening hold order totals, and current displayed orders.</li>
                                        <li>Kitchen Display System: Send orders to appropriate screen; ordering items by seat, and item.</li>
                                        <li>Future orders: Will send the orders to the KDS at appropriate time, considering current orders, and the size of the order on hold. </li>
                                    </ul>
                                    <h5>Back end: nodeJS, expressJS, SQL Server, Rest API, GraphQL</h5>
                                    <h5>Front End: HTML, CSS, JavaScript, electronJS</h5>
                                    <h5>Tools: ngrok</h5>
                                    <a 
                                        href="http://github.com/kauntak/SambaPOS-integration" 
                                        target="_blank" 
                                        rel="noreferrer"
                                    >
                                        Github Link
                                    </a>
                                </>
                            }
                        />
                        <Accordion
                            title="Werewolf Game"
                            content={
                                <>
                                </>
                            }
                        />
                    </>
                } 
            />
        </>
    )
}