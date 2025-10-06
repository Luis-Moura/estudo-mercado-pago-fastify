import { MercadoPagoConfig, Preference } from "mercadopago";
import { envConfig } from "./env-config";
import { Item } from "./item";

const client = new MercadoPagoConfig({
	accessToken: envConfig.mp_access_token!,
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
				back_urls: {
					success: "http://localhost:3000/success",
					failure: "http://localhost:3000/failure",
					pending: "http://localhost:3000/pending",
				},
				auto_return: "approved",
			},
		});

		return { preferenceId: data.id, initPoint: data.init_point };
	} catch (error) {
		console.error(error);
		throw new Error("Erro ao criar preferência");
	}
};
