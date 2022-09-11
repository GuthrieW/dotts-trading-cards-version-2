import React from 'react'
import ShinyImage from '../images/shiny-image'

export type InfoButtonProps = {
  title: string
  body?: string
  href?: string
  imageUrl?: string
}

const InfoButton = ({
  title,
  body,
  href,
  imageUrl,
}: InfoButtonProps): JSX.Element => {
  if (href && imageUrl) {
    return (
      <a
        href={href}
        title={body}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer"
      >
        <ShinyImage imageUrl={imageUrl} />
      </a>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className="flex justify-center items-center cursor-pointer border-neutral-600 bg-slate-500 rounded m-2 "
      >
        <div>{title}</div>
        <div>{body}</div>
      </a>
    )
  }

  return (
    <div>
      <div>{title}</div>
      <div>{body}</div>
    </div>
  )
}

export default InfoButton
