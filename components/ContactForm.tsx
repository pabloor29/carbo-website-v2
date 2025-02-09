"use client";
import { BadgeCheck } from "lucide-react";
import React, { useState } from "react";
import CustomTimePicker from "./CustomTimePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from "date-fns/locale";

registerLocale("fr", fr);
setDefaultLocale("fr");

const ReservationForm = () => {
  const translations = {
    fr: {
      title: "Demande de réservation",
      fullNameLabel: "Nom complet",
      emailLabel: "Email",
      numberOfGuestsLabel: "Nombre de convives",
      eventDateLabel: "Date et heure",

      specialRequestsLabel: "Demandes spéciales",
      submitButton: "ENVOYER LA DEMANDE",

      afterSentMessage: `Assurez-vous de bien avoir cliqué sur le bouton pour envoyer le mail ! Vous allez
      recevoir une confirmation d'ici peu 😋`,
    },
    en: {
      title: "Reservation request",
      fullNameLabel: "Full name",
      emailLabel: "Email",
      numberOfGuestsLabel: "Number of guests",
      eventDateLabel: "Date and time",

      specialRequestsLabel: "Special requests",
      submitButton: "SEND REQUEST",

      afterSentMessage: `Make sure you have clicked on the button to send the e-mail ! You will
      receive confirmation shortly 😋`,
    },
    es: {
      title: "Solicitud de reserva",
      fullNameLabel: "Nombre completo",
      emailLabel: "Correo electrónico",
      numberOfGuestsLabel: "Numero de invitados",
      eventDateLabel: "Fecha y hora",

      specialRequestsLabel: "Solicitudes especiales",
      submitButton: "ENVIAR SOLICITUD",

      afterSentMessage: `¡Asegúrese de que ha pulsado el botón para enviar el correo electrónico! Lo harás
      recibir confirmación en breve 😋`,
    },
    it: {
      title: "Richiesta di prenotazione",
      fullNameLabel: "Nome completo",
      emailLabel: "Email",
      numberOfGuestsLabel: "Numero di ospiti",
      eventDateLabel: "Data e ora",

      specialRequestsLabel: "Richieste speciali",
      submitButton: "INVIA LA RICHIESTA",

      afterSentMessage: `Assicuratevi di aver fatto clic sul pulsante per inviare l'e-mail! Riceverai
      presto una conferma 😋`,
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

  const isWeekday = (date: any) => {
    const day = date.getDay();
    const month = date.getMonth();
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();

    const isAug31 = month === 7 && dayOfMonth === 31;
    const isNov16ToDec2 =
      year === 2024 &&
      ((month === 10 && dayOfMonth >= 16) ||
        month === 11 ||
        (month === 11 && dayOfMonth <= 2));
    const isJan1ToMar3 =
        year === 2025 &&
        ((month === 0 && dayOfMonth >= 1) ||
         month === 1 ||             
         (month === 2 && dayOfMonth <= 3));
    const isSeptToJuneMonday = day === 1 && (month >= 8 || month <= 5);

    return day !== 0 && !isAug31 && !isNov16ToDec2 && !isSeptToJuneMonday && !isJan1ToMar3;
  };

  const isRestaurantOpen = (time: any) => {
    const hour = time.getHours();
    const minute = time.getMinutes();
    return (
      hour === 12 ||
      hour === 13 ||
      (hour === 14 && minute === 0) ||
      hour === 18 ||
      hour === 19 ||
      hour === 20 ||
      hour === 21 ||
      (hour === 22 && minute === 0)
    );
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

    const mailTo = "pab.ortg@gmail.com";
    const subject = `Reservation - Le ${eventDate} à ${eventTime}`;
    const body = `Nom: ${fullName}\nEmail: ${email}\nCouverts: ${numberOfGuests}\nDate: ${eventDate}\nHeure: ${eventTime}\nCommentaire: ${specialRequests}`;

    window.location.href = `mailto:${mailTo}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSucceeded(true);
  };

  const translation =
    translations[selectedLanguage as keyof typeof translations];

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
        <div className="relative flex flex-col lg:flex-row justify-center items-center lg:space-x-20 space-y-8 py-16 bg-whiteSmokedBG">
          <form
            onSubmit={handleSubmit}
            className="space-y-8 lg:w-1/3 w-5/6 z-20"
          >
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
                className="block text-xl font-medium text-greenBottle font-ttInterphasesMono tracking-wide"
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
                className="block font-medium text-greenBottle font-ttInterphasesMono text-xl tracking-wide"
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
                  className="block font-medium text-greenBottle font-ttInterphasesMono text-xl tracking-wide"
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
                  className="w-full block font-medium text-greenBottle font-ttInterphasesMono text-xl tracking-wide"
                >
                  {translation.eventDateLabel}
                </label>

                <DatePicker
                  showTimeSelect
                  selected={formData.eventDate}
                  onChange={(date: any) =>
                    handleChange({
                      target: { name: "eventDate", value: date },
                    })
                  }
                  minDate={new Date()}
                  filterDate={isWeekday}
                  filterTime={isRestaurantOpen}
                  className="mt-1 block w-full px-4 py-2 border border-greenBottle rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
                  locale="fr"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="specialRequests"
                className="block font-medium text-greenBottle font-ttInterphasesMono text-xl tracking-wide"
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
              className="w-full bg-greenBottle rounded-sm py-3 text-lg font-semibold text-white hover:bg-[rgba(25,44,29,0.8)] duration-300 cursor-pointer"
            >
              {translation.submitButton}
            </button>
          </form>

          <div className="lg:w-1/3 w-5/6 z-30">
            <img
              src="/CARBO-LOGO-21.webp"
              alt=""
              className="bg-[rgba(25,44,29,0.8)]  z-30"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationForm;
