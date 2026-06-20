"use client"

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/input'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

const schema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('Email inválido').min(1, 'O email é obrigatório'),
  phone: z.string().refine((value) => {
    return /^(?:\(\d{2}\)|\d{2})\s?\d{9}$/.test(value);
  }, {
    message: 'Número de telefone deve estar (DD) 999999999',
  }),
  address: z.string(),
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm({ userId }: { userId: string }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const router = useRouter();

  async function handleRegisterCustomer(data: FormData) {
    await api.post('/api/customer', {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      userId: userId
    })

    router.refresh();
    router.replace('/dashboard/customer')
  }

  return (
    <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterCustomer)}>
      <label className="mb-1 text-lg font-medium">Nome completo</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo"
        error={errors.name?.message}
        register={register}
      />

      <section className="flex gap-2 my-2 flex-col sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Telefone</label>
          <Input
            type="text"
            name="phone"
            placeholder="Ex: (11) 999999999"
            error={errors.phone?.message}
            register={register}
          />
        </div>

        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Ex: email@dominio.com"
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>

      <label className="mb-1 text-lg font-medium">Endereço</label>
      <Input
        type="text"
        name="address"
        placeholder="Digite o endereço completo"
        error={errors.address?.message}
        register={register}
      />

      <button type="submit" className="bg-blue-500 my-4 px-2 h-11 text-white rounded hover:bg-blue-600 transition-colors font-bold">
        Cadastrar
      </button>

    </form>
  )
}