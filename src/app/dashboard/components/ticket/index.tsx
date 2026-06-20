"use client"

import { useContext } from 'react'
import { TicketProps } from '@/utils/ticket.type'
import { FiCheckSquare, FiFile } from 'react-icons/fi'
import { CustomerProps } from '@/utils/customer.type'
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

import { ModalContent } from '@/providers/modal'

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({ ticket, customer }: TicketItemProps) {
  const router = useRouter();
  const { handleModalVisible, setDetailTicket } = useContext(ModalContent);

  async function handleChangedStatus() {
    try {
      const response = await api.patch('/api/ticket', { id: ticket.id });

      router.refresh();
    } catch (err) {
      console.error('Erro ao alterar o status do ticket:', err);
    }
  }

  function handleOpenModal() {
    setDetailTicket({ ticket, customer });
    handleModalVisible();
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration 300">
        <td className="text-left pl-1">{customer?.name || 'Cliente não encontrado'}</td>
        <td className="text-left hidden sm:table-cell">{ticket.createdAt?.toLocaleDateString("pt-br") || 'N/A'}</td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded">{ticket.status}</span>
        </td>
        <td className="text-left">
          <button className="mr-2" onClick={handleChangedStatus}>
            <FiCheckSquare size={24} color="rgb(108, 111, 109)" />
          </button>
          <button onClick={handleOpenModal}>
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td >
      </tr >
    </>
  )
}
