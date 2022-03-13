const { ApolloServer, gql } = require('apollo-server-lambda');
// const { getWalls } = require('./wallsRepository.js');
const { 
    createWallAsync,
    getWallsAsync, 
    getWallAsync, 
    createProblemAsync,
    getProblemAsync,
} = require('./repository.js');


const typeDefs = gql`
    type Query {
        walls(filter: WallsFilter): WallsResponse
        wall(slug: String!, filter: WallFilter): WallResponse
        problem(slug: String!, id: String!): ProblemResponse
    }

    type Mutation {
        createWall(wall: CreateWallInput): WallResponse
        createProblem(wallSlug: String!, problem: CreateProblemInput!): ProblemResponse
    }

    type Error {
        name: String!
        message: String!
    }

    # Walls query
    input WallsFilter {
        wallSlug: String
        nameContains: String
    }

    type WallsResponse {
        errors: [Error!]
        walls: [Wall!]
    }

    # Walls query
    input WallFilter {
        minVGrade: Int
        maxVGrade: Int
    }

    type WallResponse {
        errors: [Error!]
        wall: Wall
    }

    # Problem Query
    type ProblemResponse {
        errors: [Error!]
        problem: Problem
    }

    # Create wall mutation
    input CreateWallInput {
        name: String!
        adminName: String!
        defaultWallImageUrl: String!
    }

    # Create problem mutation
    input CreateProblemInput {
        name: String!
        vGrade: Int!
        setterName: String!
        description: String!
        holds: [HoldInput!]!
    }

    input HoldInput {
        typeId: Int! # TODO use enum?
        x: Float!
        y: Float!
        r: Float!
    }

    # Type definitions
    type Wall {
        slug: ID!
        name: String!
        adminName: String!
        defaultWallImageUrl: String!
        problemsCount: Int!
        minVGrade: Int
        maxVGrade: Int
        problems: [Problem!]!
    }

    type Problem {
        id: String!
        name: String!
        vGrade: Int
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
        walls: async (parent, args, context) => {
            const { filter } = args;

            try {
                const walls = await getWallsAsync();
                return {
                    walls
                };
            } catch (err) {
                return {
                    errors: [{
                        name: err.name,
                        message: err.message,
                    }]
                }
            }
        },
        wall: async (parent, args, context) => {
            const { slug, filter } = args;
            // const hasMinVGradeFilter = filter?.minVGrade != null;

            if (slug == null || slug === '') {
                return {
                    errors: [{
                        name: 'Invalid input',
                        message: 'Slug is required to find a wall.',
                    }],
                };
            }

            try {
                const wall = await getWallAsync(slug);
                return {
                    wall,
                };
            } catch (err) {
                return {
                    errors: [{
                        name: err.name,
                        message: err.message,
                    }]
                }
            }
        },
        problem: async (parent, args, context) => {
            const { slug, id } = args;

            try {
                const problem = await getProblemAsync(slug, id);
                return {
                    problem
                };
            } catch (err) {
                return {
                    errors: [{
                        name: err.name,
                        message: err.message,
                    }]
                }
            }
        },
        // problem: async (parent, args, context) => {
        //     const { slug, id } = args;

        //     if (slug == null || id == null) {
        //         return {
        //             errors: [{
        //                 title: 'Invalid input',
        //                 message: 'Wall slug and problem id are required to find a problem.',
        //             }],
        //             problem: null,
        //         };
        //     }

        //     // Find wall
        //     const wall = getWalls()?.find((wall) => wall?.slug === slug);
        //     if (wall == null) {
        //         return {
        //             errors: [{
        //                 title: 'Invalid input',
        //                 message: 'Unable to find any walls with the given slug.',
        //             }],
        //         };
        //     }

        //     // Find problem
        //     const problem = wall?.problems?.find((problem) => problem?.id === id);
        //     if (problem == null) {
        //         return {
        //             errors: [{
        //                 title: 'Invalid input',
        //                 message: 'Unable to find any problems with the given problem id.',
        //             }],
        //         };
        //     }

        //     return {
        //         problem,
        //     };
        // },
    },
    Mutation: {
        createWall: async (parent, args, context) => {
            const { wall } = args;

            try {
                const wallResult = await createWallAsync(wall);
    
                return {
                    wall: wallResult
                }
            } catch (err) {
                return {
                    errors: [{
                        name: err.name,
                        message: err.message,
                    }]
                }
            }
        },
        createProblem: async (parent, args, context) => {
            const { wallSlug, problem } = args;

            try {
                const problemResult = await createProblemAsync(wallSlug, problem);
    
                return {
                    problem: problemResult
                }
            } catch (err) {
                return {
                    errors: [{
                        name: err.name,
                        message: err.message,
                    }]
                }
            }
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (() => {  }),
});

exports.handler = server.createHandler();