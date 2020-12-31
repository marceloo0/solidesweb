import Image from 'next/image';
import Link from 'next/link';

type Props = {
  name: string;
}


export default function Appointment({name}) {
  return (
    <>
      <div className={"flex bg-red-50 h-24 md:h-36 justify-center"}>
        <div className="flex w-4/5 justify-between">
          <div className="flex items-center">
              <Image src="/logo.svg" height={55} width={128} />
            <div className="hidden md:inline ml-3">
              <h1 className="text-indigo-700 font-semibold text-xl">Bem-vindo</h1>
              <p className="text-indigo-400">{name}</p>
            </div>
          </div>

          <div className="flex items-center">
            <nav className="hidden md:inline">
              <ul className="flex mr-4">
                <li className="flex">
                  <Link href={`/registrar/${name}`} >
                    <a className="text-xl text-gray-500 text-center hover:text-gray-700 hover:underline">Registrar</a>
                  </Link>
                </li>
                <li className="ml-2">
                  <Link href={`/listar/${name}`}>
                    <a className="text-xl text-gray-500 text-center hover:text-gray-700 hover:underline">Listar</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
