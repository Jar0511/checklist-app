import { useEffect } from 'react'
import { supabase } from '@/shared/api'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai';
import { userAtom, SESSION_KEY } from '@/entities/auth';

export function App() {
  const [session, setSession] = useAtom(userAtom);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      setSession(session);
    })

    return () => {
      data.subscription.unsubscribe();
      setSession(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // 세션 여부에 따른 리다이렉트 처리
  useEffect(() => {
    const _local = localStorage.getItem(SESSION_KEY)
    if(pathname.includes("auth") && !!session) {
      return navigate("/");
    }else if(!pathname.includes("auth") && (!session && !_local)) {
      return navigate("/auth/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, pathname, SESSION_KEY]);

  return (
    <section className='flex justify-center w-screen h-screen bg-white font-Pretendard text-neutral-900 dark:bg-stone-900 dark:text-stone-50'>
      <Outlet />
    </section>
  )
}