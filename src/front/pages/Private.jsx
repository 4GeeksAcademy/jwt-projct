import React, { useEffect, useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { getUser } from '../hooks/actions';

export const Private = () => {
  const { store, dispatch } = useGlobalReducer();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !store.access_token) {
      getUser(dispatch, token);
    }
  }, []);

  useEffect(() => {
    if (!store.user) {
      setMessage("You must login");
    } else {
      setMessage(`Hello, user #${store.user}`);
    }
  }, [store.user]);

  return (
    <div className="text-center mt-5">
      {message}
    </div>
  );
};