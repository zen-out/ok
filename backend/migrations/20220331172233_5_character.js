exports.up = function(knex) {
    return knex.schema.createTable("character", (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('background', 2000)
        table.string('background_effects', 2000)
        table.integer('listening').notNullable()
        table.integer('strength').notNullable()
        table.integer('dexterity').notNullable()
        table.integer('intelligence').notNullable()
        table.integer('concentration').notNullable()
        table.integer('charisma').notNullable()
        table.integer('hp')
        table.integer('stamina')
        table.integer('gold')
        table.integer('silver')
        table.integer('experience_points')
        table.integer('kills')
        table.string('image')
        table.integer("user_id").unsigned().references("users.id").onUpdate("CASCADE").onDelete("CASCADE")
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("character");
};