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
					success: `${envConfig.base_url}/success`,
					failure: `${envConfig.base_url}/failure`,
					pending: `${envConfig.base_url}/pending`,
				},
				auto_return: "approved",
				notification_url: `${envConfig.base_url}/webhook`,
			},
		});

		return { preferenceId: data.id, initPoint: data.init_point };
	} catch (error) {
		console.error(error);
		throw new Error("Erro ao criar preferência");
	}
};
