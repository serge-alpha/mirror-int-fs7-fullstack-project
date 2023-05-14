const {body,validationResult}=require('express-validator');

const registerUserValidator=[
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({min:3,max:33}),
    body('email')
    .isEmail()
    .withMessage('Invalid Email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isLength({min:3,max:33}),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({min:6})
    .withMessage('Password must be min 6 characters'),
]

const createBookValidator=[
    body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({min:3,max:33}),
    body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({min:25})
    .withMessage('Description must be a min of 25 Words'),
    body('isbn')
    .trim()
    .notEmpty()
    .withMessage('ISBN is required'),
    body('publisher')
    .trim()
    .notEmpty()
    .withMessage('Publisher name is required')
    .isLength({min:3,max:33}),
    body('publishedDate')
    .trim()
    .notEmpty()
    .withMessage('published Date is required')
    .isDate()
    .withMessage('Published Date is invalid')
]


const Validation= async(req,res,next)=>{
    try {
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(422).send({
                success:false,
                error:error.array()[0].msg
            })
        }
        return next()
    } catch (error) {
        return next(error)
    }
}


module.exports={createBookValidator,registerUserValidator,Validation}  