/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { classNames } from "primereact/utils";
import React, {
	forwardRef,
	useContext,
	useImperativeHandle,
	useRef,
} from "react";
import { AppTopbarRef } from "@/types";
import { LayoutContext } from "./context/layoutcontext";
import { Menu } from "primereact/menu";
import { useSideBar } from "@/app/(main)/components/common/hooks/useSidebar";
import { PrimeReactContext } from "primereact/api";

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
	const router = useRouter();
	const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar, setLayoutConfig } =
		useContext(LayoutContext);
	const { logout } = useSideBar();
	const { changeTheme } = useContext(PrimeReactContext);
	const menubuttonRef = useRef(null);
	const topbarmenuRef = useRef(null);
	const topbarmenubuttonRef = useRef(null);
	const menuRef = useRef<Menu>(null);
	const settingsMenuRef = useRef<Menu>(null);

	const changeThemeHandler = (theme: string, colorScheme: string) => {
		changeTheme?.(layoutConfig.theme, theme, "theme-css", () => {
			setLayoutConfig((prevState) => ({
				...prevState,
				theme,
				colorScheme,
			}));
		});
	};

	const userItems = [
		// {
		// 	label: "Ver perfil",
		// 	icon: "pi pi-user",
		// 	command: () => {
		// 		router.push("/perfil");
		// 	},
		// },
		{
			label: "Cerrar sesión",
			icon: "pi pi-power-off",
			command: () => logout(),
		},
	];

	const settingsItems = [
		{
			label: "Tema",
			items: [
				{
					label: "Claro",
					icon: "pi pi-sun",
					command: () => changeThemeHandler("lara-light-blue", "light"),
				},
				{
					label: "Oscuro",
					icon: "pi pi-moon",
					command: () => changeThemeHandler("lara-dark-blue", "dark"),
				},
			],
		},
	];

	useImperativeHandle(ref, () => ({
		menubutton: menubuttonRef.current,
		topbarmenu: topbarmenuRef.current,
		topbarmenubutton: topbarmenubuttonRef.current,
	}));

	return (
		<div className="layout-topbar" style={{
			backgroundColor: layoutConfig.colorScheme !== "dark" ? "#000e28" : "",
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: '0 1rem'
		}}>
			<div className="flex items-center">
				<button
					ref={menubuttonRef}
					type="button"
					className="p-link layout-menu-button layout-topbar-button"
					onClick={onMenuToggle}
					style={{ marginRight: '1rem' }}
				>
					<i
						className="pi pi-bars"
						style={{
							color: layoutConfig.colorScheme !== "dark" ? "#fff" : undefined,
						}}
					/>
				</button>

				<Link href="/" className="layout-topbar-logo">
					<img
						src={`/layout/images/logo-white.png`}
						alt="Sakai logo"
						className="flex-shrink-0 block object-contain"
						style={{
							height: "2.5rem",
							width: "auto",
							maxWidth: "12rem"
						}}
					/>
				</Link>
			</div>

			<div className="flex gap-3 items-center">
				<button
					type="button"
					className="p-link layout-topbar-button"
					onClick={(e) => settingsMenuRef.current?.toggle(e)}
				>
					<i
						className="pi pi-cog"
						style={{
							color: layoutConfig.colorScheme !== "dark" ? "#fff" : undefined,
						}}
					/>
				</button>
				<button
					type="button"
					className="p-link layout-topbar-button"
					onClick={(e) => menuRef.current?.toggle(e)}
				>
					<i
						className="pi pi-user"
						style={{
							color: layoutConfig.colorScheme !== "dark" ? "#fff" : undefined,
						}}
					/>
				</button>
				<Menu model={settingsItems} popup ref={settingsMenuRef} />
				<Menu model={userItems} popup ref={menuRef} />
			</div>
		</div>
	);
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
