require('dotenv').config();
const fastifyPlugin = require('fastify-plugin');
const fastifyEnv = require('fastify-env');
const fastifyKnexjs = require('fastify-knexjs');

module.exports = fastifyPlugin((fastify, opts, next) => {
  fastify.register(fastifyEnv, {
    schema: {
      type: 'object',
      properties: {
        PG_HOST: {
          type: 'string'
        },
        PG_USER: {
          type: 'string'
        },
        PG_PASSWORD: {
          type: 'string'
        },
        PG_DATABASE: {
          type: 'string'
        },
        PG_PORT: {
          type: 'number'
        }
      }
    },
    confKey: 'pgconfig',
    data: opts
  });

  fastify.register(
    fastifyPlugin((fastify, opts, done) => {
      const {
        PG_HOST: host,
        PG_USER: user,
        PG_PASSWORD: password,
        PG_DATABASE: database,
        PG_PORT: port
      } = fastify.pgconfig;

      // const db = knex({
      //   client: 'pg',
      //   Example: connection: 'postgresql://postgres:hunter3@localhost/bigdata03',
      //   Example: connection: process.env.DB_CONNECTION,
      // });

      const pgConfig = {
        client: 'pg',
        connection: {
          host,
          user,
          password,
          database,
          port
        }
      };

      fastify.register(fastifyKnexjs, pgConfig);
      done();
    })
  );

  next();
});
