// import { useRouter } from "next/router";
// import { useInfoUser } from "../../hooks/useEdit/useInfoUser";
// import { useUpdateUser } from "../../hooks/update/useHandleOnSubmit";
// import { Fragment, useEffect } from "react";
// import { FormBuilder } from "@/components/common/build/form/form";
// import { ImageBuilder } from "@/components/common/build/image/image";
// import { SkeletonsProfileUser } from "@/components/common/components/skeletons";
// import { CardPreview } from "../../components/card-preview";

// export const UserDetails = ({ disabled }: { disabled: boolean }) => {
//   const { query } = useRouter();

//   const id = query.id as string | string[];

//   const { form, sections, imageSections, data, setDataUser, isLoadingInfoUser } = useInfoUser({
//     disabled,
//     id: id,
//   });

//   const ciPhotoWatch = form.watch("pidPicture");
//   const selfiePhotoWatch = form.watch("profilePicture");

//   const { onUpdateUser, isLoadingUpdate } = useUpdateUser({ id: data?.id! });

//   useEffect(() => data && setDataUser(), [data]);

//   return (
//     <div className="w-full h-full flex justify-start items-start gap-x-10">
//       {isLoadingInfoUser ? (
//         <SkeletonsProfileUser />
//       ) : (
//         <Fragment>
//           <div className="hidden max-w-xs w-full lg:flex flex-col gap-4 justify-start items-start sticky  top-0 left-0 overflow-hidden">
//             <CardPreview
//               form={form}
//               local={disabled}
//               selfiePhoto={selfiePhotoWatch?.compressed?.preview}
//               ciPhoto={ciPhotoWatch?.compressed?.preview}
//             />
//           </div>
//           <div className="w-full">
//             <FormBuilder
//               form={form}
//               sections={sections}
//               isLoading={isLoadingUpdate}
//               buttonTitle="Actualizar usuario"
//               card
//               onSubmit={disabled ? undefined : onUpdateUser}
//             >
//               <div className="w-full h-full sm:grid sm:grid-cols-2 gap-4">
//                 <ImageBuilder sections={imageSections} form={form} />
//               </div>
//             </FormBuilder>
//           </div>
//         </Fragment>
//       )}
//     </div>
//   );
// };
