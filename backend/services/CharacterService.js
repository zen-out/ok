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

        console.log("returning an array of one here, why not object?", characters)
        return characters
    }

    async createCharacter(userID, object) {
        object["user_id"] = userID;
        let get_user = await ef.post(knex, "users", object)
        see.should("return character")
        see.is(get_user)
        return get_user
    }

    async updateCharacter(userID, characterID, object) {
        object["user_id"] = userID
        object["id"] = characterID
        let get_update = await ef.update(knex, "character", characterID, object)
        see.should("successfully update")
        see.is(get_update)
            // #TODO: create a list of skills that you care about 
        return get_update.id
    }

    async updateDescription(userID, characterID, object) {
        object["user_id"] = userID
        object["id"] = characterID
        let get_update = await ef.update(knex, "character", characterID, object)
        see.should("successfully update")
        see.is(get_update)
        return get_update.id
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

    async updateSkills(character_id, skills) {

        let sorry = await this.knex('character')
            .update({ experience_points: skills.experience })
            .where({ id: character_id })
        return sorry;

        // let swords_skills = {
        //     skills_id: 1,
        //     character_id: character_id,
        //     skill_level: skills.swordPlay
        // }

        // let bow_skills = {
        //     skills_id: 2,
        //     character_id: character_id,
        //     skill_level: skills.bowUse
        // }
        // let crossbow_skills = {
        //     skills_id: 3,
        //     character_id: character_id,
        //     skill_level: skills.crossbowProficency
        // }
        // let spear_skills = {
        //     skills_id: 4,
        //     character_id: character_id,
        //     skill_level: skills.spearPlay
        // }
        // let axe_skills = {
        //     skills_id: 5,
        //     character_id: character_id,
        //     skill_level: skills.axePlay
        // }
        // let shield_skills = {
        //     skills_id: 6,
        //     character_id: character_id,
        //     skill_level: skills.shieldPlay
        // }
        // let persuade_skills = {
        //     skills_id: 7,
        //     character_id: character_id,
        //     skill_level: skills.persuade
        // }
        // let intimidate_skills = {
        //     skills_id: 8,
        //     character_id: character_id,
        //     skill_level: skills.intimidate
        // }
        // let awareness_skills = {
        //     skills_id: 9,
        //     character_id: character_id,
        //     skill_level: skills.awareness
        // }
        // let search_skills = {
        //     skills_id: 10,
        //     character_id: character_id,
        //     skill_level: skills.search
        // }
        // let healing_skills = {
        //     skills_id: 11,
        //     character_id: character_id,
        //     skill_level: skills.healing
        // }
        // let craft_skills = {
        //     skills_id: 12,
        //     character_id: character_id,
        //     skill_level: skills.craft
        // }
        // let tactics_skills = {
        //     skills_id: 13,
        //     character_id: character_id,
        //     skill_level: skills.tactics
        // }
        // let hunt_skills = {
        //         skills_id: 14,
        //         character_id: character_id,
        //         skill_level: skills.hunt
        //     }
        //     // insert skills into skills table

        // let skillsArray = [
        //     swords_skills,
        //     bow_skills,
        //     crossbow_skills,
        //     spear_skills,
        //     axe_skills,
        //     shield_skills,
        //     persuade_skills,
        //     intimidate_skills,
        //     awareness_skills,
        //     search_skills,
        //     healing_skills,
        //     craft_skills,
        //     tactics_skills,
        //     hunt_skills
        // ]

        // skillsArray.forEach(async element => {
        //     await this.knex.insert(element).into('character_skills')
        // })


        // return 'all done'
    }

    async updateStats(character_id, object) {

        object["user_id"] = userID
        object["id"] = character_id
        let get_update = await ef.update(knex, "character", character_id, object)
        see.should("update")
        see.is(get_update)
        return get_update;
    }

    async updateStatistics(character_id, object) {

        object["user_id"] = userID
        object["id"] = character_id
        let get_update = await ef.update(knex, "character", character_id, object)
        see.should("update")
        see.is(get_update)
        return get_update;
    }
}

see.problem("didnt realize her boss loved her back")

let newCharacter = new CharacterService(knex)
async function testCharacter() {
    let take_it_slow = await newCharacter.createCharacter(1, {
        name: "audrey",
        background: "born with silver spoon, been to over 50 countries, think people are stronger than they actually are, brother had mental health issues,  needs more calm and encouragement, perhaps will move to Copenhagen and join software engineering culture there, still growing, wants to be the best, is very sorry, can take it too far, brother won senioritis award, parents were in sales, insecure, needs to have less guy friends, mom is cold but practical, dad is warm and perfect, deeply believes divorce will not occur",
        backgroundEffect: "needs others, needs to stay focused on building her team, clarify mission, needs to stay calm, needs to stay true, had many mentors, loves reading, loveable, a threat",
        image: "https://dl.dropbox.com/s/ga8r0s824cdf75z/cyrus.png",
        humour: 100, // inherited 
        healthy_childhood: 95, // inherited
        strength: 100, // trained
        confidence: 100, // nurtured
        listening: 65, // need to train 
        dexterity: 100, // skills
        intelligence: 87, // normal
        concentration: 85, // natural
        charisma: 100, // inherited
        hp: 100, // trained
        stamina: 100, // inherited
        gold: 100, // inherited
        silver: 100, // inherited
    })
    console.log(take_it_slow)
    let one_shot = await newCharacter.
}
testCharacter()
module.exports = CharacterService