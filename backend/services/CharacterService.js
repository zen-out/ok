const { see } = require("code_clarity")
const make_legit = require("make_legit")
const ef = require("effective_knex")
const knex = require("knex")({
    client: "postgresql",
    connection: {
        database: "i_miss_dnd",
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

see.problem("didnt understand")
see.should("handle with care")
see.is("need to take it step by step")
see.problem("music is distracting")
see.should("be focused didn't you have that study playlist, it had no lyrics though")
see.is("its hard for anyone to focus on anything for more than like 2 hours dude, relax. u just lose your focus when you code too much. save from for people you love and care about. like, maybe just code on less mg and take more breaks.")
let newCharacter = new CharacterService(knex)
async function testCharacter() {
    // let take_it_slow = await newCharacter.createCharacter(1, {
    //     name: "audrey",
    //     background: "born with silver spoon, been to over 50 countries, think people are stronger than they actually are, brother had mental health issues, perhaps will move to Copenhagen and join software engineering culture there, still growing, wants to be the best, is very sorry, can take it too far, brother won senioritis award, parents were in sales, insecure, needs to have less guy friends, mom is cold but practical, dad is warm and perfect, deeply believes divorce will not occur, selfish with what she believes she needs, which is a lot. needs calm. great with children and animals.",
    //     background_effects: "needs a lot of reassurance, needs community, needs others, needs to stay focused on building her team, clarify mission, needs to stay calm, needs to stay true, had many mentors, loves reading, loveable, selfish with own time, heartbreaker",
    //     image: "https://dl.dropbox.com/s/ga8r0s824cdf75z/cyrus.png",
    //     humour: 100, // inherited 
    //     healthy_childhood: 95, // inherited
    //     strength: 100, // trained
    //     confidence: 100, // nurtured
    //     listening: 65, // need to train 
    //     dexterity: 100, // skills
    //     intelligence: 87, // normal
    //     concentration: 85, // natural
    //     charisma: 100, // inherited
    //     hp: 100, // trained
    //     stamina: 100, // inherited
    //     gold: 100, // inherited
    //     silver: 100, // inherited
    //     kills: 35
    // })
    see.should("created")
        // see.is(take_it_slow)

    let do_everything = await newCharacter.getCharacters(1)
    see.should("Return character")
    console.log(do_everything)
        // let update_character = await newCharacter.updateCharacter(2, 7, memory)
        // console.log("🚀 ~ file: CharacterService.js ~ line 100 ~ testCharacter ~ update_character", update_character)
}
// testCharacter()
module.exports = CharacterService