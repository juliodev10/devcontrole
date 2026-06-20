"use client"

import { Input } from '@/components/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '@/lib/api'
import { CustomerDataInfo } from '../../page'

const schema = z.object({
  name: z.string().min(1, 'O nome do chamado é obrigatório'),
  description: z.string().min(1, 'A descrição do chamado é obrigatória'),
})

type FormData = z.infer<typeof schema>

interface FormTicketProps {
  customer: CustomerDataInfo;
}

export function FormTicket({ customer }: FormTicketProps) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  async function handleRegisterTicket(data: FormData) {
    const response = await api.post('/api/ticket', {
      customerId: customer.id,
      name: data.name,
      description: data.description
    });

    setValue('name', '')
    setValue('description', '')
  }

  return (
    <form className="bg-slate-200 mt-6 px-4 py-6 rounded border-2" onSubmit={handleSubmit(handleRegisterTicket)}>
      <label className="mb-1 font-medium text-lg">Nome do chamado</label>
      <Input register={register}
        type="text"
        placeholder="Digite o nome do chamado..."
        name="name"
        error={errors.name?.message}
      />

      <label className="mb-1 font-medium text-lg">Descreva o problema</label>
      <textarea
        className="w-full border-2 rounded-md h-24 resize-none mb-2 px-2"
        placeholder="Descreva o problema..."
        id="description"
        {...register('description')}
      >
      </textarea>
      {errors.description?.message && <p className="text-red-500 my-1">{errors.description?.message}</p>}

      <button type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition-colors font-bold">
        Cadastrar chamado
      </button>

    </form >
  )
}