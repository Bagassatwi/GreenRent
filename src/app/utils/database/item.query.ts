import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { ItemWithRentalCounts } from '@/types/entities';

export const findItem = async (where: Prisma.ItemWhereUniqueInput) => {
  return await prisma.item.findUnique({
    where: {
      ...where,
      is_deleted: false
    }
  });
};

export const findItemRentalCount = async (
  where: Prisma.ItemWhereUniqueInput
) => {
  const itemId = where.id;
  const ownerId = where.owner_id;

  if (!itemId) {
    throw new Error('Item ID is required');
  }

  const item = await prisma.item.findUnique({
    where: { id: itemId, is_deleted: false, owner_id: ownerId }
  });

  if (!item) {
    return null;
  }

  const result = await prisma.$queryRaw<
    {
      pending: number;
      confirmed: number;
      ongoing: number;
      completed: number;
      cancelled: number;
    }[]
  >(
    Prisma.sql`
    SELECT 
        COUNT(CASE WHEN status = 'PENDING' THEN 1 END) AS pending,
        COUNT(CASE WHEN status = 'CONFIRMED' THEN 1 END) AS confirmed,
        COUNT(CASE WHEN status = 'ONGOING' THEN 1 END) AS ongoing,
        COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) AS completed,
        COUNT(CASE WHEN status = 'CANCELLED' THEN 1 END) AS cancelled
    FROM "Rental"
    WHERE item_id = ${itemId}
    `
  );

  return {
    ...item,
    rental_counts: result[0]
  } as ItemWithRentalCounts;
};

export const findAllItems = async ({
  search,
  where
}: {
  search?: Prisma.ItemWhereInput;
  where?: Prisma.ItemWhereInput;
}) => {
  return await prisma.item.findMany({
    where: {
      ...(search?.name || search?.category
        ? {
          OR: [
            search.name
              ? { name: { contains: search.name, mode: 'insensitive' } }
              : undefined,
            search.category
              ? { category: { contains: search.category } }
              : undefined
          ].filter(Boolean) as Prisma.ItemWhereInput[]
        }
        : {}),
      is_deleted: false,
      ...where
    },
    orderBy: {
      created_at: 'asc'
    }
  });
};

export const createItem = async (data: Prisma.ItemCreateInput) => {
  return await prisma.item.create({ data });
};

export const updateItem = async (
  where: Prisma.ItemWhereUniqueInput,
  data: Prisma.ItemUpdateInput
) => {
  return await prisma.item.update({
    where,
    data
  });
};

export const deleteItem = async (where: Prisma.ItemWhereUniqueInput) => {
  return await prisma.item.delete({
    where
  });
};
