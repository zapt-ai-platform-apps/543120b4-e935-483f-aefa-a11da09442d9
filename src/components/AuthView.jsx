import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../supabaseClient';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthView() {
    return (
        <div className="w-full max-w-md">
            <h2 className="text-2xl mb-4 text-center">Sign in with ZAPT</h2>
            <a
                href="https://www.zapt.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mb-4 block text-center"
            >
                Visit ZAPT
            </a>
            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={['google', 'facebook', 'apple']}
                className="cursor-pointer"
            />
        </div>
    );
}