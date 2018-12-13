

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      // update admin users for the chat
      async function(context) {
        if ("undefined" !== typeof context.data.admins) {
          // get the data we want to add to the join table
          const admins = context.data.admins;
          // remove the admins property from the data
          delete context.data.admins;
          // get the knex db client
          const knex = context.app.get('knexClient');
          // create the raw queries to modify admins
          // first, get rid of ALL admins for this chat
          await knex.raw(
            `DELETE FROM admins WHERE chat_id = ${context.id};`
          );
          // second, add back all of the indiviual users passed
          // in as admins for this chat
          admins.forEach(async admin => {
            await knex.raw(
              `INSERT INTO admins (chat_id, user_id) ` +
              `VALUES (${context.id}, ${admin});`
            );
          });
        }
        return context;
      }
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [
      // get all admins related to this chat
      async function(context) {
        // write our sql
        const sql = `SELECT u.id, u.username
                     FROM   admins a, users u
                     WHERE  a.user_id = u.id AND
                            a.chat_id = ?`;
        // get the db client (Express global)
        const knex = context.app.get('knexClient');
        // run our query
        const result = await knex.raw(sql, [context.id]);
        // add our results to the previous result
        context.result['admins'] = result;
        return context;
      }
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
