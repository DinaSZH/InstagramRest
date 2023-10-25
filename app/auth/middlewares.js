const User = require("./User");

const validateSignup = async (req, res, next)=>{
    let errors = {}

    if(!req.body.email || req.body.email.length === 0) {
        errors.email = "Поле email обязательное";
    }

    if(!req.body.username || req.body.username.length === 0) {
        errors.full_name = "Поле Имя пользователя обязательное";
    }

    if(!req.body.password || req.body.password.length === 0) {
        errors.password = "Поле Пароль обязательное";
    }

    // if(!req.body.password2 || req.body.password2.length === 0) {
    //     errors.password2 = "Поле Подтвердить пароль обязательное";
    // }

    // if(req.body.password !== req.body.password2) {
    //     errors.password2 = "Пароли не совпадают";
    // }

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if(user) {
        errors.email = "Пользователь с таким email уже зарегестрирован";
    }
    if(JSON.stringify(errors) !== JSON.stringify({})) res.status(400).send(errors)
    else next()

}

module.exports = {
    validateSignup
}