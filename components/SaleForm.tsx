'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function SaleForm({ onSaleAdded, refresh }: { onSaleAdded: () => void, refresh: any }) {
  const [leads, setLeads] = useState<any[]>([])
  const [leadId, setLeadId] = useState('')
  const [valor, setValor] = useState('')
  const [loading, setLoading] = useState(false)

  async function fetchLeads() {
    const { data } = await supabase.from('leads').select('id, nome')
    if (data) setLeads(data)
  }

  useEffect(() => { 
    fetchLeads() 
  }, [refresh]) 

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    const { error } = await supabase.from('vendas').insert([
      { lead_id: leadId, valor: Number(valor), user_id: session?.user.id }
    ])

    if (!error) {
      setValor(''); setLeadId(''); onSaleAdded()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
      <h3 className="text-lg font-bold mb-4 text-slate-800">Registrar Nova Venda</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={leadId}
          onChange={(e) => setLeadId(e.target.value)}
          className="p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 outline-none"
          required
        >
          <option value="">Selecione o Lead</option>
          {leads.map((lead) => (
            <option key={lead.id} value={lead.id}>{lead.nome}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Valor (R$)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Registrar Venda'}
        </button>
      </div>
    </form>
  )
}
