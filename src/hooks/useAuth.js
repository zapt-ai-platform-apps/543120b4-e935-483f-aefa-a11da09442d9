import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export function useAuth() {
    const [user, setUser] = useState(supabase.auth.user());
    const [session, setSession] = useState(supabase.auth.session());

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setSession(session);
        });

        return () => {
            authListener?.unsubscribe();
        };
    }, []);

    return { user, session };
}