import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import Users from '../models/Users';
import * as Yup from 'yup';
import Users_View from '../views/Users_View';

export default {

    async users(request: Request, response: Response){
      
      const users = await getRepository(Users).find();

        return response.json(Users_View.rendermany(users));
    },

    async user(request: Request, response: Response){
     
      const result = await getRepository(Users).findOneOrFail(request.params.id);

        return response.json(Users_View.render(result));
    },


   async create(request: Request, response: Response) { 
    const{
        name,
        email,
        password,
      } = request.body;
     
      const usersRepository = getRepository(Users);

      const user ={
        name,
        password,
        email
      };

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
      });

      await schema.validate(user, {
        abortEarly: false,
      });

      const newUser = usersRepository.create(user);
      await usersRepository.save(newUser);

      return response.json({message: 'cadastrado com sucesso!'})
   },

    async updateUser(request: Request, response: Response){
    const user = await getRepository(Users).findOne(request.params.id);
      if(user){
        getRepository(Users).merge(user, request.body);
        const result = await getRepository(Users).save(user)
        return response.json(Users_View.render(result));
      }else{
        return response.json({message:("Usuário não encontrado!")} );
      }
  },

  async deleteUser(request: Request, response: Response){
      await getRepository(Users).delete(request.params.id);

      return response.json({message: ("Usuário deletado com sucesso!")});
  },

 }

