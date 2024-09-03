import Image from "next/image";

export function ImageUpload({ itemImage, onImageChange }) {
    return (
        <div>
            {itemImage ? (
                <Image
                    className="rounded-lg w-full h-full mb-1"
                    src={itemImage}
                    width={120}
                    height={120}
                    alt="Item"
                />
            ) : (
                <div className="rounded-lg p-4 bg-gray-200 flex items-center justify-center text-gray-500">
                    No image
                </div>
            )}
            <label className="block cursor-pointer">
                <input type="file" className="hidden" accept="image/*" onChange={onImageChange} />
                <span className="block border border-gray-300 rounded-lg p-2 text-center mt-2">Edit</span>
            </label>
        </div>
    );
}