import { ProjectType } from "../types";

export const projects:ProjectType[] = [
    {
        type: "Programs",
        imagePath: "/assets/images/Logos/sabores_logo.png",
        projectName: "Sabores Restaurants Management App",
        description: "App for multi-location inventory ordering, and staff management",
        usage:[
            "Authentication, with access management depending on roles.",
            "Order quantity management for multiple location, location types, and suppliers.",
            "Daily task completion tracker", 
            "Time sheet(clock in/clock out), employee work hour tracker.",
            "Multi-language switching; English and Spanish"
        ],
        backend:[
            "Typescript",
            "expressJS",
            "JsonWebToken",
            "mongooseJS"
        ],
        frontend:[
            "ReactJS",
            "Typescript",
            "CSS"
        ],
        tools:[
            "AWS",
            "mongoDB",
            "heroku"
        ],
        githubLink: "https://github.com/kauntak/Sabores",
        liveLink: {
            link:"https://github.com/kauntak/Sabores",
            isSlow:true
        }
    }, {
        type: "Programs",
        imagePath: "/assets/images/Logos/SambaPOS-icon-Logo.png",
        projectName: "SambaPOS Integrations",
        description: "Integrating multiple modules into a Point of Sales system(SambaPOS).",
        usage: [
            "Integrating multiple modules into a Point of Sales system(SambaPOS).",
            "Deliverect integration: Automatically process orders that were pushed from Deliverect, and add/settle/cancel orders in SambaPOS.",
            "Gloria Foods integration: Poll for new orders, and add new orders to SambaPOS.",
            "Clover Payments integration: Poll for new payments and settle corresponding tickets.",
            "Online report viewer: View current total sales, evening hold order totals, and current displayed orders.",
            "Kitchen Display System: Send orders to appropriate screen; ordering items by seat, and item.",
            "Future orders: Will send the orders to the KDS at appropriate time, considering current orders, and the size of the order on hold."
        ],
        backend:[
            "nodeJS",
            "expressJS",
            "SQL Server",
            "Rest API",
            "GraphQL",
            "JScript"
        ],
        frontend:[
            "SambaPOS",
            "HTML",
            "CSS",
            "JavaScript",
            "electronJS"
        ],
        tools:["ngrok"],
        githubLink: "http://github.com/kauntak/SambaPOS-integration",
        screenShots:[
            {
                projectName: "Creating Order",
                imagePath: "/assets/images/SambaPOS/Create-order.gif"
            }, {
                imagePath: "/assets/images/SambaPOS/SDS-order-received.gif",
                projectName: "Order being displayed"
            }, {
                imagePath: "/assets/images/SambaPOS/Integration-window.gif",
                projectName: "App window to start integration server and to edit settings"
            }, {
                imagePath: "/assets/images/SambaPOS/Report-viewer.gif",
                projectName: "Online report viewer"
            }
        ]
    }, {
        type: "Programs",
        imagePath: "/assets/images/Logos/jinrou-logo.png",
        projectName: "Werewolf Game",
        description: "An online multiplayer social deduction game powered by nodeJS, socket.io, and aws.",
        usage: [
            "Play the Werewolf game online with friends!(Think Among Us© but with Villagers and Werewolves)",
            "Live chat/chat room(per game) functionality.",
            "Multi-language live switching; currently Japanese and English only."
        ],
        backend:[
            "nodeJS",
            "expressJS",
            "socket.io"
        ],
        frontend:[
            "HTML",
            "CSS",
            "JavaScript"
        ],
        tools:[
            "AWS"
        ],
        githubLink: "https://github.com/kauntak/Werewolf_Game",
        liveLink: "http://werewolfgame.link/"
    }, {
        type: "Websites",
        imagePath: "/assets/images/nm-foods-web-preview.jpg",
        projectName: "NM Foods - Yoshi Natto 喜納豆",
        sitePath: "https://www.nmfoods.ca/"
    }, {
        type: "Designs",
        imagePath: "",
        projectName: "Pixel Art",
        designs: [

        ]
    }, {
        type: "Websites",
        imagePath: "/assets/images/big-catch-web-preview.jpg",
        projectName: "Big Catch Sushi Bar",
        sitePath: "https://www.bigcatchcalgary.ca"
    }, {
        type: "Designs",
        imagePath: "/assets/images/Cards/BC-sqaure-2-1.jpg",
        projectName: "Card Designs",
        designs: [
            {
                projectName: "Square Business Card - Back",
                imagePath: "/assets/images/Cards/BC-sqaure-2-1.jpg"
            }, {
                projectName: "Square Business Card - Front",
                imagePath: "/assets/images/Cards/BC-sqaure-2.jpg"
            }, {
                projectName: "Mini Ad(Not really a card design)",
                imagePath: "/assets/images/Cards/2016-08 Big Catch Ad.jpg"
            }, {
                projectName: "Gift Card",
                imagePath: "/assets/images/Cards/Gift Certificate v3-0.jpg"
            }, {
                projectName: "Stamp Card - Front",
                imagePath: "/assets/images/Cards/Stamp 3-2.jpg"
            }, {
                projectName: "Stamp Card - Back",
                imagePath: "/assets/images/Cards/Stamp 3-2-1.jpg"
            }
        ]
    }, {
        type: "Websites",
        projectName: "Old Website",
        imagePath: "/assets/images/old-website-preview.jpg",
        sitePath: "https://github.com/kauntak/Portfolio-webpage",
        note: "This site is my old portfolio site creating using pure Javascript/HTML/CSS. The new site was updated/refactored using React! \nLink is a github link"
    }, {
        type: "Designs",
        projectName: "Menu Designs",
        imagePath: "/assets/images/Menus/200222-dessert_menu_BigCatch.jpg",
        designs:[
            {
                projectName: "Dessert menu",
                imagePath: "/assets/images/Menus/200222-dessert_menu_BigCatch.jpg",
            }, {
                projectName: "Drink Menu - Front",
                imagePath: "/assets/images/Menus/191204_drinkmenu6.jpg"
            }, {
                projectName: "Drink Menu - Back",
                imagePath: "/assets/images/Menus/191204_drinkmenu62.jpg"
            }, {
                projectName: "Lunch Menu - Front",
                imagePath: "/assets/images/Menus/191212-lunch_menu_BigCatch2.jpg"
            }, {
                projectName: "Lunch Menu - Back",
                imagePath: "/assets/images/Menus/191212-lunch_menu_BigCatch22.jpg"
            }, {
                projectName: "Takeout Menu - Double Gate Fold - Inside",
                imagePath: "/assets/images/Menus/210513 -takeout_menu_BigCatch2.jpg"
            }, {
                projectName: "Takeout Menu - Double Gate Fold - Outside",
                imagePath: "/assets/images/Menus/210513 -takeout_menu_BigCatch.jpg"
            }, {
                projectName: "Newspaper theme menu",
                imagePath: "/assets/images/Menus/Coast Newspaper 1-0-pg1.jpg"
            }, {
                projectName: "Map theme menu",
                imagePath: "/assets/images/Menus/Map Horizontal Coast.jpg"
            }, {
                projectName: "Takeout Menu - Double Gate Fold - Inside",
                imagePath: "/assets/images/Menus/Takeout v6-3 (2)-in.jpg"
            }, {
                projectName: "Takeout Menu - Double Gate Fold  - Outside",
                imagePath: "/assets/images/Menus/Takeout v6-3 (2)-out.jpg"
            }, {
                projectName: "Takeout Menu - Bi-Fold - Inside",
                imagePath: "/assets/images/Menus/Takeout v3-2-in.jpg"
            }, {
                projectName: "Takeout Menu - Bi-Fold - Outside",
                imagePath: "/assets/images/Menus/Takeout v3-2-out.jpg"
            }, {
                projectName: "Billboard menu",
                imagePath: "/assets/images/Menus/Front menu.jpg"
            }
        ]
    }
]