import Fastify from "fastify";
import fastifyRawBody from "fastify-raw-body";
import { envConfig } from "./env-config";
import { createPrefence } from "./integracao-mercado-pago";
import { Item } from "./item";

const app = Fastify();

app.register(fastifyRawBody, {
	field: "rawBody",
	global: false,
	encoding: "utf8",
	runFirst: true,
});

app.post("/create_preference", async (request, reply) => {
	const { items } = request.body as { items: Item[] };

	const response = await createPrefence(items);

	return reply.send(response);
});

app.post("/webhook", async (request, reply) => {
	console.log("Webhook recebido!");
	console.log("Headers:", request.headers);
	console.log("Body:", request.body);

	return reply.status(200).send("OK");
});

app.listen(
	{ port: parseInt(envConfig.port!) || 3000, host: "0.0.0.0" },
	(err, address) => {
		if (err) throw err;
		console.log(`🚀 Server listening on ${address}`);
	}
);
