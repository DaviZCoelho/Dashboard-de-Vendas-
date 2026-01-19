'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LeadForm({ onLeadAdded }: { onLeadAdded: () => void }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    const { error } = await supabase.from('leads').insert([{ nome, email, user_id: session?.user.id }])

    if (!error) {
      setNome(''); setEmail(''); onLeadAdded()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
      <h3 className="text-lg font-bold mb-4 text-slate-800">Novo Lead</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Nome do Lead"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700 bg-slate-50"
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700 bg-slate-50"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Adicionar Lead'}
        </button>
      </div>
    </form>
  )
}