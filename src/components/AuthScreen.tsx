import React, { useState } from 'react';
import { motion } from 'motion/react';
import { auth, db } from '../lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Shield, Mail, Lock, User as UserIcon, Chrome } from 'lucide-react';

export function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const syncUserToFirestore = async (user: any) => {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        userId: user.uid,
        fullName: fullName || user.displayName || 'New User',
        email: user.email,
        stats: {
          totalAnalyses: 0,
          avgTrustRate: 0,
          streak: 0,
          rank: 'Bronze'
        },
        badges: ['Novice'],
        theme: 'dark',
        createdAt: new Date().toISOString()
      });
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await syncUserToFirestore(result.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await syncUserToFirestore(result.user);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await syncUserToFirestore(result.user);
      }
    } catch (err: any) {
      setError(err.message === 'auth/operation-not-allowed' 
        ? 'Email/Password auth is not enabled in Firebase Console. Please enable it to use this method.' 
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-dark-bg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass p-8 rounded-[40px] space-y-8"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center shadow-xl">
            <Shield size={32} className="text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold tracking-tight text-white uppercase">AGAAHI</h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">
              {isLogin ? 'Sign in to your account' : 'Create your secure account'}
            </p>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-2xl text-error text-[10px] font-bold uppercase text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full glass rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-neon-cyan/50 focus:outline-none ring-1 ring-white/10"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full glass rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-neon-cyan/50 focus:outline-none ring-1 ring-white/10"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full glass rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-neon-cyan/50 focus:outline-none ring-1 ring-white/10"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-neon-cyan text-black rounded-2xl py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold text-white/20">
            <span className="bg-dark-surface px-4">Or continue with</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full glass border border-white/10 rounded-2xl py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/5 transition-all active:scale-95 disabled:opacity-50"
        >
          <Chrome size={18} className="text-neon-cyan" />
          Google Account
        </button>

        <div className="text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] font-bold text-white/30 uppercase tracking-widest hover:text-neon-cyan transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
