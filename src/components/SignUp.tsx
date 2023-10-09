import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../services/api';
import homeLogo from '../assets/homeLogo.png';
import back from '../assets/back.png';

type LoginProps = {
    onSignUpClick: () => void;
};

export function SignUp({ onSignUpClick }: LoginProps) {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [profileLink, setProfileLink] = useState('');
    const [error, setError] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleNext = () => {
        let unfilledFields = [];
        if (!name) unfilledFields.push('name');
        if (!email) unfilledFields.push('email');
        if (!username) unfilledFields.push('username');
        if (!password) unfilledFields.push('password');
        setHasSubmitted(true);

        if (unfilledFields.length > 0) {
            setError('• Campo não preenchido');
        } else {
            setError('');
            setStep(2);
        }
    };

    const handleSubmit = async () => {
        localStorage.removeItem('token');
        try {
            await API.post('/signup', {
                name,
                username,
                phone,
                email,
                password,
                profileLink,
                description,
            });
            navigate('/feed');
        } catch (error) {
            console.error('Erro no cadastro:', error);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen mx-auto">
            <div className="w-[300px] mt-[56px] lg:mt-[103px] mb-5 relative">
                {step === 2 && <button onClick={() => setStep(1)} className="absolute -top-5 -left-2 lg:-top-7 lg:-left-10"><img src={back} alt="back" /></button>}
                <div className="flex items-center justify-center mb-[42.26px] lg:mb-12">
                    <img src={homeLogo} alt="Logo" />
                </div>
                {step === 1 ? (
                    <div className="flex flex-col">
                        <h1 className="text-[20px] font-semibold mb-[13px]">Crie sua conta</h1>
                        <label htmlFor="name" className="text-[#303030] mb-[5px] text-[15px]">Nome</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Digite seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={`${!name && hasSubmitted ? 'border-[#F37671]' : 'border-[#A09F9F]'} px-4 py-[10px] border border-[#A09F9F] rounded-lg mb-[7px] lg:mb-4 text-[15px] text-[#666666] truncate w-full`}
                            maxLength={100}
                        />
                        <label htmlFor="email" className="text-[#303030] mb-[5px] text-[15px]">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Digite seu E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`${!email && hasSubmitted ? 'border-[#F37671]' : 'border-[#A09F9F]'} px-4 py-[10px] border border-[#A09F9F] rounded-lg mb-[7px] lg:mb-4 text-[15px] text-[#666666] truncate w-full`}
                            maxLength={100}
                        />
                        <label htmlFor="username" className="text-[#303030] mb-1 text-sm">Username</label>
                        <div className="relative mb-2 lg:mb-4">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 h-7">@</span>
                            <input
                                id="username"
                                type="text"
                                placeholder="seu_username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className={`${!username && hasSubmitted ? 'border-[#F37671]' : 'border-[#A09F9F]'} w-full pl-8 pr-4 py-2.5 border border-[#A09F9F] rounded-lg text-sm text-gray-600 truncate`}
                                maxLength={100}
                            />
                        </div>
                        <label htmlFor="description" className="text-[#303030] mb-[5px] text-[15px]">Descrição</label>
                        <textarea
                            id="description"
                            placeholder="Faça uma descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="px-4 py-[10px] border border-[#A09F9F] rounded-lg mb-[7px] lg:mb-4 text-[15px] text-[#666666] h-[44.5px] resize-none w-full"
                            maxLength={200}
                        />
                        <label htmlFor="phone" className="text-[#303030] mb-[5px] text-[15px]">Celular</label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="Digite seu número de celular"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="px-4 py-[10px] border border-[#A09F9F] rounded-lg mb-[7px] lg:mb-4 text-[15px] text-[#666666] truncate w-full"
                            maxLength={100}
                        />
                        <label htmlFor="password" className="text-[#303030] mb-[5px] text-[15px]">Senha</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={`${!password && hasSubmitted ? 'border-[#F37671]' : 'border-[#A09F9F]'} px-4 py-[10px] border border-[#A09F9F] rounded-lg mb-[32px] text-[15px] text-[#666666] truncate w-full`}
                            maxLength={200}
                        />
                        
                        {error && (!name || !email || !username || !password) &&
                        <div className="text-[#F37671] text-[15px] font-semibold text-right -mt-[26.5px] mb-[4px]">{error}</div>}

                        <button onClick={handleNext} className="py-3 shadow-custom bg-[#F37671] text-white rounded-[10px] w-full mb-[27px] lg:mb-11">Próximo</button>
                        <div className="text-center mb-[33px] text-[15px]">
                            Já possui conta? <span className="underline cursor-pointer text-[#F37671] font-bold" onClick={onSignUpClick}>Entrar</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <h1 className="text-[19px] font-semibold mt-[61px] lg:mt-[161px] mb-16 lg:mb-[85px]">Insira o link da sua foto de perfil</h1>
                        <label htmlFor="profileLink" className="text-[#303030] mb-[5px] text-[15px]">Link</label>
                        <input
                            id="profileLink"
                            type="url"
                            placeholder="Insira seu link"
                            value={profileLink}
                            onChange={(e) => setProfileLink(e.target.value)}
                            required
                            className="px-4 py-[10px] border border-[#A09F9F] rounded-lg mb-[31px] text-[15px] text-[#666666] truncate w-full"
                            maxLength={200}
                        />
                        <button onClick={handleSubmit} className="py-3 shadow-custom bg-[#F37671] text-white rounded-[10px] w-full mb-[27px]">Salvar</button>
                    </div>
                )}
            </div>
        </div>
    );

}
