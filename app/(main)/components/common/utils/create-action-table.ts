import { ReactNode } from "react";

export type CreateActionsPropsTypes = {
	label: string | ReactNode;
	onClick: () => void;
	hidden?: boolean;
	icon?: ReactNode;
};

export const createAction = ({
	hidden = false,
	...rest
}: CreateActionsPropsTypes) => ({
	hidden,
	...rest,
});
