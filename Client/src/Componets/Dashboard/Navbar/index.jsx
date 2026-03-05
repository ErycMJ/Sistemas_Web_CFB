import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { CgProfile } from "react-icons/cg"
import { TbLogout } from "react-icons/tb"
import { FaBell } from 'react-icons/fa';
import { useHeader } from "../../../hooks/layout"
import Button from "../../../shared/utils/Button/index"

export default function Header() {
    const { currentUser } = useSelector((state) => state.user)
    const {
        dropdownOpen,
        notificationDropdownOpen,
        notifications,
        greeting,
        dropdownRef,
        notificationDropdownRef,
        setDropdownOpen,
        setNotificationDropdownOpen,
        toggleDropdown,
        toggleNotificationDropdown,
    } = useHeader()

    return (
        <header
            className={`${currentUser ? "bg-white" : "bg-green-200"} shadow-md py-4`}
        >
            <div className="flex justify-between items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="hidden md:flex space-x-4">
                    <Link
                        to="/dashboard"
                        className="text-green-800 text-xl font-medium"
                    >
                        Bem-vindo ao Controle de Finanças
                    </Link>
                </div>

                <div className="relative flex items-center">
                    <div className="hidden md:flex items-center">
                        <Button
                            onClick={toggleDropdown}
                            text={`${greeting}, @${currentUser.user.username}`}
                            color="transparent"
                        />
                        <div className="relative mx-3">
                            <button
                                onClick={toggleNotificationDropdown}
                                className="relative"
                            >
                                <FaBell className="text-2xl text-green-800 mt-1" />
                                {notifications > 0 && (
                                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-600 text-white rounded-md text-xs flex items-center justify-center">
                                        {notifications}
                                    </span>
                                )}
                            </button>
                            {notificationDropdownOpen && (
                                <div
                                    ref={notificationDropdownRef}
                                    className="absolute right-0 mt-8 w-64 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                                    role="menu"
                                >
                                    <div className="py-1" role="none">
                                        {notifications > 0 ? (
                                            <>
                                                <p className="px-4 py-2 text-md text-green-800">
                                                    Você tem {notifications} novas notificações.
                                                </p>
                                                <Link
                                                    to="/notifications"
                                                    className="flex rounded-md px-4 py-2 text-md font-medium text-green-800 hover:bg-green-100 hover:text-gray-700"
                                                    role="menuitem"
                                                    onClick={() => setNotificationDropdownOpen(false)}
                                                >
                                                    Ver todas as notificações
                                                </Link>
                                            </>
                                        ) : (
                                            <p className="px-4 py-2 text-md text-green-800">
                                                Nenhuma nova notificação.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        {dropdownOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute right-0 mt-40 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                                role="menu"
                            >
                                <div className="py-1" role="none">
                                    <Link
                                        to="/profile"
                                        className="flex rounded-md px-4 py-2 text-md font-medium text-green-800 hover:bg-green-100 hover:text-gray-700"
                                        role="menuitem"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <CgProfile className="text-2xl flex-grow" />
                                        <span className="mx-auto flex-none w-3/4">Perfil</span>
                                    </Link>
                                    <Link
                                        to="/signout"
                                        className="flex rounded-md px-4 py-2 text-md font-medium text-green-800 hover:bg-green-100 hover:text-gray-700"
                                        role="menuitem"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <TbLogout className="text-2xl flex-grow" />
                                        <span className="mx-auto flex-none w-3/4">Sair</span>
                                    </Link>
                                    <p className="text-gray-400 text-xs text-center mt-2">
                                        V1.0.3
                                    </p>{" "}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
