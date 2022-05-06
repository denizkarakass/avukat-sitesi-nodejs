const Blog = require('../models/Blog');
const User = require('../models/User');


exports.createBlog = async (req,res) => {
    const blog = await Blog.create(req.body);
   
    try{
        res.status(201).redirect('/blogs')
    }catch{
        res.status(400).json({
            status:'fail',
            error
        })
    }
}

exports.getAllBlogs = async (req,res) => {
   
    try{
        const blogs = await Blog.find();
        const user = await User.findOne({_id:req.session.userID})

        res.status(201).render('blogs',{
            blogs,
            user,
            page_name: 'blogs'
        })
    }catch{
        res.status(400).json({
            status:'fail',
            error
        })
    }
}

exports.getBlog = async (req,res) => {
   
    try{
        const blog = await Blog.findOne({slug:req.params.slug});

        res.status(201).render('blog',{
            blog,
            page_name: 'blogs'
        })
    }catch{
        res.status(400).json({
            status:'fail',
            
        })
    }
}



exports.deleteBlog = async (req, res) => {
    try {    
  
      const blog = await Blog.findOneAndRemove({slug:req.params.slug})
  
      req.flash("error", `${blog.name} başarıyla kaldırıldı.`);
  
      res.status(200).redirect('/blogs');
  
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };
