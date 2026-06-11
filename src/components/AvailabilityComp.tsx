import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, PlusCircle } from "lucide-react";

type Availability = {
  id: number;
  available_days: string; // JSON string from backend
};

const AvailabilityPage: React.FC = () => {
  const [dates, setDates] = useState<string[]>([]);
  const [inputDate, setInputDate] = useState("");
  const [data, setData] = useState<Availability[]>([]);

  const API = import.meta.env.VITE_BACKEND_URL; // adjust if needed

  // Fetch all availability
  const fetchAvailability = async () => {
    try {
      const res = await axios.get(`${API}/api/v1/availability`);
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  // Add date to list
  const handleAddDate = () => {
    if (!inputDate) return;
    setDates([...dates, inputDate]);
    setInputDate("");
  };

  // Submit availability
  const handleSubmit = async () => {
    if (!dates.length) return;

    try {
      await axios.post(`${API}/api/v1/availability`, { dates });
      setDates([]);
      fetchAvailability();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete record
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API}/api/v1/availability/${id}`);
      fetchAvailability();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Availability Manager</h1>

      {/* Add Dates */}
      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <div className="flex gap-2 mb-3">
          <input
            type="date"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAddDate}
            className="bg-blue-500 text-white px-3 rounded flex items-center gap-1"
          >
            <PlusCircle size={18} /> Add
          </button>
        </div>

        {/* Selected Dates */}
        <div className="flex flex-wrap gap-2 mb-3">
          {dates.map((d, i) => (
            <span
              key={i}
              className="bg-gray-900 px-3 py-1 rounded-full text-sm"
            >
              {d}
            </span>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Availability
        </button>
      </div>

      {/* List */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="font-semibold text-black mb-3">All Availability</h2>

        {data.map((item) => {
          const parsedDates: string[] = JSON.parse(item.available_days);

          return (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div className="flex flex-wrap gap-2">
                {parsedDates.map((d, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                  >
                    {d}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailabilityPage;