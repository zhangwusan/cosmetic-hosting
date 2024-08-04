import Image from "next/image";
import Avatar from "@/public/images/avatar.jpg";
import { useSession } from "next-auth/react";

interface UserImageEditProps {
    dataForm: any;
    setDataForm: (data: any) => void;
}

export default function UserImageEdit({ dataForm, setDataForm }: UserImageEditProps) {
    const { data: session } = useSession();
    const handleFileChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData();
            data.append('id', dataForm.id);
            data.append('images', files[0]);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: data
            });

            if (response.ok) {
                const { imageLink } = await response.json();
                setDataForm((prevData: any) => ({
                    ...prevData,
                    userImage: imageLink,
                }));
            } else {
                console.error('Failed to upload image');
            }
        }
    };

    return (
        <>
            {dataForm.userImage ? (
                <Image
                    src={dataForm.userImage}
                    alt="User image"
                    width={200}
                    height={150}
                    className="rounded-full object-cover"
                />
            ) : (
                <Image
                    src={Avatar}
                    alt="Default avatar"
                    width={200}
                    height={150}
                    className="rounded-full object-contain"
                />
            )}
            <label className="my-4">
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="border border-black px-4 py-2 rounded-lg cursor-pointer">
                    Edit
                </span>
            </label>
        </>
    );
}
