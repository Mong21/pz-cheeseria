import { RouteShorthandOptions } from "fastify";

const createCheeseOpts: RouteShorthandOptions = {
  schema: {
    description:
      "Create a new cheese which takes in a name, url, price per kilo and colour.",
    response: {
      200: {
        type: "object",
        properties: {
          cheeses: {
            type: "object",
            properties: {
              id: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  status: { type: "number" },
                },
              },
            },
          },
          status: {
            type: "number",
          },
        },
      },
    },
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        url: { type: "string" },
        pricePerKilo: { type: "number" },
        colour: { type: "string" },
      },
    },
  },
};

const readCheeseOpts: RouteShorthandOptions = {
  schema: {
    description: "Get a list of cheese.",
    response: {
      200: {
        type: "object",
        properties: {
          cheeses: {
            type: "object",
            patternProperties: {
              "^.*$": {
                type: "object",
                properties: {
                  name: { type: "string" },
                  url: { type: "string" },
                  pricePerKilo: { type: "number" },
                  colour: { type: "string" },
                },
              },
            },
          },
          status: {
            type: "number",
          },
        },
        require: ["status"],
      },
    },
  },
};

const updateCheeseOpts: RouteShorthandOptions = {
  schema: {
    description: "Update the details of a cheese.",
    response: {
      200: {
        type: "object",
        properties: {
          status: {
            type: "number",
          },
          message: {
            type: "string",
          },
        },
      },
    },
    body: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        url: { type: "string" },
        pricePerKilo: { type: "number" },
        colour: { type: "string" },
      },
    },
  },
};

const deleteCheeseOpts: RouteShorthandOptions = {
  schema: {
    description: "Delete a cheese given an id.",
    response: {
      200: {
        type: "object",
        properties: {
          status: {
            type: "number",
          },
        },
      },
    },
    body: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
  },
};

export { createCheeseOpts, readCheeseOpts, deleteCheeseOpts, updateCheeseOpts };
