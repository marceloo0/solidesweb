import Link from 'next/link';
import ptBR from 'date-fns/locale/pt-BR';
import axios from 'axios';
import { useRouter } from 'next/router';
import { isToday, format } from 'date-fns';
import { useEffect, useState, useCallback, useMemo } from 'react';

import Header from '../../components/Header';
import Appointment from '../../components/Appointment';

type IAppointment = {
  date?: string;
  period: string;
  color: string;
  _id?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const { name } = router.query;
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [informacoes, setInformacoes] = useState<IAppointment[]>([]);

  const loadAppointments = async () => {
    const date = new Date(selectedDate);
    const newDate = format(date, 'yyyy-MM-dd');
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
    loadAppointments()
    console.log(informacoes)
  }, [])

  const handleCreateAppointment = useCallback( async ({ period, color }: IAppointment) => {
    const date = new Date();
    const data = {
      date: format(date, 'yyyy,MM,dd'),
      period: period,
      color: color,
    }

    try {
      await axios.post('http://localhost:3000/api/appointments', data);
      alert(
        'Periodo registrado com sucesso!'
      );
      loadAppointments();      
    } catch (err) {
      alert(
        err?.response?.data?.error || 'Você não esta autorizado, faça login novamente.'
      );
      router.push('/signin')
    }
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
            <h1 className="mt-3 text-2xl font-extrabold text-indigo-900 ">
              Registrar horários
            </h1>
            <div className="flex items-center py-2">
                {isToday(selectedDate) && <h2 className="mt-2 text-xl font-extrabold text-indigo-900 ">Hoje
              </h2> }

              <h2 className="mt-2 ml-2 text-xl text-indigo-600 ">
                {selectedDateAsText}
              </h2>
            </div>
            <section>
              <h1 className="mt-2 text-xl font-extrabold text-indigo-900">Entrada</h1>
              <div className="flex flex-col">
              </div>
              <div className="flex flex-col">
                
                {start_day.length === 0 && (
                  <>
                    <p>Nenhum horário neste periodo.</p>
                      <button className="w-36 bg-indigo-400 text-indigo-50 text-center px-6 py-3 text-lg font-semibold rounded-xl hover:bg-indigo-700 transition transform hover:scale-110 motion-reduce:transform-none"
                      onClick={() => handleCreateAppointment({ period: 'start_day', color: 'green' })}
                    >
                      Registrar
                      </button>
                  </>
                )}

                {start_day.map(info => (
                  <Appointment key={info._id} color={info.color} name={name} date={info.date}/>
                ))}
              </div>
            </section>
            <section>
              <h1 className="mt-2 text-xl font-extrabold text-indigo-900">Saída almoço</h1>
              <div className="flex flex-col">
                {start_lunch.length === 0 && (
                  <>
                    <p>Nenhum horário neste periodo.</p>
                      <button className="w-36 bg-indigo-400 text-indigo-50 text-center px-6 py-3 text-lg font-semibold rounded-xl hover:bg-indigo-700 transition transform hover:scale-110 motion-reduce:transform-none"
                      onClick={() => handleCreateAppointment({ period: 'start_lunch', color: 'yellow' })}
                    >
                      Registrar
                      </button>
                  </>
                )}

                {start_lunch.map(info => (
                  <Appointment key={info._id} color={info.color} name={name} date={info.date}/>
                ))}
              </div>
            </section>
            <section>
              <h1 className="mt-2 text-xl font-extrabold text-indigo-900">Retorno almoço</h1>
              <div className="flex flex-col">
                {end_lunch.length === 0 && (
                  <>
                    <p>Nenhum horário neste periodo.</p>
                      <button className="w-36 bg-indigo-400 text-indigo-50 text-center px-6 py-3 text-lg font-semibold rounded-xl hover:bg-indigo-700 transition transform hover:scale-110 motion-reduce:transform-none"
                      onClick={() => handleCreateAppointment({ period: 'end_lunch', color: 'blue' })}
                    >
                      Registrar
                      </button>
                  </>
                )}

                {end_lunch.map(info => (
                  <Appointment key={info._id} color={info.color} name={name} date={info.date}/>
                ))}
              </div>
            </section>
            <section>
              <h1 className="mt-2 text-xl font-extrabold text-indigo-900">Saída</h1>
              <div className="flex flex-col">
                {end_day.length === 0 && (
                  <>
                    <p>Nenhum horário neste periodo.</p>
                      <button className="w-36 bg-indigo-400 text-indigo-50 text-center px-6 py-3 text-lg font-semibold rounded-xl hover:bg-indigo-700 transition transform hover:scale-110 motion-reduce:transform-none"
                      onClick={() => handleCreateAppointment({ period: 'end_day', color: 'red' })}
                    >
                      Registrar
                      </button>
                  </>
                )}

                {end_day.map(info => (
                  <Appointment key={info._id} color={info.color} name={name} date={info.date}/>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
