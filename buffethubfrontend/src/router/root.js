import userRouter from "./userRouter.js";

const { createBrowserRouter} = require("react-router-dom");


const root = createBrowserRouter([
  {
    path: "user",
    children: userRouter()
  }
])

export default root;