"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Estilos personalizados para NProgress
const styles = `
    #nprogress .bar {
        background: #f05707 !important;
        height: 3px !important;
    }

    #nprogress .peg {
        box-shadow: 0 0 10px #f05707, 0 0 5px #f05707 !important;
    }
`;

const LoaderBar = () => {
	const pathname = usePathname();
	const router = useRouter();
	const prevPath = useRef<string | null>(null);

	useEffect(() => {
		// Agregar estilos personalizados
		const styleSheet = document.createElement("style");
		styleSheet.textContent = styles;
		document.head.appendChild(styleSheet);

		const handleStart = () => {
			NProgress.start();
		};

		const handleStop = () => {
			NProgress.done();
		};

		// Configurar NProgress
		NProgress.configure({ showSpinner: false });

		// Agregar listeners para los eventos de navegación
		document.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			const link = target.closest('a');
			if (link && link.href && !link.target && link.origin === window.location.origin) {
				handleStart();
			}
		});

		// Limpiar listeners y estilos
		return () => {
			document.removeEventListener('click', handleStart);
			document.head.removeChild(styleSheet);
			NProgress.remove();
		};
	}, []);

	// Efecto adicional para manejar cambios de ruta
	useEffect(() => {
		if (prevPath.current !== pathname) {
			prevPath.current = pathname;
			NProgress.done();
		}
	}, [pathname]);

	return null;
};

export default LoaderBar;
