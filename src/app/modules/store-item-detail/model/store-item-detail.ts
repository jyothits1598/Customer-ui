import { StoreItem } from '../../store-detail/model/store-detail';

export interface StoreItemDetail extends StoreItem {
    modifiers: Array<ItemModifier>
}

export interface ItemModifier {
    id: number;
    name: string;
    minSelection: number;
    maxSelection: number;
    freeSelection: number;
    options: Array<ModifierOption>;
}

export interface ModifierOption {
    id: number;
    name: string;
    price: number;
}

export function ReadItemModifiers(data: any): Array<ItemModifier> {
    let result: Array<ItemModifier> = [];
    data.forEach(m => {
        result.push({
            id: m.modifier_id,
            name: m.modifier_name,
            minSelection: m.select_minimum,
            maxSelection: m.select_maximum,
            freeSelection: m.select_free,
            options: ReadModifierOptions(m.options)
        })
    });
    return result;
}

export function ReadModifierOptions(data: any): Array<ModifierOption> {
    let result: Array<ModifierOption> = [];
    data.forEach(o => {
        result.push({
            id: o.modifier_option_id,
            name: o.name,
            price: o.price
        })
    })
    return result;
}