import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Star, Recycle, CloudOff } from 'lucide-react';
import { formatToIDR } from '@/helper/formatToIDR';
import type { allItems } from '@/types/entities';

export function ItemCard({
  id,
  name,
  category,
  image_url,
  rent_price,
  reviews,
  dailyCarbonSaving,
  dailyWasteReduction
}: allItems) {
  let allRating = 0;
  let averageRating = 0;
  if (reviews) {
    reviews.map((item) => (allRating += item.rating));
    averageRating = allRating / Number(reviews.length);
  }

  return (
    <Card className='overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 grid grid-rows-[1fr_auto_auto] '>
      <CardHeader className='p-0'>
        <div className='relative h-48 w-full flex justify-center'>
          <Image
            src={image_url || '/placeholder.svg'}
            alt={name}
            fill
            className='transition-all object-cover size-full duration-300 hover:opacity-90'
          />
          <div className='absolute top-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
            {formatToIDR(rent_price)}/day
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-4'>
        <CardTitle className='text-lg font-semibold text-gray-800 mb-2 two-line-truncate break-all'>
          {name}
        </CardTitle>
        <p className='text-sm text-gray-600 mb-2'>{category}</p>
        <div className='flex items-center text-green-600 mb-2'>
          <Leaf className='w-4 h-4 mr-1' />
          <span className='text-xs'>Eco-friendly rental</span>
        </div>
        <div className='flex items-center text-blue-600 mb-2'>
          <CloudOff className='w-4 h-4 mr-1' />
          <span className='text-xs'>
            {dailyCarbonSaving.toFixed(2)} kg CO2 saved/day
          </span>
        </div>
        <div className='flex items-center text-orange-600 mb-2'>
          <Recycle className='w-4 h-4 mr-1' />
          <span className='text-xs'>
            {dailyWasteReduction.toFixed(2)} kg waste reduced/day
          </span>
        </div>
        {averageRating > 0 ? (
          <div className='flex items-center mt-2'>
            {Array.from([1, 2, 3, 4, 5]).map((_item, index) => {
              return (
                <Star
                  key={index}
                  className='w-4 h-4 mr-1 text-green-500'
                  fill={index >= Math.round(averageRating) ? 'none' : 'green'}
                />
              );
            })}
            <span className='text-sm text-gray-700'>
              {averageRating.toFixed(1)} ({reviews?.length} reviews)
            </span>
          </div>
        ) : (
          <div className='flex items-center mt-2'>
            <span className='text-sm text-gray-700'>No Reviews Yet</span>
          </div>
        )}
      </CardContent>
      <CardFooter className='p-4 pt-0'>
        <Link href={`/rentals/${id}`} className='w-full'>
          <Button className='w-full bg-green-600 hover:bg-green-700 text-white'>
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
