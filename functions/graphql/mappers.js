

const problemEntityToProblem = (problemEntity) => {
    if (problemEntity == null)
        return null;
    
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
        createdAt: problemEntity.createdAt,
    };
};

const problemEntitiesToProblems = (problemEntities) => {
    if (problemEntities == null)
        return null;
    if (problemEntities === [])
        return [];

    return problemEntities.map(problemEntity => problemEntityToProblem(problemEntity));
}

const wallEntityToWall = (wallEntity) => {
    if (wallEntity == null)
        return null;

    return {
        slug: wallEntity.slug,
        name: wallEntity.name,
        adminName: wallEntity.adminName,
        defaultWallImageUrl: wallEntity.defaultWallImageUrl,
        problemsCount: wallEntity.problemsCount,
        minVGrade: wallEntity.minVGrade,
        maxVGrade: wallEntity.maxVGrade,
        problems: problemEntitiesToProblems(wallEntity.problems)

    };
};

const wallEntitiesToWalls = (wallEntities) => {
    if (wallEntities == null)
        return null;
    if (wallEntities === [])
        return [];
    
    return wallEntities.map(wallEntity => wallEntityToWall(wallEntity));
};

module.exports = {
    problemEntityToProblem,
    problemEntitiesToProblems,
    wallEntityToWall,
    wallEntitiesToWalls,
};