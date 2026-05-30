"use client";
import { BadgeCheck } from "lucide-react";
import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from "date-fns/locale";
import emailjs from "@emailjs/browser";

registerLocale("fr", fr);
setDefaultLocale("fr");

type Props = {
  closedWeekdays: number[];
  closedDates: string[];
  holidayPeriods: { debut: string; fin: string }[];
  timeSlots: string[];
};

function toLocalDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const ReservationForm = ({ closedWeekdays, closedDates, holidayPeriods, timeSlots }: Props) => {
  const translations = {
    fr: {
      title: "Demande de réservation",
      fullNameLabel: "Nom complet",
      emailLabel: "Email",
      numberOfGuestsLabel: "Nombre de personnes",
      eventDateLabel: "Date",
      eventTimeLabel: "Heure",
      specialRequestsLabel: "Demandes spéciales",
      submitButton: "ENVOYER LA DEMANDE",
      afterSentMessage: `Merci pour votre demande de réservation ! Un email de confirmation vous sera envoyé sous peu. Veuillez vérifier votre boîte mail.`,
      alertMaxNbGuests: "Pour toute réservation supérieure à 10 couverts, veuillez nous contacter à cette adresse mail : ",
    },
    en: {
      title: "Reservation request",
      fullNameLabel: "Full name",
      emailLabel: "Email",
      numberOfGuestsLabel: "Number of people",
      eventDateLabel: "Date",
      eventTimeLabel: "Time",
      specialRequestsLabel: "Special requests",
      submitButton: "SEND REQUEST",
      afterSentMessage: `Thank you for your reservation request! A confirmation email will be sent to you shortly. Please check your inbox.`,
      alertMaxNbGuests: "For reservations of more than 10 covers, please contact us at this email address: ",
    },
    es: {
      title: "Solicitud de reserva",
      fullNameLabel: "Nombre completo",
      emailLabel: "Correo electrónico",
      numberOfGuestsLabel: "Número de personas",
      eventDateLabel: "Fecha",
      eventTimeLabel: "Hora",
      specialRequestsLabel: "Solicitudes especiales",
      submitButton: "ENVIAR SOLICITUD",
      afterSentMessage: `¡Gracias por su solicitud de reserva! Un correo electrónico de confirmación le será enviado en breve. Por favor, verifique su bandeja de entrada.`,
      alertMaxNbGuests: "Para reservas de más de 10 comensales, póngase en contacto con nosotros en esta dirección de correo electrónico: ",
    },
    it: {
      title: "Richiesta di prenotazione",
      fullNameLabel: "Nome completo",
      emailLabel: "Email",
      numberOfGuestsLabel: "Numero di persone",
      eventDateLabel: "Data",
      eventTimeLabel: "Ora",
      specialRequestsLabel: "Richieste speciali",
      submitButton: "INVIA LA RICHIESTA",
      afterSentMessage: `Grazie per la tua richiesta di prenotazione! Una email di conferma ti sarà inviata a breve. Controlla la tua casella di posta.`,
      alertMaxNbGuests: "Per prenotazioni superiori a 10 coperti, vi preghiamo di contattarci all'indirizzo e-mail: ",
    },
  };

  const [selectedLanguage, setSelectedLanguage] = useState("fr");
  const translation = translations[selectedLanguage as keyof typeof translations];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    numberOfGuests: "",
    eventDate: new Date(),
    eventTime: "",
    specialRequests: "",
  });

  const [succeeded, setSucceeded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isDateClosed = (date: Date): boolean => {
    if (closedWeekdays.includes(date.getDay())) return true;

    const dateStr = toLocalDateStr(date);
    if (closedDates.includes(dateStr)) return true;

    for (const period of holidayPeriods) {
      if (dateStr >= period.debut && dateStr <= period.fin) return true;
    }

    return false;
  };

  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) {
      console.error("Le formulaire n'est pas disponible !");
      return;
    }

    const formElement = formRef.current;

    Promise.all([
      emailjs.sendForm("service_carbo", "template_resa_001", formElement, "Bdh3AwRMePW399mo-"),
      emailjs.sendForm("service_carbo", "template_resa_002", formElement, "Bdh3AwRMePW399mo-"),
    ])
      .then(() => {
        formRef.current?.reset();
        setSucceeded(true);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi des emails :", error);
      });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <style jsx global>
        {`
          .date-past {
            background-color: #f3f4f6 !important;
            color: #9ca3af !important;
            cursor: not-allowed !important;
          }

          .date-closed {
            background-color: #fee2e2 !important;
            color: #991b1b !important;
            position: relative;
          }

          .date-closed::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            width: 80%;
            height: 2px;
            background-color: #991b1b;
            transform: translate(-50%, -50%) rotate(-45deg);
          }

          .react-datepicker__day--disabled {
            cursor: not-allowed !important;
          }
        `}
      </style>
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
            className="space-y-8 lg:w-1/3 w-5/6 z-20"
          >
            <input type="hidden" name="company" value="CARBO" />
            <input type="hidden" name="emailCompany" value="restaurant.carbo11@gmail.com" />
            <input type="hidden" name="reservationType" value="EN ATTENTE DE CONFIRMATION" />
            <input type="hidden" name="reservationComment" value="Nous avons bien pris en compte votre demande et elle sera traitée dans les plus brefs délais. Veuillez noter que votre réservation ne sera confirmée qu'une fois que vous aurez reçu un mail de confirmation de notre part. Nous vous remercions pour votre patience et sommes impatients de vous accueillir !" />
            <input type="hidden" name="reservationComment2" value=" " />

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

            <div className="bg-greenBottle/80 p-2 text-whiteSmokedBG">
              {translation.alertMaxNbGuests}
              <a
                href="mailto:carbo11@icloud.com"
                className="text-blue-300"
              >
                carbo11@icloud.com
              </a>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center md:items-end lg:space-x-10 space-y-8 lg:space-y-0">
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
                  max={10}
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
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => date && setSelectedDate(date)}
                  filterDate={(date) => !isDateClosed(date)}
                  dayClassName={(date) => {
                    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                    if (isPast) return "date-past";
                    if (isDateClosed(date)) return "date-closed";
                    return "";
                  }}
                  dateFormat="dd/MM/yyyy"
                  locale="fr"
                  minDate={new Date()}
                  placeholderText="Sélectionner une date"
                  className="w-full px-4 py-2 border border-greenBottle rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
                  required
                />
                <input
                  type="hidden"
                  name="eventDate"
                  value={selectedDate ? selectedDate.toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }) : ""}
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
                  readOnly
                />

                {isOpen && (
                  <ul
                    className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {timeSlots.map((option, index) => (
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
                onChange={handleChange as React.ChangeEventHandler<HTMLTextAreaElement>}
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
