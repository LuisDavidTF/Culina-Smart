import { Suspense } from 'react';
import { AuthForm } from '@components/auth/AuthForm';

export const metadata = {
  title: 'Regístrate',
  description: 'Crea tu cuenta en Culina Smart y empieza a organizar tus recetas favoritas hoy mismo.',
  alternates: {
    canonical: '/register',
  },
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <AuthForm isRegister={true} />
    </Suspense>
  );
}