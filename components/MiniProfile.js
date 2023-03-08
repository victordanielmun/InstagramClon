

function MiniProfile() {
  return (
    <div  className="flex items-center justify-between mt-14 ml-10">
        <img className="h-16 rounded-full border p-[2px]" src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="user-imagen" />
        <div className="flex-1 ml-4">
            <h2 className="font-bold ">Usuario</h2>
            <h3 className="text-sm text-gray-400 ">Welcom to instagram</h3>
        </div>
        <button className="font-semibold text-blue-400 text-sm">Sign Out</button>
    </div>
  )
}

export default MiniProfile