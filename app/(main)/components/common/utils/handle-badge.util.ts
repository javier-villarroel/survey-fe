export enum BadgeNames {
	Nacionalizado = "Nacionalizado",
	Trasegado = "Trasegado",
	Despachado = "Despachado",
	Contabilizado = "Contabilizado",
}

export const badgesMap: { [key: string]: BadgeNames } = {
	nationalizedInPort: BadgeNames.Nacionalizado,
	nationalizedInAlmacenadora: BadgeNames.Nacionalizado,
	nationalizedFromBl: BadgeNames.Nacionalizado,
	dispatchedInPort: BadgeNames.Despachado,
	dispatchedInAlmacenadora: BadgeNames.Despachado,
	transferedInAlmacenadora: BadgeNames.Trasegado,
	transferedInPort: BadgeNames.Trasegado,
	contabilized: BadgeNames.Contabilizado,
};
