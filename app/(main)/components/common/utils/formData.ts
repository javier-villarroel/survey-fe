type DataToConver = Record<string, any>;

type AddImagePropsTypes = {
	formData: FormData;
	images: File[];
	name: string;
};

type AddImageSequence = Pick<AddImagePropsTypes, "formData"> &
	Pick<AddImagePropsTypes, "name"> & {
		images: { sequence: number; file: File }[];
	};

export const formaDataConvert = (toConvert: DataToConver) => {
	const formData = new FormData();

	Object?.entries(toConvert).forEach((item) => {
		formData.append(
			item[0],
			typeof item[1] !== "string" ? JSON.stringify(item[1]) : item[1],
		);
	});

	return formData;
};

export const addImageToFormData = ({
	formData,
	images,
	name,
}: AddImagePropsTypes) => {
	images.length > 0 &&
		images.forEach((element) => {
			formData.append(name, element);
		});
	return formData;
};

export const addImageToFormDataBySequence = ({
	formData,
	images,
	name,
}: AddImageSequence) => {
	images.length > 0 &&
		images.forEach(({ sequence, file }) => {
			formData.append(`${name}_${sequence}`, file);
		});

	return formData;
};

// export const dirtyFields = <T>(dirty, data: T) => {
//   const editData: Partial<T> = {};

//   Object.entries(dirty).forEach(([field, value]) => {
//     if (value) {
//       editData[field] = data[field];
//     }
//   });

//   return editData;
// };
