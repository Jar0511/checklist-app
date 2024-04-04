// FSD의 최상층 레이어인 app에는 앱의 진입점(entry point)과 앱의 라우트 구성 등 앱 전반에 대한 구성이 포함된다.
import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import { supabase } from '@/shared/api'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
    })

    return () => data.subscription.unsubscribe();
  }, []);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>{import.meta.env.MODE}</p>
    </>
  )
}

export default App
