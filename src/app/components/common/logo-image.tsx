"use client";

import Image, { ImageLoader } from "next/image";
import clsx from "clsx";

type LogoImageProps = {
    size?: number;
    className?: string;
    priority?: boolean;
    alt?: string;
};

const localLoader: ImageLoader = ({ src }) => src;

export function LogoImage({
    size = 36,
    className,
    priority = false,
    alt = "Логотип",
}: LogoImageProps) {
    return (
        <Image
            loader={localLoader}
            src="/images/logo.png"
            alt={alt}
            width={size}
            height={size}
            className={clsx("object-contain", className)}
            priority={priority}
            unoptimized
        />
    );
}


