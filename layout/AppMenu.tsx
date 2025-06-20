/* eslint-disable @next/next/no-img-element */

import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import { ModuleEnum } from "@/app/(main)/components/common/lib/enum";
import { useRouter } from "next/navigation";

export const menuModel: any[] = [
	{
		label: "Inicio",
		items: [
			{
				label: "Dashboard",
				icon: "pi pi-fw pi-home",
				to: "/",
				allowed: false,
				module: ModuleEnum.USER,
			},
		],
	},
	// {
	// 	label: "",
	// 	items: [{ label: "Usuarios", icon: "pi pi-users", to: "/usuarios" }],
	// },
	// {
	// 	label: "",
	// 	items: [{ label: "Proyectos", icon: "pi pi-briefcase", to: "/proyectos" }],
	// },
	{
		label: "Sistema",
		items: [
			{
				label: "Configuraciones",
				icon: "pi pi-fw pi-cog",
				items: [
					{
						label: "Bitacora",
						icon: "pi pi-fw pi-calendar",		
						to: "/bitacora" 		
					},
				],
			},
		],
	},
];

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    return (
        <>
            <MenuProvider>
                <div className="flex flex-col h-full overflow-hidden">
                    <ul className="layout-menu flex-grow">
                        {menuModel.map((item, i) => {
                            return !item?.seperator ? (
                                <AppMenuitem item={item} root={true} index={i} key={`root-${i}-${item.label}`} />
                            ) : (
                                <li className="menu-separator" key={`separator-${i}`}></li>
                            );
                        })}
                    </ul>
                    <div className="w-full flex justify-center py-4 mt-auto border-t border-gray-200">
                        <span
							style={{ marginLeft: '-100%', backgroundColor: '#2dabd2', borderRadius: '9999px' }}
                            className=" text-white text-sm font-bold px-6 py-2  shadow-sm cursor-pointer transition-colors"
                            onClick={() => router.push('/versiones')}
                        >
                            Versión 0.1.1
                        </span>
                    </div>
                </div>
            </MenuProvider>
        </>
    );
};

export default AppMenu;
