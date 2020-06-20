import React, { Component } from 'react'

import Loader from '../Loader'
import Error from '../Error'
import Tabla from '../Tabla'
import { connect } from 'react-redux'
import * as usuariosActions from '../../actions/usuariosActions'

class Usuarios extends Component {

  componentDidMount() {
    this.props.traerTodos()
  }

  ponerTabla = () => {
    if(this.props.cargando) {
      return <Loader />
    }
    if(this.props.error) {
      return <Error mensaje={this.props.error} />
    }
    return <Tabla />
  }

  render() {
    return (
      <div>
        <h1 className="center">Usuarios</h1>
        {this.ponerTabla()}
      </div>
    )
  }

}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer
}

export default connect(mapStateToProps, usuariosActions)(Usuarios);