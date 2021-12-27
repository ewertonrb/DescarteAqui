import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import LocalDeColeta from '../models/LocaldeColeta';
import LocaisdeColeta_views from '../views/LocaisdeColeta_views';
import * as Yup from 'yup';

export default {
  
    async index(request: Request, response: Response){

        const locaisRepository = getRepository(LocalDeColeta);

        const locais = await locaisRepository.find({
          relations: ['images']
        });

        return response.json(LocaisdeColeta_views.rendermany(locais));
    },

    async show(request: Request, response: Response){
        const {id} = request.params;

        const locaisRepository = getRepository(LocalDeColeta);

        const local = await locaisRepository.findOneOrFail(id, {
          relations: ['images']
        });

        return response.json(LocaisdeColeta_views.render(local));
    },

    async create(request: Request, response: Response){
        const{
            name,
            latitude,
            longitude,
            about,
            instructions,
            phone,
            horario_funcionamento,
          } = request.body;
      
          const locaisRepository = getRepository(LocalDeColeta);

          const requestImages = request.files as Express.Multer.File[];
          const images = requestImages.map(Image => {
            return { path: Image.filename}
          })
          
          const data =  {
            name,
            latitude,
            longitude,
            about,
            instructions,
            phone,
            horario_funcionamento,
            images
          };

          const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            phone: Yup.string(),
            horario_funcionamento: Yup.string().required(),
            images: Yup.array(
              Yup.object().shape({
                path: Yup.string().required()
               })
            ).required().min(1),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const local = locaisRepository.create(data);
      
          await locaisRepository.save(local);
          return response.status(201).json(LocaisdeColeta_views.render(local));
        },

        async updateLocal(request: Request, response: Response){
          const local = await getRepository(LocalDeColeta).findOne(request.params.id);

          if(local){
             getRepository(LocalDeColeta).merge(local, request.body);
             const newlocal = await getRepository(LocalDeColeta).save(local);
             return response.json(LocaisdeColeta_views.render(newlocal));
          }else{
          return response.json({message:("Não foi possível encontrar o local!")});
          }
        },

        async deleteLocal(request: Request, response: Response){
          await getRepository(LocalDeColeta).delete(request.params.id);
    
          return response.json({message:("Local deletado com sucesso!")});
          
        },

    };
