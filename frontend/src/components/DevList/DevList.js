import React from 'react'
import './main.css'
export default (props) => {
    return(
        <>
            <main> 
                <ul>
                    {props.devs.map(dev => (
                        <li key = {dev._id} className = 'dev-item'>
                        <header>
                            <img src={dev.avatar_url} alt="avatar"/>
                            <div className = 'user-info'>
                                <strong>{dev.name}</strong>
                                <span>{dev.techs.map(tech => ( 
                                    tech + ". "
                                ))}</span>
                                <p>{dev.bio}</p>
                                <a target = '_blank' rel="noopener noreferrer" href={dev.html_url}>Acessar perfil no github</a>
                            </div>
                        </header>
                    </li>
                    ))}
                </ul>
            </main>
        </>
    )
}