const { 
    createWallAsync,
    getWallsAsync, 
    getWallAsync, 

    createProblemAsync,
    getProblemAsync,
    updateProblemAsync,
    deleteProblemAsync,
} = require('./repository.js');


const resolvers = {
    Query: {
        getWalls: async (parent, args, context) => {
            const { filter } = args;

            const walls = await getWallsAsync();
            return walls;
        },
        getWall: async (parent, args, context) => {
            const { slug, filter } = args;
            // const hasMinVGradeFilter = filter?.minVGrade != null;

            const wall = await getWallAsync(slug);
            return wall;
        },
        getProblem: async (parent, args, context) => {
            const { wallSlug, problemId } = args;

            const problem = await getProblemAsync(wallSlug, problemId);
            return problem;
        },
    },
    Mutation: {
        createWall: async (parent, args, context) => {
            const { wall } = args;

            const newWall = await createWallAsync(wall);
            return newWall;
        },
        createProblem: async (parent, args, context) => {
            const { wallSlug, problem } = args;

            const newProblem = await createProblemAsync(wallSlug, problem);
            return newProblem;

        },
        updateProblem: async (parent, args, context) => {
            const { wallSlug, problem } = args;

            const updatedProblem = await updateProblemAsync(wallSlug, problem);
            return updatedProblem;
        },
        deleteProblem: async (parent, args, context) => {
            const { wallSlug, problemId } = args;

            const deletedProblemId = await deleteProblemAsync(wallSlug, problemId);
            return deletedProblemId;
        },
    },
};

module.exports = {
    resolvers,
};