import React, { useState } from "react";
import dayjs from "dayjs";
import axios from "../utils/axiosInstance";
import { useShopStore } from "../store/shopStore";

export default function DateTimePicker() {
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime } =
    useShopStore();
  const today = dayjs().startOf("day");

  const [weekStart, setWeekStart] = useState(today);
  const [availability, setAvailability] = useState(null); // store availability for selected date
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    { label: "morning", title: "Morning", time: "8am - 11am" },
    { label: "lunch", title: "Lunch", time: "11am - 2pm" },
    { label: "afternoon", title: "Afternoon", time: "2pm - 5pm" },
  ];

  // Generate 7 days
  const getWeekDates = () => {
    return Array.from({ length: 7 }).map((_, i) => {
      const date = weekStart.add(i, "day");
      return {
        day: date.format("ddd"),
        dateNum: date.date(),
        month: date.format("MMM"),
        full: date.format("YYYY-MM-DD"),
      };
    });
  };

  // fetch availability for selected date
  const fetchAvailability = async (date) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/slots/check", { date });
      setAvailability(res.data.availability);
    } catch (err) {
      console.error("Error fetching availability", err);
      setAvailability(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* Calendar */}
      <h2 className="text-lg font-semibold mb-2">Select a fitting date:</h2>
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setWeekStart(weekStart.subtract(7, "day"))}
          className={`text-sm font-medium ${
            weekStart.isSame(today, "week") ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={weekStart.isSame(today, "week")}
        >
          &lt; Prev week
        </button>
        <button
          onClick={() => setWeekStart(weekStart.add(7, "day"))}
          className="text-sm font-medium"
        >
          Next week &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {getWeekDates().map((d) => {
          const isToday = dayjs(d.full).isSame(today, "day");
          const isPast = dayjs(d.full).isBefore(today, "day");
          const isSunday = d.day === "Sun";

          if (isPast && !isToday) return null;

          return (
            <button
              key={d.full}
              onClick={() => {
                setSelectedDate(d.full);
                setSelectedTime(null);
                fetchAvailability(d.full); // call backend with req.body { date }
              }}
              disabled={isToday || isSunday}
              className={`p-2 rounded-md border text-center ${
                selectedDate === d.full
                  ? "bg-red-400 border-red-500"
                  : isToday || isSunday
                  ? "bg-gray-200 border-gray-300 cursor-not-allowed"
                  : "bg-white border-gray-300"
              }`}
            >
              <div className="text-sm font-semibold">{d.day}</div>
              <div className="text-lg">{d.dateNum}</div>
              <div className="text-xs">{d.month}</div>
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      {selectedDate && (
        <>
          <h3 className="text-lg font-semibold mt-6 mb-2">
            Preferred service time:
          </h3>

          {loading ? (
            <p>Loading availability...</p>
          ) : availability ? (
            <>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.label}
                    onClick={() => setSelectedTime(slot.label)}
                    disabled={availability[slot.label] <= 0}
                    className={`p-3 rounded-md border text-center ${
                      selectedTime === slot.label
                        ? "bg-red-400 border-red-500"
                        : availability[slot.label] > 0
                        ? "bg-white border-gray-300"
                        : "bg-gray-200 border-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <div className="font-semibold">{slot.title}</div>
                    <div className="text-sm">{slot.time}</div>
                    <div
                      className={`text-xs mt-1 ${
                        availability[slot.label] === 1
                          ? "text-red-500 font-bold"
                          : "text-gray-500"
                      }`}
                    >
                      {availability[slot.label]} slots left
                    </div>
                  </button>
                ))}
              </div>

              {/* Flexible option */}
              <button
                onClick={() => setSelectedTime("flexible")}
                disabled={availability.flexible <= 0}
                className={`mt-4 w-full p-3 rounded-md font-semibold ${
                  selectedTime === "flexible"
                    ? "bg-red-400 border-red-500"
                    : availability.flexible > 0
                    ? "bg-gray-200"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                I'm flexible{" "}
                <span className="font-normal text-sm">
                  (anytime 8am - 5pm){" "}
                  <span className="bg-green-500 rounded-4xl">-$10 *</span>
                </span>
                <div className="text-xs mt-1 text-gray-600">
                  {availability.flexible} slots left
                </div>
              </button>
            </>
          ) : (
            <p>No availability data</p>
          )}
        </>
      )}
    </div>
  );
}
