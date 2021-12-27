import Users from "../models/Users"

export default{
    render(user: Users){
    
        return{
    id: user.id,
    name: user.name,
    email: user.email
    };
},

rendermany(users: Users[]){
    return users.map(user => this.render(user));
}

}
