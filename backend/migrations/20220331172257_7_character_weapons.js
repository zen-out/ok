exports.up = function(knex) {
    return knex.schema.createTable("character_weapons", (table) => {
        table.increments('id').primary()
        table.integer('ammunition')
        table.integer('character_id').unsigned()
        table.foreign('character_id').references('character.id')
        table.integer('weapon_id').unsigned()
        table.foreign('weapon_id').references('weapons.id')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("character_weapons");
};