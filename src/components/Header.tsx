'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top Bar */}
      <div className="bg-red-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>O CLUBE DO POVO</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/admin" className="hover:underline">
              Painel Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">SCI</span>
            </div>
            <div className="ml-3 hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">
                Sport Club Internacional
              </h1>
              <p className="text-sm text-gray-600">Serviço Social / Alojamento</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">
              Início
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-red-600 font-medium">
              Sobre
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-red-600 font-medium">
              Contato
            </Link>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-red-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">
                Início
              </Link>
              <Link href="/sobre" className="text-gray-700 hover:text-red-600 font-medium">
                Sobre
              </Link>
              <Link href="/contato" className="text-gray-700 hover:text-red-600 font-medium">
                Contato
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-red-600 font-medium">
                Painel Admin
              </Link>
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="Buscar"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

