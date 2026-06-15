import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NewCustomerForm } from '../components/form'
import Link from "next/link";

export default async function NewCustomer() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect('/')
  }
  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/customer" className="bg-gray-200 text-gray-700 px-4 py-1 rounded">
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo cliente</h1>
        </div>
        <NewCustomerForm userId={session.user.id} />
      </main>
    </Container>
  )
}