export interface ParticipantResponse {
    code: number;
    externalCode?: number;
    name: string;
    cpfCnpj: number;
    phoneNumber?: string;
    digitalSignature?: boolean;
    status: boolean;
}
export interface ParticipantDto {
    code: number;
    externalCode?: number;
    name: string;
    cpfCnpj: number;
    phoneNumber?: string;
    digitalSignature?: boolean;
    status: boolean;
    mail: string;
    spouse: string;
    gender: string;
    marital: string;
    document: string;
    exposedPerson: string;
    tokenSms: boolean;
    notAplicateCnpjCpf: boolean;
}