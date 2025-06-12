// import { UseFormReturn } from "react-hook-form";
// import { Card, Separator, UploadImage, cn } from "jjr-ui";
// import { ImageBuilder } from "@/components/common/build/image/image";
// import { ISectionImage } from "@/components/common/build/image/image.interface";
// import { useEffect, useMemo } from "react";
// import { instancedImagesObjects } from "@/components/common/utils/instancedUploadImage";
// import { Show } from "@/components/common/build/show/show";
// import { CardTitleError } from "@/components/common/build/image/components/card_title";
// import { AddButton } from "@/components/common/components";
// import { InputFile } from "../components/inputFile";

// interface IGenericImageProps {
//   form: UseFormReturn<any>;
//   disabled?: boolean;
//   fieldName: string;
//   title: string;
//   maxImages?: number;
//   inputFile: boolean;
// }

// export const GenericImageUpload = ({
//   form,
//   disabled = false,
//   fieldName,
//   title,
//   maxImages = 4,
//   inputFile = false,
// }: IGenericImageProps) => {
//   const items = Array.isArray(form?.watch(fieldName)) ? form?.watch(fieldName) : [];

//   const addImage = () => {
//     const obj = {
//       original: { preview: "" },
//       compressed: { preview: "" },
//     };

//     const currentValues = Array.isArray(form.getValues(fieldName)) ? form.getValues(fieldName) : [];
//     const newImages = [...currentValues, obj];
//     form.setValue(fieldName, newImages);
//   };

//   const addDoc = () => {
//     const obj = { file: null };
//     const currentValues = Array.isArray(form.getValues(fieldName)) ? form.getValues(fieldName) : [];
//     const newDocs = [...currentValues, obj];
//     form.setValue(fieldName, newDocs);
//   };

//   useEffect(() => {
//     if (items.length === 0) {
//       if (inputFile) {
//         addDoc();
//       } else {
//         addImage();
//       }
//     }
//   }, [items]);

//   const imageSections: ISectionImage[] = useMemo(() => {
//     const keys = items?.map((item, index) => `${fieldName}.${index}`);
//     const objImg = instancedImagesObjects(form, keys);

//     const s = items?.map((item, index) => {
//       const obj = {
//         config: {
//           gridColumns: 1,
//           quantityImage: 1,
//           title: `${title} (${index + 1})`,
//           name: `${fieldName}.${index}`,
//           fields: [
//             {
//               Render: UploadImage,
//               props: {
//                 ...objImg[`${fieldName}.${index}`],
//                 disabled,
//                 initialPreview: form.watch(`${fieldName}.${index}.original.preview`),
//               },
//             },
//           ],
//         },
//       };

//       return obj;
//     });

//     return s;
//   }, [items]);

//   return (
//     <Card className="p-4 w-full">
//       <div className="flex xl:flex-row flex-col gap-2 justify-between text-center items-center">
//         <CardTitleError form={form} keyName={`${fieldName}.root`} label={title} />

//         <Show>
//           <Show.If isTrue={!disabled}>
//             {!inputFile && (
//               <AddButton
//                 title="Agregar imagen"
//                 disabled={items.length >= maxImages}
//                 onClick={addImage}
//               />
//             )}
//             {inputFile && (
//               <AddButton
//                 title="Agregar documento"
//                 disabled={items.length >= maxImages}
//                 onClick={addDoc}
//               />
//             )}
//           </Show.If>
//         </Show>
//       </div>

//       <Separator className="my-4" />
//       <section
//         className={cn(
//           "w-full p-1 gap-4 grid",
//           inputFile ? "grid-cols-1" : disabled ? "xl:grid-cols-1" : "xl:grid-cols-2",
//         )}
//       >
//         {inputFile &&
//           items.map((item, index) => (
//             <InputFile
//               key={`${fieldName}.${index}`}
//               form={form}
//               id={`${fieldName}.${index}`}
//               label={`Documento (${index + 1})`}
//               tabIndex={1}
//               disabled={disabled}
//             />
//           ))}
//         {!inputFile && <ImageBuilder sections={imageSections} form={form} />}
//       </section>
//     </Card>
//   );
// };
