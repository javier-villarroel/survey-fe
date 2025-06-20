"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Ripple } from "primereact/ripple";
import { classNames } from "primereact/utils";
import React, { useEffect, useContext, Suspense, useCallback, useMemo } from "react";
import { CSSTransition } from "react-transition-group";
import { MenuContext } from "./context/menucontext";
import { AppMenuItemProps } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";

const AppMenuitemContent = (props: AppMenuItemProps) => {
	const pathname = usePathname();
	const { activeMenu, setActiveMenu } = useContext(MenuContext);
	const item = props.item;
	const key = useMemo(() => 
		props.parentKey ? props.parentKey + "-" + props.index : String(props.index)
	, [props.parentKey, props.index]);

	const isActiveRoute = useMemo(() => 
		item!.to && pathname === item!.to
	, [item, pathname]);

	const active = useMemo(() => 
		activeMenu === key || activeMenu.startsWith(key + "-")
	, [activeMenu, key]);
	
	const onRouteChange = useCallback((url: string) => {
		if (item!.to && item!.to === url) {
			setActiveMenu(key);
		}
	}, [item, key, setActiveMenu]);

	useEffect(() => {
		if (pathname && isActiveRoute) {
			onRouteChange(pathname);
		}
	}, [pathname, isActiveRoute, onRouteChange]);

	const itemClick = useCallback((
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		//avoid processing disabled items
		if (item!.disabled) {
			event.preventDefault();
			return;
		}

		//execute command
		if (item!.command) {
			item!.command({ originalEvent: event, item: item });
		}

		// toggle active state
		if (item!.items) {
			setActiveMenu(active ? (props.parentKey as string) : key);
		} else {
			setActiveMenu(key);
		}
	}, [item, active, props.parentKey, key, setActiveMenu]);

	const subMenu = item!.items && item!.visible !== false && (
		<CSSTransition
			timeout={{ enter: 1000, exit: 450 }}
			classNames="layout-submenu"
			in={props.root ? true : active}
			key={key + '-submenu'}
		>
			<ul>
				{item!.items.map((child, i) => {
					return (
						<AppMenuitem
							item={child}
							index={i}
							className={child.badgeClass}
							parentKey={key}
							key={`${key}-${i}-${child.label}`}
						/>
					);
				})}
			</ul>
		</CSSTransition>
	);

	return (
		<li
			className={classNames({
				"layout-root-menuitem": props.root,
				"active-menuitem": active,
			})}
		>
			{props.root && item!.visible !== false && (
				<div className="layout-menuitem-root-text">{item!.label}</div>
			)}
			{(!item!.to || item!.items) && item!.visible !== false ? (
				<a
					href={item!.url}
					onClick={itemClick}
					className={classNames(item!.class, "p-ripple")}
					target={item!.target}
					tabIndex={0}
				>
					<i className={classNames("layout-menuitem-icon", item!.icon)}></i>
					<span className="layout-menuitem-text">{item!.label}</span>
					{item!.items && (
						<i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
					)}
					<Ripple />
				</a>
			) : null}

			{item!.to && !item!.items && item!.visible !== false ? (
				<Link
					href={item!.to}
					replace={item!.replaceUrl}
					target={item!.target}
					onClick={itemClick}
					className={classNames(item!.class, "p-ripple", {
						"active-route": isActiveRoute,
					})}
					tabIndex={0}
				>
					<i className={classNames("layout-menuitem-icon", item!.icon)}></i>
					<span className="layout-menuitem-text">{item!.label}</span>
					{item!.items && (
						<i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
					)}
					<Ripple />
				</Link>
			) : null}

			{subMenu}
		</li>
	);
};

const AppMenuitem = (props: AppMenuItemProps) => {
	return (
		<Suspense fallback={null}>
			<AppMenuitemContent {...props} />
		</Suspense>
	);
};

export default AppMenuitem;
