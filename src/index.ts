import Fastify from "fastify";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { Item } from "./item";
import * as dotenv from "dotenv";
import { createPrefence } from "./integracao-mercado-pago";

dotenv.config();

const accessToken = process.env.MP_ACCESS_TOKEN;

if (!accessToken) {
	throw new Error("MP_ACCESS_TOKEN is not defined in environment variables");
}

const client = new MercadoPagoConfig({
	accessToken,
});

const app = Fastify();

app.post("/create_preference", async (request, reply) => {
	const { items } = request.body as { items: Item[] };

	const response = await createPrefence(items);

	return reply.send(response);
});

app.get("/pagamento-aprovado", async (request, reply) => {
	return reply.send("Pagamento aprovado com sucesso!");
});

app.listen({ port: 3000 }, (err, address) => {
	if (err) throw err;
	console.log(`🚀 Server listening on ${address}`);
});
