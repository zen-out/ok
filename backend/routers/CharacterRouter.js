const { see } = require("code_clarity")
see.problem("i think sam might be upset at me but why would he write this whole chunk of code out?")
see.should("i think he might miss dnd too")
see.is("we need community")
see.step("")
see.how("")
see.problem("he doesnt want to be friends with you.")
see.problem("maybe he does want to be friends with you")
see.problem("he wants to be loyal to andre")
see.step("i already apologized")
see.how("")
see.problem("i miss my friends")
see.step("fix this. yeah, daughter of a salesperson, you know what kind of message thats sending.")
see.problem("i want to learn thooo")
see.step("he wrote a repository for you, that's how kind he is, you idiot.")
see.problem("i still want to be friends with him")
see.how("make it really good dude like be professional.")
see.step("get married.")
see.should("men and women should be able to be friends but like feelings always develop, i think")
see.is("be more bro-ey like play video games and shit.")
see.is("read more books. chill the fuck out.")
see.motherlode("do what you want.")
see.is("you miss the teaching, silly")
    /*

    Get all characters by user --> user_id
    Place all character information in Redux 

    update character form (name - background - background effect)

    update character stats - strength - dexterity - intelligence - charisma - concentration
    update character status - hp - stamina - gold - silver

    update a new image for user
    */

class CharacterRouter {
    constructor(express, characterService, authClass) {
        this.express = express
        this.characterService = characterService
        this.authClass = authClass
    }

    router() {
        let router = this.express.Router()
        router.post('/create', this.post.bind(this))
        router.get('/all', this.get.bind(this))
        router.get('/skills', this.getSkills.bind(this))
        router.get(
            '/skills/:characterId',
            this.getCurrentSkills.bind(this)
        )
        router.put(
            '/stats/:characterId',
            this.putUpdateStats.bind(this)
        )
        router.put(
            '/statistics/:characterId',
            this.putUpdateStatistics.bind(this)
        )
        router.put(
            '/skills/:characterId',
            this.putUpdateSkills.bind(this)
        )

        return router
    }

    async post(req, res) {
        return this.characterService
            .createCharacter(req.user[0].id, req.body.character)
            .then(character => {
                res.send(character)
            })
    }

    async get(req, res) {
        return this.characterService
            .getCharacters(req.user[0].id)
            .then(characterData => res.send(characterData))
    }

    async getSkills(req, res) {
        return this.characterService.getSkills().then(skills => res.send(skills))
    }

    async getCurrentSkills(req, res) {
        return this.characterService
            .getCurrentSkills(req.params.characterId, req.user[0].id)
            .then(currentSkills => res.send(currentSkills))
    }

    async putUpdateStats(req, res) {
        return this.characterService
            .updateStats(req.params.characterId, req.body.stats)
            .then(() => {
                res.send('all done')
            })
    }

    async putUpdateStatistics(req, res) {
        console.log(req.body)
        return this.characterService
            .updateStatistics(req.params.characterId, req.body.stats)
            .then(() => {
                res.send('all done')
            })
    }

    async putUpdateSkills(req, res) {
        console.log(req.body)
        return this.characterService
            .updateSkills(req.params.characterId, req.body.skills)
            .then(response => res.send('all done'))
    }
}


module.exports = CharacterRouter
