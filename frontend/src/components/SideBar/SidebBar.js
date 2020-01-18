import React from 'react'
import './sidebar.css'


export default (props) => {
    return(
        <>
            <aside>
                <strong>Cadastrar</strong>
                    <form>
                        <div className = 'input-block'>
                            <label htmlFor ='github_username'>Usuário do GitHub</label>
                            <input 
                            name = 'github_username' 
                            id= 'github_username' 
                            required 
                            onChange = {(e) => props.setUsername(e.target.value)}></input>
                        </div>

                        <div className = 'input-block'>
                            <label htmlFor ='techs'>Tecnologias</label>
                            <input 
                            name = 'techs' 
                            id= 'techs' 
                            required
                            onChange = {(e) => props.setTechs(e.target.value)}
                            />
                        </div>
                        
                        <div className = 'input-group'>
                            <div className="input-block">
                                <label htmlFor =''>Latitude</label>
                                <input
                                type = 'text' 
                                name = 'latitude' 
                                id= 'latitude' 
                                required 
                                value = {props.latitude} 
                                onChange = {(e) => props.setLatitude(e.target.value)}/>
                            </div>
                            <div className="input-block">
                                <label htmlFor =''>Longitude</label>
                                <input
                                type  = 'text' 
                                name = 'longitude' 
                                id= 'longitude' 
                                required 
                                value = {props.longitude}
                                onChange = {(e) => props.setLongitude(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type = 'submit' onClick = {(e) => props.handleSubmit(e)} >Salvar</button>
                    </form>
            </aside>
        </>
        
    )
}