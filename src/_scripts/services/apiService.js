
const baseUrl = '/api'
const data = [
    {
        id: "w01",
        slug: "wall-1",
        name: "Wall 1",
        adminName: "Steven Climbs",
        defaultWallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
        problemsCount: 9,
        minVGrade: 1,
        maxVGrade: 10,
        problems: [
            {
                id: "p0",
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
                id: "p1",
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
                id: "p2",
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
                id: "p3",
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
                id: "p4",
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
                id: "p5",
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
                id: "p6",
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
                id: "p7",
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
                id: "p8",
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
        slug: "wall-2",
        name: "Wall 2",
        adminName: "Wall O'Admin",
        defaultWallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
        problemsCount: 2,
        minVGrade: 2,
        maxVGrade: 4,
        problems: [
            {
                id: "p0",
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
                id: "p1",
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
        slug: "an-empty-wall",
        name: "An Empty Wall",
        adminName: "Someone Lonely",
        defaultWallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
        problemsCount: 0,
        minVGrade: null,
        maxVGrade: null,
        problems: [],
    }
];

const summarizeWall = (wall) => ({ 
    id: wall.id, 
    slug: wall.slug,
    name: wall.name,
    adminName: wall.adminName,
    defaultWallImageUrl: wall.defaultWallImageUrl,
    problemsCount: wall.problemsCount,
    minVGrade: wall.minVGrade,
    maxVGrade: wall.maxVGrade,
});

async function getWalls() {
    try {
        // TODO set base route for api in config
        const response = await fetch(`${baseUrl}/walls`);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const walls = await response.json();
        return walls;
    } catch(err) {
        console.error(`Could not get walls: ${error}`);
    }
}

module.exports = {
    // TODO make all of these async
    getWallsSummaries(options = {}) {
        const { 
            searchFor = null, // TODO searchFor mock up
        } = options;
        const allWalls = data.map(wall => summarizeWall(wall));
        return allWalls;
    },
    getWall(wallId) {
        return data.find(wall => wall.id === wallId);
    },
    getWallSummary(wallId) {
        const wall = data.find(wall => wall.id === wallId);
        if (wall == null)
            return null;

        return summarizeWall(wall);
    },
    getProblemsForWall(wallId) {
        // include wall summary?
        const problems = this.getWall(wallId)?.problems ?? [];
        return problems;
    },
    getProblem(wallId, problemId) { 
        const problems = this.getProblemsForWall(wallId);
        return problems?.find(problem => problem.id === problemId) ?? null; 
    },
    createProblem(wallId, problem) {
        console.log(`Creating problem for ${wallId}...`);
        console.log(problem);

        const wallIndex = data.findIndex(wall => wall.id === wallId);
        if (wallIndex < 0)
            return problem;

        problem.id = 'p' + data[wallIndex].problemsCount;

        return problem; // return the updated problem with id
    },
    updateProblem(wallId, problem) {
        console.log(`Updating problem for ${wallId}...`);
        console.log(problem);
    },
};