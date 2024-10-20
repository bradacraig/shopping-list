exports.up = function (knex) {
  // Return the promise from knex.schema.createTable
  return knex.schema.createTable('items', function (table) {
    table.increments('id').primary() // Auto-incrementing ID
    table.string('name').notNullable() // Name of the item
    table.integer('quantity').notNullable().defaultTo(1) // Quantity of the item
    table.float('price').notNullable() // Price of the item
    table.timestamps(true, true) // Created_at and updated_at timestamps
  })
}

exports.down = function (knex) {
  // Return the promise from knex.schema.dropTable
  return knex.schema.dropTable('items') // Rollback logic: drop the table
}
