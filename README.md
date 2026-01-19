# Dashboard - Gestão Comercial

Dashboard de gestão de relacionamento com o cliente desenvolvido para gerenciar o fluxo de leads e conversão de vendas, com foco em isolamento de dados e visualização de métricas.

# Tecnologias
Next.js 15 / React 19

Supabase (PostgreSQL / Auth)

Tailwind CSS (UI/UX)

Recharts (Data Viz)

# Diferenciais Aplicados
Isolamento de Dados (RLS): Implementação de Row Level Security no banco de dados para garantir que usuários acessem apenas seus próprios registros.

Segurança de Backend: Políticas de segurança aplicadas diretamente na camada do PostgreSQL (PostgREST).

Experiência do Usuário (UX): Login facilitado com preenchimento automático para testes e interface responsiva com feedback de estados (loading/empty).

Sincronização de Estados: Atualização em tempo real de KPIs e gráficos.

# Como rodar
Configure as variáveis de ambiente (.env.local):

1. `NEXT_PUBLIC_SUPABASE_URL=sua_url`

2. `NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key`

Instale e rode:

1. `npm install`

2. `npm run dev`

Acesse a demonstração em: dashboard-de-vendas-two.vercel.app
