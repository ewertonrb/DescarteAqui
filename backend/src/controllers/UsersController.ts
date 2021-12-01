import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import Users from '../models/Users';


export default {

    async users(request: Request, response: Response){
        

        return response.json({message: 'Nada aqui! '});
    },


   async create(request: Request, response: Response) { 
    try{
    const{
        name,
        email,
        password,
      } = request.body;
     
      const usersRepository = getRepository(Users);

      const user = usersRepository.create({
        name,
        password,
        email,
      });

      await usersRepository.save(user);

      return response.json({message: 'cadastrado com sucesso!'})

    }catch{
        return response.json({message: 'Não foi possível realizar o cadastro!'})
    }

   }
 }

