const { ApolloServer, gql } = require('apollo-server-lambda');
const { getWalls } = require('./wallsRepository.js');


const typeDefs = gql`
    type Query {
        walls(filter: WallsFilter): WallsResponse
        wall(slug: String!, filter: WallFilter): WallResponse
        problem(slug: String!, id: String!): ProblemResponse
    }

    type Mutation {
        createProblem(problem: CreateProblemInput!): Problem
    }

    type Error {
        title: String!
        details: String!
    }

    # Walls query
    input WallsFilter {
        wallSlug: String
        nameContains: String
    }

    type WallsResponse {
        errors: [Error!]!
        walls: [Wall!]!
    }

    # Walls query
    input WallFilter {
        minVGrade: Int
        maxVGrade: Int
    }

    type WallResponse {
        errors: [Error!]!
        wall: Wall
    }

    # Problem Query
    type ProblemResponse {
        errors: [Error!]!
        problem: Problem
    }

    # Create problem mutation
    input CreateProblemInput {
        name: String!
        vGrade: Int!
        setterName: String!
        description: String!
        wallImageUrl: String!
        likeCount: Int!
        sendCount: Int!
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
        walls: async (parent, args, context) => {
            console.log("TESINTG");
            const { filter } = args;
            let walls = getWalls();

            if (filter == null) {
                return {
                    errors: [],
                    walls,
                }
            }

            const hasNameContainsFilter = filter?.nameContains != null;
            const nameContainsLower     = filter?.nameContains?.toLocaleLowerCase();
            
            walls = walls.filter((wall) => {
                // Name contains filter
                if (hasNameContainsFilter && !wall?.name?.toLocaleLowerCase()?.includes(nameContainsLower)) {
                    return false;
                }

                return true;
            });

            return {
                errors: [],
                walls,
            };
        },
        wall: async (parent, args, context) => {
            const { slug, filter } = args;
            const hasMinVGradeFilter = filter?.minVGrade != null;
            const hasMaxVGradeFilter = filter?.maxVGrade != null;
            const hasProblemFilter = hasMinVGradeFilter || hasMaxVGradeFilter;

            if (slug == null || slug === '') {
                return {
                    errors: [{
                        title: 'Invalid input',
                        message: 'Slug is required to find a wall.',
                    }],
                    wall: null,
                };
            }

            const wall = getWalls()?.find((wall) => wall?.slug === slug);

            if (wall == null) {
                return {
                    errors: [{
                        title: 'Invalid input',
                        message: 'Unable to find any walls with the given slug.',
                    }],
                    wall: null,
                };
            }

            if (hasProblemFilter) {
                wall.problems = wall.problems.filter((problem) => {
                    // Min vGrade filter
                    if (hasMinVGradeFilter && problem?.vGrade < filter?.minVGrade)
                        return false
                    // Max vGrade filter
                    if (hasMaxVGradeFilter && problem?.vGrade > filter?.maxVGrade)
                        return false

                    return true
                });
            }

            return {
                errors: [],
                wall,
            };
        },
        problem: async (parent, args, context) => {
            const { slug, id } = args;

            if (slug == null || id == null) {
                return {
                    errors: [{
                        title: 'Invalid input',
                        message: 'Wall slug and problem id are required to find a problem.',
                    }],
                    problem: null,
                };
            }

            // Find wall
            const wall = getWalls()?.find((wall) => wall?.slug === slug);
            if (wall == null) {
                return {
                    errors: [{
                        title: 'Invalid input',
                        message: 'Unable to find any walls with the given slug.',
                    }],
                    problem: null,
                };
            }

            // Find problem
            const problem = wall?.problems?.find((problem) => problem?.id === id);
            if (problem == null) {
                return {
                    errors: [{
                        title: 'Invalid input',
                        message: 'Unable to find any problems with the given problem id.',
                    }],
                    wall: null,
                };
            }

            return {
                errors: [],
                problem,
            };
        },
    },
    Mutation: {
        createProblem: async (parent, args, context) => {
            const { problem } = args;

            // TODO
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (() => {  }),
});

exports.handler = server.createHandler();