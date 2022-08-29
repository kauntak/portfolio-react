import { skills } from "../utils/skills"

export const About:React.FC = ()=> {

    return (
        <>
           
            <h2 style={{marginLeft: 10}}>Relationships.</h2>
            <h2 style={{marginLeft: 10}}>Problem Solving.</h2>
            <h2 style={{marginLeft: 10}}>Creating.</h2>
            <h2 style={{marginLeft: 10}}>Learning.</h2>
            <h5>These are my four passions that help me maintain my core belief of "living life to bring joy to myself, and others."</h5>
            <ul>
                <li>The joy of creating something from nothing; with my hands, digitally, or even unseen things like bonds.</li>
                <li>The joy of learning new concepts/activities; more things I can create, more problems/hurdles to overcome, and more people I can interact with.</li>
                <li>The joy of overcoming problems; problems/hurdles lead to new learning experiences, and at the same time the brings opportunity to help others, and create solutions.</li>
                <li>The joy that building relationships brings; learning about people, the chance of learning from others, helping others, and creating lasting memories.</li>
            </ul>
            <h5>These four passions have led me to learning my wide range of skills, and connecting with many people both in my professional and private life.</h5>
            <h5>My main specialties lie in interpersonal skills, and quickly learning new skills, especially if computer related.</h5>
            <h6>Technical skills: JavaScript/Node.JS, React, Typescript, SQL, MongoDB, HTML/CSS</h6>
            <h6>Soft skills: Leadership, patience, communication, self-reliance, patience, empathy, adaptability, critical thinking, problem solving.</h6>
            <h6>Misc Skills: Adobe Photoshop, Adobe InDesign, Adobe Premier Pro, Adobe Illustrator, Squarespace, Wordpress, MS Office Suite, Godot Game Engine.</h6>
            <div style={{
                display: "grid",
                gap: 15,
                gridTemplateColumns: "repeat(auto-fill, 100px)",
                maxWidth: "80vw"
            }}>
                {
                    skills.filter(skill => skill.imagePath && skill.imagePath !== "").map((skill, index) => {
                        return (
                            <img
                                key={index}
                                src={skill.imagePath}
                                alt={skill.text}
                                title={skill.text}
                                style={{
                                    maxWidth: 100,
                                    maxHeight:100,
                                    marginTop: "auto",
                                    marginBottom: "auto"
                                }}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}