// import moment from "moment-timezone";

// type DateFormatType = {
// 	date: string | Date;
// 	view_time?: boolean;
// 	DATE_ISO_8601?: boolean;
// };

// export const formatDate = ({
// 	date,
// 	view_time = true,
// 	DATE_ISO_8601 = false,
// }: DateFormatType): string => {
// 	if (!date) {
// 		return "Fecha no disponible";
// 	}

// 	const momentDate = moment.utc(date);
// 	if (DATE_ISO_8601) {
// 		return momentDate.format("YYYY-MM-DD");
// 	}
// 	if (!view_time) {
// 		return momentDate.format("DD/MM/YYYY");
// 	}
// 	return momentDate.format("DD/MM/YYYY hh:mm A");
// };
