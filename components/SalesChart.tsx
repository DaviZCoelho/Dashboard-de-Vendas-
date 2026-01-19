'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function SalesChart({ initialData = [] }: { initialData?: any[] }) {
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mt-6 w-full">
      <h3 className="text-sm font-bold mb-6 text-slate-400 uppercase tracking-widest text-center">Desempenho de Vendas</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={initialData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="leadNome" hide />
            <YAxis tick={{fontSize: 12, fill: '#94a3b8'}} />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-4 shadow-xl border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-blue-600 uppercase mb-1">{data.data}</p>
                      <p className="text-sm font-black text-slate-800">{data.leadNome}</p>
                      <p className="text-lg font-bold text-slate-900 mt-2">R$ {Number(data.valor).toFixed(2)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="valor" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}