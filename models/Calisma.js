const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;


const CalismaSchema = new Schema({
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

CalismaSchema.pre('validate', function(next){
    this.slug = slugify(this.name, {
      lower:true,
      strict:true
    })
    next();
  })

const Calisma = mongoose.model('Calisma', CalismaSchema );
module.exports = Calisma;