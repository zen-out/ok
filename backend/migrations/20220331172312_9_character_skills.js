exports.up = function(knex) {
    return knex.schema.createTable("character_skills", (table) => {
        table.increments('id').primary()
        table.integer('skill_level')
        table.integer('character_id')
        table.foreign('character_id').references('character.id')
        table.integer('skills_id')
        table.foreign('skills_id').references('skills.id')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("character_skills");
};