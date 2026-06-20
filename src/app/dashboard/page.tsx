import { Container } from '@/components/container'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { TicketItem } from "@/app/dashboard/components/ticket";
import prismaClient from '@/lib/prisma'
import { ButtonRefresh } from './components/button'

import Link from 'next/link'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect('/')
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      status: 'ABERTO',
      customer: {
        userId: session.user.id
      }
    },
    include: {
      customer: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  console.log(tickets);

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <div className="flex items-center gap-3">
            <ButtonRefresh />
            <Link href="/dashboard/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
              Abrir chamado
            </Link>
          </div>
        </div>

        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="font-medium text-left pl-1"> CLIENTE </th>
              <th className="font-medium text-left hidden sm:block"> DATA CADASTRO </th>
              <th className="font-medium text-left"> STATUS </th>
              <th className="font-medium text-left"> # </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketItem key={ticket.id} ticket={ticket} customer={ticket.customer} />
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <p className="text-center text-gray-500">Nenhum chamado encontrado.</p>
        )}
      </main>
    </Container>
  )
}