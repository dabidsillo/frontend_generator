export default function ValidationError({children}) {
  return (
    <div className="text-center my-2 bg-red-700 text-white font-bold p-2 rounded-md">
        {children}
    </div>
  )
}
