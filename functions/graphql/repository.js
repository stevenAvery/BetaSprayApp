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
    await connect();
    const wallEntity = await Wall.findOne({ slug });

    if (wallEntity == null)
        throw Error('No wall found matching the given slug.');

    return wallEntity;
};

const getWallAsync =  async (slug) => {
    const wallEntity = await getWallEntityAsync(slug);
    return wallEntityToWall(wallEntity);
};

const createProblemEntityAsync =  async (wallSlug, problem) => {
    if (wallSlug == null || wallSlug === '')
        throw new Error('Must include wall slug to add problem');
    if (problem == null)
        throw new Error('Problem must not be null.');

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

    await wallEntity.save();

    const newProblemEntity = await getProblemEntityAsync(wallSlug, problemId);
    return newProblemEntity;
};

const createProblemAsync =  async (wallSlug, problem) => {
    const newProblemEntity = await createProblemEntityAsync(wallSlug, problem);
    return problemEntityToProblem(newProblemEntity);
};

const getProblemEntityAsync = async (wallSlug, problemId) => {
    console.log('getProblemEntityAsync');

    if (wallSlug == null || wallSlug === '')
        throw new Error('Must include wallSlug.');
    if (problemId == null || problemId === '')
        throw new Error('Must include problemId.');

    await connect()
    const wallEntity = await getWallEntityAsync(wallSlug);
    console.log(wallEntity);
    const problemEntity = wallEntity.problems?.id(problemId);

    if (problemEntity == null)
        throw Error('Unable to find any problem with the given wall slug and problem id');

    return problemEntity;
};

const getProblemAsync = async (wallSlug, problemId) => {
    console.log('getProblemAsync');
    const problemEntity = await getProblemEntityAsync(wallSlug, problemId);
    return problemEntityToProblem(problemEntity);
};

const updateProblemEntityAsync = async (wallSlug, problem) => {
    if (wallSlug == null || wallSlug === '')
        throw new Error('Must include wall slug');
    if (problem == null)
        throw new Error('Must include problem.');

    await connect()
    let wallEntity = await getWallEntityAsync(wallSlug);
    let problemEntity = wallEntity.problems?.id(problem.id);

    if (problemEntity == null)
        throw Error('Unable to find any problem with the given wall slug and problem id');

    problemEntity.name = problem.name;
    problemEntity.vGrade = problem.vGrade;
    problemEntity.setterName = problem.setterName;
    problemEntity.description = problem.description;
    if (problem.wallImageUrl != null && problem.wallImageUrl != '') // if no wallImageUrl was given, continue using existing
        problemEntity.wallImageUrl = problem.wallImageUrl;
    problemEntity.holds = problem.holds.map(hold => {
        return {
            typeId: hold.typeId,
            x: hold.x,
            y: hold.y,
            r: hold.r,
        };
    });

    await wallEntity.save();

    const updatedProblemEntity = await getProblemEntityAsync(wallSlug, problem.id);
    return updatedProblemEntity;
};

const updateProblemAsync = async (wallSlug, problem) => {
    const updatedProblemEntity = updateProblemEntityAsync(wallSlug, problem);
    return problemEntityToProblem(updatedProblemEntity);
};

const deleteProblemAsync = async (wallSlug, problemId) => {
    if (wallSlug == null || wallSlug === '')
        throw new Error('Must include wall slug');
    if (problemId == null || problemId === '')
        throw new Error('Must include problem id.');

    await connect()
    let wall = await getWallAsync(wallSlug);
    let problemEntity = wall.problems?.id(problemId);

    if (problemEntity == null)
        throw Error('Unable to find any problem with the given wall slug and problem id');

    problemEntity.remove();
    await wall.save();
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