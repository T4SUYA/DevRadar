import React, {useEffect,useState} from 'react'
import api from './api/api'
import './global.css'
import './app.css'
import './sidebar.css'
import './main.css'
export default () => {
    const [latitude,setLatitude] = useState()
    const [longitude,setLongitude] = useState()
    const [username,setUsername] = useState('')
    const [techs,setTechs] = useState('')
    const [devs,setDevs] = useState([])
    useEffect(()=>{
        async function loadDevs(){
            const response = await api.get('/devs')
            setDevs(response.data)
        }
        loadDevs()
    },[])
    useEffect( () => {
        navigator.geolocation.getCurrentPosition(
        (position) =>{
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        },
        (err) => {
            console.log(err)
        }, {
            timeout: 30000
        })
    },[])


    async function handleSubmit(e){
        e.preventDefault()

        await api.post('/devs',{
            github_username: username,
            techs,
            latitude,
            longitude
        })
        .then(response => {
            if(!response.data.message){
                setDevs([
                    ...devs,response.data
                ])
            }
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div id = "app">
            <aside>
                <strong>Cadastrar</strong>
                <form>
                    <div className = 'input-block'>
                        <label htmlFor ='github_username'>Usuário do GitHub</label>
                        <input 
                        name = 'github_username' 
                        id= 'github_username' 
                        required 
                        onChange = {(e) => setUsername(e.target.value)}></input>
                    </div>

                    <div className = 'input-block'>
                        <label htmlFor ='techs'>Tecnologias</label>
                        <input 
                        name = 'techs' 
                        id= 'techs' 
                        required
                        onChange = {(e) => setTechs(e.target.value)}
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
                            value = {latitude} 
                            onChange = {(e) => setLatitude(e.target.value)}/>
                        </div>
                        <div className="input-block">
                            <label htmlFor =''>Longitude</label>
                            <input
                            type  = 'text' 
                            name = 'longitude' 
                            id= 'longitude' 
                            required 
                            value = {longitude}
                            onChange = {(e) => setLongitude(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type = 'submit' onClick = {(e) => handleSubmit(e)} >Salvar</button>
                </form>
            </aside>
            <main> 
                <ul>
                    {devs.map(dev => (
                        <li key = {dev._id} className = 'dev-item'>
                        <header>
                            <img src={dev.avatar_url} alt="avatar"/>
                            <div className = 'user-info'>
                                <strong>{dev.name}</strong>
                                <span>{dev.techs}</span>
                                <p>{dev.bio}</p>
                                <a href="https://github.com/T4SUYA">Acessar perfil no github</a>
                            </div>
                        </header>
                    </li>
                    ))}
                    
                    {/* <li className = 'dev-item'>
                        <header>
                            <img src="https://avatars3.githubusercontent.com/u/54009514?v=4" alt="avatar"/>
                            <div className = 'user-info'>
                                <strong>João Victor</strong>
                                <span>ReactJS, React Native, NodeJS</span>
                                <p>Cursando Engenharia de Software/UTFPR-DV  |  Entusiasta de Javascript, ReactJS , NodeJS e todo o ecossistema em torno dessas tecnologias.</p>
                                <a href="https://github.com/T4SUYA">Acessar perfil no github</a>
                            </div>
                        </header>
                    </li> */}
                </ul> 
            </main>
        </div>
    )
}
