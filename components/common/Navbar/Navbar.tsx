'use client'

import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Container, Logo, useUI } from '@/components/ui'
import { FiMenu } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  settings?: any
}

const Navbar = ({ settings }: NavbarProps) => {
  const { openSidebar } = useUI()
const pathname = usePathname()
  const navLinks = [
    {
      label: 'Blogs',
      href: '/blogs',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ]

  const links = navLinks
  return (
    <NavbarRoot>
      <Container className="">
        <div className={s.nav}>
          <div className="flex items-center justify-between w-full">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Logo className="max-w-[400px] w-full  text-accent-9" />
            </Link>
            <nav className={s.navMenu}>
              {links?.map((l) => (
                <Link href={l.href} key={l.href} className={cn(s.link, {
                  ['font-bold !text-accent-9 scale-110']: l.href === pathname
                } )}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <button
              onClick={() => openSidebar()}
              className="block ml-10 space-x-4 lg:hidden text-accent-9 text-4xl"
            >
              <FiMenu className="" />
            </button>
          </div>
        </div>
      </Container>
    </NavbarRoot>
  )
}

export default Navbar
