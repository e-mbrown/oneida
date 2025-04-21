import oneida from '@/assets/oneida.svg'
import React, { useEffect, useState, useRef} from 'react'
import Icons, { IconComp, Point} from '@/components/custom/icons'

const originalSvg = {width: 10670, height: 5714}
const Map: React.FC = function() {
    const [zScale, setzScale] = useState(1)
    const [pos, setPos] = useState({x: 0, y: 0})
    const [startPos, setStartPos] = useState({x: 1, y: 1})
    const [drag, setDrag] = useState(false)
    const [divS, setdivS] = useState<{x: number, y: number}>({x:1,y:1})
    const [scale, setScale] = useState<IconComp>({imgBounds: {x:1,y:1} as Point})
    const image = useRef<HTMLImageElement | null >(null);
    const overlay = useRef<HTMLDivElement | null >(null);

    useEffect(()=> {
        const img = image.current
        const ovlay = overlay.current

        if (!img || !ovlay) return

        const updateScale = () => {
            if (scale.imgBounds.x != img.clientWidth/originalSvg.width){
                const scaleChg = scale
                scaleChg.imgBounds = {
                    x: img.clientWidth / originalSvg.width,
                    y: img.clientHeight / originalSvg.height,
                }

                setScale(scaleChg)
            }
            if (divS.x != img.clientWidth){
                setdivS({
                    x: img.clientWidth,
                    y: img.clientHeight,
                })
            }
        }

        const resizeObserver = new ResizeObserver(() => {
            updateScale()
        })

        resizeObserver.observe(img)
        return () => {
            resizeObserver.disconnect()
        }
    },[scale, divS])

    const handleZoom = (e: React.WheelEvent) => {
        e.preventDefault()
        const zoom = 0.1
        const newzScale = Math.min(Math.max(0.5, zScale-e.deltaY * zoom *0.01), 5)

        setzScale(newzScale)

        if (image.current){console.log({
            scale: zScale,
            newheight: {x:image.current?.clientWidth*zScale, y: image.current?.clientHeight * zScale},
            newX: 3455 * zScale,
            scaleX: 3455 * zScale *scale.imgBounds.x,
        })}
        
    }
    const initDrag = (e: React.MouseEvent) => {
        e.preventDefault()
        setDrag(true);
        setStartPos({x: e.clientX - pos.x, y: e.clientY - pos.y})
    }

    const onDrag = (e: React.MouseEvent) => {
        if (!drag) return;
        setPos({
            x: (e.clientX - startPos.x),
            y: (e.clientY - startPos.y)
        })
        const iconMvmt = scale
        iconMvmt.adjust = pos
        setScale(iconMvmt)
    }


    const endDrag = () => setDrag(false)
    return(
        <div className='flex'>
            <div className='flex w-[65dvw] h-auto border cursor-grab active:cursor-grabbing relative
            justify-center items-center overflow-visible min-w-150'
                draggable="true"
                onWheel={handleZoom}
                onMouseDown={initDrag}
                onMouseMove={onDrag}
                onMouseLeave={endDrag}
                onMouseUp= {endDrag}               
            >
                <img 
                    ref={image}
                    src={oneida} 
                    alt="Pannable Map of Oneida lake."
                    className='block h-auto absolute transform-transition duration-300 ease'
                    style={{
                        transform: `translate(${pos.x}px, ${pos.y}px) scale(${zScale})`,
                    }}
                    onLoad={() => {
                        const event = new Event('resize')
                        window.dispatchEvent(event)
                    }}
                />
                <div
                    ref= {overlay}
                    className='Icon absolute top-0 left-0'
                    style={{
                        width: divS.x,
                        height: divS.y,
                    }}
                >
                    {scale &&
                    <Icons imgBounds = {scale.imgBounds} adjust={scale.adjust} zScale={zScale}/>
                } 
                </div> 
            </div>
            </div>
    )
}

export default Map