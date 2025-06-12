import "dotenv/config";

export const siteConfig = {
	TITLE: "Bariven",
	ROUTER: {
		SIGN_IN: {
			TITLE: "Iniciar sesión",
		},
		RECOVER_PASSWORD: {
			TITLE: "Recuperar contraseña",
		},
	},
};

export const APP_CONFIG = {
	VERSION: "1.0.0",
	ENV: {
		IS_PRODUCTION: process?.env?.NEXT_PUBLIC_ENV === "prod",
		API_URL: process?.env?.NEXT_PUBLIC_API_URL,
	},
	LOCALE_ENVS: {
		API_URL: process?.env?.NEXT_PUBLIC_API_URL,
		SELF_URL: process?.env?.NEXT_PUBLIC_FRONT_URL,
	},
	IS_ACTIVE: {
		true: { label: "Activo", value: true },
		false: { label: "Bloqueado", value: false },
	},
};
