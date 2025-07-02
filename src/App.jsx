import { useEffect, useState } from 'react'
import './App.css'
import Card from './Components/Card.jsx'
import nasaLogo from './assets/nasa_black.png'
import axios from 'axios'
import { flushSync } from 'react-dom';


function App() {
  const URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=W7HBASiKGiow8QUmmYPLkGPgfX1e6d1aTZoQ9DE1'
  const[photos, setPhotos] = useState([]);
  const[photoIndex, setPhotoIndex] = useState(0);
  const[banned, setBanned] = useState([])
  
  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get(URL);
      setPhotos(response.data.photos);
    }
    fetchData();
  }, []);


  const getNewPhoto = () => {
    let randomNumber = Math.floor(Math.random() * photos.length);
    console.log(banned);
    while (banned.includes(photos[randomNumber].camera.name)){
      randomNumber = Math.floor(Math.random() * photos.length);
    }

      console.log(photos[randomNumber]);
      setPhotoIndex(randomNumber);
  }

    const addBan = (value) => {
      setBanned(prev => ([...prev, value]));
    }

    const removeBan = (tag) => {
      let arr = [];
      for(let i =0; i<banned.length; i++){
        if (banned[i] == tag) {
          continue;
        } else{
          arr.push(banned[i]);
        }
      }
      setBanned(arr);
    }

  return (
    <div id='app-container'>
      <div id="main-pane">
        <div id="logo-container">
          <img src={nasaLogo}/>
        </div>
          <Card photo={photos[photoIndex]} addBan={addBan}/>
          <button onClick={getNewPhoto}>Get new Photo🔀</button>
        
      </div>
      <div id="ban-pane">
        <h2>Banned Cameras</h2>
        {banned && banned.map((tag) => (
            <div className="tag" key={tag} onClick={() => {removeBan(tag)}}>{tag}</div>
        ))}
      </div>
    </div>
  )
}

export default App
