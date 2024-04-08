import { useEffect } from 'react'
import { supabase } from '@/shared/api'
import { Outlet } from 'react-router-dom'

export function App() {
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
    })

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <section className='flex justify-center w-screen h-screen bg-white font-Pretendard text-neutral-900 dark:bg-stone-800 dark:text-stone-50'>
      <Outlet />
    </section>
  )
}