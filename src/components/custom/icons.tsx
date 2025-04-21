import iconLinks from "@/assets/asset";
import React, { JSX, useEffect, useState } from "react";
import places  from '@/data/places.json'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    // SheetTrigger,
  } from "@/components/ui/sheet"
  
  

export interface IconComp {
    imgBounds: Point
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
    {name: "maple_bay", pos: {x:3455, y:210}},
    {name: "sturgeon", pos: {x:5345, y:280}},
    {name: "billington_bay", pos: {x:4635, y:480}},
    {name: "oneida_river", pos: {x:150, y:-1620}},
    {name: "muskrat_bay", pos: {x:1250, y:-1120}},
    // Make custom size
    {name: "big_bay", pos: {x:800, y:-1920}},
]

type ResType = {
   title: string,
   desc: string,
   call_name: string 
}

const Icons: React.FC<IconComp> = 
({imgBounds, adjust, zScale}) => {
    const [curr, setCurr] = useState<ResType | null> (null)

    useEffect(() => {
    }, [adjust])

     function  getBlurb(call: string) {
        for (let i = 0; i < places.length; i++){
            if (places[i].call_name == call){
                setCurr(places[i])
                return
            }
        }
    }


    let icons: JSX.Element[] = []
    icons = iconData.map(i => {
        let offset: Point = {x:0, y:0}
        let zoom = 1
        if(adjust){
            offset = adjust
        }        
        if(zScale){
            zoom = zScale
        }     
        
       return <div
       className="absolute !p-0 transform-transition duration-300 ease"
       key={i.name}
       style={{
        transformOrigin: "top left",
        left: `${i.pos.x*imgBounds.x * zoom}px`,
        top: `${i.pos.y * imgBounds.y * zoom}px`,
        zIndex: 1,
        transform: `translate(${offset?.x}px, ${offset?.y}px)`,
    }}>
        <SheetTrigger className="" style={{
            background:"transparent"
        }}>
            <img
            className="size-10 p-0"
            src={iconLinks[i.name]}
            alt={i.name}
            onClick={() => getBlurb(i.name)}
            />
        </SheetTrigger>
        </div>
        })


    return(
        <>
        {/* <Popover>
            <PopoverTrigger>
                {icons}
            </PopoverTrigger>
            <PopoverContent>
                {curr?.desc}
            </PopoverContent>
        </Popover> */}
    <Sheet>
        {icons}
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{curr?.title}</SheetTitle>
                    <SheetDescription>{curr?.desc}</SheetDescription>
                </SheetHeader>
            </SheetContent>
    </Sheet>
        </>
    )
}

export default Icons