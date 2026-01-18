import { Suspense } from 'react';
import { AuthForm } from '@components/auth/AuthForm';

export const metadata = {
  title: 'Inicia Sesión',
  description: 'Accede a tu cuenta de Culina Smart para gestionar tus recetas y planificar tus comidas.',
  alternates: {
    canonical: '/login',
  },
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <AuthForm isRegister={false} />
    </Suspense>
  );
}