import React from 'react';


export const Loading = (message) => {
    return ( 

      <div class="d-flex flex-column align-items-center justify-content-center" id="loader"> 
      <div class="row">
          <div class="fa fa-spinner fa-pulse fa-3x fa-fw text-primary" role="status">
              <span class="sr-only">Loading...</span>
          </div>
       </div>
       <div class="row">
         <strong>{message}</strong>
       </div>
   </div>
    
    )
}