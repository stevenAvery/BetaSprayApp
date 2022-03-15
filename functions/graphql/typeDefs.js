const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
    type Query {
        getWalls(filter: WallsFilter): [Wall!]!
        getWall(slug: String!, filter: ProblemsFilter): Wall!

        getProblem(wallSlug: String!, problemId: String!): Problem!
    }

    type Mutation {
        createWall(wall: CreateWallInput!): Wall!

        createProblem(wallSlug: String!, problem: CreateProblemInput!): Problem!
        updateProblem(wallSlug: String!, problem: UpdateProblemInput!): Problem!
        deleteProblem(wallSlug: String!, problemId: String!): String!
    }

    # --- Type Definitions -----------------------------------------------------
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
        createdAt: String!
    }

    type Hold {
        typeId: Int! # TODO use enum?
        x: Float!
        y: Float!
        r: Float!
    }

    # --- Query Objects --------------------------------------------------------
    # Walls query
    input WallsFilter {
        wallSlug: String
        nameContains: String
    }

    # Wall query
    input ProblemsFilter {
        minVGrade: Int
        maxVGrade: Int
    }

    # --- Mutation Objects -----------------------------------------------------
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

    # Update problem input
    input UpdateProblemInput {
        id: String!
        name: String!
        vGrade: Int
        setterName: String!
        description: String!
        wallImageUrl: String
        holds: [HoldInput!]!
    }
`;

module.exports = {
    typeDefs,
};