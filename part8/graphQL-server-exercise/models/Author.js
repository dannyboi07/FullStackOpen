const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 4,
	},
	born: {
		type: Number,
	},
}, {
    toJSON: {
        virtuals: true
    }
});

AuthorSchema.virtual("bookCount", {
    ref: "Book",
    localField: "_id",
    foreignField: "author",
    count: true
});

// .aggregate([
// 	{
// 		$lookup: {
// 			from: "books",
// 			localField: "_id",
// 			foreignField: "author",
// 			as: "bookData",
// 		},
// 	},
// 	{
// 		$project: {
// 			_id: "$_id",
// 			name: "$name",
// 			born: "$born",
// 			bookCount: {
// 				$size: "$bookData",
// 			},
// 		},
// 	},
// ]);

module.exports = mongoose.model("Author", AuthorSchema);