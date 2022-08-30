import { EducationType, ExperienceType } from "../types";

export const experience:ExperienceType[] = [
    {
        title: "Full Stack Software Developer/I.T. Support",
        company: "Freelance",
        from: "June 2020",
        duties: [
            "Design, develop, test, and install integrated software. Utilized TypeScript, JavaScript, JScript, Node.js, React, MongoDB, SQL Server, GQL, and third party APIs.",
            "Coordinate with clients to study further needs and design and implement product improvements to increase utility of integrated software.",
            "Install, maintain, monitor, and update software and hardware.",
            "Efficiently plan and prioritize all incoming issues and concerns, and responding to and resolving in a timely manner.",
            "Provide technical training for end-users on usage, and basic troubleshooting procedures.",
            "Remote and in-person troubleshooting and technical assistance; including step-by-step walkthroughs of problem-solving processes.",
            "Provide accurate information on IT related products and services according to client needs."
        ]
    }, {
        title: "Director",
        company: "Big Catch Sushi Bar",
        from: "June 2012",
        to: "December 2021",
        duties: [
            "Accountable for managing the day to day operations of the restaurant with active presence on the floor leading the team to deliver service excellence under a bilingual environment.",
            "Built deep relationships with clientele, many becoming lasting loyal clients.",
            "Allocate material, and human resources to influence cross-functionally.",
            "Complaint and conflict resolution in a fast-paced environment.",
            "Develop and implement quality assurance standards and programs to ensure high quality standards.",
            "Hiring, managing, and promoting the growth and development of internal talent.",
            "Designing and drafting instructional/training guides to create a smooth integration for new staff.",
            "Creating restaurant social media content in partnership with the Chef and Marketing team.",
            "Coordinate with clients to determine objectives and requirements for events, carry out until final execution, conduct follow-up discussions and develop action plans to address any negative comments.",
            "Accountable for driving revenue and profit through the development and implementation of strategies, practices and promotions while in keeping with the overall concept.",
            "Creating and compiling ad-hoc reports and materials for all stakeholders.",
            "Procuring supplies and equipment; negotiating costs, building strong vendor relations, inventory management, and training staff in procurement.",
        ]
    }
]

export const eduAndCerts:EducationType[] = [
    {
        instituteName: "freecodecamp.org Certificates",
        description: "Completed projects using complex data structures, networking, relational databases, and data visualization; built multiple web applications and microservices utilizing Node.js, npm, mongoDB, and the Express framework; Created and implemented algorithms using Object Oriented Programming and Functional Programming paradigms.",
        courses: [
            {
                name: "Scientific Computing with Python Certificate",
                link: "https://freecodecamp.org/certification/fcc86a61d05-e777-433e-b570-c86d0e890f63/scientific-computing-with-python-v7"
            }, {
                name: "Back End Development and APIs Certificate",
                link: "https://freecodecamp.org/certification/fcc86a61d05-e777-433e-b570-c86d0e890f63/back-end-development-and-apis"
            },{
                name: "JavaScript Algorithms and Data Structure Certificate",
                link: "https://freecodecamp.org/certification/fcc86a61d05-e777-433e-b570-c86d0e890f63/javascript-algorithms-and-data-structures"
            }

        ]
    }, {
        instituteName: "Souther Alberta Institute of Technology, Calgary, AB",
        description: "Incomplete due to opportunity to start a new business venture.",
        courses:[
            {name:"Computer Hardware and Operating System Essentials"},
            {name:"Computer Programming Essentials"},
            {name:"Information Technology Foundations"},
            {name:"Introduction to Networking"},
            {name:"Database Design and Programming"},
            {name:"Object Oriented Programming Essentials"},
            {name:"Website Development Fundamentals"},
            {name:"Object Oriented Software Analysis and Design"},
            {name:"Advanced Object-Oriented Programming"},
            {name:"Database Programming and Testing"},
            {name:"Introduction to Database Administration"}
        ],
        dates:{
            from: "September 2010",
            to: "April 2012"
        }
    }
]