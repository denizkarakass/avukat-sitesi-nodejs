const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;


const BlogSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    content: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type:String,
        unique:true
    }
});

BlogSchema.pre('validate', function(next){
    this.slug = slugify(this.name, {
      lower:true,
      strict:true
    })
    next();
  })

const Blog = mongoose.model('Blog', BlogSchema );
module.exports = Blog;