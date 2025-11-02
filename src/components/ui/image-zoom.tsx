"use client";
 
import Image from 'next/image'
import { Plus } from 'lucide-react'

import React from "react";
import Zoom from "react-medium-image-zoom"; 
import "react-medium-image-zoom/dist/styles.css";

export const Component = () => {  
  return (
    <div >
       <div className="border-brand/10 relative mx-auto my-6 flex h-[336px] max-w-[250px] flex-col items-start border p-4 md:h-[28rem] md:max-w-sm">
                        <Plus
                            strokeWidth={0.5}
                            className="text-[#fff200] absolute -left-4 -top-4 h-8 w-8"
                        />
                        <Plus
                            strokeWidth={0.5}
                            className="text-[#fff200] absolute -bottom-4 -left-4 h-8 w-8"
                        />
                        <Plus
                            strokeWidth={0.5}
                            className="text-[#fff200] absolute -right-4 -top-4 h-8 w-8"
                        />
                        <Plus
                            strokeWidth={0.5}
                            className="text-[#fff200] absolute -bottom-4 -right-4 h-8 w-8"
                        />
                        <ImageZoom>
                            <Image
                                src="/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp"
                                alt="Subham Mahapatra"
                                height={1500}
                                width={1500}
                                className="h-[300px] w-full object-cover md:h-[404px]"
                                priority
                            />
                            <div className="relative -mt-14 bg-gradient-to-b from-black/0 to-black text-white md:-mt-24">
                                <h1 className="z-20 items-center text-center text-[40px] font-black tracking-tighter md:text-[70px]">Subham</h1>{' '}
                            </div>
                        </ImageZoom>
                    </div>
    </div>
  );
};


type ImageZoomProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof Zoom>;

const ImageZoom = (props: ImageZoomProps) => {
  const { children, ...rest } = props;

  return (
    <Zoom 
      zoomMargin={40} 
      {...rest}
    >
      {children}
    </Zoom>
  );
};

export {ImageZoom};