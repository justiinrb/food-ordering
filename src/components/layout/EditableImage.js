import Image from "next/image";
import toast from "react-hot-toast";
export default function EditableImage({ link, setLink }) {

  async function handleFileChange(ev) {
    const files = ev.target.files;
    console.log(files);
    if (files?.length === 1) {
      const file = files[0];

      const uploadPromise = new Promise(async (resolve, reject) => {
        try {
          const url = await uploadImage(file); // Subir la imagen a Firebase
          console.error("imageurl", url);
          setLink(url); // Actualizar la imagen del usuario con la URL de Firebase
          resolve();
        } catch (error) {
          console.error("Error al subir la imagen:", error);
          reject();
        }

      });

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Uploading complete!',
        error: 'Upload Error!'
      })

    }
  }
  const userImageSrc = link ;
  return (
    <>
      <div className="p-2 rounded-lg relative max-w-[120px]">
        <Image className="rounded-lg w-full h-full mb-1" src={userImageSrc} width={250} height={250} alt={'no image'} />
        <label>
          <input type="file" className="hidden" onChange={handleFileChange} />
          <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Edit</span>
        </label>
      </div>
    </>
  );
}