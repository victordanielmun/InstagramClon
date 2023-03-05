import Image from "next/legacy/image";
import React from "react";

export default function Header() {
  return (
    <div>
      {/*left logo*/}
        <div className="flex items-center justify-between max-w-6xl">
        <div className=" cursor-pointer h-24 w-24 relative hidden lg:inline-grid ">
            <Image 
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
             layout='fill' 
             className="object-contain"
            />
        </div>
        <div className=" cursor-pointer h-24 w-10 relative lg:hidden ">
            <Image 
             src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png"
             layout='fill' 
             className="object-contain"
            />
        </div>

        </div>

        

      {/*center search*/}


      {/*right perfil*/}
    </div>
  );
}
