export function cn(...classes: (string | undefined | false)[]) {
	return classes.filter(Boolean).join(" ");
}

export function getGridColsClass(cols: number | undefined) {
	switch (cols) {
		case 2:
			return "grid-cols-2";
		case 3:
			return "grid-cols-3";
		case 4:
			return "grid-cols-4";
		default:
			return "grid-cols-1";
	}
}
