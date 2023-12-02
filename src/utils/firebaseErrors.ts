export function getError(Error:string):string{
    if(Error.includes('Firebase: Error (auth/')){
      return  Error.replace('Firebase: Error (auth/','').replace(').','').split('-').join(' ')
    }else{
        return Error
    }
     
}