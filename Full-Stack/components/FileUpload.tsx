// // "use client"

// import React from "react";
// import { FaUpload } from "react-icons/fa6";
// import { CldUploadWidget, CldUploadWidgetResults } from "next-cloudinary";

// interface FileUploadProps {
//   onChange: (url?: string) => void;
// }

// const FileUpload = ({onChange}: FileUploadProps) => {
//   const handleUpload = (result: CldUploadWidgetResults) => {
//     const info = result.info as object;

//     if("secure_url" in info && "public_id" in info) {
//       const url = info.secure_url as string;
//       // const public_id = info.public_id as string;
//       onChange(url);
//     }
//   }

//   return (
//     <CldUploadWidget
//       uploadPreset="coursethumbnail"
//       options={{ sources: ["local", "url", "unsplash"] }}
//       onUpload={handleUpload}
//     >
//       {({ open }) => {
//         return (
//           <button
//             className="mt-4 p-4 border rounded-xl bg-background border-dotted dark:border-solid min-h-[200px] flex items-center justify-center cursor-pointer w-full hover:bg-accent/50 duration-300 transition-all" 
//             onClick={() => open()}
//           >
//             <FaUpload className="text-4xl text-muted-foreground" />
//           </button>
//         );
//       }}
//     </CldUploadWidget>
//   );
// };

// export default FileUpload;


"use client";

import React from "react";
import { CldUploadWidget, CldUploadWidgetResults } from "next-cloudinary";
import { FaUpload } from "react-icons/fa6";

interface FileUploadProps {
  onChange: (url?: string) => void;
}

const FileUpload = ({ onChange }: FileUploadProps) => {
  const handleUpload = (result: CldUploadWidgetResults) => {
    const info = result.info as object;

    if ("secure_url" in info) {
      const url = info.secure_url as string;
      console.log(url,"url")
      onChange(url); // Send the new URL back to ImageForm
    }
  };

  return (
    <CldUploadWidget
      uploadPreset="coursethumbnail" // replace with your upload preset
      options={{ sources: ["local", "url", "unsplash"] }}
      onUpload={handleUpload}
    >
      {({ open }) => (
        <button
          className="mt-4 p-4 border rounded-xl bg-background border-dotted dark:border-solid min-h-[200px] flex items-center justify-center cursor-pointer w-full hover:bg-accent/50 duration-300 transition-all"
          onClick={() => open()}
        >
          <FaUpload className="text-4xl text-muted-foreground" />
        </button>
      )}
    </CldUploadWidget>
  );
};

export default FileUpload;
