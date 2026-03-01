import { Link, Navigate } from 'react-router-dom';
import { useSignUp } from '../../hooks/auth';

const SignUp = () => {
    const { currentUser, handleChange, handleSubmit } = useSignUp();
    if (currentUser) {
        return <Navigate to="/dashboard" />;
    }
  return (
    <>
        <div className='p-7 max-w-lg mx-auto bg-green-200 my-10 rounded-2xl'>
            <h1 className='text-3xl text-center text-green-800 font-semibold my-5'>
            Cadastre-se </h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Nome de usuário'
                    className='border p-3 rounded-lg text-green-900 font-medium'
                    id='username'
                    onChange={handleChange}
                />
                <div className='flex items-center gap-4'>
                        <input
                            type='email'
                            placeholder='E-mail'
                            className='border p-3 rounded-lg text-green-900 font-medium flex-grow'
                            id='email'
                            onChange={handleChange}
                        />
                    </div>
                <input
                    type='password'
                    placeholder='Senha'
                    className='border p-3 rounded-lg text-green-900 font-medium'
                    id='password'
                    onChange={handleChange}
                />         
                <input
                    type='text'
                    placeholder='Telefone'
                    className='border p-3 rounded-lg text-green-900 font-medium'
                    id='mobile'
                    onChange={handleChange}
                />
                <button type='submit'                    
                    className='bg-green-800 text-white p-3 rounded-lg text-2xl font-bold hover:opacity-90 disabled:opacity-80 my-2'
                    >
                    
Cadastre-se
                </button>
                <span className='text-center text-green-800 text-sm font-medium'>OU</span>
            </form>
            <div className='flex gap-2 mt-5 justify-center'>
                <p>Já tem uma conta?</p>
                <Link to={'/signin'}>
                    <span className='text-blue-700'>
                    Entrar</span>
                </Link>
            </div>
        </div>
    </>
  )
}

export default SignUp