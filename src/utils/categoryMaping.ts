interface lookupMap {
    [key: number]: string
}

const lookup: lookupMap = {
    1: 'Users',
    2: 'Recepcionista',
    3: 'Corretor',
    4: 'Vip'
};

export function getCategoryValue(number: number) {
    return lookup[number];
}