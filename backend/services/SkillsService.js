// get skill descriptions
// character id

const knex = require("knex")({
    client: "postgresql",
    connection: {
        database: "i_miss_dnd",
        user: "postgres",
        password: "postgres",
    }
})
class CharacterSkills {
    constructor(knex) {
        this.knex = knex
    }

    async createCharacterSkills(characterID, characterSkills) {
        let idArray = characterSkills.map((skill) => {
            await this.knex
                .insert({
                    skills_id: skill.skillID,
                    skill_level: skill.skillLevel,
                    character_id: characterID
                })
                .into('character_skills')
                .returning('id')
        });
        return idArray

    }

    async updateCharacterSkill(characterID, characterSkill) {

        const skill = {
            skills_id: characterSkill.id,
            skill_level: characterSkill.level,
            character_id: characterID
        }
        const id = await this.knex.insert({ skill }).into('character_skills').returning('id')
        return id
    }



}
module.exports = CharacterSkills

let skillz = new CharacterSkills(knex)

async function how_do_we_motivate_test() {
    let audrey_skill_one = await skillz.createCharacterSkills(1, ["self_control", "nurture", "conservative", "diplomacy", "cooking", "simplicity", "openmindedness", "host", "teach", "reassure", "support", "mentor"]);
    let audrey_skill_two = await skillz.createCharacterSkills(1, ["tests", "readme", "trust in your own experiences", "git commit messages (huskey)", "publishing", "simplicity", "happy family happy life", "friends on saturday", "teach", "stop having guy friends", "think about what cyrus needs", "get more massages"]);
}

how_do_we_motivate_test()