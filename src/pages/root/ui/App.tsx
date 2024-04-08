import { useEffect } from 'react'
import { supabase } from '@/shared/api'
import { Outlet } from 'react-router-dom'
import { useSetAtom } from 'jotai';
import { userAtom } from '@/entities/auth/model/store';

export function App() {
  const setSession = useSetAtom(userAtom);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      setSession(session);
    })

    return () => data.subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='flex justify-center w-screen h-screen bg-white font-Pretendard text-neutral-900 dark:bg-stone-800 dark:text-stone-50'>
      <Outlet />
    </section>
  )
}