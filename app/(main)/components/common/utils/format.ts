export const formatDoc = (
	pid: string,
): { pidType: string; pidNumber: string } => {
	const [pidType, pidNumber] = pid.split("-");

	return {
		pidType: pidType.toLowerCase(),
		pidNumber,
	};
};
export const formatNumberPhone = (
	numberPhone: string,
): { phoneCode: string; phoneNumber: string } => {
	const cleanedNumber = numberPhone?.replace("+58", "0");

	const phoneCode = cleanedNumber?.slice(0, 4);
	const phoneNumber = cleanedNumber?.slice(4);

	return {
		phoneCode,
		phoneNumber,
	};
};

export function formatAmount(amount: number, decimal = 2): string {
	const number = Number(amount);

	const [integerPart, decimalPart] = number?.toFixed(decimal).split(".");

	const formattedIntegerPart = integerPart.replace(
		/\B(?=(\d{3})+(?!\d))/g,
		".",
	);

	const formattedAmount = `${formattedIntegerPart}${decimalPart ? `,${decimalPart}` : ""}`;

	return formattedAmount;
}
