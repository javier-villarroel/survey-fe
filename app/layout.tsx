"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider, locale, addLocale } from "primereact/api";
import { LayoutProvider } from "../layout/context/layoutcontext";
import React, { useState, useEffect } from "react";

// Theme and core CSS
import "primereact/resources/themes/lara-light-indigo/theme.css";  // theme
import "primereact/resources/primereact.css";    // core css
import "primeicons/primeicons.css";             // icons
import "primeflex/primeflex.css";              // flex & grid

// Custom styles - must be imported after PrimeReact styles
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
				<link 
					id="theme-css" 
					rel="stylesheet" 
					href="/themes/lara-light-indigo/theme.css"
					type="text/css" 
				/>
			</head>
			<body>
				<LoaderBar />
				<Toaster position="top-right" />

				<QueryClientProvider client={queryClient}>
					<PrimeReactProvider value={{ 
						ripple: true, 
						unstyled: false,
						pt: {
							inputswitch: {
								root: { className: 'w-3rem h-1.75rem' },
								slider: { className: 'bg-surface-400' }
							},
							radiobutton: {
								root: { className: 'w-1.25rem h-1.25rem' },
								input: { className: 'w-full h-full' }
							},
							checkbox: {
								root: { className: 'w-1.25rem h-1.25rem' },
								input: { className: 'w-full h-full' }
							}
						}
					}}>
						<LayoutProvider>{children}</LayoutProvider>
					</PrimeReactProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
