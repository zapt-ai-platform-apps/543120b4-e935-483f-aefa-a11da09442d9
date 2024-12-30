import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabaseClient';

export default function SignIn() {
    return (
        <div className="w-full max-w-md">
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Sign in with ZAPT</h2>
                <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Visit ZAPT
                </a>
            </div>
            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="dark"
            />
        </div>
    );
}