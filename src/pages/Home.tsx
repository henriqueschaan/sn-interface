import { useState } from 'react';
import capa from '../assets/capa.png';
import { Login } from '../components/Login';
import { SignUp } from '../components/SignUp';

export function Home() {
    const [signUp, setSignUp] = useState(false);

    return (
        <div className="lg:flex justify-between">
            {signUp ? <SignUp onSignUpClick={() => setSignUp(false)}/> : <Login onSignUpClick={() => setSignUp(true)}/> }
            <div className="hidden lg:flex max-w-[60%] overflow-hidden">
                <img src={capa} className="w-full object-cover object-left" />
            </div>
        </div>
    );
}