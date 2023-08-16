"use client"

import { shimmer, toBase64 } from "@/lib/image"

import Image from "next/image"
import { SanityProduct } from "@/config/inventory"
import { urlForImage } from "@/sanity/lib/image"
import { useState } from "react"

interface Props {
  product: SanityProduct
}

export function ProductGallery({ product }: Props) {
  const [selectedImage, setSelectImage] = useState(0)

  return (
    <div className="flex flex-col-reverse">
      {/* Image Grid */}
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <ul className="grid grid-cols-4 gap-6">
          {product.images.map((image,idx) => (
            <div
              key={image._key as string}
              onClick={() => setSelectImage(idx)}
              className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase hover:bg-gray-50"
            >
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <Image
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(225, 280))}`}
                  src={urlForImage(image).url()}
                  width={200}
                  height={200}
                  alt={``}
                  className="h-full w-full object-cover object-center"
                />
              </span>
              {idx === selectedImage && (
                <span
                  className="pointer-events-none absolute inset-0 rounded-md ring-4 ring-indigo-500 ring-offset-2"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </ul>
      </div>

      {/* Main Image */}
      <div className="aspect-h-1 aspect-w-1 w-full">
        <Image
          priority
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(225, 280))}`}
          src={urlForImage(product.images[selectedImage]).url()}
          alt={`Main ${product.name} image`}
          width={600}
          height={750}
          className="h-full w-full border-2 border-gray-200 object-cover object-center shadow-sm dark:border-gray-800 sm:rounded-lg"
        />
      </div>
    </div>
  )
}
