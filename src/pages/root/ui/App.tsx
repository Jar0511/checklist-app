import { useEffect } from 'react'
import { supabase } from '@/shared/api'
import { Outlet, useLocation, useNavigate, useRevalidator } from 'react-router-dom'
import { useAtom } from 'jotai';
import { userAtom, SESSION_KEY, detectSessionAtom } from '@/entities/auth';
import { USER_KEY, getMyInfo, userInfoAtom } from '@/entities/user';

export function App() {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [session, setSession] = useAtom(userAtom);
  const [detectSession, setDetectSession] = useAtom(detectSessionAtom);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const revalidate = useRevalidator();

  // 세션 구독
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if(event == "SIGNED_OUT") {
        setSession(null);
      } else {
        if(
          event == "INITIAL_SESSION" ||
          event == "SIGNED_IN"
        ) {
          setDetectSession(true);
        }
        setSession(session);
      }
    })

    return () => {
      data.subscription.unsubscribe();
      setSession(null);
      setUserInfo(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 세션 여부에 따른 리다이렉트 처리
  useEffect(() => {
    if(detectSession) {
      const _local = JSON.parse(localStorage.getItem(SESSION_KEY) ?? 'null');
      if(pathname.includes("auth") && !!session) {
        return navigate("/room/list");
      }else if(!pathname.includes("auth") && (!session && !_local)) {
        return navigate("/auth/login");
      }

      setDetectSession(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, pathname, detectSession]);

  // 세션 여부에 따른 사용자 정보 처리
  useEffect(() => {
    const _local = JSON.parse(localStorage.getItem(USER_KEY) ?? 'null');
    if(!!session && !_local) {
      (async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {_id, user_role, ...rest} = await getMyInfo(session.user.id);
        setUserInfo(rest);
      })()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, session]);

  // window focus 이벤트 발생할 때마다(활성화된 창으로 돌아올 때마다) loader 재호출
  useEffect(() => {
    const reload = () => revalidate.revalidate();
    window.addEventListener("focus", reload);
    return () => window.removeEventListener("focus", reload);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='flex justify-center w-screen h-screen bg-white font-Pretendard text-neutral-900 dark:bg-stone-900 dark:text-stone-50'>
      <Outlet />
    </section>
  )
}