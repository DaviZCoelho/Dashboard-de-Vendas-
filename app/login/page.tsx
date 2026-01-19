'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { LogIn, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const preencherAcessoTeste = () => {
    setEmail('admin@exemplo.com') 
    setPassword('123')  
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert('Erro ao logar: ' + error.message)
    } else {
      router.push('/') 
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 text-slate-900">
        
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-2xl mb-2">
            <LogIn size={28} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Acessar Sistema
          </h1>
          <p className="text-slate-500 font-medium text-sm">Entre para gerenciar seus leads</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">
              E-mail
            </label>
            <input
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none transition-all text-slate-700 bg-slate-50/50 focus:bg-white focus:border-blue-200"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none transition-all text-slate-700 bg-slate-50/50 focus:bg-white focus:border-blue-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? 'Validando...' : 'Entrar no Dashboard'}
          </button>
        </form>

        {/* CARD DE ACESSO RÁPIDO*/}
        <div className="mt-8 p-6 bg-blue-50/50 border border-blue-100 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-xs font-black text-blue-600 uppercase tracking-widest">
                Conta de exemplo
              </p>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Clique no botão abaixo para preencher as credenciais de teste.
          </p>
          <p className="text-xs text-slate-500 font-medium leading-relaxed"></p>
          Email: admin@exemplo.com
          <p className="text-xs text-slate-500 font-medium leading-relaxed"></p>
          Senha: 123

          <button 
            type="button"
            onClick={preencherAcessoTeste}
            className="w-full py-3 px-4 bg-white border border-blue-200 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-100 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            Preencher Dados de Teste
          </button>
        </div>

      </div>
    </div>
  )
}