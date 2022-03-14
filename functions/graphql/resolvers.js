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
        walls: async (parent, args, context) => {
            const { filter } = args;

            try {
                const walls = await getWallsAsync();
                return {
                    success: true,
                    walls,
                };
            } catch (err) {
                return {
                    success: false,
                    errors: [{
                        name: err.name,
                        message: err.message,
                    }],
                }
            }
        },
        wall: async (parent, args, context) => {
            const { slug, filter } = args;
            // const hasMinVGradeFilter = filter?.minVGrade != null;

            if (slug == null || slug === '') {
                return {
                    success: false,
                    errors: [{
                        name: 'Invalid input',
                        message: 'Slug is required to find a wall.',
                    }],
                };
            }

            try {
                const wall = await getWallAsync(slug);
                return {
                    success: true,
                    wall,
                };
            } catch (err) {
                return {
                    success: false,
                    errors: [{
                        name: err.name,
                        message: err.message,
                    }],
                }
            }
        },
        problem: async (parent, args, context) => {
            const { slug, id } = args;

            try {
                console.log('get problem');
                const problem = await getProblemAsync(slug, id);
                return {
                    success: true,
                    problem,
                };
            } catch (err) {
                return {
                    success: false,
                    errors: [{
                        name: err.name,
                        message: err.message,
                    }],
                }
            }
        },
    },
    Mutation: {
        createWall: async (parent, args, context) => {
            const { wall } = args;

            try {
                const wallResult = await createWallAsync(wall);
    
                return {
                    success: true,
                    wall: wallResult,
                }
            } catch (err) {
                return {
                    success: false,
                    errors: [{
                        name: err.name,
                        message: err.message,
                    }],
                }
            }
        },
        createProblem: async (parent, args, context) => {
            const { wallSlug, problem } = args;

            try {
                const newProblem = await createProblemAsync(wallSlug, problem);
    
                return {
                    success: true,
                    problem: newProblem,
                }
            } catch (err) {
                return {
                    success: false,
                    errors: [{
                        name: err.name,
                        message: err.message,
                    }],
                }
            }
        },
        updateProblem: async (parent, args, context) => {
            const { wallSlug, problem } = args;

            try {
                const updatedProblem = await updateProblemAsync(wallSlug, problem);
    
                return {
                    success: true,
                    problem: updatedProblem,
                }
            } catch (err) {
                return {
                    success: false,
                    errors: [{
                        name: err.name,
                        message: err.message,
                    }],
                }
            }
        },
        deleteProblem: async (parent, args, context) => {
            const { wallSlug, problemId } = args;

            try {
                await deleteProblemAsync(wallSlug, problemId);
    
                return {
                    success: true,
                }
            } catch (err) {
                return {
                    success: false,
                    errors: [{
                        name: err.name,
                        message: err.message,
                    }],
                }
            }
        },
    },
};

module.exports = {
    resolvers,
};