import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Menu from './Menu'
import Usuarios from './usuarios'
import Tareas from './Tareas'
const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margen">
      <Route exact path='/' component={Usuarios} />
      <Route exact path='/tareas' component={Tareas} />
    </div>
  </BrowserRouter>
)

export default App