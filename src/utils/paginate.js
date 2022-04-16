import _ from 'lodash'

export function paginate(items, pageNumber, pageSize){
    const startIndex = (pageNumber - 1) * pageSize;

    // _.slice(items. startIndex)
    // _.take(3)

    return _(items) // wrap the list into lodash object, so we use chain
        .slice(startIndex) // slice [startIndex: ]
        .take(pageSize) // take how many items from the list 
        .value(); // unwrap the lodash wrapper
}