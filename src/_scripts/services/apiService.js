
const baseUrl = '/api';
const graphQLUrl = `${baseUrl}/graphql`;


async function graphQLFetcherAsync(query, variables = {}) {
    const response = await fetch(graphQLUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        })
    });
    const responseJson = await response.json();
    
    // TODO Improve error handling
    if (responseJson.errors != null && responseJson.errors != [])
        console.error(responseJson.errors);

    return responseJson.data;
}

async function getWallSummariesAsync() {
    const query = `
        query getWallSummaries {
            getWalls {
                slug
                name
                adminName
                defaultWallImageUrl
                problemsCount
                minVGrade
                maxVGrade
            }
        }
    `;

    const response = await graphQLFetcherAsync(query);
    const wallSummaries = response.getWalls;
    return wallSummaries;
}

async function getWallSummaryAsync(slug) {
    const query = `
    query getWallSummary($slug: String!) {
        getWall(slug: $slug) {
            slug
            name
            adminName
            defaultWallImageUrl
            problemsCount
            minVGrade
            maxVGrade
        }
    }
    `;
    const variables = {
        slug: slug,
    };

    const response = await graphQLFetcherAsync(query, variables);
    return response.getWall;
}

async function getWallAsync(slug) {
    const query = `
    query getWall($slug: String!) {
        getWall(slug: $slug) {
            slug
            name
            adminName
            defaultWallImageUrl
            problemsCount
            minVGrade
            maxVGrade
            problems {
                id
                name
                vGrade
                setterName
                description
                likeCount
                sendCount
                holds {
                    typeId
                    x
                    y
                    r
                }
            }
        }
    }
    `;
    const variables = {
        slug: slug,
    };

    const response = await graphQLFetcherAsync(query, variables);
    return response.getWall;
}

async function getProblemAsync(slug, problemId) {
    const query = `
    query getProblem($wallSlug: String!, $problemId: String!){
        getProblem(wallSlug: $wallSlug, problemId: $problemId) {
            id
            name
            vGrade
            setterName
            description
            wallImageUrl
            likeCount
            sendCount
            holds {
                typeId
                x
                y
                r
            }
            createdAt
        }
    }
    `;
    const variables = {
        wallSlug: slug,
        problemId: problemId,
    };

    const response = await graphQLFetcherAsync(query, variables);
    return response.getProblem;
}

async function createProblemAsync(slug, problem) {
    const query = `
        mutation createProblem($wallSlug: String!, $problem: CreateProblemInput!) {
            createProblem(wallSlug: $wallSlug, problem: $problem) {
                id
                name
                vGrade
                setterName
                description
                wallImageUrl
                likeCount
                sendCount
                holds {
                    typeId
                    x
                    y
                    r
                }
                createdAt
            }
        }
    `;

    // Clean up problem data
    problem.vGrade = parseInt(problem.vGrade);
    delete problem.id;
    delete problem.wallImageUrl;
    delete problem.likeCount;
    delete problem.sendCount;
    delete problem.createdAt;

    const variables = {
        wallSlug: slug,
        problem: problem,
    };

    const response = await graphQLFetcherAsync(query, variables);
    return response.createProblem;
}

async function updateProblemAsync(slug, problem) {
    const query = `
        mutation updateProblem($wallSlug: String!, $problem: UpdateProblemInput!) {
            updateProblem(wallSlug: $wallSlug, problem: $problem) {
                id
                name
                vGrade
                setterName
                description
                wallImageUrl
                likeCount
                sendCount
                holds {
                    typeId
                    x
                    y
                    r
                }
                createdAt
            }
        }
    `;

    // Clean up problem data
    problem.vGrade = parseInt(problem.vGrade);
    delete problem.likeCount;
    delete problem.sendCount;
    delete problem.createdAt;

    const variables = {
        wallSlug: slug,
        problem: problem,
    };

    const response = await graphQLFetcherAsync(query, variables);
    return response.updateProblem;
}

module.exports = {
    getWallSummariesAsync,
    getWallSummaryAsync,
    getWallAsync,
    getProblemAsync,
    createProblemAsync,
    updateProblemAsync,
};