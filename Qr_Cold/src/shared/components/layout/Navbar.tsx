import React from 'react';
import { Snowflake, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useQRStore } from '../../../features/qr-generator/store/useQRStore';
import { signInWithGoogle, logout } from '../../lib/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const Navbar: React.FC = () => {
  const { user } = useQRStore();
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      if (error.code === 'auth/cancelled-popup-request') {
        console.warn('Sign-in popup was cancelled or is already open.');
      } else {
        console.error('Error signing in with Google:', error);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <header className="h-20 border-b border-white/5 bg-[#0B0C11]/50 backdrop-blur-md flex items-center justify-between px-12 z-50 sticky top-0">
      <div className="flex items-center gap-3 select-none group cursor-pointer">
        <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(165,243,252,0.3)] group-hover:shadow-[0_0_30px_rgba(165,243,252,0.5)] transition-all">
          <Snowflake className="w-6 h-6 text-background animate-pulse" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-2xl font-black tracking-tighter text-white">QR <span className="text-primary italic">COLD</span></span>
          <span className="text-[8px] uppercase font-bold tracking-[0.3em] text-muted-foreground opacity-60">Minimalist Studio</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
              <Avatar className="w-8 h-8 border border-primary/20">
                <AvatarImage src={user.photoURL || ''} />
                <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                  {user.displayName?.charAt(0) || <UserIcon className="w-3 h-3" />}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white truncate max-w-[100px]">{user.displayName}</span>
                <span className="text-[8px] text-muted-foreground uppercase tracking-widest font-bold">Member</span>
              </div>
            </div>
            <Button 
              variant="ghost"
              size="icon"
              className="h-11 w-11 bg-white/5 hover:bg-red-500/10 hover:text-red-500 border border-white/10 text-muted-foreground rounded-2xl transition-all"
              onClick={logout}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button 
            size="sm" 
            disabled={isLoggingIn}
            className="h-11 bg-primary hover:bg-primary/90 text-background gap-3 px-6 rounded-2xl transition-all font-bold text-xs tracking-widest uppercase shadow-[0_10px_20px_-5px_rgba(165,243,252,0.3)] disabled:opacity-50" 
            onClick={handleLogin}
          >
            {isLoggingIn ? (
              <Snowflake className="w-4 h-4 animate-spin" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {isLoggingIn ? 'Signing In...' : 'Sign In'}
          </Button>
        )}
      </div>
    </header>
  );
};
