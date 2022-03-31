const { see } = require("code_clarity")
    // signup
    // login
    // google signup / facebook

const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt')


const config = {
    jwtSecret: "all_my_secrets",
    jwtSession: {
        session: false
    }
}

const knex = require("knex")({
    client: "postgresql",
    connection: {
        database: "i_miss_dnd",
        user: "postgres",
        password: "postgres",
    }
})

class AuthService {
    constructor(knex, jwt, config) {
        this.knex = knex
        this.jwt = jwt
        this.config = config
    }

    async loginUser(email, password) {
        const user = await this.knex
            .select('*')
            .from('users')
            .where({ email: email })
            .then(data => data[0])
        see.should("come back perfect")
        see.is(user)
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                id: user.id
            }

            const token = this.jwt.sign(payload, this.config.jwtSecret)
            return token
        } else {
            throw new Error('Credentials didnt match')
        }
    }

    async checkUser(email) {
            const user = await this.knex
                .select('*')
                .from('users')
                .where({ email: email })
                .then(data => data[0])

            console.log(user)

            if (user !== undefined) {
                return true;
            } else {
                return false;
            }
        }
        /**
         * @example
         * Returns token
         * @author github.com/zen-out
         */
    async makeUser(email, password, player) {
        let hashedPassword = await bcrypt.hash(password, 10)
        let user = {
            email,
            password: hashedPassword,
            gm: player,
            gmail_access: "wivina"
        }

        const userID = await this.knex('users')
            .insert(user)
            .returning('id')

        const payload = { id: userID[0].id }
        let token = this.jwt.sign(payload, this.config.jwtSecret)
        return token
    }
}

// let be_real = new AuthService(knex, jwt, config)
async function test() {
    let new_user_7 = await be_real.makeUser("cyrus@gmail.com", "try_my_best", true)
    console.log(new_user_7)
    let boyfriend_can_be_bestfriend = await be_real.checkUser("cyrus@gmail.com")
    see.should("get boyfriend back")
    see.is(boyfriend_can_be_bestfriend)
    let only_you = await be_real.loginUser("cyrus@gmail.com", "try_my_best")
    console.log(only_you)
}
// test()
module.exports = AuthService