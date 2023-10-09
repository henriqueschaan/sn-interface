import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../services/api';
import { AxiosError } from 'axios';
import homeLogo from '../assets/homeLogo.png';
import google from '../assets/google.png';
import apple from '../assets/apple.png';

type LoginProps = {
    onSignUpClick: () => void;
};

export function Login({ onSignUpClick }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        if (!username || !password) {
            setError(400);
            setErrorMessage('• Digite usuário e senha.');
            return;
        }
        try {
            const response = await API.post('/login', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('username', response.data.username);
            navigate('/feed');
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                switch (axiosError.response.status) {
                    case 401:
                        setError(401);
                        setErrorMessage('• Senha incorreta');
                        break;
                    case 404:
                        setError(404);
                        setErrorMessage('• Usuário não existe');
                        break;
                    default:
                        setError(500);
                        setErrorMessage('• Erro ao fazer login. Por favor, tente novamente');
                }
            } else {
                console.error('Erro no login: ', axiosError.message);
                setErrorMessage('• Erro ao fazer login. Por favor, tente novamente');
            }
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen mx-auto">
            <div className="w-[300px] my-[56px]">
                <div className="flex items-center justify-center mb-[48.26px] lg:mb-[121.82px] lg:mt-12">
                    <img src={homeLogo} alt="" />
                </div>
                <form onSubmit={handleLogin}>
                    <h1 className="text-[20px] font-semibold mb-6">Faça seu login</h1>
                    <label htmlFor="username" className="block text-[#303030] mb-[5px] text-[15px]">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Digite seu username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`pl-[17px] py-[10px] border ${(error === 404) || ((error === 400) && !username) ? 'border-[#F37671]' : 'border-[#A09F9F]' } rounded-lg w-full mb-[22px] text-[15px] text-[#666666]`}
                    />
                    <label htmlFor="password" className="block text-[#303030] mb-[5px] text-[15px]">Senha</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`pl-[17px] py-[10px] border ${(error === 401) || ((error === 400) && !password) ? 'border-[#F37671]' : 'border-[#A09F9F]' } rounded-lg w-full mb-[11px] text-[15px] text-[#666666]`}
                    />
                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-[#666666] text-[12px]">
                            <div className="w-3.5 h-3.5 relative rounded border border-red-400 mr-2">
                                <div className="w-3.5 h-3.5 left-0 top-0 absolute rounded-lg" />
                            </div>
                            Lembra senha
                        </label>
                        <span className="underline cursor-pointer text-[#666666] text-[12px]">Esqueci minha senha</span>
                    </div>
                    <div className="min-h-[51px] flex items-end justify-end pb-2">
                        {(error === 400 || error === 500) && <div className="text-[#F37671]">{errorMessage}</div>}
                        {error === 404 && <div className="text-[#F37671]">{errorMessage}</div>}
                        {error === 401 && <div className="text-[#F37671]">{errorMessage}</div>}
                    </div>
                    <button type="submit" className="py-3 shadow-custom bg-[#F37671] text-white rounded-[10px] w-full mb-[27px]">Entrar</button>
                    <div className="text-center mb-[33px] text-[15px]">
                        Não possui conta? <span className="underline cursor-pointer text-[#F37671] font-bold" onClick={onSignUpClick}>Cadastre-se</span>
                    </div>
                    <div className="flex items-center justify-between mb-6 text-[#A09F9F] text-[12px]">
                        <div className="w-[90px] h-[2px] opacity-40 bg-[#A09F9F]" />
                        Entrar com
                        <div className="w-[90px] h-[2px] opacity-40 bg-[#A09F9F]" />
                    </div>
                    <div className="flex justify-center items-center w-[300px] h-12 bg-white rounded-[10px] shadow-custom2 mb-[14px] text-[#A09F9F]">
                        <img src={google} alt="" className="mr-[20px]" />
                        <p>Entrar com Google</p>
                    </div>
                    <div className="flex justify-center items-center w-[300px] h-12 bg-white rounded-[10px] shadow-custom2 text-[#A09F9F]">
                        <img src={apple} alt="" className="mr-[20px]" />
                        <p>Entrar com Apple</p>
                    </div>
                </form>
            </div>
        </div>
    );
}