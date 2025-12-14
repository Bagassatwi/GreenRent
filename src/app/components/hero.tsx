import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Leaf, Recycle, TreePine, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className='bg-gradient-to-br from-green-50 to-green-100 sm:py-24 relative py-16 overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <Image
          src='/hero.png'
          alt='Nature background'
          fill
          objectFit='cover'
          className='opacity-20'
        />
      </div>
      <div className='sm:px-6 lg:px-8 container relative z-10 px-4 mx-auto'>
        <div className='lg:grid-cols-2 lg:gap-8 grid items-center gap-12'>
          <div className='max-w-2xl'>
            <h1 className='sm:text-5xl md:text-6xl text-4xl font-extrabold tracking-tight text-gray-900'>
              <span className='block text-green-600'>Eco-Friendly</span>
              <span className='block'>Outdoor Rentals</span>
            </h1>
            <p className='mt-4 text-xl text-gray-500'>
              Enjoy the outdoors responsibly. Rent high-quality gear for your
              adventures while reducing your environmental impact.
            </p>
            <div className='sm:flex-row flex flex-col gap-4 mt-8'>
              <Button
                size='lg'
                className='hover:bg-green-700 hover:opacity-100 bg-green-600'
              >
                <Link href='/rent'>Start Renting</Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='hover:bg-green-50 hover:opacity-100 text-green-600 border-green-600'
              >
                About Us
              </Button>
            </div>
          </div>
          <div className='sm:gap-6 grid grid-cols-2 gap-4'>
            <div className='bg-white/80 backdrop-blur-sm flex flex-col items-center p-6 text-center rounded-lg shadow-lg'>
              <Leaf className='w-12 h-12 mb-4 text-green-500' />
              <h3 className='text-lg font-semibold text-gray-900'>
                Eco-Conscious
              </h3>
              <p className='mt-2 text-sm text-gray-500'>
                Reduce waste by renting instead of buying
              </p>
            </div>
            <div className='bg-white/80 backdrop-blur-sm flex flex-col items-center p-6 text-center rounded-lg shadow-lg'>
              <Recycle className='w-12 h-12 mb-4 text-green-500' />
              <h3 className='text-lg font-semibold text-gray-900'>
                Sustainable
              </h3>
              <p className='mt-2 text-sm text-gray-500'>
                Support a circular economy model
              </p>
            </div>
            <div className='bg-white/80 backdrop-blur-sm flex flex-col items-center p-6 text-center rounded-lg shadow-lg'>
              <TreePine className='w-12 h-12 mb-4 text-green-500' />
              <h3 className='text-lg font-semibold text-gray-900'>
                Nature-Friendly
              </h3>
              <p className='mt-2 text-sm text-gray-500'>
                Minimize your impact on the environment
              </p>
            </div>
            <div className='bg-white/80 backdrop-blur-sm flex flex-col items-center p-6 text-center rounded-lg shadow-lg'>
              <ShieldCheck className='w-12 h-12 mb-4 text-green-500' />
              <h3 className='text-lg font-semibold text-gray-900'>
                Quality Gear
              </h3>
              <p className='mt-2 text-sm text-gray-500'>
                Access to top-notch outdoor equipment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
