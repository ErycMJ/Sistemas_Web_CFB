import { Link, Navigate } from 'react-router-dom';
import { useSignIn } from '../../hooks/auth';

const SignIn = () => {
    const { currentUser, handleChange, handleSubmit } = useSignIn();
    if (currentUser) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <>
            <div className='p-7 max-w-lg mx-auto bg-green-200 my-10 rounded-2xl'>
                <h1 className='text-3xl text-center text-green-800 font-semibold my-5'>Entrar</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input
                        type='email'
                        placeholder='E-mail'
                        className='border p-3 rounded-lg text-green-900 font-medium'
                        id='email'
                        onChange={handleChange}
                    />
                    <input
                        type='password'
                        placeholder='Senha'
                        className='border p-3 rounded-lg text-green-900 font-medium'
                        id='password'
                        onChange={handleChange}
                    />
                    <button type='submit'
                        className='bg-green-800 text-white p-3 rounded-lg text-2xl font-bold hover:opacity-90 disabled:opacity-80 my-2'
                    >
                        Entrar
                    </button>
                    <span className='text-center text-green-800 text-sm font-medium'>OU</span>
                </form>
                <div className='flex gap-2 mt-5 justify-center'>
                    <p>Não tem uma conta?</p>
                    <Link to={'/signup'}>
                        <span className='text-blue-700'>
                            Cadastre-se</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default SignIn