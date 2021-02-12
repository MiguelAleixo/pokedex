export function getRegionsRequesting (state) {
   state.isRequesting = true
}

export function getRegionsSuccess (state, regions) {
   const { count, page, results } = regions
   const order = false
   state.isRequesting = false
   state.regions = {
     ...state.regions,
     count,
     page,
     order,
     results
   };
}

export function getRegionsFailure (state) {
   state.isRequesting = false
   state.regions = {
     count: 0,
     page: 1,
     order: false,
     results: []
   };
}

export function orderRegionsRequesting (state) {
   state.isRequesting = true
}

export function orderRegionsSuccess (state, payload) {
   const { order, page, results } = payload
   state.isRequesting = false
   state.regions = {
      ...state.regions,
      order,
      page,
      results
   }
}

export function orderRegionsFailure (state) {
   state.isRequesting = false
   state.regions = {
     count: 0,
     page: 1,
     order: false,
     results: []
   };
}
