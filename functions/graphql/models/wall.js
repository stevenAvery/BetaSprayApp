const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

// const { Schema } = mongoose;

const holdSchema = new mongoose.Schema({
    typeId: { type: Number, required: true, min: 0 }, // TODO use enum?
    x:      { type: Number, required: true, min: 0 },
    y:      { type: Number, required: true, min: 0 },
    r:      { type: Number, required: true, min: 0 },
});

const problemSchema = new mongoose.Schema({
    // slug:         { type: String, required: true, unique: true, index: true, sparse: true },
    name:         { type: String, required: true, trim: true },
    vGrade:       { type: Number, min: 0 },
    setterName:   { type: String, required: true, trim: true },
    description:  { type: String, required: true },
    wallImageUrl: { type: String, required: true },
    likeCount:    { type: Number, required: true, min: 0 },
    sendCount:    { type: Number, required: true, min: 0 },
    holds:        { type: [holdSchema], required: false },
}, { timestamps: true });

// Automatically create slug for problem based on name
// problemSchema.plugin(URLSlugs('name', {
//     field: 'slug',
//     addField: false,
//     separator: '-',
//     update: false, // don't update slug when dependent fields change - updating will break existing links
//     index: true,
// }));

const wallSchema = new mongoose.Schema({
    slug:                { type: String, required: true, unique: true, index: true },
    name:                { type: String, required: true, trim: true },
    adminName:           { type: String, required: true, trim: true },
    defaultWallImageUrl: { type: String, required: true },
    problemsCount:       { type: Number, required: true, min: 0 },
    minVGrade:           { type: Number, min: 0 },
    maxVGrade:           { type: Number, min: 0 },
    problems:            { type: [problemSchema], required: false },
}, { timestamps: true });

// Automatically create slug for wall based on name
wallSchema.plugin(URLSlugs('name', {
    field: 'slug',
    addField: false,
    separator: '-',
    update: false, // don't update slug when dependent fields change - updating will break existing links
    index: true,
}));

const Wall = mongoose.model('Wall', wallSchema);

module.exports = {
    Wall
};