import Link from 'next/link'
import { Moirai_One } from 'next/font/google'

const moiraiOne = Moirai_One({
  weight: '400',
  subsets: ['latin'],
})

export const Logo = () => {
  return (
    <Link
      className={`${moiraiOne.className} text-6xl font-bold self-start absolute top-2 left-2 text-yellow-500`}
      href="/"
    >
      Yello
    </Link>
  )
}
