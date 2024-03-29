
module.exports = {
    abbreviateNumber(number) {
        if (number === null || number === undefined) {
            return "0";
        }
        if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'k';
        }

        return number.toString();
    },
    vGradeToString(vGrade) {
        const grade = parseInt(vGrade) || '?';
        return `V${grade}`;
    },
    getAllHoldTypes() {
        return [
            { id: 0, colour: '#07EF26', text: 'Start'     },
            { id: 1, colour: '#FFE500', text: 'Foot'      },
            { id: 2, colour: '#0010FF', text: 'Hand/Foot' },
            { id: 3, colour: '#FF0000', text: 'Finish'    },
        ];
    },
    getHoldTypeById(holdTypeId) {
        return getAllHoldTypes()
            .find(holdType => holdType.id === holdTypeId) || null;
    },
    getDistance(x1, y1, x2, y2) {
        const y = x2 - x1;
        const x = y2 - y1;
        return Math.sqrt(x * x + y * y);
    },
    getNewProblem(defaultWallImageUrl) {
        return { 
            id: "", // TODO anything needed for default id?
            name: "",
            vGrade: 0,
            setterName: "",
            description: "",
            wallImageUrl: defaultWallImageUrl,
            likeCount: 0,
            sendCount: 0,
            holds: [],
        };
    },
};