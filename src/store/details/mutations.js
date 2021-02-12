export function getDetailsRequesting (state) {
   state.isRequesting = true
}

export function getDetailsSuccess (state, details) {
   const { name, order, height, weight, abilities, types } = details
   state.isRequesting = false
   state.details = {
      name,
      order,
      height,
      weight,
      abilities,
      types,
      sprites: {
         other: {
            ['official-artwork']: details.sprites.other['official-artwork']
         }
      }
   }
}

export function getDetailsFailure (state) {
   state.isRequesting = false
   state.details = {
      name: '',
      order: 0,
      height: 0,
      weight: 0,
      abilities: [],
      types: [],
      sprites: {
         other: {
            ['official-artwork']: ''
         }
      }
   }
}