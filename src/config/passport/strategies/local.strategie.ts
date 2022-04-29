import { Strategy } from 'passport-local'
import passport from 'passport'
import {  UserService } from '../../../routes/user/user.service'
import { compareSync } from 'bcryptjs'

passport.use('login', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, pass, done) => {
    try {
        let user = await UserService.one({email}, true)
        if(!user) return done(null, false, { message: 'User not exists' }) 
        if(!compareSync(pass, user.password)) return done(null, false, { message:'User or password incorrect'}) 
        let { password, ...rest } = user
        return done(null,rest)
    } catch (e) {
        return done(e)
    }
}))
