const { ApolloServer, gql } = require('apollo-server-lambda')

const walls = [{
    id: "w01",
    slug: "wall-1",
    name: "Wall 1",
    adminName: "Steven Climbs",
    defaultWallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
    problemsCount: 9,
    minVGrade: 1,
    maxVGrade: 10,
    problems: [{
        id: "p0",
        name: "Easy Problem",
        vGrade: 2,
        setterName: "Steven Climbs",
        description: "This is a very simple description.",
        wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
        likeCount: 99,
        sendCount: 100,
        holds: [{
            typeId: 0, // Start
            x: 40.0,
            y: 40.0,
            r: 20.0,
        }, {
            typeId: 1, // Foot
            x: 80.0,
            y: 40.0,
            r: 20.0,
        }, {
            typeId: 2, // Hand/Foot
            x: 120.0,
            y: 40.0,
            r: 20.0,
        }, {
            typeId: 3, // Finish
            x: 160.0,
            y: 40.0,
            r: 20.0,
        }],
    }, {
        id: "p1",
        name: "Intermediate Problem",
        vGrade: 5,
        setterName: "Steven Climbs",
        description: "This is a slightly more complex description.",
        wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
        likeCount: 1,
        sendCount: 5467,
        holds: [],
    }, {
        id: "p2",
        name: "Hard Problem",
        vGrade: 10,
        setterName: "Steven Climbs",
        description: "Wow, this problem is so difficult. I can't believe it.",
        wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
        likeCount: 56,
        sendCount: 234,
        holds: [],
    }, {
        id: "p3",
        name: "Placeholder Problem 1",
        vGrade: 1,
        setterName: "Placeholder Setter",
        description: "This is a placeholder problem. It is just for testing purposes.",
        wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
        likeCount: 123,
        sendCount: 345,
        holds: [],
    }, {
        id: "p4",
        name: "Placeholder Problem 2",
        vGrade: 2,
        setterName: "Placeholder Setter",
        description: "This is a placeholder problem. It is just for testing purposes.",
        wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
        likeCount: 321,
        sendCount: 543,
        holds: [],
    }, {
        id: "p5",
        name: "Placeholder Problem 3",
        vGrade: 3,
        setterName: "Placeholder Setter",
        description: "This is a placeholder problem. It is just for testing purposes.",
        wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
        likeCount: 4567,
        sendCount: 9753,
        holds: [],
    }, {
        id: "p6",
        name: "Placeholder Problem 4",
        vGrade: 4,
        setterName: "Placeholder Setter",
        description: "This is a placeholder problem. It is just for testing purposes.",
        wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
        likeCount: 45643,
        sendCount: 765343,
        holds: [],
    }, {
        id: "p7",
        name: "Placeholder Problem 5",
        vGrade: 5,
        setterName: "Placeholder Setter",
        description: "This is a placeholder problem. It is just for testing purposes.",
        wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
        likeCount: 13,
        sendCount: 64,
        holds: [],
    }, {
        id: "p8",
        name: "Placeholder Problem 6",
        vGrade: 6,
        setterName: "Placeholder Setter",
        description: "This is a placeholder problem. It is just for testing purposes.",
        wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
        likeCount: 6234,
        sendCount: 34566,
        holds: [],
    }],
}, {
    id: "w02",
    slug: "wall-2",
    name: "Wall 2",
    adminName: "Wall O'Admin",
    defaultWallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
    problemsCount: 2,
    minVGrade: 2,
    maxVGrade: 4,
    problems: [{
        id: "p0",
        name: "Easy Problem for Wall 2",
        vGrade: 2,
        setterName: "Steven Climbs",
        description: "This is a very simple description.",
        wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
        likeCount: 23,
        sendCount: 100,
        holds: [],
    }, {
        id: "p1",
        name: "Another Probem - Wall 2",
        vGrade: 4,
        setterName: "Steven Climbs",
        description: "This is a very simple description.",
        wallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
        likeCount: 5005,
        sendCount: 34567,
        holds: [],
    }],
}, {
    id: "w03",
    slug: "an-empty-wall",
    name: "An Empty Wall",
    adminName: "Someone Lonely",
    defaultWallImageUrl: "/assets/crusher-shop-2022-03-03.jpg",
    problemsCount: 0,
    minVGrade: null,
    maxVGrade: null,
    problems: [],
}];

const typeDefs = gql`
    type Query {
        walls: [Wall!]!
    }

    type Wall {
        id: ID!
        slug: String!
        name: String!
        adminName: String!
        defaultWallImageUrl: String!
        problemsCount: Int!
        minVGrade: Int
        maxVGrade: Int
        problems: [Problem!]!
    }

    type Problem {
        id: ID!
        name: String!
        vGrade: Int!
        setterName: String!
        description: String!
        wallImageUrl: String!
        likeCount: Int!
        sendCount: Int!
        holds: [Hold!]!
    }

    type Hold {
        typeId: Int! # TODO use enum?
        x: Float!
        y: Float!
        r: Float!
    }
`;

const resolvers = {
    Query: {
        walls: (root, args, context) => {
            return walls;
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

exports.handler = server.createHandler();