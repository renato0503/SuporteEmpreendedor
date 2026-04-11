import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export function renderLoginPage(container: HTMLElement) {
  container.innerHTML = `
    <div class="min-h-screen bg-[#0a1f14] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      <!-- Background elements -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(18,81,51,0.4),rgba(10,31,20,1))]"></div>
      <div class="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiMxYjYyNDAiLz48L2c+PC9zdmc+');"></div>

      <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-6 sm:px-0">
        <div class="flex flex-col items-center mb-10">
          <div class="w-16 h-16 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl group hover:scale-110 transition-transform duration-500">
            <img src="/logo.png" alt="Logo" class="w-10 h-10 object-contain">
          </div>
          <h2 class="mt-8 text-center text-4xl font-black text-white tracking-tighter">
            Suporte Empreendedor
          </h2>
          <p class="mt-3 text-center text-sm font-black text-[#F18825] uppercase tracking-[0.3em] opacity-80">
            Acesso Restrito — Hub Admin
          </p>
        </div>

        <div class="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 transform transition-all duration-700 hover:shadow-emerald-900/10">
          <div class="p-8 sm:p-12">
            <form id="login-form" class="space-y-6">
              <div>
                <label for="email" class="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">E-mail Corporativo</label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#125133] transition-colors">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                  <input id="email" name="email" type="email" autocomplete="email" required 
                    class="block w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl text-slate-900 text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#125133]/5 focus:border-[#125133] transition-all bg-slate-50/50"
                    placeholder="admin@suporteempreendedor.com">
                </div>
              </div>

              <div>
                <label for="password" class="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">Chave de Segurança</label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#125133] transition-colors">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  <input id="password" name="password" type="password" autocomplete="current-password" required 
                    class="block w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl text-slate-900 text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#125133]/5 focus:border-[#125133] transition-all bg-slate-50/50"
                    placeholder="••••••••••••">
                </div>
              </div>

              <div id="login-error" class="hidden animate-shake bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3">
                <svg class="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                <p class="text-xs font-bold text-red-600 uppercase tracking-tight" id="error-message">Credenciais Inválidas</p>
              </div>

              <button type="submit" id="submit-btn" class="w-full flex justify-center items-center gap-3 py-4 px-6 border border-transparent rounded-2xl shadow-xl text-sm font-black text-white bg-gradient-to-r from-[#125133] to-[#1a6b45] hover:from-[#1a6b45] hover:to-[#125133] focus:outline-none focus:ring-4 focus:ring-[#125133]/20 transition-all transform active:scale-[0.98] uppercase tracking-[0.2em]">
                <span id="btn-text">Autenticar Acesso</span>
                <span id="btn-loader" class="hidden animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></span>
              </button>
            </form>
          </div>
          
          <div class="bg-slate-50 px-8 py-6 border-t border-slate-100 flex items-center justify-between">
            <span class="text-[10px] text-slate-400 font-black uppercase tracking-widest">Inova Tech Cloud Protection</span>
            <div class="flex gap-2">
              <div class="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20"></div>
              <div class="w-2 h-2 rounded-full bg-slate-300"></div>
              <div class="w-2 h-2 rounded-full bg-slate-300"></div>
            </div>
          </div>
        </div>
        
        <p class="mt-8 text-center text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">
          Copyright &copy; 2026 Suporte Empreendedor
        </p>
      </div>
    </div>
  `;

  const form = document.getElementById('login-form') as HTMLFormElement;
  const errorEl = document.getElementById('login-error');
  const errorMsg = document.getElementById('error-message');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnLoader = document.getElementById('btn-loader');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    errorEl?.classList.add('hidden');
    submitBtn?.setAttribute('disabled', 'true');
    btnText?.classList.add('opacity-50');
    btnLoader?.classList.remove('hidden');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Auth state change will handle navigation
    } catch (error: any) {
      console.error('Login error:', error);
      if (errorEl && errorMsg) {
        errorEl.classList.remove('hidden');
        errorMsg.innerText = 'Credenciais Inválidas ou Erro de Rede';
      }
      submitBtn?.removeAttribute('disabled');
      btnText?.classList.remove('opacity-50');
      btnLoader?.classList.add('hidden');
    }
  });
}
