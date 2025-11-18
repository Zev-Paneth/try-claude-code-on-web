import { ThemeProvider } from './contexts/ThemeContext';
import { NavigationHebrew } from './components/hebrew-site/NavigationHebrew';
import { HeroHebrew } from './components/hebrew-site/HeroHebrew';
import { ServicesHebrew } from './components/hebrew-site/ServicesHebrew';
import { WhyUsHebrew } from './components/hebrew-site/WhyUsHebrew';
import { ContactHebrew } from './components/hebrew-site/ContactHebrew';
import { WhatsAppButton } from './components/hebrew-site/WhatsAppButton';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';

function AppHebrew() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-white dark:bg-black transition-colors duration-300">
        {/* Custom Cursor */}
        <CustomCursor />

        {/* Scroll Progress */}
        <ScrollProgress />

        {/* Navigation */}
        <NavigationHebrew />

        {/* WhatsApp Button */}
        <WhatsAppButton />

        {/* Main Content */}
        <main>
          <div id="home">
            <HeroHebrew />
          </div>

          <div id="services">
            <ServicesHebrew />
          </div>

          <div id="why-us">
            <WhyUsHebrew />
          </div>

          <div id="contact">
            <ContactHebrew />
          </div>
        </main>

        {/* Footer */}
        <footer className="relative py-12 px-4 bg-slate-50 dark:bg-slate-950 border-t-2 border-gray-200 dark:border-slate-800" dir="rtl">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              © 2024 שם החברה | כל הזכויות שמורות
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              בנוי עם ❤️ באמצעות React, TypeScript, Framer Motion
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default AppHebrew;
