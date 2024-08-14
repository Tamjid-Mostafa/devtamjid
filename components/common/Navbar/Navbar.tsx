'use client'

import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Container, Logo, useUI } from '@/components/ui'
import { FiMenu } from 'react-icons/fi'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  settings?: any
}

const Navbar = ({ settings }: NavbarProps) => {
  const { openSidebar } = useUI()
  console.log('Navbar', settings)
  const navLinks = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
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
      <Container clean className="mx-auto max-w-8xl md:px-20 px-6">
        <div className={s.nav}>
          <div className="flex items-center justify-between w-full">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Logo className="max-w-[400px] w-full h-16" />
            </Link>
            <nav className={s.navMenu}>
              {links?.map((l) => (
                <Link href={l.href} key={l.href} className={s.link}>
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
