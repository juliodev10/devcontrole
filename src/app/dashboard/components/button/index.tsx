"use client"

import { useRouter } from 'next/navigation'
import { FiRefreshCcw } from 'react-icons/fi'

export function ButtonRefresh() {
  const router = useRouter();

  return (
    <button onClick={() => router.refresh()}
      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded mr-2"
    >
      <FiRefreshCcw size={24} color="#FFF" />
    </button>
  )
}