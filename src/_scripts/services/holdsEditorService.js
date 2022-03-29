
const HOLD_LINE_WIDTH = 3;

// Resizes the given canvas to fit its contianer 
// function fitCanvasToContainer(canvas, holdsEditorContainer) {
//     canvas.width = holdsEditorContainer.clientWidth;
//     canvas.height = holdsEditorContainer.clientHeight;
//     return canvas;
// }

// Transforms a wall image to fit the context
// TODO allow zoom in, zoom out, and move
// function getWallImageTransform(ctx, wallImage) {
//     const imageScaleX = ctx.canvas.width  / wallImage.width;
//     const imageScaleY = ctx.canvas.height / wallImage.height;
//     const scale = Math.min(imageScaleX, imageScaleY);

//     const width = wallImage.width * scale;
//     const height = wallImage.height * scale;

//     const x = (ctx.canvas.width  - width)  / 2.0;
//     const y = (ctx.canvas.height - height) / 2.0;

//     return { x, y, width, height, scale };
// }

// function imagePointToCtxPoint(imagex, imagey, wallImageTransform) {
//     const x = imagex * wallImageTransform.scale + wallImageTransform.x;
//     const y = imagey * wallImageTransform.scale + wallImageTransform.y;

//     return { x, y };
// }

// function ctxPointToImagePoint(ctxx, ctxy, wallImageTransform) {
//     const x = (ctxx - wallImageTransform.x) / wallImageTransform.scale;
//     const y = (ctxy - wallImageTransform.y) / wallImageTransform.scale;

//     return { x, y };
// }

// function imagePointToCtxScale(size, wallImageTransform) {
//     return size * wallImageTransform.scale;
// }

// function isPointInWallImage(imagePoint, wallImage) {
//     return imagePoint.x >= 0 && imagePoint.x < wallImage.width && 
//            imagePoint.y >= 0 && imagePoint.y < wallImage.height;
// }

function getCtxPoint(canvas, clientX, clientY) {
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    return { x, y };
}

function getHoldColour(allHoldTypes, holdTypeId) {
    const holdType = allHoldTypes
        .find(holdType => holdType.id === holdTypeId) || null;
    return holdType?.colour ?? 'rgb(0, 0, 0)';
}

function render(ctx, wallImage, problem, allHoldTypes, isEditing = false) {
    // Clear background
    ctx.fillStyle = isEditing ? '#FFFFFF' : '#F1F5F9';

    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw wall image
    const wallImageTransform = getWallImageTransform(ctx, wallImage)
    ctx.drawImage(wallImage, 
        wallImageTransform.x, wallImageTransform.y, 
        wallImageTransform.width, wallImageTransform.height)

    // Draw climbing holds
    for(hold of problem.holds) {
        const point = imagePointToCtxPoint(hold.x, hold.y, wallImageTransform);
        const r = imagePointToCtxScale(hold.r, wallImageTransform);
        const colour = getHoldColour(allHoldTypes, hold.typeId);

        ctx.strokeStyle = colour;
        ctx.lineWidth = HOLD_LINE_WIDTH;
        ctx.beginPath();
        ctx.arc(point.x, point.y, r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    }

    return {ctx, wallImageTransform};
}

// module.exports = {
//     getUtils: () => ({
//         fitCanvasToContainer,
//         render,
//         isPointInWallImage,
//         ctxPointToImagePoint,
//         getCtxPoint,

//         wallImage: new Image(),
//         isImageLoaded: false,
//         isAfterFirstTick: false,
//         newHold: null,
//         wallImageTransform: null,
//     }),
//     problem: {},
//     selectedHoldTypeId: 0,
// };

module.exports = {
    isEditing: false,
    selectedHoldTypeId: 0,
    wallImageUrl: '',
    holds: [],
};