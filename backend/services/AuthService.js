const { see } = require("code_clarity")
    // signup
    // login
    // google signup / facebook

const bcrypt = require('bcrypt')

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
            console.log('user taken')
        } else {
            return true
        }
    }

    async makeUser(email, password, player) {
        let hashedPassword = await bcrypt.hash(password, 10)
        let user = {
            email,
            password: hashedPassword,
            gm: player
        }

        const userID = await this.knex('users')
            .insert(user)
            .returning('id')

        const payload = { id: userID[0].id }

        let token = this.jwt.sign(payload, this.config.jwtSecret)

        return token
    }
}

let be_real = new AuthService()
async function test() {
    let new_user = await be_real.makeUser("lesley.yc@gmail.com", "cyrus", true)
}
test()
module.exports = AuthService