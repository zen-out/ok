exports.up = function(knex) {
    return knex.schema.createTable("character_skills", (table) => {
        table.increments('id').primary()
        table.integer('skill_level').unsigned()
        table.integer('character_id').unsigned()
        table.foreign('character_id').references('character.id')
        table.integer('skills_id').unsigned()
        table.foreign('skills_id').references('skills.id')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("character_skills");
};