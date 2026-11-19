import { useState } from 'react'
import { Routes, Route, Outlet } from 'react-router'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './features/Recipes/pages/Home/Home.jsx'
import RecipePage from './features/Recipes/pages/RecipePage/RecipePage.jsx'
import ShoppingList from './features/ShoppingList/pages/ShoppingList/ShoppingList.jsx'
import Planning from './features/Planning/pages/Planning/Planning.jsx'
import './App.css'

function Layout() {
  const [search, setSearch] = useState('')

  return (
    <>
      <Header search={search} onSearch={setSearch} />
      <main>
        <Outlet context={{ search }} />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/planning" element={<Planning />} />
      </Route>
    </Routes>
  )
}