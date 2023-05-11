import { Login } from "../components/login"
import { Main } from "../components/main"
import { Route, Routes} from 'react-router-dom'

export const AppRoutes = () => {
    return(
        <Routes>
            <Route path={'/'} element={<Login/>}></Route>
            <Route path={'/Home'} element={<Main/>}></Route>
        </Routes>
    )
}