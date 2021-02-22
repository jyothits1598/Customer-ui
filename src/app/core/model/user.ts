export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    radius: number | null,
    radiusType: 'custom' | 'suggested',
    pictureURL: string
}


export interface userDTO {
    id: number;
    first_name: string,
    last_name: string,
    email: string,
    mobile_number: string,
    picture: string,
    search_radius_type: 'suggested' | 'custom',
    radius: number,
}

export function ReadUserDetails(data: userDTO): User {
    // return {
    //     id: 1,
    //     firstName: 'ganesh',
    //     lastName: 'palankar',
    //     email: 'g.p@gmail.com',
    //     phoneNumber: '123456',
    //     customRadius: 5,
    //     pictureURL: ''
    // }
    return {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phoneNumber: data.mobile_number,
        radius: data.radius,
        pictureURL: data.picture,
        radiusType: data.search_radius_type
    }
}

export function UserToBackend(user: User) {
    return {
        customer_id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        mobile_number: user.phoneNumber,
        custom_radius: user.radius
    }
}