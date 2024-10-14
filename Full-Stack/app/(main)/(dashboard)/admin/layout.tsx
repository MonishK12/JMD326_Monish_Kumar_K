import { isAdmin } from '@/lib/admin';
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'

const AdminLayout = ({children}: {children: React.ReactNode}) => {
  const {userId} = auth();
  
  if (!isAdmin(userId)) {
    redirect("/")
  }

  return (
    <>
      {children}
    </>
  )
}

export default AdminLayout