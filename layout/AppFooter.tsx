/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useContext } from "react";
import { LayoutContext } from "./context/layoutcontext";
import { useRouter } from "next/navigation";

const AppFooter = () => {

	return (
		<div
			className="layout-footer"
			style={{ display: "flex", alignItems: "center", gap: "1rem" }}
		>
			<span>
				Impulsado por
				<a
					href="https://geniosstudios.com/"
					target="_blank"
					rel="noreferrer"
					className="font-medium ml-2"
					style={{ marginLeft: "0.5rem" }}
				>
					Genios Studios
				</a>
			</span>
		</div>
	);
};

export default AppFooter;
