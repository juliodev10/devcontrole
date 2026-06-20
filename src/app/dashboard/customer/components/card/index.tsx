"use client";
import { CustomerProps } from "@/utils/customer.type";
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  const router = useRouter();

  async function handleDeleteCustomer() {
    try {
      const response = await api.delete("/api/customer", {
        params: {
          id: customer.id
        }
      })
      console.log(response.data);
      router.refresh(); // Refresh the page after successful deletion
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  }

  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <a className="font-bold text-lg">
          {customer.name}</a>
      </h2>
      <p><a className="font-bold">Email:</a> {customer.email}</p>
      <p><a className="font-bold">Telefone:</a> {customer.phone}</p>
      <button
        className="bg-red-500 text-white px-4 py-1 rounded self-start"
        onClick={handleDeleteCustomer}
      >
        Deletar
      </button>
    </article>
  )
}