import { MercadoPagoConfig, Preference } from "mercadopago";
import * as dotenv from "dotenv";
import { Item } from "./item";

dotenv.config();

const accessToken = process.env.MP_ACCESS_TOKEN;

if (!accessToken) {
	throw new Error("MP_ACCESS_TOKEN is not defined in environment variables");
}

const client = new MercadoPagoConfig({
	accessToken,
});

const preference = new Preference(client);

export const createPrefence = async (items: Item[]) => {
	try {
		const normalizedItems = items.map((i) => ({
			id: i.id,
			title: i.title,
			quantity: i.quantity,
			unit_price: i.unit_price,
			currency_id: "BRL",
		}));

		const data = await preference.create({
			body: {
				items: normalizedItems,
			},
		});

		return { preferenceId: data.id, initPoint: data.init_point };
	} catch (error) {
		console.error(error);
		throw new Error("Erro ao criar preferência");
	}
};
