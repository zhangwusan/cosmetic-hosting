import LocationIcon from "@/public/svg/location.svg"
import MessageIcon from "@/public/svg/message.svg"
import PhoneIcon from "@/public/svg/phone.svg"
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
    return (
        <>
            <div className="bg-contact-us h-[600px] bg-origin bg-no-repeat relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 px-12 space-y-4 text-center">
                    <h1 className="text-primary">Message US</h1>
                    <p className="text-black">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima excepturi, iste architecto doloremque error, maiores tenetur commodi exercitationem sit eveniet aut quae totam</p>
                </div>
            </div>
            <div className="flex items-center justify-between mx-24 my-12">
                <div className="space-y-8">
                    <h3>Contact Us</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora dolor esse, quibusdam fugit eius tenetur animi. Amet autem, obcaecati dolores voluptate optio minima facilis! Quasi dicta accusamus expedita praesentium veniam.</p>
                    <div className="space-y-4 ">
                        <Link href={"location"} className="flex gap-4">
                            <Image src={LocationIcon} width={16} height={16} alt="location" />
                            <span>Cambodia</span>
                        </Link>
                        <Link href={"message"} className="flex gap-4">
                            <Image src={MessageIcon} width={16} height={16} alt="message" />
                            <span>zhangwuling@gmail.com</span>
                        </Link>
                        <Link href={"phone"} className="flex gap-4">
                            <Image src={PhoneIcon} width={16} height={16} alt="phone" />
                            <span>+855 123 456 789</span>
                        </Link>
                    </div>
                </div>
                <div className="bg-secondary w-1/2 flex flex-col items-center justify-center py-16">
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" cols={26} rows={6} className="rounded-2xl mt-4"></textarea>
                    </div>
                    <button type="submit">SEND</button>
                </div>
            </div>
        </>
    );
}