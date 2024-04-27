"use client";

import { Axios } from "@/helper/axios";
import React, { createContext, useReducer, useState, useContext } from "react";

const initialState = {
  id_guru: 0,
  id_kelas: 0,
  id_mapel: 0,
  tanggal: "",
  materi: "",
  crateAbsen: () => {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      Axios.post("/absens", {
        id_guru: action.payload.id_guru,
        id_kelas: action.payload.id_kelas,
        id_mapel: action.payload.id_mapel,
        tanggal: action.payload.tanggal,
        materi: action.payload.materi,
      });
    case "SET":
      return {
        ...state,
        id_guru: Number(action.payload.id_guru),
        id_kelas: Number(action.payload?.id_kelas),
        id_mapel: Number(action.payload?.id_mapel),
        tanggal: action.payload?.tanggal,
        materi: action.payload?.materi,
      };
    default:
      return state;
  }
};

export const CreateAbsenContext = createContext(initialState);
export const useConfirmation = () => useContext(CreateAbsenContext);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [confirmation, setConfirmation] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const showConfirmation = (title, message, onConfirm) => {
    setConfirmation({ show: true, title, message, onConfirm });
  };

  const hideConfirmation = () => {
    setConfirmation({
      show: false,
      title: "",
      message: "",
      onConfirm: () => {},
    });
  };
  return (
    <CreateAbsenContext.Provider
      value={{
        state,
        dispatch,
        confirmation,
        showConfirmation,
        hideConfirmation,
      }}
    >
      {children}
    </CreateAbsenContext.Provider>
  );
};
