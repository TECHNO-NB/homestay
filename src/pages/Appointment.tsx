// @ts-nocheck
import { useEffect, useState } from "react";
import {
  Sparkles,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Leaf,
  Star,
  MapPin,
  MessageSquare,
  X,
} from "lucide-react";
import axios from "axios";

const services = [
  {
    id: "personalized-goal",
    name: "Personalized Goal Focused consultation",
    duration: "30 min",
    price: "—",
    icon: "🧴",
    desc: "One-on-one expert analysis of your skin type, concerns, and goals.",
  },

  // Advanced Facial Treatments
  {
    id: "microdermabrasion",
    name: "Microdermabrasion",
    duration: "60 min",
    price: "$80",
    icon: "💧",
    desc: "Exfoliates dead skin cells to improve tone, texture, and radiance.",
  },
  {
    id: "microdermabrasion-collagen",
    name: "Microdermabrasion + Collagen Mask",
    duration: "45 min",
    price: "$110",
    icon: "✨",
    desc: "Enhances hydration, firmness, and post-treatment glow.",
  },
  {
    id: "microdermabrasion-hyaluronic",
    name: "Microdermabrasion + Hyaluronic Acid Mask",
    duration: "45 min",
    price: "$99",
    icon: "💡",
    desc: "Provides deep hydration to plump and soothe the skin.",
  },

  // Microchanneling Treatments
  {
    id: "microchanneling-serum",
    name: "Microchanneling with Serum Infusion",
    duration: "45 min",
    price: "$200",
    icon: "🌿",
    desc: "Stimulates natural skin repair to improve texture, fine lines, acne scars, and hyperpigmentation.",
  },
  {
    id: "microdermabrasion-microchanneling",
    name: "Microdermabrasion + Microchanneling Combo",
    duration: "60 min",
    price: "$250",
    icon: "🪷",
    desc: "Combines exfoliation and microchanneling for advanced skin rejuvenation.",
  },
  {
    id: "microchanneling-hair",
    name: "Microchanneling for Hair Loss / Thinning",
    duration: "60 min",
    price: "$275",
    icon: "🌸",
    desc: "Stimulates scalp and hair follicles, enhances serum absorption, and supports healthier, denser hair growth.",
  },
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
];

const skinConcerns = [
  "Acne",
  "Aging",
  "Hyperpigmentation",
  "Dryness",
  "Sensitivity",
  "Uneven Tone",
  "Large Pores",
  "Redness",
];

function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`transition-all duration-500 rounded-full flex items-center justify-center text-xs font-bold
              ${
                i < current
                  ? "w-7 h-7 bg-rose-400 text-white"
                  : i === current
                    ? "w-9 h-9 bg-linear-to-br from-[#FFD700] to-[#FFD700] text-white shadow-lg shadow-rose-200 scale-110"
                    : "w-7 h-7 bg-rose-100 text-rose-300"
              }`}
          >
            {i < current ? <CheckCircle2 size={14} /> : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className={`h-0.5 w-8 rounded transition-all duration-500 ${i < current ? "bg-rose-400" : "bg-rose-100"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ServiceCard({ service, selected, onSelect }: any) {
  return (
    <button
      onClick={() => onSelect(service.id)}
      className={`group relative p-4 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5
        ${
          selected
            ? "border-rose-400 bg-linear-to-br from-rose-50 to-pink-50 shadow-lg shadow-rose-100"
            : "border-stone-100 bg-white hover:border-rose-200"
        }`}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-2xl">{service.icon}</span>
        {selected && (
          <div className="w-5 h-5 rounded-full bg-rose-400 flex items-center justify-center">
            <CheckCircle2 size={12} className="text-white" />
          </div>
        )}
      </div>
      <div className="font-semibold text-stone-800 text-sm">{service.name}</div>
      <div className="text-xs text-stone-400 mt-0.5">{service.desc}</div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-stone-400 flex items-center gap-1">
          <Clock size={11} /> {service.duration}
        </span>
        <span
          className={`text-sm font-bold ${selected ? "text-rose-500" : "text-stone-600"}`}
        >
          {service.price}
        </span>
      </div>
    </button>
  );
}

function CalendarPicker({ selectedDate, onSelect }: any) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [availableDates, setAvailableDates] = useState<string[]>([]);


  const API = import.meta.env.VITE_BACKEND_URL; // adjust if needed

  // 📡 Fetch availability
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await axios.get(`${API}/api/v1/availability`);

        // flatten all dates
        const allDates: string[] = res.data.data.flatMap((item: any) =>
          JSON.parse(item.available_days),
        );

        setAvailableDates(allDates);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAvailability();
  }, []);




  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  const formatDate = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const date = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${date}`;
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  // ❌ disable if not in available dates OR past OR Sunday
  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const formatted = formatDate(day);

    return (
      d < new Date(today.setHours(0, 0, 0, 0)) ||
      d.getDay() === 0 ||
      !availableDates.includes(formatted)
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    const d = new Date(viewYear, viewMonth, day);
    return d.toDateString() === selectedDate.toDateString();
  };

  const isAvailable = (day: number) => {
    return availableDates.includes(formatDate(day));
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1.5 hover:bg-rose-50 rounded">
          <ChevronLeft size={16} />
        </button>

        <span className="text-sm font-semibold text-stone-700">
          {monthNames[viewMonth]} {viewYear}
        </span>

        <button onClick={nextMonth} className="p-1.5 hover:bg-rose-50 rounded">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-xs text-stone-400">
            {d}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={i} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const disabled = isDisabled(day);
          const selected = isSelected(day);
          const available = isAvailable(day);

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => onSelect(new Date(viewYear, viewMonth, day))}
              className={`h-8 rounded-lg text-xs font-medium transition
                ${
                  selected
                    ? "bg-linear-to-br from-rose-400 to-pink-500 text-white"
                    : disabled
                      ? "text-stone-200 cursor-not-allowed"
                      : available
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "text-stone-400"
                }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Appointment() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [concerns, setConcerns] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [step, submitted]);

    const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
  if (!selectedDate) {
    setBookedTimes([]);
    return;
  }

  const fetchAvailabilityTime = async () => {
    try {

      const formattedDate = selectedDate.toISOString().split("T")[0]; // ✅ FIX

      const res = await axios.post(`${API}/api/v1/availability/time`, {
        date: formattedDate, // ✅ send correct format
      });


      const booked = res.data.data.map((item) => item.booking_time);

      setBookedTimes(booked);
    } catch (err) {
      console.error(err);
    }
  };

  fetchAvailabilityTime();
}, [selectedDate]);

  const toggleConcern = (c) =>
    setConcerns((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );

  const validateStep = () => {
    if (step === 0 && !selectedService) return false;
    if (step === 1 && (!selectedDate || !selectedTime)) return false;
    if (step === 2) {
      const e = {};
      if (!form.name.trim()) e.name = true;
      if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = true;
      if (!form.phone.trim()) e.phone = true;
      setErrors(e);
      return Object.keys(e).length === 0;
    }
    return true;
  };

  const next = () => {
    if (validateStep()) setStep((s) => s + 1);
  };
  const back = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    if (validateStep()) {
      let getSelectedServices = services.filter(
        (val) => val.id === selectedService,
      );

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/bookings`,
        {
          service_id: getSelectedServices[0].id,
          service_name: getSelectedServices[0].name,
          service_price: getSelectedServices[0].price,
          service_duration: getSelectedServices[0].duration,
          booking_date: selectedDate,
          booking_time: selectedTime,
          concerns,
          ...form,
        },
      );
      setSubmitted(true);
    }
  };


const formatTo24Hour = (time) => {
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":");

  hours = parseInt(hours);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }

  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${minutes}:00`;
};


const formatServerTime = (time) => {
  let [timePart] = time.split(" ");
  let [hours, minutes] = timePart.split(":");

  hours = String(parseInt(hours)).padStart(2, "0");

  return `${hours}:${minutes}:00`;
};


  const service = services.find((s) => s.id === selectedService);

  if (submitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-rose-50 via-pink-50 to-stone-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-linear-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
              <Leaf size={14} className="text-white" />
            </div>
            <span className="text-lg font-bold text-stone-800 tracking-wide">
              DermaGlow<span className="text-rose-400">RN</span>
            </span>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-rose-100 p-8">
            <div className="w-20 h-20 bg-linear-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={36} className="text-rose-400" />
            </div>
            <h2 className="text-2xl font-bold text-stone-800 mb-2">
              You're Booked!
            </h2>
            <p className="text-stone-400 text-sm mb-6">
              A confirmation has been sent to your email.
            </p>

            <div className="bg-linear-to-br from-rose-50 to-pink-50 rounded-2xl p-5 text-left space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Sparkles size={14} className="text-rose-400" />
                </div>
                <div>
                  <div className="text-xs text-stone-400">Service</div>
                  <div className="text-sm font-semibold text-stone-700">
                    {service?.name}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Calendar size={14} className="text-rose-400" />
                </div>
                <div>
                  <div className="text-xs text-stone-400">Date & Time</div>
                  <div className="text-sm font-semibold text-stone-700">
                    {selectedDate?.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    · {selectedTime}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <MapPin size={14} className="text-rose-400" />
                </div>
                <div>
                  <div className="text-xs text-stone-400">Location</div>
                  <div className="text-sm font-semibold text-stone-700">
                    Salon And Spa Galleria 1953 golden heights rd Suite #105
                    Fort Worth Texas 76177
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={14}
                  className="text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <p className="text-xs text-stone-400">
              "Your skin deserves the best care."
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-20">
      {/* Decorative blobs */}
      <div className="fixed top-0 right-0 w-72 h-72 bg-rose-200 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <div className="w-9 h-9 bg-linear-to-br from-[#FFD700] to-[#FFD700] rounded-xl flex items-center justify-center shadow-lg shadow-rose-200">
              <Leaf size={16} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-stone-800 tracking-wide">
              DermaGlow<span className="text-[#FFD700]">RN</span>
            </span>
          </div>
          <p className="text-stone-400 text-sm">
            Personalized skincare · Book your glow session
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-rose-100/50 border border-white overflow-hidden">
          <div className=" p-2  md:p-8">
            <StepIndicator current={step} total={4} />

            {/* Step 0: Choose Service */}
            {step === 0 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-stone-800 mb-1">
                    Choose Your Treatment
                  </h2>
                  <p className="text-stone-400 text-sm">
                    Select the service that best matches your skin goals
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {services.map((s) => (
                    <ServiceCard
                      key={s.id}
                      service={s}
                      selected={selectedService === s.id}
                      onSelect={setSelectedService}
                    />
                  ))}
                </div>

                {/* Skin concerns */}
                <div className="mt-6">
                  <p className="text-sm font-semibold text-stone-600 mb-3">
                    Any specific concerns?{" "}
                    <span className="font-normal text-stone-400">
                      (optional)
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skinConcerns.map((c) => (
                      <button
                        key={c}
                        onClick={() => toggleConcern(c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                          ${
                            concerns.includes(c)
                              ? "bg-rose-400 text-white shadow-md shadow-rose-200"
                              : "bg-rose-50 text-stone-500 hover:bg-rose-100"
                          }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Date & Time */}
            {step === 1 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-stone-800 mb-1">
                    Pick a Date & Time
                  </h2>
                  <p className="text-stone-400 text-sm">
                    Choose your preferred appointment slot
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-stone-600 mb-2 flex items-center gap-1.5">
                      <Calendar size={14} className="text-rose-400" /> Date
                    </p>
                    <CalendarPicker
                      selectedDate={selectedDate}
                      onSelect={setSelectedDate}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-600 mb-2 flex items-center gap-1.5">
                      <Clock size={14} className="text-rose-400" /> Available
                      Times
                    </p>
                    {selectedDate && (
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((t) => {
                          const formatted = formatServerTime(t);
                          const isBooked = bookedTimes.includes(formatted);

                          return (
                            <button
                              key={t}
                              onClick={() => !isBooked && setSelectedTime(t)}
                              disabled={isBooked}
                              className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all duration-200
        ${
          selectedTime === t
            ? "bg-linear-to-br from-rose-400 to-pink-500 text-white shadow-md shadow-rose-200"
            : isBooked
              ? "bg-stone-100 text-stone-300 cursor-not-allowed"
              : "bg-stone-50 text-stone-500 hover:bg-rose-50 hover:text-rose-500 border border-stone-100"
        }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {selectedDate && (
                      <p className="text-xs text-stone-400 mt-3 flex items-center gap-1">
                        <Calendar size={11} />
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Personal Info */}
            {step === 2 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-stone-800 mb-1">
                    Your Details
                  </h2>
                  <p className="text-stone-400 text-sm">
                    We need a little info to confirm your booking
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      key: "name",
                      label: "Full Name",
                      placeholder: "Jane Smith",
                      icon: User,
                      type: "text",
                    },
                    {
                      key: "email",
                      label: "Email Address",
                      placeholder: "jane@email.com",
                      icon: Mail,
                      type: "email",
                    },
                    {
                      key: "phone",
                      label: "Phone Number",
                      placeholder: "+1 (555) 000-0000",
                      icon: Phone,
                      type: "tel",
                    },
                  ].map(({ key, label, placeholder, icon: Icon, type }) => (
                    <div key={key}>
                      <label className="text-sm font-semibold text-stone-600 mb-1.5 block">
                        {label}
                      </label>
                      <div className="relative">
                        <Icon
                          size={15}
                          className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${errors[key] ? "text-red-400" : "text-stone-300"}`}
                        />
                        <input
                          type={type}
                          placeholder={placeholder}
                          value={form[key]}
                          onChange={(e) => {
                            setForm((f) => ({ ...f, [key]: e.target.value }));
                            setErrors((er) => ({ ...er, [key]: false }));
                          }}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-stone-700 placeholder-stone-300 outline-none transition-all duration-200
                            ${
                              errors[key]
                                ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                                : "border-stone-200 bg-stone-50 focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
                            }`}
                        />
                      </div>
                      {errors[key] && (
                        <p className="text-xs text-red-400 mt-1">
                          Please enter a valid {label.toLowerCase()}
                        </p>
                      )}
                    </div>
                  ))}
                  <div>
                    <label className="text-sm font-semibold text-stone-600 mb-1.5 block  items-center gap-1">
                      Notes{" "}
                      <span className="font-normal text-stone-400">
                        (optional)
                      </span>
                    </label>
                    <div className="relative">
                      <MessageSquare
                        size={15}
                        className="absolute left-3.5 top-3.5 text-stone-300"
                      />
                      <textarea
                        placeholder="Any allergies, skin conditions, or special requests..."
                        value={form.notes}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, notes: e.target.value }))
                        }
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-700 placeholder-stone-300 outline-none focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100 resize-none transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review & Confirm */}
            {step === 3 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-stone-800 mb-1">
                    Review & Confirm
                  </h2>
                  <p className="text-stone-400 text-sm">
                    Double-check your appointment details
                  </p>
                </div>

                <div className="bg-linear-to-br from-rose-50 to-pink-50 rounded-2xl p-5 mb-4 border border-rose-100">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-rose-100">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-xl">
                      {service?.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-stone-800">
                        {service?.name}
                      </div>
                      <div className="text-xs text-stone-400">
                        {service?.duration} · {service?.price}
                      </div>
                    </div>
                    <div className="text-lg font-bold text-rose-500">
                      {service?.price}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar size={14} className="text-rose-400 shrink-0" />
                      <span className="text-sm text-stone-600">
                        {selectedDate?.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={14} className="text-rose-400 shrink-0" />
                      <span className="text-sm text-stone-600">
                        {selectedTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <User size={14} className="text-rose-400 shrink-0" />
                      <span className="text-sm text-stone-600">
                        {form.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={14} className="text-rose-400 shrink-0" />
                      <span className="text-sm text-stone-600">
                        {form.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={14} className="text-rose-400 shrink-0" />
                      <span className="text-sm text-stone-600">
                        {form.phone}
                      </span>
                    </div>
                    {concerns.length > 0 && (
                      <div className="flex items-start gap-3">
                        <Sparkles
                          size={14}
                          className="text-rose-400 shrink-0 mt-0.5"
                        />
                        <div className="flex flex-wrap gap-1">
                          {concerns.map((c) => (
                            <span
                              key={c}
                              className="text-xs bg-white text-rose-500 rounded-full px-2 py-0.5 border border-rose-100"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-3.5 border border-amber-100">
                  <Star size={14} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700">
                    Please arrive 10 minutes early. Cancellations must be made
                    24 hours in advance. A confirmation will be sent to your
                    email.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Nav */}
          <div className="px-6 md:px-8 pb-6 md:pb-8 flex items-center justify-between gap-4">
            {step > 0 ? (
              <button
                onClick={back}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-50 transition-all duration-200 text-sm font-medium"
              >
                <ChevronLeft size={16} /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={next}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-[#FFD700] to-[#FFD700] text-white text-sm font-semibold shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-200 hover:-translate-y-0.5 transition-all duration-200"
              >
                Continue <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-linear-to-r from-rose-400 to-pink-500 text-white text-sm font-semibold shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-200 hover:-translate-y-0.5 transition-all duration-200"
              >
                <CheckCircle2 size={16} /> Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
