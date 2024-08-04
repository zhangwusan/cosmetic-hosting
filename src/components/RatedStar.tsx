"use client"

import Star from "@/public/svg/star.svg"
import SolidStar from "@/public/svg/star-solid.svg"
import Image from "next/image";

export default function RatedStar() {
    return (
        <div className="flex text-orange-600">
            <Image src={SolidStar} width={20} height={20} alt="star1" />
            <Image src={SolidStar} width={20} height={20} alt="star2" />
            <Image src={SolidStar} width={20} height={20} alt="star3" />
            <Image src={SolidStar} width={20} height={20} alt="star4" />
            <Image src={SolidStar} width={20} height={20} alt="star5" />
        </div>
    );
}