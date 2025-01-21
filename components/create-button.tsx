'use client'

import Link from "next/link"

export const CreateButton = () => {
  return (
    <Link href={'/create'} className="bg-transparent w-fit h-fit p-0 rounded-3xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-20 text-white"
        >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
      </svg>
    </Link >
  )
}
