
import { useState } from 'react'
import './App.css'
import { Item } from './components/Item'

export type ItemId = `${string}-${string}-${string}-${string}-${string}`

interface Item {
 id: ItemId
 timestamp: number
 text: string
}

const INITIAL_ITEMS: Item[] = [
  {
    id:crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Videojuegos',
  },
  {
    id:crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Libros',
  }
]

function App() {
//const [items, setItems] = useState<Item[]>([])
  const [items, setItems] = useState(INITIAL_ITEMS)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    //e.target.value -> para escuchar el onChange de un input 
   // const form = event.currentTarget.elements same as below
    const {elements} = event.currentTarget

    // estrategia 1 no recomendable porque es forzar 
   // const input = elements.namedItem('item') as HTMLInputElement

   //estrategia 2 asegurarse de que es un input
    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement //Js puro
    if(!isInput || input == null) return

    //ahora que ya se sabe que es un input
    const newItem: Item = {
         id: crypto.randomUUID(),
         timestamp: Date.now(),
         text: input.value,
    }

    setItems((prevItems) => {
      return[...prevItems, newItem] //Elementos previos mas el nuevo que se ha creado
    })
   
    input.value = ''

  }

  const createHandleRemoveItem = (id: ItemId) => () => {
    setItems(prevItems => {
      return prevItems.filter(currentItem => currentItem.id !== id)
    })
  }

  return (
   <main>
     <aside>
      <h1>Moving List</h1>
      <form onSubmit={handleSubmit} aria-label='Añadir elementos a ala lista'>
        <label>
        Elemento a introducir:
            <input
              name='item'
              required
              type='text'
              placeholder='videojuegos'
            />
        </label>
        <button>añadir elemento a la lista</button>
      </form>
     </aside>
     <section>
      <h2>Lista de elementos</h2>
      {
        items.length === 0 ? (
          <p>
            <strong>No hay elementos</strong>
          </p>
        ):(
      <ul>
        {
         items.map((item) => {
          return(
            <Item
            {...item}
            handleClick={createHandleRemoveItem(item.id)}
            key={item.id}
            />
          )
         })
        }
      </ul>
      )
     }
     </section>
   </main>
  )
}

export default App
