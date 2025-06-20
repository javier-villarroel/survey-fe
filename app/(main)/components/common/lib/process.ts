export enum CommonProcess {
	LIST = "LIST",
	DETAIL = "DETAIL",
	CREATE = "CREATE",
	UPDATE = "UPDATE",
	DELETE = "DELETE",
	DISPATCH_IN_PORT = "DISPATCH_IN_PORT",
	DISPATCH_IN_ALMACENADORA = "DISPATCH_IN_ALMACENADORA",
	RECEIVE_DISPATCH = "RECEIVE_DISPATCH",
	RECEIVE_DISPATCH_WITHOUT_CONFIRMATION = "RECEIVE_DISPATCH_WITHOUT_CONFIRMATION",
	TO_END = "TO_END",
	TO_CLOSE = "TO_CLOSE",
	RECEIVE_SHIPMENT = "RECEIVE_SHIPMENT",
	RECEIVE_EXTERNAL_SHIPMENT = "RECEIVE_EXTERNAL_SHIPMENT",
}

export const CommonProcessEs: Record<CommonProcess, string> = {
	[CommonProcess.LIST]: "Listar",
	[CommonProcess.DETAIL]: "Ver",
	[CommonProcess.CREATE]: "Crear",
	[CommonProcess.UPDATE]: "Actualizar",
	[CommonProcess.DELETE]: "Suspender",
	[CommonProcess.DISPATCH_IN_PORT]: "Despacho en puerto",
	[CommonProcess.DISPATCH_IN_ALMACENADORA]: "Despacho en almacenadora",
	[CommonProcess.RECEIVE_DISPATCH]: "Recepción",
	[CommonProcess.RECEIVE_SHIPMENT]: "Recepción",
	[CommonProcess.RECEIVE_DISPATCH_WITHOUT_CONFIRMATION]:
		"Recepción sin confirmación",
	[CommonProcess.TO_CLOSE]: "Conciliar",
	[CommonProcess.TO_END]: "Cerrar",
	[CommonProcess.RECEIVE_EXTERNAL_SHIPMENT]: "Despacho sin origen",

	// [CommonProcess.RECEPTION_DISPATCH]: "Recepción de despacho",
};

export const CommonProcessDescription: Record<CommonProcess, string> = {
	[CommonProcess.LIST]: "Acción para listar",
	[CommonProcess.DETAIL]: "Acción para ver",
	[CommonProcess.CREATE]: "Acción para crear",
	[CommonProcess.UPDATE]: "Acción para actualizar",
	[CommonProcess.DELETE]: "Acción para eliminar",
	[CommonProcess.DISPATCH_IN_PORT]: "Acción para despachar en puerto",
	[CommonProcess.DISPATCH_IN_ALMACENADORA]:
		"Acción para despachar en almacenadora",
	[CommonProcess.RECEIVE_DISPATCH]: "Acción la recepción",
	[CommonProcess.RECEIVE_SHIPMENT]: "Acción la recepción",
	[CommonProcess.RECEIVE_DISPATCH_WITHOUT_CONFIRMATION]:
		"Acción para recibir sin confirmación",
	[CommonProcess.TO_CLOSE]: "Acción para conciliar",
	[CommonProcess.TO_END]: "Acción para cerrar",
	[CommonProcess.RECEIVE_EXTERNAL_SHIPMENT]: "Registrar despachos sin origen",
};
