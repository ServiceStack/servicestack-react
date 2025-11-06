import React from 'react'
import type { IconProps } from './types'
import type { ImageInfo } from '@/types'
import { leftPart } from '@servicestack/client'
import { assetsPathResolver } from '@/use/config'
import { iconOnError } from '@/use/files'
import { useMetadata } from '@/use/metadata'

export default function Icon({ image, svg, src, alt, type, className }: IconProps) {
  let resolvedImage: ImageInfo | undefined = image

  if (type) {
    const { typeOf } = useMetadata()
    const metaType = typeOf(type)
    if (!metaType) {
      console.warn(`Type ${type} does not exist`)
    }
    if (!metaType?.icon) {
      console.warn(`Type ${type} does not have a [Svg] icon`)
    } else {
      resolvedImage = metaType?.icon
    }
  }

  let resolvedSvg: string = svg || resolvedImage?.svg || ''
  const isSvg = resolvedSvg.startsWith('<svg ')

  if (isSvg) {
    let svgTag = leftPart(resolvedSvg, '>')
    let clsPos = svgTag.indexOf('class=')
    let cls = `${resolvedImage?.cls||''} ${className||''}`
    if (clsPos == -1) {
      resolvedSvg = `<svg class="${cls}" ${resolvedSvg.substring(4)}`
    } else {
      const clsQuotePos = clsPos+'class='.length+1
      resolvedSvg = `${resolvedSvg.substring(0,clsQuotePos) + cls} ${resolvedSvg.substring(clsQuotePos)}`
    }
    return <span dangerouslySetInnerHTML={{ __html: resolvedSvg }} />
  } else {
    return (
      <img
        className={`${resolvedImage?.cls || ''} ${className || ''}`}
        src={assetsPathResolver(src || resolvedImage?.uri)}
        alt={alt}
        onError={(e) => iconOnError(e.target as HTMLImageElement)}
      />
    )
  }
}
