import React from 'react'

type DashboardButtonProps = {
  title: string
  body?: string
  href: string
}

const DashboardButton = ({ title, body, href }: DashboardButtonProps) => (
  <a
    href={href}
    className="flex flex-col justify-start items-start cursor-pointer bg-neutral-500 hover:bg-neutral-800 text-white rounded m-2 w-3/4 h-20"
  >
    <div className="text-lg m-2">{title}</div>
    <div className="text-md ml-4">{body}</div>
  </a>
)

export default DashboardButton
