exports.up = function(knex) {
    return knex.schema.createTable("character_inventory", (table) => {
        table.increments('id').primary()
        table.string('item').notNullable()
        table.integer('amount').notNullable()
        table.integer('character_id').unsigned()
        table.foreign('character_id').references('character.id')
        table.integer('item_id').unsigned()
        table.foreign('item_id').references('items.id')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("character_inventory");
};