export interface medecin{
  cin:string
  nom:string
  prenom:string
  specialite:string
  duree:number
  limit:number
}

export interface rendezvous{
  cinDR:string;
  cinPatient:string;
  statusRDV:string;
  idCompte:number;

}

export interface DemandeRdv {
  statusRDV: statusRDV;
  Patientcin: string;
  DRcin: string;
  username: string;
  date_demande: Date;
  nom: string;
  prenom: string;
  tel: number;
  email: string;
  adresse: string;
}
enum statusRDV {
  EnAttente,valide

}
