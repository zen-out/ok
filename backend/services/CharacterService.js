const { see } = require("code_clarity")
const make_legit = require("make_legit")
    // hey boss check out my module
const ef = require("effective_knex")
const knex = require("knex")({
    client: "postgresql",
    connection: {
        database: "dnd",
        user: "postgres",
        password: "postgres",
    }
})


class CharacterService {
    constructor(knex) {
        this.knex = knex
    }

    async getCharacters(userID) {
        const characters = await this.knex('character')
            .select('*')
            .where({ user_id: userID })
        return characters
    }

    async createCharacter(userID, object) {
        object["user_id"] = userID;
        let get_user = await ef.post(knex, "character", object)
        return get_user
    }

    async updateCharacter(userID, characterID, object) {
        object["user_id"] = userID
        object["id"] = characterID
        let get_update = await ef.update(knex, "character", characterID, object)
        see.should("update")
        see.is(get_update)
        return get_update;
    }

    async getSkills() {
        const skills = await this.knex('skills').select('*')
        return skills
    }

    async getCurrentSkills(characterId, userId) {
        const skills = await this.knex('character_skills')
            .select('*')
            .where({ character_id: characterId })
            .orderBy('skills_id')


        return skills
    }


    async update(character_id, object) {
        object["user_id"] = userID
        object["id"] = character_id
        let get_update = await ef.update(knex, "character", character_id, object)
        see.should("update")
        see.is(get_update)
        return get_update;
    }

}

see.problem("didnt slow down")
see.should("handle with care")
see.is("need to take it step by step")
see.problem("fixing things that arent problems")
see.should("pretend you never saw it.")
let newCharacter = new CharacterService(knex)
async function testCharacter() {
    // let take_it_slow = await newCharacter.createCharacter(1, {
    //     name: "audrey",
    //     background: "born with silver spoon, been to over 50 countries, think people are stronger than they actually are, brother had mental health issues, parents are best salespeople in the world, live on the , brother won senioritis award, parents were in sales, needs to have less guy friends, mom is cold but practical, dad is warm and perfect, deeply believes divorce will not occur, selfish with what she believes she needs, which is a lot. needs calm. great with children and animals.",
    //     background_effects: "needs a lot of reassurance, needs community, needs others, needs to stay focused on building her team, clarify mission, needs to stay calm,  loves reading, wary of closeness",
    //     image: "https://dl.dropbox.com/s/ga8r0s824cdf75z/cyrus.png",
    //     humour: 100, // inherited 
    //     healthy_childhood: 95, // inherited
    //     strength: 100, // trained
    //     confidence: 100, // nurtured
    //     listening: 65, // need to train 
    //     dexterity: 100, // skills
    //     intelligence: 87, // normal
    //     concentration: 85, // natural
    //     charisma: 60, // need to train
    //     hp: 100, // trained
    //     stamina: 100, // inherited
    //     gold: 100, // inherited
    //     silver: 100, // inherited
    //     kills: 9999999 // inherited
    // })
    see.should("created")
        // see.is(take_it_slow)

    let do_everything = await newCharacter.getCharacters(1)
    see.should("Return character")
    console.log(do_everything)
}
testCharacter()
module.exports = CharacterService