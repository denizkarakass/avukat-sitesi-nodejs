const Calisma = require('../models/Calisma');
const User = require('../models/User');


exports.createCalisma = async (req,res) => {
    const calisma = await Calisma.create(req.body);
   
    try{
        res.status(201).redirect('/calismas')
    }catch{
        res.status(400).json({
            status:'fail',
            error
        })
    }
}

exports.getAllCalismas = async (req,res) => {
   
    try{
        const calismas = await Calisma.find();
        const user = await User.findOne({_id:req.session.userID})

        res.status(201).render('calismas',{
            calismas,
            user,
            page_name: 'calismas'
        })
    }catch{
        res.status(400).json({
            status:'fail',
            error
        })
    }
}

exports.getCalisma = async (req,res) => {
   
    try{
        const calisma = await Calisma.findOne({slug:req.params.slug});

        res.status(201).render('calisma',{
            calisma,
            page_name: 'calismas'
        })
    }catch{
        res.status(400).json({
            status:'fail',
            
        })
    }
}


exports.deleteCalisma = async (req, res) => {
    try {    
  
      const blog = await Calisma.findOneAndRemove({slug:req.params.slug})
  
      req.flash("error", `${blog.name} başarıyla kaldırıldı.`);
  
      res.status(200).redirect('/calismas');
  
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };