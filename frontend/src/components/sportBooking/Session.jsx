import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedTime } from "../../store/bookingSlice";
import { setSportType } from "../../store/bookingSlice";
import { getdiff_Bookings } from "../../apiEndpoints/booking";
import { message } from "antd";
// import { setSportType } from "../../store/typeSlice";

const Session = ({ session_time, sportType, bookings }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setSession = (time) => {
    dispatch(setSelectedTime(time));
    dispatch(setSportType(sportType));
    navigate("/bookingform");
  };
  // const { selectedTime } = useSelector((state) => state.booking);
  // console.log(selectedTime);
  const [infos, setInfos] = useState([]);
  console.log(sportType);
  const fetchBookings = async () => {
    try {
      const response = await getdiff_Bookings(sportType);
      // console.log(response.bookings);
      if (response.isSuccess) {
        message.success(response.message);
        setInfos(response.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  useEffect(() => {
    if (sportType) {
      fetchBookings();
    }
  }, [sportType]);
  console.log(infos);
  return (
    <div className="flex  gap-3 mt-6">
      {session_time.map((time, index) => (
        <div key={index} className="p-3  w-[210px]  bg-gray-600">
          <div className="text-black p-2 font-semibold flex items-center justify-between">
            <span>{time}</span>
            <button
              className="border border-black p-1 "
              onClick={() => setSession(time)}
            >
              Book
            </button>
          </div>
          <hr />
          {/* Display the bookings for each session */}
          <div className="ml-4">
            {/* infos htl ka time twy htl mhr session_time nk tuu pee book htr tr twy ko pya */}
            {infos[time] && infos[time].length > 0 ? (
              infos[time].map((booking, i) => (
                <div key={i} className="py-2">
                  <p>{booking.name}</p>
                </div>
              ))
            ) : (
              <p>No bookings for this time</p> // Handle empty session bookings
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Session;