import React from 'react';
import { useAuth } from './hooks/useAuth';
import AuthView from './components/AuthView';
import MainView from './components/MainView';

export default function App() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen h-full flex flex-col items-center justify-center bg-gray-100 text-gray-900 p-4">
            <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 text-sm text-blue-500 cursor-pointer">
                Made on ZAPT
            </a>
            {!user ? (
                <AuthView />
            ) : (
                <MainView />
            )}
        </div>
    );
}