import iconLinks from "@/assets/asset";
import React, { JSX, useState } from "react";
import places  from '@/data/places.json'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"  
  

export interface IconComp {
    imgBounds?: Point
    adjust?: Point
    zScale?: number
}
export type Point = {
    x: number,
    y: number,
}

type IconObj = {
    name: string
    pos: Point,
    adjust?: Point,
}

const iconData: Array<IconObj> =[
    {name: "maple_bay", pos: {x:32.5, y:53.5}},
    {name: "sturgeon", pos: {x:52, y:56}},
    {name: "billington_bay", pos: {x:43, y:57}},
    {name: "oneida_river", pos: {x:1.5, y:20.5}},
    {name: "muskrat_bay", pos: {x:15, y:31}},
    // // Make custom size
    {name: "big_bay", pos: {x:7, y:17}},
]

type ResType = {
   title: string,
   desc: string,
   img: string
}

const Icons: React.FC<IconComp> = 
() => {
    const [curr, setCurr] = useState<ResType | null> (null)

     function  getBlurb(call: string) {
        for (let i = 0; i < places.length; i++){
            if (places[i].call_name == call){
                const res = {
                    title:places[i].title,
                    desc: places[i].desc,
                    img: iconLinks[places[i].call_name]
                } as ResType
                setCurr(res)
                return
            }
        }
    }

    let icons: JSX.Element[] = []
    icons = iconData.map(i => {
       return <div
       className="absolute !p-0"
       key={i.name}
       style={{
        left: `${i.pos.x}%`,
        top:  `${i.pos.y}%`,
        transform: `translate(-50%, -50%px)`,
    }}>
        <SheetTrigger style={{
            background:"transparent",
            padding: "0"
            
        }}>
            <img
            className="size-8"
            src={iconLinks[i.name]}
            alt={i.name}
            onClick={() => getBlurb(i.name)}
            />
        </SheetTrigger>
        </div>
        })


    return(
        <>
    <Sheet>
        {icons}
            <SheetContent>
                <SheetHeader>
                    <img src={curr?.img} alt={curr?.title} />
                    <SheetTitle>{curr?.title}</SheetTitle>
                    <SheetDescription>{curr?.desc}</SheetDescription>
                </SheetHeader>
            </SheetContent>
    </Sheet>
        </>
    )
}

export default Icons