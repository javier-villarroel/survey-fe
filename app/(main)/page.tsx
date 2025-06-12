"use client";
import React from 'react';
import { Card } from 'primereact/card';

const Dashboard = () => {
	return (
		<div className="flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 150px)' }}>
			<Card className="text-center p-4 shadow-2 mx-3" style={{ maxWidth: '400px' }}>
				<div className="flex flex-column align-items-center gap-4">
					<div className="bg-primary-100 p-4 border-circle mt-3">
						<i className="pi pi-wrench text-primary text-5xl"></i>
					</div>
					<h2 className="text-primary text-4xl font-bold m-0">En Construcción</h2>
					<p className="text-700 text-xl mt-2 mb-0">
						Estamos trabajando para brindarte la mejor experiencia
					</p>
				</div>
			</Card>
		</div>
	);
};

export default Dashboard;