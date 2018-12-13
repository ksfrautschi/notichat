

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [
      // get all chats for which this user is an admin
      async function(context) {
        // write our sql
        const sql = `SELECT c.id, c.name
                     FROM   admins a, chats c
                     WHERE  a.user_id = c.id AND
                            a.user_id = ?`;
        // get the db client (Express global)
        const knex = context.app.get('knexClient');
        // run our query
        const result = await knex.raw(sql, [context.id]);
        // add our results to the previous result
        context.result['admins'] = result;
        return context;
      }//,
      // // get all chats for which this user is a participant
      // async function(context) {
      //   // write our sql
      //   const sql = `SELECT c.id, c.name
      //                FROM   admins a, chats c
      //                WHERE  a.user_id = c.id AND
      //                       a.user_id = ?`;
      //   // get the db client (Express global)
      //   const knex = context.app.get('knexClient');
      //   // run our query
      //   const result = await knex.raw(sql, [context.id]);
      //   // add our results to the previous result
      //   context.result['admins'] = result;
      //   return context;
      // }
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
