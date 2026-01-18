import { AuthForm } from '@components/auth/AuthForm';

export const metadata = {
  title: 'Regístrate',
  description: 'Crea tu cuenta en Culina Smart y empieza a organizar tus recetas favoritas hoy mismo.',
  alternates: {
    canonical: '/register',
  },
};

export default function RegisterPage() {
  return <AuthForm isRegister={true} />;
}