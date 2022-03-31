/*
post login
post signup
post google/ facebook 

*/

class AuthRouter {
    constructor(express, axios, authService) {
        this.express = express
        this.axios = axios
        this.authService = authService
    }

    router() {
        let router = this.express.Router()

        router.post('/signup', this.postSignup.bind(this))
        router.post('/login', this.postLogin.bind(this))

        return router
    }

    async postLogin(req, res) {
        if (req.body.email && req.body.password) {
            try {
                let token = await this.authService.loginUser(
                    req.body.email,
                    req.body.password
                )
                res.json({ token })
            } catch (err) {
                if (err) {
                    console.log(err)
                    res.sendStatus(401)
                }
            }
        }
    }

    async postSignup(req, res) {
        if (req.body.email && req.body.password) {
            try {

                // #TODO: hard coded to true, change back later to see what sam is teaching
                let check = await this.authService.checkUser(
                    req.body.email,
                    req.body.password,
                    true
                )

                if (check) {
                    // create use and return token
                    // #TODO: hard coded to true, change back later to see what sam is teaching
                    let token = await this.authService.makeUser(
                        req.body.email,
                        req.body.password,
                        true
                    )
                    res.json({ token })
                } else {
                    res.sendStatus(402)
                }
            } catch (err) {
                if (err) {
                    console.log(err)
                    res.sendStatus(402)
                }
            }
        }
    }
}

module.exports = AuthRouter