
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('room', (table) => {
      table.timestamps(true, true);
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('room', (table) => {
      table.dropColumn('created_at');
      table.dropColumn('updated_at');
    }),
  ]);
};
