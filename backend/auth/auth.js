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
see.how("sam, are you in love with me still?")
see.how("im very happy with my boyfriend")
see.step("and i am eating healthier meals")
see.step("and acting less crazy")
see.problem("i was so insecure")
see.should("i want to be serious with cyrus, i miss you as a friend")
see.problem("a lot of people like me")
see.should("be nice and amicable")
see.is("youre an asshole if you think being nice is good")
see.how("be an asshole")
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
            if (user.length == 0) {
                return done(new Error('User Not Found'), null)
            } else {
                return done(null, user)
            }
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