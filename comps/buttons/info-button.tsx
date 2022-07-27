import React from 'react'
import Link from 'next/link'

export type InfoButtonProps = {
  title: string
  body?: string
  href?: string
}

const InfoButton = ({ title, body, href }: InfoButtonProps): JSX.Element => {
  return href ? (
    <Link href={href}>
      <div className="">
        <div>{title}</div>
        <div>{body}</div>
      </div>
    </Link>
  ) : (
    <div className="">
      <div>{title}</div>
      <div>{body}</div>
    </div>
  )
}

export default InfoButton
