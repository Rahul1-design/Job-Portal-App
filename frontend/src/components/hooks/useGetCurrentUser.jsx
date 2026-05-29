import { setUser } from "@/redux/authSlice";
import { persistor } from "@/redux/store";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        console.log(error);
        dispatch(setUser(null));
        await persistor.purge();
        console.log("Session expired or user not logged in");
      }
    };
    fetchUserData();
  }, [dispatch]);
};

export default useGetCurrentUser;
