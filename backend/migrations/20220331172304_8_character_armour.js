exports.up = function(knex) {
    return knex.schema.createTable("character_armour", (table) => {
        table.increments('id').primary()
        table.integer('character_id')
        table.foreign('character_id').references('character.id')
        table.integer('armour_id')
        table.foreign('armour_id').references('armour.id')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("character_armour");
};