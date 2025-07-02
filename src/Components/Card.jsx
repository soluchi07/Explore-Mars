import './Card.css'


function Card(props) {
    if (!props.photo || !props.photo.camera) {
        return (
            <div>
                <img src='src/assets/loading.gif' />
            </div>
        )
    }

    return(
                    
        <div id='card'>
            <h2>Photo ID {props.photo.id}</h2>
            <img src={props.photo.img_src} />
            <div className="data-box" id="cam-button" onClick={() => props.addBan(props.photo.camera.name)}>
                Camera: {props.photo.camera.full_name} ({props.photo.camera.name})
            </div> 
            <div className="data-box" >
                Earth Date: {props.photo.earth_date}
            </div> 
            <div className="data-box" >
                Landing Date: {props.photo.rover.landing_date}
            </div>
            <div className="data-box" >
                Launch Date: {props.photo.rover.launch_date}
            </div>

        </div>
    )


}

export default Card