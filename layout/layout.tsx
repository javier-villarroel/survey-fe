/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import {
	useEventListener,
	useMountEffect,
	useUnmountEffect,
} from "primereact/hooks";
import React, { useContext, useEffect, useRef, Suspense, useCallback, useMemo, useLayoutEffect } from "react";
import { classNames } from "primereact/utils";
import AppFooter from "./AppFooter";
import AppSidebar from "./AppSidebar";
import AppTopbar from "./AppTopbar";
import AppConfig from "./AppConfig";
import { LayoutContext } from "./context/layoutcontext";
import { PrimeReactContext } from "primereact/api";
import { ChildContainerProps, LayoutState, AppTopbarRef } from "@/types";
import { usePathname } from "next/navigation";

const LayoutContent = ({ children }: ChildContainerProps) => {
	const { layoutConfig, layoutState, setLayoutState } =
		useContext(LayoutContext);
	const { setRipple } = useContext(PrimeReactContext);
	const topbarRef = useRef<AppTopbarRef>(null);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const isNavigating = useRef(false);
	const pathname = usePathname();

	const updateLayoutState = useCallback((updates: Partial<LayoutState>) => {
		if (isNavigating.current) return;
		
		setLayoutState((prevLayoutState: LayoutState) => {
			// Only update if values actually changed
			const hasChanges = Object.entries(updates).some(
				([key, value]) => prevLayoutState[key as keyof LayoutState] !== value
			);
			
			return hasChanges ? { ...prevLayoutState, ...updates } : prevLayoutState;
		});
	}, [setLayoutState]);

	const blockBodyScroll = useCallback((): void => {
		if (isNavigating.current) return;
		if (!document.body.classList.contains("blocked-scroll")) {
			document.body.classList.add("blocked-scroll");
		}
	}, []);

	const unblockBodyScroll = useCallback((): void => {
		if (document.body.classList.contains("blocked-scroll")) {
			document.body.classList.remove("blocked-scroll");
		}
	}, []);

	const hideMenu = useCallback(() => {
		if (isNavigating.current) return;
		
		const updates: Partial<LayoutState> = {};
		if (layoutState.overlayMenuActive) updates.overlayMenuActive = false;
		if (layoutState.staticMenuMobileActive) updates.staticMenuMobileActive = false;
		if (layoutState.menuHoverActive) updates.menuHoverActive = false;

		if (Object.keys(updates).length > 0) {
			updateLayoutState(updates);
			unblockBodyScroll();
		}
	}, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive, layoutState.menuHoverActive, updateLayoutState, unblockBodyScroll]);

	const hideProfileMenu = useCallback(() => {
		if (isNavigating.current || !layoutState.profileSidebarVisible) return;
		updateLayoutState({ profileSidebarVisible: false });
	}, [layoutState.profileSidebarVisible, updateLayoutState]);

	const handleProfileMenuOutsideClick = useCallback((event: MouseEvent) => {
		if (!topbarRef.current) return;

		const isOutsideClicked = !(
			topbarRef.current.topbarmenu?.contains(event.target as Node) ||
			topbarRef.current.topbarmenubutton?.contains(event.target as Node)
		);

		if (isOutsideClicked && !isNavigating.current) {
			hideProfileMenu();
		}
	}, [hideProfileMenu]);

	const handleMenuOutsideClick = useCallback((event: MouseEvent) => {
		if (!sidebarRef.current || !topbarRef.current) return;

		const isOutsideClicked = !(
			sidebarRef.current.contains(event.target as Node) ||
			topbarRef.current.menubutton?.contains(event.target as Node)
		);

		if (isOutsideClicked && !isNavigating.current) {
			hideMenu();
		}
	}, [hideMenu]);

	const [bindProfileMenuOutsideClickListener, unbindProfileMenuOutsideClickListener] =
		useEventListener({
			type: "click",
			listener: handleProfileMenuOutsideClick,
		});

	const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] =
		useEventListener({
			type: "click",
			listener: handleMenuOutsideClick,
		});

	// Handle route changes
	useLayoutEffect(() => {
		isNavigating.current = true;
		
		const cleanup = () => {
			if (layoutState.overlayMenuActive || layoutState.staticMenuMobileActive || layoutState.profileSidebarVisible) {
				hideMenu();
				hideProfileMenu();
			}
			unbindMenuOutsideClickListener();
			unbindProfileMenuOutsideClickListener();
			unblockBodyScroll();
			isNavigating.current = false;
		};

		cleanup();
		
		return cleanup;
	}, [pathname]);

	// Handle menu visibility
	useEffect(() => {
		if (isNavigating.current) return;

		const shouldBindMenuListener = layoutState.overlayMenuActive || layoutState.staticMenuMobileActive;
		const shouldBlockScroll = layoutState.staticMenuMobileActive;

		if (shouldBindMenuListener) {
			bindMenuOutsideClickListener();
		} else {
			unbindMenuOutsideClickListener();
		}

		if (shouldBlockScroll) {
			blockBodyScroll();
		} else {
			unblockBodyScroll();
		}

		return () => {
			if (!isNavigating.current) {
				unbindMenuOutsideClickListener();
				unblockBodyScroll();
			}
		};
	}, [
		layoutState.overlayMenuActive,
		layoutState.staticMenuMobileActive,
		bindMenuOutsideClickListener,
		unbindMenuOutsideClickListener,
		blockBodyScroll,
		unblockBodyScroll
	]);

	// Handle profile menu visibility
	useEffect(() => {
		if (isNavigating.current) return;

		if (layoutState.profileSidebarVisible) {
			bindProfileMenuOutsideClickListener();
		} else {
			unbindProfileMenuOutsideClickListener();
		}

		return () => {
			if (!isNavigating.current) {
				unbindProfileMenuOutsideClickListener();
			}
		};
	}, [
		layoutState.profileSidebarVisible,
		bindProfileMenuOutsideClickListener,
		unbindProfileMenuOutsideClickListener
	]);

	const containerClass = useMemo(() => classNames("layout-wrapper", {
		"layout-overlay": layoutConfig.menuMode === "overlay",
		"layout-static": layoutConfig.menuMode === "static",
		"layout-static-inactive":
			layoutState.staticMenuDesktopInactive &&
			layoutConfig.menuMode === "static",
		"layout-overlay-active": layoutState.overlayMenuActive,
		"layout-mobile-active": layoutState.staticMenuMobileActive,
		"p-input-filled": layoutConfig.inputStyle === "filled",
		"p-ripple-disabled": !layoutConfig.ripple,
	}), [
		layoutConfig.menuMode,
		layoutConfig.inputStyle,
		layoutConfig.ripple,
		layoutState.staticMenuDesktopInactive,
		layoutState.overlayMenuActive,
		layoutState.staticMenuMobileActive
	]);

	return (
		<React.Fragment>
			<div className={containerClass}>
				<AppTopbar ref={topbarRef} />
				<div ref={sidebarRef} className="layout-sidebar">
					<AppSidebar />
				</div>
				<div className="layout-main-container">
					<div className="layout-main">{children}</div>
					<AppFooter />
				</div>
				<AppConfig />
				<div className="layout-mask"></div>
			</div>
		</React.Fragment>
	);
};

const Layout = ({ children }: ChildContainerProps) => {
	return (
		<Suspense fallback={null}>
			<LayoutContent children={children} />
		</Suspense>
	);
};

export default Layout;
