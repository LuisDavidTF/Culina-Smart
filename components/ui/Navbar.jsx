'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Context
import { useAuth } from '@context/AuthContext';
import { useSettings } from '@context/SettingsContext';

// Icons
import { LogInIcon, LogOutIcon, PlusIcon, UserIcon } from './Icons';

// Simple Cog Icon for Settings
const CogIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Simple Menu Icon for internal use
const MenuIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const XIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { t } = useSettings();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Format user name for display (First Name + Last Initial)
  const getDisplayName = () => {
    if (!user || !user.name) return '';
    const nameParts = user.name.split(' ');
    // If we have more than one name, take the first and the initial of the last
    if (nameParts.length > 1) {
      return `${nameParts[0]} ${nameParts[nameParts.length - 1].charAt(0)}.`;
    }
    return nameParts[0];
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    router.push('/');
    setIsMobileMenuOpen(false);
    // Force a refresh to ensure the recipe feed is up to date when clicking logo
    router.refresh();
  };

  return (
    <header className="bg-background dark:bg-card shadow-xs sticky top-0 z-50 transition-colors duration-300 border-b border-border/50">
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main Navigation"
      >
        <div className="flex justify-between items-center h-16">

          {/* Logo / Home Link */}
          <Link href="/" onClick={handleLogoClick} className="shrink-0 flex items-center gap-2">
            <span className="text-2xl font-bold text-primary tracking-tight">
              Culina Smart
            </span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm font-medium text-foreground/80">
                  {t.nav.greeting} {getDisplayName()}
                </span>

                <Link
                  href="/create-recipe"
                  className="flex items-center text-sm font-medium px-4 py-2 rounded-lg text-primary-foreground bg-primary hover:opacity-90 transition-colors shadow-sm"
                  aria-label={t.nav.create}
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  {t.nav.create}
                </Link>

                <Link
                  href="/settings"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={t.nav.settings}
                >
                  <CogIcon className="w-5 h-5" />
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center text-sm font-medium px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted border border-border transition-colors hover:text-foreground"
                  aria-label={t.nav.logout}
                >
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  {t.nav.logout}
                </button>
              </>
            ) : (
              // Guest Users
              <>
                <Link
                  href="/login"
                  className="flex items-center text-sm font-medium px-4 py-2 rounded-lg text-secondary bg-secondary/10 hover:bg-secondary/20 transition-colors"
                >
                  <LogInIcon className="w-4 h-4 mr-2" />
                  {t.nav.login}
                </Link>

                <Link
                  href="/register"
                  className="flex items-center text-sm font-medium px-4 py-2 rounded-lg text-primary-foreground bg-primary hover:opacity-90 shadow-sm transition-colors"
                >
                  <UserIcon className="w-4 h-4 mr-2" />
                  {t.nav.register}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted focus:outline-none"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-200 bg-background dark:bg-card">
            <div className="flex flex-col space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="px-2 py-2 text-sm font-bold text-foreground border-b border-border/50 mb-2">
                    {t.nav.greeting} {getDisplayName()}
                  </div>
                  <Link
                    href="/create-recipe"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center text-base font-medium px-3 py-2 rounded-md text-primary bg-primary/10"
                  >
                    <PlusIcon className="w-5 h-5 mr-3" />
                    {t.nav.create}
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center text-base font-medium px-3 py-2 rounded-md text-muted-foreground hover:bg-muted"
                  >
                    <CogIcon className="w-5 h-5 mr-3" />
                    {t.nav.settings}
                  </Link>

                  <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="flex items-center w-full text-base font-medium px-3 py-2 rounded-md text-muted-foreground hover:bg-muted"
                  >
                    <LogOutIcon className="w-5 h-5 mr-3" />
                    {t.nav.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center text-base font-medium px-3 py-2 rounded-md text-secondary-foreground bg-secondary hover:opacity-90 shadow-sm transition-colors"
                  >
                    <LogInIcon className="w-5 h-5 mr-3" />
                    Acceder
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center text-base font-medium px-3 py-2 rounded-md text-primary-foreground bg-primary hover:opacity-90 transition-colors"
                  >
                    <UserIcon className="w-5 h-5 mr-3" />
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}