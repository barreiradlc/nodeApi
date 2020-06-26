exports.createPostValidator = (req, res, next) => {
    req.check("title", "Titulo é obrigatório").notEmpty();
    req.check("title", "O titulo precisa ter no minimo 4 caracteres e no máximo 28").isLength({
        min: 4,
        max:28
    });
    
    req.check("body", "Corpo é obrigatório").notEmpty();
    req.check("body", "O titulo precisa ter no minimo 4 caracteres e no máximo 200").isLength({
        min: 4,
        max:200
    });

    const errors = req.validationErrors()

    if(errors){
        // const firstError = errors.map((  error ) => error.msg)[0]
        return res.status(400).json(errors)
    }

    next()
}   


exports.userSignupValidator = ( req, res, next ) => {

    req.check("name", "Nome é obrigatório").notEmpty()
    
    req.check("email", "Email precisa ter de 3 até 23 caracteres")
    .matches(/.+\@.+\..+/)
    .withMessage("Email inválido")
    .isLength({
        min: 3,
        max: 23
    })
    
    req.check("password", "Senha é um campo obrigatório").notEmpty()
    req.check("password")
        .isLength({min:4})
        .withMessage("Senha deve ter pelo menos 5 caracteres")
        .matches(/\d/)
        .withMessage("Senha deve conter numeros")

        const errors = req.validationErrors()

    if(errors){
        // const firstError = errors.map((  error ) => error.msg)[0]
        return res.status(400).json({error: [errors] })
    }

    next()
    
}