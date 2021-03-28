export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments().primary();
    table.string('email').unique();
    table.string('name');
    table.string('password');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
}

export function down(knex) {
  return knex.schema.dropTable('users');
}
