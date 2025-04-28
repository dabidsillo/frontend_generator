import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <>
      <main className="max-w-4xl m-auto mt-10 md:mt-28 flex flex-col md:flex-row items-center">
        <div className="p-10">
          <h1 className="text-4xl">
            Bienvenido a FrontEnd
            <span className="font-bold">Generator</span>
          </h1>
        </div>

        <div className="p-10 w-full">
          <Outlet />
        </div>
      </main>
    </>
  );
}
