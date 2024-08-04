import Logo from "../Logo";
import FacebookIcon from "@/public/svg/facebook.svg"
import InstagramIcon from "@/public/svg/instagram.svg"
import TwitterIcon from "@/public/svg/twitter.svg"
import Image from "next/image";

export default function Footer({
    className
}: {
    className?: string;
}) {
    return (
        <div className={className}>
            <div className="flex justify-between items-center py-12 border-b border-gray-300 px-4">
                <span className="text-xl" >Subscribe to our newsletter</span>
                <div className="flex gap-4">
                    <input type="text" placeholder="Enter email address" />
                    <button>Subscribe</button>
                </div>
            </div>
            <div className="flex justify-between px-4 py-12 border-b border-gray-300">
                <Logo footer={true} />
                <div className="flex gap-16">
                    <ul>
                        <li>SHOP ALL</li>
                        <li>MAKE UP</li>
                        <li>SKIN CARE</li>
                        <li>HAIR CARE</li>
                        <li>ABOUT</li>
                        
                    </ul>
                    <ul>
                        <li>Refund Policy</li>
                        <li>Terms & Conditions</li>
                        <li>FAQ</li>
                        <li>Privacy Policy</li>
                    </ul>
                    <div className="flex gap-4">
                        <Image
                            src={FacebookIcon}
                            width={24}
                            height={24}
                            alt="facebook"
                        />
                        <Image
                            src={InstagramIcon}
                            width={24}
                            height={24}
                            alt="instagram"
                        />
                        <Image
                            src={TwitterIcon}
                            width={24}
                            height={24}
                            alt="twitter"
                        />
                    </div>
                </div>
            </div>
            <div className="px-4 py-12 text-gray-400">
                <span>Copyright &copy; 2024 Be Bold | Powered by Be Bold</span>
            </div>
        </div>
    );
}