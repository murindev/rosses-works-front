export interface IUser {
    id: number
    crm_id?: number[]
    roles?: number[]
    name?: string
    email?: string
    // email_verified_at
    // password
    // remember_token
    color?: string
    text_color?: string
    city?: number
    shift?: number
    timeline?: number
    avatar?: string
    phone?: string
    salary?: number
    percent?: number
    percent_limit?: number
    created_at?: string
    updated_at?: string
    active?: number
    task_admin?: number
}

export interface IUserRole {
    id: number
    active: number
    name: string
    slug: string
}

export interface IUserProfile {
    id?: number
    user_id?: number
    photo?: string
    name?: string
    patronymic?: string
    surname?: string
    birth_date?: string
    birth_place?: string
    address_residence?: string
    address_registration?: string
    phone_home?: string
    phone_mobile?: string
    phone_office?: string
    passport_data?: string
    marital_status?: string
    education_additional?: string
    languages?: string
    salary_for_probation?: string
    salary_after_probation?: string
    advantages?: string
    hobbies?: string
    additional_info?: string
    agreement?: number
    created_at?: string
    updated_at?: string
    military_status?: string
    crm_id?: number
    education?: IUserProfileEducation[]
    employments?: IUserProfileEmployment[]
}

export interface IUserProfileEducation {
    id: number
    user_id: number
    profile_id: number
    institution?: string
    speciality: string
    date_admission: string
    date_graduation: string
    updated_at: string
    created_at: string
}

export interface IUserProfileEmployment {
    id: number
    user_id: number
    profile_id: number
    date_of_employment?: string
    date_of_dismissal?: string
    organisation?: string
    position?: string
    address_of_organisation?: string
    reason_for_dismissal?: string
    created_at?: string
    updated_at?: string
}

export interface IUserProfileColumns {
    profile: IUserProfile
    education: IUserProfileEducation
    employment: IUserProfileEmployment

}

export interface IUserRank {
    id?:number
    name?:string
    created_at?:string
    updated_at?:string
}
