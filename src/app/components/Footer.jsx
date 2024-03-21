import Image from 'next/image'
import Logo from '../../logos/GS_logo_blanco.png'
import Link from 'next/link'


const Footer = () => {
    return (
        <footer className=" dark:bg-gray-900 footer">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-center">
                        <Image src={Logo} className="w-20" alt="Logo" priority />
                        </Link>
                     </div>
                    <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-2 justify-center">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Headquaters</h2>
                            <ul className="text-gray-500  font-medium">
                                <li className="mb-4">
                                    <p className="w-48">
                                    962 Fifth Avenue, 3rd Floor New York, NY10022
                                    </p>
                                </li>
                                <li>
                                    <p className="w-48">
                                    Hello@dynamiclayers.net
                                    (+123) 456 789 101
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Opening Hours</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li>
                                    <p>Monday - Friday 11:30am - 2:008pm</p>
                                </li>
                                <li>
                                    <p>Saturday – Monday: 9am – 8pm</p>
                                </li>
                                <li>
                                    <p>Monday - Friday 5:30am - 11:008pm</p>
                                </li>
                                <li>
                                    <p>Saturday - Sunday 4:30am - 1:00pm</p>
                                </li>
                            </ul>
                        </div>                        
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">©{new Date().getFullYear().toString()}
                      {" "}Golden Scissors™. Todos los derechos Reservados.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
