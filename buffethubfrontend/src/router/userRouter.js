import { lazy, Suspense } from "react"

const Loading = <div>Loading...</div>
const Login = lazy(() => import("../page/user/LoginPage")) 

const userRouter = () => {

  return [
    {
      path:"login",
      element: <Suspense fallback={Loading}><Login/></Suspense>
    }
  ]
}

export default userRouter;