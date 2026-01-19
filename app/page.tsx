'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import LeadForm from '@/components/LeadForm' 
import LeadTable from '@/components/LeadTable'
import SaleForm from '@/components/SaleForm'
import SalesChart from '@/components/SalesChart'

export default function Dashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState<string | null>('')
  const [refresh, setRefresh] = useState(0)
  const [stats, setStats] = useState({ totalLeads: 0, faturamento: 0 })
  const [vendasData, setVendasData] = useState<any[]>([])

  const loadDashboardData = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/login')
      return
    }

    setUserName(session.user.email ?? 'Usuário')

    const { count } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })

    const { data: vendas, error: saleError } = await supabase
      .from('vendas')
      .select('*, leads(nome)') 

    if (saleError) {
      console.error("Erro ao buscar vendas:", saleError.message)
    
      const { data: vendasBasicas } = await supabase.from('vendas').select('valor')
      if (vendasBasicas) processarVendas(vendasBasicas, count)
    } else if (vendas) {
      processarVendas(vendas, count)
    }
  }, [router])

  
  const processarVendas = (lista: any[], leadCount: number | null) => {
    const formatadas = lista.map((v, index) => ({
      valor: v.valor,
      
      data: v.created_at ? new Date(v.created_at).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR'),
      leadNome: v.leads?.nome || `Venda #${index + 1}`
    }))

    const soma = formatadas.reduce((acc, curr) => acc + Number(curr.valor), 0) || 0
    
    setStats({
      totalLeads: leadCount || 0,
      faturamento: soma
    })
    setVendasData(formatadas)
  }

  useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData, refresh])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const triggerUpdate = () => setRefresh(prev => prev + 1)

  return (
    <main className="min-h-screen bg-gray-50 p-8 text-black font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard de Vendas</h1>
          <p className="text-gray-500 font-medium italic">Logado como: {userName}</p>
        </div>
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2 rounded-xl hover:bg-red-100 transition font-bold border border-red-100 shadow-sm"
        >
          <LogOut size={18} /> Sair do Sistema
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-black">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-black text-blue-500 uppercase tracking-widest mb-1">Faturamento Total</p>
          <h3 className="text-3xl font-black text-slate-800">R$ {stats.faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-black text-green-500 uppercase tracking-widest mb-1">Total de Leads</p>
          <h3 className="text-3xl font-black text-slate-800">{stats.totalLeads}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-black text-purple-500 uppercase tracking-widest mb-1">Status do Banco</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="text-lg font-bold text-slate-700">Conectado</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadForm onLeadAdded={triggerUpdate} />
        <SaleForm onSaleAdded={triggerUpdate} refresh={refresh} />
      </div>

      <SalesChart initialData={vendasData} />

      <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4 text-slate-800 border-b pb-4 border-gray-50">Lista de Leads Atualizada</h2>
        <LeadTable refresh={refresh > 0} />
      </div>
    </main>
  )
}