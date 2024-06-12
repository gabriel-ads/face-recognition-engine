interface lookupMap {
    [key: number]: "Recepcionista" | "Corretor" | "Vip" | "Usuário"
}

const lookup: lookupMap = {
    0: 'Usuário',
    1: 'Recepcionista',
    2: 'Corretor',
    3: 'Vip'
};

export function getCategoryValue(number: number) {
    return lookup[number];
}