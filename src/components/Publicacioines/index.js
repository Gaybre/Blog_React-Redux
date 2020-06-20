import React from 'react'
import { connect } from 'react-redux'
import { combineReducers } from 'redux'

import Loader from '../Loader'
import Error from '../Error'

import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesActions from '../../actions/publicacionesActions'

const { traerTodos: usuariosTraerTodos }  = usuariosActions
const { traerPorUsuario: publicacionesTraerPorUsuario }  = publicacionesActions

class Publicaciones extends React.Component {

    async componentDidMount() {

        const {
            usuariosTraerTodos,
            publicacionesTraerPorUsuario,
            match: { params: { key } }
        } = this.props

        if(!this.props.usuariosReducer.usuarios.length) {
            await usuariosTraerTodos()
        }

        if(this.props.usuariosReducer.error) {
            return
        }
        
        if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])) {
            publicacionesTraerPorUsuario(key)
        }
    }

    ponerUsuario = () => {
        const { 
            usuariosReducer,
            match: { params: { key } }
        } = this.props

        if( usuariosReducer.error ) {
            return <Error mensaje={usuariosReducer.error} />
        }

        if( usuariosReducer.cargando || !usuariosReducer.usuarios.length ) {
            return <Loader />
        }

        const nombre = usuariosReducer.usuarios[key].name
        return <h1>Publicaciones de { nombre }</h1>
    }

    ponerPublicaciones = () => {
        const {
            usuariosReducer,
            usuariosReducer: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: { key } }
        } = this. props

        if(!usuarios.length) return
        if(usuariosReducer.error) return

        if(publicacionesReducer.cargando) {
            return <Loader />
        }
        if(publicacionesReducer.error) {
            return <Error mensaje={publicacionesReducer.error} />
        }

        if(!publicaciones.length) return
        if(!('publicaciones_key' in usuarios[key])) return

        const { publicaciones_key } = usuarios[key]
        return publicaciones[publicaciones_key].map(publicacion => (
            <div key={ publicacion.id }>
                <h2>
                    { publicacion.title }
                </h2>
                <h3>
                    { publicacion.body }
                </h3>
            </div>
        ))
    }

    render() {
        console.log(this.props)
        if(this.props.cargando) {
            return <Loader />
        }

        return(
            <div>
                {this.ponerUsuario()}
                { this.ponerPublicaciones() }
            </div>
        ) 
    }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return {
        usuariosReducer,
        publicacionesReducer
    }
}

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)