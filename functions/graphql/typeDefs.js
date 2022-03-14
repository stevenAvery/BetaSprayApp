const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
    type Query {
        walls(filter: WallsFilter): WallsResponse
        wall(slug: String!, filter: WallFilter): WallResponse

        problem(slug: String!, id: String!): ProblemResponse
    }

    type Mutation {
        createWall(wall: CreateWallInput): WallResponse

        createProblem(wallSlug: String!, problem: CreateProblemInput!): ProblemResponse
        updateProblem(wallSlug: String!, problem: UpdateProblemInput!): ProblemResponse
        deleteProblem(wallSlug: String!, problemId: String!): BasicResponse
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
        success: Boolean!
        errors: [Error!]
        walls: [Wall!]
    }

    # Walls query
    input WallFilter {
        minVGrade: Int
        maxVGrade: Int
    }

    type WallResponse {
        success: Boolean!
        errors: [Error!]
        wall: Wall
    }

    # Problem Query
    type ProblemResponse {
        success: Boolean!
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

    # Type definitions
    type BasicResponse {
        success: Boolean!
        errors: [Error!]
    }

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
`;

module.exports = {
    typeDefs,
};