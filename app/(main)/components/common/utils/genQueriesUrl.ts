// Eliminadas las importaciones de jjr-ui

// Tipos genéricos para filtros y queries
export interface ITableFilter {
	field: string;
	value: string | boolean | number | string[];
}

export interface ITableQuery {
	field: string;
	text: string | boolean | number;
}

export interface ICustomQueries extends Partial<ITableQuery> {
	field: string;
	text: string | boolean | number;
}

export type PageQueries<T = ITableQuery> = {
	filters: ITableFilter[];
	queries: T[];
	skip: number;
	limit: number;
	page: number;
	perPage: number;
};

/**
 * Default values for pagination queries.
 */
export const defaultPageQueries: Partial<PageQueries> = {
	skip: 1,
	limit: 5,
	page: 1,
	perPage: 5,
};

/**
 * Generates a URL with query parameters based on the provided pagination and filtering options.
 */
export const genQueriesUrl = <T = ITableQuery>(
	url: string,
	q: Partial<PageQueries<T>>,
	qq?: any,
) => {
	let queryUrl = `${url}?pagination={"page":${q.skip || defaultPageQueries.skip},"limit":${q.limit || defaultPageQueries.limit}}`;

	if (q || qq) {
		if (q && q?.queries?.length) {
			const stringify = JSON.stringify(q.queries);

			queryUrl = queryUrl.concat(`&queries=${stringify}`);

			if (q && q.filters) {
				const str = JSON.stringify(q.filters);

				queryUrl = queryUrl.concat(`&filters=${str}`);
			}
		}
		if (qq && qq.length > 0) {
			const str = JSON.stringify(qq);

			queryUrl = queryUrl.concat(`&customQuery=${str}`);
		}

		if (q && q?.filters && !q?.queries?.length) {
			const str = JSON.stringify(q.filters);

			queryUrl = queryUrl.concat(`&filters=${str}`);
		}

		return queryUrl;
	}

	return url;
};
