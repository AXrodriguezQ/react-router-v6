import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = ( { isAllowed, children, redirecTo='/landing' } ) => {

    if (!isAllowed) {
        return <Navigate to={redirecTo} />
    }


    return children ? children : <Outlet />
}
