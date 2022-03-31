const passport = require('passport')
const passportJWT = require('passport-jwt')
const { see } = require("code_clarity")

const config = {
    jwtSecret: "all_my_secrets",
    jwtSession: {
        session: false
    }
}

see.problem("how is sam doing this")
see.should("be more straightforward")
see.is("its really hard")
see.how("im very happy with my boyfriend")
see.step("and i am eating healthier meals")
see.step("and acting less crazy")
see.problem("i was so insecure")
see.problem("a lot of people fucking hate me")
see.should("should not return to a place you are not welcome")
see.is("clean it up.")
see.how("be yourself.")
const ExtractJwt = passportJWT.ExtractJwt

module.exports = knex => {
    const strategy = new passportJWT.Strategy({
            secretOrKey: config.jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async(payload, done) => {

            let user = await knex
                .select('*')
                .from('users')
                .where({ id: payload.id })
            see.motherlode(user)
            return done(null, { id: 7, name: "new_character" })
        }
    )

    passport.use(strategy)

    return {
        initialize: function() {
            return passport.initialize()
        },
        authenticate: function() {
            return passport.authenticate('jwt', config.jwtSession)
        }
    }
}