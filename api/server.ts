import Fastify, { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

import {
  createCheeseOpts,
  readCheeseOpts,
  deleteCheeseOpts,
  updateCheeseOpts,
} from "./docs";
import { CheeseStorageFormat, CheeseUpdate, Cheese } from "./types";
import { default as cheeses } from "./db.json";

const DATABASE = "db.json";
const PORT = 8080;
const server: FastifyInstance = Fastify({ logger: true });

server.register(require("fastify-cors"), {
  origin: "*",
  methods: ["POST", "DELETE", "PUT"],
});

server.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: { title: "Cheeseria API", version: "2" },
  },
});

server.get("/cheese", readCheeseOpts, async (request, reply) => {
  return { cheeses, status: 200 };
});

server.post<{ Body: Cheese }>(
  "/cheese",
  createCheeseOpts,
  async (request, reply) => {
    const { name, url, pricePerKilo, colour } = request.body;

    const id = uuidv4();
    const updatedCheeses = {
      ...cheeses,
      [id]: {
        name,
        url,
        pricePerKilo,
        colour,
      },
    };

    fs.writeFileSync(
      path.resolve(__dirname, DATABASE),
      JSON.stringify(updatedCheeses, null, 2)
    );

    return { id, status: 200 };
  }
);

server.put<{ Body: CheeseUpdate }>(
  "/cheese",
  updateCheeseOpts,
  async (request, reply) => {
    const { id, name, url, pricePerKilo, colour } = request.body;

    if (!id) return { status: 400, message: "Missing id" };
    const cheeseId = Object.keys(cheeses).find((cheeseId) => cheeseId === id);
    if (!cheeseId) return { status: 400, message: "Invalid id" };

    const updatedCheeses: CheeseStorageFormat = {
      ...cheeses,
      [id]: {
        name,
        url,
        pricePerKilo,
        colour,
      },
    };

    fs.writeFileSync(
      path.resolve(__dirname, DATABASE),
      JSON.stringify(updatedCheeses, null, 2)
    );

    return { status: 200 };
  }
);

server.delete<{ Body: { id: string } }>(
  "/cheese",
  deleteCheeseOpts,
  async (request, reply) => {
    const { id } = request.body;

    const updatedCheeses: CheeseStorageFormat = { ...cheeses };
    delete updatedCheeses[id];

    fs.writeFileSync(
      path.resolve(__dirname, DATABASE),
      JSON.stringify(updatedCheeses, null, 2)
    );

    return { status: 200 };
  }
);

(() => {
  try {
    server.listen(PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
