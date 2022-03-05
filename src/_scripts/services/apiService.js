
const data = [
    {
        id: "w01",
        name: "Wall 1",
        adminName: "Steven Climbs",
        problemsCount: 9,
        minVGrade: 1,
        maxVGrade: 10,
        problems: [
            {
                id: "p01",
                name: "Easy Problem",
                vGrade: 2,
                setterName: "Steven Climbs",
                description: "This is a very simple description.",
                wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
                likeCount: 99,
                sendCount: 100,
                holds: [
                    {
                        typeId: 0, // Start
                        x: 40.0,
                        y: 40.0,
                        r: 20.0,
                    },
                    {
                        typeId: 1, // Foot
                        x: 80.0,
                        y: 40.0,
                        r: 20.0,
                    },
                    {
                        typeId: 2, // Hand/Foot
                        x: 120.0,
                        y: 40.0,
                        r: 20.0,
                    },
                    {
                        typeId: 3, // Finish
                        x: 160.0,
                        y: 40.0,
                        r: 20.0,
                    }
                ],
            },
            {
                id: "p03",
                name: "Intermediate Problem",
                vGrade: 5,
                setterName: "Steven Climbs",
                description: "This is a slightly more complex description.",
                wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
                likeCount: 1,
                sendCount: 5467,
                holds: [],
            },
            {
                id: "p04",
                name: "Hard Problem",
                vGrade: 10,
                setterName: "Steven Climbs",
                description: "Wow, this problem is so difficult. I can't believe it.",
                wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
                likeCount: 56,
                sendCount: 234,
                holds: [],
            },
            {
                id: "p05",
                name: "Placeholder Problem 1",
                vGrade: 1,
                setterName: "Placeholder Setter",
                description: "This is a placeholder problem. It is just for testing purposes.",
                wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
                likeCount: 123,
                sendCount: 345,
                holds: [],
            },
            {
                id: "p06",
                name: "Placeholder Problem 2",
                vGrade: 2,
                setterName: "Placeholder Setter",
                description: "This is a placeholder problem. It is just for testing purposes.",
                wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
                likeCount: 321,
                sendCount: 543,
                holds: [],
            },
            {
                id: "p07",
                name: "Placeholder Problem 3",
                vGrade: 3,
                setterName: "Placeholder Setter",
                description: "This is a placeholder problem. It is just for testing purposes.",
                wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
                likeCount: 4567,
                sendCount: 9753,
                holds: [],
            },
            {
                id: "p08",
                name: "Placeholder Problem 4",
                vGrade: 4,
                setterName: "Placeholder Setter",
                description: "This is a placeholder problem. It is just for testing purposes.",
                wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
                likeCount: 45643,
                sendCount: 765343,
                holds: [],
            },
            {
                id: "p09",
                name: "Placeholder Problem 5",
                vGrade: 5,
                setterName: "Placeholder Setter",
                description: "This is a placeholder problem. It is just for testing purposes.",
                wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
                likeCount: 13,
                sendCount: 64,
                holds: [],
            },
            {
                id: "p10",
                name: "Placeholder Problem 6",
                vGrade: 6,
                setterName: "Placeholder Setter",
                description: "This is a placeholder problem. It is just for testing purposes.",
                wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
                likeCount: 6234,
                sendCount: 34566,
                holds: [],
            },
        ],
    },
    {
        id: "w02",
        name: "Wall 2",
        adminName: "Wall O'Admin",
        problemsCount: 2,
        minVGrade: 2,
        maxVGrade: 4,
        problems: [
            {
                id: "p02",
                name: "Easy Problem for Wall 2",
                vGrade: 2,
                setterName: "Steven Climbs",
                description: "This is a very simple description.",
                wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
                likeCount: 23,
                sendCount: 100,
                holds: [],
            },
            {
                id: "p05",
                name: "Another Probem - Wall 2",
                vGrade: 4,
                setterName: "Steven Climbs",
                description: "This is a very simple description.",
                wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
                likeCount: 5005,
                sendCount: 34567,
                holds: [],
            },
        ],
    },
    {
        id: "w03",
        name: "An Empty Wall",
        adminName: "Someone Lonely",
        problemsCount: 0,
        minVGrade: null,
        maxVGrade: null,
        problems: [],
    }
];

module.exports = {
    getWalls(options = {}) {
        const { 
            searchFor = null,
        } = options;
        const allWalls = data.map(wall => ({ 
            id: wall.id, 
            name: wall.name,
            adminName: wall.adminName,
            problemsCount: wall.problemsCount,
            minVGrade: wall.minVGrade,
            maxVGrade: wall.maxVGrade,
        }));
        return allWalls; // TODO searchFor mock up
    },
    getWall(wallId) {
        return data.find(wall => wall.id === wallId);
    },
    getProblemsForWall(wallId) {
        const problems = this.getWall(wallId)?.problems ?? [];
        return problems;
    },
    getProblem(wallId, problemId) { 
        const problems = this.getProblemsForWall(wallId);
        return problems?.find(problem => problem.id === problemId) ?? []; 
    },
};