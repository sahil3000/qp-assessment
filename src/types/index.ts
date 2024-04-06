export type UserType = {
    username: string;
    email: string;
    password: string;
    fullName: string;
    contactNo: string;
    role: "Admin" | "User";
}

export type LoginPayload = {
    email: string;
    password: string;
}

export type ProductPayload = {
    name: string;
    description: string;
    price: number;
    quantityAvailable: number;
}

export type ProductQuantityUpdatePayload = {
    quantityAvailable: number;
}

export type BookOrderPayload = {
    items: [
        {
            productId: string;
            quantity: number;
        }        
    ],
    totalPrice: Number;
    status: 'pending' | 'completed' | 'cancelled';
}

