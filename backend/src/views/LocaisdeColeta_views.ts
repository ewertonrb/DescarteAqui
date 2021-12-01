import LocalDeColeta from "../models/LocaldeColeta"
import images_views from "./images_views";

export default{
    render(localdecoleta: LocalDeColeta){
    
        return{
    id: localdecoleta.id,
    name: localdecoleta.name,
    latitude: Number(localdecoleta.latitude),
    longitude: Number(localdecoleta.longitude),
    about: localdecoleta.about,
    instructions: localdecoleta.instructions,
    phone: localdecoleta.phone,
    horario_funcionamento: localdecoleta.horario_funcionamento,
    images: images_views.rendermany(localdecoleta.images)
        };
    },

    rendermany(locaisdecoleta: LocalDeColeta[]){
        return locaisdecoleta.map(localdecoleta => this.render(localdecoleta));
    }

};