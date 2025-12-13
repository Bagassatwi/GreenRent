'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu } from 'lucide-react';
import { useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const menus = [
  { title: 'Home', href: '/' },
  { title: 'Browse Items', href: '/rentals' },
  { title: 'My Rentals', href: '/lenders/dashboard' },
  { title: 'Start a Rent', href: '/rent' }
];

export function Header() {
  const { push } = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }

    window.addEventListener('scroll', () => {
      handleScroll();
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className='sticky top-0 z-[999] mx-auto flex w-full flex-col lg:relative bg-green-50'>
      <div
        className={cn(
          'mx-auto flex w-full origin-left py-4 px-12 bg-transparent justify-between',
          scrolled && 'lg:justify-center',
          isExpanded ? 'z-[100]' : 'z-[900]'
        )}
      >
        <Link href={'/'} className='lg:flex items-center justify-center hidden'>
          <Image
            src='/logo.png'
            alt='Logo GreenRent'
            height={50}
            width={120}
            className=' pointer-events-none h-[50px] w-[120px] '
          />
        </Link>
        <button
          className='lg:hidden block -ml-8'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Menu
            color='#ffffff'
            className='hover:opacity-50 stroke-green-800 h-full w-[40px]'
          />
        </button>
        {/* Sidebar */}
        <div
          className={cn(
            `fixed top-0 left-0 h-full transition-all duration-500 lg:hidden`,
            isExpanded ? 'z-[800]' : 'z-0'
          )}
        >
          {isExpanded && (
            <div
              className='fixed top-0 left-0 z-[799] h-full w-full bg-black/50 backdrop-blur-sm'
              onClick={() => setIsExpanded(false)}
            />
          )}
          <div
            className={cn(
              `z-[800] fixed top-0 left-0 h-full w-fit bg-green-800 transition-transform duration-500 `,
              isExpanded ? 'translate-x-0' : '-translate-x-full'
            )}
          >
            <div className='text-start flex flex-col items-start justify-start gap-2 pl-4 pr-16 my-4'>
              <button>
                <Menu
                  onClick={() => setIsExpanded(false)}
                  className='stroke-green-600 hover:opacity-50'
                  width={40}
                  height={40}
                />
              </button>
              {menus.map((navOption) => (
                <Link
                  key={navOption.title}
                  href={navOption.href}
                  className={cn(
                    `hover:text-green-300 rounded-xl text-center text-xl text-white transition-all duration-300`
                  )}
                  onClick={() => setIsExpanded(false)}
                >
                  {navOption.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Island */}
        <div
          className={cn(
            `lg:flex hidden items-center w-full justify-between transition-all duration-300 z-40 rounded-xl p-2`,
            scrolled
              ? 'max-w-[80dvw] fixed top-5 h-[65px] border-[0.5px] border-green-500 shadow-md bg-green-800'
              : 'max-w-3xl'
          )}
        >
          {scrolled && (
            <Link href='/'>
              <Image
                src={'/logo.png'}
                alt='Logo GreenRent'
                width={120}
                height={120}
                className={cn(
                  `pointer-events-none rounded-full w-full transition-all duration-300 object-fill ${
                    scrolled ?? 'w-0'
                  }`
                )}
              />
            </Link>
          )}
          {menus.map((menu) => (
            <Link
              key={menu.title}
              href={menu.href}
              className={cn(
                `rounded-md px-5 py-2 text-center transition-all duration-75 hover:opacity-50 hover:bg-opacity-20 `,
                scrolled && 'text-white'
              )}
            >
              {menu.title}
            </Link>
          ))}
        </div>
        <div className='lg:flex items-center hidden gap-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link
                href={'/profile'}
                className=' lg:inline-flex flex items-center justify-center'
              >
                <Avatar>
                  <AvatarImage
                    src={
                      session?.user?.image ?? `https://ui-avatars.com/api/?background=random&name=${session?.user?.name.replaceAll(" ","+")}`
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 mr-4 z-[1000]'>
              <DropdownMenuItem onClick={() => push('/profile')}>
                <button className='w-full text-start'>Profile</button>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                <button className='w-full text-start'>Log Out</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
