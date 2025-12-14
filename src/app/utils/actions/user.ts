'use server';
import { revalidatePath } from 'next/cache';
import { createUser, resetPassword, updateUser } from '../database/user.query';
import { compareHash, encrypt } from '../bcrypt';
import prisma from '@/lib/prisma';

export const handleUserSignup = async (formData: FormData) => {
  try {
    const hashedPassword = await encrypt(formData.get('password') as string);
    const userData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: hashedPassword
    };

    await createUser(userData);
    revalidatePath('/', 'layout');
    return { success: true, message: 'Berhasil membuat user' };
  } catch (error) {
    //@ts-expect-error error type
    if (error.code === 'P2002') {
      return {
        success: false,
        message: 'Email sudah terdaftar'
      };
    }
    console.log(error);

    return { success: false, message: 'Gagal membuat user' };
  }
};

export const handleUpdateUser = async (id: string, data: FormData) => {
  const name = data.get('name') as string;
  const email = data.get('email') as string | null;

  const updateData: { name: string; email?: string } = {
    name: name
  };

  if (email) {
    updateData.email = email;
  }
  const response = await updateUser({ id }, updateData);
  revalidatePath('/');
  return response;
};

export const handleResetPassword = async (
  id: string,
  oldPassword: string,
  newPassword: string
) => {
  const password = await prisma.user.findUnique({
    where: { id },
    select: {
      password: true
    }
  });
  if (!password) {
    return { message: 'an unexpected error occured', success: false };
  }
  const passwordMatch = await compareHash(oldPassword, password.password!);
  if (!passwordMatch) {
    return { message: 'Password Do Not Match!', success: false };
  }
  const newPasswordHashed = await encrypt(newPassword);
  const response = await resetPassword({ id }, { password: newPasswordHashed });
  return { message: 'Password Reset Successfull!', success: true, response };
};
