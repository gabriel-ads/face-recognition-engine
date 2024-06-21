interface lookupMap {
    [key: number]: "Recepcionista" | "Corretor" | "Vip" | "Usuário"
}

const lookup: lookupMap = {
    1: 'Usuário',
    2: 'Recepcionista',
    3: 'Corretor',
    4: 'Vip'
};

const possibleCategoryIdValues = [1, 2, 3, 4]

export function getCategoryValue(number: number) {
    return lookup[number];
}

export function categoryIdValidation(categoryId: number) {
    if (!possibleCategoryIdValues.includes(categoryId)) {
        return 1
    } else {
        return categoryId
    }
}