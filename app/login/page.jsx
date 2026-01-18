import { AuthForm } from '@components/auth/AuthForm';

export const metadata = {
  title: 'Inicia Sesión',
  description: 'Accede a tu cuenta de Culina Smart para gestionar tus recetas y planificar tus comidas.',
  alternates: {
    canonical: '/login',
  },
};

export default function LoginPage() {
  return <AuthForm isRegister={false} />;
}