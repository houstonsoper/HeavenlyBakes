import User from "@/interfaces/user";

export default interface UserContextType {
    user : User,
    userLogin : (user : User) => Promise<User | null>
}