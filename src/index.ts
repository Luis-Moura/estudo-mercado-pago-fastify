import * as dotenv from "dotenv";
import Fastify from "fastify";
import fastifyRawBody from "fastify-raw-body";
import { MercadoPagoConfig } from "mercadopago";
import { createPrefence } from "./integracao-mercado-pago";
import { Item } from "./item";

dotenv.config();

const port = process.env.PORT;

const webhookSecret = process.env.MP_WEBHOOK_SECRET;

if (!port) {
	throw new Error("PORT is not defined in environment variables");
}

if (!webhookSecret) {
	throw new Error("MP_WEBHOOK_SECRET is not defined in environment variables");
}

const accessToken = process.env.MP_ACCESS_TOKEN;

if (!accessToken) {
	throw new Error("MP_ACCESS_TOKEN is not defined in environment variables");
}

const client = new MercadoPagoConfig({
	accessToken,
});

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

app.get("/pagamento-aprovado", async (request, reply) => {
	return reply.send("Pagamento aprovado com sucesso!");
});

app.listen(
	{ port: parseInt(port) || 3000, host: "0.0.0.0" },
	(err, address) => {
		if (err) throw err;
		console.log(`🚀 Server listening on ${address}`);
	}
);
