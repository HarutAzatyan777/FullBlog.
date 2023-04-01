import { body } from 'express-validator'

export const loginValidation  = [

    body('email',"invalid email").isEmail(),
    body('password',"password must be at least 5 characters long").isLength({min:5})
];

export const registerValidation  = [

    body('email',"invalid email").isEmail(),
    body('password',"password must be at least 5 characters long").isLength({min:5}),
    body('fullName',"Name").isLength({min:3}),
    body('avatarUrl',"wrong avatar link").optional().isURL(),
];

export const postCreateValidation = [
    body('title').isLength({ min: 3 }).withMessage('Please enter a title for the article.'),
    body('text').isLength({ min: 3 }).withMessage('Please enter the text of the article.'),
    body('tags').optional().isArray().withMessage('Invalid tag format. Please specify an array.'),
    body('imageUrl').optional().isURL().withMessage('Invalid image link.'),
  ];
  