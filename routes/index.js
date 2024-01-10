let express = require('express');
let router = express.Router();
let admincontroller=require("../controller/admin")
let usercontroller=require("../controller/user")
let adminmiddlewar=require("../middleware/admin")
let usermiddlewar=require("../middleware/user")
const multer  = require('multer')
let servicecontroller=require('../controller/service')
let categorycontroller=require('../controller/category')


/* GET home page. */


// multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


// adminside
router.post('/admin/signup',admincontroller.adminsign);
router.post('/admin/login',admincontroller.adminlogin);
router.delete('/admin/userdelete',admincontroller.userdelete);    

// userside

router.post('/user/signup',usercontroller.usersign);
router.post('/user/login',usercontroller.userlogin);
router.get('/user/all',usercontroller.alluser);  

// category
router.get('/category/all',adminmiddlewar.adminmiddleware,categorycontroller.allcategory);  
router.post('/category/add',adminmiddlewar.adminmiddleware,upload.single('image'),categorycontroller.addcategory);  
router.put('/category/update',adminmiddlewar.adminmiddleware,upload.single('image'),categorycontroller.updatecategory);  
router.delete('/category/delete',adminmiddlewar.adminmiddleware,categorycontroller.deletecategory);


// service      
router.get('/service/all',servicecontroller.allservice);  
router.get('/service/userall',usermiddlewar.usermiddleware,servicecontroller.userallservice);  
router.get('/service/:id',servicecontroller.singleservice);  
router.post('/service/add',usermiddlewar.usermiddleware,upload.single('image'),servicecontroller.addservice);  
router.put('/service/update',usermiddlewar.usermiddleware,upload.single('image'),servicecontroller.updateservice);  
router.delete('/service/:id',usermiddlewar.usermiddleware,servicecontroller.deleteservice);




module.exports = router;
