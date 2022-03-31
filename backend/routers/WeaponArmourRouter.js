/*

Get all weapons & armour --> character id

Update weapon
update ammunition

Update armour
*/

const auth = require('../auth/auth')

class WeaponArmourRouter {
    constructor(express, weaponArmourService, authClass) {
        this.express = express
        this.weaponArmourService = weaponArmourService
        this.authClass = authClass
    }

    router() {
        let router = this.express.Router()
        router.get('/armoury', this.getAll.bind(this))
        router.get(
            '/armoury/:characterId',
            this.authClass.authenticate(),
            this.getCurrent.bind(this)
        )
        router.post(
            '/armoury/items/:characterId',
            this.authClass.authenticate(),
            this.postItems.bind(this)
        )
        router.put(
            '/armoury/items/:characterId',
            this.authClass.authenticate(),
            this.putItems.bind(this)
        )
        router.put(
            '/armoury/new/:characterId',
            this.authClass.authenticate(),
            this.putWeapons.bind(this)
        )
        return router
    }

    getAll(req, res) {
        console.log('Getting all')
        return this.weaponArmourService
            .getArmoury()
            .then(armoury => res.send(armoury))
    }

    getCurrent(req, res) {
        console.log('Getting current')
        return this.weaponArmourService
            .getCurrent(req.params.characterId, req.user[0].id)
            .then(current => {
                res.send(current)
            })
    }

    postItems(req, res) {
        console.log('posting')
        return this.weaponArmourService
            .setItems(req.params.characterId, req.user[0].id, req.body.items)
            .then(items => res.send(items))
    }

    putItems(req, res) {
        console.log('Putting')
        return this.weaponArmourService
            .deleteItems(req.params.characterId, req.user[0].id, req.body.items)
            .then(response => res.send(response))
    }

    putWeapons(req, res) {
        console.log('Putting')
        return this.weaponArmourService
            .newWeapons(req.params.characterId, req.user[0].id, req.body.weapons)
            .then(response => res.send(response))
    }
}

module.exports = WeaponArmourRouter