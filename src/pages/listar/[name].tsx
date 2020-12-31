import Link from 'next/link';
import ptBR from 'date-fns/locale/pt-BR';
import axios from 'axios';
import { useRouter } from 'next/router';
import { isToday, format } from 'date-fns';
import { useEffect, useState, useCallback, useMemo } from 'react';

import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import Header from '../../components/Header'
import Appointment from '../../components/Appointment';

interface IAppointment {
  date?: Date;
  period: string;
  color: string;
  _id?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const { name } = router.query;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [appointments, setAppointments] = useState<IAppointment>();
  const [informacoes, setInformacoes] = useState<IAppointment[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const loadInformacoes = async () => {
    const newDate = format(selectedDate, 'yyyy-MM-dd');
    try {
      const response = await axios.get(`http://localhost:3000/api/appointments/${newDate}`);
      setInformacoes(response.data);
    } catch (err) {
      alert(
        err?.response?.data?.error || 'Desculpe, você não está autorizado.'
      );
      router.push('/signin')
    }
  }

  useEffect(() => {
    loadInformacoes()
  }, [selectedDate])

  useEffect(() => {
    async function loadAppointments() {
      try {
        const response = await axios.get(`http://localhost:3000/api/appointments/search`);
        setAppointments(response.data);
        console.log(appointments.date);
      } catch (err) {
        //
      }
    }
    loadAppointments()
  }, [])

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const start_day = useMemo(() => {
    return informacoes.filter(({ period }) => period === 'start_day')
  }, [informacoes]);

  const start_lunch = useMemo(() => {
    return informacoes.filter(({ period }) => period === 'start_lunch')
  }, [informacoes]);

  const end_lunch = useMemo(() => {
    return informacoes.filter(({ period }) => period === 'end_lunch')
  }, [informacoes]);

  const end_day = useMemo(() => {
    return informacoes.filter(({ period }) => period === 'end_day')
  }, [informacoes]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header name={name} />
      <div className="flex flex-col space-y-4 h-auto items-center justify-center">
        <div className="w-4/5 rounded-lg px-6">
          <div className="md:hidden">
            <h2 className="mt-2 text-2xl font-extrabold text-indigo-900 ">
              Bem-vindo(a)
            </h2>
            <h2 className="text-xl text-indigo-600 ">
              {name}
            </h2>
          </div>
          <div className="flex flex-col">

          <div className="flex items-center justify-center">
            <DayPicker
                className="border mt-6 mb-5 rounded-md"
                weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                fromMonth={new Date()}
                modifiers={{
                  available: { daysOfWeek: [1, 2, 3, 4, 5] },
                }}
                onMonthChange={handleMonthChange}
                selectedDays={selectedDate}
                onDayClick={handleDateChange}
                months={[
                  'Janeiro',
                  'Fevereiro',
                  'Março',
                  'Abril',
                  'Maio',
                  'Junho',
                  'Julho',
                  'Agosto',
                  'Setembro',
                  'Outubro',
                  'Novembro',
                  'Dezembro',
                ]}
              />
            </div>
            <h1 className="mt-3 text-3xl font-extrabold text-indigo-900 ">
              Lista de horários registrados no dia de
            </h1>
            <div className="flex items-center py-2">
                {isToday(selectedDate) && <h2 className="mt-2 text-2xl font-extrabold text-indigo-900 ">Hoje
              </h2> }

              <h2 className="mt-2 ml-2 text-xl text-indigo-600 ">
                {selectedDateAsText}
              </h2>
            </div>

            {informacoes.length === 0 ? (
              <h1 className="mt-3 text-3xl font-extrabold text-indigo-900 ">
                Nenhum registro encontrado para este dia.
              </h1>
            ) : (
              <>
                <section>
                  <h1 className="mt-2 text-2xl font-extrabold text-indigo-900">Entrada</h1>
                  <div className="flex flex-col">
                  </div>
                  <div className="flex flex-col">
                    
                    {start_day.map(info => (
                      <Appointment key={info._id} color={info.color} name={name} date={info.date}/>
                    ))}
                  </div>
                </section>
                <section>
                  <h1 className="mt-2 text-2xl font-extrabold text-indigo-900">Saída almoço</h1>
                  <div className="flex flex-col">
                  
                    {start_lunch.map(info => (
                      <Appointment key={info._id} color={info.color} name={name} date={info.date}/>
                    ))}
                  </div>
                </section>
                <section>
                  <h1 className="mt-2 text-2xl font-extrabold text-indigo-900">Retorno almoço</h1>
                  <div className="flex flex-col">
                  
                    {end_lunch.map(info => (
                      <Appointment key={info._id} color={info.color} name={name} date={info.date}/>
                    ))}
                  </div>
                </section>
                <section>
                  <h1 className="mt-2 text-2xl font-extrabold text-indigo-900">Saída</h1>
                  <div className="flex flex-col">
                    
                    {end_day.map(info => (
                      <Appointment key={info._id} color={info.color} name={name} date={info.date}/>
                    ))}
                  </div>
                </section>
              </>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
