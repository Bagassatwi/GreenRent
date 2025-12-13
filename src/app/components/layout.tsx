'use client';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React, { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';

export function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className='flex flex-col min-h-screen'>
      <div className=' flex-grow p-4'>
        <div className='relative mb-6'>
          <Input
            type='search'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                router.push(`/rentals?search=${searchTerm}`);
              }
            }}
            placeholder='Search for items...'
            className='focus:outline-none focus:border-green-700 w-full py-2 pl-10 pr-4 border-2 border-green-500 rounded-full'
          />
          <Search className='left-3 top-1/2 absolute text-gray-400 transform -translate-y-1/2' />
        </div>
        {children}
      </div>
    </div>
  );
}
