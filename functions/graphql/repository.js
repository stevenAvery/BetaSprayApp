const { Wall } = require('./models/wall');
const mongoose = require('mongoose');

const DB_CONNECTION_URI = process.env.DB_CONNECTION_URI;

let cachedDb = null;
const connect = async () => {
    if (cachedDb == null)
        cachedDb = await mongoose.connect(DB_CONNECTION_URI);

    return cachedDb;
}

const createWallAsync = async (wall) => {
    if (wall == null)
        throw new Error('Wall must not be null');

    await connect();

    const newWall = await Wall.create({
        name: wall.name,
        adminName: wall.adminName,
        defaultWallImageUrl: wall.defaultWallImageUrl,
        problemsCount: 0,
        problems: []
    });

    return newWall;
};

const getWallsAsync = async () => {
    await connect();
    return await Wall.find({});
};

const getWallAsync =  async (slug) => {
    await connect();
    const wall = await Wall.findOne({ slug })

    if (wall == null)
        throw Error('No wall found matching the given slug.');

    return wall;
};

const createProblemAsync =  async (wallSlug, problem) => {
    if (wallSlug == null || wallSlug === '')
        throw new Error('Must include wall slug to add problem');
    if (problem == null)
        throw new Error('Problem must not be null.');

    await connect()
    let wall = await getWallAsync(wallSlug);
    const problemId = new mongoose.Types.ObjectId;
    wall.problemsCount++;
    let problemEntity = {
        _id: problemId,
        name: problem.name,
        vGrade: problem.vGrade,
        setterName: problem.setterName,
        description: problem.description,
        wallImageUrl: wall.defaultWallImageUrl,
        likeCount: 0,
        sendCount: 0,
        holds: problem.holds.map(hold => {
            return {
                typeId: hold.typeId,
                x: hold.x,
                y: hold.y,
                r: hold.r,
            };
        })
    };

    wall.problems.push(problemEntity);

    await wall.save();

    const newProblem = await getProblemAsync(wallSlug, problemId);
    return newProblem;
};

const getProblemAsync = async (wallSlug, problemId) => {
    if (wallSlug == null || wallSlug === '')
        throw new Error('Must include wallSlug.');
    if (problemId == null || problemId === '')
        throw new Error('Must include problemId.');

    await connect()
    const wall = await getWallAsync(wallSlug);
    const problemEntity = wall.problems.id(problemId);

    return {
        id: problemEntity._id,
        name: problemEntity.name,
        vGrade: problemEntity.vGrade,
        setterName: problemEntity.setterName,
        description: problemEntity.description,
        wallImageUrl: problemEntity.wallImageUrl,
        likeCount: problemEntity.likeCount,
        sendCount: problemEntity.sendCount,
        holds: problemEntity.holds.map((hold) => {
            return {
                typeId: hold.typeId,
                x: hold.x,
                y: hold.y,
                r: hold.r,
            };
        }),
    };
};

module.exports = {
    createWallAsync,
    getWallsAsync,
    getWallAsync,

    createProblemAsync,
    getProblemAsync
};