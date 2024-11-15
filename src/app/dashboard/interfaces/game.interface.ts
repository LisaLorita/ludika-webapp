export interface Game {
    id:             string;
    name:           string;
    description:    string;
    genre:          string;
    age:            number;
    players:        number;
    year:           string;
    isDiscontinued: boolean;
    createdAt:      Date;
    updatedAt:      Date;
}

