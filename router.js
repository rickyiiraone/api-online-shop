const Joi = require("@hapi/joi");

exports.plugin = {
  pkg: require("./package.json"),
  register: async (server, options) => {
    server.route({
      method: "GET",
      path: "/",
      handler: (request, h) => {
        return h.response({
          status: 200,
          message: "Welcome in my app",
          data: [],
        });
      },
    });

    server.route({
      method: "POST",
      path: "/products",
      handler: (request, h) => {
        const payload = request.payload;
        const product = {
          name: payload.name,
          price: payload.price,
        };
        return h
          .response({ status: 201, message: "data has created", data: product })
          .code(201);
      },
      options: {
        auth: false,
        validate: {
          payload: Joi.object({
            name: Joi.string().required().min(10).max(100),
            price: Joi.number().required(),
          }),
          options: {
            allowUnknown: true,
          },
        },
      },
    });
  },
};
