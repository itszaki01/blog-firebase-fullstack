export type SignUPInputsTypes = {
    email: string;
    password: string;
    username: string;
    passwordConfrim?: string;
    image: FileList;
};


export type SignInTypes = {
    email: string;
    password: string;
};