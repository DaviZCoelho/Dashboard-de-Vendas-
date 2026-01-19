'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Trash2 } from 'lucide-react'

export default function LeadTable({ refresh }: { refresh: boolean }) {
  const [leads, setLeads] = useState<any[]>([])

  async function fetchLeads() {
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setLeads(data)
  }

  async function deleteLead(id: string) {
    await supabase.from('leads').delete().eq('id', id)
    fetchLeads()
  }

  useEffect(() => {
    fetchLeads()
  }, [refresh])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">Nome</th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">E-mail</th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm text-gray-800">{lead.nome}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{lead.email}</td>
              <td className="px-6 py-4">
                <button onClick={() => deleteLead(lead.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}