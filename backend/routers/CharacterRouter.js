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
        router.post('/create', this.authClass.authenticate(), this.post.bind(this))
        router.get('/all', this.authClass.authenticate(), this.get.bind(this))
        router.get('/skills', this.getSkills.bind(this))
        router.get(
            '/skills/:characterId',
            this.authClass.authenticate(),
            this.getCurrentSkills.bind(this)
        )
        router.put(
            '/stats/:characterId',
            this.authClass.authenticate(),
            this.putUpdateStats.bind(this)
        )
        router.put(
            '/statistics/:characterId',
            this.authClass.authenticate(),
            this.putUpdateStatistics.bind(this)
        )
        router.put(
            '/skills/:characterId',
            this.authClass.authenticate(),
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