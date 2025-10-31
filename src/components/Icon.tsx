import type { IconProps } from '@/components/types'
import { leftPart } from '@servicestack/client'
import { assetsPathResolver } from '@/use/config'
import { iconOnError } from '@/use/files'
import { useMetadata } from '@/use/metadata'

export default function Icon({ image, svg: svgProp, src, alt, type, className, ...attrs }: IconProps & { className?: string }) {
    let imageInfo = image
    
    if (type) {
        const { typeOf } = useMetadata()
        const metaType = typeOf(type)
        if (!metaType) {
            console.warn(`Type ${type} does not exist`)
        }
        if (!metaType?.icon) {
            console.warn(`Type ${type} does not have a [Svg] icon`)
        } else {
            imageInfo = metaType?.icon
        }
    }
    
    let svg: string = svgProp || imageInfo?.svg || ''
    const isSvg = svg.startsWith('<svg ')
    
    if (isSvg) {
        let svgTag = leftPart(svg, '>')
        let clsPos = svgTag.indexOf('class=')
        let cls = `${imageInfo?.cls || ''} ${className || ''}`
        if (clsPos === -1) {
            svg = `<svg class="${cls}" ${svg.substring(4)}`
        } else {
            const clsQuotePos = clsPos + 'class='.length + 1
            svg = `${svg.substring(0, clsQuotePos) + cls} ${svg.substring(clsQuotePos)}`
        }
        return <span dangerouslySetInnerHTML={{ __html: svg }} />
    } else {
        return (
            <img 
                className={`${imageInfo?.cls || ''} ${className || ''}`}
                src={assetsPathResolver(src || imageInfo?.uri)}
                alt={alt}
                onError={(e) => iconOnError(e.target as HTMLImageElement)}
                {...attrs}
            />
        )
    }
}

