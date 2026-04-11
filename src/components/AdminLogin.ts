import { signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { $ } from '../utils/dom';

export function renderAdminLogin(container: HTMLElement) {
  container.innerHTML = `
    <div class="min-h-screen flex items-center justify-center p-4 bg-dark-900 hero-pattern">
      <div class="max-w-md w-full bg-dark-800 p-10 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] reveal active">
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center p-4 bg-dark-900 rounded-2xl mb-6 shadow-2xl border border-white/5">
            <img src="/logo.png" alt="Logo" class="w-10 h-10 object-contain">
          </div>
          <h1 class="text-3xl font-black text-white font-display tracking-tight">Portal Admin</h1>
          <p class="text-slate-500 text-sm mt-3 font-medium">Gestão de Leads & Performance</p>
        </div>

        <div id="login-error" class="hidden mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-center text-xs font-bold animate-pulse">
          Acesso negado. Verifique suas credenciais.
        </div>

        <form id="login-form" class="space-y-6 mb-8">
          <div class="space-y-2">
            <label class="text-[11px] uppercase font-black tracking-[0.2em] text-slate-500 ml-1">E-mail Corporativo</label>
            <input type="email" id="login-email" required placeholder="admin@admin.com" 
              class="w-full bg-dark-700/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-cta focus:bg-dark-700 ring-0 outline-none transition-all placeholder:text-slate-700">
          </div>
          <div class="space-y-2">
            <label class="text-[11px] uppercase font-black tracking-[0.2em] text-slate-500 ml-1">Senha Privada</label>
            <input type="password" id="login-pass" required placeholder="••••••••" 
              class="w-full bg-dark-700/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-cta focus:bg-dark-700 ring-0 outline-none transition-all placeholder:text-slate-700">
          </div>
          <button 
            type="submit"
            class="w-full bg-cta text-white font-black py-5 rounded-2xl hover:bg-cta-hover transition-all transform hover:scale-[1.01] active:scale-95 shadow-xl shadow-cta/10 mt-4 leading-none"
          >
            Acessar Ecossistema
          </button>
        </form>

        <div class="flex items-center gap-4 mb-8">
          <div class="flex-grow h-px bg-white/5"></div>
          <span class="text-[10px] font-black text-slate-700 uppercase tracking-widest">Controle de Segurança</span>
          <div class="flex-grow h-px bg-white/5"></div>
        </div>

        <button 
          id="btn-google-login"
          class="w-full flex items-center justify-center gap-3 bg-white/5 text-slate-300 font-bold py-4 rounded-2xl hover:bg-white/10 hover:text-white transition-all border border-white/10"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Autenticação Google
        </button>

        <p class="mt-10 text-[10px] text-center text-slate-700 uppercase tracking-[0.3em] font-black">
          © INOVA TECH SOLUÇÕES
        </p>
      </div>
    </div>
  `;

  const loginForm = $('#login-form') as HTMLFormElement;
  const loginBtn = $('#btn-google-login');
  const errorDiv = $('#login-error');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = ($('#login-email') as HTMLInputElement).value;
      const pass = ($('#login-pass') as HTMLInputElement).value;

      try {
        errorDiv?.classList.add('hidden');
        await signInWithEmailAndPassword(auth, email, pass);
      } catch (error) {
        console.error('Email login failed:', error);
        errorDiv?.classList.remove('hidden');
      }
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      try {
        errorDiv?.classList.add('hidden');
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error('Google login failed:', error);
        errorDiv?.classList.remove('hidden');
      }
    });
  }
}
