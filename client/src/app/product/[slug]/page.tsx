"use client";
import React from "react";
import PRODUCT from "@/data/product";
import Image from "next/image";
export default function Product({ params }: { params: { slug: string } }) {
    var { slug } = params;

    var product = PRODUCT.find((item) => item.id === parseInt(slug));

    return (
        <div className="px-[200px] mt-10 ">
            {product && (
                <div className="flex gap-10 bg-gray-200 text-black rounded-xl relative overflow-hidden hover:text-red-500 cursor-pointer ">
                    <div className="relative h-[500px] overflow-hidden w-[500px]">
                        <Image
                            src={product?.url}
                            fill
                            alt=""
                            className=" hover:scale-125 duration-500"
                        />
                    </div>
                    <div className="p-3 w-1/2">
                        <h1 className="text-lg line-clamp-2 mt-2">
                            {product?.name}
                        </h1>
                        <div className="flex gap-3 text-red-500 my-[50px]">
                            <h5 className="line-through text-gray-500">
                                {Intl.NumberFormat().format(product?.price)}
                            </h5>
                            <h3>
                                {Intl.NumberFormat().format(
                                    product.price -
                                        (product?.price * product?.discount) /
                                            100
                                )}
                                đ
                            </h3>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 ">
                            <div className="">{product?.star} Sao</div>
                            <div className="w-[1px] h-[20px] bg-gray-500 rounded-full"></div>
                            <div className="">{product?.rate} Đánh giá</div>
                            <div className="w-[1px] h-[20px] bg-gray-500 rounded-full"></div>
                            <div className="">{product?.sell} Lượt bán</div>
                        </div>
                        <div className="absolute top-[10px] left-0 bg-red-700 w-[50px] h-7 rounded-r-lg">
                            <div className="flex items-center justify-center w-full h-full text-white">
                                {product?.discount}%
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
