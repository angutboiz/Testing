"use client";
import React, { useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import PRODUCT from "@/data/product";
import Link from "next/link";
import axios from "axios";

import useStore from "@/lib/store";
import envConfig from "@/config";

const fetchUserInfo = async (setUser: any) => {
  try {
    const response = await axios.get(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/users`,
      { withCredentials: true }
    );
    if (response.status === 200) {
      setUser(response.data);
    } else {
      setUser(null);
    }
  } catch (error) {
    setUser(null);
  }
};

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const { setUser, user } = useStore();
  useEffect(() => {
    fetchUserInfo(setUser);
  }, [setUser]);

  return (
    <div className="px-[70px] mt-10">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {PRODUCT.map((item: any, index: any) => (
            <CarouselItem key={index} className="basis-1/4">
              <Link
                href={`product/${item.id}`}
                className="block bg-white text-black rounded-xl relative overflow-hidden hover:text-red-500 cursor-pointer"
              >
                <div className=" relative h-[300px] overflow-hidden ">
                  <Image
                    src={item.url}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt=""
                    className=" hover:scale-125 duration-500"
                  />
                </div>
                <div className="p-3">
                  <h1 className="text-sm line-clamp-2 mt-2">{item.name}</h1>
                  <div className="flex gap-3 text-red-500 my-2">
                    {/* <h5 className="line-through text-gray-500">{Intl.NumberFormat().format(item.price)}</h5>
                                        <h3>{Intl.NumberFormat().format(item.price - (item.price * item.discount) / 100)}đ</h3> */}
                    <h5 className="line-through text-gray-500">{item.price}</h5>
                    <h3>{item.price - (item.price * item.discount) / 100}đ</h3>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
                    <div className="">{item.star} Sao</div>
                    <div className="w-[1px] h-[20px] bg-gray-500 rounded-full"></div>
                    <div className="">{item.rate} Đánh giá</div>
                    <div className="w-[1px] h-[20px] bg-gray-500 rounded-full"></div>
                    <div className="">{item.sell} Lượt bán</div>
                  </div>
                  <div className="absolute top-[10px] left-0 bg-red-700 w-[50px] h-7 rounded-r-lg">
                    <div className="flex items-center justify-center w-full h-full text-white">
                      {item.discount}%
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
