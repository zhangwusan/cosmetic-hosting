import AnimeGirl from "@/public/images/anime-girl.webp";
import Image from "next/image";

export default function About() {
    return (
        <div className="mx-4">
            <div className="bg-i05 h-[600px] bg-cover">
                <div className="flex h-full flex-col justify-center px-12">
                    <h3 className="text-gray-200 font-extralight">A FEW WORDS</h3>
                    <h1 className="text-gray-200">ABOUT US</h1>
                </div>
            </div>
            <div className="flex gap-4 justify-between py-24 mx-48">
                <div className="space-y-4">
                    <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima excepturi, iste architecto doloremque error, maiores tenetur commodi exercitationem sit eveniet aut quae totam</h3>
                    <p>Lorem Exercitationem Cupiditate Neque? Iste Voluptas.</p>
                    <div className="border-b border-primary w-24"></div>
                </div>
                <div className="space-y-4">
                    <h3>Cras ut ultricies risus. Etiam ac malesuada lectus. Sed congue nisi vitae lorem ullamcorper laoreet. In eget tellus mauris. Phasellus id ligula.</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus eget enim eget tincidunt. In finibus nisi ex, eu interdum urna euismod sit amet. Morbi sollicitudin in magna sed tristique. Nulla pharetra sapien eros, sit amet bibendum nibh consectetur quis. Curabitur tortor dolor, fringilla eu fringilla id, dignissim in urna.

                        Morbi sollicitudin in magna sed tristique. Nulla pharetra sapien eros, sit amet bibendum nibh consectetur quis. Curabitur tortor dolor, fringilla eu fringilla id.</p>
                </div>
            </div>
            <div className="bg-i04 h-[800px] bg-cover">
                <div className="text-center h-full flex flex-col justify-end items-center py-12 space-y-4">
                    <h3 className="text-4xl text-gray-200">About Our Products</h3>
                    <span className="border-b border-white w-24"></span>
                    <p className="w-1/3 text-gray-200">Proin at velit sed elit varius porttitor. Ut a suscipit quam, eu congue odio. Sed eget viverra est. Vivamus ut sodales neque. Sed vel dui et dolor placerat egestas id lacinia mauris</p>
                </div>
            </div>
            <div className="flex justify-center items-center mx-48">
                <Image
                    src={AnimeGirl}
                    alt="avatar"
                    height={700}
                    width={700}
                />
                <div className="h-[700px] bg-secondary-light text-right flex flex-col justify-center space-y-4 px-12">
                    <span>ABOUT ME</span>
                    <h1>Hi, I&apos;m You!</h1>
                    <h3>I&apos;m a 21 years old woman entrepreneur, living in Cambodia</h3>
                    <div className="relative h-1 before:w-12 before:border-b-2 before:border-white before:absolute before:right-0"></div>
                    <p>Sed ut fringilla dolor. Morbi suscipit a nunc eu finibus. Nam rutrum mattis velit eget volutpat. Fusce egestas mi urna, id pulvinar ipsum dictum eget. Mauris in dolor velit. Vestibulum finibus felis non massa commodo molestie at id justo. Quisque sollicitudin elit sit amet facilisis euismod. Fusce at arcu sed.</p>
                    <p>Nam rutrum mattis velit eget volutpat. Fusce egestas mi urna, id pulvinar ipsum dictum eget.</p>
                </div>
            </div>
        </div>
    );
}
