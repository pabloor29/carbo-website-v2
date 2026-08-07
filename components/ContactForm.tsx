"use client";
import { BadgeCheck, AlertTriangle } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr, enGB, es, it } from "date-fns/locale";
import { useLocale } from "next-intl";

registerLocale("fr", fr);
registerLocale("en", enGB);
registerLocale("es", es);
registerLocale("it", it);
setDefaultLocale("fr");

type DayServices = { lunchOpen: boolean; dinnerOpen: boolean };

type Props = {
  closedWeekdays: number[];
  closedDates: string[];
  holidayPeriods: { debut: string; fin: string }[];
  timeSlots: string[];
  lunchSlots: string[];
  dinnerSlots: string[];
  dayServices: DayServices[];
  disabledSlotsByDate: Record<string, string[]>;
};

function toLocalDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const ReservationForm = ({ closedWeekdays, closedDates, holidayPeriods, lunchSlots, dinnerSlots, dayServices, disabledSlotsByDate }: Props) => {
  const translations = {
    fr: {
      title: "Demande de réservation",
      fullNameLabel: "Nom complet",
      emailLabel: "Email",
      phoneLabel: "Téléphone",
      numberOfGuestsLabel: "Nombre de personnes",
      eventDateLabel: "Date",
      eventTimeLabel: "Heure",
      specialRequestsLabel: "Demandes spéciales",
      submitButton: "ENVOYER LA DEMANDE",
      afterSentMessage: `Merci pour votre demande de réservation ! Un email de confirmation vous sera envoyé sous peu. Veuillez vérifier votre boîte mail.`,
      spamWarning: `Pensez à vérifier votre dossier courrier indésirable (spam) : notre email de confirmation peut parfois s'y glisser.`,
      alertMaxNbGuests: "Pour toute réservation supérieure à 10 couverts, veuillez nous contacter à cette adresse mail : ",
      fillRequiredFields: "Veuillez remplir les champs obligatoires : nom, email, nombre de personnes, date et heure.",
      serviceLabel: "Service",
      serviceMidi: "midi",
      serviceSoir: "soir",
      callButton: "Appeler le restaurant",
      todaySameDayMessage: "Pour toute réservation le jour même, merci d'appeler le restaurant directement.",
      pickDateFirst: "Sélectionnez d'abord une date pour voir les créneaux disponibles.",
      noSlots: "Aucun créneau disponible",
      slotUnavailable: "Ce créneau vient d'être complet. Merci de choisir un autre horaire.",
      selectedLabel: "Sélectionné",
      closedLabel: "Fermé",
      duplicateTitle: "Réservation déjà existante",
      duplicateIntro: "Une demande de réservation existe déjà pour cette adresse email le même jour, pour le service du {service}.",
      duplicateCheckMail: "Merci de bien vérifier votre boîte mail ainsi que vos courriers indésirables (spams).",
      duplicateNoMail: "Si vous n'avez reçu aucun email, veuillez appeler directement le restaurant :",
      duplicateCall: "Appeler le restaurant",
      duplicateClose: "Fermer",
    },
    en: {
      title: "Reservation request",
      fullNameLabel: "Full name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      numberOfGuestsLabel: "Number of people",
      eventDateLabel: "Date",
      eventTimeLabel: "Time",
      specialRequestsLabel: "Special requests",
      submitButton: "SEND REQUEST",
      afterSentMessage: `Thank you for your reservation request! A confirmation email will be sent to you shortly. Please check your inbox.`,
      spamWarning: `Be sure to check your spam / junk folder — our confirmation email sometimes ends up there.`,
      alertMaxNbGuests: "For reservations of more than 10 covers, please contact us at this email address: ",
      fillRequiredFields: "Please fill in the required fields: name, email, number of people, date and time.",
      serviceLabel: "Service",
      serviceMidi: "lunch",
      serviceSoir: "dinner",
      callButton: "Call the restaurant",
      todaySameDayMessage: "For same-day reservations, please call the restaurant directly.",
      pickDateFirst: "Select a date first to see available time slots.",
      noSlots: "No slots available",
      slotUnavailable: "This slot has just filled up. Please choose another time.",
      selectedLabel: "Selected",
      closedLabel: "Closed",
      duplicateTitle: "Reservation already exists",
      duplicateIntro: "A reservation request already exists for this email on the same day, for the {service} service.",
      duplicateCheckMail: "Please check your inbox as well as your spam folder.",
      duplicateNoMail: "If you have not received any email, please call the restaurant directly:",
      duplicateCall: "Call the restaurant",
      duplicateClose: "Close",
    },
    es: {
      title: "Solicitud de reserva",
      fullNameLabel: "Nombre completo",
      emailLabel: "Correo electrónico",
      phoneLabel: "Teléfono",
      numberOfGuestsLabel: "Número de personas",
      eventDateLabel: "Fecha",
      eventTimeLabel: "Hora",
      specialRequestsLabel: "Solicitudes especiales",
      submitButton: "ENVIAR SOLICITUD",
      afterSentMessage: `¡Gracias por su solicitud de reserva! Un correo electrónico de confirmación le será enviado en breve. Por favor, verifique su bandeja de entrada.`,
      spamWarning: `No olvide revisar su carpeta de correo no deseado (spam): nuestro correo de confirmación puede acabar allí.`,
      alertMaxNbGuests: "Para reservas de más de 10 comensales, póngase en contacto con nosotros en esta dirección de correo electrónico: ",
      fillRequiredFields: "Por favor complete los campos obligatorios: nombre, correo electrónico, número de personas, fecha y hora.",
      serviceLabel: "Servicio",
      serviceMidi: "mediodía",
      serviceSoir: "noche",
      callButton: "Llamar al restaurante",
      todaySameDayMessage: "Para reservas en el mismo día, llame directamente al restaurante.",
      pickDateFirst: "Seleccione primero una fecha para ver los horarios disponibles.",
      noSlots: "No hay horarios disponibles",
      slotUnavailable: "Este horario acaba de completarse. Por favor elija otra hora.",
      selectedLabel: "Seleccionado",
      closedLabel: "Cerrado",
      duplicateTitle: "Ya existe una reserva",
      duplicateIntro: "Ya existe una solicitud de reserva para este correo electrónico el mismo día, para el servicio de {service}.",
      duplicateCheckMail: "Por favor, compruebe su bandeja de entrada y también su carpeta de spam.",
      duplicateNoMail: "Si no ha recibido ningún correo, llame directamente al restaurante:",
      duplicateCall: "Llamar al restaurante",
      duplicateClose: "Cerrar",
    },
    it: {
      title: "Richiesta di prenotazione",
      fullNameLabel: "Nome completo",
      emailLabel: "Email",
      phoneLabel: "Telefono",
      numberOfGuestsLabel: "Numero di persone",
      eventDateLabel: "Data",
      eventTimeLabel: "Ora",
      specialRequestsLabel: "Richieste speciali",
      submitButton: "INVIA LA RICHIESTA",
      afterSentMessage: `Grazie per la tua richiesta di prenotazione! Una email di conferma ti sarà inviata a breve. Controlla la tua casella di posta.`,
      spamWarning: `Ricordati di controllare la cartella spam / posta indesiderata: la nostra email di conferma potrebbe finire lì.`,
      alertMaxNbGuests: "Per prenotazioni superiori a 10 coperti, vi preghiamo di contattarci all'indirizzo e-mail: ",
      fillRequiredFields: "Compila i campi obbligatori: nome, email, numero di persone, data e ora.",
      serviceLabel: "Servizio",
      serviceMidi: "pranzo",
      serviceSoir: "cena",
      callButton: "Chiama il ristorante",
      todaySameDayMessage: "Per prenotazioni in giornata, chiama direttamente il ristorante.",
      pickDateFirst: "Seleziona prima una data per vedere gli orari disponibili.",
      noSlots: "Nessun orario disponibile",
      slotUnavailable: "Questo orario è appena stato completato. Scegli un altro orario.",
      selectedLabel: "Selezionato",
      closedLabel: "Chiuso",
      duplicateTitle: "Prenotazione già esistente",
      duplicateIntro: "Esiste già una richiesta di prenotazione per questa email lo stesso giorno, per il servizio di {service}.",
      duplicateCheckMail: "Si prega di controllare la casella di posta e anche la cartella spam.",
      duplicateNoMail: "Se non hai ricevuto alcuna email, chiama direttamente il ristorante:",
      duplicateCall: "Chiama il ristorante",
      duplicateClose: "Chiudi",
    },
  };

  // Locale comes from the single site-wide language selector (navbar).
  const rawLocale = useLocale();
  const selectedLanguage = (["fr", "en", "es", "it"].includes(rawLocale) ? rawLocale : "fr") as keyof typeof translations;
  const translation = translations[selectedLanguage];

  const localeMap: Record<string, string> = { fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT" };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    numberOfGuests: "",
    eventDate: new Date(),
    eventTime: "",
    specialRequests: "",
  });

  const [succeeded, setSucceeded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // Times still bookable for the chosen date + party size (null = not yet fetched → show all).
  const [availSet, setAvailSet] = useState<Set<string> | null>(null);
  const [duplicateInfo, setDuplicateInfo] = useState<{
    name: string;
    email: string;
    date: string;
    time_slot: string;
    covers: number;
    service: "midi" | "soir";
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isTodayBlocked = (): boolean => new Date().getHours() >= 20;

  const isDateClosed = (date: Date): boolean => {
    const isToday = toLocalDateStr(date) === toLocalDateStr(new Date());
    if (isToday && isTodayBlocked()) return true;

    if (closedWeekdays.includes(date.getDay())) return true;

    const dateStr = toLocalDateStr(date);
    if (closedDates.includes(dateStr)) return true;

    for (const period of holidayPeriods) {
      if (dateStr >= period.debut && dateStr <= period.fin) return true;
    }

    return false;
  };

  // On the current day, a slot whose start time already passed can't be booked.
  const isPastSlot = (slot: string): boolean => {
    if (!selectedDate) return false;
    if (toLocalDateStr(selectedDate) !== toLocalDateStr(new Date())) return false;
    const [h, m] = slot.split(":").map(Number);
    const now = new Date();
    return h * 60 + (m || 0) <= now.getHours() * 60 + now.getMinutes();
  };

  // A slot the restaurant punctually disabled for the selected date.
  const isOverriddenSlot = (slot: string): boolean => {
    if (!selectedDate) return false;
    return disabledSlotsByDate[toLocalDateStr(selectedDate)]?.includes(slot) ?? false;
  };

  // A slot where the restaurant is full for this party size (capacity + meal duration).
  const isFull = (slot: string): boolean => availSet !== null && !availSet.has(slot);

  // Ask the admin which times are still free for this date + party size.
  useEffect(() => {
    if (!selectedDate || isDateClosed(selectedDate)) { setAvailSet(null); return; }
    const covers = Math.max(1, Number(formData.numberOfGuests) || 2);
    const ac = new AbortController();
    fetch(`/api/availability?date=${toLocalDateStr(selectedDate)}&covers=${covers}`, { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setAvailSet(d ? new Set<string>(d.slots) : null))
      .catch(() => { /* network/abort → fall back to schedule-only slots */ });
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, formData.numberOfGuests]);

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Bring the confirmation message into view so the user sees it without scrolling.
  useEffect(() => {
    if (succeeded) {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [succeeded]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setErrorMessage("");
  };

  const currentServices: DayServices = selectedDate
    ? dayServices[selectedDate.getDay()] ?? { lunchOpen: true, dinnerOpen: true }
    : { lunchOpen: true, dinnerOpen: true };

  const lunchEnabled = !!selectedDate && currentServices.lunchOpen;
  const dinnerEnabled = !!selectedDate && currentServices.dinnerOpen;

  // Clear a chosen slot if it belongs to a service that is closed on the new date,
  // or if it has already passed on the current day.
  useEffect(() => {
    if (!selectedValue) return;
    const inLunch = lunchSlots.includes(selectedValue);
    const inDinner = dinnerSlots.includes(selectedValue);
    if ((inLunch && !lunchEnabled) || (inDinner && !dinnerEnabled) || isPastSlot(selectedValue) || isOverriddenSlot(selectedValue) || isFull(selectedValue)) {
      setSelectedValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, lunchEnabled, dinnerEnabled, selectedValue, lunchSlots, dinnerSlots, disabledSlotsByDate, availSet]);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.numberOfGuests.trim() ||
      !selectedDate ||
      !selectedValue.trim()
    ) {
      setErrorMessage(translation.fillRequiredFields);
      return;
    }

    setIsSubmitting(true);

    const eventDateFormatted = selectedDate
      ? selectedDate.toLocaleDateString(localeMap[selectedLanguage] ?? "fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })
      : "";

    const eventDateISO = selectedDate ? toLocalDateStr(selectedDate) : "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          numberOfGuests: formData.numberOfGuests,
          eventDate: eventDateFormatted,
          eventDateISO,
          eventTime: selectedValue,
          specialRequests: formData.specialRequests,
          locale: selectedLanguage,
        }),
      });

      if (res.status === 409) {
        const data = await res.json();
        if (data?.existing) {
          setDuplicateInfo(data.existing);
          return;
        }
        if (data?.slotUnavailable) {
          setSelectedValue("");
          setErrorMessage(translation.slotUnavailable);
          return;
        }
      }

      if (!res.ok) throw new Error("Erreur serveur");
      setSucceeded(true);
    } catch (error) {
      console.error("Erreur lors de l'envoi des emails :", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSlotGroup = (
    slots: string[],
    enabled: boolean,
    open: boolean,
    icon: string,
    label: string,
    keyPrefix: string
  ) => {
    if (slots.length === 0) return null;
    return (
      <div className={enabled ? "" : "opacity-50"}>
        <div className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-greenBottle/20">
          <div className="flex items-center gap-2">
            <span aria-hidden>{icon}</span>
            <p className="text-xs font-bold uppercase tracking-wider text-greenBottle">{label}</p>
          </div>
          {selectedDate && !open && (
            <span className="text-[10px] uppercase tracking-wider text-red-600 font-semibold">
              {translation.closedLabel}
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-2">
          {slots.map((option) => {
            const disabled = !enabled || isPastSlot(option) || isOverriddenSlot(option) || isFull(option);
            const isSelected = selectedValue === option;
            return (
              <button
                type="button"
                key={`${keyPrefix}-${option}`}
                onClick={() => !disabled && handleSelect(option)}
                disabled={disabled}
                aria-disabled={disabled}
                className={`px-2 py-1.5 rounded-md border text-sm transition ${
                  isSelected
                    ? "bg-greenBottle text-white border-greenBottle"
                    : disabled
                    ? "bg-gray-100 text-gray-400 border-gray-200 line-through cursor-not-allowed"
                    : "bg-white text-greenBottle border-greenBottle hover:bg-greenBottle/10"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
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
        <div
          ref={successRef}
          className="flex flex-col w-full min-h-[24rem] justify-center items-center gap-6 px-4 py-16 scroll-mt-28 text-greenBottle bg-whiteSmokedBG"
        >
          <div className="flex flex-col lg:flex-row items-center gap-3 lg:space-x-3 max-w-2xl">
            <BadgeCheck className="flex-shrink-0" />
            <p className="text-xl italic text-center">
              {translation.afterSentMessage}
            </p>
          </div>
          <div
            role="alert"
            className="flex items-start gap-3 w-full max-w-2xl bg-amber-50 border-2 border-amber-300 rounded-lg px-5 py-4 shadow-sm"
          >
            <AlertTriangle className="flex-shrink-0 mt-0.5 text-amber-600" size={22} strokeWidth={2} />
            <p className="text-sm sm:text-base font-semibold not-italic text-left text-amber-900">
              {translation.spamWarning}
            </p>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col lg:flex-row justify-center items-center lg:space-x-32 space-y-20 py-16 bg-whiteSmokedBG">
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="space-y-8 lg:w-1/3 w-5/6 z-20"
          >
            <div className="flex items-center justify-between lg:flex-row flex-col-reverse">
              <h3 className="text-greenBottle text-7xl font-medium font-schoolbell leading-none">
                {translation.title}
              </h3>
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

            <div>
              <label
                htmlFor="phone"
                className="block font-medium text-greenBottle font-cormorantGaramond text-xl tracking-wide"
              >
                {translation.phoneLabel}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-greenBottle rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
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

            <div className="flex flex-col lg:flex-row justify-between items-start lg:space-x-10 space-y-8 lg:space-y-0">
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
                  locale={selectedLanguage}
                  minDate={isTodayBlocked() ? (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d; })() : new Date()}
                  placeholderText="Sélectionner une date"
                  className="w-full px-4 py-2 border border-greenBottle rounded-md focus:ring focus:ring-violet-200 focus:border-violet-500"
                  required
                />
              </div>
            </div>

            {isTodayBlocked() && (
              <div className="bg-amber-50 border border-amber-200 rounded-md px-4 py-3 flex flex-col gap-3">
                <p className="text-sm text-amber-800 font-medium">
                  {translation.todaySameDayMessage}
                </p>
                <a
                  href="tel:+33434422749"
                  className="inline-flex items-center justify-center gap-2 bg-greenBottle text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-greenBottle/80 transition-colors duration-200 self-start"
                >
                  📞 {translation.callButton}
                </a>
              </div>
            )}

            <div className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3">
                <label
                  htmlFor="eventTime"
                  className="block font-medium text-greenBottle font-cormorantGaramond text-xl tracking-wide"
                >
                  {translation.eventTimeLabel}
                </label>
                {selectedValue && (
                  <span className="inline-flex items-center gap-2 self-start sm:self-auto bg-greenBottle text-white text-sm font-medium px-3 py-1 rounded-full">
                    {translation.selectedLabel} : {selectedValue}
                  </span>
                )}
              </div>

              <div className="border border-greenBottle rounded-md p-3 sm:p-4 bg-white">
                {!selectedDate && (
                  <p className="text-sm italic text-greenBottle/70 text-center pb-3 mb-3 border-b border-greenBottle/10">
                    {translation.pickDateFirst}
                  </p>
                )}
                {lunchSlots.length === 0 && dinnerSlots.length === 0 ? (
                  <p className="text-sm italic text-greenBottle/70 text-center py-4">
                    {translation.noSlots}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {renderSlotGroup(lunchSlots, lunchEnabled, currentServices.lunchOpen, "🌞", translation.serviceMidi, "lunch")}
                    {renderSlotGroup(dinnerSlots, dinnerEnabled, currentServices.dinnerOpen, "🌙", translation.serviceSoir, "dinner")}
                  </div>
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

            {errorMessage && (
              <p className="text-red-600 font-medium" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-greenBottle hover:bg-transparent border hover:border-greenBottle text-white font-medium hover:text-greenBottle w-fit duration-200 px-4 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Envoi en cours..." : translation.submitButton}
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

      {duplicateInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setDuplicateInfo(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-semibold text-greenBottle">
              {translation.duplicateTitle}
            </h3>

            <p className="mt-3 text-gray-700">
              {translation.duplicateIntro.replace(
                "{service}",
                duplicateInfo.service === "midi" ? translation.serviceMidi : translation.serviceSoir
              )}
            </p>

            <div className="mt-4 rounded-lg border border-greenBottle/30 bg-whiteSmokedBG p-4 text-sm text-gray-700 space-y-1">
              <p><strong>{translation.fullNameLabel} :</strong> {duplicateInfo.name}</p>
              <p><strong>{translation.emailLabel} :</strong> {duplicateInfo.email}</p>
              <p>
                <strong>{translation.eventDateLabel} :</strong>{" "}
                {new Date(duplicateInfo.date + "T00:00:00").toLocaleDateString(
                  localeMap[selectedLanguage] ?? "fr-FR",
                  { weekday: "long", day: "numeric", month: "long", year: "numeric" }
                )}{" "}
                · {duplicateInfo.time_slot}
              </p>
              <p>
                <strong>{translation.serviceLabel} :</strong>{" "}
                {duplicateInfo.service === "midi" ? translation.serviceMidi : translation.serviceSoir}
              </p>
              <p><strong>{translation.numberOfGuestsLabel} :</strong> {duplicateInfo.covers}</p>
            </div>

            <p className="mt-4 text-gray-700">{translation.duplicateCheckMail}</p>
            <p className="mt-3 text-gray-700">{translation.duplicateNoMail}</p>

            <a
              href="tel:+33434422749"
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-greenBottle px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-greenBottle/80"
            >
              📞 {translation.duplicateCall} — +33 4 34 42 27 49
            </a>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setDuplicateInfo(null)}
                className="border border-greenBottle px-4 py-2 font-medium text-greenBottle duration-200 hover:bg-greenBottle hover:text-white"
              >
                {translation.duplicateClose}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationForm;
