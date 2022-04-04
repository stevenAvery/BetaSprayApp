const { Wall } = require('./models/wall');
const mongoose = require('mongoose');
const {
    problemEntityToProblem,
    problemEntitiesToProblems,
    wallEntityToWall,
    wallEntitiesToWalls,
} = require('./mappers');

const DB_CONNECTION_URI = process.env.DB_CONNECTION_URI;

let cachedDb = null;
const connect = async () => {
    if (cachedDb == null)
        cachedDb = await mongoose.connect(DB_CONNECTION_URI);

    return cachedDb;
}

// Connect to DB on start up to avoid cold start for first user
connect();

// Set new minVGrade, and maxVGrade
// This function assumes that wallEntity has all problems in cases where we have to search for new vGrades
const setWallExtremeVGradesIfPossible = (wallEntity, options = {}) => {
    const vGradeDeleted = options?.vGradeDeleted;
    const vGradeCreated = options?.vGradeCreated;

    // Take any vGrade we can get
    if (vGradeCreated != null && wallEntity.minVGrade == null) {
        wallEntity.minVGrade = vGradeCreated;
    // Found new minVGrade (new easiest climb on the wall)
    } else if (vGradeCreated != null && vGradeCreated < wallEntity.minVGrade) {
        wallEntity.minVGrade = vGradeCreated;
    // We deleted the previous easiest problem and don't have a replacement
    } else if (vGradeDeleted != null && vGradeDeleted <= wallEntity.minVGrade && wallEntity.problems != null && wallEntity.problems.length > 0) {
        console.log('We deleted the previous easiest problem and don\'t have a replacement');
        wallEntity.minVGrade = Math.min.apply(Math, wallEntity.problems.map(problem => problem.vGrade));
    }
    
    // Take any vGrade we can get
    if (vGradeCreated != null && wallEntity.maxVGrade == null) {
        wallEntity.maxVGrade = vGradeCreated;
    // Found new maxVGrade (new hardest climb on the wall)
    } else if (vGradeCreated != null && vGradeCreated > wallEntity.maxVGrade) {
        wallEntity.maxVGrade = vGradeCreated;
    // We deleted the previous hardest problem and don't have a replacement
    } else if (vGradeDeleted != null && vGradeDeleted >= wallEntity.maxVGrade && wallEntity.problems != null && wallEntity.problems.length > 0) {
        console.log('We deleted the previous hardest problem and don\'t have a replacement');
        wallEntity.maxVGrade = Math.max.apply(Math, wallEntity.problems.map(problem => problem.vGrade));
    }

    return wallEntity;
}

const createWallEntityAsync = async (wall) => {
    if (wall == null)
        throw new Error('Wall must not be null');

    await connect();

    const newWallEntity = await Wall.create({
        name: wall.name,
        adminName: wall.adminName,
        defaultWallImageUrl: wall.defaultWallImageUrl,
        problemsCount: 0,
        problems: []
    });

    return newWallEntity;
};

const createWallAsync = async (wall) => {
    const newWallEntity = await createWallEntityAsync(wall);
    return wallEntityToWall(newWallEntity);
};

const getWallsEntitiesAsync = async () => {
    await connect();
    const wallEntities = await Wall.find({});
    return wallEntities;
};

const getWallsAsync = async () => {
    const wallEntities = await getWallsEntitiesAsync();
    return wallEntitiesToWalls(wallEntities);
};

const getWallEntityAsync =  async (slug) => {
    if (slug == null || slug === '')
        throw new Error('Slug is required to find a wall.');

    await connect();
    const wallEntity = await Wall.findOne({ slug });

    if (wallEntity == null)
        throw Error('Unable to find a wall matching the given slug.');

    return wallEntity;
};

const getWallAsync =  async (slug) => {
    const wallEntity = await getWallEntityAsync(slug);
    return wallEntityToWall(wallEntity);
};

const createProblemEntityAsync =  async (wallSlug, problem) => {
    if (wallSlug == null || wallSlug === '')
        throw new Error('Wall slug is required to create a problem.');
    if (problem == null)
        throw new Error('Problem details are required to create a problem.');

    await connect()
    let wallEntity = await getWallEntityAsync(wallSlug);
    const problemId = new mongoose.Types.ObjectId;
    wallEntity.problemsCount++;
    let problemEntity = {
        _id: problemId,
        name: problem.name,
        vGrade: problem.vGrade,
        setterName: problem.setterName,
        description: problem.description,
        wallImageUrl: wallEntity.defaultWallImageUrl,
        likeCount: 0,
        sendCount: 0,
        holds: problem.holds.map(hold => {
            return {
                typeId: hold.typeId,
                x: hold.x,
                y: hold.y,
                r: hold.r,
            };
        }),
    };

    wallEntity.problems.push(problemEntity);

    setWallExtremeVGradesIfPossible(wallEntity, { vGradeCreated: problem.vGrade });

    await wallEntity.save();

    const newProblemEntity = await getProblemEntityAsync(wallSlug, problemId);
    return newProblemEntity;
};

const createProblemAsync =  async (wallSlug, problem) => {
    const newProblemEntity = await createProblemEntityAsync(wallSlug, problem);
    return problemEntityToProblem(newProblemEntity);
};

const getProblemEntityAsync = async (wallSlug, problemId) => {
    if (wallSlug == null || wallSlug === '')
        throw new Error('Wall slug is required to find a problem.');
    if (problemId == null || problemId === '')
        throw new Error('ProblemId is required to find a problem.');

    await connect()
    const wallEntity = await getWallEntityAsync(wallSlug);
    const problemEntity = wallEntity.problems?.id(problemId);

    if (problemEntity == null)
        throw Error('Unable to find a problem with the given wall slug and problem id');

    return problemEntity;
};

const getProblemAsync = async (wallSlug, problemId) => {
    const problemEntity = await getProblemEntityAsync(wallSlug, problemId);
    return problemEntityToProblem(problemEntity);
};

const updateProblemEntityAsync = async (wallSlug, problem) => {
    if (wallSlug == null || wallSlug === '')
        throw new Error('Wall slug is required to update a problem.');
    if (problem == null)
        throw new Error('Problem details are required to update a problem.');

    await connect()
    let wallEntity = await getWallEntityAsync(wallSlug);
    let problemEntity = wallEntity.problems?.id(problem.id);

    if (problemEntity == null)
        throw Error('Unable to find a problem with the given wall slug and problem id');

    const vGradeBeforeUpdate = 0 + problemEntity.vGrade;

    problemEntity.name = problem.name;
    problemEntity.vGrade = problem.vGrade;
    problemEntity.setterName = problem.setterName;
    problemEntity.description = problem.description;
    if (problem.wallImageUrl != null && problem.wallImageUrl != '') // if no wallImageUrl was given, continue using existing
        problemEntity.wallImageUrl = problem.wallImageUrl;
    problemEntity.holds = problem.holds?.map(hold => {
        return {
            typeId: hold.typeId,
            x: hold.x,
            y: hold.y,
            r: hold.r,
        };
    });

    setWallExtremeVGradesIfPossible(wallEntity, { 
        vGradeDeleted: vGradeBeforeUpdate,
        vGradeCreated: problem.vGrade,
    });

    await wallEntity.save();

    const updatedProblemEntity = await getProblemEntityAsync(wallSlug, problem.id);
    return updatedProblemEntity;
};

const updateProblemAsync = async (wallSlug, problem) => {
    const updatedProblemEntity = await updateProblemEntityAsync(wallSlug, problem);
    return problemEntityToProblem(updatedProblemEntity);
};

const deleteProblemAsync = async (wallSlug, problemId) => {
    if (wallSlug == null || wallSlug === '')
        throw new Error('Wall slug is required to find a problem.');
    if (problemId == null || problemId === '')
        throw new Error('ProblemId is required to find a problem.');

    await connect()
    const wallEntity = await getWallEntityAsync(wallSlug);
    const problemEntity = wallEntity.problems?.id(problemId);
    if (problemEntity == null)
        throw Error('Unable to find any problem with the given wall slug and problem id');
    
    const vGradeBeforeDelete = problemEntity.vGrade;
    
    problemEntity.remove();
    wallEntity.problemsCount--;

    setWallExtremeVGradesIfPossible(wallEntity, { 
        vGradeDeleted: vGradeBeforeDelete,
    });

    await wallEntity.save();

    return problemId;
}

module.exports = {
    // Wall
    createWallAsync,
    getWallsAsync,
    getWallAsync,

    // Problem
    createProblemAsync,
    getProblemAsync,
    updateProblemAsync,
    deleteProblemAsync,
};