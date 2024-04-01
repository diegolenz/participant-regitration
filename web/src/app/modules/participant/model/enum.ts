export interface EnumType {
    value: string;
    label: string;
}

export enum Gender {
    MALE = 'MASCULINO',
    FEMALE = 'FEMININO',
    UNDEFINED = 'INDEFINIDO'
}

export const genderTypes = [
    { value: 'MALE', label: 'MASCULINO' },
    { value: 'FEMALE', label:'FEMININO' },
    { value: 'UNDEFINED', label: 'INDEFINIDO' }
]

export enum maritalStatus {
    SINGLE, MARRIED, SEPARATED, DIVORCED, WIDOWED
}

export const maritalTypes = [
    { value: 'SINGLE', label: 'Solteiro' },
    { value: 'MARRIED', label:'Casado' },
    { value: 'SEPARATED', label: 'Separado' },
    { value: 'DIVORCED', label: 'Divorciado' },
    { value: 'WIDOWED', label: 'Viuvo' },
]