import * as dotenv from "dotenv";
dotenv.config();

export const envConfig = {
	mp_access_token: process.env.MP_ACCESS_TOKEN,
	port: process.env.PORT,
};

if (!envConfig.mp_access_token) {
	throw new Error("MP_ACCESS_TOKEN is not defined in environment variables");
}

if (!envConfig.port) {
	throw new Error("PORT is not defined in environment variables");
}
