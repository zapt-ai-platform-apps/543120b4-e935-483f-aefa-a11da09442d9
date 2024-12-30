import { initializeZapt } from '@zapt/zapt-js';

const { supabase } = initializeZapt(process.env.VITE_PUBLIC_APP_ID);

/**
 * Authenticate the user based on the Authorization header.
 * @param {Request} req 
 * @returns {Promise<Object>} User object
 */
export async function authenticateUser(req) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
        throw new Error('Missing Authorization header');
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
        throw new Error('Invalid token');
    }

    return user;
}