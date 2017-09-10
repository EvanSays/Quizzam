
exports.up = (knex) => {
  return knex.schema.createTable('room', (table) => {
    table.string('id', 4).primary();
    table.integer('quiz_id').unsigned();
    table.foreign('quiz_id').references('quiz.id');
  });
};

exports.down = (knex) => {
  knex.schema.dropTable('room');
};
