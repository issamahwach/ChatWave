import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAlert, close } from "./alertSlice";

export default function Alert() {
  const open = useSelector((state: any) => state.alert.open);
  const message = useSelector((state: any) => state.alert.message);
  const dispatch = useDispatch();

  return (
    open && (
      <div
        className="fixed top-4 left-4 bg-red-500 w-32 z-50"
        onClick={() => dispatch(close())}
      >
        {message?.message}
      </div>
    )
  );
}
