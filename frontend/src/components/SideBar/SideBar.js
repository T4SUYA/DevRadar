import React from 'react'
import './sidebar.css'


export default (props) => {
    return(
        <>
            <aside>
                <strong>Cadastrar</strong>
                    <form onSubmit = {(e) => props.handleSubmit(e)}>
                        <div className = 'input-block'>
                            <label htmlFor ='github_username'>Usuário do GitHub</label>
                            <input 
                            name = 'github_username' 
                            id= 'github_username' 
                            value = {props.username}
                            required 
                            onChange = {(e) => props.setUsername(e.target.value)}></input>
                        </div>

                        <div className = 'input-block'>
                            <label htmlFor ='techs'>Tecnologias</label>
                            <input 
                            name = 'techs' 
                            id= 'techs'
                            value = {props.techs}
                            required
                            onChange = {(e) => props.setTechs(e.target.value)}
                            />
                        </div>
                        
                        <div className = 'input-group'>
                            <div className="input-block">
                                <label htmlFor ='latitude'>Latitude</label>
                                <input
                                type = 'number' 
                                name = 'latitude' 
                                id= 'latitude' 
                                required 
                                value = {props.latitude} 
                                onChange = {(e) => props.setLatitude(e.target.value)}/>
                            </div>
                            <div className="input-block">
                                <label htmlFor ='longitude'>Longitude</label>
                                <input
                                type  = 'number' 
                                name = 'longitude' 
                                id= 'longitude' 
                                required 
                                value = {props.longitude}
                                onChange = {(e) => props.setLongitude(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type = 'submit' >Salvar</button>
                    </form>
            </aside>
        </>
        
    )
}