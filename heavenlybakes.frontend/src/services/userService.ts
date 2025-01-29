import User from "@/interfaces/user";
import UserFormDetails from "@/interfaces/userFormDetails";
import UserParams from "@/interfaces/userParams";

const BASEURL: string = "https:///localhost:44367/User"

export function extractFormDate(form: FormData): UserFormDetails{
    const forename: string | undefined = form.get('forename')?.toString();
    const surname: string | undefined = form.get('surname')?.toString();
    const email: string | undefined = form.get('email')?.toString();
    const password: string | undefined = form.get('password')?.toString();
    const confirmPassword: string | undefined = form.get('confirmPassword')?.toString();

    return {forename, surname, email, password, confirmPassword} as UserFormDetails;
}

export function validateRegistrationForm(formData: FormData): Error[] | null {
    const details: UserFormDetails = extractFormDate(formData);
    let errors: Error[] = [];

    //Check if forename is supplied and is between 1 and 20 characters
    if (!details.forename) {
        errors.push({name: "InvalidForename", message: "Please enter your first name"});
    } else if (details.forename.length < 5 || details.forename.length > 20) {
        errors.push({name: "InvalidForenameLength", message: "First name must be between 1 and 20 characters"});
    }

    //Check if surname is supplied as is between 1 and 20 characters
    if (!details.surname) {
        errors.push({name: "InvalidSurname", message: "Please enter your surname"});
    } else if (details.surname.length < 5 || details.surname.length > 20) {
        errors.push({name: "InvalidSurnameLength", message: "Surname must be between 1 and 20 characters"});
    }

    //Check if email is supplied and is between 5 and 254 characters
    if (!details.email) {
        errors.push({name: "InvalidEmail", message: "Please enter your email"});
    } else if (details.email.length < 5 || details.email.length > 254) {
        errors.push({name: "InvalidEmailLength", message: "Email must be between 5 and 254 characters"});
    }
    //Check that passwords match 
    //and that the password is between 5 and 15 characters
    if (!details.password && !details.confirmPassword) {
        errors.push({name: "InvalidPassword", message: "Please enter a password"});
    } else if (details.password !== details.confirmPassword) {
        errors.push({name: "PasswordMismatch", message: "Passwords do not match"});
    } else if (details.password.length < 5 || details.password.length > 15) {
        errors.push({name: "InvalidPasswordLength", message: "Password must be between 5 and 15 characters"});
    }

    //Return any errors 
    if (errors.length > 0) {
        return errors;
    }

    return null
}

export function validateLoginForm(formData: FormData): Error[] | null {
    const details: UserFormDetails = extractFormDate(formData);
    let errors: Error[] = [];

    //Check if an email has been entered
    if (!details.email) {
        errors.push({name: "InvalidEmail", message: "Please enter your email"});
    }

    //Check if a password has been entered
    if (!details.password) {
        errors.push({name: "InvalidPassword", message: "Please enter your password"});
    }

    //Return any errors 
    if (errors.length > 0) {
        return errors;
    }

    return null
}

export function validateForgotPasswordForm (formData: FormData): Error[] | null {
    const details: UserFormDetails = extractFormDate(formData);
    let errors: Error[] = [];

    //Check if an email has been entered
    if (!details.email) {
        errors.push({name: "InvalidEmail", message: "Please enter your email"});
    }

    //Return any errors 
    if (errors.length > 0) {
        return errors;
    }

    return null;
}

export function validatePasswordResetForm (formData: FormData): Error[] | null {
    const details: UserFormDetails = extractFormDate(formData);
    let errors: Error[] = [];

    //Check that passwords match 
    //and that the password is between 5 and 15 characters
    if (!details.password && !details.confirmPassword) {
        errors.push({name: "InvalidPassword", message: "Please enter a password"});
    } else if (details.password !== details.confirmPassword) {
        errors.push({name: "PasswordMismatch", message: "Passwords do not match"});
    } else if (details.password.length < 5 || details.password.length > 15) {
        errors.push({name: "InvalidPasswordLength", message: "Password must be between 5 and 15 characters"});
    }
    
    //Return any errors
    if (errors.length > 0) {
        return errors;
    }
    return null;
}

export async function createUser(formData: FormData) {
    const registrationDetails: UserFormDetails = extractFormDate(formData);

    const url: string = BASEURL + "/Register"

    const response: Response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(registrationDetails),
        headers: {"Content-Type": "application/json"},
        credentials: "include",
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.message);
        throw new Error(errorData.message);
    }
}

export async function userLogin(formData: FormData) {
    const loginDetails: UserFormDetails = extractFormDate(formData);

    const url: string = BASEURL + "/Login"

    const response: Response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(loginDetails),
        headers: {"Content-Type": "application/json"},
        credentials: "include",
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.message);
        throw new Error(errorData.message);
    }
}

export async function getUser() : Promise<User | null> {
    const response: Response = await fetch(BASEURL, {
        method: "GET",
        credentials: "include",
    });

    if (response.ok) {
        var responseData = await response.json();
        
        //Return a null user if user is not logged in
        if(responseData.message === "User is not logged in"){
            return null;
        }
        //Return the data of the user
        return responseData;
    }
    return null;
}

export async function userLogout()  {
    const url: string = BASEURL + "/Logout";
    const response: Response = await fetch(url, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Unable to logout");
    }
} 

export async function sendPasswordResetToken(formData: FormData) {
    const details : UserFormDetails = extractFormDate(formData);
    
    const url: string = "https://localhost:44367/PasswordResetToken";
 
    await fetch(url, {
        method: "POST",
        body: JSON.stringify({email : details.email}),
        headers: {"Content-Type": "application/json"},
    });
}

export async function fetchPasswordToken(tokenId : string ) {
    const url: string = "https://localhost:44367/PasswordResetToken/" + tokenId;
    const response : Response = await fetch(url);
    
    if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.message);
        return null;
    }
    
    return await response.json();
}

export async function userResetPassword(tokenId : string, formData : FormData ) {
    const details: UserFormDetails = extractFormDate(formData);
    
    const url: string = BASEURL + "/ResetPassword";
    const response : Response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({tokenId : tokenId, password: details.password}),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.message);
        throw new Error(errorData.message);
    }
    
    return await response.json();
}

export async function fetchUserById (userId : string, signal? : AbortSignal) : Promise<User | null> {
    try {
        const url : string = BASEURL + `/${userId}`;
        const response : Response = await fetch(url, {signal});
        
        if (!response.ok) {
            throw new Error(`Unable to fetch user with id ${userId}`);
        }
        return await response.json();
    } catch (error){
        console.error(error);
        return null;
    }
}

export async function fetchUsers ({limit = 0, offset = 0, search = "", groupId = 0} : UserParams , signal? : AbortSignal) : Promise<User[] | []> {
    try {
        const url : string = `${BASEURL}s?search=${search}&groupId=${groupId}&limit=${limit}&offset=${offset}`;
        const response : Response = await fetch(url, {signal})
        
        if (!response.ok) 
            throw new Error ("Unable to fetch users");
        
        return await response.json();
    } catch (error){
        console.error(error);
        return [];
    }
}

export async function updateUsersUserGroup (userId : string, groupId : number) {
    try{
        const url : string = BASEURL + `/${userId}/Group`;
        const response : Response = await fetch(url, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({groupId : groupId}),
        })
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData.message);
        }
        
        return await response.json();
        
    } catch (error){
        console.error(error);
    }
}

export async function deleteUser (userId : string){
    try {
        const url : string = BASEURL + `/${userId}/Delete`;
        const response : Response = await fetch(url, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData.message);
        }
        return await response.json();
    } catch (error){
        console.error(error);
    }
}