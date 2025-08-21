const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  slug: { type: String, unique: true }, //  slug field
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to auto-generate slug from title
blogSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
