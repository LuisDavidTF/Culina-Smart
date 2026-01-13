'use client';

import React from 'react';
import { useSettings } from '@context/SettingsContext';

export function Footer() {
    const { t } = useSettings();

    return (
        <footer className="mt-16 pb-8 text-center" role="contentinfo">
            <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Culina Smart. {t.common?.rights || 'Todos los derechos reservados.'}
            </p>
        </footer>
    );
}
