import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/userSlice";

const Toaster = () => {
  const { toasterData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('toasterData', toasterData);
    if (toasterData && toasterData?.type) {
      setTimeout(() => {
        dispatch(userActions.getToaster({ type: "", message: "" }));
      }, 3000);      
    }
  }, [toasterData, dispatch]);

  return createPortal(
    toasterData && toasterData?.type && (
      <div className={`toaster-container toaster-${toasterData?.type}`}>
        <span className="cross">
          <i class="fa-regular fa-circle-xmark"></i>
        </span>
        {toasterData?.message}
      </div>
    ),
    document.body
  );
};

export default Toaster;
