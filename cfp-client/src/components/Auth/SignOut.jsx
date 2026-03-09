import { useSignOut } from '../../hooks/auth/useSignOut';

export const SignOut = () => {
  useSignOut();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Saindo...</h1>
      </div>
    </div>
  );
};

export default SignOut;
