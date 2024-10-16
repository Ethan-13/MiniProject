import React, { useEffect, useState } from "react";
import Bookingdashboard from "../../components/admin/Bookingdashboard";
import UsersDashboard from "../../components/admin/UsersDashboard";
import CreateNews from "../../components/admin/CreateNews";
import ManageNews from "../../components/admin/ManageNews";
import { message, Tabs } from "antd";
import "../../custom.css";
import {
  ClipboardDocumentListIcon,
  InformationCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { getallBookings, getAllUsers } from "../../apiEndpoints/admin";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../../store/loaderSlice";

const Adminpage = () => {
  const navigate = useNavigate();
  const [allusers, setAllusers] = useState([]);
  const [allbookings, setAllbookings] = useState([]);
  const dispatch = useDispatch();
  const fetchAllusers = async () => {
    try {
      // dispatch(setLoader(true));
      const response = await getAllUsers();

      if (response.isSuccess) {
        // message.success(response.message);
        setAllusers(response.allusers_DOC);
      } else {
        navigate("/");
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    // dispatch(setLoader(false));
  };
  const fetchallbookings = async () => {
    try {
      // dispatch(setLoader(true));
      const response = await getallBookings();

      if (response.isSuccess) {
        // message.success(response.message);
        setAllbookings(response.allBookings_doc);
      } else {
        navigate("/");
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    // dispatch(setLoader(false));
  };

  useEffect(() => {
    fetchAllusers();
    fetchallbookings();
  }, []);

  const items = [
    {
      key: "1",
      label: (
        <div className="p-4 flex items-center gap-2">
          <ClipboardDocumentListIcon className="w-6 h-6" />
          <p className="">Booking dashboard</p>
        </div>
      ),
      children: <Bookingdashboard allbookings={allbookings} />,
    },
    {
      key: "2",
      label: (
        <div className=" p-4 flex items-center gap-2">
          <UsersIcon className="w-6 h-6" />
          <p>Manage Users</p>
        </div>
      ),
      children: (
        <UsersDashboard allusers={allusers} fetchAllusers={fetchAllusers} />
      ),
    },

    {
      key: "3",
      label: (
        <div className=" p-4 flex items-center gap-2">
          <InformationCircleIcon className="w-6 h-6" />
          <p>Add News</p>
        </div>
      ),
      children: <CreateNews />,
    },

    {
      key: "4",
      label: (
        <div className=" p-4 flex items-center gap-2">
          <InformationCircleIcon className="w-6 h-6" />
          <p>Manage News</p>
        </div>
      ),
      children: <ManageNews />,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className=" my-10 font-semibold text-3xl">Admin dashboard</h1>
      <div className="mb-20">
        {" "}
        <Tabs items={items} className="font-medium" tabPosition="left"></Tabs>
      </div>
    </section>
  );
};

export default Adminpage;
