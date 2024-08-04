
import ScrollXProducts from "@/components/ScrollXProducts";
import { BrandProductComponents } from "@/data/brand.definite";
import RatedStar from "@/components/RatedStar";

export default function Home() {
  return (
    <div>
      <div className="w-full h-[1080px] bg-secondary flex justify-between items-center px-24">
        <div className="flex flex-col text-left gap-4">
          <h3>NEW IN TOWN</h3>
          <h1>The New Beauty Collection</h1>
          <p>This new collection brings with it the most exciting <br /> lorem ipsum dolor sit amet.</p>
          <button className="primary w-1/3">Shop Now</button>
        </div>
        <div className=""></div>
      </div>
      <div className={"bg-cosmetic-home  h-[75vh] bg-cover bg-fixed bg-origin-content flex justify-between items-center"}>
        <div className="mx-20">
          <h3>NEW COLLECTION</h3>
          <h1 className="text-white">The Beauty <br /> collection that makes <br /> all the difference</h1>
          <p>This new collection brings with it the most exciting <br /> lorem ipsum dolor sit amet.</p>
          <button className="primary w-1/3">Shop Now</button>
        </div>
      </div>
      <div className="flex justify-between my-20 px-20">
        <div className="">
          <h4>JANE OLIVER</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <span></span>
        </div>
        <div className="ml-16 space-y-16">
          <div>
            <RatedStar/>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non ab consectetur delectus assumenda ullam quas voluptates soluta molestias molestiae vero! Aliquid repellat illo pariatur assumenda ab sint modi sunt alias.</p>
            <h4>JAMES OLIVER</h4>
            <span></span>
          </div>
          <div>
            <RatedStar/>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non ab consectetur delectus assumenda ullam quas voluptates soluta molestias molestiae vero! Aliquid repellat illo pariatur assumenda ab sint modi sunt alias.</p>
            <h4>JAMES OLIVER</h4>
            <span></span>
          </div>
          <div>
            <RatedStar/>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non ab consectetur delectus assumenda ullam quas voluptates soluta molestias molestiae vero! Aliquid repellat illo pariatur assumenda ab sint modi sunt alias.</p>
            <h4>JAMES OLIVER</h4>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}