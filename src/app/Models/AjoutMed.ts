export interface inscription{
    cin:number | null,
    nom:string,
    prenom:string,
    tel:number,
    email:string,
    dateN:Date,
    adresse :String,
    username:string,
    mdp:string,
    specialite:string;
    dep:string;


}
export interface Departement{
    num:number ;
    nom_dep:String;



}
export interface email{
    to:string ;
    codeVerification:number;
}