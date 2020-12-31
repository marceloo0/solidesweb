export default function Appointment({ color, name, date }) {
  return (
    <>
      <div className={"flex flex-col h-30 w-full px-4 py-2 m-2 md:flex-row md:justify-between bg-gray-100 my-3 border-l-8 border-r-8 border-" + color + "-600 rounded-xl"}>
        <div className="flex py-1">
          <div className="flex items-center pointer-events-none">
          <svg className={"stroke-current text-" + color + "-500 h-8 w-8"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="flex items-center ml-2">{name}</h1>
        </div>
        <div className="flex mr-5">
          <div className="flex items-center pointer-events-none">
            <svg className={"stroke-current text-" + color + "-300 h-8 w-8"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="flex items-center ml-2">{date}</h1>
        </div>
      </div>
    </>
  )
}
