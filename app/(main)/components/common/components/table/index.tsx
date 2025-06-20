"use client";

import { DataTable, DataTableProps } from "primereact/datatable";
import { Column } from "primereact/column";
import React from "react";

interface GenericColumn {
	field: string;
	header: string;
	body?: (rowData: any) => React.ReactNode;
	[key: string]: any;
}

interface GenericDataTableProps
	extends Omit<DataTableProps<any>, "value" | "children"> {
	value: any[];
	columns: GenericColumn[];
}

const GenericDataTable: React.FC<GenericDataTableProps> = ({
	value,
	columns,
	...rest
}) => {
	const { cellSelection, ...safeRest } = rest as any;
	return (
		<DataTable value={value} {...safeRest}>
			{columns.map((col) => (
				<Column key={col.field} {...col} />
			))}
		</DataTable>
	);
};

export default GenericDataTable;
