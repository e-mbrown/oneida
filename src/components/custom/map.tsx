import oneida from '@/assets/oneida.svg'
import React, { useEffect, useState, useRef} from 'react'
import Icons from '@/components/custom/icons'

const originalSvg = {width: 10670, height: 5714}
const Map: React.FC = function() {
    // const [scale, setScale] = useState(1)
    const [pos, setPos] = useState({x: 0, y: 0})
    const [startPos, setStartPos] = useState({x: 1, y: 1})
    const [drag, setDrag] = useState(false)
    const [divS, setdivS] = useState<{x: number, y: number}>({x:1,y:1})
    const [scale, setScale] = useState<{x: number, y: number}>({x:1,y:1})
    const image = useRef<HTMLImageElement | null >(null);
    const overlay = useRef<HTMLDivElement | null >(null);

    // const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3))
    // const zoomOut = () => setScale((prev) => Math.max(prev - 0.2,1))
    // const reset = () => setScale(1)

    useEffect(()=> {
        const img = image.current
        const ovlay = overlay.current

        if (!img || !ovlay) return

        const updateScale = () => {
            if (scale.x != img.clientWidth/originalSvg.width){
                setScale({
                    x: img.clientWidth / originalSvg.width,
                    y: img.clientHeight / originalSvg.height,
                })
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
    }


    const endDrag = () => setDrag(false)
    return(
        <div className='flex'>
            <div className='flex w-[65dvw] h-auto border cursor-grab active:cursor-grabbing relative
            justify-center items-center overflow-visible min-w-150'
                draggable="true"
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
                        transform: `translate(${pos.x}px, ${pos.y}px)`,
                    }}
                    onLoad={() => {
                        const event = new Event('resze')
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
                    <Icons imgBounds = {scale}/>
                } 
                </div> 
            </div>
            </div>
    )
}

export default Map