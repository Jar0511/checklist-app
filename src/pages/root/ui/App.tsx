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
    <section className='font-Pretendard'>
      <Outlet />
    </section>
  )
}