'use client'
 
import Image from 'next/image'
import Logo from '../../logos/GS_logo.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()
  return (
    <header >
        <nav className="bg-white border-gray-200 navegacion">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image src={Logo} className="w-20" alt="Logo" priority />
            </Link>
            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 dark:text-gray-400 dark:hover:bg-gray-700 " aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto links" id="navbar-default">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900">
                <li  className={`block py-2 px-3 md:p-0  md:border-none border-b border-b-gray-900 ${ pathname === '/servicios' ? 'activo': ''}`}>
                  <Link href="/servicios">Servicios</Link>
                </li>
                <li  className={`block py-2 px-3 md:p-0  md:border-none border-b border-b-gray-900 ${ pathname === '/nosotros' ? 'activo': ''}`}>
                  <Link href="/nosotros" >Nosotros</Link>
                </li>
                <li className={`block py-2 px-3 md:p-0  md:border-none border-b border-b-gray-900 ${ pathname === '/blog' ? 'activo': ''}`}>
                  <Link href="/blog" >Blog</Link>
                </li>
                <li className={`block py-2 px-3 md:p-0  md:border-none border-b border-b-gray-900 ${ pathname === '/login' ? 'activo': ''}`}>  
                  <Link href="/login" >Iniciar Sesión</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav> 
    </header>
  )
}

export default Header
