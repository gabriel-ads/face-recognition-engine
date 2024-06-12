interface lookupMap {
    [key: number]: "Recepcionista" | "Corretor" | "Vip" | "Usuário"
}

const lookup: lookupMap = {
    1: 'Usuário',
    2: 'Recepcionista',
    3: 'Corretor',
    4: 'Vip'
};

export function getCategoryValue(number: number) {
    return lookup[number];
}