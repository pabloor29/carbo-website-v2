"use client";
import { BadgeCheck } from "lucide-react";
import React, { useState , useEffect , useRef } from "react";
import CustomTimePicker from "./CustomTimePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from "date-fns/locale";
import emailjs from "@emailjs/browser";

registerLocale("fr", fr);
setDefaultLocale("fr");

const ReservationForm = () => {
  const translations = {
    fr: {
      title: "Demande de réservation",
      fullNameLabel: "Nom complet",
      emailLabel: "Email",
      numberOfGuestsLabel: "Invités",
      eventDateLabel: "Date",
      eventTimeLabel: "Heure",

      specialRequestsLabel: "Demandes spéciales",
      submitButton: "ENVOYER LA DEMANDE",

      afterSentMessage: `Merci pour votre demande de réservation ! Un email de confirmation vous sera envoyé sous peu. Veuillez vérifier votre boîte mail.`,

      alertRestaurantClose: "Restaurant fermé tous les lundis et dimanches.",
    },
    en: {
      title: "Reservation request",
      fullNameLabel: "Full name",
      emailLabel: "Email",
      numberOfGuestsLabel: "Guests",
      eventDateLabel: "Date",
      eventTimeLabel: "Time",

      specialRequestsLabel: "Special requests",
      submitButton: "SEND REQUEST",

      afterSentMessage: `Merci pour votre demande de réservation ! Un email de confirmation vous sera envoyé sous peu. Veuillez vérifier votre boîte mail.`,

      alertRestaurantClose: "Restaurant closed every Monday and Sunday.",
    },
    es: {
      title: "Solicitud de reserva",
      fullNameLabel: "Nombre completo",
      emailLabel: "Correo electrónico",
      numberOfGuestsLabel: "Invitados",
      eventDateLabel: "Fecha",
      eventTimeLabel: "Hora",

      specialRequestsLabel: "Solicitudes especiales",
      submitButton: "ENVIAR SOLICITUD",

      afterSentMessage: `¡Gracias por su solicitud de reserva! Un correo electrónico de confirmación le será enviado en breve. Por favor, verifique su bandeja de entrada.`,

      alertRestaurantClose: "Restaurante cerrado todos los lunes y domingos.",
    },
    it: {
      title: "Richiesta di prenotazione",
      fullNameLabel: "Nome completo",
      emailLabel: "Email",
      numberOfGuestsLabel: "Ospiti",
      eventDateLabel: "Data",
      eventTimeLabel: "Ora",

      specialRequestsLabel: "Richieste speciali",
      submitButton: "INVIA LA RICHIESTA",

      afterSentMessage: `Grazie per la tua richiesta di prenotazione! Una email di conferma ti sarà inviata a breve. Controlla la tua casella di posta.`,

      alertRestaurantClose: "Ristorante chiuso tutti i lunedì e domeniche.",
    },
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    numberOfGuests: "",
    eventDate: new Date(),
    eventTime: "",
    specialRequests: "",
  });

  const [succeeded, setSucceeded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("fr");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    console.log(formData.eventDate, formData.eventTime);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const {
      fullName,
      email,
      numberOfGuests,
      eventDate,
      eventTime,
      specialRequests,
    } = formData;

    const mailTo = "carbo11@icloud.com";
    const subject = `Reservation - Le ${eventDate} à ${eventTime}`;
    const body = `Nom: ${fullName}\nEmail: ${email}\nCouverts: ${numberOfGuests}\nDate: ${eventDate}\nHeure: ${eventTime}\nCommentaire: ${specialRequests}`;

    window.location.href = `mailto:${mailTo}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSucceeded(true);
  };

  useEffect(() => {
    const dateInput = document.getElementById("datePicker");

    const handleDateChange = (e: any) => {
      const date = new Date(e.target.value);
      const day = date.getDay();

      // Si l'utilisateur sélectionne un lundi ou un dimanche
      if (day === 0 || day === 1) {
        alert(`${translation.alertRestaurantClose}`);
        e.target.value = ""; // Réinitialise la date
      }
    };

    const updateMinDate = () => {
      const today = new Date();
      let nextAvailableDate = new Date(today);

      // Avance la date jusqu'au mardi si aujourd'hui est dimanche (0) ou lundi (1)
      while (nextAvailableDate.getDay() === 0 || nextAvailableDate.getDay() === 1) {
        nextAvailableDate.setDate(nextAvailableDate.getDate() + 1);
      }

      const minDate = nextAvailableDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
      if (dateInput) {
        dateInput.setAttribute("min", minDate);
      }
    };

    if (dateInput) {
      dateInput.addEventListener("input", handleDateChange);
    }

    // Met à jour la date minimale pour éviter la sélection des lundis et dimanches
    updateMinDate();

    return () => {
      if (dateInput) {
        dateInput.removeEventListener("input", handleDateChange);
      }
    };
  }, []);



  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) {
        console.error("Le formulaire n'est pas disponible !");
        return;
    }

    const formElement = formRef.current;

    Promise.all([
        emailjs.sendForm("service_carbo", "template_resa_001", formElement, "Hj5zsN3OJSMAXQ9TV"),
        emailjs.sendForm("service_carbo", "template_resa_002", formElement, "Hj5zsN3OJSMAXQ9TV")
    ])
    .then(() => {
        formRef.current?.reset();
        setSucceeded(true);
    })
    .catch(error => {
        console.error("Erreur lors de l'envoi des emails :", error);
    });
};

    const [isOpen, setIsOpen] = useState(false); 
    const [selectedValue, setSelectedValue] = useState("");
  
    const options = ["12:00", "12:30", "13:00", "13:30", "14:00",
                     "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
                    ];
  
    const handleSelect = (value: string) => {
      setSelectedValue(value);
      setIsOpen(false);
    };
  
    const toggleDropdown = () => {
      setIsOpen((prev) => !prev);
    };

    const translation = translations[selectedLanguage as keyof typeof translations];

  return (
    <>
      {succeeded ? (
        <div className="flex flex-col lg:flex-row w-full h-96 justify-center px-4 items-center lg:space-x-3 text-greenBottle bg-whiteSmokedBG">
          <BadgeCheck />
          <p className="text-xl italic text-center">
            {translation.afterSentMessage}
          </p>
        </div>
      ) : (
        <div className="relative flex flex-col lg:flex-row justify-center items-center lg:space-x-32 space-y-20 py-16 bg-whiteSmokedBG">
          <form
            ref={formRef}
            onSubmit={sendEmail}
            // onSubmit={handleSubmit}
            className="space-y-8 lg:w-1/3 w-5/6 z-20"
          >
            <input type="hidden" name="company" value="CARBO" />
            <input type="hidden" name="emailCompany" value="restaurant.carbo11@gmail.com" />
            <input type="hidden" name="reservationType" value="EN ATTENTE DE CONFIRMATION" />
            <input type="hidden" name="reservationComment" value="Nous avons bien pris en compte votre demande et elle sera traitée dans les plus brefs délais. Veuillez noter que votre réservation ne sera confirmée qu’une fois que vous aurez reçu un mail de confirmation de notre part. Nous vous remercions pour votre patience et sommes impatients de vous accueillir !" />
            <div className="flex items-center justify-between lg:flex-row flex-col-reverse">
              <h3 className="text-greenBottle text-7xl font-medium font-schoolbell leading-none">
                {translation.title}
              </h3>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="rounded-md border border-greenBottle text-xl px-2 py-1 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="fr">🇫🇷</option>
                <option value="en">🇬🇧</option>
                <option value="es">🇪🇸</option>
                <option value="it">🇮🇹</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="fullName"
                className="block text-xl font-medium text-greenBottle font-cormorantGaramond tracking-wide"
              >
                {translation.fullNameLabel}
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-greenBottle rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-medium text-greenBottle font-cormorantGaramond text-xl tracking-wide"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-greenBottle rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
                required
              />
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center lg:space-x-10 space-y-8 lg:space-y-0">
              <div className="lg:w-1/2 w-full">
                <label
                  htmlFor="numberOfGuests"
                  className="block font-medium text-greenBottle font-cormorantGaramond text-xl tracking-wide"
                >
                  {translation.numberOfGuestsLabel}
                </label>
                <input
                  type="number"
                  id="numberOfGuests"
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  min={1}
                  className="mt-1 block w-full px-4 py-2 border border-greenBottle rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
                  required
                />
              </div>

              <div className="lg:w-1/2 w-full">
                <label
                  htmlFor="eventDate"
                  className="w-full block font-medium text-greenBottle font-cormorantGaramond text-xl tracking-wide"
                >
                  {translation.eventDateLabel}
                </label>
                <input 
                  type="date" 
                  id="datePicker" 
                  name="eventDate" 
                  required
                  className="mt-1 block w-full px-4 py-2 border border-greenBottle rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
                />
              </div>

              <div className="relative lg:w-1/2 w-full">
                <label
                  htmlFor="eventTime"
                  className="w-full block font-medium text-greenBottle font-cormorantGaramond text-xl tracking-wide"
                >
                  {translation.eventTimeLabel}
                </label>
                <input
                  type="text"
                  name="eventTime"
                  value={selectedValue}
                  onClick={toggleDropdown}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-greenBottle rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
                  placeholder="Choisir une option"
                />
                
                {isOpen && (
                  <ul
                    className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {options.map((option, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-indigo-100"
                        onClick={() => handleSelect(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="specialRequests"
                className="block font-medium text-greenBottle font-cormorantGaramond text-xl tracking-wide"
              >
                {translation.specialRequestsLabel}
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                rows={4}
                value={formData.specialRequests}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-greenBottle rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
              />
            </div>

            <button
              type="submit"
              className="bg-greenBottle hover:bg-transparent border hover:border-greenBottle text-white font-medium hover:text-greenBottle w-fit duration-200 px-4 py-3"
            >
              {translation.submitButton}
            </button>
          </form>

          <div className="z-30">
            <img
              src="img/logo/CARBO-LOGO-4.webp"
              alt=""
              className="z-30"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationForm;
