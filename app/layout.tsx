"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider, locale, addLocale } from "primereact/api";
import { LayoutProvider } from "../layout/context/layoutcontext";
import React, { useState, useEffect } from "react";

import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";
import LoaderBar from "./(main)/components/common/components/loaderBar";
import { Toaster } from "sonner";

addLocale("es", {
	startsWith: "Empieza con",
	contains: "Contiene",
	notContains: "No contiene",
	endsWith: "Termina con",
	equals: "Igual a",
	notEquals: "Distinto de",
	noFilter: "Sin filtro",
	filter: "Filtrar",
	lt: "Menor que",
	lte: "Menor o igual que",
	gt: "Mayor que",
	gte: "Mayor o igual que",
	dateIs: "Fecha igual",
	dateIsNot: "Fecha distinta",
	dateBefore: "Antes de",
	dateAfter: "Después de",
	clear: "Limpiar",
	apply: "Aplicar",
	matchAll: "Coincidir todo",
	matchAny: "Coincidir cualquiera",
	addRule: "Agregar regla",
	removeRule: "Eliminar regla",
	accept: "Sí",
	reject: "No",
	// choose: "Elegir",
	upload: "Subir",
	cancel: "Cancelar",
});
locale("es");

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	const [queryClient] = useState(() => new QueryClient());

	useEffect(() => {
		// Create theme-css element if it doesn't exist
		if (!document.getElementById('theme-css')) {
			const themeLink = document.createElement('link');
			themeLink.id = 'theme-css';
			themeLink.rel = 'stylesheet';
			themeLink.href = '/themes/lara-light-indigo/theme.css';
			document.head.appendChild(themeLink);
		}
	}, []);

	return (
		<html lang="es" suppressHydrationWarning>
			<head>
				<link id="theme-css" rel="stylesheet" href="/themes/lara-light-indigo/theme.css" />
			</head>
			<body>
				<LoaderBar />
				<Toaster position="top-right" />

				<QueryClientProvider client={queryClient}>
					<PrimeReactProvider value={{ ripple: true, unstyled: false }}>
						<LayoutProvider>{children}</LayoutProvider>
					</PrimeReactProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
