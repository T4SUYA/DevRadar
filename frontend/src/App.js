import React, {useEffect,useState} from 'react'
import api from './api/api'
import SideBar from './components/SideBar/SidebBar'
import DevList from './components/DevList/DevList'
import './global.css'
import './App.css'
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
            <SideBar
            setUsername = {setUsername}
            setTechs = {setTechs}
            setLatitude = {setLatitude}
            setLongitude = {setLongitude}
            handleSubmit = {handleSubmit}
            latitude = {latitude}
            longitude = {longitude}
            />
            <DevList devs = {devs}/>
        </div>
    )
}
