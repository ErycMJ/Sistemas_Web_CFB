import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import SignIn from "../src/components/Auth/SignIn"
import SignUp from "../src/components/Auth/SignUp"
import { PrivateRouter } from "../src/components/Private/PrivateRouter"
import { Profile } from "../src/components/Private/Profile"
import SignOut from "../src/components/Auth/SignOut"
import Faqs from "../src/components/Home/Faqs"
import Dashboard from "../src/components/Private/DashBoard"
import { useSelector } from "react-redux"
import Transaction from "../src/components/Private/Transaction"
import Category from "../src/components/Private/Category"
import GoalLimitModal from "../src/components/Private/GoalLimitModal"
import Sidebar from "../src/components/Layout/Sidebar"
import { useState } from "react"
import ChatModal from "../src/components/Layout/ChatModal"
import WelcomePage from "./components/WelcomePage"
import PrivateHeader from "./components/Private/Header"

export default function App() {
  const { currentUser } = useSelector((state) => state.user)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <>
      <BrowserRouter>
        <div className="app-container min-h-screen flex flex-col">
          <div className="flex flex-grow">
            {currentUser && <Sidebar />}

            <main
              className={`flex-grow transition-all duration-300 ${currentUser ? "ml-16" : ""
                }`}
            >
              {currentUser && <PrivateHeader />}

              <Routes>
                {currentUser ? (
                  <Route path="/dashboard" element={<Dashboard />} />
                ) : (
                  <Route path="/" element={<WelcomePage />} />
                )}
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route element={<PrivateRouter />}>
                  <Route path="/category" element={<Category />} />
                  <Route path="/transaction" element={<Transaction />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/goals-limits" element={<GoalLimitModal />} />
                  <Route path="/Signout" element={<SignOut />} />
                </Route>
              </Routes>
            </main>
          </div>


          <Toaster />

          <button
            className="fixed bottom-4 right-4 $bg-green-800 text-white p-3 rounded-full shadow-lg animate-pulse"
            onClick={toggleChat}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M12 3C7.03 3 3 7.03 3 12c0 1.82.5 3.53 1.36 5.01L3 21l3.99-1.36A8.961 8.961 0 0012 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"
              />
            </svg>
          </button>

          <ChatModal
            isOpen={isChatOpen}
            onClose={toggleChat}
            isLoggedIn={!!currentUser}
          />
        </div>
      </BrowserRouter>
    </>
  )
}
