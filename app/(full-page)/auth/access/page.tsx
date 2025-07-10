/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "primereact/button";

const AccessDeniedPage = () => {
	const router = useRouter();

	return (
		<div className="w-full h-full flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 150px)' }}>
			<div className="flex align-items-center justify-content-center min-w-screen overflow-hidden">
				<div className="flex flex-column align-items-center justify-content-center">
					<div
						style={{
							borderRadius: "56px",
							padding: "0.3rem",
							background:
								"linear-gradient(180deg, rgba(247, 149, 48, 0.4) 10%, rgba(247, 149, 48, 0) 30%)",
						}}
					>
						<div
							className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
							style={{ borderRadius: "53px" }}
						>
							<div
								className="flex justify-content-center align-items-center bg-pink-500 border-circle"
								style={{ height: "3.2rem", width: "3.2rem" }}
							>
								<i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>
							</div>
							<h1 className="text-900 font-bold text-5xl mb-2">Acceso denegado</h1>
							<div className="text-600 mb-5">
								No cuentas con los permisos necesarios para acceder a esta página.
							</div>
							<img
								src="/demo/images/access/asset-access.svg"
								alt="Error"
								className="mb-5"
								width="80%"
							/>
							<Button
								icon="pi pi-arrow-left"
								label="Volver"
								text
								onClick={() => router.push("/")}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccessDeniedPage;
