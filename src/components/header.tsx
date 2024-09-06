import React, { useEffect } from "react";
import { Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store";
import * as userStore from '../store/user';

const Header = () => {
    useEffect(() => {
        
    }, [])

    return (
        <>
            {/* <div className="h-[60px] bg-[#1B1B1B]">
                <p className="text-[26px] font-medium pt-4 pl-4">TNMZ</p>
            </div> */}
            <Outlet/>
        </>
    )
}

export default Header