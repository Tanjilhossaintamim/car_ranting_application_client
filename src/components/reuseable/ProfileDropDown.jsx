import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/loginSlice";
import { getProfileinfo } from "../../redux/profilSlice";
import { Link } from "react-router-dom";

const ProfileDropDown = () => {
  const dispatch = useDispatch();
  const { profile, is_owner } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getProfileinfo());
  }, []);
  return (
    <div className="flex-none gap-2">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            {profile.image ? (
              <img src="" />
            ) : (
              <img src="https://img.favpng.com/17/24/10/computer-icons-user-profile-male-avatar-png-favpng-jhVtWQQbMdbcNCahLZztCF5wk.jpg" />
            )}
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <Link to={"/myprofile"} className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          {is_owner && (
            <li>
              <Link to={"/myproduct"}>Your Products</Link>
            </li>
          )}

          <li onClick={() => dispatch(logout())}>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDropDown;
