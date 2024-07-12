interface lookupMap {
    [key: number]: "Recepcionista" | "Corretor(a)" | "Vip" | "Usuário(a)"
}

const lookup: lookupMap = {
    1: 'Usuário(a)',
    2: 'Recepcionista',
    3: 'Corretor(a)',
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