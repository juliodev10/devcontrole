
export function CardCustomer() {
  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <a className="font-bold text-lg">
          Mercado Silva
        </a>
      </h2>
      <p><a className="font-bold">Email:</a>teste@teste.com</p>
      <p><a className="font-bold">Telefone:</a>XX-XXXX-XXXX</p>
      <button className="bg-red-500 text-white px-4 py-1 rounded self-start">
        Deletar
      </button>
    </article>
  )
}