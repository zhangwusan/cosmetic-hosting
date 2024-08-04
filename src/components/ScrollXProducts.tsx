"use client"

import Image from "next/image";
import { CSSProperties, useEffect, useRef, useState } from "react";

interface BrandProductType {
    id: string;
    name: string;
    image: string;
    price: number;
}


interface BrandProductProps {
    products: BrandProductType[];
    className?: string;
    widthComponent?: number;
    heightComponent?: number;
    isNextBackButton?: boolean;
    isDotScolling?: boolean;
    classNameComponent?: string;
    styleButtonNext?: CSSProperties;
    styleButtonBack?: CSSProperties;
}

const ScrollXProducts: React.FC<BrandProductProps> = ({ 
    products, 
    className, 
    classNameComponent ,
    widthComponent = 400, 
    heightComponent = 400, 
    isNextBackButton = false, 
    isDotScolling = false,
    styleButtonBack = {
        position: "absolute",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        background: "#ff0099",
        textAlign: "center",
        top: "50%",
        transform: "translateY(-50%)"
    },
    styleButtonNext = {
        position: "absolute",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        background: "#ff0099",
        textAlign: "center",
        right: "0",
        top: "50%",
        transform: "translateY(-50%)",
    }
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [numberInViewPort, setNumberInViewPort] = useState(1);

    const handleWheel = (event: WheelEvent) => {
        if (scrollContainerRef.current) {
            event.preventDefault();
            scrollContainerRef.current.scrollLeft += event.deltaY;
        }
    };

    const handleDotClick = (index: number) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                left: index * widthComponent,
                behavior: "smooth"
            });
        }
    };

    const handleNextClick = () => {
        if (scrollContainerRef.current) {
            const newIndex = activeIndex === products.length - 1 ? 0 : activeIndex + 1;
            scrollContainerRef.current.scrollTo({
                left: newIndex * widthComponent,
                behavior: "smooth"
            });
        }
    };

    const handleBackClick = () => {
        if (scrollContainerRef.current) {
            const newIndex = activeIndex === 0 ? products.length - 1 : activeIndex - 1;
            scrollContainerRef.current.scrollTo({
                left: newIndex * widthComponent,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        container?.addEventListener('wheel', handleWheel);

        const handleScroll = () => {
            if (container) {
                const scrollLeft = container.scrollLeft;
                const newActiveIndex = Math.round(scrollLeft / widthComponent);
                setActiveIndex(newActiveIndex);
            }
        };

        container?.addEventListener('scroll', handleScroll);

        return () => {
            container?.removeEventListener('wheel', handleWheel);
            container?.removeEventListener('scroll', handleScroll);
        };
    }, [widthComponent]);

    useEffect(() => {
        const updateNumberInViewPort = () => {
            if (scrollContainerRef.current) {
                const newNumberInViewPort = Math.round((scrollContainerRef.current.offsetWidth / widthComponent) - 0.5);
                setNumberInViewPort(newNumberInViewPort);
            }
        };

        updateNumberInViewPort();
        window.addEventListener('resize', updateNumberInViewPort);

        return () => {
            window.removeEventListener('resize', updateNumberInViewPort);
        };
    }, [widthComponent]);


    return (
        <div className={`${className} relative`}>
            {isNextBackButton && (
                <div style={styleButtonBack}>
                    <button onClick={handleBackClick} disabled={activeIndex === 0}>&lt;</button>
                </div>
            )}
            <div ref={scrollContainerRef} className="overflow-x-auto scrollbarX duration-200">
                <div className="flex space-x-4">
                    {products.map((product) => (
                        product.image ? (
                            <div key={product.id} className="flex-shrink-0 snap-center" style={{ width: widthComponent, height:heightComponent }}>
                                <Image src={product.image} alt={product.name} className={classNameComponent} />
                            </div>
                        ) : (
                            <div key={product.id}>
                                <div className="flex-shrink-0 snap-center" style={{ width: widthComponent, height: heightComponent }}>
                                    <div className={classNameComponent} style={{ width:widthComponent, height:heightComponent }} >
                                        <span className="text-2xl font-bold">{product.name}</span>
                                    </div>
                                </div>
                            </div>
                        )

                    ))}
                </div>
            </div>
            { isDotScolling && (
                <div className="flex justify-center space-x-2 mt-4">
                {products.map((_, index) => (
                    index < products.length - numberInViewPort + 1 && (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`h-1 w-1 p-0 m-0 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                        ></button>
                    )
                ))}
            </div>
            )}
            
            {isNextBackButton && (
                <div style={styleButtonNext}>
                    <button onClick={handleNextClick} disabled={activeIndex === products.length - 1}>&gt;</button>
                </div>
            )}


        </div>
    );
};

export default ScrollXProducts;



























// import { useEffect, useRef, useState } from "react";
// import { BrandProductType } from "@/data/brand.definite";

// interface BrandProductProps {
//     products: BrandProductType[];
//     className?: string;
//     widthComponent?: number;
//     heightComponent?: number;
//     isNextBackButton?: boolean;
// }

// const ScrollXProducts: React.FC<BrandProductProps> = ({ products, className, widthComponent = 400, heightComponent = 400 }) => {
//     const scrollContainerRef = useRef<HTMLDivElement>(null);
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [numberInViewPort, setNumberInViewPort] = useState(1);

//     const handleWheel = (event: WheelEvent) => {
//         if (scrollContainerRef.current) {
//             event.preventDefault();
//             scrollContainerRef.current.scrollLeft += event.deltaY;
//         }
//     };

//     const handleDotClick = (index: number) => {
//         if (scrollContainerRef.current) {
//             scrollContainerRef.current.scrollTo({
//                 left: index * widthComponent,
//                 behavior: "smooth"
//             });
//         }
//     };

//     useEffect(() => {
//         const container = scrollContainerRef.current;
//         container?.addEventListener('wheel', handleWheel);

//         const handleScroll = () => {
//             if (container) {
//                 const scrollLeft = container.scrollLeft;
//                 const newActiveIndex = Math.round(scrollLeft / widthComponent);
//                 setActiveIndex(newActiveIndex);
//             }
//         };

//         container?.addEventListener('scroll', handleScroll);

//         return () => {
//             container?.removeEventListener('wheel', handleWheel);
//             container?.removeEventListener('scroll', handleScroll);
//         };
//     }, [widthComponent]);

//     useEffect(() => {
//         const updateNumberInViewPort = () => {
//             if (scrollContainerRef.current) {
//                 const newNumberInViewPort = Math.round(scrollContainerRef.current.offsetWidth / widthComponent) - 1;
//                 setNumberInViewPort(newNumberInViewPort);
//             }
//         };

//         updateNumberInViewPort();
//         window.addEventListener('resize', updateNumberInViewPort);

//         return () => {
//             window.removeEventListener('resize', updateNumberInViewPort);
//         };
//     }, [widthComponent]);

//     return (
//         <div className={`${className}`}>
//             <div ref={scrollContainerRef} className="overflow-x-auto scrollbarX">
//                 <div className="flex space-x-4">
//                     {products.map((product) => (
//                         <div key={product.id} className="flex-shrink-0 snap-center" style={{ width: widthComponent }}>
//                             <img src={product.image} alt={product.name} className={`h-[${heightComponent}px] w-[${widthComponent}px] bg-orange-400`} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="flex justify-center space-x-2 mt-4">
//                 {products.map((_, index) => (
//                     index < products.length - numberInViewPort + 1 && (
//                         <button
//                             key={index}
//                             onClick={() => handleDotClick(index)}
//                             className={`h-1 w-1 p-0 m-0 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
//                         ></button>
//                     )
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ScrollXProducts;