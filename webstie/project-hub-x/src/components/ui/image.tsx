import { forwardRef, type ImgHTMLAttributes, useEffect, useState } from 'react'
import './image.css'

const FALLBACK_IMAGE_URL = "/error.svg";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fittingType?: 'fill' | 'fit' | 'cover' | 'contain'
  originWidth?: number
  originHeight?: number
  focalPointX?: number
  focalPointY?: number
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(({ src, fittingType = 'cover', style, ...props }, ref) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src)

  useEffect(() => {
    // If src prop changes, update the imgSrc state
    setImgSrc((prev) => {
      if (prev !== src) {
        return src
      }
      return prev
    })
  }, [src])

  if (!src) {
    return <div data-empty-image ref={ref} {...props} style={{ ...style, backgroundColor: '#f0f0f0' }} />
  }

  const imageProps = { 
    ...props, 
    onError: () => setImgSrc(FALLBACK_IMAGE_URL),
    style: {
      ...style,
      objectFit: fittingType === 'fill' ? 'fill' : fittingType === 'fit' ? 'contain' : fittingType,
    }
  }

  return <img data-error-image={imgSrc === FALLBACK_IMAGE_URL} ref={ref} src={imgSrc} {...imageProps} />
})
Image.displayName = 'Image'
