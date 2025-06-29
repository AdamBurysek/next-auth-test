"use client";

import { useSession, signOut } from "next-auth/react";
import { User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status || "loading";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Next Auth Test
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {status === "loading" ? (
                <div className="animate-pulse">
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
              ) : session ? (
                <div className="flex items-center space-x-4">
                  {/* User Info */}
                  <div className="flex items-center space-x-3">
                    {session.user?.image ? (
                      <img
                        src={session.user.image || "/placeholder.svg"}
                        alt="Profile"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      {session.user?.name || session.user?.email || "Uživatel"}
                    </span>
                  </div>
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Odhlásit
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Přihlásit
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Registrovat
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                {status === "loading" ? (
                  <div className="animate-pulse">
                    <div className="h-8 w-full bg-gray-200 rounded"></div>
                  </div>
                ) : session ? (
                  <div className="space-y-3">
                    {/* User Info Mobile */}
                    <div className="flex items-center space-x-3 px-3 py-2">
                      {session.user?.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={session.user.image || "/placeholder.svg"}
                          alt="Profile"
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-700">
                        {session.user?.name ||
                          session.user?.email ||
                          "Uživatel"}
                      </span>
                    </div>
                    {/* Logout Button Mobile */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Odhlásit
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Link
                      href="/login"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Přihlásit
                    </Link>
                    <Link
                      href="/register"
                      className="block px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Registrovat
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Vítejte v <span className="text-blue-600">Next Auth Test</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Moderní webová aplikace s pokročilým systémem autentifikace.
            Bezpečné přihlašování, registrace a správa uživatelských účtů.
          </p>

          {session ? (
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                Vítejte zpět,{" "}
                <span className="font-semibold text-blue-600">
                  {session.user?.name || session.user?.email || "Uživatel"}
                </span>
                !
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/mainpage"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
                >
                  Pokračovat do aplikace
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
              >
                Registorvat
              </Link>
              <Link
                href="/login"
                className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg border-2 border-gray-300 transition-colors"
              >
                Přihlásit se
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
