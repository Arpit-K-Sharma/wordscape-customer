import React from 'react'

function Navbar() {
  return (
    <div className="navbar bg-zinc-800 max-lg:hidden">
        <div className="navbar-start mr-[100px]">
          <a className="btn btn-ghost text-xl">WordScape</a>
        </div>
        <div className="navbar-end">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-[40px] text-[16px]">
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>Place an order</a>
              </li>
              <li>
                <a>Cost calculation</a>
              </li>
              <li>
                <a>Statement</a>
              </li>
            </ul>
          </div>
          <a className="btn">Logout</a>
        </div>
      </div>
  )
}

export default Navbar